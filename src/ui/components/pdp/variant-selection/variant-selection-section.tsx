"use client";

import { useCallback, useMemo, useEffect, useSyncExternalStore } from "react";
import type { VariantSelectionSectionProps } from "./types";
import { VariantSelector } from "./variant-selector";
import { VariantNameSelector } from "./variant-name-selector";
import {
	groupVariantsByAttributes,
	getInteractiveAttributeGroups,
	findMatchingVariant,
	getSelectionsFromVariant,
	getOptionsForAttribute,
	getAdjustedSelections,
	getUnavailableAttributeInfo,
	type SaleorVariant,
} from "./utils";
import { defaultRenderers } from "./renderers/registry";
import { SizeCardOption } from "./renderers/size-card-option";
import { BundleRadioOption } from "./renderers/bundle-radio-option";
import type { RendererRegistry } from "./types";
import { VariantAttributeBadges, extractOptionalAttributes } from "./optional-attributes";
import { usePdpVariant } from "../pdp-variant-provider";
import {
	BUNDLE_ASIDE_LABEL,
	SIZE_ASIDE_LABEL,
	isBundleAttribute,
	isSizeLikeAttribute,
} from "./option-display-meta";

/** No-op subscribe — client snapshot is constant `true` after hydration. */
const subscribeNoop = () => () => {};

/**
 * Main container for variant selection with multiple attributes.
 *
 * Selection is client-owned via {@link usePdpVariant}: clicks update local state
 * and soft-sync the URL with `history.replaceState` (no App Router RSC round-trip).
 *
 * Renders a stable placeholder until mount so SSR HTML always matches the client's
 * first paint (avoids hydration mismatches when attribute grouping differs).
 */
export function VariantSelectionSection({
	variants,
	selectedVariantId: selectedVariantIdProp,
	productSlug,
	renderers: customRenderers,
	children,
}: VariantSelectionSectionProps) {
	const { selections, setSelections, setVariantId, selectedVariantId: contextVariantId } = usePdpVariant();
	// Client-only gate without setState-in-effect (eslint react-hooks/set-state-in-effect).
	const hasMounted = useSyncExternalStore(
		subscribeNoop,
		() => true,
		() => false,
	);

	const selectedVariantId = contextVariantId ?? selectedVariantIdProp;

	const normalizedVariants = useMemo(
		() =>
			(variants as SaleorVariant[]).map((variant) => ({
				...variant,
				selectionAttributes: variant.selectionAttributes ?? [],
			})),
		[variants],
	);

	const attributeGroups = useMemo(() => groupVariantsByAttributes(normalizedVariants), [normalizedVariants]);
	const interactiveGroups = useMemo(() => getInteractiveAttributeGroups(attributeGroups), [attributeGroups]);
	const rendererRegistry = { ...defaultRenderers, ...customRenderers } as RendererRegistry;

	// Prefer context selections; fall back to deriving from the selected variant.
	const currentSelections = useMemo(() => {
		if (Object.keys(selections).length > 0) {
			return selections;
		}
		if (selectedVariantId) {
			return getSelectionsFromVariant(normalizedVariants, selectedVariantId);
		}
		return {};
	}, [selections, selectedVariantId, normalizedVariants]);

	const currentVariantId = useMemo(
		() => findMatchingVariant(normalizedVariants, currentSelections, attributeGroups),
		[normalizedVariants, currentSelections, attributeGroups],
	);

	const optionalAttributes = useMemo(
		() => extractOptionalAttributes(variants, currentVariantId ?? selectedVariantId),
		[variants, currentVariantId, selectedVariantId],
	);

	const handleSelect = useCallback(
		(attributeSlug: string, optionId: string) => {
			const newSelections = getAdjustedSelections(
				normalizedVariants,
				currentSelections,
				attributeSlug,
				optionId,
				attributeGroups,
			);

			const matchingVariantId = findMatchingVariant(normalizedVariants, newSelections, attributeGroups);

			setSelections(newSelections, matchingVariantId);
		},
		[currentSelections, normalizedVariants, attributeGroups, setSelections],
	);

	const unavailableInfo = useMemo(
		() => getUnavailableAttributeInfo(normalizedVariants, attributeGroups, currentSelections),
		[normalizedVariants, attributeGroups, currentSelections],
	);

	useEffect(() => {
		if (process.env.NODE_ENV === "development" && attributeGroups.length === 0 && variants.length > 1) {
			console.warn(
				`[VariantSelectionSection] Product "${productSlug}" has ${variants.length} variants but no structured attributes. ` +
					`Using name-based fallback selector. For better UX (color swatches, size pills, cross-filtering), ` +
					`configure variant attributes in Saleor Dashboard.`,
			);
		}
	}, [attributeGroups.length, variants.length, productSlug]);

	const handleVariantSelect = useCallback(
		(variantId: string) => {
			setVariantId(variantId);
		},
		[setVariantId],
	);

	if (children) {
		return <>{children}</>;
	}

	if (variants.length <= 1) {
		return null;
	}

	// Identical on server + client's first paint — prevents hydration mismatch when
	// attribute grouping / renderer registry disagree across the RSC boundary.
	if (!hasMounted) {
		return <div className="min-h-[300px] space-y-5 py-2" aria-busy="true" />;
	}

	if (attributeGroups.length === 0) {
		return (
			<div className="space-y-5 py-2">
				<VariantNameSelector
					variants={variants}
					selectedVariantId={selectedVariantId}
					onSelect={handleVariantSelect}
				/>
			</div>
		);
	}

	return (
		<div className="space-y-5 py-2">
			{interactiveGroups.map((group) => {
				const options = getOptionsForAttribute(
					normalizedVariants,
					attributeGroups,
					currentSelections,
					group.slug,
				);

				const isUnavailable = unavailableInfo?.slug === group.slug;
				const unavailableMessage = isUnavailable
					? `No ${group.name.toLowerCase()} available in ${unavailableInfo.blockedBy}`
					: undefined;

				const sizeLike = isSizeLikeAttribute(group.slug);
				const bundleLike = isBundleAttribute(group.slug);

				return (
					<VariantSelector
						key={group.slug}
						label={group.name}
						options={options}
						selectedId={currentSelections[group.slug]}
						attributeSlug={group.slug}
						onSelect={handleSelect}
						renderers={rendererRegistry}
						renderer={sizeLike ? SizeCardOption : bundleLike ? BundleRadioOption : undefined}
						unavailableMessage={unavailableMessage}
						asideLabel={sizeLike ? SIZE_ASIDE_LABEL : bundleLike ? BUNDLE_ASIDE_LABEL : undefined}
						layout={bundleLike ? "stack" : sizeLike ? "row" : undefined}
					/>
				);
			})}

			<VariantAttributeBadges attributes={optionalAttributes} />
		</div>
	);
}
