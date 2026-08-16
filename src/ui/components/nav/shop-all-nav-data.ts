import { headerShopAllMegaNav } from "@/config/nav";
import { ShopAllNavProductsDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

export type ShopAllProductThumbnail = {
	url: string;
	alt: string;
};

/** Passed into the cached fetch so a size change busts the `"use cache"` key (args-only). */
export const SHOP_ALL_NAV_THUMBNAIL_SIZE = 512;

/** Bump to invalidate leftover `"use cache"` entries that still hold old thumbnail URLs. */
export const SHOP_ALL_NAV_CACHE_VERSION = 5;

function withImageCacheBuster(url: string, updatedAt: string | null | undefined): string {
	if (!updatedAt) {
		return url;
	}
	const separator = url.includes("?") ? "&" : "?";
	return `${url}${separator}v=${encodeURIComponent(updatedAt)}`;
}

export function getShopAllProductSlugs(): string[] {
	return headerShopAllMegaNav.flatMap((column) => column.products.map((product) => product.slug));
}

export async function fetchShopAllProductThumbnails(
	channel: string,
	thumbnailSize: number = SHOP_ALL_NAV_THUMBNAIL_SIZE,
	_cacheVersion: number = SHOP_ALL_NAV_CACHE_VERSION,
): Promise<Record<string, ShopAllProductThumbnail>> {
	"use cache";
	void _cacheVersion;
	applyCacheProfile(CACHE_PROFILES.navigation);

	const slugs = getShopAllProductSlugs();
	if (slugs.length === 0) {
		return {};
	}

	const result = await executePublicGraphQL(ShopAllNavProductsDocument, {
		variables: { channel, slugs, thumbnailSize },
		revalidate: 60 * 60,
		tags: [CACHE_PROFILES.navigation.tagPattern],
	});

	if (!result.ok) {
		return {};
	}

	const thumbnails: Record<string, ShopAllProductThumbnail> = {};
	for (const edge of result.data.products?.edges ?? []) {
		const { slug, name, updatedAt, thumbnail } = edge.node;
		if (thumbnail?.url) {
			thumbnails[slug] = {
				url: withImageCacheBuster(thumbnail.url, updatedAt),
				alt: thumbnail.alt ?? name,
			};
		}
	}

	return thumbnails;
}
