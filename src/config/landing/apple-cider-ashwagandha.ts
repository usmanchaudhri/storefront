/** Content for the Figma-inspired Apple Cider & Ashwagandha Gummies conversion landing. */

export const LANDING_SLUG = "apple-cider-ashwagandha-gummies";
/** Real Saleor product used for price / ATC. */
export const PRODUCT_SLUG = "apple-cider-ashwagandha-gummies";

/**
 * Canonical product facts — use everywhere on this landing.
 * Do not invent doses; amounts belong on the Supplement Facts panel.
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
	mainBenefit:
		"A simple daily gummy pairing apple cider vinegar with ashwagandha — formulated to support everyday balance and calm.",
} as const;

const ASSET = "/pdp/apple-cider-ashwagandha-gummies";
const CREATIVE = "/pdp/apple-cider-ashwagandha-gummies-new";

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

export const appleCiderLanding = {
	brand: "KayaPure",
	productName: "Apple Cider & Ashwagandha Gummies",
	hero: {
		subtitle: PRODUCT_FACTS.mainBenefit,
		badges: ["Apple cider vinegar", "Ashwagandha blend"],
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
		title: "Apple cider vinegar meets",
		titleAccent: "everyday calm",
		body: "A pectin-based gummy that pairs traditional apple cider vinegar with ashwagandha and supporting botanicals — no harsh vinegar shots required.",
		stats: [
			{ value: "ACV", label: "Apple cider vinegar" },
			{ value: "6+", label: "Botanicals in blend" },
			{ value: "100%", label: "Plant pectin base" },
		],
		image: creative(
			"origin-daily-support.png",
			"KayaPure Apple Cider & Ashwagandha Gummies — daily support creative",
			1600,
			900,
		),
	},
	botanicals: {
		diagram: creative(
			"ingredients-known-for.png",
			"Known for ingredients — Apple Cider & Ashwagandha blend overview",
			1600,
			900,
		),
		facts: creative(
			"better-daily-support.png",
			"Better daily support — Apple Cider & Ashwagandha Gummies",
			1600,
			900,
		),
		lookInside: {
			titlePrefix: "A look ",
			titleAccent: "inside the gummy",
			intro:
				"Two hero botanicals in every serving. Amounts match the Supplement Facts panel on your jar — 2 gummies per serving, 30 servings, 60 gummies per jar (30-day supply).",
			ctaLabel: "Shop Apple Cider Gummies",
			ingredients: [
				{
					name: "Apple Cider Vinegar",
					dose: "",
					benefit: "Traditional wellness support in a gummy format you can take daily.",
					image: asset("ingredients/ginger.png", "Apple cider vinegar wellness botanical", 1024, 1024),
				},
				{
					name: "Ashwagandha (KSM-66)",
					dose: "",
					benefit: "An adaptogen formulated to help support relaxation.",
					image: asset(
						"ingredients/ashwagandha-circle.png",
						"Ashwagandha root, powder, and leaves",
						1254,
						1254,
					),
				},
			],
		},
		cleanBar: "100% pectin-based • Only 3g cane sugar per serving • Zero gelatin • Gluten-free",
		pills: ["Non-GMO", "Vegan friendly", "Halal-friendly"],
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
				body: "Each serving is 2 gummies. A jar contains 60 gummies / 30 servings — a 30-day supply at the suggested use.",
			},
			{
				id: "blend",
				title: "What’s in the blend",
				body: "Apple cider vinegar paired with Ashwagandha (KSM-66). Amounts are listed on the Supplement Facts panel.",
			},
			{
				id: "format",
				title: "Why a gummy format",
				body: "Built as a chewable alternative to liquid vinegar shots — a portable bottle meant to sit on a counter, desk, or bag.",
			},
			{
				id: "made",
				title: "Format & standards",
				body: "Plant pectin gummy base (not gelatin), 3g cane sugar per serving, positioned as vegan- and Halal-friendly and gluten-free. Manufactured as a dietary supplement — not intended to diagnose, treat, cure, or prevent any disease.",
			},
		],
		factsImage: creative(
			"ingredients-known-for.png",
			"Supplement Facts and botanical overview for Apple Cider & Ashwagandha Gummies",
			1600,
			900,
		),
	},
	lifestyle: {
		eyebrow: "Everyday balance",
		title: "Lifestyle & daily ritual",
		intro: "See how a 2-gummy habit fits into real days — at home, at work, and on the go.",
		cards: [
			{
				id: "benefits",
				eyebrow: "Daily support",
				title: "Balance without the shot",
				body: "Apple cider vinegar and ashwagandha in a pectin gummy — formulated for a simple daily habit.",
				points: ["ACV + ashwagandha", "Adaptogenic botanicals", "Easy daily habit"],
				image: creative(
					"better-daily-support.png",
					"Better daily support with Apple Cider & Ashwagandha Gummies",
					1600,
					900,
				),
			},
			{
				id: "ritual",
				eyebrow: "Daily ritual",
				title: "Fits your daily lifestyle",
				body: "Keep a bottle on the kitchen counter, desk, or gym bag — no vinegar shots, no multi-step prep.",
				points: ["At home", "At work", "On the go"],
				image: asset(
					"blend-section-bg.png",
					"Hands holding Kaya Pure Apple Cider and Ashwagandha Gummies jar",
					1942,
					809,
				),
			},
			{
				id: "habit",
				eyebrow: "Daily habit",
				title: "A routine you can keep",
				body: "60 gummies · 30 servings · 2 gummies per day = a 30-day supply. Designed to make consistency the default.",
				points: ["2 gummies / day", "60 gummies / jar", "30-day supply"],
				image: asset(
					"routine-section-bg.png",
					"Kaya Pure Apple Cider and Ashwagandha Gummies jar with apple and botanicals",
					1942,
					809,
				),
			},
		],
	},
	routine: {
		eyebrow: "2 gummies • simple routine",
		title: "Easy to keep nearby, simple to add to your day",
		image: asset(
			"routine-section-bg.png",
			"Kaya Pure Apple Cider and Ashwagandha Gummies jar with apple and botanicals on marble",
			1942,
			809,
		),
		steps: [
			{
				n: "01",
				title: "Morning or early afternoon",
				body: "Chew 2 gummies with food as part of your daily ritual.",
			},
			{
				n: "02",
				title: "Smooth pectin chew",
				body: "A convenient gummy matrix — no vinegar shots, no capsules to swallow dry.",
			},
			{
				n: "03",
				title: "Calm daily focus",
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
		title: "How the formats differ",
		intro: "A neutral look at convenience — not a claim that one format is medically superior.",
		headers: ["Key feature", "KayaPure ACV gummy", "Liquid ACV shot", "Capsule format"],
		rows: [
			["Format", "Pectin gummy", "Liquid / shot", "Capsule"],
			["Botanicals in this SKU", "ACV + ashwagandha + botanicals", "Often ACV only", "Varies by product"],
			["How you take it", "Chew 2 gummies", "Drink / shoot", "Swallow with water"],
			["Sugar in this SKU", "3g cane sugar / serving", "Varies", "Varies by product"],
			["Portability", "Bottle on the go", "Often needs fridge / pour", "Varies"],
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
			meta: "Apple Cider & Ashwagandha Gummies",
			visual: creative(
				"better-daily-support.png",
				"Known for consistency — daily support with Apple Cider Gummies",
				1600,
				900,
			),
		},
	},
	faq: {
		eyebrow: "Frequently asked questions",
		title: "Got questions? We’re here to help.",
		intro: "Backed by our 60-day satisfaction guarantee. Email info@kayapure.com anytime.",
		image: creative(
			"faq-product.png",
			"Kaya Pure Apple Cider Vinegar with Ashwagandha Gummies bottle",
			2000,
			2000,
		),
		asideTitle: "Built around ACV + KSM-66",
		asideBody: "Every jar pairs apple cider vinegar with Ashwagandha (KSM-66) in a pectin gummy.",
		items: [
			{
				id: "what-is",
				question: "What are Apple Cider & Ashwagandha Gummies?",
				answer:
					"A pectin gummy dietary supplement combining apple cider vinegar with Ashwagandha (KSM-66) — designed as a simple addition to a daily wellness routine.",
			},
			{
				id: "how-to-use",
				question: "How should I use it?",
				answer:
					"Suggested use: chew 2 gummies once a day with food. Each jar has 60 gummies (30 servings) — a 30-day supply. Our 60-day satisfaction guarantee is separate from jar duration.",
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
		{ title: "ACV + ashwagandha blend", body: "Plus supporting botanicals" },
		{ title: "60-day guarantee", body: "info@kayapure.com" },
	],
	finalCta: {
		title: "Ready for a simpler daily ritual?",
		body: "Start your 60-gummy, 30-day supply of Apple Cider & Ashwagandha Gummies.",
		buttonLabel: "Add to bag",
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
} as const;
