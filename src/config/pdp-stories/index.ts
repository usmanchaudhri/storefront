import { shilajitGummiesStory } from "./7-in-1-shilajit-gummies";
import { appleCiderAshwagandhaGummiesStory } from "./apple-cider-ashwagandha-gummies";
import { digestiveGummiesStory } from "./digestive-gummies";
import { weightLossSlimmingGummiesStory } from "./weight-loss-slimming-gummies";
import { pureShilajitLiquidDropsStory } from "./pure-shilajit-liquid-drops";
import type { PdpStoryPack } from "./types";

export type { PdpStoryPack, PdpStoryImage } from "./types";
export {
	shilajitGummiesStory,
	appleCiderAshwagandhaGummiesStory,
	digestiveGummiesStory,
	weightLossSlimmingGummiesStory,
	pureShilajitLiquidDropsStory,
};

const PDP_STORIES: Record<string, PdpStoryPack> = {
	[shilajitGummiesStory.slug]: shilajitGummiesStory,
	[appleCiderAshwagandhaGummiesStory.slug]: appleCiderAshwagandhaGummiesStory,
	[digestiveGummiesStory.slug]: digestiveGummiesStory,
	[weightLossSlimmingGummiesStory.slug]: weightLossSlimmingGummiesStory,
	[pureShilajitLiquidDropsStory.slug]: pureShilajitLiquidDropsStory,
};

/** Homepage and older links may still use these slugs. */
const SLUG_ALIASES: Record<string, string> = {
	"energy-boost-pro": shilajitGummiesStory.slug,
	"shilajit-liquid-drops": pureShilajitLiquidDropsStory.slug,
};

export function getPdpStory(slug: string): PdpStoryPack | null {
	const key = decodeURIComponent(slug).trim().toLowerCase();
	const resolved = SLUG_ALIASES[key] ?? key;
	return PDP_STORIES[resolved] ?? null;
}
