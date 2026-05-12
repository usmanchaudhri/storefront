/**
 * PDP layout hooks driven by Saleor product attributes.
 *
 * Create a **Product** attribute (e.g. File or URL) and attach it to your product type.
 * Default attribute slug: `pdp_banner_image_url`. Override via
 * `NEXT_PUBLIC_PDP_BANNER_ATTRIBUTE_SLUG` in the storefront `.env`.
 *
 * - **File** attribute: uses `values[0].file.url`.
 * - **URL / short text** attributes: uses `values[0].value` or `values[0].name` when it looks like a URL.
 *
 * **Package / add-to-cart block** (optional product attributes):
 * - `pdp_package_section_title` — heading for the package step (default "Choose Your Package"); only shown when `pdp_bundle_display` is on.
 * - `pdp_package_unit_label` — `singular|plural` for tier rows (e.g. `bottle|bottles`, `jar|jars`).
 * - `pdp_package_selection_mode` — `package_tiers` (default) or `simple_quantity` (no tier cards; quantity only).
 * - `pdp_package_tiers` — bundle rows (see `parsePackageTiersAttributeValue`); if missing/invalid, storefront uses 1/3/5 defaults.
 * - `pdp_bundle_display` — truthy = show package step (title + tier cards in a 1/2/3-column responsive grid by tier count); `off` / omit = hide.
 * Override title slug with `NEXT_PUBLIC_PDP_PACKAGE_TITLE_ATTRIBUTE_SLUG`.
 */

import type { ProductDetailsQuery } from "@/gql/graphql";

const DEFAULT_BANNER_SLUGS = ["pdp_banner_image_url"] as const;

export function getPdpBottomBannerAttributeSlugs(): string[] {
	const fromEnv = process.env.NEXT_PUBLIC_PDP_BANNER_ATTRIBUTE_SLUG?.trim();
	if (fromEnv) {
		return [fromEnv.toLowerCase()];
	}
	return [...DEFAULT_BANNER_SLUGS];
}

export interface PdpBottomBanner {
	url: string;
	alt: string;
}

// ---------------------------------------------------------------------------
// Package / add-to-cart section ("Choose your …")
// ---------------------------------------------------------------------------

/** Plain text — heading above package options (e.g. "Choose Your Package", "Select serving size"). */
const DEFAULT_PACKAGE_TITLE_SLUG = "pdp_package_section_title";

/**
 * Plain text — unit label for tier rows. Use `singular|plural` (e.g. `bottle|bottles`).
 * Single word applies to both.
 */
const DEFAULT_PACKAGE_UNIT_SLUG = "pdp_package_unit_label";

/**
 * Plain text — how options are shown: `package_tiers` (1/3/5 style bundles) or `simple_quantity`
 * (quantity stepper only, no tier cards).
 */
const DEFAULT_PACKAGE_MODE_SLUG = "pdp_package_selection_mode";

/**
 * Plain or long text — bundle tier definitions. See {@link parsePackageTiersAttributeValue}.
 */
const DEFAULT_PACKAGE_TIERS_SLUG = "pdp_package_tiers";

/** Plain text / dropdown — when set to a truthy value, show "Choose Your Package" + tiers; otherwise hide. */
const PDP_BUNDLE_DISPLAY_SLUG = "pdp_bundle_display";

export type PdpPackageSelectionMode = "package_tiers" | "simple_quantity";

/** One selectable bundle row (units × single-SKU price, with optional bundle discount). */
export interface PdpPackageTier {
	id: string;
	units: number;
	discountRate: number;
	badge: string | null;
}

export interface PdpPackageSectionConfig {
	/** True only when `pdp_bundle_display` is set to a truthy value (not off/false/no). */
	showBundleSection: boolean;
	sectionTitle: string;
	unitSingular: string;
	unitPlural: string;
	mode: PdpPackageSelectionMode;
	/** Effective tiers for `package_tiers` UI (never empty; defaults if attribute missing). */
	packageTiers: PdpPackageTier[];
}

export function getPdpPackageTitleAttributeSlug(): string {
	const fromEnv = process.env.NEXT_PUBLIC_PDP_PACKAGE_TITLE_ATTRIBUTE_SLUG?.trim();
	return (fromEnv || DEFAULT_PACKAGE_TITLE_SLUG).toLowerCase();
}

export function getPdpPackageConfigAttributeSlugs(): string[] {
	return [
		getPdpPackageTitleAttributeSlug(),
		DEFAULT_PACKAGE_UNIT_SLUG,
		DEFAULT_PACKAGE_MODE_SLUG,
		DEFAULT_PACKAGE_TIERS_SLUG,
		PDP_BUNDLE_DISPLAY_SLUG,
	];
}

const PDP_BUNDLE_DISPLAY_OFF = new Set(["off", "false", "no", "0", "none", "hidden"]);

/** Whether `pdp_bundle_display` enables the package UI (must be set and not an explicit “off” value). */
export function isPdpBundleDisplayEnabledFromValue(raw: string | null | undefined): boolean {
	if (raw === null || raw === undefined) return false;
	const t = raw.trim();
	if (!t) return false;
	if (PDP_BUNDLE_DISPLAY_OFF.has(t.toLowerCase())) return false;
	return true;
}

/** Used when `pdp_package_tiers` is absent or fails to parse (1 / 3 / 5 bottles). */
export const DEFAULT_PACKAGE_TIERS_FALLBACK: PdpPackageTier[] = [
	{ id: "tier-0", units: 1, discountRate: 0, badge: null },
	{ id: "tier-1", units: 3, discountRate: 0.05, badge: "Most Popular" },
	{ id: "tier-2", units: 5, discountRate: 0.1, badge: null },
];

/**
 * Parses bundle tier definitions from a product attribute.
 *
 * **Line format** (one tier per line, `|` separated):
 * ```
 * 1|0
 * 3|0.05|Most Popular
 * 5|0.1
 * ```
 * - Column 1: unit count (integer ≥ 1)
 * - Column 2: discount as decimal 0–1 (e.g. `0.05` = 5%), or percent 2–100 (e.g. `5` = 5%)
 * - Column 3+: optional badge label
 *
 * **JSON format** (alternative): `[{"units":1,"discount":0},{"units":3,"discount":0.05,"badge":"Most Popular"}]`
 * (`discountRate` accepted instead of `discount`.)
 */
export function parsePackageTiersAttributeValue(raw: string | null | undefined): PdpPackageTier[] | null {
	if (!raw?.trim()) return null;
	const s = raw.trim();

	if (s.startsWith("[")) {
		try {
			const parsed = JSON.parse(s) as unknown;
			if (!Array.isArray(parsed) || parsed.length === 0) return null;
			const tiers: PdpPackageTier[] = [];
			for (let i = 0; i < parsed.length; i++) {
				const row = parsed[i];
				if (!row || typeof row !== "object") continue;
				const o = row as Record<string, unknown>;
				const u = Number(o.units);
				const dr = o.discount ?? o.discountRate;
				const rate = normalizeDiscountRate(dr);
				const badge = typeof o.badge === "string" && o.badge.trim() ? o.badge.trim() : null;
				if (!Number.isFinite(u) || u < 1) continue;
				tiers.push({
					id: `tier-${i}`,
					units: Math.floor(u),
					discountRate: rate,
					badge,
				});
			}
			return tiers.length > 0 ? tiers : null;
		} catch {
			return null;
		}
	}

	const lines = s
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter(Boolean);
	const tiers: PdpPackageTier[] = [];
	for (let i = 0; i < lines.length; i++) {
		const parts = lines[i]!.split("|").map((p) => p.trim());
		const units = Number.parseInt(parts[0] ?? "", 10);
		const discountRaw = parts[1] !== undefined && parts[1] !== "" ? Number.parseFloat(parts[1]!) : 0;
		const rate = normalizeDiscountRate(discountRaw);
		const badgeRest = parts.slice(2).join("|").trim();
		const badge = badgeRest.length > 0 ? badgeRest : null;
		if (!Number.isFinite(units) || units < 1) continue;
		tiers.push({ id: `tier-${i}`, units, discountRate: rate, badge });
	}
	return tiers.length > 0 ? tiers : null;
}

function normalizeDiscountRate(n: unknown): number {
	if (n === undefined || n === null || n === "") return 0;
	const x = typeof n === "number" ? n : Number.parseFloat(String(n));
	if (!Number.isFinite(x) || x < 0) return 0;
	if (x > 1 && x <= 100) return Math.min(1, x / 100);
	return Math.min(1, x);
}

export function extractPdpPackageSectionConfig(
	product: NonNullable<ProductDetailsQuery["product"]>,
): PdpPackageSectionConfig {
	const bundleDisplayAttr = findProductAttributeBySlug(product, PDP_BUNDLE_DISPLAY_SLUG);
	const showBundleSection = isPdpBundleDisplayEnabledFromValue(getFirstAttributeTextValue(bundleDisplayAttr));

	const titleSlug = getPdpPackageTitleAttributeSlug();
	const titleAttr = findProductAttributeBySlug(product, titleSlug);
	const unitAttr = findProductAttributeBySlug(product, DEFAULT_PACKAGE_UNIT_SLUG);
	const modeAttr = findProductAttributeBySlug(product, DEFAULT_PACKAGE_MODE_SLUG);
	const tiersAttr = findProductAttributeBySlug(product, DEFAULT_PACKAGE_TIERS_SLUG);

	const sectionTitle = getFirstAttributeTextValue(titleAttr)?.trim() || "Choose Your Package";

	const { singular: unitSingular, plural: unitPlural } = parseUnitLabels(
		getFirstAttributeTextValue(unitAttr),
	);

	const mode = parsePackageSelectionMode(getFirstAttributeTextValue(modeAttr));

	const parsed = parsePackageTiersAttributeValue(getFirstAttributeTextValue(tiersAttr));
	const packageTiers = parsed && parsed.length > 0 ? parsed : DEFAULT_PACKAGE_TIERS_FALLBACK;

	return {
		showBundleSection,
		sectionTitle,
		unitSingular,
		unitPlural,
		mode,
		packageTiers,
	};
}

function findProductAttributeBySlug(product: NonNullable<ProductDetailsQuery["product"]>, slug: string) {
	const lower = slug.toLowerCase();
	return (product.attributes || []).find((a) => (a.attribute.slug ?? "").toLowerCase() === lower);
}

function getFirstAttributeTextValue(
	attr: NonNullable<ProductDetailsQuery["product"]>["attributes"][number] | undefined,
): string | null {
	const v = attr?.values?.[0];
	const raw = v?.value?.trim() || v?.name?.trim();
	return raw || null;
}

function parseUnitLabels(raw: string | null): { singular: string; plural: string } {
	const fallback = { singular: "bottle", plural: "bottles" };
	if (!raw) return fallback;
	const parts = raw
		.split("|")
		.map((p) => p.trim())
		.filter(Boolean);
	if (parts.length >= 2) {
		return { singular: parts[0]!, plural: parts[1]! };
	}
	if (parts.length === 1) {
		const w = parts[0]!;
		return { singular: w, plural: w };
	}
	return fallback;
}

function parsePackageSelectionMode(raw: string | null): PdpPackageSelectionMode {
	if (!raw) return "package_tiers";
	const n = raw.trim().toLowerCase();
	if (n === "simple_quantity" || n === "simple" || n === "quantity_only" || n === "quantity") {
		return "simple_quantity";
	}
	return "package_tiers";
}
