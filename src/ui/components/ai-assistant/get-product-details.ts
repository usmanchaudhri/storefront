"use server";

import { ProductDetailsDocument } from "@/gql/graphql";
import { localeConfig } from "@/config/locale";
import { parseEditorJSToText } from "@/lib/editorjs";
import { executePublicGraphQL } from "@/lib/graphql";

export type AssistantProductDetail = {
	id: string;
	name: string;
	slug: string;
	categoryName: string | null;
	price: number;
	currency: string;
	description: string | null;
	imageUrl: string | null;
	imageAlt: string | null;
	gallery: Array<{ url: string; alt: string | null }>;
};

export type AssistantProductDetailsResult =
	| { ok: true; product: AssistantProductDetail }
	| { ok: false; error: string };

export async function getAssistantProductDetails(
	channel: string,
	slug: string,
): Promise<AssistantProductDetailsResult> {
	const trimmedChannel = channel.trim();
	const trimmedSlug = slug.trim();

	if (!trimmedChannel || !trimmedSlug) {
		return { ok: false, error: "Missing product information" };
	}

	try {
		const result = await executePublicGraphQL(ProductDetailsDocument, {
			variables: { slug: trimmedSlug, channel: trimmedChannel },
			cache: "no-cache",
		});

		if (!result.ok) {
			return { ok: false, error: "Could not load product details" };
		}

		const product = result.data.product;
		if (!product) {
			return { ok: false, error: "Product not found" };
		}

		const gallery = (product.media ?? [])
			.filter((item) => Boolean(item.mainUrl))
			.map((item) => ({
				url: item.mainUrl,
				alt: item.alt ?? null,
			}));

		const primaryImage = product.thumbnail?.url ?? gallery[0]?.url ?? null;

		return {
			ok: true,
			product: {
				id: product.id,
				name: product.name,
				slug: product.slug,
				categoryName: product.category?.name ?? null,
				price: product.pricing?.priceRange?.start?.gross.amount ?? 0,
				currency: product.pricing?.priceRange?.start?.gross.currency ?? localeConfig.fallbackCurrency,
				description: parseEditorJSToText(product.description),
				imageUrl: primaryImage,
				imageAlt: product.thumbnail?.alt ?? gallery[0]?.alt ?? product.name,
				gallery,
			},
		};
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Could not load product details",
		};
	}
}
