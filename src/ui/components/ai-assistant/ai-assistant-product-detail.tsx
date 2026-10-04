"use client";

import { ArrowLeft, Check, Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

import { localeConfig } from "@/config/locale";
import type { SearchProduct } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useCart } from "@/ui/components/cart/cart-context";

import { addProductToCartBySlug } from "./add-product-to-cart";
import { getAssistantProductDetails, type AssistantProductDetail } from "./get-product-details";

type AiAssistantProductDetailProps = {
	channel: string;
	product: SearchProduct;
	onBack: () => void;
	onCartItemCountChange?: (count: number) => void;
};

export function AiAssistantProductDetailView({
	channel,
	product,
	onBack,
	onCartItemCountChange,
}: AiAssistantProductDetailProps) {
	const { openCart } = useCart();
	const [detail, setDetail] = useState<AssistantProductDetail | null>(null);
	const [loadingDetail, setLoadingDetail] = useState(true);
	const [detailError, setDetailError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<"idle" | "added" | "error">("idle");
	const [addError, setAddError] = useState<string | null>(null);
	const [activeImage, setActiveImage] = useState<string | null>(product.thumbnailUrl ?? null);

	useEffect(() => {
		let cancelled = false;

		void getAssistantProductDetails(channel, product.slug).then((result) => {
			if (cancelled) {
				return;
			}

			if (!result.ok) {
				setDetailError(result.error);
				setLoadingDetail(false);
				return;
			}

			setDetail(result.product);
			setActiveImage(result.product.imageUrl);
			setLoadingDetail(false);
		});

		return () => {
			cancelled = true;
		};
		// Remount via key={product.id} when the selected product changes so loading/error
		// state resets without synchronous setState in this effect.
	}, [channel, product.slug]);

	const displayName = detail?.name ?? product.name;
	const displayCategory = detail?.categoryName ?? product.categoryName;
	const displayPrice = detail?.price ?? product.price;
	const displayCurrency = detail?.currency ?? product.currency;
	const formattedPrice = new Intl.NumberFormat(localeConfig.default, {
		style: "currency",
		currency: displayCurrency,
	}).format(displayPrice);

	const gallery =
		detail && detail.gallery.length > 0
			? detail.gallery
			: product.thumbnailUrl
				? [{ url: product.thumbnailUrl, alt: product.thumbnailAlt ?? product.name }]
				: [];

	const handleAddToCart = () => {
		setStatus("idle");
		setAddError(null);

		startTransition(async () => {
			const result = await addProductToCartBySlug(channel, product.slug);
			if (!result.ok) {
				setStatus("error");
				setAddError(result.error);
				return;
			}

			setStatus("added");
			onCartItemCountChange?.(result.itemCount);
			openCart();
			window.setTimeout(() => {
				setStatus((current) => (current === "added" ? "idle" : current));
			}, 2000);
		});
	};

	return (
		<div className="flex h-full min-h-0 flex-col gap-3.5">
			<button
				type="button"
				onClick={onBack}
				className={cn(
					"inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-muted-foreground",
					"transition-colors hover:bg-muted hover:text-foreground",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				)}
			>
				<ArrowLeft className="h-4 w-4" aria-hidden="true" />
				Back to results
			</button>

			<div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto pb-1">
				<div className="mx-auto w-full max-w-[18rem] sm:max-w-[20rem]">
					<div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
						{activeImage ? (
							<Image
								src={activeImage}
								alt={detail?.imageAlt || product.thumbnailAlt || displayName}
								fill
								sizes="320px"
								className="object-cover"
								priority
							/>
						) : (
							<div className="flex h-full items-center justify-center text-sm text-muted-foreground">
								No image
							</div>
						)}
					</div>
				</div>

				{gallery.length > 1 ? (
					<ul role="list" className="flex justify-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:thin]">
						{gallery.map((image) => (
							<li key={image.url}>
								<button
									type="button"
									onClick={() => setActiveImage(image.url)}
									className={cn(
										"relative h-12 w-12 overflow-hidden rounded-lg border bg-muted sm:h-14 sm:w-14",
										activeImage === image.url ? "ring-primary/20 border-primary ring-2" : "border-border",
									)}
									aria-label="View product image"
								>
									<Image
										src={image.url}
										alt={image.alt || displayName}
										fill
										sizes="56px"
										className="object-cover"
									/>
								</button>
							</li>
						))}
					</ul>
				) : null}

				<div className="space-y-1.5 text-center">
					{displayCategory ? (
						<p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
							{displayCategory}
						</p>
					) : null}
					<h2 className="text-lg font-semibold tracking-tight text-foreground">{displayName}</h2>
					<p className="text-base font-semibold tabular-nums text-foreground">{formattedPrice}</p>
				</div>

				{loadingDetail ? (
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
						Loading product details…
					</div>
				) : null}

				{detailError ? <p className="text-center text-sm text-destructive">{detailError}</p> : null}

				{detail?.description ? (
					<div className="space-y-1.5">
						<p className="text-sm font-medium text-foreground">About this product</p>
						<p className="line-clamp-6 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
							{detail.description}
						</p>
					</div>
				) : null}
			</div>

			<div className="shrink-0 space-y-2 border-t border-border pt-3">
				<button
					type="button"
					onClick={handleAddToCart}
					disabled={isPending}
					className={cn(
						"inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						"disabled:cursor-not-allowed disabled:opacity-70",
						status === "added" ? "bg-teal-700 text-white" : "bg-teal-600 text-white hover:bg-teal-700",
					)}
				>
					{isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
							Adding…
						</>
					) : status === "added" ? (
						<>
							<Check className="h-4 w-4" aria-hidden="true" />
							Added
						</>
					) : (
						<>
							<ShoppingBag className="h-4 w-4" aria-hidden="true" />
							Add to cart
						</>
					)}
				</button>
				{addError ? <p className="text-xs text-destructive">{addError}</p> : null}
			</div>
		</div>
	);
}
