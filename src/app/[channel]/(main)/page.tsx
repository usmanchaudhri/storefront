import { HomeHeroCarousel } from "@/ui/components/home/home-hero-carousel";
import { HomeFaq } from "@/ui/components/home/home-faq";
import { HomeVideoGallery } from "@/ui/components/home/home-video-gallery";
import { HomeValueProps } from "@/ui/components/home/home-value-props";
import { HomeGoodStuff } from "@/ui/components/home/home-good-stuff";
import { HomeWellnessRitual } from "@/ui/components/home/home-wellness-ritual";
import { HomeYourDay } from "@/ui/components/home/home-your-day";
import { HomeLittleJoy } from "@/ui/components/home/home-little-joy";
import { HomeSpotlight } from "@/ui/components/home/home-spotlight";
import { HomeHumanWellness } from "@/ui/components/home/home-human-wellness";
import { HomeOurKind } from "@/ui/components/home/home-our-kind";

export const metadata = {
	title: "Kpure",
	description: "Kaya Pure",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;

	return (
		<>
			<HomeHeroCarousel channel={channel} />
			<HomeValueProps />
			<HomeGoodStuff channel={channel} />
			<HomeWellnessRitual channel={channel} />
			<HomeYourDay channel={channel} />
			<HomeLittleJoy channel={channel} />
			<HomeSpotlight channel={channel} />
			<HomeHumanWellness />
			<HomeOurKind channel={channel} />
			<HomeVideoGallery channel={channel} />
			<HomeFaq />
		</>
	);
}
