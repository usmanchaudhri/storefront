"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { SearchApiResponse } from "@/app/[channel]/(main)/chat/types";
import { isIgnorableFetchError, readJsonResponse } from "@/lib/read-json-response";
import type { SearchProduct } from "@/lib/search";

type UseAiSearchOptions = {
	channel: string;
	debounceMs: number;
	enabled: boolean;
};

type AiSearchState = {
	products: SearchProduct[];
	totalCount: number;
	loading: boolean;
	error: string | null;
	submittedQuery: string;
};

const initialState: AiSearchState = {
	products: [],
	totalCount: 0,
	loading: false,
	error: null,
	submittedQuery: "",
};

export function useAiSearch({ channel, debounceMs, enabled }: UseAiSearchOptions) {
	const [state, setState] = useState<AiSearchState>(initialState);
	const abortRef = useRef<AbortController | null>(null);
	const requestIdRef = useRef(0);

	const search = useCallback(
		async (query: string) => {
			const trimmed = query.trim();

			if (!trimmed) {
				abortRef.current?.abort();
				setState(initialState);
				return;
			}

			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;
			const requestId = ++requestIdRef.current;

			setState((current) => ({
				...current,
				loading: true,
				error: null,
				submittedQuery: trimmed,
			}));

			try {
				const params = new URLSearchParams({ q: trimmed, channel });
				const response = await fetch(`/api/search?${params.toString()}`, {
					headers: { Accept: "application/json" },
					signal: controller.signal,
				});

				if (controller.signal.aborted || requestId !== requestIdRef.current) {
					return;
				}

				const data = await readJsonResponse<SearchApiResponse>(response);

				if (requestId !== requestIdRef.current) {
					return;
				}

				if (!response.ok) {
					throw new Error(data.error ?? `Search failed (${response.status})`);
				}

				setState({
					products: data.products ?? [],
					totalCount: data.pagination?.totalCount ?? data.products?.length ?? 0,
					loading: false,
					error: null,
					submittedQuery: trimmed,
				});
			} catch (searchError) {
				if (isIgnorableFetchError(searchError, controller.signal)) {
					return;
				}

				if (requestId !== requestIdRef.current) {
					return;
				}

				setState({
					products: [],
					totalCount: 0,
					loading: false,
					error: searchError instanceof Error ? searchError.message : "Search failed",
					submittedQuery: trimmed,
				});
			}
		},
		[channel],
	);

	useEffect(() => {
		if (!enabled) {
			abortRef.current?.abort();
			setState(initialState);
		}
	}, [enabled]);

	useEffect(() => {
		return () => {
			abortRef.current?.abort();
		};
	}, []);

	const searchDebounced = useCallback(
		(query: string) => {
			const trimmed = query.trim();

			if (!trimmed) {
				abortRef.current?.abort();
				setState(initialState);
				return;
			}

			if (trimmed.length < 2) {
				abortRef.current?.abort();
				requestIdRef.current += 1;
				setState((current) => ({
					...current,
					loading: false,
					error: null,
					submittedQuery: trimmed,
					products: [],
					totalCount: 0,
				}));
				return;
			}

			const timeoutId = window.setTimeout(() => {
				void search(trimmed);
			}, debounceMs);

			return () => window.clearTimeout(timeoutId);
		},
		[debounceMs, search],
	);

	const reset = useCallback(() => {
		abortRef.current?.abort();
		requestIdRef.current += 1;
		setState(initialState);
	}, []);

	return {
		...state,
		search,
		searchDebounced,
		reset,
	};
}
