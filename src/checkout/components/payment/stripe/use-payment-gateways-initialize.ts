"use client";

import { useCallback, useEffect, useState } from "react";

import { type PaymentGatewayFragment, usePaymentGatewaysInitializeMutation } from "@/checkout/graphql";

import { type StripeGatewayConfig, stripeV2GatewayId } from "./types";

export const usePaymentGatewaysInitialize = (
	checkoutId: string,
	availablePaymentGateways: PaymentGatewayFragment[] | null | undefined,
) => {
	const [stripeConfig, setStripeConfig] = useState<StripeGatewayConfig | null>(null);
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [, paymentGatewaysInitialize] = usePaymentGatewaysInitializeMutation();

	const initialize = useCallback(async () => {
		const stripeGateway = availablePaymentGateways?.find((gateway) => gateway.id === stripeV2GatewayId);
		if (!stripeGateway) {
			setStripeConfig(null);
			return;
		}

		setFetching(true);
		setError(null);

		try {
			const result = await paymentGatewaysInitialize({
				checkoutId,
				paymentGateways: [
					{
						id: stripeGateway.id,
						data: stripeGateway.config,
					},
				],
			});

			if (result.error) {
				throw new Error(result.error.message || "Failed to initialize payment gateway");
			}

			const initErrors = result.data?.paymentGatewayInitialize?.errors;
			if (initErrors?.length) {
				throw new Error(initErrors[0]?.message || "Failed to initialize payment gateway");
			}

			const gatewayConfig = result.data?.paymentGatewayInitialize?.gatewayConfigs?.find(
				(config) => config.id === stripeV2GatewayId,
			);

			if (!gatewayConfig) {
				throw new Error("Stripe gateway configuration is missing");
			}

			const configErrors = gatewayConfig.errors;
			if (configErrors?.length) {
				throw new Error(configErrors[0]?.message || "Failed to load Stripe configuration");
			}

			setStripeConfig({
				id: stripeV2GatewayId,
				data: (gatewayConfig.data ?? {}) as StripeGatewayConfig["data"],
			});
		} catch (cause) {
			console.error("[PaymentGatewaysInitialize] Error:", cause);
			setStripeConfig(null);
			setError(cause instanceof Error ? cause.message : "Failed to initialize payment gateway");
		} finally {
			setFetching(false);
		}
	}, [availablePaymentGateways, checkoutId, paymentGatewaysInitialize]);

	useEffect(() => {
		void initialize();
	}, [initialize]);

	return {
		stripeConfig,
		fetching,
		error,
		reinitialize: initialize,
	};
};
