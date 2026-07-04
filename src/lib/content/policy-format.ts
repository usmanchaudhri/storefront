import { formatContentLabel } from "@/lib/content/format-label";
import { formatPrice } from "@/config/locale";
import type { StorefrontPolicies } from "@/lib/content/types";

/** Values for `{freeShippingThreshold}` / `{returnsWindowDays}` tokens in copy templates. */
export type PolicyLabelValues = {
	freeShippingThreshold: string;
	returnsWindowDays: number;
};

export function buildPolicyLabelValues(
	policies: StorefrontPolicies,
	{ currency }: { currency: string },
): PolicyLabelValues {
	const threshold = policies.shipping.freeShippingThreshold;
	return {
		freeShippingThreshold: threshold != null ? formatPrice(threshold, currency) : "",
		returnsWindowDays: policies.returns.windowDays,
	};
}

export function formatPolicyAwareLabel(template: string, policyValues: PolicyLabelValues): string {
	return formatContentLabel(template, policyValues);
}
