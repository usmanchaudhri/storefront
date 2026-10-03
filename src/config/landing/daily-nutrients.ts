/** PDP “18 Daily Nutrients” — Figma 3413:4391. */

export const DAILY_NUTRIENTS = {
	ink: "#064240",
	accent: "#FFB423",
	title: "18 Daily Nutrients",
	subtitle: "Including support for",
	items: [
		{
			id: "omega-3",
			title: "Omega-3 ALA",
			detail: "from Organic Flaxseed Oil",
			iconSrc: "/images/landing/shilajit-7in1/nutrients/omega-3.svg",
			iconWidth: 372,
			iconHeight: 372,
			showAsterisk: false,
		},
		{
			id: "vitamins-cd3",
			title: "Vitamins C & D3",
			detail: "for Immune Support",
			iconSrc: "/images/landing/shilajit-7in1/nutrients/vitamins-cd3.svg",
			iconWidth: 372,
			iconHeight: 372,
			showAsterisk: true,
		},
		{
			id: "vitamin-k",
			title: "Vitamin K",
			detail: "for Bone Health",
			iconSrc: "/images/landing/shilajit-7in1/nutrients/vitamin-k.webp",
			iconWidth: 372,
			iconHeight: 372,
			showAsterisk: true,
		},
		{
			id: "vitamin-a",
			title: "Vitamin A",
			detail: "for Eye Health",
			iconSrc: "/images/landing/shilajit-7in1/nutrients/vitamin-a.svg",
			iconWidth: 372,
			iconHeight: 372,
			showAsterisk: true,
		},
	],
} as const;
