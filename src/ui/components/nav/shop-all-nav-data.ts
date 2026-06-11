import { headerShopAllMegaNav } from "@/config/nav";
import { ShopAllNavProductsDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

export type ShopAllProductThumbnail = {
	url: string;
	alt: string;
};

export function getShopAllProductSlugs(): string[] {
	return headerShopAllMegaNav.flatMap((column) => column.products.map((product) => product.slug));
}

export async function fetchShopAllProductThumbnails(
	channel: string,
): Promise<Record<string, ShopAllProductThumbnail>> {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.navigation);

	const slugs = getShopAllProductSlugs();
	if (slugs.length === 0) {
		return {};
	}

	const result = await executePublicGraphQL(ShopAllNavProductsDocument, {
		variables: { channel, slugs },
		revalidate: 60 * 60,
	});

	if (!result.ok) {
		return {};
	}

	const thumbnails: Record<string, ShopAllProductThumbnail> = {};
	for (const edge of result.data.products?.edges ?? []) {
		const { slug, name, thumbnail } = edge.node;
		if (thumbnail?.url) {
			thumbnails[slug] = {
				url: thumbnail.url,
				alt: thumbnail.alt ?? name,
			};
		}
	}

	return thumbnails;
}
