import { homeFaq } from "@/config/home-faq";
import { homeSignatureProductBanner } from "@/config/home-signature-product";

/** Header navigation links after “Shop All” (Saleor CMS pages: `/pages/{slug}`). */
export const headerContentNav = [
	{ name: "About us", href: "/pages/about" },
	{ name: "Ingredients", href: `/#${homeSignatureProductBanner.sectionId}` },
	{ name: "FAQs", href: `/#${homeFaq.sectionId}` },
] as const;

/** Product links inside the “Shop All” mega menu (PDP: `/products/{slug}`). */
export type ShopAllProductNavItem = {
	name: string;
	/** Saleor product slug */
	slug: string;
};

/** Thumbnail metadata keyed by product slug (from Saleor). */
export type ShopAllProductThumbnailMap = Readonly<Record<string, { url: string; alt: string }>>;

/** Column in the Shop All mega menu — category + featured products. */
export type ShopAllCategoryColumn = {
	name: string;
	/** Category slug → `/categories/{slug}` and Saleor GraphQL */
	slug: string;
	tagline: string;
	products: readonly ShopAllProductNavItem[];
};

/**
 * Shop All mega menu hierarchy (Gummies / Shots / Drops).
 * Align slugs with Saleor products and categories.
 */
export const headerShopAllMegaNav: readonly ShopAllCategoryColumn[] = [
	{
		name: "Gummies",
		slug: "gummies",
		tagline: "Chewable daily rituals",
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
		name: "Shots",
		slug: "shots",
		tagline: "Fast-acting wellness shots",
		products: [
			{ name: "Mango Complete Shot", slug: "mango-complete-shot" },
			{ name: "Elderberry Complete Shot", slug: "elderberry-complete-shot" },
			{ name: "Blueberry Complete Shot", slug: "blueberry-complete-shot" },
		],
	},
	{
		name: "Drops",
		slug: "drops",
		tagline: "Liquid adaptogen support",
		products: [
			{ name: "Shilajit Liquid Drops", slug: "shilajit-liquid-drops" },
			{ name: "Shilajit GINKGO Drops", slug: "shilajit-ginkgo-drops" },
			{ name: "Shilajit + L-Arginine", slug: "shilajit-l-arginine" },
		],
	},
] as const;

/** Saleor category slugs used only in the Shop All mega menu — omit from navbar duplicates. */
const shopAllCategorySlugs = new Set(headerShopAllMegaNav.map((column) => column.slug));

/** Legacy shop-by-category slugs — omit if still present in Saleor navbar menu. */
const legacyShopByCategorySlugs = new Set(["energy", "weight-loss", "testosterone-booster", "sleep-aid"]);

/** Navbar menu category slugs to hide (shown in Shop All or removed from header). */
const headerNavMenuCategorySlugsToOmit = new Set([
	"accessories",
	"groceries",
	"apparel",
	...shopAllCategorySlugs,
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
