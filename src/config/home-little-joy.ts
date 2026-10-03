/** Homepage “Find the good in your every day” — Figma 3413:4176. */

export const HOME_LITTLE_JOY = {
	ink: "#022113",
	accent: "#00A38C",
	muted: "#617066",
	eyebrow: "A little joy, on repeat",
	titleLine1: "Find the good in",
	titleLine2: "your every day.",
	subtitle: "Small rituals. Bright moments. A feel-good edit for every season of life.",
	tiles: [
		{
			id: "family",
			eyebrow: "The whole family",
			title: "Good for all your people.",
			ctaLabel: "Explore family wellness",
			ctaHref: "/products",
			imageSrc: "/images/home/little-joy/family.webp",
			imageAlt: "Kaya Pure Shilajit 7 in 1 gummies outdoors with a hand holding a gummy",
			imageWidth: 1254,
			imageHeight: 1254,
			arrowSrc: "/images/home/little-joy/arrow-1.svg",
		},
		{
			id: "moment",
			eyebrow: "Make it a moment",
			title: "Everyday wellness, a little more joyful.",
			ctaLabel: "Discover the edit",
			ctaHref: "/products",
			imageSrc: "/images/home/little-joy/moment.webp",
			imageAlt: "Woman enjoying a bright everyday wellness moment",
			imageWidth: 1200,
			imageHeight: 1200,
			arrowSrc: "/images/home/little-joy/arrow-2.svg",
		},
	],
} as const;
