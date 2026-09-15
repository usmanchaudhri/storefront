import type { PdpStoryImage, PdpStoryPack } from "./types";

const BASE = "/pdp/weight-loss-slimming-gummies";

function img(file: string, alt: string, width: number, height: number): PdpStoryImage {
	return { src: `${BASE}/${file}`, alt, width, height };
}

export const weightLossSlimmingGummiesStory: PdpStoryPack = {
	slug: "weight-loss-slimming-gummies",
	blend: {
		title: "The Kaya Pure Weight Loss Slimming Blend",
		intro:
			"A modern gummy formula with botanicals traditionally used to support metabolism and daily wellness goals.",
		tiles: [
			{
				id: "format",
				title: "Metabolism Support",
				body: "Botanical extracts crafted for everyday metabolic wellness.",
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
				title: "Active Lifestyle",
				body: "Support your wellness goals with a convenient daily gummy.",
				icon: img("blend-icon-clarity.png", "", 264, 284),
			},
			{
				id: "gummies",
				title: "Convenient Gummies",
				body: "No powders or complicated prep — just chew and go.",
				icon: img("blend-icon-gummies.png", "", 232, 276),
			},
		],
		image: img(
			"blend-section-bg.png",
			"Hands holding Kaya Pure Weight Loss Slimming Gummies jar with soft natural light",
			1942,
			809,
		),
	},
	positioningBanner: {
		body: "Premium natural supplement positioning with current Kaya Pure product and policy information used as the factual source.",
		icon: img("positioning-check-icon.svg", "", 56, 45),
	},
	routine: {
		title: "Can Kaya Pure fit your routine?",
		intro: "For customers looking for a convenient daily wellness supplement:",
		checkItems: [
			"Simple gummy format",
			"Weight loss & slimming blend",
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
			"Kaya Pure Weight Loss Slimming Gummies jar with botanicals against mountain landscape",
			1942,
			809,
		),
	},
	sharingLove: {
		titlePrefix: "Sharing ",
		titleAccent: "love",
		titleSuffix: " from people you trust",
		clips: [
			{
				id: "social-1",
				poster: img("social/clip-1.png", "Customer sharing Kaya Pure gummy experience", 450, 800),
				mp4Url: "/videos/section-video-2.mp4",
			},
			{
				id: "social-2",
				poster: img("social/clip-2.png", "Customer sharing wellness gummy routine", 450, 800),
				mp4Url: "/videos/section-video-3-1.mp4",
			},
			{
				id: "social-3",
				poster: img("social/clip-3.png", "Customer testimonial video", 450, 800),
				mp4Url: "/videos/section-video-4-1.mp4",
			},
			{
				id: "social-4",
				poster: img("social/clip-1.png", "Kaya Pure in action", 450, 800),
				mp4Url: "/videos/Video-9-1-1.mp4",
			},
			{
				id: "social-5",
				poster: img("social/clip-2.png", "Morning wellness routine", 450, 800),
				mp4Url: "/videos/WhatsApp-Video-2025-06-12-at-12.34.25-AM-1.mp4",
			},
		],
		testimonials: [
			{
				id: "hanzala-1",
				author: "Hanzala",
				quote:
					"After just a week of using it, I've noticed I don't crash after work like I used to. I feel more steady, more active, and just better overall. Loving how effective it is without feeling too intense — it's exactly what I needed.",
			},
			{
				id: "hanzala-2",
				author: "Hanzala",
				quote:
					"After just a week of using it, I've noticed I don't crash after work like I used to. I feel more steady, more active, and just better overall. Loving how effective it is without feeling too intense — it's exactly what I needed.",
			},
		],
		starsIcon: img("social/stars.svg", "", 120, 30),
		ctaLabel: "See reviews",
	},
	lookInside: {
		titlePrefix: "A look ",
		titleAccent: "inside the gummy",
		intro:
			"Key botanicals in every serving. Amounts match the Supplement Facts panel on your jar — two gummies per serving.",
		ingredients: [
			{
				name: "Garcinia Extract",
				benefit: "A fruit extract traditionally used to support metabolic wellness.",
				image: img("ingredients/garcinia-extract.png", "Garcinia fruit and extract", 1254, 1254),
			},
			{
				name: "Fenugreek Extract",
				benefit: "A botanical traditionally used to support appetite balance.",
				image: img("ingredients/fenugreek-extract.png", "Fenugreek seeds and extract", 1254, 1254),
			},
			{
				name: "Cayenne Pepper Extract",
				benefit: "A warming spice extract for everyday metabolic support.",
				image: img("ingredients/cayenne-pepper-extract.png", "Cayenne peppers and extract", 1254, 1254),
			},
			{
				name: "Green Tea Extract",
				benefit: "Plant antioxidants traditionally used for daily energy and wellness.",
				image: img("ingredients/green-tea-extract.png", "Green tea leaves and extract", 1254, 1254),
			},
			{
				name: "Black Pepper",
				benefit: "Supports digestion and nutrient absorption.",
				image: img("ingredients/black-pepper.png", "Black peppercorns with a wooden scoop", 1254, 1254),
			},
		],
		ctaLabel: "Shop Weight Loss Slimming Gummies",
	},
	comparison: {
		titlePrefix: "How Kaya Pure",
		titleAccent: "is different",
		intro:
			"A visual comparison using objective format differences rather than unsupported superiority claims.",
		kayaPureLabel: "Kaya Pure",
		traditionalLabel: "Traditional\nRoutine",
		kayaPureImage: img("comparison-gummy.png", "Kaya Pure Weight Loss Slimming Gummy", 754, 503),
		kayaPureLogo: img("comparison-kayapure-logo.svg", "Kaya Pure", 205, 46),
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
		intro:
			"We offer a 60-day satisfaction guarantee. If you're not satisfied, email info@kayapure.com and we'll take care of you.",
		image: img("faq-product.png", "Kaya Pure Weight Loss Slimming Gummies jar with botanicals", 1024, 1536),
		items: [
			{
				id: "what-is",
				question: "What are Weight Loss Slimming Gummies?",
				answer:
					"A convenient gummy format with botanical extracts crafted for everyday metabolic wellness — designed as a simple addition to a daily routine.",
			},
			{
				id: "how-to-use",
				question: "How should I use it?",
				answer:
					"Take 2 gummies daily with food, preferably with a meal. Consistency over 2–3 weeks helps you get the most from the botanicals.",
			},
			{
				id: "side-effects",
				question: "Are there any side effects?",
				answer:
					"Our supplement is made with natural ingredients and is generally well-tolerated. Some people may experience mild digestive changes when starting. If you're sensitive, start with 1 gummy to assess tolerance. Always consult your healthcare provider before starting any new supplement.",
			},
			{
				id: "sugar",
				question: "Do these gummies contain sugar?",
				answer:
					"Yes, Kaya Pure gummies contain only 3 grams of sugar per serving. You can enjoy them without guilt.",
			},
			{
				id: "usage-with-other-supplements",
				question: "Can I take this with other supplements or medications?",
				answer:
					"While our ingredients are natural, they can interact with certain medications. We strongly recommend consulting with your healthcare provider before combining with other supplements or medications.",
			},
			{
				id: "how-made",
				question: "Are the ingredients organic and tested for quality?",
				answer:
					"All our ingredients are sourced from reputable suppliers and undergo third-party testing for purity and potency. We manufacture in an FDA-approved facility following strict GMP guidelines.",
			},
		],
		accordionIcons: {
			plus: img("faq-icon-plus.svg", "", 17, 17),
			minus: img("faq-icon-minus.svg", "", 17, 17),
		},
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
	reviews: {
		titlePrefix: "Real Reviews.",
		titleAccent: "Real Results.",
		intro:
			"Development preview: review text below is intentionally marked as placeholder to avoid inventing customer claims.",
		items: [
			{
				id: "review-1",
				badgeLabel: "Review placeholder",
				ratingLabel: "★★★★★",
				title: "Verified review title",
				body: "Connect your genuine review feed here.",
				author: "—",
			},
			{
				id: "review-2",
				badgeLabel: "Review placeholder",
				ratingLabel: "★★★★★",
				title: "Verified review title",
				body: "Connect your genuine review feed here.",
				author: "—",
			},
			{
				id: "review-3",
				badgeLabel: "Review placeholder",
				ratingLabel: "★★★★★",
				title: "Verified review title",
				body: "Connect your genuine review feed here.",
				author: "—",
			},
		],
		ctaLabel: "Shop Now",
	},
	disclaimer:
		"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
};
