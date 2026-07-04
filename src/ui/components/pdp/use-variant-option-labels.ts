"use client";

/** Shared PDP variant-option tooltips and screen-reader fragments. */
export function useVariantOptionLabels() {
	return {
		outOfStockTitle: (name: string) => `${name} — out of stock`,
		willChangeSelections: (name: string) => `${name} — will update other selections`,
		percentOffTitle: (name: string, percent: number) => `${name} — ${percent}% off`,
		outOfStockA11y: () => "Out of stock",
		percentOffA11y: (percent: number) => `${percent}% off`,
		selectedA11y: () => "Selected",
	};
}
