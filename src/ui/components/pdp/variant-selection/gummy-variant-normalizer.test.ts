import { describe, it, expect } from "vitest";
import {
	normalizeVariantsForSelection,
	looksLikeKayapureGummyProduct,
	parseGummyVariant,
} from "./gummy-variant-normalizer";
import { kayapureGummyVariants } from "./__fixtures__/kayapure-gummy-variants";
import {
	countVariantSelectionSteps,
	findMatchingVariant,
	getSelectableAttributeGroups,
	groupVariantsByAttributes,
} from "./utils";

describe("normalizeVariantsForSelection", () => {
	it("promotes Kayapure gummy variants to synthetic selection attributes", () => {
		const normalized = normalizeVariantsForSelection(kayapureGummyVariants);

		expect(looksLikeKayapureGummyProduct(kayapureGummyVariants)).toBe(true);
		expect(normalized[0]?.selectionAttributes).toHaveLength(2);
		expect(normalized[0]?.selectionAttributes[0]?.values[0]?.name).toBe("SM");
		expect(normalized[0]?.selectionAttributes[1]?.values[0]?.name).toBe("1 Bottle");
	});

	it("creates separate size and bundle steps for Kayapure gummies", () => {
		const normalized = normalizeVariantsForSelection(kayapureGummyVariants);
		const groups = getSelectableAttributeGroups(normalized);

		expect(countVariantSelectionSteps(kayapureGummyVariants)).toBe(2);
		expect(groups.map((group) => group.slug)).toEqual(["gummy-size", "gummy-bundle"]);
		expect(groups[0]?.options.map((option) => option.name)).toEqual(["SM", "LG"]);
		expect(groups[1]?.options.map((option) => option.name)).toEqual(["1 Bottle", "2 Bottles"]);
	});

	it("matches a variant after size and bundle are selected", () => {
		const normalized = normalizeVariantsForSelection(kayapureGummyVariants);
		const variantId = findMatchingVariant(normalized, {
			"gummy-size": "sm",
			"gummy-bundle": "2-bottles",
		});

		expect(variantId).toBe("UHJvZHVjdFZhcmlhbnQ6NDMw");
	});

	it("leaves already-configured selection attributes unchanged", () => {
		const withSelection = [
			{
				...kayapureGummyVariants[0]!,
				selectionAttributes: [
					{
						attribute: { slug: "color", name: "Color" },
						values: [{ name: "Red" }],
					},
				],
			},
		];

		expect(normalizeVariantsForSelection(withSelection)[0]?.selectionAttributes).toHaveLength(1);
	});
});

describe("parseGummyVariant", () => {
	it("parses bundle count and size label from variant name", () => {
		expect(parseGummyVariant(kayapureGummyVariants[0]!)).toEqual({
			sizeLabel: "SM",
			bundleCount: 1,
			bundleLabel: "1 Bottle",
		});
	});
});

describe("groupVariantsByAttributes on normalized Kayapure data", () => {
	it("orders gummy size before bundle", () => {
		const normalized = normalizeVariantsForSelection(kayapureGummyVariants);
		const groups = groupVariantsByAttributes(normalized);

		expect(groups[0]?.slug).toBe("gummy-size");
		expect(groups[1]?.slug).toBe("gummy-bundle");
	});
});
