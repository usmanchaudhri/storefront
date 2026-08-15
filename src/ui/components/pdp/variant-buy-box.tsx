"use client";

import { formatMoney, formatMoneyRange } from "@/lib/utils";
import { getDiscountInfo } from "@/lib/pricing";
import { AddToCart } from "./add-to-cart";
import { VariantSelectionSection } from "./variant-selection";
import { StickyBar } from "./sticky-bar";
import { Badge } from "@/ui/components/ui/badge";
import { SaleBadge } from "@/ui/components/ui/sale-label";
import { usePdpVariant } from "./pdp-variant-provider";

interface VariantBuyBoxProps {
	addToCartAction: (formData: FormData) => Promise<void>;
}

/**
 * Client buy box — price, stock, and selection update instantly from
 * preloaded variant data. URL is soft-synced without blocking navigation.
 */
export function VariantBuyBox({ addToCartAction }: VariantBuyBoxProps) {
	const { product, channel, selectedVariantId, selectedVariant } = usePdpVariant();
	const variants = product.variants || [];

	const isAvailable = variants.some((variant) => variant.quantityAvailable);

	const isAddToCartDisabled = !selectedVariantId || !selectedVariant?.quantityAvailable;
	const disabledReason = !selectedVariantId
		? ("no-selection" as const)
		: !selectedVariant?.quantityAvailable
			? ("out-of-stock" as const)
			: undefined;

	const price = selectedVariant?.pricing?.price?.gross
		? selectedVariant.pricing.price.gross.amount === 0
			? "FREE"
			: formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: formatMoneyRange({
				start: product.pricing?.priceRange?.start?.gross,
				stop: product.pricing?.priceRange?.stop?.gross,
			}) || "";

	const currentPrice = selectedVariant?.pricing?.price?.gross?.amount;
	const undiscountedPrice = selectedVariant?.pricing?.priceUndiscounted?.gross?.amount;
	const { isOnSale, discountPercent } = getDiscountInfo(currentPrice, undiscountedPrice);

	const compareAtPrice =
		isOnSale && selectedVariant?.pricing?.priceUndiscounted?.gross
			? formatMoney(
					selectedVariant.pricing.priceUndiscounted.gross.amount,
					selectedVariant.pricing.priceUndiscounted.gross.currency,
				)
			: null;

	return (
		<>
			<div className="order-1 flex items-center gap-2">
				{product.category && (
					<span className="text-[13px] font-bold uppercase leading-[19px] tracking-[2.34px] text-[#00A38C]">
						{product.category.name}
					</span>
				)}
				{isOnSale && <SaleBadge />}
				{!isAvailable && (
					<Badge variant="secondary" className="text-xs">
						Out of stock
					</Badge>
				)}
			</div>

			<form action={addToCartAction} className="order-3 mt-4 space-y-6">
				<input type="hidden" name="variantId" value={selectedVariantId ?? ""} />
				<div className="space-y-6 rounded-2xl bg-white p-5 sm:p-6">
					<VariantSelectionSection
						variants={variants}
						selectedVariantId={selectedVariantId}
						productSlug={product.slug}
						channel={channel}
					/>

					<AddToCart
						price={price}
						compareAtPrice={compareAtPrice}
						discountPercent={discountPercent}
						disabled={isAddToCartDisabled}
						disabledReason={disabledReason}
					/>
				</div>

				<StickyBar productName={product.name} price={price} show={!isAddToCartDisabled} />
			</form>
		</>
	);
}
