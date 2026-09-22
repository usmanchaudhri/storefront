import { revalidatePath } from "next/cache";

import { CheckoutAddLineDocument } from "@/gql/graphql";
import { executeAuthenticatedGraphQL } from "@/lib/graphql";
import * as Checkout from "@/lib/checkout";
import { getStorefrontContent, buildPolicyLabelValues } from "@/lib/content/server";
import { resolveChannelCurrencyFromProduct } from "@/lib/channels/resolve-channel-currency";
import {
	getSelectionsFromVariant,
	groupVariantsByAttributes,
	type SaleorVariant,
} from "@/ui/components/pdp/variant-selection/utils";
import { resolveSelectedVariantId, type Product } from "@/ui/components/pdp/gallery-utils";
import { PdpVariantProvider } from "@/ui/components/pdp/pdp-variant-provider";
import { VariantBuyBox } from "@/ui/components/pdp/variant-buy-box";
import { VariantGalleryClient } from "@/ui/components/pdp/variant-gallery-client";
import { ProductAttributes } from "@/ui/components/pdp/product-attributes";
import { PDP_LAYOUT_CLASSES, PDP_GALLERY_LAYOUT } from "@/ui/components/pdp/gallery-layout";
import {
	LANDING_SLUG as SHILAJIT_LANDING_SLUG,
	PRODUCT_FACTS as SHILAJIT_PRODUCT_FACTS,
	shilajit7in1Landing,
	type ConversionLandingContent,
} from "@/config/landing/shilajit-7in1-new";
import {
	LandingTrustMatrix,
	type LandingTrustItem,
} from "@/ui/components/landing/shilajit-7in1-new/landing-trust-matrix";
import { cn } from "@/lib/utils";

interface LandingBuyIslandProps {
	product: Product;
	channel: string;
	searchParams: Promise<{ variant?: string }>;
	landingSlug?: string;
	productFacts?: { dailyUse: string };
	content?: Pick<ConversionLandingContent, "hero">;
	trustItems?: readonly LandingTrustItem[];
}

function extractProductAttributes(product: Product) {
	const variantAttributeSlugs = ["size", "color", "colour", "variant", "bundle"];
	const internalAttributeSlugs = ["care-instructions", "care"];

	return (product.attributes || [])
		.filter((attr) => attr.attribute.name)
		.filter((attr) => !variantAttributeSlugs.includes((attr.attribute.slug ?? "").toLowerCase()))
		.filter((attr) => !internalAttributeSlugs.includes((attr.attribute.slug ?? "").toLowerCase()))
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

function extractCareInstructions(product: Product): string | null {
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

/**
 * Figma-inspired hero purchase engine: gallery + live ATC.
 * Soft-syncs URLs to the landing slug so shoppers stay on this page.
 */
export async function LandingBuyIsland({
	product,
	channel,
	searchParams,
	landingSlug = SHILAJIT_LANDING_SLUG,
	productFacts = SHILAJIT_PRODUCT_FACTS,
	content = shilajit7in1Landing,
	trustItems,
}: LandingBuyIslandProps) {
	const { variant: variantParam } = await searchParams;
	const storefrontContent = await getStorefrontContent(channel);
	const currency = resolveChannelCurrencyFromProduct(product);
	const policyLabels = buildPolicyLabelValues(storefrontContent.policies, { currency });
	const productAttributes = extractProductAttributes(product);
	const careInstructions = extractCareInstructions(product);

	const landingProduct: Product = { ...product, slug: landingSlug };
	const initialVariantId = resolveSelectedVariantId(landingProduct, variantParam);
	const variants = (landingProduct.variants || []) as SaleorVariant[];
	const attributeGroups = groupVariantsByAttributes(variants);
	const initialSelections =
		initialVariantId && attributeGroups.length > 0
			? getSelectionsFromVariant(variants, initialVariantId)
			: {};

	async function addToCart(formData: FormData) {
		"use server";

		const selectedVariantID = String(formData.get("variantId") ?? "");
		if (!selectedVariantID) {
			return;
		}

		try {
			const checkout = await Checkout.findOrCreate({
				checkoutId: await Checkout.getIdFromCookies(channel),
				channel,
			});

			if (!checkout) {
				console.error("Landing add to cart: Failed to create checkout");
				return;
			}

			await Checkout.saveIdToCookie(channel, checkout.id);

			const addResult = await executeAuthenticatedGraphQL(CheckoutAddLineDocument, {
				variables: {
					id: checkout.id,
					productVariantId: decodeURIComponent(selectedVariantID),
					quantity: 1,
				},
				cache: "no-cache",
			});

			if (!addResult.ok) {
				console.error("Landing add to cart failed:", addResult.error.message);
				return;
			}

			revalidatePath("/cart");
		} catch (error) {
			console.error("Landing add to cart failed:", error);
		}
	}

	const layout = PDP_LAYOUT_CLASSES[PDP_GALLERY_LAYOUT];
	const productAttributesNode = (
		<ProductAttributes
			attributes={productAttributes}
			careInstructions={careInstructions}
			policyLabels={policyLabels}
			largeContent
		/>
	);

	return (
		<PdpVariantProvider
			product={landingProduct}
			channel={channel}
			initialVariantId={initialVariantId}
			initialSelections={initialSelections}
		>
			<div className={layout.grid}>
				<div className={layout.galleryColumn}>
					<div className="mb-3 flex flex-wrap gap-2 lg:hidden">
						{content.hero.badges.map((badge) => (
							<span
								key={badge}
								className="rounded-full bg-[#0B3D36] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
							>
								{badge}
							</span>
						))}
					</div>
					<VariantGalleryClient />
				</div>

				<div className={cn(layout.infoColumn, "gap-2")}>
					{/* order-2 title block — VariantBuyBox category is order-1 (same as original PDP) */}
					<div className="order-2">
						<div className="mb-3 hidden flex-wrap gap-2 lg:flex">
							{content.hero.badges.map((badge, i) => (
								<span
									key={badge}
									className={
										i === 0
											? "rounded-full bg-[#0B3D36] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
											: "rounded-full bg-[#C46A3A] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
									}
								>
									{badge}
								</span>
							))}
						</div>
						<h1 className="text-balance text-3xl font-semibold tracking-tight text-[#0B3D36] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
							{product.name}
						</h1>
						<p className="text-foreground/75 mt-3 max-w-xl text-base leading-relaxed">
							{content.hero.subtitle}
						</p>
					</div>
					<VariantBuyBox
						addToCartAction={addToCart}
						showDisclaimers={false}
						beforeSelection={productAttributesNode}
						afterAddToCart={<LandingTrustMatrix items={trustItems} />}
						stickyDetail={productFacts.dailyUse}
					/>
				</div>
			</div>
		</PdpVariantProvider>
	);
}
