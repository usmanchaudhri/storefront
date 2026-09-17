import type { CSSProperties } from "react";

/** Shared accent tokens for home hero HTML overlays (Figma text groups). */
export const HOME_HERO_OVERLAY_ACCENT = "#f3bf8e";
export const HOME_HERO_OVERLAY_CTA_TEXT = "#073b3d";

/**
 * Mobile overlay sizes — shared across all hero banners so responsive typography
 * and infographics match (tuned from Shilajit gummies mobile / Figma 2814:739+).
 */
export const homeHeroMobileOverlayStyles = {
	shell: {
		className:
			"pointer-events-none absolute inset-0 z-[1] flex flex-col justify-end text-white bg-gradient-to-t from-[#052a27]/95 via-[#052a27]/55 to-transparent px-5 pb-10 pt-16",
	},
	eyebrow: {
		color: HOME_HERO_OVERLAY_ACCENT,
		fontSize: "clamp(0.9rem, 4vw, 1.125rem)",
		letterSpacing: "0.22em",
		lineHeight: 1.2,
	} satisfies CSSProperties,
	title: {
		marginTop: "0.6rem",
		fontSize: "clamp(2.35rem, 11vw, 3.75rem)",
		lineHeight: 0.96,
		letterSpacing: "0.005em",
	} satisfies CSSProperties,
	rule: {
		marginTop: "0.95rem",
		width: "3.25rem",
		height: "0.2rem",
		backgroundColor: HOME_HERO_OVERLAY_ACCENT,
	} satisfies CSSProperties,
	sub: {
		marginTop: "0.9rem",
		fontSize: "clamp(1.125rem, 4.8vw, 1.375rem)",
		lineHeight: 1.35,
		maxWidth: "24rem",
	} satisfies CSSProperties,
	benefitsList: {
		marginTop: "1.35rem",
		width: "100%",
		maxWidth: "24rem",
	} satisfies CSSProperties,
	benefitIcon: {
		width: "clamp(3.25rem, 14vw, 4.25rem)",
		height: "clamp(3.25rem, 14vw, 4.25rem)",
		borderWidth: "2.5px",
		borderColor: HOME_HERO_OVERLAY_ACCENT,
	} satisfies CSSProperties,
	benefitLabel: {
		marginTop: "0.5rem",
		fontSize: "clamp(0.75rem, 3.2vw, 0.9rem)",
		lineHeight: 1.2,
	} satisfies CSSProperties,
	cta: {
		marginTop: "1.4rem",
		width: "min(100%, 14rem)",
		height: "3.15rem",
		borderRadius: "0.6rem",
		paddingInline: "1.2rem",
		backgroundColor: HOME_HERO_OVERLAY_ACCENT,
		color: HOME_HERO_OVERLAY_CTA_TEXT,
		letterSpacing: "0.09em",
		fontSize: "clamp(0.9rem, 3.8vw, 1.05rem)",
	} satisfies CSSProperties,
} as const;

export type HomeHeroOverlayVariant = "responsive" | "mobile" | "desktop";
