/** Content for the Figma-inspired Pure Shilajit Liquid Drops conversion landing. */

export const LANDING_SLUG = "pure-shilajit-liquid-drops";
/** Real Saleor product used for price / ATC. */
export const PRODUCT_SLUG = "pure-shilajit-liquid-drops";

/**
 * Canonical product facts — use everywhere on this landing.
 * Creatives show 30ml / 3–6 drops daily. Do not invent dose mg or supply-day math.
 */
export const PRODUCT_FACTS = {
	bottleMl: 30,
	dropsPerDayMin: 3,
	dropsPerDayMax: 6,
	dailyUse: "3–6 drops once a day",
	factLine: "30ml bottle · 3–6 drops per day",
	supplyLabel: "30ml bottle",
	guaranteeDays: 60,
	guaranteeLabel: "60-day satisfaction guarantee",
	shippingLabel: "Free shipping for subscribers",
	mainBenefit:
		"Pure Himalayan shilajit in a liquid drop format — formulated to support everyday energy and vitality with a simple daily ritual.",
} as const;

const ASSET = "/pdp/pure-shilajit-liquid-drops";
const CREATIVE = "/pdp/pure-shilajit-liquid-drops-new";

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

export const shilajitDropsLanding = {
	brand: "KayaPure",
	productName: "Pure Shilajit Liquid Drops",
	hero: {
		subtitle: PRODUCT_FACTS.mainBenefit,
		badges: ["Himalayan shilajit", "Liquid drops"],
		offerFacts: [
			{ label: "Size", value: "30ml / 1oz bottle" },
			{ label: "Daily use", value: PRODUCT_FACTS.dailyUse },
			{ label: "How to take", value: "Plain, or mix with water / tea" },
			{ label: "Format", value: "Liquid dropper bottle" },
			{ label: "Shipping", value: PRODUCT_FACTS.shippingLabel },
			{ label: "Guarantee", value: PRODUCT_FACTS.guaranteeLabel },
		],
		reviewsCta: {
			label: "See customer videos",
			href: "#pdp-story-reviews",
		},
	},
	origin: {
		title: "Himalayan shilajit,",
		titleAccent: "in liquid drop form",
		body: "Sun-dried Himalayan shilajit with distilled water in a portable dropper bottle — no sticky resin ritual required.",
		stats: [
			{ value: "30ml", label: "Bottle size" },
			{ value: "3–6", label: "Drops per day" },
			{ value: "100%", label: "Liquid drop format" },
		],
		image: creative(
			"origin-product.png",
			"KayaPure Pure Himalayan Shilajit Liquid Drops with raw resin and botanicals",
			2000,
			2000,
		),
	},
	botanicals: {
		diagram: creative(
			"botanicals-1.png",
			"Known for ingredients — Pure Shilajit Liquid Drops formula overview",
		),
		facts: creative("botanicals-2.png", "Better daily support with Pure Shilajit Liquid Drops"),
		lookInside: {
			titlePrefix: "A look ",
			titleAccent: "inside",
			intro:
				"A focused liquid formula. Amounts match the Supplement Facts panel on your bottle — suggested use is 3–6 drops daily.",
			ctaLabel: "Shop Pure Shilajit Liquid Drops",
			ingredients: [
				{
					name: "Shilajit",
					dose: "",
					benefit: "Traditionally used to support strength, stamina, and focus.",
					image: asset("ingredients/shilajit.png", "Raw Himalayan shilajit resin", 1254, 1254),
				},
				{
					name: "Distilled Water",
					dose: "",
					benefit: "A clean liquid base for easy daily dosing.",
					image: asset("ingredients/distilled-water.png", "Distilled water droplets", 1254, 1254),
				},
			],
		},
		cleanBar: "Liquid drop format • Shake well before use • Mix with water or tea • No gelatin",
		pills: ["30ml bottle", "Easy daily ritual", "Portable dropper"],
	},
	/** Figma 2991:1739 — Known-style “Feel the benefits” split under look-inside. */
	whyItMatters: {
		title: "Feel the benefits every day.",
		image: creative(
			"why-matters-full.png",
			"Energy, stamina, focus — athlete with Kaya Pure Pure Shilajit Liquid Drops",
			512,
			512,
		),
		imageBg: "#0b2e24",
		imageObjectFit: "contain" as const,
		imageObjectPosition: "center center",
		iconBg: "#9d4317",
		iconColor: "#FBF9F4",
		benefits: [
			{
				id: "oxygenation",
				title: "Pre-Workout Aerobic Oxygenation",
				body: "Supports healthy red blood cell capability and oxygen consumption during high-intensity training cycles.",
				icon: "energy" as const,
			},
			{
				id: "focus",
				title: "Neuro-Clarity & Sustained Focus",
				body: "Encourages neuroprotective pathways without the jittery adrenaline spike common with synthetic stimulants.",
				icon: "focus" as const,
			},
			{
				id: "stamina",
				title: "Stamina & Vitality",
				body: "A liquid shilajit ritual positioned to support everyday stamina alongside training and work days.",
				icon: "active" as const,
			},
			{
				id: "easy",
				title: "Easy daily use",
				body: "Take 3–6 drops once a day — plain, or mixed with water or tea.",
				icon: "wellness" as const,
			},
		],
	},
	proof: {
		eyebrow: "Formula transparency",
		title: "What’s on the label — and how to use this bottle",
		intro:
			"Less storytelling, more clarity: serving guidance, what’s in the formula, and how this format is meant to fit a daily routine.",
		items: [
			{
				id: "facts",
				title: "Suggested use",
				body: "Take 3 to 6 drops daily. Take it plain or mix with water or tea. Preferably on an empty stomach, or at least 30 minutes before food. Shake well before use.",
			},
			{
				id: "blend",
				title: "What’s in the formula",
				body: "Premium sun-dried Himalayan shilajit with distilled water in a concentrated liquid drop format. Amounts are listed on the Supplement Facts panel.",
			},
			{
				id: "format",
				title: "Why a liquid drop format",
				body: "Built as an alternative to sticky resin prep — a portable dropper bottle meant to sit on a counter, desk, or bag.",
			},
			{
				id: "made",
				title: "Format & standards",
				body: "Dietary supplement in a 30ml / 1oz dropper bottle. Manufactured as a dietary supplement — not intended to diagnose, treat, cure, or prevent any disease.",
			},
		],
		factsImage: creative(
			"section-extra-3.png",
			"Quality and formula overview for Pure Shilajit Liquid Drops",
		),
	},
	lifestyle: {
		eyebrow: "Everyday vitality",
		title: "Lifestyle & daily ritual",
		intro: "See how a few drops fit into real days — at home, at work, and on the go.",
		cards: [
			{
				id: "routine",
				eyebrow: "Known for",
				title: "Easy daily routine",
				body: "Suggested use: take 3 to 6 drops daily — plain, or mixed with water or tea.",
				points: ["Simple daily format", "Easy to add to your routine", "Shake well before use"],
				image: creative("lifestyle-card-1.png", "Known for easy daily routine — 3–6 drops per day"),
			},
			{
				id: "why",
				eyebrow: "Daily support",
				title: "Why liquid drops matter",
				body: "Pure shilajit in a simple liquid format — designed for easy daily use and mixing with water or tea.",
				points: [
					"Includes pure shilajit in a simple liquid format",
					"Designed for easy daily use",
					"Mixes easily with water or tea",
				],
				image: creative("lifestyle-card-2.png", "Why Shilajit Liquid Drops matter"),
			},
			{
				id: "differently",
				eyebrow: "Doing things differently",
				title: "Simple, natural, easy to stick to",
				body: "A focused liquid ritual meant to make consistency the default.",
				points: ["30ml bottle", "3–6 drops per day", "Portable dropper"],
				image: creative("lifestyle-card-3.png", "Pure Shilajit Liquid Drops lifestyle creative"),
			},
		],
	},
	routine: {
		eyebrow: "3–6 drops • simple routine",
		title: "Easy to keep nearby, simple to add to your day",
		image: creative("section-extra-1.png", "Why Shilajit Liquid Drops matter — lifestyle and product"),
		steps: [
			{
				n: "01",
				title: "Shake well",
				body: "Shake the bottle before each use so the formula is evenly mixed.",
			},
			{
				n: "02",
				title: "3–6 drops",
				body: "Take 3 to 6 drops plain, or mix with water or tea.",
			},
			{
				n: "03",
				title: "Before food (optional)",
				body: "Preferably on an empty stomach, or at least 30 minutes before food.",
			},
			{
				n: "04",
				title: "Consistency wins",
				body: "Daily habits compound — stick with the ritual and our separate 60-day satisfaction guarantee.",
			},
		],
	},
	comparison: {
		title: "How Kaya Pure",
		titleAccent: "is different",
		headers: ["Key feature", "KayaPure liquid drops", "Resin format", "Capsule format"],
		rows: [
			["Format", "Liquid dropper", "Resin", "Capsule"],
			["What’s in this SKU", "Shilajit + distilled water", "Often Shilajit only", "Varies by product"],
			[
				"How you take it",
				"3–6 drops (plain or in liquid)",
				"Typically dissolved or measured",
				"Swallow with water",
			],
			["Prep required", "Shake, then drop", "Often multi-step", "Minimal"],
			["Portability", "30ml dropper bottle", "Varies", "Varies"],
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
				poster: asset("social/clip-1.png", "Customer sharing Kaya Pure experience", 450, 800),
				mp4Url: "/videos/section-video-2.mp4",
			},
			{
				id: "clip-2",
				poster: asset("social/clip-2.png", "Customer sharing wellness routine", 450, 800),
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
			quote: "Easy to take daily and simple to stick to. A convenient drop format that fits into my routine.",
			author: "Customer",
			meta: "Pure Shilajit Liquid Drops",
			visual: creative("section-extra-2.png", "Pure Shilajit Liquid Drops — daily ritual creative"),
		},
	},
	faq: {
		eyebrow: "Frequently asked questions",
		title: "Got questions? We’re here to help.",
		intro: "Backed by our 60-day satisfaction guarantee. Email info@kayapure.com anytime.",
		image: creative(
			"faq-product.png",
			"KayaPure Pure Himalayan Shilajit Liquid Drops bottle with raw resin",
			2000,
			2000,
		),
		asideTitle: "Built around pure Himalayan shilajit",
		asideBody:
			"Every bottle is a focused liquid formula — sun-dried shilajit with distilled water in a 30ml dropper.",
		items: [
			{
				id: "what-is",
				question: "What are Pure Shilajit Liquid Drops?",
				answer:
					"A liquid drop dietary supplement with Himalayan shilajit and distilled water — formulated as a simple addition to a daily wellness routine.",
			},
			{
				id: "how-to-use",
				question: "How should I use it?",
				answer:
					"Suggested use: take 3 to 6 drops daily. Take it plain or mix with water or tea. Preferably on an empty stomach, or at least 30 minutes before food. Shake well before use.",
			},
			{
				id: "sugar",
				question: "Do these drops contain sugar or gelatin?",
				answer:
					"This is a liquid drop formula (not a gummy). Check the Supplement Facts panel on your bottle for full details — including any sweeteners.",
			},
			{
				id: "format",
				question: "How is this different from resin or gummies?",
				answer:
					"Liquid drops are measured with a dropper and can be taken plain or mixed into water or tea — no resin measuring and no chewing required.",
			},
			{
				id: "guarantee",
				question: "What is your 60-day satisfaction guarantee?",
				answer: "If you’re not satisfied, email info@kayapure.com within 60 days and we’ll take care of you.",
			},
		],
	},
	trust: [
		{ title: "Easy daily format", body: "30ml · 3–6 drops / day" },
		{ title: "Pure shilajit formula", body: "Shilajit + distilled water" },
		{ title: "60-day guarantee", body: "info@kayapure.com" },
	],
	finalCta: {
		title: "Ready for a simpler daily ritual?",
		body: "Start your 30ml bottle of Pure Himalayan Shilajit Liquid Drops.",
		buttonLabel: "Add to bag",
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
} as const;
