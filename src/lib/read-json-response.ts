export async function readJsonResponse<T>(response: Response): Promise<T> {
	const text = await response.text();

	if (!text.trim()) {
		throw new Error("Empty response from server");
	}

	try {
		return JSON.parse(text) as T;
	} catch {
		const contentType = response.headers.get("content-type") ?? "";
		if (contentType.includes("text/html")) {
			throw new Error("AI assist API is unavailable. Redeploy the storefront with the latest build.");
		}

		throw new Error("Invalid response from server");
	}
}

export function getResponseErrorMessage(data: unknown, fallback: string): string {
	if (!data || typeof data !== "object") {
		return fallback;
	}

	const record = data as Record<string, unknown>;
	if (typeof record.error === "string" && record.error.trim()) {
		return record.error;
	}

	if (typeof record.detail === "string" && record.detail.trim()) {
		return record.detail;
	}

	return fallback;
}

export function isIgnorableFetchError(error: unknown, signal?: AbortSignal): boolean {
	if (signal?.aborted) {
		return true;
	}

	if (!(error instanceof Error)) {
		return false;
	}

	if (error.name === "AbortError") {
		return true;
	}

	return /aborted/i.test(error.message);
}
