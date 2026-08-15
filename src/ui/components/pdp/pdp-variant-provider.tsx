"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { channelHref } from "@/lib/channel-path";
import { getGalleryImages, resolveSelectedVariantId, type Product, type Variant } from "./gallery-utils";

type PdpVariantContextValue = {
	product: Product;
	channel: string;
	selectedVariantId: string | undefined;
	selectedVariant: Variant | undefined;
	galleryImages: ReturnType<typeof getGalleryImages>;
	/** Attribute slug → option id (value name). */
	selections: Record<string, string>;
	setSelections: (next: Record<string, string>, matchingVariantId?: string) => void;
	setVariantId: (variantId: string) => void;
};

const PdpVariantContext = createContext<PdpVariantContextValue | null>(null);

function syncProductUrl(channel: string, productSlug: string, params: URLSearchParams) {
	const query = params.toString();
	const path = `${channelHref(channel, `/products/${productSlug}`)}${query ? `?${query}` : ""}`;
	// Soft URL sync — avoids App Router RSC refetch / pending lock on every option click.
	window.history.replaceState(window.history.state, "", path);
}

export function PdpVariantProvider({
	product,
	channel,
	initialVariantId,
	initialSelections = {},
	children,
}: {
	product: Product;
	channel: string;
	initialVariantId?: string;
	initialSelections?: Record<string, string>;
	children: ReactNode;
}) {
	const [selectedVariantId, setSelectedVariantIdState] = useState<string | undefined>(
		() => initialVariantId ?? resolveSelectedVariantId(product, undefined),
	);
	const [selections, setSelectionsState] = useState<Record<string, string>>(initialSelections);

	const setSelections = useCallback(
		(next: Record<string, string>, matchingVariantId?: string) => {
			setSelectionsState(next);
			setSelectedVariantIdState(matchingVariantId);

			const params = new URLSearchParams();
			for (const [slug, value] of Object.entries(next)) {
				if (value) params.set(slug, value);
			}
			if (matchingVariantId) {
				params.set("variant", matchingVariantId);
			}
			syncProductUrl(channel, product.slug, params);
		},
		[channel, product.slug],
	);

	const setVariantId = useCallback(
		(variantId: string) => {
			setSelectedVariantIdState(variantId);
			setSelectionsState({});
			const params = new URLSearchParams();
			params.set("variant", variantId);
			syncProductUrl(channel, product.slug, params);
		},
		[channel, product.slug],
	);

	const selectedVariant = useMemo(
		() => product.variants?.find((variant) => variant.id === selectedVariantId),
		[product.variants, selectedVariantId],
	);

	const galleryImages = useMemo(() => getGalleryImages(product, selectedVariant), [product, selectedVariant]);

	const value = useMemo(
		() => ({
			product,
			channel,
			selectedVariantId,
			selectedVariant,
			galleryImages,
			selections,
			setSelections,
			setVariantId,
		}),
		[
			product,
			channel,
			selectedVariantId,
			selectedVariant,
			galleryImages,
			selections,
			setSelections,
			setVariantId,
		],
	);

	return <PdpVariantContext.Provider value={value}>{children}</PdpVariantContext.Provider>;
}

export function usePdpVariant() {
	const ctx = useContext(PdpVariantContext);
	if (!ctx) {
		throw new Error("usePdpVariant must be used within PdpVariantProvider");
	}
	return ctx;
}
