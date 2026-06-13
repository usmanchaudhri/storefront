import { revalidatePath } from "next/cache";

import { formatMoney, formatMoneyRange } from "@/lib/utils";
import { getDiscountInfo } from "@/lib/pricing";
import { CheckoutAddLineDocument, type ProductDetailsQuery } from "@/gql/graphql";
import { executeAuthenticatedGraphQL } from "@/lib/graphql";
import * as Checkout from "@/lib/checkout";

import { extractPdpPackageSectionConfig } from "@/config/pdp-layout";
import { AddToCart } from "./add-to-cart";
import { VariantSelectionSection } from "./variant-selection";
import { countVariantSelectionSteps, type SaleorVariant } from "./variant-selection/utils";
import { StickyBar } from "./sticky-bar";
import { Badge } from "@/ui/components/ui/badge";

type Product = NonNullable<ProductDetailsQuery["product"]>;

interface VariantSectionDynamicProps {
	product: Product;
	channel: string;
	searchParams: Promise<{ variant?: string }>;
}

/**
 * Dynamic variant section for PDP.
 *
 * With Cache Components enabled, this component streams at request time
 * because it accesses searchParams (runtime data). The product data is
 * already cached in the static shell - this just adds the interactive parts.
 */
export async function VariantSectionDynamic({ product, channel, searchParams }: VariantSectionDynamicProps) {
	const { variant: variantParam } = await searchParams;
	const variants = product.variants || [];
	const packageSection = extractPdpPackageSectionConfig(product);

	// Auto-select variant: use URL param, or auto-select if only one variant exists
	const selectedVariantID = variantParam || (variants.length === 1 ? variants[0].id : undefined);
	const selectedVariant = variants.find(({ id }) => id === selectedVariantID);

	// Check availability
	const isAvailable = variants.some((variant) => variant.quantityAvailable);

	// Determine add-to-cart button state
	const isAddToCartDisabled = !selectedVariantID || !selectedVariant?.quantityAvailable;
	const disabledReason = !selectedVariantID
		? ("no-selection" as const)
		: !selectedVariant?.quantityAvailable
			? ("out-of-stock" as const)
			: undefined;

	// Format prices
	const price = selectedVariant?.pricing?.price?.gross
		? selectedVariant.pricing.price.gross.amount === 0
			? "FREE"
			: formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: formatMoneyRange({
				start: product.pricing?.priceRange?.start?.gross,
				stop: product.pricing?.priceRange?.stop?.gross,
			}) || "";

	// Calculate discount/sale information
	const currentPrice = selectedVariant?.pricing?.price?.gross?.amount;
	const undiscountedPrice = selectedVariant?.pricing?.priceUndiscounted?.gross?.amount;
	const { isOnSale } = getDiscountInfo(currentPrice, undiscountedPrice);

	const variantStepCount = countVariantSelectionSteps(variants as SaleorVariant[]);
	const showVariantStep = variantStepCount > 0;
	const addToCartFlowStepStart = showVariantStep ? variantStepCount + 1 : 1;

	// Server action for adding to cart
	async function addToCart(formData: FormData) {
		"use server";

		if (!selectedVariantID) {
			// Silently return - button should be disabled if no variant selected
			return;
		}

		const requestedQuantity = Number(formData.get("quantity"));
		const quantity = Number.isFinite(requestedQuantity)
			? Math.min(99, Math.max(1, Math.floor(requestedQuantity)))
			: 1;

		try {
			const checkout = await Checkout.findOrCreate({
				checkoutId: await Checkout.getIdFromCookies(channel),
				channel: channel,
			});

			if (!checkout) {
				// Log error server-side, UI will show via ErrorBoundary if needed
				console.error("Add to cart: Failed to create checkout");
				return;
			}

			await Checkout.saveIdToCookie(channel, checkout.id);

			const addResult = await executeAuthenticatedGraphQL(CheckoutAddLineDocument, {
				variables: {
					id: checkout.id,
					productVariantId: decodeURIComponent(selectedVariantID),
					quantity,
				},
				cache: "no-cache",
			});

			if (!addResult.ok) {
				console.error("Add to cart failed:", addResult.error.message);
				return;
			}

			revalidatePath("/cart");
		} catch (error) {
			// Log error server-side - the UI feedback comes from cart drawer/badge update
			// For explicit error UI, would need useActionState (separate enhancement)
			console.error("Add to cart failed:", error);
		}
	}

	return (
		<form action={addToCart} className="mt-4 w-full">
			<div className="ring-border/50 overflow-hidden rounded-2xl border border-border bg-card shadow-lg ring-1">
				<div className="px-5 py-5 sm:px-6 sm:py-6">
					{(isOnSale || !isAvailable) && (
						<div className="mb-4 flex flex-wrap gap-2">
							{isOnSale && (
								<Badge variant="destructive" className="text-xs font-semibold">
									Sale
								</Badge>
							)}
							{!isAvailable && (
								<Badge variant="secondary" className="text-xs font-semibold">
									Out of stock
								</Badge>
							)}
						</div>
					)}

					<div className="flex flex-col gap-6">
						{showVariantStep ? (
							<VariantSelectionSection
								className="space-y-6 py-0"
								variants={variants}
								selectedVariantId={selectedVariantID}
								productSlug={product.slug}
								channel={channel}
							/>
						) : null}

						<AddToCart
							basePriceAmount={selectedVariant?.pricing?.price?.gross?.amount}
							currency={selectedVariant?.pricing?.price?.gross?.currency}
							fallbackPriceLabel={price}
							disabled={isAddToCartDisabled}
							disabledReason={disabledReason}
							packageSectionTitle={packageSection.sectionTitle}
							packageUnitSingular={packageSection.unitSingular}
							packageUnitPlural={packageSection.unitPlural}
							packageSelectionMode={packageSection.mode}
							packageTiers={packageSection.packageTiers}
							// Bundles/package tiers are handled via Saleor promotions/variants, not PDP UI.
							// Keep quantity=1 behavior by forcing the package section off.
							showPackageSection={false}
							flowStepStart={addToCartFlowStepStart}
						/>
					</div>
				</div>
			</div>

			<div className="mt-4">
				<StickyBar productName={product.name} price={price} show={!isAddToCartDisabled} />
			</div>
		</form>
	);
}

/**
 * Skeleton fallback for variant section.
 *
 * Uses delayed visibility (300ms) to prevent flash on fast loads.
 * Part of the static shell - shows while variant data streams in.
 */
export function VariantSectionSkeleton() {
	return (
		<div className="mt-4 w-full animate-pulse animate-skeleton-delayed opacity-0">
			<div className="bg-muted/30 overflow-hidden rounded-2xl border border-border">
				<div className="space-y-6 p-5 sm:p-6">
					<div className="flex gap-3">
						<div className="h-9 w-9 rounded-full bg-muted" />
						<div className="h-4 w-36 rounded bg-muted pt-2" />
					</div>
					<div className="flex gap-2">
						<div className="h-11 w-24 rounded-lg bg-muted" />
						<div className="h-11 w-24 rounded-lg bg-muted" />
					</div>
					<div className="h-14 w-full rounded-xl bg-muted" />
					<div className="bg-muted/70 h-12 w-full rounded-xl" />
				</div>
			</div>
		</div>
	);
}
