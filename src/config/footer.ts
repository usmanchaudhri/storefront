/** Footer product link (PDP: `/products/{slug}`). */
export type FooterProductLink = {
	name: string;
	/** Saleor product slug */
	slug: string;
};

export type FooterProductSection = {
	title: string;
	products: readonly FooterProductLink[];
};

/**
 * Footer product hierarchy — align slugs with Saleor products.
 */
export const footerProductSections: readonly FooterProductSection[] = [
	{
		title: "Energy Gummies",
		products: [
			{ name: "7-in-1 Shilajit Gummies", slug: "energy-boost-pro" },
			{ name: "Plain Shilajit Gummies", slug: "plain-shilajit-gummies" },
			{ name: "Elderberry Shilajit Gummies", slug: "elderberry-shilajit-gummies" },
			{ name: "Zinc and Magnesium Gummies", slug: "magnesium-glycinate-calcium-zinc-gummies" },
			{ name: "Sea Moss & Elderberry Gummies", slug: "sea-moss-elderberry-gummies" },
		],
	},
	{
		title: "Sleep",
		products: [
			{ name: "Sleep Well Gummies", slug: "sleep-well-gummies" },
			{ name: "Ashwagandha + Apple Cider Gummies", slug: "apple-cider-ashwagandha-gummies" },
		],
	},
	{
		title: "Energy Drops",
		products: [
			{ name: "Shilajit Power Drops", slug: "shilajit-power-drops" },
			{ name: "Shilajit + L-Arginine Drops", slug: "shilajit-l-arginine" },
		],
	},
	{
		title: "Energy Shots",
		products: [
			{ name: "Mango Complete Shots", slug: "mango-complete-shot" },
			{ name: "Blueberry Complete Shots", slug: "blueberry-complete-shot" },
			{ name: "Elderberry Complete Shots", slug: "elderberry-complete-shot" },
		],
	},
] as const;
