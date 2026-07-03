import type { BlogPostListItemFragment, PageGetBySlugQuery } from "@/gql/graphql";
import type { ProductListItemFragment } from "@/gql/graphql";

export const BLOG_POST_PAGE_TYPE_SLUG = "blog-post";

type PageNode = NonNullable<PageGetBySlugQuery["page"]>;
type BlogPostListNode = BlogPostListItemFragment;
type AssignedAttribute = PageNode["assignedAttributes"][number];
type ListAssignedAttribute = BlogPostListNode["assignedAttributes"][number];

export type BlogPostSummary = {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	coverImageUrl: string | null;
	tags: string[];
	publishedAt: string | null;
};

export type BlogPostData = {
	title: string;
	slug: string;
	excerpt: string | null;
	author: string | null;
	coverImageUrl: string | null;
	coverImageAlt: string | null;
	tags: string[];
	relatedProducts: ProductListItemFragment[];
	publishedAt: string | null;
	contentHtml: string[] | null;
};

function getAttributeSlug(attribute: AssignedAttribute): string {
	return attribute.attribute.slug;
}

function getPlainText(attribute: AssignedAttribute): string | null {
	if ("plainText" in attribute && typeof attribute.plainText === "string" && attribute.plainText.trim()) {
		return attribute.plainText.trim();
	}

	return null;
}

function getTags(attribute: AssignedAttribute): string[] {
	if (!("choices" in attribute) || !attribute.choices) {
		return [];
	}

	return attribute.choices.map((choice) => choice?.name).filter((name): name is string => Boolean(name));
}

function getRelatedProducts(attributes: AssignedAttribute[]): ProductListItemFragment[] {
	const products: ProductListItemFragment[] = [];

	for (const attribute of attributes) {
		if ("relatedProducts" in attribute && attribute.relatedProducts?.length) {
			products.push(...attribute.relatedProducts);
		}

		if ("relatedProduct" in attribute && attribute.relatedProduct) {
			products.push(attribute.relatedProduct);
		}
	}

	const seen = new Set<string>();
	return products.filter((product) => {
		if (seen.has(product.id)) {
			return false;
		}
		seen.add(product.id);
		return true;
	});
}

export function isBlogPostPage(page: PageNode): boolean {
	return page.pageType?.slug === BLOG_POST_PAGE_TYPE_SLUG;
}

function parseListAttributeFields(attributes: ListAssignedAttribute[]) {
	const attributeBySlug = new Map(attributes.map((attribute) => [attribute.attribute.slug, attribute]));
	const excerptAttribute = attributeBySlug.get("excerpt");
	const coverAttribute = attributeBySlug.get("coverimage");
	const tagsAttribute = attributeBySlug.get("tags");

	const coverImageUrl =
		coverAttribute && "file" in coverAttribute && coverAttribute.file?.url ? coverAttribute.file.url : null;

	return {
		excerpt: excerptAttribute ? getPlainTextFromListAttribute(excerptAttribute) : null,
		coverImageUrl,
		tags: tagsAttribute ? getTagsFromListAttribute(tagsAttribute) : [],
	};
}

function getPlainTextFromListAttribute(attribute: ListAssignedAttribute): string | null {
	if ("plainText" in attribute && typeof attribute.plainText === "string" && attribute.plainText.trim()) {
		return attribute.plainText.trim();
	}

	return null;
}

function getTagsFromListAttribute(attribute: ListAssignedAttribute): string[] {
	if (!("choices" in attribute) || !attribute.choices) {
		return [];
	}

	return attribute.choices.map((choice) => choice?.name).filter((name): name is string => Boolean(name));
}

export function parseBlogPostSummary(page: BlogPostListNode): BlogPostSummary {
	const { excerpt, coverImageUrl, tags } = parseListAttributeFields(page.assignedAttributes ?? []);

	return {
		id: page.id,
		title: page.title,
		slug: page.slug,
		excerpt,
		coverImageUrl,
		tags,
		publishedAt: page.publishedAt ?? null,
	};
}

export function parseBlogPostFromPage(page: PageNode, contentHtml: string[] | null): BlogPostData {
	const attributes = page.assignedAttributes ?? [];
	const attributeBySlug = new Map(attributes.map((attribute) => [getAttributeSlug(attribute), attribute]));

	const excerptAttribute = attributeBySlug.get("excerpt");
	const authorAttribute = attributeBySlug.get("author");
	const coverAttribute = attributeBySlug.get("coverimage");
	const tagsAttribute = attributeBySlug.get("tags");

	const coverImageUrl =
		coverAttribute && "file" in coverAttribute && coverAttribute.file?.url ? coverAttribute.file.url : null;

	return {
		title: page.title,
		slug: page.slug,
		excerpt: excerptAttribute ? getPlainText(excerptAttribute) : null,
		author: authorAttribute ? getPlainText(authorAttribute) : null,
		coverImageUrl,
		coverImageAlt: page.title,
		tags: tagsAttribute ? getTags(tagsAttribute) : [],
		relatedProducts: getRelatedProducts(attributes),
		publishedAt: page.publishedAt ?? null,
		contentHtml,
	};
}
