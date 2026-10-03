/** Homepage “The Spotlight / 01” — Figma 3413:4210. */

export const HOME_SPOTLIGHT = {
	background: "#6F010D",
	buttonBackground: "#005449",
	eyebrow: "The spotlight / 01",
	title: "Little people. Big everyday good.",
	body: "From busy mornings to the last bedtime story, finding a routine that works for your family can feel like a win. Meet a colorful, kid-friendly favorite made with little ones in mind.",
	tags: ["Organic", "16 daily nutrients", "Ages 2–3"] as const,
	ctaLabel: "Meet the toddler multi",
	ctaHref: "/products",
	image: {
		/** Figma 3413:5448 — Quality & Purity panel + ingredient photography */
		src: "/images/home/spotlight/image-62.webp",
		alt: "Known for quality and purity — no heavy metals, third-party tested, GMP certified, with fresh apple and botanical roots",
		width: 2000,
		height: 2062,
	},
	arrowSrc: "/images/home/spotlight/arrow.svg",
} as const;
