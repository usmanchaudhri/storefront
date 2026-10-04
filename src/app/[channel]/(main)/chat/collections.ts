import { CollectionsListDocument } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { executePublicGraphQL } from "@/lib/graphql";

export type AssistantCollection = {
	id: string;
	name: string;
	slug: string;
	imageUrl: string | null;
	imageAlt: string | null;
};

const COLLECTIONS_LIMIT = 24;

export async function getAssistantCollections(channel: string): Promise<AssistantCollection[]> {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.collections, `assistant-collections:${channel}`);

	const result = await executePublicGraphQL(CollectionsListDocument, {
		variables: { channel, first: COLLECTIONS_LIMIT },
		revalidate: 300,
	});

	if (!result.ok || !result.data.collections) {
		if (!result.ok) {
			console.warn(`[getAssistantCollections] Failed for ${channel}:`, result.error.message);
		}
		return [];
	}

	return result.data.collections.edges.map(({ node }) => {
		const productThumb = node.products?.edges[0]?.node.thumbnail;
		const background = node.backgroundImage;

		return {
			id: node.id,
			name: node.name,
			slug: node.slug,
			imageUrl: background?.url ?? productThumb?.url ?? null,
			imageAlt: background?.alt || productThumb?.alt || node.name,
		};
	});
}
