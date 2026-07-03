/** Blog index page copy and settings. */
export const blogConfig = {
	title: "Kaya Pure Blog",
	subtitle: "Your guide to natural energy, wellness, and Himalayan-inspired routines.",
	/** Saleor Model Type slug for blog posts */
	pageTypeSlug: "blog-post",
	/**
	 * Fallback Saleor PageType global ID when slug lookup is unavailable.
	 * Update if the Blog Post model type is recreated in Dashboard.
	 */
	pageTypeIdFallback: "UGFnZVR5cGU6Nw==",
	cta: {
		eyebrow: "The Wellness Hub",
		headline: "Fuel your day with science-backed supplements.",
		body: "Explore shilajit gummies, shots, and drops crafted for sustained energy and everyday vitality.",
		primaryLabel: "Shop all products",
		primaryHref: "/products",
	},
} as const;
