/** Homepage hero carousel slides (Figma 2814:679 + text 2814:739, 2814:516, 2809:284, 2814:514, 2814:513). */
export type HomeHeroBannerSlide = {
	id: string;
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	alt: string;
	/** Saleor product slug — links to `/products/{slug}` */
	productSlug: string;
	/** Optional Figma text overlay keyed by slide id */
	textOverlay?: "shilajit-gummies";
};

/** Figma banner artboard size (1× of the 4036×1682 @2× export). */
export const HOME_HERO_BANNER_WIDTH = 2018;
export const HOME_HERO_BANNER_HEIGHT = 841;

export const homeHeroBannerSlides: readonly HomeHeroBannerSlide[] = [
	{
		id: "shilajit-gummies",
		imageSrc: "/images/home-hero-banners/shilajit-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Pure Himalayan Shilajit 7-in-1 Gummies — Energy support, vitality boost, daily wellness.",
		productSlug: "7-in-1-shilajit-gummies",
		textOverlay: "shilajit-gummies",
	},
	{
		id: "weight-loss-slimming",
		imageSrc: "/images/home-hero-banners/weight-loss-slimming-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Weight Loss Slimming Gummies — Daily support for metabolism and wellness.",
		productSlug: "weight-loss-slimming-gummies",
	},
	{
		id: "apple-cider-ashwagandha",
		imageSrc: "/images/home-hero-banners/apple-cider-ashwagandha-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Apple Cider & Ashwagandha Gummies — Support for daily wellness.",
		productSlug: "apple-cider-ashwagandha-gummies",
	},
	{
		id: "shilajit-liquid-drops",
		imageSrc: "/images/home-hero-banners/shilajit-liquid-drops.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Pure Himalayan Shilajit Drops — Liquid support for your daily wellness ritual.",
		productSlug: "shilajit-liquid-drops",
	},
	{
		id: "digestive-gummies",
		imageSrc: "/images/home-hero-banners/digestive-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		alt: "Kaya Pure Digestive Gummies — Natural digestive wellness crafted for everyday comfort and balance.",
		productSlug: "digestive-gummies",
	},
] as const;
