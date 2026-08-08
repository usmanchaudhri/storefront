import Link from "next/link";
import clsx from "clsx";
import { NavLink } from "./nav-link";
import { NavShopAllMenu } from "./nav-shop-all-menu";
import { headerContentNav, shouldOmitNavbarCategory } from "@/config/nav";
import { executePublicGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { fetchShopAllProductThumbnails } from "@/ui/components/nav/shop-all-nav-data";

export const NavLinks = async ({ channel }: { channel: string }) => {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.navigation);

	const [result, productThumbnails] = await Promise.all([
		executePublicGraphQL(MenuGetBySlugDocument, {
			variables: { slug: "navbar", channel },
			revalidate: 60 * 60, // 1 hour
		}),
		fetchShopAllProductThumbnails(channel),
	]);

	const headerContentPageSlugs = new Set(headerContentNav.map((item) => item.href.replace(/^\/pages\//, "")));

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
									"inline-flex items-center rounded-lg px-3.5 py-2 text-lg font-medium tracking-tight transition-colors duration-200",
									"hover:bg-teal-500/18 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400",
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
};
