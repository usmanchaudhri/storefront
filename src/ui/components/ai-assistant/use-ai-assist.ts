"use client";

import { useCallback, useRef, useState } from "react";

import type { AssistApiResponse, AssistPageContext, ChatMessage } from "@/app/[channel]/(main)/chat/types";
import { getResponseErrorMessage, isIgnorableFetchError, readJsonResponse } from "@/lib/read-json-response";
import type { SearchProduct } from "@/lib/search";

import { getAssistantCollectionProducts } from "./get-collection-products";

type UseAiAssistOptions = {
	channel: string;
	enabled: boolean;
};

export type AssistChatMessage = {
	id: string;
	role: "user" | "assistant";
	content: string;
	products: SearchProduct[];
	suggestions: string[];
};

type AiAssistState = {
	messages: AssistChatMessage[];
	loading: boolean;
	error: string | null;
};

const initialState: AiAssistState = {
	messages: [],
	loading: false,
	error: null,
};

function createMessageId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useAiAssist({ channel, enabled }: UseAiAssistOptions) {
	const [state, setState] = useState<AiAssistState>(initialState);
	const abortRef = useRef<AbortController | null>(null);
	const requestIdRef = useRef(0);
	const messagesRef = useRef<AssistChatMessage[]>([]);

	const reset = useCallback(() => {
		abortRef.current?.abort();
		requestIdRef.current += 1;
		messagesRef.current = [];
		setState(initialState);
	}, []);

	const appendUserMessage = useCallback((content: string) => {
		const userMessage: AssistChatMessage = {
			id: createMessageId(),
			role: "user",
			content,
			products: [],
			suggestions: [],
		};

		const nextMessages = [...messagesRef.current, userMessage];
		messagesRef.current = nextMessages;

		setState({
			messages: nextMessages,
			loading: true,
			error: null,
		});

		return nextMessages;
	}, []);

	const assist = useCallback(
		async (query: string, context?: AssistPageContext) => {
			if (!enabled) {
				return;
			}

			const trimmed = query.trim();
			if (!trimmed) {
				return;
			}

			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;
			const requestId = ++requestIdRef.current;

			const nextMessages = appendUserMessage(trimmed);

			const conversation: ChatMessage[] = nextMessages.map((message) => ({
				role: message.role,
				content: message.content,
			}));

			try {
				const response = await fetch("/api/assist", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						channel,
						messages: conversation,
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

				const assistantMessage: AssistChatMessage = {
					id: createMessageId(),
					role: "assistant",
					content: data.reply,
					products: data.products ?? [],
					suggestions: data.suggestions ?? [],
				};

				const withAssistant = [...messagesRef.current, assistantMessage];
				messagesRef.current = withAssistant;

				setState({
					messages: withAssistant,
					loading: false,
					error: null,
				});
			} catch (assistError) {
				if (isIgnorableFetchError(assistError, controller.signal)) {
					return;
				}

				if (requestId !== requestIdRef.current) {
					return;
				}

				setState({
					messages: messagesRef.current,
					loading: false,
					error: assistError instanceof Error ? assistError.message : "Assist failed",
				});
			}
		},
		[appendUserMessage, channel, enabled],
	);

	const browseCollection = useCallback(
		async (collection: { name: string; slug: string }) => {
			if (!enabled) {
				return;
			}

			const slug = collection.slug.trim();
			const name = collection.name.trim() || slug;
			if (!slug) {
				return;
			}

			abortRef.current?.abort();
			const requestId = ++requestIdRef.current;

			appendUserMessage(`Show me the ${name} collection`);

			try {
				const result = await getAssistantCollectionProducts(channel, slug);

				if (requestId !== requestIdRef.current) {
					return;
				}

				if (!result.ok) {
					throw new Error(result.error);
				}

				const productCount = result.products.length;
				const assistantMessage: AssistChatMessage = {
					id: createMessageId(),
					role: "assistant",
					content:
						productCount > 0
							? `Here are products from ${result.collectionName}. Add what you like to your cart, or ask me anything else.`
							: `I couldn't find products in ${result.collectionName} right now. Try another collection or ask me what you're looking for.`,
					products: result.products,
					suggestions:
						productCount > 0
							? [
									`Best sellers in ${result.collectionName}`,
									"Something under $50",
									"What pairs well with these?",
								]
							: ["What are your best sellers?", "Show me another collection"],
				};

				const withAssistant = [...messagesRef.current, assistantMessage];
				messagesRef.current = withAssistant;

				setState({
					messages: withAssistant,
					loading: false,
					error: null,
				});
			} catch (collectionError) {
				if (requestId !== requestIdRef.current) {
					return;
				}

				setState({
					messages: messagesRef.current,
					loading: false,
					error:
						collectionError instanceof Error ? collectionError.message : "Could not load collection products",
				});
			}
		},
		[appendUserMessage, channel, enabled],
	);

	return {
		...state,
		assist,
		browseCollection,
		reset,
	};
}
