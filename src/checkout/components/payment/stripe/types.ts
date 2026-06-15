export const stripeV2GatewayId = "saleor.app.payment.stripe";
export type StripeV2GatewayId = typeof stripeV2GatewayId;

export interface StripeGatewayConfig {
	id: StripeV2GatewayId;
	data?: {
		stripePublishableKey?: string;
	};
}
