export type ChatRole = "user" | "assistant";

export type ChatMessage = {
	role: ChatRole;
	content: string;
};

export type ChatModelsResponse = {
	models?: string[];
	defaultModel?: string;
	error?: string;
};

export type ChatReplyResponse = {
	model?: string;
	reply?: string;
	error?: string;
};

export type SearchApiResponse = {
	products: Array<{
		id: string;
		name: string;
		slug: string;
		thumbnailUrl?: string | null;
		thumbnailAlt?: string | null;
		price: number;
		currency: string;
		categoryName?: string | null;
	}>;
	pagination: {
		totalCount: number;
		hasNextPage?: boolean;
	};
	error?: string;
};

export type AssistPageContext = {
	pageType: "home" | "pdp" | "plp" | "search" | "other";
	productSlug?: string;
	productName?: string;
	categorySlug?: string;
	categoryName?: string;
};

export type AssistApiResponse = {
	model?: string;
	reply?: string;
	products?: SearchApiResponse["products"];
	suggestions?: string[];
	error?: string;
};
