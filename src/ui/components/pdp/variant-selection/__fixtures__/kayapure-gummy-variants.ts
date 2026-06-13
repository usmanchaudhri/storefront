import type { SaleorVariant } from "../utils";

/** Mirrors Saleor data for 7-in-1 Shilajit Gummies (non-selection attrs only). */
export const kayapureGummyVariants: SaleorVariant[] = [
	{
		id: "UHJvZHVjdFZhcmlhbnQ6NDM5",
		name: "1 SM",
		quantityAvailable: 10,
		selectionAttributes: [],
		nonSelectionAttributes: [
			{ attribute: { slug: "gummy-size", name: "Gummy Size" }, values: [{ name: "30" }] },
			{ attribute: { slug: "bundle", name: "Bundle" }, values: [{ name: "1" }] },
		],
		pricing: {
			price: { gross: { amount: 13.49, currency: "USD" } },
			priceUndiscounted: { gross: { amount: 14.99, currency: "USD" } },
		},
	},
	{
		id: "UHJvZHVjdFZhcmlhbnQ6NDMw",
		name: "2 SM",
		quantityAvailable: 10,
		selectionAttributes: [],
		nonSelectionAttributes: [
			{ attribute: { slug: "gummy-size", name: "Gummy Size" }, values: [{ name: "30" }] },
			{ attribute: { slug: "bundle", name: "Bundle" }, values: [{ name: "2" }] },
		],
	},
	{
		id: "UHJvZHVjdFZhcmlhbnQ6NDM2",
		name: "1 LG",
		quantityAvailable: 10,
		selectionAttributes: [],
		nonSelectionAttributes: [
			{ attribute: { slug: "gummy-size", name: "Gummy Size" }, values: [{ name: "60" }] },
			{ attribute: { slug: "bundle", name: "Bundle" }, values: [{ name: "1" }] },
		],
	},
];
