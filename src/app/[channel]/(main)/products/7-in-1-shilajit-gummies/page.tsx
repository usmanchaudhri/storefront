import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";

import { executePublicGraphQL } from "@/lib/graphql";
import { ProductDetailsDocument } from "@/gql/graphql";
import { buildPageMetadata, buildProductJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { channelHref } from "@/lib/channel-path";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { LANDING_SLUG, PRODUCT_SLUG, shilajit7in1Landing } from "@/config/landing/shilajit-7in1-new";
import { LandingBuyIsland } from "@/ui/components/landing/shilajit-7in1-new/landing-buy-island";
import { Shilajit7in1LandingView } from "@/ui/components/landing/shilajit-7in1-new/landing-view";
import { VariantSectionSkeleton } from "@/ui/components/pdp";

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
		console.error(`[shilajit-landing] Failed to fetch product ${slug} for ${channel}:`, result.error.message);
		return null;
	}

	return result.data.product;
}

export async function generateMetadata(props: { params: Promise<{ channel: string }> }): Promise<Metadata> {
	const params = await props.params;
	const product = await getProductData(PRODUCT_SLUG, params.channel);
	const { brand, productName, hero } = shilajit7in1Landing;

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

export default async function Shilajit7in1LandingPage(props: {
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
		description: product.seoDescription || shilajit7in1Landing.hero.subtitle,
		images: productImages.length > 0 ? productImages : undefined,
		sku: product.variants?.[0]?.sku ?? undefined,
		brand: shilajit7in1Landing.brand,
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

	return (
		<>
			<script {...jsonLdScriptProps(productJsonLd)} />
			<Shilajit7in1LandingView
				buyIsland={
					<Suspense fallback={<VariantSectionSkeleton />}>
						<LandingBuyIsland product={product} channel={params.channel} searchParams={props.searchParams} />
					</Suspense>
				}
			/>
		</>
	);
}
