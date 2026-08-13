import type { PdpStoryImage, PdpStoryPack } from "./types";

const BASE = "/pdp/7-in-1-shilajit-gummies";

function img(file: string, alt: string, width: number, height: number): PdpStoryImage {
	return { src: `${BASE}/${file}`, alt, width, height };
}

export const shilajitGummiesStory: PdpStoryPack = {
	slug: "7-in-1-shilajit-gummies",
	blend: {
		title: "The Kaya Pure 7-in-1 Blend",
		intro:
			"A modern gummy format built around Shilajit and a multi-ingredient herbal formula, presented with the same visual storytelling rhythm as your reference template.",
		tiles: [
			{
				id: "format",
				title: "7-in-1 Format",
				body: "One convenient gummy format with a multi-ingredient story.",
				icon: img("blend-icon-format.png", "", 252, 256),
			},
			{
				id: "wellness",
				title: "Daily Wellness",
				body: "Designed as a simple addition to a daily supplement routine.",
				icon: img("blend-icon-wellness.png", "", 256, 256),
			},
			{
				id: "clarity",
				title: "Mental Clarity & Focus",
				body: "One of the benefit categories currently listed on Kaya Pure.",
				icon: img("blend-icon-clarity.png", "", 264, 284),
			},
			{
				id: "gummies",
				title: "Convenient Gummies",
				body: "No powders or complicated multi-step preparation in the page experience.",
				icon: img("blend-icon-gummies.png", "", 232, 276),
			},
		],
		image: img(
			"blend-section-bg.png",
			"Kaya Pure 7-in-1 Shilajit Gummies lifestyle banner with product benefits",
			1942,
			809,
		),
	},
	routine: {
		title: "Can Kaya Pure fit your routine?",
		intro: "For customers looking for a convenient daily supplement format:",
		checkItems: [
			"Simple gummy format",
			"Multi-ingredient product story",
			"Daily wellness positioning",
			"Portable bottle format",
		],
		iconItems: [
			{
				id: "convenient",
				label: "Convenient gummy format",
				icon: img("routine-icon-convenient.svg", "", 48, 48),
			},
			{
				id: "nearby",
				label: "Easy to keep nearby",
				icon: img("routine-icon-nearby.svg", "", 48, 49),
			},
			{
				id: "ritual",
				label: "Simple daily ritual",
				icon: img("routine-icon-ritual.svg", "", 48, 47),
			},
			{
				id: "bottle",
				label: "Premium bottle format",
				icon: img("routine-icon-bottle.svg", "", 48, 48),
			},
		],
		image: img(
			"routine-section-bg.png",
			"Kaya Pure 7-in-1 Shilajit Gummies jar on Himalayan rock with botanicals",
			1942,
			809,
		),
	},
	lookInside: {
		titlePrefix: "A look ",
		titleAccent: "inside the gummy",
		intro:
			"Seven botanicals in every serving. Amounts match the Supplement Facts panel: two gummies, 15 servings, 30 gummies per jar.",
		ingredients: [
			{
				name: "Shilajit",
				benefit: "Enhances strength, stamina, and focus.",
				image: img("ingredients/shilajit-circle.png", "Raw Himalayan shilajit resin", 1254, 1254),
			},
			{
				name: "Ashwagandha",
				benefit: "Reduces stress and supports relaxation.",
				image: img("ingredients/ashwagandha-circle.png", "Ashwagandha root, powder, and leaves", 1254, 1254),
			},
			{
				name: "Black Seed",
				benefit: "A traditional botanical for immune-friendly daily support.",
				image: img("ingredients/black-seed.png", "Black seed in a wooden bowl", 1022, 1024),
			},
			{
				name: "Ginger",
				benefit: "Supports digestion and antioxidant balance.",
				image: img("ingredients/ginger.png", "Fresh ginger root and slices", 1024, 1024),
			},
			{
				name: "Black Pepper",
				benefit: "Supports digestion and metabolism.",
				image: img("ingredients/black-pepper.png", "Black peppercorns with a wooden scoop", 1024, 1024),
			},
			{
				name: "Tongkat Ali",
				benefit: "Stamina and vitality support, paired with maca in the formula.",
				image: img("ingredients/tongkat-ali.png", "Tongkat Ali roots", 1024, 1022),
			},
			{
				name: "Maca Root",
				benefit: "Natural energy for daily performance, paired with Tongkat Ali.",
				image: img("ingredients/maca.png", "Maca roots and maca powder", 1024, 1024),
			},
		],
		ctaLabel: "Shop 7-in-1 Gummies",
	},
	comparison: {
		titlePrefix: "How Kaya Pure",
		titleAccent: "is different",
		intro:
			"A visual comparison using objective format differences rather than unsupported superiority claims.",
		kayaPureLabel: "Kaya Pure",
		traditionalLabel: "Traditional\nRoutine",
		kayaPureImage: img("comparison-gummy.png", "Kaya Pure 7-in-1 Shilajit Gummy", 204, 136),
		traditionalImage: img("comparison-product.png", "Traditional supplement bottle and tablets", 190, 230),
		rows: [
			{
				feature: "Multiple ingredients in one format",
				kayaPure: true,
				traditional: false,
			},
			{
				feature: "Gummy format",
				kayaPure: true,
				traditional: false,
			},
			{
				feature: "Portable bottle",
				kayaPure: true,
				traditional: false,
			},
			{
				feature: "Simple daily routine",
				kayaPure: true,
				traditional: false,
			},
			{
				feature: "Bundle options on current store",
				kayaPure: true,
				traditional: false,
			},
		],
	},
	faq: {
		title: "Got questions?",
		intro: "Add your store’s verified policy and product details here.",
		image: img(
			"faq-product.png",
			"Kaya Pure Himalayan Shilajit 7-in-1 Gummies bottle with ginger, shilajit resin, and herbs",
			1024,
			1536,
		),
		items: [
			{
				id: "what-is",
				question: "What is Kaya Pure 7-in-1 Shilajit Gummies?",
				answer:
					"A convenient gummy format built around Shilajit and a multi-ingredient herbal blend, designed as a simple addition to a daily wellness routine.",
			},
			{
				id: "how-to-use",
				question: "How should I use it?",
				answer:
					"Follow the serving directions on the product label. Take as part of your regular daily supplement routine unless your healthcare provider advises otherwise.",
			},
			{
				id: "sleep",
				question: "How might MoonBrew affect my sleep?",
				answer:
					"This listing still uses template copy from the design file. Replace with your verified product guidance on evening use and sleep-related expectations.",
			},
			{
				id: "melatonin",
				question: "Is there melatonin in MoonBrew?",
				answer:
					"Confirm melatonin (or lack of it) against your current formula label and store policy before publishing final FAQ copy.",
			},
			{
				id: "sugar",
				question: "Do these gummies contain sugar?",
				answer:
					"Check the Supplement Facts panel on the bottle for sugars and other sweeteners, and mirror that verified information here.",
			},
			{
				id: "how-made",
				question: "How is MoonBrew made?",
				answer:
					"Share your manufacturing, sourcing, and quality-control details here once they are verified for the live Kaya Pure formula.",
			},
		],
	},
	trust: {
		items: [
			{
				id: "shipping",
				title: "Fast, Free Shipping & Easy Returns",
				body: "Free shipping on subscription orders\nand orders $65+",
				icon: img("trust-icon-shipping.svg", "", 62, 62),
			},
			{
				id: "customers",
				title: "1M+ Customers in The Crew",
				body: "See why MoonBrew has thousands\nof fans and 5-star reviews",
				icon: img("trust-icon-customers.png", "", 62, 62),
			},
			{
				id: "guarantee",
				title: "60 Day Satisfaction Guarantee",
				body: "and we'll take care of you",
				detailsLabel: "See details",
				detailsHref: "/#frequently-asked-questions",
				email: "info@kayapure.com",
				icon: img("trust-icon-guarantee.svg", "", 60, 62),
			},
		],
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
};
