import Link from "next/link";
import clsx from "clsx";
import { NavLink } from "./nav-link";
import { NavShopAllMenu } from "./nav-shop-all-menu";
import { headerContentNav, shouldOmitNavbarCategory } from "@/config/nav";
import {
	SHOP_ALL_NAV_CACHE_VERSION,
	SHOP_ALL_NAV_THUMBNAIL_SIZE,
	fetchShopAllProductThumbnails,
} from "@/ui/components/nav/shop-all-nav-data";
import { fetchNavbarMenuItems } from "@/ui/components/nav/nav-menu-data";

export const NavLinks = async ({ channel }: { channel: string }) => {
	const [productThumbnails, menuItems] = await Promise.all([
		fetchShopAllProductThumbnails(channel, SHOP_ALL_NAV_THUMBNAIL_SIZE, SHOP_ALL_NAV_CACHE_VERSION),
		fetchNavbarMenuItems(channel),
	]);

	const contentLinks = headerContentNav.map((item) => (
		<NavLink key={item.href} href={item.href} channel={channel}>
			{item.name}
		</NavLink>
	));

	const headerContentPageSlugs = new Set(
		headerContentNav
			.map((item) => item.href.match(/^\/pages\/([^#?]+)/)?.[1])
			.filter((slug): slug is string => Boolean(slug)),
	);

	if (!menuItems) {
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
			{menuItems.map((item) => {
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
									"inline-flex items-center rounded-lg px-3.5 py-2 text-[18px] font-medium uppercase tracking-tight text-[#09594D] transition-colors duration-200",
									"hover:text-[#00A38C]",
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
