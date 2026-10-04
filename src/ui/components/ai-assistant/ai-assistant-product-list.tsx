"use client";

import { Check, Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";

import { localeConfig } from "@/config/locale";
import type { SearchProduct } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useCart } from "@/ui/components/cart/cart-context";

import { addProductToCartBySlug } from "./add-product-to-cart";

type AiAssistantProductListProps = {
	products: SearchProduct[];
	channel: string;
	onProductSelect?: (product: SearchProduct) => void;
	onCartItemCountChange?: (count: number) => void;
};

export function AiAssistantProductList({
	products,
	channel,
	onProductSelect,
	onCartItemCountChange,
}: AiAssistantProductListProps) {
	if (products.length === 0) {
		return null;
	}

	return (
		<ul role="list" className="flex w-full flex-col gap-3">
			{products.map((product, index) => (
				<li key={product.id}>
					<AiAssistantProductCard
						product={product}
						channel={channel}
						priority={index < 2}
						onProductSelect={onProductSelect}
						onCartItemCountChange={onCartItemCountChange}
					/>
				</li>
			))}
		</ul>
	);
}

function AiAssistantProductCard({
	product,
	channel,
	priority,
	onProductSelect,
	onCartItemCountChange,
}: {
	product: SearchProduct;
	channel: string;
	priority?: boolean;
	onProductSelect?: (product: SearchProduct) => void;
	onCartItemCountChange?: (count: number) => void;
}) {
	const { openCart } = useCart();
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<"idle" | "added" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const formattedPrice = new Intl.NumberFormat(localeConfig.default, {
		style: "currency",
		currency: product.currency,
	}).format(product.price);

	const handleAddToCart = () => {
		setStatus("idle");
		setErrorMessage(null);

		startTransition(async () => {
			const result = await addProductToCartBySlug(channel, product.slug);
			if (!result.ok) {
				setStatus("error");
				setErrorMessage(result.error);
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
		<article
			className={cn(
				"border-border/80 rounded-2xl border bg-card p-3 shadow-sm transition-all duration-200",
				"hover:border-primary/25 hover:shadow-md",
			)}
		>
			<div className="flex items-stretch gap-3 sm:gap-4">
				<button
					type="button"
					onClick={() => onProductSelect?.(product)}
					className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-32"
					aria-label={`View details for ${product.name}`}
				>
					{product.thumbnailUrl ? (
						<Image
							src={product.thumbnailUrl}
							alt={product.thumbnailAlt || product.name}
							fill
							sizes="128px"
							className="object-cover transition-transform duration-300 hover:scale-105"
							priority={priority}
						/>
					) : (
						<div className="flex h-full items-center justify-center px-2 text-center text-xs text-muted-foreground">
							No image
						</div>
					)}
				</button>

				<div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-0.5">
					<div className="min-w-0">
						{product.categoryName ? (
							<p className="mb-1 truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
								{product.categoryName}
							</p>
						) : null}
						<button
							type="button"
							onClick={() => onProductSelect?.(product)}
							className="line-clamp-2 text-left text-sm font-semibold leading-snug text-foreground hover:text-primary sm:text-base"
						>
							{product.name}
						</button>
						<p className="mt-1.5 text-base font-semibold tabular-nums text-foreground">{formattedPrice}</p>
					</div>

					<div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center">
						<button
							type="button"
							onClick={handleAddToCart}
							disabled={isPending}
							className={cn(
								"inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
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
					</div>
				</div>
			</div>

			{errorMessage ? <p className="mt-2 text-xs text-destructive">{errorMessage}</p> : null}
		</article>
	);
}
