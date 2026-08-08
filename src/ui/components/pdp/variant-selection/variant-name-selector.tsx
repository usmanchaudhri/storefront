"use client";

import { cn, formatMoney } from "@/lib/utils";

function parseBottleGummiesLabels(name: string): { primary: string; secondary?: string } {
	const s = name.trim();
	const bottleMatch = s.match(/(\d+)\s*bottles?\b/i) ?? s.match(/\b(\d+)\b/);
	const gummiesMatch = s.match(/(\d+)\s*gumm(?:y|ies)\b/i);

	const bottles = bottleMatch ? Number.parseInt(bottleMatch[1]!, 10) : NaN;
	const primary =
		Number.isFinite(bottles) && bottles > 0 ? `${bottles} ${bottles === 1 ? "Bottle" : "Bottles"}` : s;

	const secondaryFromGummies = gummiesMatch ? `${gummiesMatch[1]} Gummies` : undefined;
	if (secondaryFromGummies) return { primary, secondary: secondaryFromGummies };

	// Fallback: keep a clear second line by using the remaining text.
	const remainder = bottleMatch ? s.replace(bottleMatch[0]!, "").trim() : "";
	return remainder ? { primary, secondary: remainder } : { primary };
}

/**
 * Fallback selector for variants that have no structured attributes.
 *
 * Used when variants only have names (e.g., "Navy blue S", "Navy blue M")
 * but no attribute data for grouping by Color/Size/etc.
 *
 * ## When this is used
 *
 * - Variants have empty `attributes` arrays
 * - Product has multiple variants but no attribute-based grouping possible
 *
 * ## Limitations vs. structured attributes
 *
 * - No color swatches or visual differentiation
 * - No cross-filtering (can't gray out incompatible options)
 * - Combinatorial explosion for products with many variants
 * - Inconsistent UX compared to attribute-based selectors
 *
 * Consider configuring proper variant attributes in Saleor Dashboard
 * for a better customer experience.
 */

interface VariantNameSelectorProps {
	variants: Array<{
		id: string;
		name: string;
		quantityAvailable?: number | null;
		pricing?: {
			price?: { gross: { amount: number; currency: string } } | null;
			priceUndiscounted?: { gross: { amount: number; currency: string } } | null;
		} | null;
	}>;
	selectedVariantId?: string;
	onSelect: (variantId: string) => void;
	label?: string;
	/** Whether a transition is in progress */
	isPending?: boolean;
}

export function VariantNameSelector({
	variants,
	selectedVariantId,
	onSelect,
	label = "",
	isPending,
}: VariantNameSelectorProps) {
	const selectedVariant = variants.find((v) => v.id === selectedVariantId);

	return (
		<div className="space-y-3">
			{label ? (
				<div className="flex items-center gap-2">
					<span className="text-base font-medium">{label}</span>
					{selectedVariant && (
						<span className="text-foreground/80 text-base">
							{parseBottleGummiesLabels(selectedVariant.name).primary}
						</span>
					)}
				</div>
			) : null}

			<div
				role="group"
				aria-label={label}
				aria-busy={isPending}
				className={cn(
					"grid grid-cols-1 gap-3 transition-opacity duration-150 sm:grid-cols-2 lg:grid-cols-3",
					isPending && "pointer-events-none opacity-60",
				)}
				style={{ transitionDelay: isPending ? "100ms" : "0ms" }}
			>
				{variants.map((variant) => {
					const isSelected = variant.id === selectedVariantId;
					const isOutOfStock = (variant.quantityAvailable ?? 0) <= 0;
					const price = variant.pricing?.price?.gross;
					const undiscountedPrice = variant.pricing?.priceUndiscounted?.gross;
					const showSellingPrice = !!price?.currency && typeof price.amount === "number";
					const showWasPrice =
						showSellingPrice &&
						undiscountedPrice &&
						typeof undiscountedPrice.amount === "number" &&
						undiscountedPrice.amount > price!.amount;
					const hasDiscount = !!(price && undiscountedPrice && undiscountedPrice.amount > price.amount);
					const discountPercent = hasDiscount
						? Math.round((1 - price!.amount / undiscountedPrice!.amount) * 100)
						: null;
					const { primary, secondary } = parseBottleGummiesLabels(variant.name);
					const isMostPopular = /\b2\s*Bottle/i.test(primary);
					const isBottleBundleCard = /\bBottle/i.test(primary);

					// Build accessible label
					const accessibleParts = [
						primary,
						secondary,
						isOutOfStock && "out of stock",
						showSellingPrice && formatMoney(price!.amount, price!.currency),
						showWasPrice && `was ${formatMoney(undiscountedPrice!.amount, price!.currency)}`,
						discountPercent && `${discountPercent}% off`,
					].filter(Boolean);

					return (
						<div key={variant.id} className="relative">
							{isMostPopular ? (
								<span className="pointer-events-none absolute -top-2.5 left-2 z-10 max-w-[calc(100%-1rem)] truncate rounded-full bg-teal-600 px-2 py-1 text-[11px] font-bold uppercase leading-tight tracking-wide text-white sm:left-3 sm:px-2.5 sm:py-0.5 sm:text-[10px]">
									Most Popular
								</span>
							) : /\b3\s*Bottle/i.test(primary) ? (
								<span className="pointer-events-none absolute -top-2.5 left-2 z-10 max-w-[calc(100%-1rem)] truncate rounded-full bg-foreground px-2 py-1 text-[11px] font-bold uppercase leading-tight tracking-wide text-background sm:left-3 sm:px-2.5 sm:py-0.5 sm:text-[10px]">
									Best Value
								</span>
							) : null}
							<button
								type="button"
								onClick={() => onSelect(variant.id)}
								disabled={isOutOfStock}
								aria-disabled={isOutOfStock}
								className={cn(
									"relative flex w-full flex-col justify-between rounded-xl border-2 text-left transition-colors",
									/\bBottle/i.test(primary) ? "min-h-[104px] p-2.5" : "min-h-[124px] p-4",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									isSelected
										? "border-teal-600 bg-teal-500/10 text-foreground"
										: "bg-muted/15 hover:bg-muted/30 border-border text-foreground hover:border-teal-600/30",
									isOutOfStock && "cursor-not-allowed text-muted-foreground line-through opacity-60",
								)}
								title={isOutOfStock ? `${variant.name} - Out of stock` : undefined}
								aria-label={accessibleParts.join(", ")}
								aria-pressed={isSelected}
							>
								<div
									className={cn(
										"flex flex-1 flex-col justify-between",
										/\bBottle/i.test(primary) ? "gap-1.5" : "gap-3",
									)}
								>
									<div>
										<p
											className={cn(
												"font-semibold leading-snug text-foreground",
												isBottleBundleCard ? "text-[15px] sm:text-sm" : "text-base sm:text-sm",
											)}
										>
											{primary}
										</p>
										{secondary ? (
											<p className="mt-1 text-sm font-medium leading-snug text-muted-foreground sm:text-xs">
												{secondary}
											</p>
										) : null}
									</div>
									{showSellingPrice ? (
										<div className="flex flex-col gap-1.5">
											<div className="flex flex-wrap items-end gap-x-2 gap-y-0.5">
												<span
													className={cn(
														"font-bold tabular-nums text-foreground",
														isBottleBundleCard ? "text-lg" : "text-xl sm:text-2xl",
													)}
												>
													{formatMoney(price!.amount, price!.currency)}
												</span>
												{showWasPrice ? (
													<span
														className={cn(
															"font-medium tabular-nums text-muted-foreground line-through",
															isBottleBundleCard ? "text-sm sm:text-[13px]" : "text-base sm:text-sm",
														)}
													>
														{formatMoney(undiscountedPrice!.amount, price!.currency)}
													</span>
												) : null}
											</div>
											{discountPercent ? (
												<span className="bg-primary/12 inline-flex w-fit rounded-md px-2 py-1 text-sm font-semibold text-primary sm:py-0.5 sm:text-xs">
													Save {discountPercent}%
												</span>
											) : null}
										</div>
									) : null}
								</div>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
