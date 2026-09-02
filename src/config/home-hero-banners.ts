/** Homepage hero carousel slides (Figma 2492:405, 2533:24, 2537:22, 2538:57, 2538:110). */
export type HomeHeroBannerSlide = {
	id: string;
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	alt: string;
	/** Saleor product slug — links to `/products/{slug}` */
	productSlug: string;
};

export const homeHeroBannerSlides: readonly HomeHeroBannerSlide[] = [
	{
		id: "shilajit-gummies",
		imageSrc: "/images/home-hero-banners/shilajit-gummies.webp",
		imageWidth: 1920,
		imageHeight: 960,
		alt: "Himalayan Shilajit Gummies — Ancient power. Modern gummy.",
		productSlug: "7-in-1-shilajit-gummies",
	},
	{
		id: "apple-cider-ashwagandha",
		imageSrc: "/images/home-hero-banners/apple-cider-ashwagandha-gummies.webp",
		imageWidth: 1920,
		imageHeight: 960,
		alt: "Apple Cider & Ashwagandha Gummies — Balance your day, the tasty way.",
		productSlug: "apple-cider-ashwagandha-gummies",
	},
	{
		id: "magnesium-glycinate",
		imageSrc: "/images/home-hero-banners/magnesium-glycinate-gummies.webp",
		imageWidth: 1920,
		imageHeight: 960,
		alt: "Magnesium Glycinate, Calcium & Zinc Gummies — Calm your mind, strengthen your body.",
		productSlug: "magnesium-glycinate-calcium-zinc-gummies",
	},
	{
		id: "mango-complete-shot",
		imageSrc: "/images/home-hero-banners/mango-complete-shot.webp",
		imageWidth: 1920,
		imageHeight: 960,
		alt: "Mango Complete Shot — Your daily wellness in one shot.",
		productSlug: "mango-complete-shot",
	},
	{
		id: "elderberry-complete-shot",
		imageSrc: "/images/home-hero-banners/elderberry-complete-shot.webp",
		imageWidth: 1920,
		imageHeight: 960,
		alt: "Elderberry Complete Shot — Immunity in every sip.",
		productSlug: "elderberry-complete-shot",
	},
] as const;
