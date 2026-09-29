/**
 * Display helpers for Figma-styled size / bundle option cards.
 * Maps known Saleor option names to subtitles and badges from the PDP mockups.
 */

export type SizeOptionDisplay = {
	subtitle?: string;
	badge?: string;
};

export type BundleOptionDisplay = {
	subtitle?: string;
	badge?: string;
	badgeTone?: "green" | "gold";
};

/** Header aside for the Size attribute row. */
export const SIZE_ASIDE_LABEL = "30-Day Supply";

/** Header aside for the Bundle attribute row. */
export const BUNDLE_ASIDE_LABEL = "Free US Shipping";

export function isBundleAttribute(slug: string): boolean {
	const s = slug.toLowerCase();
	return s === "bundle" || s === "pack" || s === "pack-size" || s.includes("bundle");
}

/** Size-like attributes including product-specific slugs (e.g. gummy-size). */
export function isSizeLikeAttribute(slug: string): boolean {
	const s = slug.toLowerCase();
	return (
		s === "size" || s === "shoe-size" || s === "clothing-size" || s === "gummy-size" || s.endsWith("-size")
	);
}

export function getSizeOptionDisplay(name: string): SizeOptionDisplay {
	const n = name.trim().toLowerCase();
	if (/\b30\s*gumm/.test(n)) {
		return { subtitle: "Trial Jar" };
	}
	if (/\b60\s*gumm/.test(n)) {
		return { subtitle: "Full 30-Day Ritual", badge: "Standard" };
	}
	return {};
}

export function parseBottleCount(name: string): number | null {
	const match = name.match(/(\d+)\s*bottles?\b/i);
	if (!match) return null;
	const n = Number.parseInt(match[1]!, 10);
	return Number.isFinite(n) && n > 0 ? n : null;
}

export function getBundleOptionDisplay(
	name: string,
	price?: { amount: number; currency: string },
	priceUndiscounted?: { amount: number; currency: string },
	formatMoneyFn?: (amount: number, currency: string) => string,
): BundleOptionDisplay {
	const bottles = parseBottleCount(name);
	const format = formatMoneyFn ?? ((amount: number) => `$${amount.toFixed(2)}`);

	if (bottles === 1) {
		return { subtitle: "Standard daily maintenance" };
	}

	if (bottles === 2) {
		const perBottle = price && bottles > 0 ? format(price.amount / bottles, price.currency) : null;
		return {
			badge: "Most Popular",
			badgeTone: "green",
			subtitle: perBottle ? `${perBottle} / bottle • Free Shipping` : "Free Shipping",
		};
	}

	if (bottles != null && bottles >= 3) {
		const perBottle = price && bottles > 0 ? format(price.amount / bottles, price.currency) : null;
		const savePct =
			price && priceUndiscounted && priceUndiscounted.amount > price.amount
				? Math.round((1 - price.amount / priceUndiscounted.amount) * 100)
				: null;
		const savePart = savePct && savePct > 0 ? `Save ${savePct}% Extra` : null;
		const parts = [perBottle ? `${perBottle} / bottle` : null, savePart].filter(Boolean);
		return {
			badge: "Best Value",
			badgeTone: "gold",
			subtitle: parts.length > 0 ? parts.join(" • ") : undefined,
		};
	}

	return {};
}
