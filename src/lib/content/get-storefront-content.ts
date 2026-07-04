import { cacheLife, cacheTag } from "next/cache";
import { loadStorefrontContent } from "@/lib/content/provider";
import type { StorefrontContent } from "@/lib/content/types";

/** Cached storefront marketing copy for a channel. */
export async function getStorefrontContent(channel: string): Promise<StorefrontContent> {
	"use cache";
	cacheLife("hours");
	cacheTag(`storefront-content:${channel}`);

	return loadStorefrontContent({ channel });
}
