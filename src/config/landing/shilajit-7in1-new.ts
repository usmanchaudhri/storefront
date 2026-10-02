/** Content for the Figma-inspired 7-in-1 Shilajit Gummies conversion landing. */

export const LANDING_SLUG = "7-in-1-shilajit-gummies";
/** Real Saleor product used for price / ATC. */
export const PRODUCT_SLUG = "7-in-1-shilajit-gummies";

/**
 * Canonical product facts — use everywhere on this landing.
 * Do not say “30-day supply” unless it matches this dose math.
 * Guarantee length is separate from jar duration.
 */
export const PRODUCT_FACTS = {
	gummiesPerJar: 60,
	gummiesPerServing: 2,
	servingsPerJar: 30,
	supplyDays: 30,
	supplyLabel: "30-day supply",
	dailyUse: "2 gummies once a day",
	factLine: "60 gummies · 30 servings · 2 gummies per day",
	guaranteeDays: 60,
	guaranteeLabel: "60-day satisfaction guarantee",
	shippingLabel: "Free shipping for subscribers",
	mainBenefit: "A simple daily gummy formulated to support everyday energy and stamina.",
} as const;

const ASSET = "/pdp/7-in-1-shilajit-gummies";
/** Landing creatives live in the dedicated asset folder (kept after route rename). */
const CREATIVE = "/pdp/7-in-1-shilajit-gummies-new";

export type LandingImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

function asset(file: string, alt: string, width: number, height: number): LandingImage {
	return { src: `${ASSET}/${file}`, alt, width, height };
}

function creative(file: string, alt: string, width = 1024, height = 1024): LandingImage {
	return { src: `${CREATIVE}/${file}`, alt, width, height };
}

export const shilajit7in1Landing = {
	brand: "KayaPure",
	productName: "Pure Himalayan Shilajit 7-in-1 Gummies",
	hero: {
		subtitle: PRODUCT_FACTS.mainBenefit,
		badges: ["30 Day Supply", "2 gummies per day"],
		galleryPromoBadge: "Best Seller",
		/** Explicit above-the-fold offer facts (price/variant/ATC come from Saleor buy box). */
		offerFacts: [
			{ label: "Quantity", value: "60 gummies / jar" },
			{ label: "Servings", value: "30 servings" },
			{ label: "Daily use", value: PRODUCT_FACTS.dailyUse },
			{ label: "Supply", value: PRODUCT_FACTS.supplyLabel },
			{ label: "Shipping", value: PRODUCT_FACTS.shippingLabel },
			{ label: "Guarantee", value: PRODUCT_FACTS.guaranteeLabel },
		],
		reviewsCta: {
			label: "See customer videos",
			href: "#pdp-story-reviews",
		},
	},
	origin: {
		eyebrow: "Known for potency",
		title: "Daily Wellness Support: 3000mg Total Shilajit",
		titleAccent: "",
		body: "Every jar is formulated with 3,000 mg of genuine Himalayan Shilajit across 60 gummies, infused alongside six adaptogenic allies.",
		stats: [
			{ value: "60", label: "Gummies" },
			{ value: "100%", label: "Vegan" },
			{ value: "30", label: "Day supply" },
		],
		image: creative(
			"shilajit-potency-metrics.jpg",
			"Known for daily wellness support — 3000mg total Shilajit per bottle with 60 gummies, 100% vegan, 30-day supply",
			986,
			986,
		),
	},
	botanicals: {
		diagram: creative("whats-inside.webp", "What's inside — dosage overview for Shilajit 7-in-1 Gummies"),
		facts: creative(
			"ingredients-known-for.webp",
			"Known for ingredients — traditional wellness blend overview",
		),
		lookInside: {
			titlePrefix: "A look ",
			titleAccent: "inside the gummy",
			intro:
				"Seven botanicals in every serving. Amounts match the Supplement Facts panel: 2 gummies per serving, 30 servings, 60 gummies per jar (30-day supply).",
			ctaLabel: "Shop 7-in-1 Gummies",
			ingredients: [
				{
					name: "Shilajit",
					dose: "100mg",
					benefit: "Traditionally used to support strength, stamina, and focus.",
					image: asset("ingredients/shilajit-circle.png", "Raw Himalayan shilajit resin", 1254, 1254),
				},
				{
					name: "Ashwagandha",
					dose: "100mg",
					benefit: "An adaptogen formulated to help support relaxation.",
					image: asset(
						"ingredients/ashwagandha-circle.png",
						"Ashwagandha root, powder, and leaves",
						1254,
						1254,
					),
				},
				{
					name: "Black Seed",
					dose: "100mg",
					benefit: "A traditional botanical included for everyday wellness support.",
					image: asset("ingredients/black-seed.png", "Black seed in a wooden bowl", 1022, 1024),
				},
				{
					name: "Ginger",
					dose: "100mg",
					benefit: "Included to help support digestion.",
					image: asset("ingredients/ginger.png", "Fresh ginger root and slices", 1024, 1024),
				},
				{
					name: "Black Pepper",
					dose: "10mg",
					benefit: "Included to help support digestion and nutrient uptake.",
					image: asset("ingredients/black-pepper.png", "Black peppercorns with a wooden scoop", 1024, 1024),
				},
				{
					name: "Tongkat Ali",
					dose: "100mg",
					benefit: "Formulated to help support stamina and vitality, paired with maca.",
					image: asset("ingredients/tongkat-ali.png", "Tongkat Ali roots", 1024, 1022),
				},
				{
					name: "Maca Root",
					dose: "100mg",
					benefit: "Formulated to help support everyday energy, paired with Tongkat Ali.",
					image: asset("ingredients/maca.png", "Maca roots and maca powder", 1024, 1024),
				},
			],
		},
		cleanBar: "100% pectin-based • Only 3g cane sugar per serving • Zero gelatin • Gluten-free",
		pills: ["Non-GMO", "Vegan friendly", "Halal-friendly"],
	},
	proof: {
		eyebrow: "Formula transparency",
		title: "What’s on the label — and what “wild-harvested” means",
		intro:
			"Less storytelling, more clarity: serving facts, sourcing language, and how this jar is meant to be used.",
		items: [
			{
				id: "facts",
				title: "Supplement Facts",
				body: "Each serving is 2 gummies. A jar contains 60 gummies / 30 servings — a 30-day supply at the suggested use.",
			},
			{
				id: "wild",
				title: "What “wild-harvested” means here",
				body: "We use “wild-harvested” to describe Shilajit collected from high-altitude Himalayan geological formations — not cultivated farm crops. It is a sourcing description, not a clinical claim.",
			},
			{
				id: "blend",
				title: "Ingredient sourcing",
				body: "The formula pairs Himalayan Shilajit with six botanicals (ashwagandha, tongkat ali, maca, black seed, ginger, and black pepper). Amounts are listed on the Supplement Facts panel.",
			},
			{
				id: "made",
				title: "Format & standards",
				body: "Plant pectin gummy base (not gelatin), 3g cane sugar per serving, positioned as vegan- and Halal-friendly and gluten-free. Manufactured as a dietary supplement — not intended to diagnose, treat, cure, or prevent any disease.",
			},
		],
		factsImage: creative(
			"ingredients-known-for.webp",
			"Supplement Facts and botanical overview for Shilajit 7-in-1 Gummies",
		),
	},
	lifestyle: {
		eyebrow: "Unlocking everyday vitality",
		title: "Lifestyle & everyday performance",
		intro: "See how a 2-gummy ritual fits into real days — at home, at work, and on the go.",
		cards: [
			{
				id: "benefits",
				eyebrow: "Daily support",
				title: "Everyday performance",
				body: "Built for a simple daily habit: a chewable format formulated to help support everyday energy and an easy wellness routine.",
				points: ["Everyday energy support", "Adaptogenic botanicals", "Easy daily habit"],
				image: creative(
					"better-daily-support.webp",
					"Better daily support with Shilajit — vegan, Halal and gluten-free",
				),
			},
			{
				id: "ritual",
				eyebrow: "Daily ritual",
				title: "Fits your daily lifestyle",
				body: "Keep a bottle on the kitchen counter, desk, or gym bag — no resin spoons, no multi-step prep.",
				points: ["At home", "At work", "On the go"],
				image: creative(
					"easy-daily-routine.webp",
					"Known for easy daily routine — chew 2 gummies once a day",
				),
			},
			{
				id: "habit",
				eyebrow: "Daily habit",
				title: "Pure Himalayan routine",
				body: "60 gummies · 30 servings · 2 gummies per day = a 30-day supply. Designed to make consistency the default.",
				points: ["2 gummies / day", "60 gummies / jar", "30-day supply"],
				image: creative("why-it-matters.webp", "Why Shilajit 7-in-1 Gummies matter — easy daily use"),
			},
		],
	},
	routine: {
		eyebrow: "2 gummies • simple routine",
		title: "Easy to keep nearby, simple to add to your day",
		image: asset(
			"routine-section-bg.png",
			"Kaya Pure 7-in-1 Shilajit Gummies jar with botanicals",
			2018,
			841,
		),
		steps: [
			{
				n: "01",
				title: "Morning or pre-workout",
				body: "Chew 2 gummies with breakfast or before training as part of your daily ritual.",
			},
			{
				n: "02",
				title: "Smooth pectin chew",
				body: "A convenient gummy matrix — no bitter resin prep, no capsules to swallow dry.",
			},
			{
				n: "03",
				title: "Clean daily focus",
				body: "A caffeine-free format meant to fit beside your existing routine.",
			},
			{
				n: "04",
				title: "Consistency wins",
				body: "Daily habits compound — stick with the 30-day supply and our separate 60-day satisfaction guarantee.",
			},
		],
	},
	comparison: {
		eyebrow: "Format comparison",
		title: "How The Formats Differ",
		intro: "A neutral comparison of convenience and composition — why people switch to our 7-in-1 gummy.",
		image: creative(
			"format-comparison-graphic.jpg",
			"Why customers choose Kaya — clean thoughtful formula vs generic supplements",
			976,
			976,
		),
		headers: ["Key Feature", "Kaya Pure 7-in-1 Gummy", "Raw Resin Format", "Standard Capsules"],
		rows: [
			["Format", "Plant Pectin Gummy", "Sticky Tar Resin", "Gelatin / Veggie Pill"],
			["Botanicals", "Shilajit + 6 Botanicals", "Shilajit Only", "Varies / Single Herb"],
			["How You Take It", "Chew 2 Fruit Gummies", "Dissolve in warm water", "Swallow with water"],
			["Taste Experience", "Pleasant & Smooth", "Pungent & Bitter", "Neutral pill taste"],
			["Black Pepper Absorption", "Included (10mg)", "None", "Rarely Included"],
			["Purchase Guarantee", "60-Day Full Refund", "Varies by vendor", "Typically 14-30 days"],
		],
	},
	social: {
		eyebrow: "Community",
		title: "Real daily rituals.",
		/** Honest framing — no fabricated star rating or review volume. */
		asideLabel: "Customer videos",
		asideBody: "Clips from people using KayaPure in their routines — not a substitute for clinical evidence.",
		clips: [
			{
				id: "clip-1",
				poster: asset("social/clip-1.png", "Customer sharing Kaya Pure gummy experience", 720, 720),
				mp4Url: "/videos/section-video-2.mp4",
			},
			{
				id: "clip-2",
				poster: asset("social/clip-2.png", "Customer sharing their gummy routine", 718, 1280),
				mp4Url: "/videos/section-video-3-1.mp4",
			},
			{
				id: "clip-3",
				poster: asset("social/clip-3.png", "Customer testimonial video", 480, 854),
				mp4Url: "/videos/section-video-4-1.mp4",
			},
			{
				id: "clip-4",
				poster: asset("social/clip-4.png", "Kaya Pure in action", 480, 854),
				mp4Url: "/videos/Video-9-1-1.mp4",
			},
			{
				id: "clip-5",
				poster: asset("social/clip-5.png", "Morning wellness routine", 720, 1280),
				mp4Url: "/videos/WhatsApp-Video-2025-06-12-at-12.34.25-AM-1.mp4",
			},
		],
		featured: {
			quote:
				"Easy to take daily and simple to stick to. A convenient gummy format that fits into my routine.",
			author: "Customer",
			meta: "7-in-1 Shilajit Gummies",
			visual: creative(
				"consistency-testimonial.webp",
				"Known for consistency — customer quote about easy daily use",
			),
		},
	},
	faq: {
		eyebrow: "Frequently asked questions",
		title: "Got questions? We’re here to help.",
		intro: "Backed by our 60-day satisfaction guarantee. Email info@kayapure.com anytime.",
		image: asset(
			"faq-product.png",
			"Kaya Pure Himalayan Shilajit 7-in-1 Gummies bottle with ginger, shilajit resin, and herbs",
			1024,
			1536,
		),
		asideTitle: "Built around a multi-herb blend",
		asideBody: "Every jar centers Himalayan Shilajit plus six supportive botanicals in a pectin gummy.",
		items: [
			{
				id: "what-is",
				question: "What is KayaPure 7-in-1 Shilajit Gummies?",
				answer:
					"A pectin gummy dietary supplement with Himalayan Shilajit and six botanicals: ashwagandha, tongkat ali, maca root, black seed, ginger, and black pepper.",
			},
			{
				id: "how-to-use",
				question: "How should I use it?",
				answer:
					"Suggested use: chew 2 gummies once a day. Each jar has 60 gummies (30 servings) — a 30-day supply. Our 60-day satisfaction guarantee is separate from jar duration.",
			},
			{
				id: "sugar",
				question: "Do these gummies contain sugar or gelatin?",
				answer: "They contain 3g of cane sugar per serving and use a plant pectin base — not gelatin.",
			},
			{
				id: "dietary",
				question: "Is it vegan, Halal, and gluten-free?",
				answer: "Yes — positioned as vegan, Halal-friendly, and gluten-free.",
			},
			{
				id: "guarantee",
				question: "What is your 60-day satisfaction guarantee?",
				answer: "If you’re not satisfied, email info@kayapure.com within 60 days and we’ll take care of you.",
			},
		],
	},
	trust: [
		{ title: "Easy daily format", body: "60 gummies · 2/day · 30-day supply" },
		{ title: "7-in-1 herbal blend", body: "Shilajit + 6 botanicals" },
		{ title: "60-day guarantee", body: "info@kayapure.com" },
	],
	finalCta: {
		title: "Ready for a simpler daily ritual?",
		body: "Start your 60-gummy, 30-day supply of Pure Himalayan Shilajit 7-in-1 Gummies.",
		buttonLabel: "Add to bag",
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
} as const;

/** Shared shape for conversion PDP landings (Shilajit, Apple Cider, etc.). */
export type ConversionLandingContent = typeof shilajit7in1Landing;
