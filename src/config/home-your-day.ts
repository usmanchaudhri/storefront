/** Homepage “What feels good to you?” — Figma 3413:4123. */

export const HOME_YOUR_DAY_INK = "#022113";

export const HOME_YOUR_DAY_COPY = {
	eyebrow: "Your day, your way",
	title: "What feels good to you?",
	shopAllLabel: "Shop all",
	shopAllHref: "/products",
} as const;

export type HomeYourDayCard = {
	id: string;
	label: string;
	title: string;
	href: string;
	background: string;
	/** SVG in white circle, or character glyph */
	iconSrc?: string;
	iconGlyph?: string;
	arrowSrc: string;
};

export const homeYourDayCards: readonly HomeYourDayCard[] = [
	{
		id: "everyday",
		label: "01 / Everyday",
		title: "Everyday balance",
		href: "/products",
		background: "#DCF4D2",
		iconSrc: "/images/home/your-day/icon-everyday.svg",
		arrowSrc: "/images/home/your-day/card-arrow-1.svg",
	},
	{
		id: "slow-down",
		label: "02 / Slow down",
		title: "Rest & reset",
		href: "/products",
		background: "#FFEEE6",
		iconGlyph: "✳",
		arrowSrc: "/images/home/your-day/card-arrow-2.svg",
	},
	{
		id: "together",
		label: "03 / Together",
		title: "Family wellness",
		href: "/products",
		background: "#E0F4FF",
		iconSrc: "/images/home/your-day/icon-together.svg",
		arrowSrc: "/images/home/your-day/card-arrow-3.svg",
	},
] as const;

export const HOME_YOUR_DAY_SHOP_ARROW = "/images/home/your-day/shop-all-arrow.svg";
