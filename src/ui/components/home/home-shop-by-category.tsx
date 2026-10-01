import { ProductListByCollectionDocument } from "@/gql/graphql";
import { homeShopByCategoryCollections } from "@/config/home-shop-by-category";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { executePublicGraphQL } from "@/lib/graphql";
import { CategoryTileGrid, type CategoryTile } from "@/ui/sections/category-tile-grid/category-tile-grid";

async function fetchCollectionTile(slug: string, channel: string, fallbackTitle: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.collections, `shop-by-category:${slug}:${channel}`);

	const result = await executePublicGraphQL(ProductListByCollectionDocument, {
		variables: { slug, channel, first: 1 },
		revalidate: 300,
	});

	if (!result.ok || !result.data.collection) {
		if (!result.ok) {
			console.warn(`[HomeShopByCategory] Failed to fetch collection ${slug}:`, result.error.message);
		}
		return null;
	}

	const collection = result.data.collection;
	const productThumb = collection.products?.edges[0]?.node.thumbnail;
	const background = collection.backgroundImage;

	const tile: CategoryTile = {
		title: fallbackTitle || collection.name,
		href: `/collections/${collection.slug}`,
		image: background?.url ?? productThumb?.url ?? null,
		imageAlt: background?.alt || productThumb?.alt || collection.name,
	};

	return tile;
}

/**
 * Homepage “Shop by category” — benefit collections
 * (Energy, Weight Loss, Bone and Joint Health, Gut Health).
 */
export async function HomeShopByCategory({ channel }: { channel: string }) {
	const tiles = (
		await Promise.all(
			homeShopByCategoryCollections.map(({ slug, title }) => fetchCollectionTile(slug, channel, title)),
		)
	).filter((tile): tile is CategoryTile => tile !== null);

	if (tiles.length === 0) {
		return null;
	}

	const columns = tiles.length >= 4 ? 4 : tiles.length >= 3 ? 3 : 2;

	return (
		<CategoryTileGrid
			heading="Shop by Benefits"
			tiles={tiles}
			columns={columns}
			imageFit="cover"
			tone="muted"
			spacing="none"
			align="center"
			showTileLabels={false}
			className="pb-section-sm pt-6 sm:pt-8"
			headerClassName="mb-6"
			headingClassName="text-[24px] font-medium uppercase tracking-tight !leading-none"
		/>
	);
}

export function HomeShopByCategorySkeleton() {
	return (
		<section className="bg-muted pb-[var(--section-space-sm)] pt-6 sm:pt-8" aria-hidden>
			<div className="container-content">
				<div className="mb-6 h-5 w-48 animate-pulse rounded bg-secondary" />
				<ul className="grid list-none grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
					{Array.from({ length: 4 }).map((_, index) => (
						<li key={index} className="aspect-[4/5] animate-pulse rounded-card bg-secondary" />
					))}
				</ul>
			</div>
		</section>
	);
}
