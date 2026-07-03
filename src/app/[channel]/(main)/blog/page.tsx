import Link from "next/link";
import { Suspense } from "react";
import { type Metadata } from "next";
import { BlogPostsListDocument, PageTypeBySlugDocument } from "@/gql/graphql";
import { blogConfig } from "@/config/blog";
import { BLOG_POST_PAGE_TYPE_SLUG, parseBlogPostSummary } from "@/lib/pages/blog-post";
import { channelHref } from "@/lib/channel-path";
import { executePublicGraphQL } from "@/lib/graphql";
import { buildPageMetadata } from "@/lib/seo";
import { BlogPostList } from "@/ui/components/blog/blog-post-list";
import {
	homeSectionHeadlineClass,
	homeSectionIntroClass,
	homeSectionShellClass,
	homeSignatureBannerShellClass,
	homeSignatureBannerSurfaceClass,
} from "@/ui/components/home/home-section-styles";

type PageProps = {
	params: Promise<{ channel: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
	const params = await props.params;

	return buildPageMetadata({
		title: blogConfig.title,
		description: blogConfig.subtitle,
		url: channelHref(params.channel, "/blog"),
	});
};

export default function BlogPage(props: PageProps) {
	return (
		<Suspense fallback={<BlogPageSkeleton />}>
			<BlogPageContent params={props.params} />
		</Suspense>
	);
}

async function BlogPageContent({ params: paramsPromise }: { params: PageProps["params"] }) {
	const params = await paramsPromise;
	const posts = await getBlogPosts(params.channel);

	return (
		<div className="pb-16">
			<section className={homeSectionShellClass}>
				<div className="mx-auto max-w-3xl text-center">
					<h1 className={homeSectionHeadlineClass}>{blogConfig.title}</h1>
					<p className={`${homeSectionIntroClass} mt-4`}>{blogConfig.subtitle}</p>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<BlogPostList posts={posts} channel={params.channel} />
			</section>

			<section className={`${homeSignatureBannerSurfaceClass} mt-16`}>
				<div className={`${homeSignatureBannerShellClass} text-center`}>
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
						{blogConfig.cta.eyebrow}
					</p>
					<h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
						{blogConfig.cta.headline}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
						{blogConfig.cta.body}
					</p>
					<Link
						href={channelHref(params.channel, blogConfig.cta.primaryHref)}
						prefetch={false}
						className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-teal-900 transition-colors hover:bg-white/90"
					>
						{blogConfig.cta.primaryLabel}
					</Link>
				</div>
			</section>
		</div>
	);
}

async function getBlogPosts(channel: string) {
	const fetchOptions = { cache: "no-store" as const };

	const pageTypeResult = await executePublicGraphQL(PageTypeBySlugDocument, {
		variables: { slug: BLOG_POST_PAGE_TYPE_SLUG },
		...fetchOptions,
	});

	const pageTypeId =
		(pageTypeResult.ok && pageTypeResult.data.pageTypes?.edges[0]?.node.id) || blogConfig.pageTypeIdFallback;

	if (!pageTypeId) {
		return [];
	}

	const postsResult = await executePublicGraphQL(BlogPostsListDocument, {
		variables: { channel, pageTypeId, first: 24 },
		...fetchOptions,
	});

	if (!postsResult.ok || !postsResult.data.pages) {
		console.error(
			"[BlogPage] Failed to fetch blog posts:",
			postsResult.ok ? "empty pages" : postsResult.error.message,
		);
		return [];
	}

	return postsResult.data.pages.edges
		.map((edge) => edge.node)
		.filter(Boolean)
		.map((page) => parseBlogPostSummary(page));
}

function BlogPageSkeleton() {
	return (
		<div className="animate-pulse pb-16">
			<div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
				<div className="mx-auto h-10 w-64 rounded bg-muted" />
				<div className="mx-auto mt-4 h-5 w-96 max-w-full rounded bg-muted" />
			</div>
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="space-y-4">
						<div className="aspect-[4/3] rounded-xl bg-muted" />
						<div className="h-4 w-20 rounded bg-muted" />
						<div className="h-6 w-full rounded bg-muted" />
						<div className="h-4 w-full rounded bg-muted" />
					</div>
				))}
			</div>
		</div>
	);
}
