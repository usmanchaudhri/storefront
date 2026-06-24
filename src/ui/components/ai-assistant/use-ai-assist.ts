"use client";

import { useCallback, useRef, useState } from "react";

import type { AssistApiResponse, AssistPageContext } from "@/app/[channel]/(main)/chat/types";
import { getResponseErrorMessage, isIgnorableFetchError, readJsonResponse } from "@/lib/read-json-response";
import type { SearchProduct } from "@/lib/search";

type UseAiAssistOptions = {
	channel: string;
	enabled: boolean;
};

type AiAssistState = {
	reply: string | null;
	products: SearchProduct[];
	suggestions: string[];
	loading: boolean;
	error: string | null;
	submittedQuery: string;
};

const initialState: AiAssistState = {
	reply: null,
	products: [],
	suggestions: [],
	loading: false,
	error: null,
	submittedQuery: "",
};

export function useAiAssist({ channel, enabled }: UseAiAssistOptions) {
	const [state, setState] = useState<AiAssistState>(initialState);
	const abortRef = useRef<AbortController | null>(null);
	const requestIdRef = useRef(0);

	const reset = useCallback(() => {
		abortRef.current?.abort();
		requestIdRef.current += 1;
		setState(initialState);
	}, []);

	const assist = useCallback(
		async (query: string, context?: AssistPageContext) => {
			if (!enabled) {
				return;
			}

			const trimmed = query.trim();
			if (!trimmed) {
				reset();
				return;
			}

			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;
			const requestId = ++requestIdRef.current;

			setState({
				reply: null,
				products: [],
				suggestions: [],
				loading: true,
				error: null,
				submittedQuery: trimmed,
			});

			try {
				const response = await fetch("/api/assist", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						channel,
						messages: [{ role: "user", content: trimmed }],
						context,
					}),
					signal: controller.signal,
				});

				if (controller.signal.aborted || requestId !== requestIdRef.current) {
					return;
				}

				const data = await readJsonResponse<AssistApiResponse>(response);

				if (requestId !== requestIdRef.current) {
					return;
				}

				if (!response.ok || !data.reply) {
					throw new Error(getResponseErrorMessage(data, `Assist failed (${response.status})`));
				}

				setState({
					reply: data.reply,
					products: data.products ?? [],
					suggestions: data.suggestions ?? [],
					loading: false,
					error: null,
					submittedQuery: trimmed,
				});
			} catch (assistError) {
				if (isIgnorableFetchError(assistError, controller.signal)) {
					return;
				}

				if (requestId !== requestIdRef.current) {
					return;
				}

				setState({
					reply: null,
					products: [],
					suggestions: [],
					loading: false,
					error: assistError instanceof Error ? assistError.message : "Assist failed",
					submittedQuery: trimmed,
				});
			}
		},
		[channel, enabled, reset],
	);

	return {
		...state,
		assist,
		reset,
	};
}
