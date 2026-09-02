import { HomeEnergyFocusSection } from "@/ui/components/home/home-energy-focus-section";
import { HomeHeroCarousel } from "@/ui/components/home/home-hero-carousel";
import { HomeSignatureProductBanner } from "@/ui/components/home/home-signature-product-banner";
import { HomeFaq } from "@/ui/components/home/home-faq";
import { HomeVideoGallery } from "@/ui/components/home/home-video-gallery";
import { HomeFeaturedCategories } from "@/ui/components/home/home-featured-categories";

export const metadata = {
	title: "Kpure",
	description: "Kaya Pure",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;

	return (
		<>
			<HomeHeroCarousel channel={channel} />

			<HomeEnergyFocusSection />
			<HomeSignatureProductBanner channel={channel} />
			<HomeFeaturedCategories channel={channel} />
			<HomeVideoGallery channel={channel} />
			<HomeFaq />
		</>
	);
}
