import { shilajitGummiesStory } from "./7-in-1-shilajit-gummies";
import { appleCiderAshwagandhaGummiesStory } from "./apple-cider-ashwagandha-gummies";
import type { PdpStoryPack } from "./types";

export type { PdpStoryPack, PdpStoryImage } from "./types";
export { shilajitGummiesStory, appleCiderAshwagandhaGummiesStory };

const PDP_STORIES: Record<string, PdpStoryPack> = {
	[shilajitGummiesStory.slug]: shilajitGummiesStory,
	[appleCiderAshwagandhaGummiesStory.slug]: appleCiderAshwagandhaGummiesStory,
};

/** Homepage and older links may still use this slug. */
const SLUG_ALIASES: Record<string, string> = {
	"energy-boost-pro": shilajitGummiesStory.slug,
};

export function getPdpStory(slug: string): PdpStoryPack | null {
	const key = decodeURIComponent(slug).trim().toLowerCase();
	const resolved = SLUG_ALIASES[key] ?? key;
	return PDP_STORIES[resolved] ?? null;
}
