import { NextRequest } from "next/server";

import { getResponseErrorMessage, readJsonResponse } from "@/lib/read-json-response";

function getAssistApiUrl(): string | null {
	const apiUrl = process.env.CHATBOT_API_URL ?? process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? "";
	const normalized = apiUrl.replace(/\/$/, "");
	return normalized || null;
}

export async function POST(request: NextRequest) {
	const apiUrl = getAssistApiUrl();
	if (!apiUrl) {
		return Response.json({ error: "AI assist is not configured" }, { status: 503 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	let response: Response;
	try {
		response = await fetch(`${apiUrl}/api/assist`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
			cache: "no-store",
		});
	} catch (error) {
		const detail = error instanceof Error ? error.message : "Failed to reach AI service";
		return Response.json(
			{
				error: `AI service is unavailable. Check that kpure-ai is running at ${apiUrl} (${detail}).`,
			},
			{ status: 502 },
		);
	}

	let data: unknown;
	try {
		data = await readJsonResponse<unknown>(response);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Invalid assist response";
		return Response.json(
			{ error: response.ok ? message : `Assist failed (${response.status})` },
			{ status: response.ok ? 502 : response.status },
		);
	}

	if (!response.ok) {
		return Response.json(
			{
				error: getResponseErrorMessage(data, `Assist failed (${response.status})`),
			},
			{ status: response.status },
		);
	}

	return Response.json(data, {
		headers: {
			"Cache-Control": "private, no-store",
		},
	});
}
