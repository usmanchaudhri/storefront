import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { PageGetBySlugDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { buildPageMetadata } from "@/lib/seo";
import { isBlogPostPage, parseBlogPostFromPage } from "@/lib/pages/blog-post";
import { parseEditorJsContent } from "@/lib/pages/parse-editorjs-content";
import { channelHref } from "@/lib/channel-path";
import { BlogPostView } from "@/ui/components/pages/blog-post-view";
import { CmsPageView } from "@/ui/components/pages/cms-page-view";

type PageProps = {
	params: Promise<{ slug: string; channel: string }>;
};

async function getPage(slug: string, channel: string) {
	const result = await executePublicGraphQL(PageGetBySlugDocument, {
		variables: { slug, channel },
		revalidate: 60,
	});

	if (!result.ok || !result.data.page) {
		return null;
	}

	return result.data.page;
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
	const params = await props.params;
	const page = await getPage(params.slug, params.channel);

	if (!page) {
		return buildPageMetadata({
			title: "Page not found",
		});
	}

	const contentHtml = parseEditorJsContent(page.content);
	const isBlogPost = isBlogPostPage(page);
	const blogPost = isBlogPost ? parseBlogPostFromPage(page, contentHtml) : null;

	return buildPageMetadata({
		title: page.seoTitle || page.title,
		description: page.seoDescription || blogPost?.excerpt || page.seoTitle || page.title,
		image: blogPost?.coverImageUrl,
		url: channelHref(params.channel, `/pages/${page.slug}`),
		openGraph: isBlogPost ? { type: "article" } : undefined,
	});
};

export default function Page(props: PageProps) {
	return (
		<Suspense fallback={<PageSkeleton />}>
			<CmsPageContent params={props.params} />
		</Suspense>
	);
}

async function CmsPageContent({ params: paramsPromise }: { params: PageProps["params"] }) {
	const params = await paramsPromise;
	const page = await getPage(params.slug, params.channel);

	if (!page) {
		notFound();
	}

	const contentHtml = parseEditorJsContent(page.content);

	if (isBlogPostPage(page)) {
		const blogPost = parseBlogPostFromPage(page, contentHtml);
		return <BlogPostView post={blogPost} channel={params.channel} />;
	}

	return <CmsPageView title={page.title} content={page.content} />;
}

function PageSkeleton() {
	return (
		<div className="mx-auto max-w-7xl animate-pulse p-8 pb-16">
			<div className="h-9 w-64 rounded bg-muted" />
			<div className="mt-8 space-y-3">
				<div className="h-4 w-full rounded bg-muted" />
				<div className="h-4 w-full rounded bg-muted" />
				<div className="h-4 w-3/4 rounded bg-muted" />
			</div>
		</div>
	);
}
