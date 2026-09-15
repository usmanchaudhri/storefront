import {
	shopAllRootCategorySlug,
	type ShopAllCategoryColumn,
	type ShopAllProductNavItem,
} from "@/config/nav";
import { ShopAllNavMegaMenuDocument } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { parseEditorJSToText } from "@/lib/editorjs";
import { executePublicGraphQL } from "@/lib/graphql";

/** Passed into the cached fetch so a size change busts the `"use cache"` key (args-only). */
export const SHOP_ALL_NAV_THUMBNAIL_SIZE = 512;

/** Max products shown per Shop All category column. */
export const SHOP_ALL_NAV_PRODUCTS_PER_CATEGORY = 24;

/** Bump to invalidate leftover `"use cache"` entries after schema/shape changes. */
export const SHOP_ALL_NAV_CACHE_VERSION = 8;

export type ShopAllMegaNavData = {
	/** Child category columns for the mega menu (Saleor order). */
	columns: ShopAllCategoryColumn[];
	/** Slugs to hide from the Saleor `navbar` menu (already shown under Shop All). */
	categorySlugs: readonly string[];
};

function withImageCacheBuster(url: string, updatedAt: string | null | undefined): string {
	if (!updatedAt) {
		return url;
	}
	const separator = url.includes("?") ? "&" : "?";
	return `${url}${separator}v=${encodeURIComponent(updatedAt)}`;
}

function categoryTagline(
	description: string | null | undefined,
	seoDescription: string | null | undefined,
): string {
	const fromSeo = seoDescription?.trim();
	if (fromSeo) {
		return fromSeo;
	}
	return parseEditorJSToText(description)?.trim() ?? "";
}

/**
 * Eager, cached Shop All mega-menu payload for a channel.
 * One Saleor round-trip: root category → children → products + thumbnails.
 * Served from the Next.js Data Cache (`"use cache"` / navigation profile).
 */
export async function fetchShopAllMegaNav(
	channel: string,
	rootCategorySlug: string = shopAllRootCategorySlug,
	thumbnailSize: number = SHOP_ALL_NAV_THUMBNAIL_SIZE,
	productsPerCategory: number = SHOP_ALL_NAV_PRODUCTS_PER_CATEGORY,
	_cacheVersion: number = SHOP_ALL_NAV_CACHE_VERSION,
): Promise<ShopAllMegaNavData> {
	"use cache";
	void _cacheVersion;
	applyCacheProfile(CACHE_PROFILES.navigation);

	const result = await executePublicGraphQL(ShopAllNavMegaMenuDocument, {
		variables: {
			slug: rootCategorySlug,
			channel,
			firstProducts: productsPerCategory,
			thumbnailSize,
		},
		revalidate: 60 * 60,
		tags: [CACHE_PROFILES.navigation.tagPattern],
	});

	if (!result.ok) {
		console.warn(`[ShopAllNav] Failed to fetch mega menu for ${channel}:`, result.error.message);
		return { columns: [], categorySlugs: [] };
	}

	const children = result.data.category?.children?.edges ?? [];
	const columns: ShopAllCategoryColumn[] = [];
	const categorySlugs: string[] = [];

	for (const { node: category } of children) {
		categorySlugs.push(category.slug);

		const products: ShopAllProductNavItem[] = (category.products?.edges ?? []).map(({ node: product }) => {
			const thumbUrl = product.thumbnail?.url;
			return {
				name: product.name,
				slug: product.slug,
				thumbnail: thumbUrl
					? {
							url: withImageCacheBuster(thumbUrl, product.updatedAt),
							alt: product.thumbnail?.alt ?? product.name,
						}
					: null,
			};
		});

		columns.push({
			name: category.name,
			slug: category.slug,
			tagline: categoryTagline(category.description, category.seoDescription),
			products,
		});
	}

	return { columns, categorySlugs };
}
