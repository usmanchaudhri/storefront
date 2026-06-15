"use client";

import { type FormEventHandler, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe, type Stripe, type StripeElements, type StripePaymentElement } from "@stripe/stripe-js";

import {
	type CheckoutFragment,
	useTransactionInitializeMutation,
	useTransactionProcessMutation,
} from "@/checkout/graphql";
import { useCheckoutComplete } from "@/checkout/hooks/use-checkout-complete";
import {
	getTransactionInitializeErrorMessage,
	logTransactionInitializeFailure,
} from "@/checkout/lib/transaction-initialize-errors";
import { formatMoneyWithFallback } from "@/checkout/lib/utils/money";
import { LoadingSpinner } from "@/checkout/ui-kit/loading-spinner";
import { Button } from "@/ui/components/ui/button";

import { stripeV2GatewayId, type StripeGatewayConfig } from "./types";
import { getStripeReturnUrl } from "./utils";

export interface StripeComponentProps {
	checkout: CheckoutFragment;
	config: StripeGatewayConfig;
	onBeforePayment: () => Promise<boolean>;
	onError: (message: string) => void;
}

/**
 * Saleor Stripe app creates the PaymentIntent on transactionInitialize and returns
 * a client secret. Elements must be mounted with that secret — not deferred mode.
 */
export const StripeComponent = ({ checkout, config, onBeforePayment, onError }: StripeComponentProps) => {
	const publishableKey = config.data?.stripePublishableKey;
	const total = checkout.totalPrice?.gross;
	const totalStr = formatMoneyWithFallback(total);

	const searchParams = useSearchParams();
	const { onCheckoutComplete } = useCheckoutComplete(checkout.id);
	const [, transactionInitialize] = useTransactionInitializeMutation();
	const [, transactionProcess] = useTransactionProcessMutation();

	const containerRef = useRef<HTMLDivElement>(null);
	const stripeRef = useRef<Stripe | null>(null);
	const elementsRef = useRef<StripeElements | null>(null);
	const paymentElementRef = useRef<StripePaymentElement | null>(null);
	const transactionIdRef = useRef<string | null>(null);

	const [isReady, setIsReady] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [initError, setInitError] = useState<string | null>(null);

	useEffect(() => {
		if (!publishableKey || !total || !containerRef.current) {
			return;
		}

		let cancelled = false;
		let paymentElement: StripePaymentElement | null = null;

		const initializeAndMount = async () => {
			setIsReady(false);
			setInitError(null);

			try {
				const initializeResult = await transactionInitialize({
					checkoutId: checkout.id,
					amount: total.amount,
					paymentGateway: {
						id: stripeV2GatewayId,
						data: {
							paymentIntent: {
								paymentMethod: "card",
							},
						},
					},
				});

				if (cancelled) {
					return;
				}

				if (initializeResult.error) {
					throw new Error(initializeResult.error.message || "Transaction initialization failed");
				}

				const transactionData = initializeResult.data?.transactionInitialize;
				const initializeError = getTransactionInitializeErrorMessage(transactionData);
				if (initializeError) {
					logTransactionInitializeFailure(transactionData, "StripeComponent");
					throw new Error(initializeError);
				}

				const data = transactionData?.data as
					| {
							paymentIntent?: {
								stripeClientSecret?: string;
							};
					  }
					| null
					| undefined;

				const clientSecret = data?.paymentIntent?.stripeClientSecret;
				const transactionId = transactionData?.transaction?.id;

				if (!clientSecret || !transactionId) {
					throw new Error("Could not retrieve payment details. Please try again.");
				}

				transactionIdRef.current = transactionId;
				sessionStorage.setItem("transactionId", transactionId);

				const stripe = await loadStripe(publishableKey);
				if (cancelled || !stripe || !containerRef.current) {
					return;
				}

				const elements = stripe.elements({
					clientSecret,
					appearance: { theme: "stripe" },
				});

				paymentElement = elements.create("payment", { layout: "tabs" });
				paymentElement.mount(containerRef.current);

				stripeRef.current = stripe;
				elementsRef.current = elements;
				paymentElementRef.current = paymentElement;
				setIsReady(true);
			} catch (error) {
				if (cancelled) {
					return;
				}
				console.error("Error initializing Stripe payment:", error);
				setInitError(error instanceof Error ? error.message : "Failed to load payment form");
				setIsReady(false);
			}
		};

		void initializeAndMount();

		return () => {
			cancelled = true;
			paymentElement?.unmount();
			paymentElementRef.current = null;
			elementsRef.current = null;
			stripeRef.current = null;
			transactionIdRef.current = null;
			setIsReady(false);
		};
	}, [checkout.id, publishableKey, total?.amount, total?.currency, transactionInitialize]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const stripe = stripeRef.current;
		const elements = elementsRef.current;
		const transactionId = transactionIdRef.current;

		if (!stripe || !elements || !transactionId) {
			onError("Payment system is not available. Please try again later.");
			return;
		}

		setIsLoading(true);
		onError("");

		try {
			const billingReady = await onBeforePayment();
			if (!billingReady) {
				setIsLoading(false);
				return;
			}

			const submitResult = await elements.submit();
			if (submitResult.error) {
				onError(submitResult.error.message || "Payment validation failed");
				setIsLoading(false);
				return;
			}

			const returnUrl = getStripeReturnUrl(searchParams, { transaction: transactionId });

			const { error: confirmError } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: returnUrl,
					payment_method_data: {
						billing_details: {
							name: `${checkout.billingAddress?.firstName ?? ""} ${
								checkout.billingAddress?.lastName ?? ""
							}`.trim(),
							email: checkout.email || "",
							phone: checkout.billingAddress?.phone || "",
							address: {
								city: checkout.billingAddress?.city || "",
								country: checkout.billingAddress?.country?.code || "",
								line1: checkout.billingAddress?.streetAddress1 || "",
								line2: checkout.billingAddress?.streetAddress2 || "",
								postal_code: checkout.billingAddress?.postalCode || "",
								state: checkout.billingAddress?.countryArea || "",
							},
						},
					},
				},
				redirect: "if_required",
			});

			if (confirmError) {
				console.error("Stripe confirmPayment error:", confirmError);
				onError(confirmError.message ?? "Payment failed");
				setIsLoading(false);
				return;
			}

			const processResult = await transactionProcess({ id: transactionId });
			if (processResult.error || processResult.data?.transactionProcess?.errors?.length) {
				console.error(
					"Transaction process failed:",
					processResult.error || processResult.data?.transactionProcess?.errors,
				);
				onError("Payment was successful but order processing failed. Please contact support.");
				setIsLoading(false);
				return;
			}

			sessionStorage.removeItem("transactionId");
			await onCheckoutComplete();
		} catch (error) {
			console.error("Payment processing error:", error);
			onError(error instanceof Error ? error.message : "An unexpected error occurred during payment");
			setIsLoading(false);
		}
	};

	if (!publishableKey) {
		return (
			<div className="border-destructive/50 bg-destructive/10 rounded-lg border p-4 text-sm text-destructive">
				Missing Stripe publishable key. Check your Stripe app configuration in Saleor Dashboard.
			</div>
		);
	}

	if (initError) {
		return (
			<div className="border-destructive/50 bg-destructive/10 rounded-lg border p-4 text-sm text-destructive">
				{initError}
			</div>
		);
	}

	return (
		<section className="space-y-4">
			<h2 className="text-lg font-semibold">Payment</h2>
			<p className="text-sm text-muted-foreground">All transactions are secure and encrypted.</p>
			<form className="space-y-6" onSubmit={handleSubmit}>
				{!isReady && (
					<div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
						<LoadingSpinner />
						Loading payment form...
					</div>
				)}
				<div ref={containerRef} className="min-h-[120px]" />
				<Button
					type="submit"
					disabled={isLoading || !isReady}
					className="h-12 w-full md:w-auto md:min-w-[200px]"
				>
					{isLoading ? (
						<span className="flex items-center gap-2">
							<LoadingSpinner />
							Processing payment...
						</span>
					) : (
						`Pay ${totalStr}`
					)}
				</Button>
			</form>
		</section>
	);
};
