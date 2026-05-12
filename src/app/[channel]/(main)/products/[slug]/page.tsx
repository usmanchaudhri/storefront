import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Image from "next/image";
import { ErrorBoundary } from "react-error-boundary";
import edjsHTML from "editorjs-html";
import xss from "xss";

import { executePublicGraphQL } from "@/lib/graphql";
import { ProductDetailsDocument, type ProductDetailsQuery } from "@/gql/graphql";
import { buildPageMetadata, buildProductJsonLd } from "@/lib/seo";
import { stripShippingReturnsCtaFromHtml } from "@/lib/strip-pdp-shipping-returns-cta";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import {
	getPdpBottomBannerAttributeSlugs,
	getPdpPackageConfigAttributeSlugs,
	type PdpBottomBanner,
} from "@/config/pdp-layout";
import { Breadcrumbs } from "@/ui/components/breadcrumbs";
import {
	ProductGallery,
	ProductAttributes,
	VariantSectionDynamic,
	VariantSectionSkeleton,
	VariantSectionError,
} from "@/ui/components/pdp";

// ============================================================================
// Cached Data Fetching
// ============================================================================

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
		console.error(`[getProductData] Failed to fetch product ${slug} for ${channel}:`, result.error.message);
		return null;
	}

	return result.data.product;
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata(props: {
	params: Promise<{ slug: string; channel: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const product = await getProductData(params.slug, params.channel);

	if (!product) {
		return { title: "Product Not Found" };
	}

	const description = product.seoDescription || product.name;
	const ogImage = product.media?.[0]?.mainUrl || product.thumbnail?.url;
	const priceAmount = product.pricing?.priceRange?.start?.gross?.amount;
	const priceCurrency = product.pricing?.priceRange?.start?.gross?.currency;

	return buildPageMetadata({
		title: product.seoTitle || product.name,
		description,
		image: ogImage,
		url: `/${params.channel}/products/${encodeURIComponent(params.slug)}`,
		openGraph:
			priceAmount && priceCurrency
				? {
						"product:price:amount": String(priceAmount),
						"product:price:currency": priceCurrency,
					}
				: undefined,
	});
}

// NOTE: generateStaticParams is intentionally omitted for product pages.
// All product pages are generated on-demand via ISR instead.

// ============================================================================
// Page Component
// ============================================================================

const parser = edjsHTML();

/**
 * Sync page shell with dedicated Suspense boundary.
 * All cached product data + dynamic variant section stream inside
 * this boundary, not through the layout's main Suspense.
 */
export default function ProductPage(props: {
	params: Promise<{ slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	return (
		<Suspense fallback={<ProductPageSkeleton />}>
			<ProductContent params={props.params} searchParams={props.searchParams} />
		</Suspense>
	);
}

async function ProductContent({
	params: paramsPromise,
	searchParams: searchParamsPromise,
}: {
	params: Promise<{ slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);

	const product = await getProductData(params.slug, params.channel);

	if (!product) {
		notFound();
	}

	const variants = product.variants || [];
	const selectedVariantId = searchParams.variant || (variants.length === 1 ? variants[0].id : undefined);
	const selectedVariant = variants.find((v) => v.id === selectedVariantId);

	const descriptionHtml = parseDescription(product.description);
	const images = getGalleryImages(product, selectedVariant);
	const productAttributes = extractProductAttributes(product);
	const careInstructions = extractCareInstructions(product);
	const bottomBanner = extractPdpBottomBanner(product);

	const breadcrumbs = [
		{ label: "Home", href: `/${params.channel}` },
		...(product.category
			? [{ label: product.category.name, href: `/${params.channel}/categories/${product.category.slug}` }]
			: []),
		{ label: product.name },
	];

	const productJsonLd = buildProductJsonLd({
		name: product.name,
		description: product.seoDescription || product.name,
		images: images.length > 0 ? images.map((img) => img.url) : undefined,
		brand: product.category?.name,
		url: `/${params.channel}/products/${product.slug}`,
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

	const lcpImageUrl = images[0]?.url;

	return (
		<div className="flex min-h-screen flex-col bg-background">
			{lcpImageUrl && <link rel="preload" as="image" href={lcpImageUrl} fetchPriority="high" />}

			{productJsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
				/>
			)}

			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
				<div className="mb-6 hidden sm:block">
					<Breadcrumbs items={breadcrumbs} />
				</div>

				<div className="grid gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
					<div className="lg:sticky lg:top-24 lg:max-w-[720px] lg:self-start xl:max-w-[760px]">
						<ProductGallery images={images} productName={product.name} />
					</div>

					<div className="flex flex-col gap-3">
						<div className="order-2 flex flex-col gap-1.5">
							<h1 className="text-balance text-3xl font-semibold tracking-tight lg:text-4xl">
								{product.name}
							</h1>
							{descriptionHtml && descriptionHtml.length > 0 && (
								<div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-strong:text-foreground [&_p:first-child]:mt-0">
									{descriptionHtml.map((html) => (
										<div key={html} dangerouslySetInnerHTML={{ __html: html }} />
									))}
								</div>
							)}
						</div>

						<ProductAttributes
							className="order-4"
							attributes={productAttributes}
							careInstructions={careInstructions}
						/>

						<div className="order-5">
							<ErrorBoundary FallbackComponent={VariantSectionError}>
								<Suspense fallback={<VariantSectionSkeleton />}>
									<VariantSectionDynamic
										product={product}
										channel={params.channel}
										searchParams={searchParamsPromise}
									/>
								</Suspense>
							</ErrorBoundary>
						</div>
					</div>
				</div>
			</main>

			{bottomBanner && (
				<section className="w-full pb-10 pt-2 sm:pb-12 lg:pb-16">
					<Image
						src={bottomBanner.url}
						alt={bottomBanner.alt}
						width={1536}
						height={864}
						className="h-auto w-full object-cover"
						sizes="100vw"
						priority={false}
					/>
				</section>
			)}
		</div>
	);
}

// ============================================================================
// Skeleton
// ============================================================================

function ProductPageSkeleton() {
	return (
		<div className="flex min-h-screen animate-skeleton-delayed flex-col bg-background opacity-0">
			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
				<div className="mb-6 hidden h-4 w-64 animate-pulse rounded bg-secondary sm:block" />
				<div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
					<div className="aspect-square animate-pulse rounded-lg bg-secondary" />
					<div className="flex flex-col gap-4">
						<div className="h-8 w-3/4 animate-pulse rounded bg-secondary" />
						<div className="h-6 w-24 animate-pulse rounded bg-secondary" />
						<div className="mt-4 space-y-3">
							<div className="h-10 w-full animate-pulse rounded bg-secondary" />
							<div className="h-10 w-full animate-pulse rounded bg-secondary" />
						</div>
						<div className="mt-4 h-12 w-full animate-pulse rounded bg-secondary" />
					</div>
				</div>
			</main>
		</div>
	);
}

// ============================================================================
// Helper Functions
// ============================================================================

function parseDescription(description: string | null | undefined): string[] | null {
	if (!description) return null;

	try {
		const parsed = parser.parse(JSON.parse(description));
		return parsed.map((html: string) => stripShippingReturnsCtaFromHtml(xss(html))).filter(Boolean);
	} catch {
		return [stripShippingReturnsCtaFromHtml(xss(`<p>${description}</p>`))].filter(Boolean);
	}
}

function extractProductAttributes(product: NonNullable<ProductDetailsQuery["product"]>) {
	const variantAttributeSlugs = ["size", "color", "colour", "variant"];
	const internalAttributeSlugs = ["care-instructions", "care"];
	const layoutAttributeSlugs = new Set([
		...getPdpBottomBannerAttributeSlugs(),
		...getPdpPackageConfigAttributeSlugs(),
	]);

	return (product.attributes || [])
		.filter((attr) => attr.attribute.name)
		.filter((attr) => !variantAttributeSlugs.includes((attr.attribute.slug ?? "").toLowerCase()))
		.filter((attr) => !internalAttributeSlugs.includes((attr.attribute.slug ?? "").toLowerCase()))
		.filter((attr) => !layoutAttributeSlugs.has((attr.attribute.slug ?? "").toLowerCase()))
		.map((attr) => ({
			name: attr.attribute.name!,
			value:
				attr.values.length === 1
					? attr.values[0]?.name ?? ""
					: attr.values.map((v) => v.name ?? "").filter(Boolean),
		}))
		.filter((attr) => {
			if (Array.isArray(attr.value)) return attr.value.length > 0;
			return attr.value !== "";
		});
}

function extractCareInstructions(product: NonNullable<ProductDetailsQuery["product"]>): string | null {
	const careAttr = (product.attributes || []).find(
		(attr) =>
			attr.attribute.slug === "care-instructions" ||
			attr.attribute.slug === "care" ||
			(attr.attribute.name ?? "").toLowerCase().includes("care"),
	);

	return (
		careAttr?.values
			.map((v) => v.name)
			.filter(Boolean)
			.join(". ") || null
	);
}

type Product = NonNullable<ProductDetailsQuery["product"]>;
type Variant = NonNullable<Product["variants"]>[number];

function getGalleryImages(
	product: Product,
	selectedVariant: Variant | null | undefined,
): { url: string; thumbnailUrl?: string; alt: string | null | undefined }[] {
	if (selectedVariant?.media && selectedVariant.media.length > 0) {
		const variantImages = selectedVariant.media
			.filter((m) => m.type === "IMAGE")
			.map((m) => ({ url: m.mainUrl, thumbnailUrl: m.thumbnailUrl, alt: m.alt }));
		if (variantImages.length > 0) {
			return variantImages;
		}
	}

	if (product.media && product.media.length > 0) {
		return product.media
			.filter((m) => m.type === "IMAGE")
			.map((m) => ({ url: m.mainUrl, thumbnailUrl: m.thumbnailUrl, alt: m.alt }));
	}

	if (product.thumbnail) {
		return [{ url: product.thumbnail.url, alt: product.thumbnail.alt }];
	}

	return [];
}

function extractPdpBottomBanner(
	product: NonNullable<ProductDetailsQuery["product"]>,
): PdpBottomBanner | null {
	const slugs = getPdpBottomBannerAttributeSlugs();
	for (const slug of slugs) {
		const attr = (product.attributes || []).find((a) => (a.attribute.slug ?? "").toLowerCase() === slug);
		const first = attr?.values?.[0];
		if (!first) continue;

		const fileUrl = first.file?.url;
		const raw = [first.value?.trim(), first.name?.trim()].find((s) => s && s.length > 0);
		const textUrl = raw && isLikelyImageUrl(raw) ? raw : null;

		const url = fileUrl || textUrl;
		if (url) {
			return {
				url,
				alt: `${product.name} — details banner`,
			};
		}
	}

	return null;
}

function isLikelyImageUrl(s: string): boolean {
	if (/^https?:\/\//i.test(s)) return true;
	// protocol-relative or absolute path (pair with same-origin / configured media host if needed)
	if (s.startsWith("//")) return true;
	return false;
}
