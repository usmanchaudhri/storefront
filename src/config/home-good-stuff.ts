/** Homepage “THE GOOD STUFF” strip — Figma 3414:2 + Shop Now captions 3413:5232. */

export const HOME_GOOD_STUFF_INK = "#022113";

/** Figma Shop Now caption tokens (3413:5232). */
export const HOME_SHOP_NOW = {
	titleColor: "#666666",
	ctaColor: "#DA2228",
	tagTeal: "#048270",
	tagGreen: "#00B140",
} as const;

export const HOME_GOOD_STUFF_COPY = {
	eyebrow: "The good stuff",
	title: "Your daily dose of good.",
	ctaLabel: "Explore all products",
	ctaHref: "/products",
	shopNowLabel: "Shop Now",
} as const;

export type HomeGoodStuffTag = {
	label: string;
	background: string;
};

export type HomeGoodStuffProduct = {
	id: string;
	/** Saleor product slug */
	productSlug: string;
	name: string;
	/** Short title under the product image (Figma Shop Now heading) */
	shortTitle: string;
	tags: readonly HomeGoodStuffTag[];
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	background: string;
	badgeSrc?: string;
	badgeAlt?: string;
};

export const homeGoodStuffProducts: readonly HomeGoodStuffProduct[] = [
	{
		id: "7in1",
		productSlug: "7-in-1-shilajit-gummies",
		name: "Pure Himalayan Shilajit 7 in 1 Gummies",
		shortTitle: "7 in 1 Gummies",
		tags: [
			{ label: "Men’s", background: HOME_SHOP_NOW.tagTeal },
			{ label: "Organic", background: HOME_SHOP_NOW.tagGreen },
		],
		imageSrc: "/images/home/good-stuff/product-7in1.webp",
		imageWidth: 513,
		imageHeight: 729,
		background: "#EFFBF8",
		badgeSrc: "/images/home/good-stuff/best-seller-badge.webp",
		badgeAlt: "Best seller",
	},
	{
		id: "elderberry",
		productSlug: "elderberry-shilajit-gummies",
		name: "Pure Himalayan Shilajit Elderberry Gummies",
		shortTitle: "Elderberry Gummies",
		tags: [
			{ label: "Men’s", background: HOME_SHOP_NOW.tagTeal },
			{ label: "Organic", background: HOME_SHOP_NOW.tagGreen },
		],
		imageSrc: "/images/home/good-stuff/product-elderberry.webp",
		imageWidth: 513,
		imageHeight: 729,
		background: "#FFF1F8",
	},
	{
		id: "sea-moss",
		productSlug: "sea-moss-elderberry-gummies",
		name: "Sea Moss & Elderberry Gummies Superfood",
		shortTitle: "Sea Moss Gummies",
		tags: [
			{ label: "Men’s", background: HOME_SHOP_NOW.tagTeal },
			{ label: "Organic", background: HOME_SHOP_NOW.tagGreen },
		],
		imageSrc: "/images/home/good-stuff/product-sea-moss.webp",
		imageWidth: 513,
		imageHeight: 729,
		background: "#F1FAFF",
	},
] as const;

export const HOME_GOOD_STUFF_ARROW_SRC = "/images/home/good-stuff/explore-arrow.svg";
