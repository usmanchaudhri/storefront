import { Suspense } from "react";
import { HomeEnergyFocusSection } from "@/ui/components/home/home-energy-focus-section";
import { HomeHero } from "@/ui/components/home/home-hero";
import { HomeSignatureProductBanner } from "@/ui/components/home/home-signature-product-banner";
import { HomeFaq } from "@/ui/components/home/home-faq";
import { HomeVideoGallery } from "@/ui/components/home/home-video-gallery";
import {
	HomeFeaturedCategories,
	HomeFeaturedCategoriesSkeleton,
} from "@/ui/components/home/home-featured-categories";

export const metadata = {
	title: "Kpure",
	description: "Kaya Pure",
};

/**
 * Page shell — renders immediately with a static section wrapper.
 * Category product grids stream inside their own Suspense boundary.
 */
export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;

	return (
		<>
			<HomeHero channel={channel} />
			<HomeEnergyFocusSection />
			<HomeSignatureProductBanner channel={channel} />
			<Suspense fallback={<HomeFeaturedCategoriesSkeleton />}>
				<HomeFeaturedCategories channel={channel} />
			</Suspense>
			<HomeVideoGallery channel={channel} />
			<HomeFaq />
		</>
	);
}
