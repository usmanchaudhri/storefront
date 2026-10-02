/** Content for the Figma-inspired Weight Loss Slimming Gummies conversion landing. */

export const LANDING_SLUG = "weight-loss-slimming-gummies";
/** Real Saleor product used for price / ATC. */
export const PRODUCT_SLUG = "weight-loss-slimming-gummies";

/**
 * Canonical product facts — use everywhere on this landing.
 * Label creatives show 30 gummies; do not invent doses beyond that.
 */
export const PRODUCT_FACTS = {
	gummiesPerJar: 30,
	gummiesPerServing: 2,
	servingsPerJar: 15,
	supplyDays: 15,
	supplyLabel: "15-day supply",
	dailyUse: "2 gummies once a day",
	factLine: "30 gummies · 15 servings · 2 gummies per day",
	guaranteeDays: 60,
	guaranteeLabel: "60-day satisfaction guarantee",
	shippingLabel: "Free shipping for subscribers",
	mainBenefit:
		"A simple daily gummy with botanicals formulated to help support metabolism and everyday wellness goals.",
} as const;

const ASSET = "/pdp/weight-loss-slimming-gummies";
const CREATIVE = "/pdp/weight-loss-slimming-gummies-new";

export type LandingImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

function asset(file: string, alt: string, width: number, height: number): LandingImage {
	return { src: `${ASSET}/${file}`, alt, width, height };
}

function creative(file: string, alt: string, width = 1254, height = 1254): LandingImage {
	return { src: `${CREATIVE}/${file}`, alt, width, height };
}

export const weightLossLanding = {
	brand: "KayaPure",
	productName: "Weight Loss Slimming Gummies",
	hero: {
		subtitle: PRODUCT_FACTS.mainBenefit,
		badges: ["Metabolism support", "Herbal blend"],
		offerFacts: [
			{ label: "Quantity", value: "30 gummies / jar" },
			{ label: "Servings", value: "15 servings" },
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
		title: "Appetite support meets",
		titleAccent: "everyday metabolic wellness",
		body: "A pectin-based gummy with Garcinia and supportive botanicals — formulated for a simple daily habit alongside food and movement.",
		stats: [
			{ value: "5", label: "Botanicals in blend" },
			{ value: "30", label: "Gummies per jar" },
			{ value: "100%", label: "Plant pectin base" },
		],
		image: creative(
			"origin-appetite-support.png",
			"Appetite Support — KayaPure Weight Loss Slimming Gummies",
		),
	},
	botanicals: {
		diagram: creative("metabolic-support.png", "Metabolic Support — KayaPure Weight Loss Slimming Gummies"),
		facts: creative(
			"lifestyle-card-1.png",
			"Known for quality — Trusted for a reason comparison for Weight Loss Slimming Gummies",
		),
		lookInside: {
			titlePrefix: "A look ",
			titleAccent: "inside the gummy",
			intro:
				"Key botanicals in every serving. Amounts match the Supplement Facts panel on your jar — 2 gummies per serving, 15 servings, 30 gummies per jar (15-day supply).",
			ctaLabel: "Shop Weight Loss Slimming Gummies",
			ingredients: [
				{
					name: "Garcinia Extract",
					dose: "",
					benefit: "A fruit extract traditionally used to support metabolic wellness.",
					image: asset("ingredients/garcinia-extract.png", "Garcinia fruit and extract", 1254, 1254),
				},
				{
					name: "Fenugreek Extract",
					dose: "",
					benefit: "A botanical traditionally used to support appetite balance.",
					image: asset("ingredients/fenugreek-extract.png", "Fenugreek seeds and extract", 1254, 1254),
				},
				{
					name: "Cayenne Pepper Extract",
					dose: "",
					benefit: "A warming spice extract included for everyday metabolic support.",
					image: asset("ingredients/cayenne-pepper-extract.png", "Cayenne peppers and extract", 1254, 1254),
				},
				{
					name: "Green Tea Extract",
					dose: "",
					benefit: "Plant antioxidants traditionally used for daily wellness support.",
					image: asset("ingredients/green-tea-extract.png", "Green tea leaves and extract", 1254, 1254),
				},
				{
					name: "Black Pepper",
					dose: "",
					benefit: "Included to help support digestion and nutrient uptake.",
					image: asset("ingredients/black-pepper.png", "Black peppercorns with a wooden scoop", 1254, 1254),
				},
			],
		},
		cleanBar: "100% pectin-based • Only 3g cane sugar per serving • Zero gelatin • Gluten-free",
		pills: ["Non-GMO", "Vegan friendly", "Halal-friendly"],
	},
	/** Figma 3269:61 — Known-style “Feel the benefits” split under look-inside. */
	whyItMatters: {
		title: "Feel the benefits every day.",
		image: creative(
			"why-matters-full.png",
			"Why KayaPure Weight Loss Slimming Gummies Matter — athlete holding product with daily benefits",
			1254,
			1254,
		),
		imageBg: "#E8F2EA",
		imageObjectFit: "contain" as const,
		imageObjectPosition: "center center",
		iconBg: "#D4AF37",
		iconColor: "#0B3D36",
		benefits: [
			{
				id: "routine",
				title: "Supports your routine",
				body: "A simple 2-gummy habit designed to sit alongside meals, movement, and everyday wellness goals.",
				icon: "wellness" as const,
			},
			{
				id: "active",
				title: "Helps you stay active",
				body: "Formulated with botanicals positioned to support an active lifestyle — at home, at work, or on the go.",
				icon: "active" as const,
			},
			{
				id: "balance",
				title: "Supports daily balance",
				body: "Garcinia with supportive botanicals — a dual-action blend for everyday metabolic and wellness support.",
				icon: "focus" as const,
			},
			{
				id: "easy",
				title: "Easy daily use",
				body: "Chew 2 gummies once a day — a convenient pectin format that makes consistency easy.",
				icon: "energy" as const,
			},
		],
	},
	proof: {
		eyebrow: "Formula transparency",
		title: "What’s on the label — and how to use this jar",
		intro:
			"Less storytelling, more clarity: serving facts, what’s in the blend, and how this format is meant to fit a daily routine.",
		items: [
			{
				id: "facts",
				title: "Supplement Facts",
				body: "Each serving is 2 gummies. A jar contains 30 gummies / 15 servings — a 15-day supply at the suggested use.",
			},
			{
				id: "blend",
				title: "What’s in the blend",
				body: "Garcinia extract with fenugreek, cayenne pepper, green tea extract, and black pepper. Amounts are listed on the Supplement Facts panel.",
			},
			{
				id: "format",
				title: "Why a gummy format",
				body: "Built as a chewable daily habit — a portable bottle meant to sit on a counter, desk, or bag alongside meals and movement.",
			},
			{
				id: "made",
				title: "Format & standards",
				body: "Plant pectin gummy base (not gelatin), 3g cane sugar per serving, positioned as vegan- and Halal-friendly and gluten-free. Manufactured as a dietary supplement — not intended to diagnose, treat, cure, or prevent any disease.",
			},
		],
		factsImage: creative(
			"lifestyle-card-1.png",
			"Quality comparison overview for Weight Loss Slimming Gummies",
		),
	},
	lifestyle: {
		eyebrow: "Everyday wellness",
		title: "Lifestyle & daily ritual",
		intro: "See how a 2-gummy habit fits into real days — at home, at work, and on the go.",
		cards: [
			{
				id: "quality",
				eyebrow: "Known for quality",
				title: "Trusted for a reason",
				body: "Vegan formula, Halal-friendly, gluten-free, and an herbal ingredient blend in a pectin gummy.",
				points: ["Vegan formula", "Halal-friendly", "Gluten-free", "Herbal ingredient blend"],
				image: creative("lifestyle-card-1.png", "Known for quality — Trusted for a reason"),
			},
			{
				id: "why",
				eyebrow: "Daily support",
				title: "Why this gummy matters",
				body: "Garcinia with supportive botanicals — designed for easy once-daily use.",
				points: [
					"Includes Garcinia with supportive botanicals",
					"Designed for easy once-daily use",
					"Includes green tea, cayenne, and black pepper",
				],
				image: creative("lifestyle-card-2.png", "Why Weight Loss Slimming Gummies matter"),
			},
			{
				id: "differently",
				eyebrow: "Doing things differently",
				title: "Simple, natural, easy to stick to",
				body: "Our mission is to make daily supplementation simple, natural, and easy to keep up with.",
				points: [
					"Simple daily gummy format",
					"Natural herbal blend",
					"Vegan, Halal & gluten-free",
					"Minimal unnecessary extras",
				],
				image: creative("lifestyle-card-3.png", "We're known for doing things differently"),
			},
		],
	},
	routine: {
		eyebrow: "2 gummies • simple routine",
		title: "Easy to keep nearby, simple to add to your day",
		image: asset(
			"routine-section-bg.png",
			"Kaya Pure Weight Loss Slimming Gummies jar with botanicals against mountain landscape",
			1942,
			809,
		),
		steps: [
			{
				n: "01",
				title: "With a meal",
				body: "Chew 2 gummies with food as part of your daily ritual.",
			},
			{
				n: "02",
				title: "Smooth pectin chew",
				body: "A convenient gummy matrix — no powders, no capsules to swallow dry.",
			},
			{
				n: "03",
				title: "Daily metabolic focus",
				body: "A portable format meant to fit beside meals, movement, and your existing routine.",
			},
			{
				n: "04",
				title: "Consistency wins",
				body: "Daily habits compound — stick with the 15-day supply and our separate 60-day satisfaction guarantee.",
			},
		],
	},
	comparison: {
		eyebrow: "Format comparison",
		title: "How the formats differ",
		intro: "A neutral look at convenience — not a claim that one format is medically superior.",
		headers: ["Key feature", "KayaPure slimming gummy", "Powder / shake", "Capsule format"],
		rows: [
			["Format", "Pectin gummy", "Powder", "Capsule"],
			["Botanicals in this SKU", "Garcinia + 4 botanicals", "Varies by product", "Varies by product"],
			["How you take it", "Chew 2 gummies", "Mix with liquid", "Swallow with water"],
			["Sugar in this SKU", "3g cane sugar / serving", "Varies", "Varies by product"],
			["Portability", "Bottle on the go", "Often needs scoop / shaker", "Varies"],
			["Purchase guarantee", "60-day satisfaction guarantee", "Varies by brand", "Varies by brand"],
		],
	},
	social: {
		eyebrow: "Community",
		title: "Real daily rituals.",
		asideLabel: "Customer videos",
		asideBody: "Clips from people using KayaPure in their routines — not a substitute for clinical evidence.",
		clips: [
			{
				id: "clip-1",
				poster: asset("social/clip-1.png", "Customer sharing Kaya Pure gummy experience", 450, 800),
				mp4Url: "/videos/section-video-2.mp4",
			},
			{
				id: "clip-2",
				poster: asset("social/clip-2.png", "Customer sharing their gummy routine", 450, 800),
				mp4Url: "/videos/section-video-3-1.mp4",
			},
			{
				id: "clip-3",
				poster: asset("social/clip-3.png", "Customer testimonial video", 450, 800),
				mp4Url: "/videos/section-video-4-1.mp4",
			},
			{
				id: "clip-4",
				poster: asset("social/clip-1.png", "Kaya Pure in action", 450, 800),
				mp4Url: "/videos/Video-9-1-1.mp4",
			},
			{
				id: "clip-5",
				poster: asset("social/clip-2.png", "Morning wellness routine", 450, 800),
				mp4Url: "/videos/WhatsApp-Video-2025-06-12-at-12.34.25-AM-1.mp4",
			},
		],
		featured: {
			quote:
				"Easy to take daily and simple to stick to. A convenient gummy format that fits into my routine.",
			author: "Customer",
			meta: "Weight Loss Slimming Gummies",
			visual: creative(
				"lifestyle-card-3.png",
				"Known for doing things differently — Weight Loss Slimming Gummies",
			),
		},
	},
	faq: {
		eyebrow: "Frequently asked questions",
		title: "Got questions? We’re here to help.",
		intro: "Backed by our 60-day satisfaction guarantee. Email info@kayapure.com anytime.",
		image: creative(
			"faq-product.png",
			"Kaya Pure Weight Loss Slimming Gummies bottle with botanicals",
			2000,
			2000,
		),
		asideTitle: "Built around a metabolic botanical blend",
		asideBody:
			"Every jar centers Garcinia with fenugreek, cayenne, green tea extract, and black pepper in a pectin gummy.",
		items: [
			{
				id: "what-is",
				question: "What are Weight Loss Slimming Gummies?",
				answer:
					"A pectin gummy dietary supplement with Garcinia extract and supportive botanicals — formulated as a simple addition to a daily wellness routine.",
			},
			{
				id: "how-to-use",
				question: "How should I use it?",
				answer:
					"Suggested use: chew 2 gummies once a day with food. Each jar has 30 gummies (15 servings) — a 15-day supply. Our 60-day satisfaction guarantee is separate from jar duration.",
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
		{ title: "Easy daily format", body: "30 gummies · 2/day · 15-day supply" },
		{ title: "Herbal metabolic blend", body: "Garcinia + 4 botanicals" },
		{ title: "60-day guarantee", body: "info@kayapure.com" },
	],
	finalCta: {
		title: "Ready for a simpler daily ritual?",
		body: "Start your 30-gummy, 15-day supply of Weight Loss Slimming Gummies.",
		buttonLabel: "Add to bag",
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
} as const;
