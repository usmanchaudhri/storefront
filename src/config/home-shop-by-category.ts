/**
 * Homepage “Shop by category” tiles — Saleor collections (benefit-based).
 * Slugs must match Catalog → Collections in the Dashboard.
 */
export const homeShopByCategoryCollections = [
	{ slug: "energy", title: "Energy" },
	{ slug: "gut-health", title: "Gut Health" },
	{ slug: "weight-loss", title: "Weight Loss" },
	{ slug: "stress-relief", title: "Stress Relief" },
] as const;

export type HomeShopByCategoryCollection = (typeof homeShopByCategoryCollections)[number];
