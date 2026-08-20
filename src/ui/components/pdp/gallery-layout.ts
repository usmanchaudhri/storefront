/**
 * PDP gallery layout — single, developer-owned choice for the whole shop.
 *
 * This is intentionally a build-time constant, not a runtime/per-product
 * decision: a Paper shop has one PDP style. To change the gallery for the
 * entire storefront, flip {@link PDP_GALLERY_LAYOUT} below. Reverting is a
 * one-line change back to `"standard"`.
 *
 * Each layout bundles:
 * - the gallery renderer used by `VariantGalleryDynamic` (the swap, "like the
 *   variant selector renderers"), and
 * - the page-shell classes (container width, grid ratio, sticky behaviour) that
 *   the gallery presentation is coupled to.
 *
 * Keeping both in one place means the shell, the dynamic island, the Suspense
 * fallback, and the skeleton can never disagree about the active layout.
 *
 * Agent note: when asked to make the PDP immersive (wide gallery + sticky buy box), set this to
 * `"immersive"`; to restore the classic split layout, set it to `"standard"`; for
 * an editorial grid where every image is visible at once, set it to `"mosaic"`.
 * All layouts use `container-content` — the same body width as the landing page
 * (home sections use `max-w-7xl` = 80rem) and PLP/cart/search. To make the immersive
 * PDP full-bleed instead, change its `main` to `container-super-wide` (up to 2560px)
 * or `container-full` for true edge-to-edge.
 */
export type PdpGalleryLayout = "standard" | "immersive" | "mosaic";

/** Active gallery layout for the whole storefront. */
export const PDP_GALLERY_LAYOUT: PdpGalleryLayout = "immersive";

export interface PdpLayoutClasses {
	/** `<main>` wrapper. */
	main: string;
	/** Row wrapping the gallery column + info column. */
	grid: string;
	/** Gallery column wrapper. */
	galleryColumn: string;
	/** Product info / buy-box column wrapper. */
	infoColumn: string;
	/**
	 * Where the `ProductAttributes` accordion (description / details / shipping)
	 * renders.
	 * - `"info"`: under the buy box in the info column (classic split layout).
	 * - `"gallery"`: below the images in the wide column, keeping the sticky buy
	 *   box short and above the fold (immersive / on.com style).
	 */
	attributesPlacement: "info" | "gallery";
	/**
	 * When {@link attributesPlacement} is `"gallery"`, classes for the attributes
	 * block as a third grid/flex sibling (not nested in the gallery column).
	 * Mobile: `order-3` keeps description below the buy box; desktop: `lg:row-start-2`
	 * places it under the filmstrip in the wide column.
	 */
	attributesGalleryBlock?: string;
}

/**
 * Immersive hero frame — 1:1 square so typical product uploads (e.g. 2000×2000)
 * fill the gallery column without cropping. Images use `object-contain` + center.
 * Column width is unchanged (~605fr of the MoonBrew grid); only the height matches width.
 */
export const PDP_IMMERSIVE_HERO_FRAME_CLASS = "aspect-square w-full";

/** Space between hero and thumbnail strip on desktop (MoonBrew: 50px). */
export const PDP_IMMERSIVE_HERO_MARGIN_CLASS = "mb-0 lg:mb-[50px]";

/**
 * Max thumbnails that fit in one hero-width row before the strip scrolls.
 * Six 86px tiles use `justify-between` so they span the full hero width.
 */
export const PDP_IMMERSIVE_THUMB_FIT_COUNT = 6;

/** Thumbnail strip base — full hero width; hidden below 1200px (MoonBrew breakpoint). */
export const PDP_IMMERSIVE_THUMB_STRIP_CLASS =
	"scrollbar-hide flex w-full overflow-x-auto overscroll-x-contain py-1 max-[1200px]:hidden";

/** Evenly space ≤{@link PDP_IMMERSIVE_THUMB_FIT_COUNT} thumbs across the hero. */
export const PDP_IMMERSIVE_THUMB_STRIP_FIT_CLASS = "justify-between";

/** Fixed gap + horizontal scroll when there are more than six images. */
export const PDP_IMMERSIVE_THUMB_STRIP_SCROLL_CLASS = "gap-2";

export function immersiveThumbStripClass(imageCount: number): string {
	const fits = imageCount > 0 && imageCount <= PDP_IMMERSIVE_THUMB_FIT_COUNT;
	return [
		PDP_IMMERSIVE_THUMB_STRIP_CLASS,
		fits ? PDP_IMMERSIVE_THUMB_STRIP_FIT_CLASS : PDP_IMMERSIVE_THUMB_STRIP_SCROLL_CLASS,
	].join(" ");
}

/** Dot indicators when the thumbnail strip is hidden (≤1200px). */
export const PDP_IMMERSIVE_MOBILE_DOTS_CLASS = "hidden max-[1200px]:flex justify-center gap-1.5";

/** Sticky offset that clears the (sticky) header with a small gap. */
const STICKY_BELOW_HEADER = "lg:top-[calc(var(--header-height)_+_2rem)]";

export const PDP_LAYOUT_CLASSES: Record<PdpGalleryLayout, PdpLayoutClasses> = {
	standard: {
		main: "container-content flex-1 py-4 sm:py-6 lg:py-10",
		grid: "grid gap-8 lg:grid-cols-2 lg:gap-16",
		galleryColumn: `lg:sticky ${STICKY_BELOW_HEADER} lg:self-start`,
		infoColumn: "flex flex-col gap-3",
		attributesPlacement: "info",
	},
	immersive: {
		// container-content (80rem/1280px) matches the landing page body width
		// (home sections use max-w-7xl = 80rem). Use container-super-wide here for
		// a full-bleed editorial PDP instead.
		main: "container-content flex-1 py-4 sm:py-6",
		// MoonBrew product-v4 grid: 605fr gallery / 540fr buy box, 61px gap, ~1255px inner max
		grid: "flex flex-col gap-8 lg:mx-auto lg:grid lg:max-w-[1255px] lg:grid-cols-[minmax(0,605fr)_minmax(0,540fr)] lg:items-start lg:gap-[61px]",
		galleryColumn: "order-1 min-w-0 lg:col-start-1 lg:row-start-1",
		infoColumn: `order-2 flex flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky ${STICKY_BELOW_HEADER} lg:self-start`,
		attributesPlacement: "gallery",
		attributesGalleryBlock: "order-3 mt-10 min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-12",
	},
	/**
	 * Editorial mosaic: every image tiled in a wide 2-column grid
	 * with a narrow sticky buy box beside it. Uses container-content so PDP
	 * body width matches PLP/cart/search — chrome (nav, footer) can still
	 * be full-bleed via --container-nav. Only immersive breaks out wider.
	 */
	mosaic: {
		main: "container-content flex-1 py-4 sm:py-6 lg:py-10",
		grid: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:items-start lg:gap-12",
		galleryColumn: "min-w-0",
		infoColumn: `flex flex-col gap-3 lg:sticky ${STICKY_BELOW_HEADER} lg:self-start`,
		attributesPlacement: "info",
	},
};
