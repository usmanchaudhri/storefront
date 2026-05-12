import "server-only";

import {
	CategoriesBySlugDocument,
	CategoriesForFilterDocument,
	type CategoriesForFilterQuery,
} from "@/gql/graphql";
import { executePublicGraphQL, type GraphQLResult } from "@/lib/graphql";
import type { CategoryOption } from "./filter-utils";

/**
 * Resolve category slugs to IDs via Saleor API.
 * Cached for 1 hour.
 *
 * Server-only: Uses executePublicGraphQL which requires server context.
 */
export async function resolveCategorySlugsToIds(
	slugs: string[],
): Promise<Map<string, { id: string; name: string }>> {
	const result = new Map<string, { id: string; name: string }>();
	if (slugs.length === 0) return result;

	const queryResult = await executePublicGraphQL(CategoriesBySlugDocument, {
		variables: { slugs, first: slugs.length },
		revalidate: 3600,
	});

	if (queryResult.ok && queryResult.data.categories?.edges) {
		queryResult.data.categories.edges.forEach(({ node }) => {
			result.set(node.slug, { id: node.id, name: node.name });
		});
	} else if (!queryResult.ok) {
		console.error("[filter-utils] Failed to resolve category slugs:", queryResult.error.message);
	}

	return result;
}

const CATEGORIES_PAGE_SIZE = 100;

/**
 * Load all categories for the channel (cursor-paginated) so the PLP filter is not
 * limited to the first {@link CATEGORIES_PAGE_SIZE} categories — e.g. "Gummies" may sort after page 1.
 */
export async function fetchCategoriesForChannel(channel: string): Promise<CategoryOption[]> {
	const collected: CategoryOption[] = [];
	let after: string | null | undefined = undefined;
	let guard = 0;
	const maxPages = 50;

	while (guard < maxPages) {
		guard++;
		const queryResult: GraphQLResult<CategoriesForFilterQuery> = await executePublicGraphQL(
			CategoriesForFilterDocument,
			{
				variables: {
					first: CATEGORIES_PAGE_SIZE,
					channel,
					...(after ? { after } : {}),
				},
				revalidate: 300,
			},
		);

		if (!queryResult.ok) {
			console.error("[filter-utils] fetchCategoriesForChannel:", queryResult.error.message);
			break;
		}

		const data: CategoriesForFilterQuery = queryResult.data;
		const categoriesConnection = data.categories;
		if (!categoriesConnection?.edges) {
			break;
		}

		for (const { node } of categoriesConnection.edges) {
			collected.push({
				id: node.id,
				name: node.name,
				slug: node.slug,
				count: node.products?.totalCount ?? 0,
			});
		}

		const nextCursor = categoriesConnection.pageInfo?.endCursor;
		if (!categoriesConnection.pageInfo?.hasNextPage || !nextCursor) {
			break;
		}
		after = nextCursor;
	}

	return collected.sort((a, b) => a.name.localeCompare(b.name));
}
