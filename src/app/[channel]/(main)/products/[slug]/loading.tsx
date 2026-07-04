import { ProductRouteSkeleton } from "@/ui/components/pdp/product-route-skeleton";

/**
 * Product page skeleton — fallback for client navigations and cache misses.
 *
 * Uses delayed visibility (500ms) to prevent flash on fast loads.
 * Layout mirrors {@link ProductRouteSkeleton} / live PDP shell via {@link PDP_GALLERY_LAYOUT}.
 */
export default function ProductLoading() {
	return <ProductRouteSkeleton surface="route" />;
}
