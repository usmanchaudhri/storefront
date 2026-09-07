/**
 * Footer legal bar (Figma 2435:1192) — disclaimer, copyright, payment badges.
 */

export const footerPaymentMethods = [
	{ id: "amazon", label: "Amazon", src: "/images/payment/amazon.svg" },
	{ id: "amex", label: "American Express", src: "/images/payment/amex.svg" },
	{ id: "apple-pay", label: "Apple Pay", src: "/images/payment/apple-pay.svg" },
	{ id: "diners", label: "Diners Club", src: "/images/payment/diners.svg" },
	{ id: "discover", label: "Discover", src: "/images/payment/discover.svg" },
	{ id: "mastercard", label: "Mastercard", src: "/images/payment/mastercard.svg" },
	{ id: "paypal", label: "PayPal", src: "/images/payment/paypal.svg" },
	{ id: "shop-pay", label: "Shop Pay", src: "/images/payment/shop-pay.svg" },
	{ id: "venmo", label: "Venmo", src: "/images/payment/venmo.svg" },
	{ id: "visa", label: "Visa", src: "/images/payment/visa.svg" },
] as const;

export const footerLegalCopy = {
	privacyChoicesLabel: "Your Privacy Choices",
	privacyChoicesHref: "/privacy",
	disclaimer:
		"*This product is not intended to diagnose, treat, cure or prevent any disease. Results may vary. No results guaranteed. These statements have not been evaluated by the Food and Drug Administration.",
	refundNote: "¹See Refund Policy details",
	refundHref: "/#home-faq-heading",
} as const;

/** Figma 2435:1202 copyright line. */
export function getFooterCopyrightText(year: number): string {
	return `Copyright © - All rights reserved KAYAPURE. ${year}`;
}
