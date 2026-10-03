import {
	SHOP_ALL_NAV_CACHE_VERSION,
	SHOP_ALL_NAV_PRODUCTS_PER_CATEGORY,
	SHOP_ALL_NAV_THUMBNAIL_SIZE,
	fetchShopAllMegaNav,
} from "@/ui/components/nav/shop-all-nav-data";
import { ProductListByCategoryDocument, type ProductListItemFragment } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { executePublicGraphQL } from "@/lib/graphql";
import { FEATURED_COLLECTION_IMAGE_SIZES } from "@/lib/images";
import { ProductCard, transformToProductCard } from "@/ui/components/plp";
import {
	homeFeaturedShopShellClass,
	homeSectionSubheadingClass,
} from "@/ui/components/home/home-section-styles";

/** Preferred homepage row order (Figma shop categories). */
const CATEGORY_ROW_ORDER = ["gummies", "drops", "shots"] as const;

async function fetchFirstCategoryProduct(slug: string, channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.categories, `home-featured-one:${slug}:${channel}`);

	const result = await executePublicGraphQL(ProductListByCategoryDocument, {
		variables: { slug, channel, first: 1 },
		revalidate: 300,
	});

	if (!result.ok) {
		console.warn(`[HomeFeaturedCategories] Failed to fetch category ${slug}:`, result.error.message);
		return null as ProductListItemFragment | null;
	}

	return result.data.category?.products?.edges[0]?.node ?? null;
}

function categorySortKey(name: string, slug: string): number {
	const haystack = `${slug} ${name}`.toLowerCase();
	const index = CATEGORY_ROW_ORDER.findIndex((token) => haystack.includes(token));
	return index === -1 ? CATEGORY_ROW_ORDER.length : index;
}

export function HomeFeaturedCategoriesSkeleton() {
	return (
		<section aria-hidden>
			<div className={homeFeaturedShopShellClass}>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className="space-y-3">
							<div className="mb-2 h-5 w-24 animate-pulse rounded bg-secondary" />
							<div className="aspect-[3/4] animate-pulse rounded-xl bg-secondary" />
							<div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
							<div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/**
 * Homepage shop strip — one product from each of Gummies / Drops / Shots in a single row.
 */
export async function HomeFeaturedCategories({ channel }: { channel: string }) {
	const shopAllNav = await fetchShopAllMegaNav(
		channel,
		undefined,
		SHOP_ALL_NAV_THUMBNAIL_SIZE,
		SHOP_ALL_NAV_PRODUCTS_PER_CATEGORY,
		SHOP_ALL_NAV_CACHE_VERSION,
	);

	const categoryProducts = await Promise.all(
		shopAllNav.columns.map(async (category) => {
			const product = await fetchFirstCategoryProduct(category.slug, channel);
			if (!product) {
				return null;
			}

			return {
				title: category.name,
				slug: category.slug,
				productCard: transformToProductCard(product, channel),
			};
		}),
	);

	const visibleCategories = categoryProducts
		.filter((category): category is NonNullable<typeof category> => category !== null)
		.sort((a, b) => categorySortKey(a.title, a.slug) - categorySortKey(b.title, b.slug))
		.slice(0, 3);

	if (visibleCategories.length === 0) {
		return null;
	}

	return (
		<section aria-label="Shop by category">
			<div className={homeFeaturedShopShellClass}>
				<ul className="grid list-none grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
					{visibleCategories.map((category, index) => (
						<li key={category.slug}>
							<h2 className={`mb-4 ${homeSectionSubheadingClass}`}>{category.title}</h2>
							<ProductCard
								product={category.productCard}
								priority={index < 3}
								imageSizes={FEATURED_COLLECTION_IMAGE_SIZES}
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
