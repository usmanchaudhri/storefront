/** Homepage hero — Figma New-Banners Apple Cider (landscape 3358:7, portrait 3337:19). */
export type HomeHeroBannerSlide = {
	id: string;
	/** Desktop / landscape (Figma 3358:7) */
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	/** Mobile / portrait (Figma 3337:19) */
	mobileImageSrc: string;
	mobileImageWidth: number;
	mobileImageHeight: number;
	alt: string;
	/** Saleor product slug — links to `/products/{slug}` */
	productSlug: string;
};

/** Figma frame 3358:7 — landscape asset pixels. */
export const HOME_HERO_BANNER_WIDTH = 3803;
export const HOME_HERO_BANNER_HEIGHT = 1327;

/** Figma frame 3337:19 — portrait asset pixels. */
export const HOME_HERO_MOBILE_WIDTH = 1596;
export const HOME_HERO_MOBILE_HEIGHT = 2835;

/**
 * Display band sized to match Known Nutrition’s homepage hero
 * (measured ~1440×563 desktop, ~721×473 mobile — full-bleed).
 * @see https://knownnutrition.co.uk/
 */
export const HOME_HERO_DESKTOP_ASPECT_W = 1440;
export const HOME_HERO_DESKTOP_ASPECT_H = 563;
export const HOME_HERO_MOBILE_ASPECT_W = 721;
export const HOME_HERO_MOBILE_ASPECT_H = 473;

export const homeHeroBannerSlides: readonly HomeHeroBannerSlide[] = [
	{
		id: "apple-cider-ashwagandha",
		imageSrc: "/images/home-hero-banners/apple-cider-ashwagandha-gummies.webp",
		imageWidth: HOME_HERO_BANNER_WIDTH,
		imageHeight: HOME_HERO_BANNER_HEIGHT,
		mobileImageSrc: "/images/home-hero-banners/apple-cider-ashwagandha-gummies-mobile.webp",
		mobileImageWidth: HOME_HERO_MOBILE_WIDTH,
		mobileImageHeight: HOME_HERO_MOBILE_HEIGHT,
		alt: "Kaya Pure Apple Cider & Ashwagandha Gummies — Daily Balance Support.",
		productSlug: "apple-cider-ashwagandha-gummies",
	},
] as const;
