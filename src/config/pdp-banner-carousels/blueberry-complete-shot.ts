import type { PdpStoryImage } from "@/config/pdp-stories";

const BASE = "/pdp/blueberry-complete-shot";

function img(file: string, alt: string, width: number, height: number): PdpStoryImage {
	return { src: `${BASE}/${file}`, alt, width, height };
}

/**
 * Blueberry Complete Shot PDP banners (Figma Shots column ~x=81682).
 * - lifestyleBanner: New-Kaya (2) 1 11 (2735:309) — Made to Fit Your Lifestyle
 * - carousel: New-Kaya (4)/(7)/(8) 1 11 (2735:311, 2735:312, 2735:308)
 */
export const blueberryCompleteShotBanners = {
	lifestyleBanner: img(
		"lifestyle-banner.webp",
		"Made to fit your lifestyle — KayaPure Blueberry Complete Shot with premium herbs, daily wellness, and energy & vitality",
		3000,
		1500,
	),
	carousel: [
		img(
			"banner-carousel-1.webp",
			"1 Shot. Daily routine — KayaPure Blueberry Complete Shot for boost energy, reduce fatigue, and morning routine",
			3000,
			1500,
		),
		img(
			"banner-carousel-2.webp",
			"Quality you can trust — KayaPure Blueberry Complete Shot with 100% natural herbs and herbal wellness",
			3000,
			1500,
		),
		img(
			"banner-carousel-3.webp",
			"Complete Daily Shot — daily support for energy, vitality and focus with Blueberry Complete Shot",
			3000,
			1500,
		),
	] as const satisfies readonly PdpStoryImage[],
};
