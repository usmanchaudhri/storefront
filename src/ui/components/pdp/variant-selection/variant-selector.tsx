"use client";

import { cn } from "@/lib/utils";
import type { VariantSelectorProps, OptionRenderer } from "./types";
import { defaultRenderers } from "./renderers/registry";
import { SizeCardOption } from "./renderers/size-card-option";
import { BundleRadioOption } from "./renderers/bundle-radio-option";
import { BUNDLE_ASIDE_LABEL, SIZE_ASIDE_LABEL } from "./option-display-meta";

function resolveSlugRenderer(
	registry: Record<string, OptionRenderer | undefined>,
	attributeSlug: string,
): OptionRenderer | undefined {
	if (registry[attributeSlug]) return registry[attributeSlug];
	const lower = attributeSlug.toLowerCase();
	if (registry[lower]) return registry[lower];
	return undefined;
}

/**
 * A single variant selector for one attribute (e.g., Color or Size).
 *
 * Renders options using the appropriate renderer based on:
 * 1. Explicit `renderer` prop
 * 2. Size / bundle Figma cards (prefer over swatches)
 * 3. `attributeSlug` for registry lookup
 * 4. `swatchImageUrl` (pill) or `colorHex` (circle swatch)
 * 5. `_default` fallback
 */
export function VariantSelector({
	label,
	options,
	selectedId,
	attributeSlug,
	onSelect,
	renderer: explicitRenderer,
	renderers,
	unavailableMessage,
	isPending,
	asideLabel: asideLabelProp,
	layout: layoutProp,
}: VariantSelectorProps) {
	const registry = { ...defaultRenderers, ...renderers };
	const selectedOption = options.find((opt) => opt.id === selectedId);
	const isBundle =
		attributeSlug === "bundle" ||
		attributeSlug === "pack" ||
		attributeSlug === "pack-size" ||
		attributeSlug.toLowerCase().includes("bundle");
	const slugLower = attributeSlug.toLowerCase();
	const isSize =
		slugLower === "size" ||
		slugLower === "gummy-size" ||
		slugLower === "shoe-size" ||
		slugLower === "clothing-size" ||
		slugLower.endsWith("-size");
	const layout = layoutProp ?? (isBundle ? "stack" : "row");
	// Prefer explicit aside/layout from the parent so Figma chrome stays stable
	// even if slug detection or registry state diverges during HMR.
	const showFigmaHeader = Boolean(asideLabelProp) || isSize || isBundle;
	const asideLabel =
		asideLabelProp ?? (isSize ? SIZE_ASIDE_LABEL : isBundle ? BUNDLE_ASIDE_LABEL : undefined);

	const handleSelect = (optionId: string) => {
		const option = options.find((opt) => opt.id === optionId);
		if (!option?.available) return;
		onSelect(attributeSlug, optionId);
	};

	if (!options.length) return null;

	const getRendererForOption = (_option: (typeof options)[number]): OptionRenderer => {
		if (explicitRenderer) return explicitRenderer;

		// Figma size / bundle cards — never defer to the shared registry (avoids stale HMR merges).
		if (isSize) return SizeCardOption;
		if (isBundle) return BundleRadioOption;

		if (_option.swatchImageUrl && registry._imageSwatch) {
			return registry._imageSwatch;
		}
		if (_option.colorHex && registry._color) {
			return registry._color;
		}

		const slugRenderer = resolveSlugRenderer(registry, attributeSlug);
		if (slugRenderer) {
			return slugRenderer;
		}

		return registry._default ?? defaultRenderers._default!;
	};

	// Size / bundle use the card layout container even when Saleor attaches swatch media.
	const swatchOptions = isSize || isBundle ? [] : options.filter((opt) => opt.colorHex || opt.swatchImageUrl);
	const textOptions =
		isSize || isBundle ? options : options.filter((opt) => !opt.colorHex && !opt.swatchImageUrl);

	const labelId = `variant-label-${attributeSlug}`;
	const headerLabel = showFigmaHeader ? label.toUpperCase() : label;

	return (
		<div className={cn(showFigmaHeader ? "space-y-2" : "space-y-3")}>
			<div className="flex items-center justify-between gap-3">
				<span
					id={labelId}
					className={cn(
						showFigmaHeader
							? "text-sm font-semibold uppercase leading-5 tracking-normal text-[#0f2d24]"
							: "text-lg font-medium sm:text-xl",
					)}
				>
					{headerLabel}
				</span>
				{unavailableMessage ? (
					<span className="text-right text-xs text-muted-foreground sm:text-sm" role="status">
						{unavailableMessage}
					</span>
				) : asideLabel ? (
					<span
						className={cn(
							"shrink-0 text-xs leading-4",
							isBundle ? "font-semibold text-[#107357]" : "font-normal text-[#71827a]",
						)}
					>
						{asideLabel}
					</span>
				) : selectedOption && !showFigmaHeader ? (
					<span className="text-foreground/80 text-base sm:text-lg">{selectedOption.name}</span>
				) : null}
			</div>

			{swatchOptions.length > 0 && (
				<div role="group" aria-labelledby={labelId} className="flex flex-wrap gap-4">
					{swatchOptions.map((option) => {
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

			{textOptions.length > 0 && (
				<div
					role={isBundle ? "radiogroup" : "group"}
					aria-labelledby={labelId}
					className={cn(
						layout === "stack" ? "flex flex-col gap-2.5" : "flex flex-wrap gap-3",
						isSize && layout === "row" && "w-full [&>button]:min-w-0 [&>button]:flex-1",
					)}
				>
					{textOptions.map((option) => {
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
		</div>
	);
}
