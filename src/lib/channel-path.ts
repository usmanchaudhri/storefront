import { DefaultChannelSlug } from "@/app/config";

/** Store routes that live under `[channel]/(main)/` — not channel slugs. */
const STORE_ROUTE_SEGMENTS = new Set([
	"products",
	"categories",
	"collections",
	"cart",
	"account",
	"login",
	"signup",
	"search",
	"orders",
	"pages",
	"blog",
]);

function normalizePath(path: string): string {
	if (!path || path === "/") {
		return "/";
	}
	return path.startsWith("/") ? path : `/${path}`;
}

export function isDefaultChannel(channel: string): boolean {
	return DefaultChannelSlug !== null && channel === DefaultChannelSlug;
}

/**
 * Public URL for a channel-scoped path.
 * Default channel omits the slug: `/products/foo` instead of `/default-channel/products/foo`.
 */
export function channelHref(channel: string, path: string = "/"): string {
	const normalized = normalizePath(path);

	if (isDefaultChannel(channel)) {
		return normalized;
	}

	return `/${encodeURIComponent(channel)}${normalized}`;
}

/**
 * Internal App Router path (always includes channel segment).
 * Use for revalidatePath and other framework APIs.
 */
export function channelInternalPath(channel: string, path: string = "/"): string {
	const normalized = normalizePath(path);
	return `/${encodeURIComponent(channel)}${normalized}`;
}

export function getDefaultChannelSlug(): string | null {
	return DefaultChannelSlug;
}

/** Whether the first URL segment is a store route (not an alternate channel slug). */
export function isStoreRoutePath(pathname: string): boolean {
	const first = pathname.split("/").filter(Boolean)[0];
	return !first || STORE_ROUTE_SEGMENTS.has(first);
}
