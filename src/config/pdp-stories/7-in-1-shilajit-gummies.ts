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
			},
			{
				id: "wellness",
				title: "Daily Wellness",
				body: "Designed as a simple addition to a daily supplement routine.",
			},
			{
				id: "clarity",
				title: "Mental Clarity & Focus",
				body: "One of the benefit categories currently listed on Kaya Pure.",
			},
			{
				id: "gummies",
				title: "Convenient Gummies",
				body: "No powders or complicated multi-step preparation in the page experience.",
			},
		],
		image: img(
			"blend-lifestyle.png",
			"Hands holding an open jar of Kaya Pure 7-in-1 Shilajit Gummies",
			1024,
			426,
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
			{ id: "convenient", label: "Convenient gummy format" },
			{ id: "nearby", label: "Easy to keep nearby" },
			{ id: "ritual", label: "Simple daily ritual" },
			{ id: "bottle", label: "Premium bottle format" },
		],
		image: img(
			"routine-himalaya.png",
			"Kaya Pure 7-in-1 Shilajit Gummies jar on Himalayan rock with botanicals",
			1024,
			426,
		),
	},
	lookInside: {
		eyebrow: "What's inside",
		title: "A look inside the gummy",
		intro:
			"Seven botanicals in every serving. Amounts match the Supplement Facts panel: two gummies, 15 servings, 30 gummies per jar.",
		ingredients: [
			{
				name: "Shilajit",
				benefit: "Strength, stamina, and everyday vitality — 100 mg per serving.",
				image: img("ingredients/shilajit.png", "Raw Himalayan shilajit resin", 1024, 1024),
			},
			{
				name: "Ashwagandha",
				benefit: "Stress support for a calmer, more resilient baseline.",
				image: img("ingredients/ashwagandha.png", "Ashwagandha root, powder, and leaves", 1022, 1024),
			},
			{
				name: "Black Seed",
				benefit: "A traditional botanical for immune-friendly daily support.",
				image: img("ingredients/black-seed.png", "Black seed in a wooden bowl", 1022, 1024),
			},
			{
				name: "Ginger",
				benefit: "Antioxidant support and digestive ease — 100 mg per serving.",
				image: img("ingredients/ginger.png", "Fresh ginger root and slices", 1024, 1024),
			},
			{
				name: "Black Pepper",
				benefit: "Helps the blend work together — 10 mg per serving.",
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
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
};
