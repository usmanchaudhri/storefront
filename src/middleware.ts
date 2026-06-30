import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isStoreRoutePath } from "@/lib/channel-path";

const DEFAULT_CHANNEL = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL;

function hasFileExtension(pathname: string): boolean {
	return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export function middleware(request: NextRequest) {
	if (!DEFAULT_CHANNEL) {
		return NextResponse.next();
	}

	const { pathname } = request.nextUrl;

	if (
		pathname.startsWith("/api") ||
		pathname.startsWith("/_next") ||
		pathname.startsWith("/checkout") ||
		hasFileExtension(pathname)
	) {
		return NextResponse.next();
	}

	const channelPrefix = `/${DEFAULT_CHANNEL}`;

	// Strip default channel from visible URLs: /default-channel/products → /products
	if (pathname === channelPrefix || pathname.startsWith(`${channelPrefix}/`)) {
		const url = request.nextUrl.clone();
		url.pathname = pathname === channelPrefix ? "/" : pathname.slice(channelPrefix.length) || "/";
		return NextResponse.redirect(url, 308);
	}

	// Alternate channels keep their prefix: /eu-channel/products
	if (!isStoreRoutePath(pathname)) {
		return NextResponse.next();
	}

	// Rewrite clean URLs to internal [channel] routes
	const url = request.nextUrl.clone();
	url.pathname = `${channelPrefix}${pathname === "/" ? "" : pathname}`;
	return NextResponse.rewrite(url);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
