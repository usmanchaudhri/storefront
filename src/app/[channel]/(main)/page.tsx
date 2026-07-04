import { getStorefrontContent } from "@/lib/content/server";
import { HomeEnergyFocusSection } from "@/ui/components/home/home-energy-focus-section";
import { HomeHero } from "@/ui/components/home/home-hero";
import { HomeSignatureProductBanner } from "@/ui/components/home/home-signature-product-banner";
import { HomeFaq } from "@/ui/components/home/home-faq";
import { HomeVideoGallery } from "@/ui/components/home/home-video-gallery";
import { FeaturedCollectionSection } from "@/ui/sections/featured-collection-section/featured-collection-section";

export const metadata = {
	title: "Kpure",
	description: "Kaya Pure",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;
	const content = await getStorefrontContent(channel);
	const { featuredCollection } = content.surfaces.homepage;

	return (
		<>
			<HomeHero channel={channel} />
			<HomeEnergyFocusSection />
			<HomeSignatureProductBanner channel={channel} />
			<FeaturedCollectionSection
				channel={channel}
				heading={featuredCollection.heading}
				intro={featuredCollection.intro}
				collectionSlug={featuredCollection.collectionSlug}
				limit={featuredCollection.limit}
				desktopColumns={4}
			/>
			<HomeVideoGallery channel={channel} />
			<HomeFaq />
		</>
	);
}
