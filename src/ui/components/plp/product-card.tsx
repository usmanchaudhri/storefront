"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProductCardData {
	id: string;
	name: string;
	slug: string;
	brand?: string | null;
	price: number;
	compareAtPrice?: number | null;
	currency: string;
	image: string;
	imageAlt?: string;
	hoverImage?: string | null;
	href: string;
	badge?: "Sale" | "New" | null;
	colors?: { name: string; hex: string }[];
	/** Available sizes for filtering (e.g., ["S", "M", "L"]) */
	sizes?: string[];
	/** Category for filtering */
	category?: { id: string; name: string; slug: string } | null;
	/** ISO date string for "newest" sorting */
	createdAt?: string | null;
	/** Whether this product has variants requiring selection (no quick add) */
	hasVariants?: boolean;
	/** Callback for quick add - if provided and no variants, enables quick add */
	onQuickAdd?: (productId: string) => void;
}

interface ProductCardProps {
	product: ProductCardData;
	priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
	const canQuickAdd = !product.hasVariants && product.onQuickAdd;

	const handleQuickAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		product.onQuickAdd?.(product.id);
	};

	const formatPrice = (amount: number, currency: string) => {
		return new Intl.NumberFormat("en", {
			style: "currency",
			currency: currency,
		}).format(amount);
	};

	return (
		<article className="group">
			<Link href={product.href} className="block">
				{/* Image Container */}
				<div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-xl bg-secondary sm:mb-4">
					{/* Primary Image */}
					<Image
						src={product.image}
						alt={product.imageAlt || product.name}
						fill
						sizes="(max-width: 640px) 45vw, (max-width: 1024px) 50vw, 33vw"
						className={cn(
							"object-cover transition-all duration-500 ease-out md:group-hover:scale-105",
							product.hoverImage && "md:group-hover:opacity-0",
						)}
						priority={priority}
					/>

					{/* Hover Image - desktop only to avoid double-tap on touch */}
					{product.hoverImage && (
						<Image
							src={product.hoverImage}
							alt={`${product.name} - alternate view`}
							fill
							sizes="(max-width: 640px) 45vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover opacity-0 transition-all duration-500 ease-out md:group-hover:scale-105 md:group-hover:opacity-100"
						/>
					)}

					{/* Badge */}
					{product.badge && (
						<Badge
							variant={product.badge === "Sale" ? "destructive" : "default"}
							className="absolute left-2 top-2 px-2 py-1 text-xs sm:left-3 sm:top-3 sm:px-2.5 sm:py-0.5"
						>
							{product.badge}
						</Badge>
					)}

					{/* Quick Add Overlay - desktop only to avoid double-tap on touch */}
					{canQuickAdd && (
						<div className="absolute bottom-0 left-0 right-0 hidden translate-y-2 p-3 opacity-0 transition-all duration-300 md:block md:group-hover:translate-y-0 md:group-hover:opacity-100">
							<Button className="w-full" size="sm" onClick={handleQuickAdd} type="button">
								<Plus className="mr-1.5 h-4 w-4" />
								Quick Add
							</Button>
						</div>
					)}
				</div>

				{/* Product Info — slightly larger type on small screens for readability */}
				<div className="space-y-2">
					{product.brand && (
						<p className="text-sm leading-normal tracking-wide text-muted-foreground">{product.brand}</p>
					)}
					<h3 className="line-clamp-2 text-base font-medium leading-snug text-foreground underline-offset-2 sm:text-[1.0625rem] md:group-hover:underline">
						{product.name}
					</h3>

					{/* Color Swatches */}
					{product.colors && product.colors.length > 1 && (
						<div className="flex items-center gap-2 pt-0.5 sm:gap-1.5 sm:pt-1">
							{product.colors.slice(0, 4).map((color) => (
								<span
									key={color.name}
									className="h-5 w-5 shrink-0 rounded-full border border-border sm:h-4 sm:w-4"
									style={{ backgroundColor: color.hex }}
									title={color.name}
								/>
							))}
							{product.colors.length > 4 && (
								<span className="ml-0.5 text-sm text-muted-foreground sm:text-xs">
									+{product.colors.length - 4}
								</span>
							)}
						</div>
					)}

					{/* Price */}
					{product.compareAtPrice ? (
						<div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-1">
							<span className="text-base font-semibold tabular-nums text-foreground sm:text-lg">
								{formatPrice(product.price, product.currency)}
							</span>
							<span className="text-sm font-medium tabular-nums text-muted-foreground line-through sm:text-base">
								{formatPrice(product.compareAtPrice, product.currency)}
							</span>
						</div>
					) : (
						<div className="pt-1">
							<span className="text-base font-semibold tabular-nums text-foreground sm:text-lg">
								{formatPrice(product.price, product.currency)}
							</span>
						</div>
					)}
				</div>
			</Link>
		</article>
	);
}
