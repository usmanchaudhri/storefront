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
import { ProductGrid, transformToProductCard } from "@/ui/components/plp";
import {
	homeFeaturedShopShellClass,
	homeSectionSubheadingClass,
} from "@/ui/components/home/home-section-styles";

const PRODUCTS_PER_CATEGORY = 12;

async function fetchCategoryProducts(slug: string, channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.categories, `${slug}:${channel}`);

	const result = await executePublicGraphQL(ProductListByCategoryDocument, {
		variables: { slug, channel, first: PRODUCTS_PER_CATEGORY },
		revalidate: 300,
	});

	if (!result.ok) {
		console.warn(`[HomeFeaturedCategories] Failed to fetch category ${slug}:`, result.error.message);
		return [] as ProductListItemFragment[];
	}

	return result.data.category?.products?.edges.map(({ node }) => node) ?? [];
}

export function HomeFeaturedCategoriesSkeleton() {
	return (
		<section aria-hidden>
			<div className={homeFeaturedShopShellClass}>
				<div className="space-y-10">
					{Array.from({ length: 3 }).map((_, categoryIndex) => (
						<div key={categoryIndex}>
							<div className="mb-6 h-7 w-32 animate-pulse rounded bg-secondary" />
							<div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
								{Array.from({ length: 3 }).map((_, index) => (
									<div key={index} className="space-y-3">
										<div className="aspect-[3/4] animate-pulse rounded-xl bg-secondary" />
										<div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
										<div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

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
			const products = await fetchCategoryProducts(category.slug, channel);

			return {
				title: category.name,
				slug: category.slug,
				productCards: products.map((product) => transformToProductCard(product, channel)),
			};
		}),
	);

	const visibleCategories = categoryProducts.filter((category) => category.productCards.length > 0);

	if (visibleCategories.length === 0) {
		return null;
	}

	return (
		<section aria-label="Shop by category">
			<div className={homeFeaturedShopShellClass}>
				<div className="space-y-12 lg:space-y-16">
					{visibleCategories.map((category) => (
						<article key={category.slug}>
							<h2 className={`mb-6 ${homeSectionSubheadingClass}`}>{category.title}</h2>
							<ProductGrid
								products={category.productCards}
								desktopColumns={4}
								imageSizes={FEATURED_COLLECTION_IMAGE_SIZES}
							/>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
