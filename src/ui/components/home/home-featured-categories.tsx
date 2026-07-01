import { ArrowRight } from "lucide-react";

import { homeFeaturedCategories } from "@/config/home-featured-categories";
import {
	HomeFeaturedProductsBySlugDocument,
	ProductListByCategoryDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { executePublicGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { ProductGrid, transformToProductCard } from "@/ui/components/plp";
import {
	homeFeaturedShopShellClass,
	homeSectionHeadlineClass,
	homeSectionIntroClass,
} from "@/ui/components/home/home-section-styles";
import { cn } from "@/lib/utils";

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
	applyCacheProfile(CACHE_PROFILES.categories, `home-${slug}`);

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
		<section className="border-y border-border bg-background" aria-hidden>
			<div className={homeFeaturedShopShellClass}>
				<div className="mx-auto max-w-3xl text-center">
					<div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-secondary" />
					<div className="mx-auto mt-4 h-5 w-full max-w-md animate-pulse rounded bg-secondary" />
				</div>

				<div className="mt-14 space-y-10">
					{homeFeaturedCategories.map((category) => (
						<div key={category.slug}>
							<div className="mb-8 space-y-3">
								<div className="h-8 w-48 animate-pulse rounded-lg bg-secondary" />
								<div className="h-4 w-72 max-w-full animate-pulse rounded bg-secondary" />
							</div>
							<div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
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
		<section className="border-y border-border bg-background" aria-labelledby="home-featured-shop-heading">
			<div className={homeFeaturedShopShellClass}>
				<div className="mx-auto max-w-3xl text-center">
					<h2 id="home-featured-shop-heading" className={homeSectionHeadlineClass}>
						Fuel your day, your way
					</h2>
					<p className={`mx-auto mt-4 max-w-2xl ${homeSectionIntroClass}`}>
						Shop gummies, shots, and drops crafted with Himalayan shilajit
					</p>
				</div>

				<div className="mt-14 space-y-12 lg:space-y-16">
					{visibleCategories.map((category) => (
						<article key={category.slug}>
							<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
								<div className="max-w-xl">
									<p className="text-base font-semibold uppercase tracking-[0.14em] text-teal-700 sm:text-lg">
										{category.title}
									</p>
									<h3 className="mt-2 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
										{category.tagline}
									</h3>
								</div>

								<LinkWithChannel
									href={`/categories/${category.slug}`}
									channel={channel}
									prefetch={false}
									className={cn(
										"inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-teal-600/25 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-800 transition-colors",
										"hover:border-teal-600/40 hover:bg-teal-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									)}
								>
									View all {category.title.toLowerCase()}
									<ArrowRight className="h-4 w-4" aria-hidden />
								</LinkWithChannel>
							</div>

							<div className="mt-8">
								<ProductGrid products={category.productCards} />
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
