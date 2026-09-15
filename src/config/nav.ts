import { homeFaq } from "@/config/home-faq";

/** Header navigation links after “Shop All” (Figma 2435:1427). */
export const headerContentNav = [
	{ name: "Find Your Fit", href: "/products" },
	{ name: "About Us", href: "/pages/about" },
	{ name: "Reviews", href: "/products/7-in-1-shilajit-gummies#pdp-story-reviews" },
	{ name: "FAQs", href: `/#${homeFaq.sectionId}` },
] as const;

/**
 * Saleor parent category whose children power the Shop All mega menu
 * (e.g. Gummies / Shots / Drops under “Vitamins and minerals”).
 * Override with NEXT_PUBLIC_SHOP_ALL_ROOT_CATEGORY_SLUG when needed.
 */
export const shopAllRootCategorySlug =
	process.env.NEXT_PUBLIC_SHOP_ALL_ROOT_CATEGORY_SLUG?.trim() || "vitamins-and-minerals";

/** Product links inside the “Shop All” mega menu (PDP: `/products/{slug}`). */
export type ShopAllProductNavItem = {
	name: string;
	/** Saleor product slug */
	slug: string;
	thumbnail?: {
		url: string;
		alt: string;
	} | null;
};

/** Column in the Shop All mega menu — category + products from Saleor. */
export type ShopAllCategoryColumn = {
	name: string;
	/** Category slug → `/categories/{slug}` and Saleor GraphQL */
	slug: string;
	tagline: string;
	products: readonly ShopAllProductNavItem[];
};

/** Legacy shop-by-category slugs — omit if still present in Saleor navbar menu. */
const legacyShopByCategorySlugs = new Set(["energy", "weight-loss", "testosterone-booster", "sleep-aid"]);

/** Navbar menu category slugs to hide (demo/legacy noise). */
const headerNavMenuCategorySlugsToOmit = new Set([
	"accessories",
	"groceries",
	"apparel",
	shopAllRootCategorySlug,
	...legacyShopByCategorySlugs,
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
