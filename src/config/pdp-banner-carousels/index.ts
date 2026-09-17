import { blueberryCompleteShotBanners } from "./blueberry-complete-shot";
import type { PdpStoryImage } from "@/config/pdp-stories";

export type { PdpStoryImage };

export type PdpBannerPack = {
	lifestyleBanner?: PdpStoryImage;
	carousel: readonly PdpStoryImage[];
};

const PDP_BANNER_PACKS: Record<string, PdpBannerPack> = {
	"blueberry-complete-shot": blueberryCompleteShotBanners,
};

export function getPdpBannerPack(slug: string): PdpBannerPack | null {
	const key = decodeURIComponent(slug).trim().toLowerCase();
	return PDP_BANNER_PACKS[key] ?? null;
}
