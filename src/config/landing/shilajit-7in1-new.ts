/** Content for the Figma-inspired 7-in-1 Shilajit Gummies conversion landing. */

export const LANDING_SLUG = "7-in-1-shilajit-gummies-new";
/** Real Saleor product used for price / ATC (existing PDP unchanged). */
export const PRODUCT_SLUG = "7-in-1-shilajit-gummies";

const ASSET = "/pdp/7-in-1-shilajit-gummies";
const CREATIVE = `/pdp/${LANDING_SLUG}`;

export type LandingImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

function asset(file: string, alt: string, width: number, height: number): LandingImage {
	return { src: `${ASSET}/${file}`, alt, width, height };
}

function creative(file: string, alt: string): LandingImage {
	return { src: `${CREATIVE}/${file}`, alt, width: 1024, height: 1024 };
}

export const shilajit7in1Landing = {
	brand: "KayaPure",
	productName: "Pure Himalayan Shilajit 7-in-1 Gummies",
	hero: {
		subtitle:
			"Combines pure Shilajit with a 7-in-1 herbal blend in a simple daily gummy — designed for energy, stamina, and an easy wellness ritual.",
		badges: ["Wild Himalayan", "7 synergistic herbs"],
	},
	origin: {
		title: "Wild-harvested Himalayan origin &",
		titleAccent: "7 power botanicals",
		body: "Sourced from high-altitude geological formations and paired with six supportive herbs in a pectin-based gummy — no sticky resin ritual required.",
		stats: [
			{ value: "16,000+", label: "Elevation in feet" },
			{ value: "7", label: "Herbs in one formula" },
			{ value: "100%", label: "Plant pectin base" },
		],
		image: creative(
			"origin-himalayan-performance.webp",
			"Your solution to everyday performance — KayaPure Shilajit 7-in-1 Gummies with Himalayan backdrop",
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
				"Seven botanicals in every serving. Amounts match the Supplement Facts panel: two gummies, 15 servings, 30 gummies per jar.",
			ctaLabel: "Shop 7-in-1 Gummies",
			ingredients: [
				{
					name: "Shilajit",
					dose: "100mg",
					benefit: "Enhances strength, stamina, and focus.",
					image: asset("ingredients/shilajit-circle.png", "Raw Himalayan shilajit resin", 1254, 1254),
				},
				{
					name: "Ashwagandha",
					dose: "100mg",
					benefit: "Reduces stress and supports relaxation.",
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
					benefit: "A traditional botanical for immune-friendly daily support.",
					image: asset("ingredients/black-seed.png", "Black seed in a wooden bowl", 1022, 1024),
				},
				{
					name: "Ginger",
					dose: "100mg",
					benefit: "Supports digestion and antioxidant balance.",
					image: asset("ingredients/ginger.png", "Fresh ginger root and slices", 1024, 1024),
				},
				{
					name: "Black Pepper",
					dose: "10mg",
					benefit: "Supports digestion and metabolism.",
					image: asset("ingredients/black-pepper.png", "Black peppercorns with a wooden scoop", 1024, 1024),
				},
				{
					name: "Tongkat Ali",
					dose: "100mg",
					benefit: "Stamina and vitality support, paired with maca in the formula.",
					image: asset("ingredients/tongkat-ali.png", "Tongkat Ali roots", 1024, 1022),
				},
				{
					name: "Maca Root",
					dose: "100mg",
					benefit: "Natural energy for daily performance, paired with Tongkat Ali.",
					image: asset("ingredients/maca.png", "Maca roots and maca powder", 1024, 1024),
				},
			],
		},
		cleanBar: "100% pectin-based • Only 3g cane sugar per serving • Zero gelatin • Gluten-free",
		pills: ["Non-GMO", "Vegan friendly", "Halal-friendly"],
	},
	lifestyle: {
		eyebrow: "Unlocking everyday vitality",
		title: "Lifestyle & everyday performance",
		intro: "See how a 2-gummy ritual fits into real days — at home, at work, and on the go.",
		cards: [
			{
				id: "benefits",
				eyebrow: "Targeted benefits",
				title: "Everyday performance",
				body: "Built for a simple daily habit: natural energy support, stress-friendly adaptogens, and a convenient chewable format.",
				points: ["Natural energy support", "Stress-friendly botanicals", "Easy daily habit"],
				image: creative(
					"better-daily-support.webp",
					"Better daily support with Shilajit — vegan, Halal and gluten-free",
				),
			},
			{
				id: "ritual",
				eyebrow: "Adaptogenic ritual",
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
				body: "60 gummies = 30-day supply at 2 gummies a day. Designed to make consistency the default.",
				points: ["2 gummies / day", "30-day supply", "Plant pectin base"],
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
				body: "Adaptogenic habits build with daily use — stick with the 30-day supply.",
			},
		],
	},
	comparison: {
		eyebrow: "Clear differentiation",
		title: "How KayaPure is different",
		intro: "An objective look at format, blend, and daily convenience.",
		headers: ["Key feature", "KayaPure 7-in-1", "Traditional resin", "Standard capsules"],
		rows: [
			["Format", "Delicious pectin gummy", "Sticky bitter resin", "Dry powder capsule"],
			["7 botanicals in 1", "Yes — synergistic blend", "Usually Shilajit only", "Often single ingredient"],
			["Preparation", "Chew & go", "Often needs hot water", "Swallow with water"],
			["Sugar", "Only 3g cane sugar", "Zero (but hard to take)", "Fillers vary"],
			["Black pepper", "Included in the blend", "Unassisted", "Varies"],
			["60-day guarantee", "Included", "Rarely offered", "Rarely offered"],
		],
	},
	social: {
		eyebrow: "Community reactions",
		title: "Real daily rituals. Real results.",
		rating: "4.9",
		ratingLabel: "Based on KayaPure customer experiences",
		clips: [
			{
				id: "clip-1",
				poster: asset("social/clip-1.png", "Customer sharing Kaya Pure gummy experience", 450, 800),
				mp4Url: "/videos/section-video-2.mp4",
			},
			{
				id: "clip-2",
				poster: asset("social/clip-2.png", "Customer sharing stress relief gummy routine", 450, 800),
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
			author: "Verified customer",
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
		asideTitle: "Authentic Ayurvedic standards",
		asideBody: "Every jar is built around Himalayan Shilajit plus a multi-herb botanical blend.",
		items: [
			{
				id: "what-is",
				question: "What is KayaPure 7-in-1 Shilajit Gummies?",
				answer:
					"A convenient pectin gummy format built around Himalayan Shilajit and six supportive botanicals: ashwagandha, tongkat ali, maca root, black seed, ginger, and black pepper.",
			},
			{
				id: "how-to-use",
				question: "How should I use it?",
				answer: "Suggested use: chew 2 gummies once a day. 60 gummies equals a 30-day supply.",
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
		{ title: "Easy daily format", body: "2 gummies • 30-day supply" },
		{ title: "7-in-1 herbal blend", body: "Shilajit + 6 botanicals" },
		{ title: "60-day guarantee", body: "info@kayapure.com" },
	],
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
} as const;
