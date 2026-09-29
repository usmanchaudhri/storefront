"use client";

import { cn } from "@/lib/utils";
import { useVariantOptionLabels } from "@/ui/components/pdp/use-variant-option-labels";
import type { OptionRendererProps } from "../types";
import { getSizeOptionDisplay } from "../option-display-meta";

/**
 * Figma 3150:101 — size option as a two-line card (title + subtitle) with optional badge.
 */
export function SizeCardOption({ option, isSelected, onSelect, isPending }: OptionRendererProps) {
	const isOutOfStock = !option.available;
	const isIncompatible = option.existsWithCurrentSelection === false && !isSelected;
	const labels = useVariantOptionLabels();
	const { subtitle, badge } = getSizeOptionDisplay(option.name);

	const accessibleParts = [
		`Size ${option.name}`,
		subtitle,
		badge,
		isOutOfStock && labels.outOfStockA11y(),
	].filter(Boolean);

	return (
		<button
			type="button"
			onClick={() => onSelect(option.id)}
			disabled={isOutOfStock || isPending}
			aria-disabled={isOutOfStock || isPending}
			aria-pressed={isSelected}
			aria-label={accessibleParts.join(", ")}
			title={
				isOutOfStock
					? labels.outOfStockTitle(option.name)
					: isIncompatible
						? labels.willChangeSelections(option.name)
						: undefined
			}
			className={cn(
				"relative flex min-h-[72px] flex-1 flex-col items-center justify-center rounded-xl px-[17px] py-3.5 text-center transition-colors",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				isSelected
					? "border-2 border-[#107357] bg-[#eaf3ef] text-[#107357] shadow-sm"
					: "border border-[#e2eae5] bg-white text-[#0f2d24] hover:border-[#107357]/40",
				isIncompatible && !isSelected && "text-[#71827a]",
				isOutOfStock && "cursor-not-allowed opacity-60",
				isPending && "pointer-events-none opacity-60",
			)}
			data-figma-option="size-card"
		>
			{badge ? (
				<span className="absolute -top-2.5 right-3 rounded-full bg-[#107357] px-2 py-0.5 text-[10px] font-bold leading-[15px] text-white">
					{badge}
				</span>
			) : null}
			<span
				className={cn(
					"text-sm font-semibold leading-5",
					isSelected ? "text-[#107357]" : "text-[#0f2d24]",
					isOutOfStock && "line-through",
				)}
			>
				{option.name}
			</span>
			{subtitle ? (
				<span
					className={cn(
						"mt-0.5 text-xs leading-4",
						isSelected ? "font-medium text-[rgba(16,115,87,0.8)]" : "font-normal text-[#71827a]",
					)}
				>
					{subtitle}
				</span>
			) : null}
		</button>
	);
}
