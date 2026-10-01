import { Suspense } from "react";

import { HomeHeroCarousel } from "@/ui/components/home/home-hero-carousel";
import { HomeFaq } from "@/ui/components/home/home-faq";
import { HomeVideoGallery } from "@/ui/components/home/home-video-gallery";
import {
	HomeFeaturedCategories,
	HomeFeaturedCategoriesSkeleton,
} from "@/ui/components/home/home-featured-categories";
import { HomeShopByCategory, HomeShopByCategorySkeleton } from "@/ui/components/home/home-shop-by-category";

export const metadata = {
	title: "Kpure",
	description: "Kaya Pure",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;

	return (
		<>
			<HomeHeroCarousel channel={channel} />
			<Suspense fallback={<HomeShopByCategorySkeleton />}>
				<HomeShopByCategory channel={channel} />
			</Suspense>
			<Suspense fallback={<HomeFeaturedCategoriesSkeleton />}>
				<HomeFeaturedCategories channel={channel} />
			</Suspense>
			<HomeVideoGallery channel={channel} />
			<HomeFaq />
		</>
	);
}
