import { executePublicGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument, type MenuGetBySlugQuery } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

export type NavMenuItem = NonNullable<NonNullable<MenuGetBySlugQuery["menu"]>["items"]>[number];

/** Cached navbar menu items for a channel (serializable data only). */
export async function fetchNavbarMenuItems(channel: string): Promise<NavMenuItem[] | null> {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.navigation);

	const result = await executePublicGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel },
		revalidate: 60 * 60,
		tags: [CACHE_PROFILES.navigation.tagPattern],
	});

	if (!result.ok) {
		console.warn(`[NavLinks] Failed to fetch navigation for ${channel}:`, result.error.message);
		return null;
	}

	return result.data.menu?.items ?? null;
}
