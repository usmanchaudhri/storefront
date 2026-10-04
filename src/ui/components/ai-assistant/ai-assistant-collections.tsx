"use client";

import Image from "next/image";

import type { AssistantCollection } from "@/app/[channel]/(main)/chat/collections";
import { cn } from "@/lib/utils";

type AiAssistantCollectionsProps = {
	collections: AssistantCollection[];
	disabled?: boolean;
	onCollectionSelect: (collection: AssistantCollection) => void;
};

export function AiAssistantCollections({
	collections,
	disabled = false,
	onCollectionSelect,
}: AiAssistantCollectionsProps) {
	if (collections.length === 0) {
		return null;
	}

	return (
		<div className="w-full space-y-3">
			<p className="text-sm font-medium text-foreground">Shop collections</p>
			<ul
				role="list"
				className={cn(
					"-mx-1 flex list-none gap-3 overflow-x-auto px-1 pb-1",
					"snap-x snap-mandatory scroll-smooth",
					"[scrollbar-width:thin]",
				)}
			>
				{collections.map((collection) => (
					<li key={collection.id} className="snap-start">
						<button
							type="button"
							disabled={disabled}
							onClick={() => onCollectionSelect(collection)}
							className={cn(
								"border-border/80 group flex w-[7.5rem] flex-col overflow-hidden rounded-2xl border bg-card text-left",
								"shadow-sm transition-all duration-200",
								"hover:border-primary/30 hover:shadow-md",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								"disabled:cursor-not-allowed disabled:opacity-60",
							)}
						>
							<div className="relative aspect-square w-full bg-muted">
								{collection.imageUrl ? (
									<Image
										src={collection.imageUrl}
										alt={collection.imageAlt || collection.name}
										fill
										sizes="120px"
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								) : (
									<div className="flex h-full items-center justify-center px-2 text-center text-[11px] text-muted-foreground">
										{collection.name}
									</div>
								)}
							</div>
							<p className="line-clamp-2 px-2.5 py-2 text-center text-xs font-semibold leading-snug text-foreground">
								{collection.name}
							</p>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
