import { NextRequest } from "next/server";

import { searchProducts } from "@/lib/search";

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get("q")?.trim();
	const channel = request.nextUrl.searchParams.get("channel")?.trim();

	if (!query) {
		return Response.json({ error: "Missing search query (q)" }, { status: 400 });
	}

	if (!channel) {
		return Response.json({ error: "Missing channel" }, { status: 400 });
	}

	try {
		const result = await searchProducts({
			query,
			channel,
			limit: 12,
			sortBy: "relevance",
		});

		return Response.json(result, {
			headers: {
				"Cache-Control": "private, no-store",
			},
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Search failed";
		return Response.json({ error: message }, { status: 500 });
	}
}
