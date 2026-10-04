"use server";

import { ProductListByCollectionDocument } from "@/gql/graphql";
import { localeConfig } from "@/config/locale";
import { executePublicGraphQL } from "@/lib/graphql";
import type { SearchProduct } from "@/lib/search";

export type AssistantCollectionProductsResult =
	| {
			ok: true;
			collectionName: string;
			products: SearchProduct[];
	  }
	| {
			ok: false;
			error: string;
	  };

const COLLECTION_PRODUCTS_LIMIT = 24;

export async function getAssistantCollectionProducts(
	channel: string,
	slug: string,
): Promise<AssistantCollectionProductsResult> {
	const trimmedChannel = channel.trim();
	const trimmedSlug = slug.trim();

	if (!trimmedChannel || !trimmedSlug) {
		return { ok: false, error: "Missing collection information" };
	}

	try {
		const result = await executePublicGraphQL(ProductListByCollectionDocument, {
			variables: {
				slug: trimmedSlug,
				channel: trimmedChannel,
				first: COLLECTION_PRODUCTS_LIMIT,
			},
			cache: "no-cache",
		});

		if (!result.ok) {
			return { ok: false, error: "Could not load collection products" };
		}

		const collection = result.data.collection;
		if (!collection) {
			return { ok: false, error: "Collection not found" };
		}

		const products: SearchProduct[] = (collection.products?.edges ?? []).map(({ node }) => ({
			id: node.id,
			name: node.name,
			slug: node.slug,
			thumbnailUrl: node.thumbnail?.url,
			thumbnailAlt: node.thumbnail?.alt,
			price: node.pricing?.priceRange?.start?.gross.amount ?? 0,
			currency: node.pricing?.priceRange?.start?.gross.currency ?? localeConfig.fallbackCurrency,
			categoryName: node.category?.name,
		}));

		return {
			ok: true,
			collectionName: collection.name,
			products,
		};
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Could not load collection products",
		};
	}
}
