/** Content for the Figma-inspired Digestive Gummies conversion landing. */

export const LANDING_SLUG = "digestive-gummies";
/** Real Saleor product used for price / ATC. */
export const PRODUCT_SLUG = "digestive-gummies";

/**
 * Canonical product facts — use everywhere on this landing.
 * Label creatives show 30 gummies / 15-day supply at 2 gummies per day.
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
		"A simple daily gummy with ginger and supportive botanicals — formulated to help support everyday digestive comfort and balance.",
} as const;

const ASSET = "/pdp/digestive-gummies";
const CREATIVE = "/pdp/digestive-gummies-new";

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

export const digestiveLanding = {
	brand: "KayaPure",
	productName: "Digestive Gummies",
	hero: {
		subtitle: PRODUCT_FACTS.mainBenefit,
		badges: ["Digestive support", "Herbal blend"],
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
		title: "Everyday digestive comfort,",
		titleAccent: "made simple",
		body: "A pectin-based gummy with ginger, cumin, and supportive botanicals — formulated for a simple daily habit alongside meals.",
		stats: [
			{ value: "8", label: "Botanicals in blend" },
			{ value: "30", label: "Gummies per jar" },
			{ value: "100%", label: "Plant pectin base" },
		],
		image: creative(
			"origin-product.png",
			"KayaPure Digestive Gummies jar with papaya, pineapple, and botanicals",
			2000,
			2000,
		),
	},
	botanicals: {
		diagram: creative("botanicals-1.png", "Known for ingredients — Digestive Gummies herbal blend overview"),
		facts: creative(
			"botanicals-2.png",
			"Better daily support with Digestive Gummies — serving and format overview",
		),
		lookInside: {
			titlePrefix: "A look ",
			titleAccent: "inside the gummy",
			intro:
				"Key botanicals in every serving. Amounts match the Supplement Facts panel on your jar — 2 gummies per serving, 15 servings, 30 gummies per jar (15-day supply).",
			ctaLabel: "Shop Digestive Gummies",
			ingredients: [
				{
					name: "Ginger",
					dose: "",
					benefit: "Included to help support digestion.",
					image: asset("ingredients/ginger.png", "Fresh ginger root and slices", 1254, 1254),
				},
				{
					name: "Cumin",
					dose: "",
					benefit: "A traditional spice included for comfortable digestion support.",
					image: asset("ingredients/cumin.png", "Cumin seeds in a wooden bowl", 1254, 1254),
				},
				{
					name: "Senna Leaf",
					dose: "",
					benefit: "A botanical traditionally used for digestive regularity.",
					image: asset("ingredients/senna-leaf.png", "Senna leaves", 1254, 1254),
				},
				{
					name: "Pink Salt",
					dose: "",
					benefit: "Mineral-rich salt included for everyday electrolyte balance.",
					image: asset("ingredients/pink-salt.png", "Pink Himalayan salt crystals", 1254, 1254),
				},
				{
					name: "Long Pepper",
					dose: "",
					benefit: "A warming spice traditionally used to support digestion.",
					image: asset("ingredients/long-pepper.png", "Dried long pepper pods", 1254, 1254),
				},
				{
					name: "Mango Powder",
					dose: "",
					benefit: "Tangy fruit powder that adds flavor and botanical support.",
					image: asset("ingredients/mango-powder.png", "Mango powder with fresh mango", 1254, 1254),
				},
				{
					name: "Sea Salt",
					dose: "",
					benefit: "Natural salt to complement daily mineral intake.",
					image: asset("ingredients/sea-salt.png", "Flaky sea salt", 1254, 1254),
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
	/** Figma 3338:23 — Known-style “Feel the benefits” split under look-inside. */
	whyItMatters: {
		title: "Feel the benefits every day.",
		image: creative(
			"why-matters-full.png",
			"Why Digestive Gummies Matter — athlete holding Kaya Pure Digestive Gummies with daily benefits",
			1254,
			1254,
		),
		imageBg: "#F5F7F4",
		imageObjectFit: "contain" as const,
		imageObjectPosition: "center center",
		iconBg: "#D4AF37",
		iconColor: "#0B3D36",
		benefits: [
			{
				id: "comfort",
				title: "Supports digestive comfort",
				body: "Ginger with supportive botanicals — formulated to help support everyday digestive comfort and balance.",
				icon: "wellness" as const,
			},
			{
				id: "lighter",
				title: "Helps your routine feel lighter",
				body: "A simple 2-gummy habit designed to sit alongside meals without complicated prep.",
				icon: "active" as const,
			},
			{
				id: "balance",
				title: "Supports daily balance",
				body: "An herbal digestive blend positioned for straightforward daily wellness support.",
				icon: "focus" as const,
			},
			{
				id: "easy",
				title: "Easy daily wellness support",
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
				body: "Ginger powder, cumin powder, black pepper, long pepper, pink salt, mango powder, sea salt, and senna leaf. Amounts are listed on the Supplement Facts panel.",
			},
			{
				id: "format",
				title: "Why a gummy format",
				body: "Built as a chewable daily habit — a portable bottle meant to sit on a counter, desk, or bag alongside meals.",
			},
			{
				id: "made",
				title: "Format & standards",
				body: "Plant pectin gummy base (not gelatin), 3g cane sugar per serving, positioned as vegan- and Halal-friendly and gluten-free. Manufactured as a dietary supplement — not intended to diagnose, treat, cure, or prevent any disease.",
			},
		],
		factsImage: creative(
			"featured-or-proof.png",
			"Known for quality — Trusted for a reason comparison for Digestive Gummies",
		),
	},
	lifestyle: {
		eyebrow: "Everyday comfort",
		title: "Lifestyle & daily ritual",
		intro: "See how a 2-gummy habit fits into real days — at home, at work, and on the go.",
		cards: [
			{
				id: "daily-support",
				eyebrow: "Known for",
				title: "Daily digestive support",
				body: "A 2-gummy serving featuring ginger, cumin, and supportive botanicals in a pectin gummy.",
				points: ["30 gummies", "Vegan", "15-day supply"],
				image: creative("lifestyle-card-1.png", "Known for daily digestive support — 2 gummies per day"),
			},
			{
				id: "routine",
				eyebrow: "Easy daily routine",
				title: "Simple to stick with",
				body: "Suggested use: chew 2 gummies once a day. 30 gummies = 15-day supply.",
				points: ["Simple daily format", "Easy to add to your routine", "15-day supply"],
				image: creative("lifestyle-card-2.png", "Known for easy daily routine — Digestive Gummies"),
			},
			{
				id: "differently",
				eyebrow: "Doing things differently",
				title: "Simple and easy to stick to",
				body: "Our mission is to make daily supplementation simple and easy to keep up with.",
				points: [
					"Simple daily gummy format",
					"Herbal ingredient blend",
					"Vegan & Halal-friendly",
					"2 gummies once a day",
				],
				image: creative("lifestyle-card-3.png", "Digestive Gummies lifestyle creative"),
			},
		],
	},
	routine: {
		eyebrow: "2 gummies • simple routine",
		title: "Easy to keep nearby, simple to add to your day",
		image: creative("routine-or-proof.png", "We're known for doing things differently — Digestive Gummies"),
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
				title: "Everyday digestive focus",
				body: "A portable format meant to fit beside meals and your existing routine.",
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
		headers: ["Key feature", "KayaPure digestive gummy", "Tea / powder", "Capsule format"],
		rows: [
			["Format", "Pectin gummy", "Tea or powder", "Capsule"],
			["Botanicals in this SKU", "Ginger + 7 botanicals", "Varies by product", "Varies by product"],
			["How you take it", "Chew 2 gummies", "Brew or mix", "Swallow with water"],
			["Sugar in this SKU", "3g cane sugar / serving", "Varies", "Varies by product"],
			["Portability", "Bottle on the go", "Often needs prep", "Varies"],
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
			meta: "Digestive Gummies",
			visual: creative("routine-or-proof.png", "Known for doing things differently — Digestive Gummies"),
		},
	},
	faq: {
		eyebrow: "Frequently asked questions",
		title: "Got questions? We’re here to help.",
		intro: "Backed by our 60-day satisfaction guarantee. Email info@kayapure.com anytime.",
		image: creative(
			"faq-product.png",
			"Kaya Pure Digestive Gummies bottle with papaya, pineapple, and botanicals",
			2000,
			2000,
		),
		asideTitle: "Built around a digestive botanical blend",
		asideBody:
			"Every jar pairs ginger and cumin with supportive botanicals — including long pepper, mango powder, salts, and senna leaf — in a pectin gummy.",
		items: [
			{
				id: "what-is",
				question: "What are Digestive Gummies?",
				answer:
					"A pectin gummy dietary supplement with ginger, cumin, and supporting botanicals — formulated as a simple addition to a daily wellness routine.",
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
		{ title: "Herbal digestive blend", body: "Ginger + supportive botanicals" },
		{ title: "60-day guarantee", body: "info@kayapure.com" },
	],
	finalCta: {
		title: "Ready for a simpler daily ritual?",
		body: "Start your 30-gummy, 15-day supply of Digestive Gummies.",
		buttonLabel: "Add to bag",
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
} as const;
