import { revalidatePath } from "next/cache";

import { CheckoutAddLineDocument } from "@/gql/graphql";
import { executeAuthenticatedGraphQL } from "@/lib/graphql";
import * as Checkout from "@/lib/checkout";
import {
	getSelectionsFromVariant,
	groupVariantsByAttributes,
	type SaleorVariant,
} from "@/ui/components/pdp/variant-selection/utils";
import { resolveSelectedVariantId, type Product } from "@/ui/components/pdp/gallery-utils";
import { PdpVariantProvider } from "@/ui/components/pdp/pdp-variant-provider";
import { VariantBuyBox } from "@/ui/components/pdp/variant-buy-box";
import { VariantGalleryClient } from "@/ui/components/pdp/variant-gallery-client";
import { PdpReviewRating } from "@/ui/components/pdp/pdp-review-rating";
import { PDP_LAYOUT_CLASSES, PDP_GALLERY_LAYOUT } from "@/ui/components/pdp/gallery-layout";
import { LANDING_SLUG, shilajit7in1Landing } from "@/config/landing/shilajit-7in1-new";
import { LandingTrustMatrix } from "@/ui/components/landing/shilajit-7in1-new/landing-trust-matrix";

interface LandingBuyIslandProps {
	product: Product;
	channel: string;
	searchParams: Promise<{ variant?: string }>;
}

/**
 * Figma-inspired hero purchase engine: gallery + live ATC.
 * Soft-syncs URLs to the landing slug so shoppers stay on this page.
 */
export async function LandingBuyIsland({ product, channel, searchParams }: LandingBuyIslandProps) {
	const { variant: variantParam } = await searchParams;
	const landingProduct: Product = { ...product, slug: LANDING_SLUG };
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
						{shilajit7in1Landing.hero.badges.map((badge) => (
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

				<div className={layout.infoColumn}>
					{/* order-2 title block — VariantBuyBox category is order-1 (same as original PDP) */}
					<div className="order-2">
						<div className="mb-3 hidden flex-wrap gap-2 lg:flex">
							{shilajit7in1Landing.hero.badges.map((badge, i) => (
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
						<PdpReviewRating label="KayaPure product" />
						<p className="text-foreground/75 mt-3 max-w-xl text-base leading-relaxed">
							{shilajit7in1Landing.hero.subtitle}
						</p>
					</div>
					<VariantBuyBox
						addToCartAction={addToCart}
						showDisclaimers={false}
						afterAddToCart={<LandingTrustMatrix />}
					/>
				</div>
			</div>
		</PdpVariantProvider>
	);
}
