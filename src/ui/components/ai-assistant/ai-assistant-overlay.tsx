"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, Loader2, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";

import type { AiAssistantConfig } from "@/app/[channel]/(main)/chat/config";
import { cn } from "@/lib/utils";
import { channelHref } from "@/lib/channel-path";
import { SearchResults } from "@/ui/components/search-results";

import type { useAiAssist } from "./use-ai-assist";
import type { useAiSearch } from "./use-ai-search";

type AiAssistantOverlayProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	config: AiAssistantConfig;
	channel: string;
	query: string;
	onQueryChange: (value: string) => void;
	onSubmit: () => void;
	onStarterSelect: (value: string) => void;
	onSuggestionSelect: (value: string) => void;
	searchState: ReturnType<typeof useAiSearch>;
	assistState: ReturnType<typeof useAiAssist>;
};

export function AiAssistantOverlay({
	open,
	onOpenChange,
	config,
	channel,
	query,
	onQueryChange,
	onSubmit,
	onStarterSelect,
	onSuggestionSelect,
	searchState,
	assistState,
}: AiAssistantOverlayProps) {
	const inputId = useId();
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		products: searchProducts,
		totalCount,
		loading: searchLoading,
		error: searchError,
		submittedQuery,
	} = searchState;
	const {
		reply,
		products: assistProducts,
		suggestions,
		loading: assistLoading,
		error: assistError,
		submittedQuery: assistSubmittedQuery,
	} = assistState;

	useEffect(() => {
		if (!open) {
			return;
		}

		const frameId = window.requestAnimationFrame(() => {
			inputRef.current?.focus();
		});

		return () => window.cancelAnimationFrame(frameId);
	}, [open]);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			onQueryChange("");
		}

		onOpenChange(nextOpen);
	};

	const hasSubmitted = Boolean(submittedQuery || assistSubmittedQuery);
	const showStarters = !query.trim() && !hasSubmitted;
	const showMinLengthHint = query.trim().length > 0 && query.trim().length < 2;
	const showEmptySearchResults =
		submittedQuery && !searchLoading && !searchError && searchProducts.length === 0;
	const viewAllHref =
		submittedQuery && totalCount > searchProducts.length
			? `${channelHref(channel, "/search")}?query=${encodeURIComponent(submittedQuery)}`
			: submittedQuery && totalCount > 0
				? `${channelHref(channel, "/search")}?query=${encodeURIComponent(submittedQuery)}`
				: null;

	return (
		<DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay
					className={cn(
						"bg-foreground/40 fixed inset-0 z-[60] backdrop-blur-sm",
						"data-[state=open]:animate-in data-[state=closed]:animate-out",
						"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					)}
				/>
				<DialogPrimitive.Content
					className={cn(
						"fixed z-[60] flex flex-col overflow-hidden bg-background shadow-2xl outline-none",
						"data-[state=open]:animate-in data-[state=closed]:animate-out",
						"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
						"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
						"inset-0 sm:inset-4 sm:rounded-2xl sm:border sm:border-border",
						"md:inset-x-auto md:left-1/2 md:top-1/2 md:h-[min(90dvh,52rem)] md:w-full md:max-w-4xl md:-translate-x-1/2 md:-translate-y-1/2",
					)}
					aria-describedby={undefined}
				>
					<header className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-6">
						<div className="min-w-0">
							<DialogPrimitive.Title className="text-lg font-semibold text-foreground sm:text-xl">
								{config.assistantName}
							</DialogPrimitive.Title>
							<DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
								Search products instantly, then get AI recommendations from Kaya Pure.
							</DialogPrimitive.Description>
						</div>
						<DialogPrimitive.Close
							className={cn(
								"shrink-0 rounded-md p-2 text-muted-foreground transition-colors",
								"hover:bg-muted hover:text-foreground",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							)}
							aria-label="Close assistant"
						>
							<X className="h-5 w-5" />
						</DialogPrimitive.Close>
					</header>

					<div className="border-b border-border px-4 py-4 sm:px-6">
						<label htmlFor={inputId} className="sr-only">
							Search products
						</label>
						<div className="relative">
							<Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
							<input
								ref={inputRef}
								id={inputId}
								type="search"
								value={query}
								onChange={(event) => onQueryChange(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										event.preventDefault();
										onSubmit();
									}
								}}
								placeholder={config.placeholder}
								autoComplete="off"
								className={cn(
									"w-full rounded-2xl border border-input bg-background py-4 pl-12 pr-4",
									"text-base text-foreground placeholder:text-muted-foreground",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								)}
							/>
						</div>
						{config.chatEnabled ? (
							<p className="mt-2 text-xs text-muted-foreground">
								Press Enter to search and get AI recommendations.
							</p>
						) : null}
					</div>

					<div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
						{showStarters ? (
							<div className="space-y-3">
								<p className="text-sm font-medium text-foreground">Try searching for</p>
								<div className="flex flex-wrap gap-2">
									{config.suggestedQueries.map((suggestion) => (
										<button
											key={suggestion}
											type="button"
											onClick={() => onStarterSelect(suggestion)}
											className={cn(
												"bg-muted/50 rounded-full border border-border px-3 py-1.5 text-sm text-foreground",
												"transition-colors hover:bg-muted",
											)}
										>
											{suggestion}
										</button>
									))}
								</div>
							</div>
						) : null}

						{showMinLengthHint ? (
							<p className="text-sm text-muted-foreground">Type at least 2 characters to search.</p>
						) : null}

						{searchLoading ? (
							<div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
								<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
								<span>Searching products…</span>
							</div>
						) : null}

						{searchError ? <p className="py-4 text-sm text-destructive">{searchError}</p> : null}

						{showEmptySearchResults && !config.chatEnabled ? (
							<div className="py-8 text-center">
								<p className="text-sm font-medium text-foreground">
									No products found for &quot;{submittedQuery}&quot;
								</p>
								<p className="mt-1 text-sm text-muted-foreground">
									Try a different search term or browse all products.
								</p>
								<Link
									href={channelHref(channel, "/products")}
									onClick={() => handleOpenChange(false)}
									className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
								>
									Browse all products
								</Link>
							</div>
						) : null}

						{searchProducts.length > 0 ? (
							<div className="space-y-4">
								<div className="flex items-center justify-between gap-3">
									<p className="text-sm text-muted-foreground">
										{totalCount} {totalCount === 1 ? "result" : "results"}
										{submittedQuery ? (
											<>
												{" "}
												for &quot;<span className="text-foreground">{submittedQuery}</span>&quot;
											</>
										) : null}
									</p>
									{viewAllHref ? (
										<Link
											href={viewAllHref}
											onClick={() => handleOpenChange(false)}
											className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
										>
											View all
											<ArrowRight className="h-4 w-4" aria-hidden="true" />
										</Link>
									) : null}
								</div>
								<SearchResults
									products={searchProducts}
									channel={channel}
									compact
									onProductClick={() => handleOpenChange(false)}
								/>
							</div>
						) : null}

						{config.chatEnabled ? (
							<div className={cn(searchProducts.length > 0 && "mt-8 border-t border-border pt-6")}>
								<div className="mb-4 flex items-center gap-2">
									<Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
									<p className="text-sm font-medium text-foreground">AI recommendations</p>
								</div>

								{assistLoading ? (
									<div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
										<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
										<span>Getting recommendations…</span>
									</div>
								) : null}

								{assistError ? <p className="py-2 text-sm text-destructive">{assistError}</p> : null}

								{reply ? (
									<div className="space-y-4">
										<p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{reply}</p>

										{assistProducts.length > 0 ? (
											<SearchResults
												products={assistProducts}
												channel={channel}
												compact
												onProductClick={() => handleOpenChange(false)}
											/>
										) : null}

										{suggestions.length > 0 ? (
											<div className="space-y-2">
												<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
													Suggested follow-ups
												</p>
												<div className="flex flex-wrap gap-2">
													{suggestions.map((suggestion) => (
														<button
															key={suggestion}
															type="button"
															onClick={() => onSuggestionSelect(suggestion)}
															className={cn(
																"rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground",
																"transition-colors hover:bg-muted",
															)}
														>
															{suggestion}
														</button>
													))}
												</div>
											</div>
										) : null}
									</div>
								) : null}
							</div>
						) : null}
					</div>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
