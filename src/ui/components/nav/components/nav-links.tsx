import Link from "next/link";
import clsx from "clsx";
import { NavLink } from "./nav-link";
import { NavShopAllMenu } from "./nav-shop-all-menu";
import { headerContentNav, shouldOmitNavbarCategory } from "@/config/nav";
import { executePublicGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import {
	SHOP_ALL_NAV_CACHE_VERSION,
	SHOP_ALL_NAV_THUMBNAIL_SIZE,
	fetchShopAllProductThumbnails,
} from "@/ui/components/nav/shop-all-nav-data";

export const NavLinks = async ({ channel }: { channel: string }) => {
	return getCachedNavLinks(channel, SHOP_ALL_NAV_THUMBNAIL_SIZE, SHOP_ALL_NAV_CACHE_VERSION);
};

async function getCachedNavLinks(channel: string, shopAllThumbnailSize: number, cacheVersion: number) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.navigation);

	const [result, productThumbnails] = await Promise.all([
		executePublicGraphQL(MenuGetBySlugDocument, {
			variables: { slug: "navbar", channel },
			revalidate: 60 * 60, // 1 hour
			tags: [CACHE_PROFILES.navigation.tagPattern],
		}),
		fetchShopAllProductThumbnails(channel, shopAllThumbnailSize, cacheVersion),
	]);

	const headerContentPageSlugs = new Set(
		headerContentNav
			.map((item) => item.href.match(/^\/pages\/([^#?]+)/)?.[1])
			.filter((slug): slug is string => Boolean(slug)),
	);

	const contentLinks = headerContentNav.map((item) => (
		<NavLink key={item.href} href={item.href} channel={channel}>
			{item.name}
		</NavLink>
	));

	if (!result.ok) {
		// During build, if the API is unreachable, render minimal nav.
		// The page will re-fetch when a user visits.
		console.warn(`[NavLinks] Failed to fetch navigation for ${channel}:`, result.error.message);
		return (
			<>
				<NavShopAllMenu channel={channel} productThumbnails={productThumbnails} />
				{contentLinks}
			</>
		);
	}

	return (
		<>
			<NavShopAllMenu channel={channel} productThumbnails={productThumbnails} />
			{contentLinks}
			{result.data.menu?.items?.map((item) => {
				if (item.category) {
					if (shouldOmitNavbarCategory(item.category.slug)) {
						return null;
					}
					return (
						<NavLink key={item.id} href={`/categories/${item.category.slug}`} channel={channel}>
							{item.category.name}
						</NavLink>
					);
				}
				if (item.collection) {
					return (
						<NavLink key={item.id} href={`/collections/${item.collection.slug}`} channel={channel}>
							{item.collection.name}
						</NavLink>
					);
				}
				if (item.page) {
					if (headerContentPageSlugs.has(item.page.slug)) {
						return null;
					}
					return (
						<NavLink key={item.id} href={`/pages/${item.page.slug}`} channel={channel}>
							{item.page.title}
						</NavLink>
					);
				}
				if (item.url) {
					return (
						<li key={item.id} className="inline-flex">
							<Link
								href={item.url}
								prefetch={false}
								className={clsx(
									// Match logo “Kaya” #09594D; hover = logo “Pure” #00A38C
									"inline-flex items-center rounded-lg px-3.5 py-2 text-[18px] font-medium uppercase tracking-tight text-[#09594D] transition-colors duration-200",
									"hover:bg-teal-500/18 hover:text-[#00A38C]",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
								)}
							>
								{item.name}
							</Link>
						</li>
					);
				}
				return null;
			})}
		</>
	);
}
