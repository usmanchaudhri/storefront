"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { ChatbotConfig } from "@/app/[channel]/(main)/chat/config";
import type { ChatMessage, ChatModelsResponse, ChatReplyResponse } from "@/app/[channel]/(main)/chat/types";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/lib/utils";

type ChatAssistantProps = {
	config: ChatbotConfig;
};

export function ChatAssistant({ config }: ChatAssistantProps) {
	const [open, setOpen] = useState(false);
	const [models, setModels] = useState<string[]>([]);
	const [selectedModel, setSelectedModel] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	const apiBase = config.apiUrl;

	useEffect(() => {
		if (!open) {
			return;
		}

		void fetch(`${apiBase}/api/models`)
			.then((response) => response.json() as Promise<ChatModelsResponse>)
			.then((data) => {
				if (data.error) {
					setError(data.error);
					return;
				}

				const availableModels = data.models ?? [];

				setModels(availableModels);
				setSelectedModel(config.defaultModel || data.defaultModel || availableModels[0] || "");
			})
			.catch((fetchError: unknown) => {
				setError(fetchError instanceof Error ? fetchError.message : "Failed to load models");
			});
	}, [apiBase, config.defaultModel, open]);

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
	}, [messages, loading]);

	async function sendMessage() {
		const trimmed = input.trim();

		if (!trimmed || !selectedModel || loading) {
			return;
		}

		const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];

		setMessages(nextMessages);
		setInput("");
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`${apiBase}/api/chat`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					model: selectedModel,
					messages: nextMessages,
				}),
			});

			const data = (await response.json()) as ChatReplyResponse;

			if (!response.ok || !data.reply) {
				throw new Error(data.error ?? `Chat failed (${response.status})`);
			}

			setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
		} catch (sendError) {
			setError(sendError instanceof Error ? sendError.message : "Unable to send message");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
			{open ? (
				<section
					className="flex h-[min(32rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
					aria-label={config.assistantName}
				>
					<header className="flex items-center justify-between gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
						<div>
							<p className="text-sm font-semibold">{config.assistantName}</p>
							<p className="text-primary-foreground/80 text-xs">Powered by LiteLLM</p>
						</div>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="hover:bg-primary-foreground/10 rounded-md p-1"
							aria-label="Close assistant"
						>
							<X className="h-4 w-4" />
						</button>
					</header>

					{models.length > 0 ? (
						<div className="border-b border-border px-4 py-2">
							<label className="flex flex-col gap-1 text-xs text-muted-foreground">
								Model
								<select
									value={selectedModel}
									onChange={(event) => setSelectedModel(event.target.value)}
									className="rounded-md border border-input bg-background px-2 py-1 text-sm text-foreground"
									disabled={loading}
								>
									{models.map((model) => (
										<option key={model} value={model}>
											{model}
										</option>
									))}
								</select>
							</label>
						</div>
					) : null}

					<div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
						{messages.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								Ask about products, categories, or how to shop on Kaya Pure.
							</p>
						) : (
							messages.map((message, index) => (
								<div
									key={`${message.role}-${index}`}
									className={cn(
										"max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
										message.role === "user"
											? "ml-auto bg-primary text-primary-foreground"
											: "bg-muted text-foreground",
									)}
								>
									{message.content}
								</div>
							))
						)}
						{loading ? <p className="text-sm text-muted-foreground">Thinking…</p> : null}
					</div>

					<footer className="space-y-2 border-t border-border px-4 py-3">
						{error ? <p className="text-xs text-destructive">{error}</p> : null}
						<div className="flex items-end gap-2">
							<textarea
								value={input}
								onChange={(event) => setInput(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										void sendMessage();
									}
								}}
								placeholder="Ask a question…"
								rows={2}
								disabled={loading || !selectedModel}
								className="min-h-10 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground"
							/>
							<Button
								type="button"
								size="icon"
								onClick={() => void sendMessage()}
								disabled={loading || !input.trim() || !selectedModel}
								aria-label="Send message"
							>
								<Send className="h-4 w-4" />
							</Button>
						</div>
					</footer>
				</section>
			) : null}

			<Button
				type="button"
				size="lg"
				className="h-14 rounded-full px-5 shadow-lg"
				onClick={() => setOpen((current) => !current)}
				aria-expanded={open}
				aria-label={open ? "Hide shopping assistant" : "Open shopping assistant"}
			>
				<MessageCircle className="h-5 w-5" />
				<span className="hidden sm:inline">{open ? "Close" : "Ask AI"}</span>
			</Button>
		</div>
	);
}
