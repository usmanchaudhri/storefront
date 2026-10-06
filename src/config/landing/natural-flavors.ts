/** PDP “Natural Flavors, Delicious Taste” — Figma 3504:742. */

export const NATURAL_FLAVORS = {
	background: "#048270",
	curveFill: "#064240",
	ink: "#064240",
	titleLine1: "Natural Flavors,",
	titleLine2: "Delicious Taste",
	footnote: "Flavors with Other Natural Flavors",
	curveSrc: "/images/landing/shilajit-7in1/flavors/curve.svg",
	lifestyle: {
		src: "/images/landing/shilajit-7in1/flavors/lifestyle-taste.webp",
		alt: "Person enjoying a Kaya Pure gummy",
		width: 1122,
		height: 1402,
	},
	flavors: [
		{
			id: "lemon-lime",
			label: "Lemon Lime",
			iconSrc: "/images/landing/shilajit-7in1/flavors/lemon-lime.svg",
			iconWidth: 77,
			iconHeight: 86,
		},
		{
			id: "grape",
			label: "Grape",
			iconSrc: "/images/landing/shilajit-7in1/flavors/grape.svg",
			iconWidth: 66,
			iconHeight: 86,
		},
	],
} as const;
