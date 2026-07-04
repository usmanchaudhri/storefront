import { brandConfig } from "@/config/brand";
import { STOREFRONT_CONTENT_VERSION, type StorefrontContent } from "@/lib/content/types";

const heroBackgroundImage = process.env.NEXT_PUBLIC_HOME_HERO_IMAGE_URL?.trim() || null;

/**
 * Code fallback for storefront marketing copy.
 * Homepage hero pulls from brandConfig; override via env `NEXT_PUBLIC_HOME_HERO_IMAGE_URL`.
 */
export const defaultStorefrontContent = {
	version: STOREFRONT_CONTENT_VERSION,
	policies: {
		shipping: {
			freeShippingThreshold: 75,
		},
		returns: {
			windowDays: 30,
		},
	},
	surfaces: {
		homepage: {
			hero: {
				eyebrow: brandConfig.homeHero.eyebrow,
				heading: brandConfig.homeHero.title,
				subheading: brandConfig.homeHero.subtitle,
				primaryCtaLabel: brandConfig.homeHero.ctaLabel,
				backgroundImage: heroBackgroundImage,
			},
			featuredCollection: {
				heading: "Fuel your day, your way",
				intro: "Shop gummies, shots, and drops crafted with Himalayan shilajit",
				collectionSlug: "featured-products",
				limit: 8,
			},
		},
		cart: {
			trust: {
				freeShippingPrefix: "Free delivery over",
				returnsLabel: "{returnsWindowDays}-day returns",
			},
		},
		checkout: {
			trust: {
				secureCheckout: "Secure checkout",
				stripeProcessor: "Payments processed by Stripe",
			},
		},
	},
} satisfies StorefrontContent;
