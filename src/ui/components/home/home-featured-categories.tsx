import { homeFeaturedCategories } from "@/config/home-featured-categories";
import {
	HomeFeaturedProductsBySlugDocument,
	ProductListByCategoryDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { executePublicGraphQL } from "@/lib/graphql";
import { FEATURED_COLLECTION_IMAGE_SIZES } from "@/lib/images";
import { ProductGrid, transformToProductCard } from "@/ui/components/plp";
import {
	homeFeaturedShopShellClass,
	homeSectionSubheadingClass,
} from "@/ui/components/home/home-section-styles";

const PRODUCTS_PER_CATEGORY = 12;

function sortProductsBySlugOrder(
	products: readonly ProductListItemFragment[],
	slugOrder: readonly string[],
): ProductListItemFragment[] {
	const order = new Map(slugOrder.map((slug, index) => [slug, index]));

	return [...products].sort((a, b) => {
		const aIndex = order.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
		const bIndex = order.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
		return aIndex - bIndex;
	});
}

async function getProductsBySlugs(slugs: readonly string[], channel: string) {
	"use cache";

	if (slugs.length === 0) {
		return [];
	}

	applyCacheProfile(CACHE_PROFILES.products, `home-slugs-${slugs.join(",")}`);

	const result = await executePublicGraphQL(HomeFeaturedProductsBySlugDocument, {
		variables: { channel, slugs: [...slugs] },
		revalidate: 300,
	});

	if (!result.ok) {
		console.warn(`[HomeFeaturedCategories] Failed to fetch products by slug:`, result.error.message);
		return [];
	}

	return result.data.products?.edges.map(({ node }) => node) ?? [];
}

async function getCategoryProducts(slug: string, channel: string, productSlugOrder: readonly string[]) {
	const fromCategory = await fetchCategoryProducts(slug, channel);

	if (fromCategory.length > 0) {
		return fromCategory;
	}

	return getProductsBySlugs(productSlugOrder, channel);
}

async function fetchCategoryProducts(slug: string, channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.categories, `${slug}:${channel}`);

	const result = await executePublicGraphQL(ProductListByCategoryDocument, {
		variables: { slug, channel, first: PRODUCTS_PER_CATEGORY },
		revalidate: 300,
	});

	if (!result.ok) {
		console.warn(`[HomeFeaturedCategories] Failed to fetch category ${slug}:`, result.error.message);
		return [];
	}

	return result.data.category?.products?.edges.map(({ node }) => node) ?? [];
}

export function HomeFeaturedCategoriesSkeleton() {
	return (
		<section aria-hidden>
			<div className={homeFeaturedShopShellClass}>
				<div className="space-y-10">
					{homeFeaturedCategories.map((category) => (
						<div key={category.slug}>
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
	const categoryProducts = await Promise.all(
		homeFeaturedCategories.map(async (category) => {
			const products = await getCategoryProducts(category.slug, channel, category.productSlugOrder);
			const sorted = sortProductsBySlugOrder(products, category.productSlugOrder);

			return {
				...category,
				productCards: sorted.map((product) => transformToProductCard(product, channel)),
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
