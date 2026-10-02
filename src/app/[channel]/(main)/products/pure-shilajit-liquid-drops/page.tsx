import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";

import { executePublicGraphQL } from "@/lib/graphql";
import { ProductDetailsDocument } from "@/gql/graphql";
import { buildPageMetadata, buildProductJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { channelHref } from "@/lib/channel-path";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import {
	LANDING_SLUG,
	PRODUCT_FACTS,
	PRODUCT_SLUG,
	shilajitDropsLanding,
} from "@/config/landing/pure-shilajit-liquid-drops";
import { LandingBuyIsland } from "@/ui/components/landing/shilajit-7in1-new/landing-buy-island";
import { ConversionLandingView } from "@/ui/components/landing/shilajit-7in1-new/landing-view";
import type { ConversionLandingContent } from "@/config/landing/shilajit-7in1-new";
import { VariantSectionSkeleton } from "@/ui/components/pdp";

const SHILAJIT_DROPS_TRUST = [
	{
		id: "shipping",
		label: ["Free Shipping for", "Subscribers"],
		iconSrc: "/pdp/pure-shilajit-liquid-drops-new/trust/shipping.svg",
	},
	{
		id: "guarantee",
		label: ["60-Day Guarantee"],
		iconSrc: "/pdp/pure-shilajit-liquid-drops-new/trust/guarantee.svg",
	},
	{
		id: "format",
		label: ["Liquid Drop", "Format"],
		iconSrc: "/pdp/pure-shilajit-liquid-drops-new/trust/pectin.svg",
	},
	{
		id: "size",
		label: ["30ml Bottle"],
		iconSrc: "/pdp/pure-shilajit-liquid-drops-new/trust/sugar.svg",
	},
] as const;

async function getProductData(slug: string, channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.products, slug);

	const result = await executePublicGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(slug),
			channel,
		},
		revalidate: 300,
	});

	if (!result.ok) {
		console.error(
			`[shilajit-drops-landing] Failed to fetch product ${slug} for ${channel}:`,
			result.error.message,
		);
		return null;
	}

	return result.data.product;
}

export async function generateMetadata(props: { params: Promise<{ channel: string }> }): Promise<Metadata> {
	const params = await props.params;
	const product = await getProductData(PRODUCT_SLUG, params.channel);
	const { brand, productName, hero } = shilajitDropsLanding;

	const title = product?.seoTitle || `${productName} | ${brand}`;
	const description = product?.seoDescription || hero.subtitle;

	return buildPageMetadata({
		title,
		description,
		image: product?.media?.[0]?.mainUrl || product?.thumbnail?.url,
		url: channelHref(params.channel, `/products/${LANDING_SLUG}`),
		openGraph:
			product?.pricing?.priceRange?.start?.gross?.amount &&
			product?.pricing?.priceRange?.start?.gross?.currency
				? {
						"product:price:amount": String(product.pricing.priceRange.start.gross.amount),
						"product:price:currency": product.pricing.priceRange.start.gross.currency,
					}
				: undefined,
	});
}

export default async function ShilajitDropsLandingPage(props: {
	params: Promise<{ channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const params = await props.params;
	const product = await getProductData(PRODUCT_SLUG, params.channel);

	if (!product) {
		notFound();
	}

	const productImages =
		product.media
			?.filter((m) => m.type === "IMAGE" && m.mainUrl)
			.map((m) => m.mainUrl)
			.filter(Boolean) ?? [];
	if (productImages.length === 0 && product.thumbnail?.url) {
		productImages.push(product.thumbnail.url);
	}

	const productJsonLd = buildProductJsonLd({
		name: product.name,
		description: product.seoDescription || shilajitDropsLanding.hero.subtitle,
		images: productImages.length > 0 ? productImages : undefined,
		sku: product.variants?.[0]?.sku ?? undefined,
		brand: shilajitDropsLanding.brand,
		url: channelHref(params.channel, `/products/${LANDING_SLUG}`),
		priceRange: product.pricing?.priceRange?.start?.gross
			? {
					lowPrice: product.pricing.priceRange.start.gross.amount,
					highPrice:
						product.pricing.priceRange.stop?.gross?.amount || product.pricing.priceRange.start.gross.amount,
					currency: product.pricing.priceRange.start.gross.currency,
				}
			: null,
		inStock: product.variants?.some((v) => v.quantityAvailable) ?? false,
		variantCount: product.variants?.length ?? 0,
	});

	const landingContent = shilajitDropsLanding as unknown as ConversionLandingContent;

	return (
		<>
			<script {...jsonLdScriptProps(productJsonLd)} />
			<ConversionLandingView
				content={landingContent}
				breadcrumbs={[
					{ label: "Home", href: channelHref(params.channel, "/") },
					...(product.category
						? [
								{
									label: product.category.name,
									href: channelHref(params.channel, `/categories/${product.category.slug}`),
								},
							]
						: []),
					{ label: product.name },
				]}
				buyIsland={
					<Suspense fallback={<VariantSectionSkeleton />}>
						<LandingBuyIsland
							product={product}
							channel={params.channel}
							searchParams={props.searchParams}
							landingSlug={LANDING_SLUG}
							productFacts={PRODUCT_FACTS}
							content={landingContent}
							trustItems={SHILAJIT_DROPS_TRUST}
						/>
					</Suspense>
				}
			/>
		</>
	);
}
