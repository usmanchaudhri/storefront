"use client";

import { useMemo, useState } from "react";
import type { BlogPostSummary } from "@/lib/pages/blog-post";
import { BlogPostCard } from "@/ui/components/blog/blog-post-card";
import { cn } from "@/lib/utils";

type BlogPostListProps = {
	posts: BlogPostSummary[];
	channel: string;
};

function collectTags(posts: BlogPostSummary[]): string[] {
	const tagSet = new Set<string>();

	for (const post of posts) {
		for (const tag of post.tags) {
			tagSet.add(tag);
		}
	}

	return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

export function BlogPostList({ posts, channel }: BlogPostListProps) {
	const tags = useMemo(() => collectTags(posts), [posts]);
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const filteredPosts = useMemo(() => {
		if (!activeTag) {
			return posts;
		}

		return posts.filter((post) => post.tags.includes(activeTag));
	}, [activeTag, posts]);

	if (posts.length === 0) {
		return (
			<div className="bg-secondary/30 rounded-xl border border-dashed border-border px-6 py-16 text-center">
				<p className="text-lg font-medium text-foreground">No articles yet</p>
				<p className="mt-2 text-sm text-muted-foreground">
					Check back soon for wellness tips and product guides.
				</p>
			</div>
		);
	}

	return (
		<div>
			{tags.length > 0 ? (
				<div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-6">
					<button
						type="button"
						onClick={() => setActiveTag(null)}
						className={cn(
							"rounded-full px-4 py-2 text-sm font-medium transition-colors",
							activeTag === null
								? "bg-foreground text-background"
								: "bg-secondary text-muted-foreground hover:text-foreground",
						)}
					>
						All
					</button>
					{tags.map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={() => setActiveTag(tag)}
							className={cn(
								"rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors",
								activeTag === tag
									? "bg-foreground text-background"
									: "bg-secondary text-muted-foreground hover:text-foreground",
							)}
						>
							{tag}
						</button>
					))}
				</div>
			) : null}

			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{filteredPosts.map((post) => (
					<BlogPostCard key={post.id} post={post} channel={channel} />
				))}
			</div>

			{filteredPosts.length === 0 ? (
				<p className="mt-8 text-center text-sm text-muted-foreground">No articles in this category yet.</p>
			) : null}
		</div>
	);
}
