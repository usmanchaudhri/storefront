/** Homepage hero carousel slides (Figma 2814:679+739, 2872:13, 2814:646+771, 2814:613+803, 2814:582+833, 2814:551+863). */
export type HomeHeroBannerSlide = {
	id: string;
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	alt: string;
	/** Saleor product slug — links to `/products/{slug}` */
	productSlug: string;
	/** Optional Figma text overlay keyed by slide id */
	textOverlay?:
		| "shilajit-gummies"
		| "weight-loss-slimming"
		| "apple-cider-ashwagandha"
		| "shilajit-liquid-drops"
		| "digestive-gummies";
	/**
	 * Optional typography scale for HTML text overlays (1 = Figma size).
	 * Only applies when `textOverlay` is set.
	 */
	textScale?: number;
};

/** Figma banner artboard size (1× of the 4036×1682 @2× export). */
export const HOME_HERO_BANNER_WIDTH = 2018;
export const HOME_HERO_BANNER_HEIGHT = 841;

/** Wide Shilajit variant — Figma Group 119 (2872:13). */
export const HOME_HERO_BANNER_WIDE_WIDTH = 2537;
export const HOME_HERO_BANNER_WIDE_HEIGHT = 886;

/** Shared overlay scale vs Figma (1 = exact Figma type sizes). */
const HERO_TEXT_SCALE = 1;

export const homeHeroBannerSlides: readonly HomeHeroBannerSlide[] = [
	{
		id: "shilajit-gummies",
		imageSrc: "/images/home-hero-banners/shilajit-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Pure Himalayan Shilajit 7-in-1 Gummies — Energy support, vitality boost, daily wellness.",
		productSlug: "7-in-1-shilajit-gummies",
		textOverlay: "shilajit-gummies",
		textScale: HERO_TEXT_SCALE,
	},
	{
		id: "shilajit-gummies-wide",
		imageSrc: "/images/home-hero-banners/shilajit-gummies-wide.webp",
		imageWidth: HOME_HERO_BANNER_WIDE_WIDTH,
		imageHeight: HOME_HERO_BANNER_WIDE_HEIGHT,
		alt: "Kaya Pure Pure Himalayan Shilajit 7-in-1 Gummies — Energy support, vitality boost, daily wellness.",
		productSlug: "7-in-1-shilajit-gummies",
		textOverlay: "shilajit-gummies",
		textScale: HERO_TEXT_SCALE,
	},
	{
		id: "weight-loss-slimming",
		imageSrc: "/images/home-hero-banners/weight-loss-slimming-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Weight Loss Slimming Gummies — Daily support for metabolism and wellness.",
		productSlug: "weight-loss-slimming-gummies",
		textOverlay: "weight-loss-slimming",
		textScale: HERO_TEXT_SCALE,
	},
	{
		id: "apple-cider-ashwagandha",
		imageSrc: "/images/home-hero-banners/apple-cider-ashwagandha-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Apple Cider & Ashwagandha Gummies — Support for daily wellness.",
		productSlug: "apple-cider-ashwagandha-gummies",
		textOverlay: "apple-cider-ashwagandha",
		textScale: HERO_TEXT_SCALE,
	},
	{
		id: "shilajit-liquid-drops",
		imageSrc: "/images/home-hero-banners/shilajit-liquid-drops.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Pure Himalayan Shilajit Drops — Liquid support for your daily wellness ritual.",
		productSlug: "shilajit-liquid-drops",
		textOverlay: "shilajit-liquid-drops",
		textScale: HERO_TEXT_SCALE,
	},
	{
		id: "digestive-gummies",
		imageSrc: "/images/home-hero-banners/digestive-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Digestive Gummies — Natural digestive wellness crafted for everyday comfort and balance.",
		productSlug: "digestive-gummies",
		textOverlay: "digestive-gummies",
		textScale: HERO_TEXT_SCALE,
	},
] as const;
