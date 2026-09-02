import Image from "next/image";

import type { PdpStoryBlend } from "@/config/pdp-stories/types";
import { cn } from "@/lib/utils";

/** Figma off-white token (Quarter Spanish White). */
const blendTextClass = "text-[#F7F1DF]";

function BlendTileIcon({ icon }: { icon: PdpStoryBlend["tiles"][number]["icon"] }) {
	return (
		<div className="relative h-16 w-full max-w-[20rem]" aria-hidden>
			<Image
				src={icon.src}
				alt=""
				width={icon.width}
				height={icon.height}
				className="h-16 w-auto max-w-none object-contain object-left"
				sizes="80px"
			/>
		</div>
	);
}

function BlendCopy({ story, headingId }: { story: PdpStoryBlend; headingId: string }) {
	return (
		<div className="max-w-[700px]">
			<h2
				id={headingId}
				className={cn(
					blendTextClass,
					"text-balance text-[clamp(1.75rem,1.15rem+2vw,2.875rem)] font-semibold uppercase leading-[1.2]",
				)}
			>
				{story.title}
			</h2>
			<p
				className={cn(
					blendTextClass,
					"mt-2.5 max-w-[519px] text-pretty text-[clamp(0.9375rem,0.88rem+0.25vw,1.25rem)] leading-[1.4]",
				)}
			>
				{story.intro}
			</p>
			<ul
				className="mt-6 grid max-w-[700px] grid-cols-1 gap-x-[51px] gap-y-10 pt-6 sm:grid-cols-2 sm:gap-y-[57px]"
				role="list"
			>
				{story.tiles.map((tile) => (
					<li key={tile.id} className="flex flex-col gap-4">
						<BlendTileIcon icon={tile.icon} />
						<p className={cn(blendTextClass, "text-[clamp(0.9375rem,0.9rem+0.12vw,1.125rem)] leading-[1.4]")}>
							<span className="font-bold uppercase">{tile.title}</span> {tile.body}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export type BlendBannerProps = {
	story: PdpStoryBlend;
	headingId?: string;
	sectionId?: string;
	priority?: boolean;
};

/** Figma 2435:878 — background image with responsive text overlay (PDP + homepage). */
export function BlendBanner({
	story,
	headingId = "blend-banner-heading",
	sectionId,
	priority = false,
}: BlendBannerProps) {
	const bannerHeight = `calc(100vw * ${story.image.height} / ${story.image.width})`;

	return (
		<section
			id={sectionId}
			className="relative w-full scroll-mt-16 overflow-hidden bg-[#073B35] lg:scroll-mt-[4.25rem]"
			aria-labelledby={headingId}
			style={{ minHeight: bannerHeight }}
		>
			<div className="absolute inset-0" aria-hidden>
				<Image
					src={story.image.src}
					alt=""
					width={story.image.width}
					height={story.image.height}
					className="h-full w-full object-cover object-center"
					sizes="100vw"
					priority={priority}
				/>
			</div>
			<div
				className="relative z-10 flex items-center py-10 sm:py-12 lg:py-[40px]"
				style={{ minHeight: bannerHeight }}
			>
				<div className="mx-auto w-full max-w-[1255px] px-4 sm:px-6 lg:px-8">
					<BlendCopy story={story} headingId={headingId} />
				</div>
			</div>
		</section>
	);
}
