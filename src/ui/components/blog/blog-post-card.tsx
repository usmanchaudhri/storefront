import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/pages/blog-post";
import { channelHref } from "@/lib/channel-path";
import { Badge } from "@/ui/components/ui/badge";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
	post: BlogPostSummary;
	channel: string;
	className?: string;
};

export function BlogPostCard({ post, channel, className }: BlogPostCardProps) {
	const href = channelHref(channel, `/pages/${post.slug}`);
	const primaryTag = post.tags[0];

	return (
		<article className={cn("group flex flex-col", className)}>
			<Link href={href} prefetch={false} className="block overflow-hidden rounded-xl bg-muted">
				<div className="relative aspect-[4/3] w-full">
					{post.coverImageUrl ? (
						<Image
							src={post.coverImageUrl}
							alt={post.title}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						/>
					) : (
						<div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-700/20 to-teal-500/10 px-6 text-center">
							<span className="text-sm font-medium text-muted-foreground">{post.title}</span>
						</div>
					)}
				</div>
			</Link>

			<div className="flex flex-1 flex-col pt-4">
				{primaryTag ? (
					<Badge variant="secondary" className="mb-3 w-fit text-xs font-medium uppercase tracking-wide">
						{primaryTag}
					</Badge>
				) : null}

				<h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
					<Link href={href} prefetch={false} className="hover:text-teal-700 dark:hover:text-teal-400">
						{post.title}
					</Link>
				</h2>

				{post.excerpt ? (
					<p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
						{post.excerpt}
					</p>
				) : null}
			</div>
		</article>
	);
}
