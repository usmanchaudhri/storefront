import { defaultStorefrontContent } from "@/lib/content/defaults";
import type { StorefrontContent, StorefrontContentRequest } from "@/lib/content/types";

export type ContentProvider = {
	load(request: StorefrontContentRequest): Promise<StorefrontContent>;
};

const codeProvider: ContentProvider = {
	async load() {
		return defaultStorefrontContent;
	},
};

export async function loadStorefrontContent(request: StorefrontContentRequest): Promise<StorefrontContent> {
	return codeProvider.load(request);
}
