import { ProductListByCollectionDocument, ProductOrderField, OrderDirection } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { executePublicGraphQL } from "@/lib/graphql";

/** Products from a collection for the homepage featured section. */
export async function getFeaturedProducts(channel: string, limit = 12, collectionSlug = "featured-products") {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.collections, collectionSlug);

	const result = await executePublicGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: collectionSlug,
			channel,
			first: limit,
			sortBy: { field: ProductOrderField.Collection, direction: OrderDirection.Asc },
		},
		revalidate: 300,
	});

	if (!result.ok) {
		console.warn(`[getFeaturedProducts] Failed to fetch for ${channel}:`, result.error.message);
		return [];
	}

	return result.data.collection?.products?.edges.map(({ node }) => node) ?? [];
}
