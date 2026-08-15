"use client";

import { useCallback, useMemo, useEffect } from "react";
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
import { defaultRenderers } from "./renderers";
import type { RendererRegistry } from "./types";
import { VariantAttributeBadges, extractOptionalAttributes } from "./optional-attributes";
import { usePdpVariant } from "../pdp-variant-provider";

/**
 * Main container for variant selection with multiple attributes.
 *
 * Selection is client-owned via {@link usePdpVariant}: clicks update local state
 * and soft-sync the URL with `history.replaceState` (no App Router RSC round-trip).
 */
export function VariantSelectionSection({
	variants,
	selectedVariantId: selectedVariantIdProp,
	productSlug,
	renderers: customRenderers,
	children,
}: VariantSelectionSectionProps) {
	const { selections, setSelections, setVariantId, selectedVariantId: contextVariantId } = usePdpVariant();

	const selectedVariantId = contextVariantId ?? selectedVariantIdProp;

	const attributeGroups = useMemo(() => groupVariantsByAttributes(variants as SaleorVariant[]), [variants]);
	const interactiveGroups = useMemo(() => getInteractiveAttributeGroups(attributeGroups), [attributeGroups]);
	const rendererRegistry = useMemo(
		() => ({ ...defaultRenderers, ...customRenderers }) as RendererRegistry,
		[customRenderers],
	);

	// Prefer context selections; fall back to deriving from the selected variant.
	const currentSelections = useMemo(() => {
		if (Object.keys(selections).length > 0) {
			return selections;
		}
		if (selectedVariantId) {
			return getSelectionsFromVariant(variants as SaleorVariant[], selectedVariantId);
		}
		return {};
	}, [selections, selectedVariantId, variants]);

	const currentVariantId = useMemo(
		() => findMatchingVariant(variants as SaleorVariant[], currentSelections, attributeGroups),
		[variants, currentSelections, attributeGroups],
	);

	const optionalAttributes = useMemo(
		() => extractOptionalAttributes(variants, currentVariantId ?? selectedVariantId),
		[variants, currentVariantId, selectedVariantId],
	);

	const handleSelect = useCallback(
		(attributeSlug: string, optionId: string) => {
			const newSelections = getAdjustedSelections(
				variants as SaleorVariant[],
				currentSelections,
				attributeSlug,
				optionId,
				attributeGroups,
			);

			const matchingVariantId = findMatchingVariant(
				variants as SaleorVariant[],
				newSelections,
				attributeGroups,
			);

			setSelections(newSelections, matchingVariantId);
		},
		[currentSelections, variants, attributeGroups, setSelections],
	);

	const unavailableInfo = useMemo(
		() => getUnavailableAttributeInfo(variants as SaleorVariant[], attributeGroups, currentSelections),
		[variants, attributeGroups, currentSelections],
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

	if (attributeGroups.length === 0) {
		return (
			<div className="space-y-6 py-2">
				<VariantNameSelector
					variants={variants}
					selectedVariantId={selectedVariantId}
					onSelect={handleVariantSelect}
				/>
			</div>
		);
	}

	return (
		<div className="space-y-6 py-2">
			{interactiveGroups.map((group) => {
				const options = getOptionsForAttribute(
					variants as SaleorVariant[],
					attributeGroups,
					currentSelections,
					group.slug,
				);

				const isUnavailable = unavailableInfo?.slug === group.slug;
				const unavailableMessage = isUnavailable
					? `No ${group.name.toLowerCase()} available in ${unavailableInfo.blockedBy}`
					: undefined;

				return (
					<VariantSelector
						key={group.slug}
						label={group.name}
						options={options}
						selectedId={currentSelections[group.slug]}
						attributeSlug={group.slug}
						onSelect={handleSelect}
						renderers={rendererRegistry}
						unavailableMessage={unavailableMessage}
					/>
				);
			})}

			<VariantAttributeBadges attributes={optionalAttributes} />
		</div>
	);
}
