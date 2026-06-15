import { type ReadonlyURLSearchParams } from "next/navigation";

import { createQueryString } from "@/checkout/lib/utils/url";

export const getStripeReturnUrl = (
	searchParams: ReadonlyURLSearchParams,
	extraQuery?: Record<string, string | null>,
): string => {
	const query = createQueryString(searchParams, {
		processingPayment: "true",
		...extraQuery,
	});

	// Stripe requires an absolute URL for return_url (not just a path)
	return `${window.location.origin}${window.location.pathname}?${query}`;
};
