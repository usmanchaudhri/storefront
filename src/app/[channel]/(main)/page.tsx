import { getStorefrontContent } from "@/lib/content/server";
import { HomeEnergyFocusSection } from "@/ui/components/home/home-energy-focus-section";
import { HomeSignatureProductBanner } from "@/ui/components/home/home-signature-product-banner";
import { HomeFaq } from "@/ui/components/home/home-faq";
import { HomeVideoGallery } from "@/ui/components/home/home-video-gallery";
import { EditorialHero } from "@/ui/sections/editorial-hero/editorial-hero";
import { HomeFeaturedCategories } from "@/ui/components/home/home-featured-categories";
import { MediaHero } from "@/ui/sections/media-hero/media-hero";

export const metadata = {
	title: "Kpure",
	description: "Kaya Pure",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;
	const content = await getStorefrontContent(channel);
	const { hero } = content.surfaces.homepage;
	const hasMediaHero = Boolean(hero.backgroundVideo || hero.backgroundImage);

	return (
		<>
			{hasMediaHero ? (
				<MediaHero
					id="homepage-hero-heading"
					eyebrow={hero.eyebrow}
					heading={hero.heading}
					subheading={hero.subheading}
					videoSrc={hero.backgroundVideo}
					image={hero.backgroundImage}
					poster={hero.backgroundImage}
					align="left"
					height="fold"
					primaryCta={{ label: hero.primaryCtaLabel, href: "/products" }}
				/>
			) : (
				<EditorialHero
					eyebrow={hero.eyebrow}
					heading={hero.heading}
					subheading={hero.subheading}
					primaryCta={{ label: hero.primaryCtaLabel, href: "/products" }}
				/>
			)}

			<HomeEnergyFocusSection />
			<HomeSignatureProductBanner channel={channel} />
			<HomeFeaturedCategories channel={channel} />
			<HomeVideoGallery channel={channel} />
			<HomeFaq />
		</>
	);
}
