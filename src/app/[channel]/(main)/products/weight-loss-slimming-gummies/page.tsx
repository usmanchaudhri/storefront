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
	weightLossLanding,
} from "@/config/landing/weight-loss-slimming";
import { LandingBuyIsland } from "@/ui/components/landing/shilajit-7in1-new/landing-buy-island";
import { ConversionLandingView } from "@/ui/components/landing/shilajit-7in1-new/landing-view";
import type { ConversionLandingContent } from "@/config/landing/shilajit-7in1-new";
import { VariantSectionSkeleton } from "@/ui/components/pdp";

const WEIGHT_LOSS_TRUST = [
	{
		id: "shipping",
		label: ["Free Shipping for", "Subscribers"],
		iconSrc: "/pdp/weight-loss-slimming-gummies-new/trust/shipping.svg",
	},
	{
		id: "guarantee",
		label: ["60-Day Guarantee"],
		iconSrc: "/pdp/weight-loss-slimming-gummies-new/trust/guarantee.svg",
	},
	{
		id: "sugar",
		label: ["3g Cane Sugar"],
		iconSrc: "/pdp/weight-loss-slimming-gummies-new/trust/sugar.svg",
	},
	{
		id: "pectin",
		label: ["100% Pectin Base", "(Zero Gelatin)"],
		iconSrc: "/pdp/weight-loss-slimming-gummies-new/trust/pectin.svg",
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
			`[weight-loss-landing] Failed to fetch product ${slug} for ${channel}:`,
			result.error.message,
		);
		return null;
	}

	return result.data.product;
}

export async function generateMetadata(props: { params: Promise<{ channel: string }> }): Promise<Metadata> {
	const params = await props.params;
	const product = await getProductData(PRODUCT_SLUG, params.channel);
	const { brand, productName, hero } = weightLossLanding;

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

export default async function WeightLossLandingPage(props: {
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
		description: product.seoDescription || weightLossLanding.hero.subtitle,
		images: productImages.length > 0 ? productImages : undefined,
		sku: product.variants?.[0]?.sku ?? undefined,
		brand: weightLossLanding.brand,
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

	const landingContent = weightLossLanding as unknown as ConversionLandingContent;

	return (
		<>
			<script {...jsonLdScriptProps(productJsonLd)} />
			<ConversionLandingView
				content={landingContent}
				buyIsland={
					<Suspense fallback={<VariantSectionSkeleton />}>
						<LandingBuyIsland
							product={product}
							channel={params.channel}
							searchParams={props.searchParams}
							landingSlug={LANDING_SLUG}
							productFacts={PRODUCT_FACTS}
							content={landingContent}
							trustItems={WEIGHT_LOSS_TRUST}
						/>
					</Suspense>
				}
			/>
		</>
	);
}
