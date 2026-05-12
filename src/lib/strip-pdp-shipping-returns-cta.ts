/**
 * Removes common "Shipping & Returns" (or "Shipping and Returns") CTAs from
 * product description HTML emitted by Saleor / Editor.js — often an `<a>` or
 * `<button>` in the hero copy, not a storefront component.
 */
const paragraphWithCtaLink =
	/<p[^>]*>\s*<a\b[^>]*href=["'][^"']*["'][^>]*>[\s\S]*?Shipping\s*(?:&|&amp;|and)\s*Returns[\s\S]*?<\/a>\s*<\/p>/gi;

const ctaAnchor = /<a\b[^>]*>[\s\S]*?Shipping\s*(?:&|&amp;|and)\s*Returns[\s\S]*?<\/a>/gi;

const ctaButton = /<button\b[^>]*>[\s\S]*?Shipping\s*(?:&|&amp;|and)\s*Returns[\s\S]*?<\/button>/gi;

export function stripShippingReturnsCtaFromHtml(html: string): string {
	let s = html;
	s = s.replace(paragraphWithCtaLink, "");
	s = s.replace(ctaAnchor, "");
	s = s.replace(ctaButton, "");
	return s.trim();
}
