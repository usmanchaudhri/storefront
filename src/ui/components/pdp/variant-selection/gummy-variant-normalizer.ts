import type { SaleorVariant } from "./utils";

type ParsedGummyVariant = {
	sizeLabel: string;
	bundleCount: number;
	bundleLabel: string;
};

const VARIANT_NAME_PATTERN = /^(\d+)\s+([A-Za-z]+)$/;

function getBundleCountFromAttributes(variant: SaleorVariant): number | null {
	const bundleAttr = variant.nonSelectionAttributes?.find(
		(attr) => (attr.attribute.slug ?? "").toLowerCase() === "bundle",
	);
	const raw = bundleAttr?.values[0]?.name ?? "";
	const count = Number.parseInt(raw, 10);
	return Number.isFinite(count) && count > 0 ? count : null;
}

function parseGummyVariant(variant: SaleorVariant): ParsedGummyVariant | null {
	const nameMatch = variant.name.trim().match(VARIANT_NAME_PATTERN);
	if (!nameMatch) return null;

	const bundleFromName = Number.parseInt(nameMatch[1]!, 10);
	const bundleFromAttributes = getBundleCountFromAttributes(variant);
	const bundleCount = bundleFromAttributes ?? bundleFromName;

	if (!Number.isFinite(bundleCount) || bundleCount <= 0) return null;
	if (bundleFromAttributes !== null && bundleFromAttributes !== bundleFromName) return null;

	const sizeLabel = nameMatch[2]!.toUpperCase();
	const bundleLabel = `${bundleCount} ${bundleCount === 1 ? "Bottle" : "Bottles"}`;

	return { sizeLabel, bundleCount, bundleLabel };
}

function hasSelectionAttributes(variants: SaleorVariant[]): boolean {
	return variants.some((variant) => variant.selectionAttributes.length > 0);
}

function looksLikeKayapureGummyProduct(variants: SaleorVariant[]): boolean {
	return variants.every((variant) => {
		const hasBundleAttr = variant.nonSelectionAttributes?.some(
			(attr) => (attr.attribute.slug ?? "").toLowerCase() === "bundle",
		);
		return Boolean(hasBundleAttr && parseGummyVariant(variant));
	});
}

/**
 * Kayapure gummy products store size/bundle as non-selection attributes (or only in the
 * variant name). Promote them to synthetic selection attributes so the PDP can render
 * separate size → bundle steps.
 */
export function normalizeVariantsForSelection(variants: SaleorVariant[]): SaleorVariant[] {
	if (variants.length <= 1 || hasSelectionAttributes(variants) || !looksLikeKayapureGummyProduct(variants)) {
		return variants;
	}

	return variants.map((variant) => {
		const parsed = parseGummyVariant(variant);
		if (!parsed) return variant;

		return {
			...variant,
			selectionAttributes: [
				{
					attribute: { slug: "gummy-size", name: "Gummy Size" },
					values: [{ name: parsed.sizeLabel, value: parsed.sizeLabel.toLowerCase() }],
				},
				{
					attribute: { slug: "gummy-bundle", name: "Gummy Bundle" },
					values: [{ name: parsed.bundleLabel, value: String(parsed.bundleCount) }],
				},
			],
		};
	});
}

export { parseGummyVariant, looksLikeKayapureGummyProduct };
