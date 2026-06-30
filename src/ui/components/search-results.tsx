import Link from "next/link";
import Image from "next/image";
import type { SearchProduct } from "@/lib/search";
import { channelHref } from "@/lib/channel-path";
import { localeConfig } from "@/config/locale";

interface SearchResultsProps {
	products: SearchProduct[];
	channel: string;
	compact?: boolean;
	onProductClick?: () => void;
}

/**
 * Renders search results from any search provider.
 * Uses the common SearchProduct type for provider independence.
 */
export function SearchResults({ products, channel, compact = false, onProductClick }: SearchResultsProps) {
	if (products.length === 0) {
		return null;
	}

	return (
		<ul
			role="list"
			className={
				compact
					? "grid grid-cols-2 gap-3 sm:grid-cols-3"
					: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
			}
		>
			{products.map((product, index) => (
				<li key={product.id}>
					<SearchResultCard
						product={product}
						channel={channel}
						priority={index < 2}
						compact={compact}
						onProductClick={onProductClick}
					/>
				</li>
			))}
		</ul>
	);
}

function SearchResultCard({
	product,
	channel,
	priority,
	compact = false,
	onProductClick,
}: {
	product: SearchProduct;
	channel: string;
	priority?: boolean;
	compact?: boolean;
	onProductClick?: () => void;
}) {
	const formattedPrice = new Intl.NumberFormat(localeConfig.default, {
		style: "currency",
		currency: product.currency,
	}).format(product.price);

	return (
		<Link
			href={channelHref(channel, `/products/${product.slug}`)}
			onClick={onProductClick}
			className="hover:border-foreground/20 group block overflow-hidden rounded-lg border border-border bg-card transition-colors"
		>
			{/* Image */}
			<div className="relative aspect-square overflow-hidden bg-muted">
				{product.thumbnailUrl ? (
					<Image
						src={product.thumbnailUrl}
						alt={product.thumbnailAlt || product.name}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						priority={priority}
					/>
				) : (
					<div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
				)}
			</div>

			{/* Content */}
			<div className={compact ? "p-2.5" : "p-4"}>
				{product.categoryName && !compact ? (
					<p className="mb-1 text-xs text-muted-foreground">{product.categoryName}</p>
				) : null}
				<h3
					className={
						compact
							? "line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:underline"
							: "font-medium leading-tight text-foreground group-hover:underline"
					}
				>
					{product.name}
				</h3>
				<p
					className={
						compact ? "mt-1 text-sm font-semibold text-foreground" : "mt-2 font-semibold text-foreground"
					}
				>
					{formattedPrice}
				</p>
			</div>
		</Link>
	);
}
