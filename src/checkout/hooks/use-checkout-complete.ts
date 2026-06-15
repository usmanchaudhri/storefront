"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useCheckoutCompleteMutation } from "@/checkout/graphql";
import { createQueryString } from "@/checkout/lib/utils/url";

export const useCheckoutComplete = (checkoutId: string) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [mutationState, checkoutComplete] = useCheckoutCompleteMutation();
	const [completingCheckout, setCompletingCheckout] = useState(false);

	const onCheckoutComplete = useCallback(async () => {
		setCompletingCheckout(true);

		try {
			const result = await checkoutComplete({ checkoutId });

			if (result.error) {
				throw new Error(result.error.message || "Failed to complete checkout");
			}

			const errors = result.data?.checkoutComplete?.errors;
			if (errors?.length) {
				throw new Error(errors[0]?.message || errors[0]?.code || "Failed to complete checkout");
			}

			const order = result.data?.checkoutComplete?.order;
			if (!order) {
				throw new Error("No order returned from checkout");
			}

			const newQuery = createQueryString(searchParams, { orderId: order.id });
			router.replace(`?${newQuery}`, { scroll: false });
		} finally {
			setCompletingCheckout(false);
		}
	}, [checkoutComplete, checkoutId, router, searchParams]);

	return {
		onCheckoutComplete,
		completingCheckout,
		fetching: mutationState.fetching || completingCheckout,
	};
};
