import { localeConfig } from "@/config/locale";

/**
 * Resolve channel currency for policy/trust copy formatting.
 * Uses product pricing when available; falls back to configured default currency.
 */
export function resolveChannelCurrencyFromProduct(product: {
	pricing?: {
		priceRange?: {
			start?: { gross?: { currency?: string } | null } | null;
		} | null;
	} | null;
	variants?: Array<{
		pricing?: { price?: { gross?: { currency?: string } | null } | null } | null;
	}> | null;
}): string {
	const variantCurrency = product.variants?.find((v) => v.pricing?.price?.gross?.currency)?.pricing?.price
		?.gross?.currency;
	return (
		variantCurrency ?? product.pricing?.priceRange?.start?.gross?.currency ?? localeConfig.fallbackCurrency
	);
}
