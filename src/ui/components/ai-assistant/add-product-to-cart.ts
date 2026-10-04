"use server";

import { revalidatePath } from "next/cache";

import { CheckoutAddLineDocument, ProductDefaultVariantDocument } from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";
import { executeAuthenticatedGraphQL, executePublicGraphQL } from "@/lib/graphql";

export type AddProductToCartResult = { ok: true; itemCount: number } | { ok: false; error: string };

function resolveVariantId(product: {
	defaultVariant?: { id: string; quantityAvailable?: number | null } | null;
	variants?: Array<{ id: string; quantityAvailable?: number | null }> | null;
}): string | null {
	const defaultVariant = product.defaultVariant;
	if (defaultVariant?.id) {
		return defaultVariant.id;
	}

	const variants = product.variants ?? [];
	const available = variants.find((variant) => (variant.quantityAvailable ?? 0) > 0);
	return available?.id ?? variants[0]?.id ?? null;
}

function sumLineQuantities(lines: Array<{ quantity: number }> | null | undefined): number {
	return (lines ?? []).reduce((total, line) => total + line.quantity, 0);
}

export async function getCartItemCount(channel: string): Promise<number> {
	const trimmedChannel = channel.trim();
	if (!trimmedChannel) {
		return 0;
	}

	try {
		const checkoutId = await Checkout.getIdFromCookies(trimmedChannel);
		if (!checkoutId) {
			return 0;
		}

		const checkout = await Checkout.find(checkoutId);
		return sumLineQuantities(checkout?.lines);
	} catch {
		return 0;
	}
}

export async function addProductToCartBySlug(channel: string, slug: string): Promise<AddProductToCartResult> {
	const trimmedChannel = channel.trim();
	const trimmedSlug = slug.trim();

	if (!trimmedChannel || !trimmedSlug) {
		return { ok: false, error: "Missing product information" };
	}

	try {
		const productResult = await executePublicGraphQL(ProductDefaultVariantDocument, {
			variables: { slug: trimmedSlug, channel: trimmedChannel },
			cache: "no-cache",
		});

		if (!productResult.ok) {
			return { ok: false, error: "Could not load product" };
		}

		const product = productResult.data.product;
		if (!product) {
			return { ok: false, error: "Product not found" };
		}

		const variantId = resolveVariantId(product);
		if (!variantId) {
			return { ok: false, error: "No purchasable variant" };
		}

		const checkout = await Checkout.findOrCreate({
			checkoutId: await Checkout.getIdFromCookies(trimmedChannel),
			channel: trimmedChannel,
		});

		if (!checkout) {
			return { ok: false, error: "Could not create cart" };
		}

		await Checkout.saveIdToCookie(trimmedChannel, checkout.id);

		const addResult = await executeAuthenticatedGraphQL(CheckoutAddLineDocument, {
			variables: {
				id: checkout.id,
				productVariantId: variantId,
				quantity: 1,
			},
			cache: "no-cache",
		});

		if (!addResult.ok) {
			return { ok: false, error: addResult.error.message || "Add to cart failed" };
		}

		const checkoutErrors = addResult.data.checkoutLinesAdd?.errors ?? [];
		if (checkoutErrors.length > 0) {
			return {
				ok: false,
				error: checkoutErrors[0]?.message || "Add to cart failed",
			};
		}

		revalidatePath("/cart");
		revalidatePath("/");

		const itemCount = sumLineQuantities(addResult.data.checkoutLinesAdd?.checkout?.lines);

		return { ok: true, itemCount };
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Add to cart failed",
		};
	}
}
