/**
 * Header navigation: primary category links (after "All").
 * Saleor "navbar" items for these slugs are skipped to avoid duplicates.
 */
export const headerPrimaryCategoryNav = [
	{ name: "Gummies", slug: "gummies" },
	{ name: "Shots", slug: "shots" },
	{ name: "Drops", slug: "drops" },
] as const;

/** “Shop by category” dropdown — links to `/categories/{slug}`; align slugs with Saleor categories. */
export const headerShopByCategoryNav = [
	{ name: "Energy", slug: "energy" },
	{ name: "Weight loss", slug: "weight-loss" },
	{ name: "Testosterone booster", slug: "testosterone-booster" },
	{ name: "Sleep aid", slug: "sleep-aid" },
] as const;

const primarySlugs = new Set(headerPrimaryCategoryNav.map((c) => c.slug));
const shopByCategorySlugs = new Set(headerShopByCategoryNav.map((c) => c.slug));

/** Navbar menu category slugs to hide (replaced or shown above via {@link headerPrimaryCategoryNav}). */
const headerNavMenuCategorySlugsToOmit = new Set([
	"accessories",
	"groceries",
	"apparel",
	...primarySlugs,
	...shopByCategorySlugs,
]);

export function shouldOmitNavbarCategory(
	slug: string | null | undefined,
	additionalSlugsToOmit?: ReadonlySet<string>,
): boolean {
	if (!slug) {
		return false;
	}
	if (additionalSlugsToOmit?.has(slug)) {
		return true;
	}
	return headerNavMenuCategorySlugsToOmit.has(slug);
}
