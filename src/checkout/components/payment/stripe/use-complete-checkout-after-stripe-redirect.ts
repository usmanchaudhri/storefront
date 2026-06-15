"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useCheckoutCompleteMutation, useTransactionProcessMutation } from "@/checkout/graphql";
import { createQueryString, getQueryParams } from "@/checkout/lib/utils/url";

/**
 * Completes checkout after returning from Stripe 3DS redirect.
 * Does not use Stripe.js hooks — safe to call outside <Elements>.
 */
export const useCompleteCheckoutAfterStripeRedirect = (checkoutId: string) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const queryParams = getQueryParams(searchParams);
	const [, checkoutComplete] = useCheckoutCompleteMutation();
	const [, transactionProcess] = useTransactionProcessMutation();
	const isProcessingRef = useRef(false);

	useEffect(() => {
		const { paymentIntent, paymentIntentClientSecret, processingPayment, transaction } = queryParams;

		if (!checkoutId) {
			return;
		}

		if (!paymentIntent || !paymentIntentClientSecret || !processingPayment) {
			return;
		}

		if (isProcessingRef.current) {
			return;
		}

		const transactionId = sessionStorage.getItem("transactionId");
		const transactionIdFromQuery = typeof transaction === "string" ? transaction : undefined;
		const resolvedTransactionId = transactionId ?? transactionIdFromQuery;

		if (!resolvedTransactionId) {
			console.error("Missing transactionId after Stripe redirect", { transaction });
			return;
		}

		isProcessingRef.current = true;

		const processAndComplete = async () => {
			try {
				const processResult = await transactionProcess({ id: resolvedTransactionId });

				if (processResult.error) {
					throw new Error(processResult.error.message || "Transaction process failed");
				}

				const processErrors = processResult.data?.transactionProcess?.errors;
				if (processErrors?.length) {
					throw new Error(processErrors[0]?.message || "Transaction process failed");
				}

				sessionStorage.removeItem("transactionId");

				const completeResult = await checkoutComplete({ checkoutId });

				if (completeResult.error) {
					throw new Error(completeResult.error.message || "Failed to complete checkout");
				}

				const completeErrors = completeResult.data?.checkoutComplete?.errors;
				if (completeErrors?.length) {
					throw new Error(completeErrors[0]?.message || "Failed to complete checkout");
				}

				const order = completeResult.data?.checkoutComplete?.order;
				if (!order) {
					throw new Error("No order returned from checkout");
				}

				const newQuery = createQueryString(searchParams, { orderId: order.id });
				router.replace(`?${newQuery}`, { scroll: false });
			} catch (cause) {
				console.error("Error completing checkout after Stripe redirect:", cause);
				isProcessingRef.current = false;
			}
		};

		void processAndComplete();
	}, [checkoutComplete, checkoutId, queryParams, router, searchParams, transactionProcess]);
};
