import { getFeaturedProducts } from "@/lib/catalog/get-featured-products";
import { FEATURED_COLLECTION_IMAGE_SIZES } from "@/lib/images";
import { ProductGrid, type ProductGridDesktopColumns, transformToProductCard } from "@/ui/components/plp";
import { Section, type SectionTone, type SectionWidth } from "@/ui/sections/section";
import { SectionHeader, type SectionHeaderCta } from "@/ui/sections/section-header";

export interface FeaturedCollectionSectionProps {
	channel: string;
	heading?: string;
	eyebrow?: string;
	intro?: string;
	cta?: SectionHeaderCta;
	collectionSlug?: string;
	limit?: number;
	desktopColumns?: ProductGridDesktopColumns;
	tone?: SectionTone;
	width?: SectionWidth;
	className?: string;
}

export async function FeaturedCollectionSection({
	channel,
	heading = "Featured products",
	eyebrow,
	intro,
	cta,
	collectionSlug = "featured-products",
	limit = 8,
	desktopColumns = 4,
	tone = "default",
	width = "content",
	className,
}: FeaturedCollectionSectionProps) {
	const products = await getFeaturedProducts(channel, limit, collectionSlug);
	const productCards = products.map((product) => transformToProductCard(product, channel));
	const headingId = "featured-collection-heading";

	return (
		<Section
			tone={tone}
			width={width}
			className={className}
			aria-labelledby={heading ? headingId : undefined}
		>
			<SectionHeader
				id={headingId}
				eyebrow={eyebrow}
				heading={heading}
				intro={intro}
				cta={cta}
				className="mb-10"
			/>
			{productCards.length > 0 ? (
				<ProductGrid
					products={productCards}
					desktopColumns={desktopColumns}
					imageSizes={FEATURED_COLLECTION_IMAGE_SIZES}
				/>
			) : (
				<p className="text-muted-foreground">
					No featured products yet. Add products to the {collectionSlug} collection.
				</p>
			)}
		</Section>
	);
}
