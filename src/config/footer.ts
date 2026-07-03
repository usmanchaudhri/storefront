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
		title: "Gummies",
		products: [
			{ name: "Energy Boost Pro", slug: "7-in-1-shilajit-gummies" },
			{ name: "Plain Shilajit Gummies", slug: "plain-shilajit-gummies" },
			{ name: "Elderberry Shilajit Gummies", slug: "elderberry-shilajit-gummies" },
			{ name: "Sea Moss & Elderberry Gummies", slug: "sea-moss-elderberry-gummies" },
			{
				name: "Magnesium Glycinate, Calcium & Zinc Gummies",
				slug: "magnesium-glycinate-calcium-zinc-gummies",
			},
			{ name: "Apple Cider & Ashwagandha Gummies", slug: "apple-cider-ashwagandha-gummies" },
		],
	},
	{
		title: "Shots",
		products: [
			{ name: "Mango Complete Shot", slug: "mango-complete-shot" },
			{ name: "Elderberry Complete Shot", slug: "elderberry-complete-shot" },
			{ name: "Blueberry Complete Shot", slug: "blueberry-complete-shot" },
		],
	},
	{
		title: "Drops",
		products: [
			{ name: "Shilajit Liquid Drops", slug: "shilajit-liquid-drops" },
			{ name: "Shilajit GINKGO Drops", slug: "shilajit-ginkgo-drops" },
			{ name: "Shilajit + L-Arginine", slug: "shilajit-l-arginine" },
		],
	},
] as const;

/** Footer “Learn more” links (not product PDPs). */
export const footerLearnMoreNav = [
	{ name: "Blog", href: "/blog" },
	{ name: "About us", href: "/pages/about" },
	{ name: "FAQs", href: "/#home-faq-heading" },
] as const;
