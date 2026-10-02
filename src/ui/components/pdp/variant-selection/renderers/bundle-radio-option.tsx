"use client";

import { cn, formatMoney } from "@/lib/utils";
import { useVariantOptionLabels } from "@/ui/components/pdp/use-variant-option-labels";
import type { OptionRendererProps } from "../types";
import { getBundleOptionDisplay } from "../option-display-meta";

/**
 * Figma 3150:121 — bundle option as a full-width radio card with price.
 */
export function BundleRadioOption({ option, isSelected, onSelect, isPending }: OptionRendererProps) {
	const isOutOfStock = !option.available;
	const isIncompatible = option.existsWithCurrentSelection === false && !isSelected;
	const labels = useVariantOptionLabels();

	const price = option.price;
	const undiscounted = option.priceUndiscounted;
	const showPrice = !!price?.currency && typeof price.amount === "number";
	const showWas =
		showPrice &&
		undiscounted &&
		typeof undiscounted.amount === "number" &&
		undiscounted.amount > price.amount;

	const { subtitle, badge, badgeTone } = getBundleOptionDisplay(
		option.name,
		price,
		undiscounted,
		formatMoney,
	);

	const accessibleParts = [
		`Bundle ${option.name}`,
		subtitle,
		badge,
		showPrice && formatMoney(price.amount, price.currency),
		showWas && `was ${formatMoney(undiscounted!.amount, undiscounted!.currency)}`,
		isOutOfStock && labels.outOfStockA11y(),
	].filter(Boolean);

	return (
		<button
			type="button"
			role="radio"
			aria-checked={isSelected}
			onClick={() => onSelect(option.id)}
			disabled={isOutOfStock || isPending}
			aria-disabled={isOutOfStock || isPending}
			aria-label={accessibleParts.join(", ")}
			title={
				isOutOfStock
					? labels.outOfStockTitle(option.name)
					: isIncompatible
						? labels.willChangeSelections(option.name)
						: undefined
			}
			className={cn(
				"group flex w-full items-center justify-between gap-3 rounded-xl text-left transition-colors",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				isSelected
					? "border-2 border-[#107357] bg-[rgba(234,243,239,0.6)] py-4 pl-[15px] pr-4 shadow-sm"
					: "border border-[#e2eae5] bg-white p-[15px] hover:border-[#107357] hover:bg-[#eaf3ef]",
				isOutOfStock && "cursor-not-allowed opacity-60",
				isPending && "pointer-events-none opacity-60",
			)}
			data-figma-option="bundle-radio"
		>
			<span className="flex min-w-0 items-center gap-3">
				<span
					aria-hidden
					className={cn(
						"flex size-4 shrink-0 items-center justify-center rounded-full border",
						isSelected
							? "size-[18px] border-transparent bg-[#107357]"
							: "border-[#e2eae5] bg-white group-hover:border-[#107357]",
					)}
				>
					{isSelected ? <span className="size-2 rounded-full bg-white" /> : null}
				</span>

				<span className="flex min-w-0 flex-col gap-1">
					<span className="flex flex-wrap items-center gap-2">
						<span
							className={cn(
								"text-[15px] leading-5 text-[#0f2d24]",
								isSelected ? "font-bold" : "font-semibold group-hover:text-[#107357]",
								isOutOfStock && "line-through",
							)}
						>
							{option.name}
						</span>
						{badge ? (
							<span
								className={cn(
									"rounded-full px-2 py-0.5 text-[10px] font-bold leading-[15px] text-white",
									badgeTone === "gold" ? "bg-[#d9953b]" : "bg-[#107357]",
								)}
							>
								{badge}
							</span>
						) : null}
					</span>
					{subtitle ? (
						<span
							className={cn(
								"text-[13px] leading-4",
								isSelected ? "text-[#4b5b54]" : "text-[#71827a] group-hover:text-[#4b5b54]",
							)}
						>
							{subtitle}
						</span>
					) : null}
				</span>
			</span>

			{showPrice ? (
				<span className="flex shrink-0 flex-col items-end gap-1">
					<span
						className={cn(
							"text-[15px] font-bold tabular-nums leading-5",
							isSelected ? "text-[#107357]" : "text-[#0f2d24] group-hover:text-[#107357]",
						)}
					>
						{formatMoney(price.amount, price.currency)}
					</span>
					{showWas ? (
						<span className="text-[13px] tabular-nums leading-4 text-[#71827a] line-through">
							{formatMoney(undiscounted!.amount, undiscounted!.currency)}
						</span>
					) : null}
				</span>
			) : null}
		</button>
	);
}
