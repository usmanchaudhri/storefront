import Image from "next/image";
import Link from "next/link";
import type { BlogPostData } from "@/lib/pages/blog-post";
import { channelHref } from "@/lib/channel-path";
import { localeConfig } from "@/config/locale";
import { Badge } from "@/ui/components/ui/badge";
import { ProductCard, transformToProductCard } from "@/ui/components/plp";

type BlogPostViewProps = {
	post: BlogPostData;
	channel: string;
};

function formatPublishedDate(publishedAt: string | null): string | null {
	if (!publishedAt) {
		return null;
	}

	return new Intl.DateTimeFormat(localeConfig.default, {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(publishedAt));
}

export function BlogPostView({ post, channel }: BlogPostViewProps) {
	const publishedLabel = formatPublishedDate(post.publishedAt);
	const relatedProductCards = post.relatedProducts.map((product) => transformToProductCard(product, channel));

	return (
		<article className="pb-16">
			<div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
				{post.coverImageUrl ? (
					<div className="relative mb-8 aspect-[16/9] max-h-56 w-full overflow-hidden rounded-xl bg-muted sm:max-h-64">
						<Image
							src={post.coverImageUrl}
							alt={post.coverImageAlt ?? post.title}
							fill
							className="object-cover"
							priority
							sizes="(max-width: 768px) 100vw, 768px"
						/>
					</div>
				) : null}

				<header className="space-y-4">
					{post.tags.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<Badge key={tag} variant="secondary">
									{tag}
								</Badge>
							))}
						</div>
					) : null}

					<h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
						{post.title}
					</h1>

					{(post.author || publishedLabel) && (
						<p className="text-sm text-muted-foreground">
							{post.author ? <span>By {post.author}</span> : null}
							{post.author && publishedLabel ? <span aria-hidden="true"> · </span> : null}
							{publishedLabel ? <time dateTime={post.publishedAt ?? undefined}>{publishedLabel}</time> : null}
						</p>
					)}

					{post.excerpt ? (
						<p className="text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
							{post.excerpt}
						</p>
					) : null}
				</header>

				{post.contentHtml && post.contentHtml.length > 0 ? (
					<div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
						{post.contentHtml.map((block) => (
							<div key={block} dangerouslySetInnerHTML={{ __html: block }} />
						))}
					</div>
				) : null}
			</div>

			{relatedProductCards.length > 0 ? (
				<section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8 flex items-end justify-between gap-4">
						<div>
							<p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
								Shop the story
							</p>
							<h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Related products</h2>
						</div>
						<Link
							href={channelHref(channel, "/products")}
							className="text-sm font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400"
						>
							View all products
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
						{relatedProductCards.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</section>
			) : null}
		</article>
	);
}
