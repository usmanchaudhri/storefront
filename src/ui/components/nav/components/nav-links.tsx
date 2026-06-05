import Link from "next/link";
import clsx from "clsx";
import { NavLink } from "./nav-link";
import { NavShopByCategory } from "./nav-shop-by-category";
import { headerPrimaryCategoryNav, shouldOmitNavbarCategory } from "@/config/nav";
import { executePublicGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

export const NavLinks = async ({ channel }: { channel: string }) => {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.navigation);

	const result = await executePublicGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel },
		revalidate: 60 * 60, // 1 hour
	});

	if (!result.ok) {
		// During build, if the API is unreachable, render minimal nav.
		// The page will re-fetch when a user visits.
		console.warn(`[NavLinks] Failed to fetch navigation for ${channel}:`, result.error.message);
		return (
			<>
				<NavLink href="/products" channel={channel}>
					All
				</NavLink>
				{headerPrimaryCategoryNav.map((cat) => (
					<NavLink key={cat.slug} href={`/categories/${cat.slug}`} channel={channel}>
						{cat.name}
					</NavLink>
				))}
				<NavShopByCategory channel={channel} />
			</>
		);
	}

	const menuCategoryItems = (result.data.menu?.items || []).filter(
		(item) => !!item?.category?.slug && !!item?.category?.name,
	);

	const resolvePrimaryCategorySlug = (name: string, fallbackSlug: string) => {
		const found = menuCategoryItems.find(
			(i) => i.category?.name?.trim().toLowerCase() === name.trim().toLowerCase(),
		);
		return found?.category?.slug ?? fallbackSlug;
	};

	const resolvedPrimarySlugs = new Set(
		headerPrimaryCategoryNav.map((cat) => resolvePrimaryCategorySlug(cat.name, cat.slug)),
	);

	return (
		<>
			<NavLink href="/products" channel={channel}>
				All
			</NavLink>
			{headerPrimaryCategoryNav.map((cat) => (
				<NavLink
					key={cat.slug}
					href={`/categories/${resolvePrimaryCategorySlug(cat.name, cat.slug)}`}
					channel={channel}
				>
					{cat.name}
				</NavLink>
			))}
			<NavShopByCategory channel={channel} />
			{result.data.menu?.items?.map((item) => {
				if (item.category) {
					if (shouldOmitNavbarCategory(item.category.slug, resolvedPrimarySlugs)) {
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
									"inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-medium tracking-tight transition-colors duration-200",
									"hover:bg-teal-500/18 text-muted-foreground hover:text-foreground",
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
