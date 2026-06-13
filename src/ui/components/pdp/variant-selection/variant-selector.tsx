"use client";

import type { VariantSelectorProps, OptionRenderer } from "./types";
import { defaultRenderers } from "./renderers";
import { getGummySizeOptionLabels } from "./gummy-size-display";

/**
 * A single variant selector for one attribute (e.g., Color or Size).
 *
 * Renders options using the appropriate renderer based on:
 * 1. Explicit `renderer` prop
 * 2. `attributeSlug` for registry lookup
 * 3. `colorHex` presence (uses `_color` renderer)
 * 4. `_default` fallback
 */
export function VariantSelector({
	label,
	options,
	selectedId,
	attributeSlug,
	onSelect,
	renderer: explicitRenderer,
	unavailableMessage,
	isPending,
	showLabel = true,
}: VariantSelectorProps) {
	const selectedOption = options.find((opt) => opt.id === selectedId);

	const handleSelect = (optionId: string) => {
		const option = options.find((opt) => opt.id === optionId);
		if (!option?.available) return;
		onSelect(attributeSlug, optionId);
	};

	if (!options.length) return null;

	// Determine which renderer to use for each option
	const getRendererForOption = (option: (typeof options)[number]): OptionRenderer => {
		// 1. Explicit renderer prop takes precedence
		if (explicitRenderer) return explicitRenderer;

		// 2. If option has colorHex, use color swatch
		if (option.colorHex && defaultRenderers._color) {
			return defaultRenderers._color;
		}

		// 3. Try attribute slug
		if (attributeSlug && attributeSlug in defaultRenderers) {
			return defaultRenderers[attributeSlug];
		}

		// 4. Fallback to default
		return defaultRenderers._default;
	};

	// Group options by renderer for better layout
	const colorOptions = options.filter((opt) => opt.colorHex);
	const textOptions = options.filter((opt) => !opt.colorHex);

	const normalizedSlug = (attributeSlug ?? "").toLowerCase();
	const normalizedLabel = (label ?? "").toLowerCase();
	const isGummySize =
		normalizedSlug === "gummy-size" ||
		normalizedLabel === "gummy size" ||
		(normalizedSlug === "size" && normalizedLabel.includes("gummy"));

	const normalizeOptionForDisplay = (option: (typeof options)[number]) => {
		if (!isGummySize) return option;

		const sizeLabels = getGummySizeOptionLabels(option.name);

		// For Gummy Size, hide pricing/discount UI from the option card.
		return {
			...option,
			primaryLabel: sizeLabels?.primaryLabel ?? option.name,
			secondaryLabel: sizeLabels?.secondaryLabel,
			sellingPriceAmount: undefined,
			costPriceAmount: undefined,
			currency: undefined,
			percentOff: undefined,
			discountPercent: undefined,
		};
	};

	const isCardGrid =
		["size", "pack", "bundle", "quantity", "serving", "servings"].includes(
			attributeSlug?.toLowerCase?.() ?? "",
		) ||
		label.toLowerCase().includes("size") ||
		label.toLowerCase().includes("pack");

	const isGummyBundle =
		normalizedSlug === "gummy-bundle" ||
		normalizedLabel === "gummy bundle" ||
		(normalizedSlug.includes("bundle") && normalizedLabel.includes("gummy"));

	const labelId = `variant-label-${attributeSlug}`;

	return (
		<div className="space-y-3">
			{showLabel ? (
				<div className="flex items-center gap-2">
					<span id={labelId} className="text-sm font-medium">
						{label}
					</span>
					{unavailableMessage ? (
						<span className="text-sm text-muted-foreground" role="status">
							{unavailableMessage}
						</span>
					) : selectedOption ? (
						<span className="text-sm text-muted-foreground">{selectedOption.name}</span>
					) : null}
				</div>
			) : unavailableMessage ? (
				<span className="text-sm text-muted-foreground" role="status">
					{unavailableMessage}
				</span>
			) : null}

			{/* Color swatches row */}
			{colorOptions.length > 0 && (
				<div role="group" aria-labelledby={labelId} className="flex flex-wrap gap-4">
					{colorOptions.map((option) => {
						const Renderer = getRendererForOption(option);
						return (
							<Renderer
								key={option.id}
								option={option}
								isSelected={selectedId === option.id}
								onSelect={handleSelect}
								isPending={isPending}
							/>
						);
					})}
				</div>
			)}

			{/* Text/Size buttons row */}
			{textOptions.length > 0 && (
				<div
					role="group"
					aria-labelledby={labelId}
					className={
						isCardGrid
							? isGummyBundle
								? "grid grid-cols-1 gap-3 md:grid-cols-3"
								: isGummySize
									? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4"
									: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
							: "flex flex-wrap gap-4"
					}
				>
					{textOptions.map((option) => {
						const normalizedOption = normalizeOptionForDisplay(option);
						const Renderer = getRendererForOption(normalizedOption);
						return (
							<Renderer
								key={option.id}
								option={normalizedOption}
								isSelected={selectedId === option.id}
								onSelect={handleSelect}
								isPending={isPending}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
