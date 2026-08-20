export type PdpStoryImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type PdpStoryTile = {
	id: "format" | "wellness" | "clarity" | "gummies";
	title: string;
	body: string;
	icon: PdpStoryImage;
};

export type PdpStoryBlend = {
	title: string;
	intro: string;
	tiles: readonly PdpStoryTile[];
	image: PdpStoryImage;
};

/** Full-bleed image banner placed under the blend section (Figma 2492:408). */
export type PdpStorySimpleRoutineBanner = {
	image: PdpStoryImage;
};

/** Figma 2435:901 — light mint positioning strip under the blend banner. */
export type PdpStoryPositioningBanner = {
	body: string;
	icon: PdpStoryImage;
};

export type PdpStoryRoutine = {
	title: string;
	intro: string;
	checkItems: readonly string[];
	iconItems: readonly {
		id: "convenient" | "nearby" | "ritual" | "bottle";
		label: string;
		icon: PdpStoryImage;
	}[];
	image: PdpStoryImage;
};

export type PdpStoryIngredient = {
	name: string;
	benefit: string;
	image: PdpStoryImage;
};

export type PdpStoryLookInside = {
	titlePrefix: string;
	titleAccent: string;
	intro: string;
	ingredients: readonly PdpStoryIngredient[];
	ctaLabel: string;
};

export type PdpStoryComparisonRow = {
	feature: string;
	kayaPure: boolean;
	traditional: boolean;
};

/** Figma nodes 2435:1089–2435:1135 + gummy 2435:1523 — How Kaya Pure is different. */
export type PdpStoryComparison = {
	titlePrefix: string;
	titleAccent: string;
	intro: string;
	traditionalLabel: string;
	kayaPureLabel: string;
	rows: readonly PdpStoryComparisonRow[];
	/** Figma 2435:1523 — black gummy, Kaya Pure column heading. */
	kayaPureImage: PdpStoryImage;
	/** Figma 2435:1135 — traditional bottle, Traditional column heading. */
	traditionalImage: PdpStoryImage;
};

/** Figma node 2435:996 — Got Questions? FAQ. */
export type PdpStoryFaqItem = {
	id: string;
	question: string;
	answer: string;
};

export type PdpStoryFaq = {
	title: string;
	intro: string;
	image: PdpStoryImage;
	items: readonly PdpStoryFaqItem[];
};

/** Figma node 2435:1040 — teal trust / benefit bar. */
export type PdpStoryTrustItem = {
	id: "shipping" | "customers" | "guarantee";
	title: string;
	/** Plain body lines; optional rich fields override rendering for guarantee. */
	body: string;
	icon: PdpStoryImage;
	detailsLabel?: string;
	detailsHref?: string;
	email?: string;
};

export type PdpStoryTrust = {
	items: readonly PdpStoryTrustItem[];
};

/** Figma 2435:1486–2435:1485 — Real Reviews section (placeholder feed). */
export type PdpStoryReviewItem = {
	id: string;
	badgeLabel: string;
	ratingLabel: string;
	title: string;
	body: string;
	author: string;
};

export type PdpStoryReviews = {
	titlePrefix: string;
	titleAccent: string;
	intro: string;
	items: readonly PdpStoryReviewItem[];
	ctaLabel: string;
};

export type PdpStoryPack = {
	slug: string;
	blend: PdpStoryBlend;
	positioningBanner: PdpStoryPositioningBanner;
	simpleRoutineBanner: PdpStorySimpleRoutineBanner;
	routine: PdpStoryRoutine;
	lookInside: PdpStoryLookInside;
	comparison: PdpStoryComparison;
	faq: PdpStoryFaq;
	trust: PdpStoryTrust;
	reviews: PdpStoryReviews;
	disclaimer: string;
};
