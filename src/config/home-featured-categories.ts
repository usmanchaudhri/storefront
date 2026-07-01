import { headerShopAllMegaNav } from "@/config/nav";

/** Homepage shop sections — one row per product family (Gummies / Shots / Drops). */
export const homeFeaturedCategories = headerShopAllMegaNav.map((column) => ({
	title: `Energy ${column.name}`,
	slug: column.slug,
	saleorCategorySlug: column.saleorCategorySlug ?? column.slug,
	tagline: column.tagline,
	productSlugOrder: column.products.map((product) => product.slug),
}));
