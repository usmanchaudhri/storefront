"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUp, Loader2, ShoppingBagIcon, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { AssistantCollection } from "@/app/[channel]/(main)/chat/collections";
import type { AiAssistantConfig } from "@/app/[channel]/(main)/chat/config";
import { channelHref } from "@/lib/channel-path";
import type { SearchProduct } from "@/lib/search";
import { cn } from "@/lib/utils";

import { getCartItemCount } from "./add-product-to-cart";
import { AiAssistantCollections } from "./ai-assistant-collections";
import { AiAssistantProductDetailView } from "./ai-assistant-product-detail";
import { AiAssistantProductList } from "./ai-assistant-product-list";
import type { useAiAssist } from "./use-ai-assist";

type AiAssistantOverlayProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	config: AiAssistantConfig;
	channel: string;
	collections: AssistantCollection[];
	query: string;
	onQueryChange: (value: string) => void;
	onSubmit: () => void;
	onStarterSelect: (value: string) => void;
	onSuggestionSelect: (value: string) => void;
	onCollectionSelect: (collection: AssistantCollection) => void;
	assistState: ReturnType<typeof useAiAssist>;
};

export function AiAssistantOverlay({
	open,
	onOpenChange,
	config,
	channel,
	collections,
	query,
	onQueryChange,
	onSubmit,
	onStarterSelect,
	onSuggestionSelect,
	onCollectionSelect,
	assistState,
}: AiAssistantOverlayProps) {
	const inputId = useId();
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { messages, loading, error } = assistState;
	const [cartItemCount, setCartItemCount] = useState(0);
	const [selectedProduct, setSelectedProduct] = useState<SearchProduct | null>(null);

	const handleCartItemCountChange = useCallback((count: number) => {
		setCartItemCount(count);
	}, []);

	const handleProductSelect = useCallback((product: SearchProduct) => {
		setSelectedProduct(product);
	}, []);

	const handleProductDetailBack = useCallback(() => {
		setSelectedProduct(null);
	}, []);

	useEffect(() => {
		if (!open) {
			return;
		}

		const frameId = window.requestAnimationFrame(() => {
			inputRef.current?.focus();
		});

		return () => window.cancelAnimationFrame(frameId);
	}, [open]);

	useEffect(() => {
		if (!open) {
			return;
		}

		let cancelled = false;

		void getCartItemCount(channel).then((count) => {
			if (!cancelled) {
				setCartItemCount(count);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [open, channel]);

	useEffect(() => {
		if (!open) {
			return;
		}

		messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [open, messages, loading, error]);

	useEffect(() => {
		if (query) {
			return;
		}

		const el = inputRef.current;
		if (el) {
			el.style.height = "auto";
		}
	}, [query]);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			onQueryChange("");
			setSelectedProduct(null);
		}

		onOpenChange(nextOpen);
	};

	const showStarters = messages.length === 0 && !loading;
	const canSubmit = Boolean(query.trim()) && !loading;

	const resizeComposer = () => {
		const el = inputRef.current;
		if (!el) {
			return;
		}

		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
	};

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
						"md:inset-x-auto md:left-1/2 md:top-1/2 md:h-[min(90dvh,52rem)] md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2",
					)}
					aria-describedby={undefined}
				>
					<header className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-4 sm:gap-4 sm:px-5">
						<div className="min-w-0">
							<DialogPrimitive.Title className="flex items-center gap-2 text-lg font-semibold text-foreground">
								<Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
								{config.assistantName}
							</DialogPrimitive.Title>
							<DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
								Ask what you need — AI recommends products from the catalog.
							</DialogPrimitive.Description>
						</div>
						<div className="flex shrink-0 items-center gap-1">
							<Link
								href={channelHref(channel, "/cart")}
								onClick={() => handleOpenChange(false)}
								data-testid="AssistantCartNavItem"
								className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#09594D] transition-colors duration-200 hover:bg-[#D9F6F1] hover:text-[#00A38C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								<ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
								{cartItemCount > 0 ? (
									<span
										key={cartItemCount}
										className="absolute -right-0.5 -top-0.5 flex h-4 w-4 animate-cart-badge-pop items-center justify-center rounded-full bg-[#09594D] text-[10px] font-medium text-white"
									>
										{cartItemCount > 9 ? "9+" : cartItemCount}
									</span>
								) : null}
								<span className="sr-only">
									{cartItemCount} item{cartItemCount !== 1 ? "s" : ""} in cart, view cart
								</span>
							</Link>
							<DialogPrimitive.Close
								className={cn(
									"rounded-md p-2 text-muted-foreground transition-colors",
									"hover:bg-muted hover:text-foreground",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								)}
								aria-label="Close assistant"
							>
								<X className="h-5 w-5" />
							</DialogPrimitive.Close>
						</div>
					</header>

					<div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 sm:px-5">
						{selectedProduct ? (
							<AiAssistantProductDetailView
								key={selectedProduct.id}
								channel={channel}
								product={selectedProduct}
								onBack={handleProductDetailBack}
								onCartItemCountChange={handleCartItemCountChange}
							/>
						) : (
							<div className="min-h-0 flex-1 overflow-y-auto">
								{showStarters ? (
									<div className="flex h-full min-h-[16rem] flex-col justify-start gap-6">
										<div className="space-y-2 text-center">
											<p className="text-xl font-semibold tracking-tight text-foreground">
												{config.assistantName}
											</p>
											<p className="mx-auto max-w-sm text-sm text-muted-foreground">
												Browse a collection or describe what you&apos;re shopping for.
											</p>
										</div>

										<AiAssistantCollections
											collections={collections}
											disabled={loading}
											onCollectionSelect={onCollectionSelect}
										/>

										<div className="space-y-3">
											<p className="text-sm font-medium text-foreground">Try asking</p>
											<div className="flex flex-wrap gap-2">
												{config.suggestedQueries.map((suggestion) => (
													<button
														key={suggestion}
														type="button"
														onClick={() => onStarterSelect(suggestion)}
														className={cn(
															"bg-muted/40 rounded-full border border-border px-3 py-1.5 text-left text-sm text-foreground",
															"transition-colors hover:bg-muted",
														)}
													>
														{suggestion}
													</button>
												))}
											</div>
										</div>
									</div>
								) : null}

								{messages.length > 0 ? (
									<div className="space-y-5">
										{messages.map((message) => {
											if (message.role === "user") {
												return (
													<div key={message.id} className="flex justify-end">
														<div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
															{message.content}
														</div>
													</div>
												);
											}

											return (
												<div key={message.id} className="flex justify-start">
													<div className="max-w-full space-y-3 sm:max-w-[95%]">
														<div className="bg-muted/60 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm leading-relaxed text-foreground">
															<p className="whitespace-pre-wrap">{message.content}</p>
														</div>

														{message.products.length > 0 ? (
															<AiAssistantProductList
																products={message.products}
																channel={channel}
																onProductSelect={handleProductSelect}
																onCartItemCountChange={handleCartItemCountChange}
															/>
														) : null}

														{message.suggestions.length > 0 ? (
															<div className="flex flex-wrap gap-2">
																{message.suggestions.map((suggestion) => (
																	<button
																		key={suggestion}
																		type="button"
																		onClick={() => onSuggestionSelect(suggestion)}
																		disabled={loading}
																		className={cn(
																			"rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground",
																			"transition-colors hover:bg-muted disabled:opacity-50",
																		)}
																	>
																		{suggestion}
																	</button>
																))}
															</div>
														) : null}
													</div>
												</div>
											);
										})}

										{loading ? (
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
												<span>Thinking…</span>
											</div>
										) : null}

										{error ? <p className="text-sm text-destructive">{error}</p> : null}
									</div>
								) : null}

								{messages.length === 0 && loading ? (
									<div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
										<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
										<span>Thinking…</span>
									</div>
								) : null}

								{messages.length === 0 && error ? (
									<p className="py-8 text-center text-sm text-destructive">{error}</p>
								) : null}

								<div ref={messagesEndRef} />
							</div>
						)}
					</div>

					<footer
						className={cn(
							"border-border/80 from-muted/40 shrink-0 border-t bg-gradient-to-t to-background px-3 pb-3 pt-3 sm:px-5 sm:pb-4",
							selectedProduct && "hidden",
						)}
					>
						<label htmlFor={inputId} className="sr-only">
							Message {config.assistantName}
						</label>
						<div
							className={cn(
								"border-border/70 flex items-end gap-2 rounded-[1.75rem] border bg-background px-3 py-2.5",
								"shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow",
								"focus-within:border-primary/40 focus-within:shadow-[0_10px_36px_rgb(0,0,0,0.08)]",
								"focus-within:ring-primary/15 focus-within:ring-2",
							)}
						>
							<textarea
								ref={inputRef}
								id={inputId}
								rows={1}
								value={query}
								onChange={(event) => {
									onQueryChange(event.target.value);
									resizeComposer();
								}}
								onKeyDown={(event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										if (canSubmit) {
											onSubmit();
										}
									}
								}}
								placeholder={config.placeholder}
								autoComplete="off"
								disabled={loading}
								className={cn(
									"max-h-40 min-h-[48px] flex-1 resize-none bg-transparent px-2 py-3",
									"placeholder:text-muted-foreground/80 text-[15px] leading-relaxed text-foreground",
									"focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60",
								)}
							/>
							<button
								type="button"
								onClick={onSubmit}
								disabled={!canSubmit}
								aria-label="Send message"
								className={cn(
									"mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all",
									"bg-teal-600 text-white hover:bg-teal-700",
									"disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									canSubmit && "scale-100 shadow-md shadow-teal-600/25",
								)}
							>
								{loading ? (
									<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
								) : (
									<ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
								)}
							</button>
						</div>
						<p className="mt-2.5 px-1 text-center text-[11px] text-muted-foreground">
							Enter to send · Shift+Enter for a new line
						</p>
					</footer>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
