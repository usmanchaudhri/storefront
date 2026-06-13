"use client";

import { cn, formatMoney } from "@/lib/utils";
import type { OptionRendererProps } from "../types";

export interface ButtonOptionProps extends OptionRendererProps {
	/** Optional prefix for accessible label (e.g., "Size" → "Size M") */
	labelPrefix?: string;
	/** Minimum width of the button */
	minWidth?: string;
}

/**
 * Renders a variant option as a rectangular button.
 *
 * Visual states:
 * - Normal: Full styling, clickable
 * - Selected: Inverted colors (dark bg, light text)
 * - Incompatible: Dimmed border/text, still clickable - will clear other selections
 * - Out of stock: Strikethrough, disabled
 * - On sale: Small discount badge
 */
export function ButtonOption({
	option,
	isSelected,
	onSelect,
	isPending,
	labelPrefix,
	minWidth = "9rem",
}: ButtonOptionProps) {
	const isOutOfStock = !option.available;
	const isIncompatible = option.existsWithCurrentSelection === false && !isSelected;
	const hasDiscount = option.discountPercent && !isOutOfStock;

	const showPrice = typeof option.sellingPriceAmount === "number" && !!option.currency;
	/** `costPriceAmount` is `priceUndiscounted.gross` when Saleor returns it; show struck-through when above current `price.gross`. */
	const showUndiscounted =
		showPrice &&
		typeof option.costPriceAmount === "number" &&
		option.costPriceAmount > option.sellingPriceAmount!;
	const percentOff = typeof option.percentOff === "number" ? option.percentOff : undefined;
	const badgePercent = percentOff ?? option.discountPercent;
	const isMostPopular = /\b2\s*Bottle/i.test(option.primaryLabel || option.name);
	const isBottleBundleCard = /\bBottle/i.test(option.primaryLabel || option.name);
	const effectiveMinWidth = isBottleBundleCard ? "0px" : minWidth;

	// Build accessible label with context
	const displayName = option.primaryLabel
		? [option.primaryLabel, option.secondaryLabel].filter(Boolean).join(", ")
		: option.name;
	const accessibleParts = [
		labelPrefix ? `${labelPrefix} ${displayName}` : displayName,
		isOutOfStock && "out of stock",
		showPrice && formatMoney(option.sellingPriceAmount!, option.currency!),
		showUndiscounted && `was ${formatMoney(option.costPriceAmount!, option.currency!)}`,
		percentOff && `${percentOff}% off`,
		hasDiscount && `${option.discountPercent}% off`,
	].filter(Boolean);

	return (
		<div
			className={cn(
				"relative transition-opacity duration-150",
				isPending && "pointer-events-none opacity-60",
			)}
			style={{ transitionDelay: isPending ? "100ms" : "0ms" }}
		>
			{isMostPopular ? (
				<span className="pointer-events-none absolute -top-2.5 left-2 z-10 max-w-[calc(100%-1rem)] truncate rounded-full bg-teal-600 px-2 py-1 text-[11px] font-bold uppercase leading-tight tracking-wide text-white sm:left-3 sm:px-2.5 sm:py-0.5 sm:text-[10px]">
					Most Popular
				</span>
			) : /\b3\s*Bottle/i.test(option.primaryLabel || option.name) ? (
				<span className="pointer-events-none absolute -top-2.5 left-2 z-10 max-w-[calc(100%-1rem)] truncate rounded-full bg-foreground px-2 py-1 text-[11px] font-bold uppercase leading-tight tracking-wide text-background sm:left-3 sm:px-2.5 sm:py-0.5 sm:text-[10px]">
					Best Value
				</span>
			) : null}
			<button
				type="button"
				onClick={() => onSelect(option.id)}
				disabled={isOutOfStock || isPending}
				aria-disabled={isOutOfStock || isPending}
				style={{ minWidth: effectiveMinWidth }}
				className={cn(
					"relative flex w-full flex-col justify-between rounded-xl border-2 text-left transition-colors",
					isBottleBundleCard ? "min-h-[104px] p-2.5" : "min-h-[124px] p-4",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					isSelected
						? "border-teal-600 bg-teal-500/10 text-foreground"
						: isIncompatible
							? "bg-muted/10 border-border text-muted-foreground hover:border-border"
							: "bg-muted/15 hover:bg-muted/30 border-border text-foreground hover:border-teal-600/30",
					isOutOfStock && "cursor-not-allowed text-muted-foreground line-through opacity-60",
				)}
				title={
					isOutOfStock
						? `${option.name} - Out of stock`
						: isIncompatible
							? `${option.name} - Will change other selections`
							: option.discountPercent
								? `${option.name} - ${option.discountPercent}% off`
								: undefined
				}
				aria-label={accessibleParts.join(", ")}
				aria-pressed={isSelected}
			>
				<div className={cn("flex flex-1 flex-col justify-between", isBottleBundleCard ? "gap-1.5" : "gap-3")}>
					<div>
						<p
							className={cn(
								"font-semibold leading-snug text-foreground",
								isBottleBundleCard ? "text-[15px] sm:text-sm" : "text-base sm:text-sm",
							)}
						>
							{option.primaryLabel || option.name}
						</p>
						{option.secondaryLabel ? (
							<p className="mt-1 text-sm font-medium leading-snug text-muted-foreground sm:text-xs">
								{option.secondaryLabel}
							</p>
						) : null}
					</div>
					{showPrice && (
						<div className="flex flex-col gap-1.5">
							<div className="flex flex-wrap items-end gap-x-2 gap-y-0.5">
								<span
									className={cn(
										"font-bold tabular-nums text-foreground",
										isBottleBundleCard ? "text-lg" : "text-xl sm:text-2xl",
									)}
								>
									{formatMoney(option.sellingPriceAmount!, option.currency!)}
								</span>
								{showUndiscounted ? (
									<span
										className={cn(
											"font-medium tabular-nums text-muted-foreground line-through",
											isBottleBundleCard ? "text-sm sm:text-[13px]" : "text-base sm:text-sm",
										)}
									>
										{formatMoney(option.costPriceAmount!, option.currency!)}
									</span>
								) : null}
							</div>
							{badgePercent ? (
								<span
									className={cn(
										"bg-primary/12 inline-flex w-fit rounded-md px-2 py-1 font-semibold text-primary sm:py-0.5",
										isBottleBundleCard ? "text-xs sm:text-[11px]" : "text-sm sm:text-xs",
									)}
								>
									Save {badgePercent}%
								</span>
							) : null}
						</div>
					)}
				</div>
			</button>
			{/* keep badge area reserved by using in-card Save % chip */}
		</div>
	);
}

// Backwards-compatible aliases
export function SizeButtonOption(props: OptionRendererProps) {
	return <ButtonOption {...props} labelPrefix="Size" />;
}

export function TextOption(props: OptionRendererProps) {
	return <ButtonOption {...props} minWidth="10rem" />;
}
