/** Normalized storefront marketing copy — provider-agnostic contract (v1). */
export const STOREFRONT_CONTENT_VERSION = 1 as const;

export type ShippingPolicy = {
	freeShippingThreshold: number | null;
};

export type ReturnsPolicy = {
	windowDays: number;
};

export type StorefrontPolicies = {
	shipping: ShippingPolicy;
	returns: ReturnsPolicy;
};

export type CartTrustContent = {
	freeShippingPrefix: string;
	returnsLabel: string;
};

export type CartContent = {
	trust: CartTrustContent;
};

export type CheckoutTrustContent = {
	secureCheckout: string;
	stripeProcessor: string;
};

export type CheckoutContent = {
	trust: CheckoutTrustContent;
};

export type HomepageHeroContent = {
	eyebrow?: string;
	heading: string;
	subheading: string;
	primaryCtaLabel: string;
	backgroundImage?: string | null;
};

export type HomepageFeaturedCollectionContent = {
	heading: string;
	intro?: string;
	collectionSlug: string;
	limit: number;
};

export type HomepageContent = {
	hero: HomepageHeroContent;
	featuredCollection: HomepageFeaturedCollectionContent;
};

export type StorefrontSurfaces = {
	homepage: HomepageContent;
	cart: CartContent;
	checkout: CheckoutContent;
};

export type StorefrontContent = {
	version: typeof STOREFRONT_CONTENT_VERSION;
	policies: StorefrontPolicies;
	surfaces: StorefrontSurfaces;
};

export type StorefrontContentRequest = {
	channel: string;
};

export type ContentProviderId = "code";
