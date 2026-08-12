export type PdpStoryImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type PdpStoryTile = {
	id: "format" | "wellness" | "clarity" | "gummies";
	title: string;
	body: string;
};

export type PdpStoryBlend = {
	title: string;
	intro: string;
	tiles: readonly PdpStoryTile[];
	image: PdpStoryImage;
};

export type PdpStoryRoutine = {
	title: string;
	intro: string;
	checkItems: readonly string[];
	iconItems: readonly {
		id: "convenient" | "nearby" | "ritual" | "bottle";
		label: string;
	}[];
	image: PdpStoryImage;
};

export type PdpStoryIngredient = {
	name: string;
	benefit: string;
	image: PdpStoryImage;
};

export type PdpStoryLookInside = {
	eyebrow: string;
	title: string;
	intro: string;
	ingredients: readonly PdpStoryIngredient[];
};

export type PdpStoryPack = {
	slug: string;
	blend: PdpStoryBlend;
	routine: PdpStoryRoutine;
	lookInside: PdpStoryLookInside;
	disclaimer: string;
};
