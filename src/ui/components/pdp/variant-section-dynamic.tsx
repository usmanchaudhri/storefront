import type { ReactNode } from "react";
import { revalidatePath } from "next/cache";

import { CheckoutAddLineDocument } from "@/gql/graphql";
import { executeAuthenticatedGraphQL } from "@/lib/graphql";
import * as Checkout from "@/lib/checkout";
import {
	getSelectionsFromVariant,
	groupVariantsByAttributes,
	type SaleorVariant,
} from "./variant-selection/utils";
import { resolveSelectedVariantId, type Product } from "./gallery-utils";
import { PdpVariantProvider } from "./pdp-variant-provider";
import { VariantBuyBox } from "./variant-buy-box";
import { VariantGalleryClient } from "./variant-gallery-client";
import type { PdpLayoutClasses } from "./gallery-layout";

interface PdpInteractiveProps {
	product: Product;
	channel: string;
	searchParams: Promise<{ variant?: string }>;
	layout: PdpLayoutClasses;
	productAttributesNode?: ReactNode;
}

/**
 * PDP interactive region (gallery + buy box).
 *
 * Reads `searchParams` once for the initial variant, then selection is
 * client-owned so size/bundle clicks do not trigger an RSC round-trip.
 */
export async function PdpInteractive({
	product,
	channel,
	searchParams,
	layout,
	productAttributesNode,
}: PdpInteractiveProps) {
	const { variant: variantParam } = await searchParams;
	const initialVariantId = resolveSelectedVariantId(product, variantParam);
	const variants = (product.variants || []) as SaleorVariant[];
	const attributeGroups = groupVariantsByAttributes(variants);
	const initialSelections =
		initialVariantId && attributeGroups.length > 0
			? getSelectionsFromVariant(variants, initialVariantId)
			: {};

	async function addToCart(formData: FormData) {
		"use server";

		const selectedVariantID = String(formData.get("variantId") ?? "");
		if (!selectedVariantID) {
			return;
		}

		try {
			const checkout = await Checkout.findOrCreate({
				checkoutId: await Checkout.getIdFromCookies(channel),
				channel: channel,
			});

			if (!checkout) {
				console.error("Add to cart: Failed to create checkout");
				return;
			}

			await Checkout.saveIdToCookie(channel, checkout.id);

			const addResult = await executeAuthenticatedGraphQL(CheckoutAddLineDocument, {
				variables: {
					id: checkout.id,
					productVariantId: decodeURIComponent(selectedVariantID),
					quantity: 1,
				},
				cache: "no-cache",
			});

			if (!addResult.ok) {
				console.error("Add to cart failed:", addResult.error.message);
				return;
			}

			revalidatePath("/cart");
		} catch (error) {
			console.error("Add to cart failed:", error);
		}
	}

	return (
		<PdpVariantProvider
			product={product}
			channel={channel}
			initialVariantId={initialVariantId}
			initialSelections={initialSelections}
		>
			<div className={layout.galleryColumn}>
				<VariantGalleryClient />
			</div>

			<div className={layout.infoColumn}>
				<h1 className="order-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					{product.name}
				</h1>

				<VariantBuyBox addToCartAction={addToCart} />

				{layout.attributesPlacement === "info" && productAttributesNode ? (
					<div className="order-4 mt-6">{productAttributesNode}</div>
				) : null}
			</div>
		</PdpVariantProvider>
	);
}

export function VariantSectionSkeleton() {
	return (
		<>
			<div className="order-1 h-4 w-20 animate-pulse animate-skeleton-delayed rounded bg-muted opacity-0" />
			<div className="order-3 mt-4 animate-pulse animate-skeleton-delayed space-y-6 opacity-0">
				<div className="space-y-4">
					<div className="h-4 w-16 rounded bg-muted" />
					<div className="flex gap-2">
						<div className="h-10 w-16 rounded bg-muted" />
						<div className="h-10 w-16 rounded bg-muted" />
						<div className="h-10 w-16 rounded bg-muted" />
					</div>
				</div>
				<div className="h-8 w-24 rounded bg-muted" />
				<div className="h-12 w-full rounded bg-muted" />
			</div>
		</>
	);
}
