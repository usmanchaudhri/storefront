/** Homepage value strip — Figma 3413:3957. */

export type HomeValueProp = {
	id: string;
	label: string;
	iconSrc: string;
};

export const HOME_VALUE_PROPS_INK = "#022113";
export const HOME_VALUE_PROPS_BORDER = "#DAE0DA";

export const homeValueProps: readonly HomeValueProp[] = [
	{
		id: "feel-good",
		label: "Feel-good essentials",
		iconSrc: "/images/home/value-props/feel-good.svg",
	},
	{
		id: "thoughtfully-chosen",
		label: "Thoughtfully chosen",
		iconSrc: "/images/home/value-props/thoughtfully-chosen.svg",
	},
	{
		id: "made-for-real-life",
		label: "Made for real life",
		iconSrc: "/images/home/value-props/made-for-real-life.svg",
	},
	{
		id: "everyday-rituals",
		label: "Everyday rituals, made easy",
		iconSrc: "/images/home/value-props/everyday-rituals.svg",
	},
] as const;
