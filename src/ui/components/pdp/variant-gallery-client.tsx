"use client";

import dynamic from "next/dynamic";
import { PDP_GALLERY_LAYOUT } from "./gallery-layout";
import { ImmersiveGallerySkeleton } from "./immersive-gallery-fallback";
import { MosaicGallerySkeleton } from "./mosaic-gallery-fallback";
import { ProductGalleryShell } from "./product-gallery-shell";
import { galleryImageFrameClass } from "@/ui/components/shared/gallery-image-frame";
import { usePdpVariant } from "./pdp-variant-provider";

function StandardGallerySkeleton() {
	return (
		<ProductGalleryShell imageCount={1} showChrome={false}>
			<div className={galleryImageFrameClass("aspect-[4/5] w-full animate-pulse bg-muted")} />
		</ProductGalleryShell>
	);
}

const Gallery =
	PDP_GALLERY_LAYOUT === "immersive"
		? dynamic(() => import("./immersive-gallery").then((mod) => mod.ImmersiveGallery), {
				loading: () => <ImmersiveGallerySkeleton />,
			})
		: PDP_GALLERY_LAYOUT === "mosaic"
			? dynamic(() => import("./mosaic-gallery").then((mod) => mod.MosaicGallery), {
					loading: () => <MosaicGallerySkeleton />,
				})
			: dynamic(() => import("./product-gallery").then((mod) => mod.ProductGallery), {
					loading: () => <StandardGallerySkeleton />,
				});

/**
 * Client gallery island — switches images from in-memory variant data
 * when the buy-box selection changes (no RSC round-trip).
 */
export function VariantGalleryClient() {
	const { product, galleryImages } = usePdpVariant();
	return <Gallery images={galleryImages} productName={product.name} />;
}
