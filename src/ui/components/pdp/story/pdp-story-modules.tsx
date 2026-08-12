import Image from "next/image";
import { Brain, Check, Flower2, FlaskConical, Leaf, Package, Pill, type LucideIcon } from "lucide-react";
import type { PdpStoryImage, PdpStoryPack } from "@/config/pdp-stories";
import {
	homeSignatureBannerBodyClass,
	homeSignatureBannerShellClass,
	homeSignatureBannerSurfaceClass,
} from "@/ui/components/home/home-section-styles";
import { cn } from "@/lib/utils";

const blendTileIcons: Record<PdpStoryPack["blend"]["tiles"][number]["id"], LucideIcon> = {
	format: Leaf,
	wellness: Pill,
	clarity: Brain,
	gummies: FlaskConical,
};

const routineIconItems: Record<PdpStoryPack["routine"]["iconItems"][number]["id"], LucideIcon> = {
	convenient: Leaf,
	nearby: Pill,
	ritual: Flower2,
	bottle: Package,
};

function StoryImage({
	image,
	className,
	sizes,
	priority = false,
}: {
	image: PdpStoryImage;
	className?: string;
	sizes: string;
	priority?: boolean;
}) {
	return (
		<Image
			src={image.src}
			alt={image.alt}
			width={image.width}
			height={image.height}
			className={cn("h-auto w-full", className)}
			sizes={sizes}
			priority={priority}
		/>
	);
}

function BlendCopy({ story }: { story: PdpStoryPack["blend"] }) {
	return (
		<div className="max-w-3xl">
			<h2
				id="pdp-story-blend-heading"
				className="text-balance text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl"
			>
				{story.title}
			</h2>
			<p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
				{story.intro}
			</p>
			<ul className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:mt-8" role="list">
				{story.tiles.map((tile) => {
					const Icon = blendTileIcons[tile.id];
					return (
						<li key={tile.id} className="flex gap-3.5">
							<span className="mt-0.5 shrink-0 text-white" aria-hidden>
								<Icon className="h-7 w-7" strokeWidth={1.5} />
							</span>
							<div>
								<p className="text-base font-bold uppercase tracking-wide text-white sm:text-lg">
									{tile.title}
								</p>
								<p className="mt-1.5 text-base leading-relaxed text-white/80">{tile.body}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function BlendSection({ story }: { story: PdpStoryPack["blend"] }) {
	const bannerHeight = `calc(100vw * ${story.image.height} / ${story.image.width})`;

	return (
		<section className="relative bg-[#006D5B]" aria-labelledby="pdp-story-blend-heading">
			<div className="flex flex-col lg:block">
				<div className="order-2 lg:absolute lg:inset-x-0 lg:top-0">
					<StoryImage image={story.image} sizes="100vw" className="h-auto w-full" />
				</div>
				<div
					className="relative z-10 order-1 max-lg:min-h-0 lg:flex lg:min-h-[var(--blend-banner-h)] lg:items-center"
					style={{ ["--blend-banner-h" as string]: bannerHeight }}
				>
					<div className={cn(homeSignatureBannerShellClass, "w-full lg:py-8")}>
						<BlendCopy story={story} />
					</div>
				</div>
			</div>
		</section>
	);
}

function RoutineCopy({ story }: { story: PdpStoryPack["routine"] }) {
	return (
		<div className="max-w-2xl">
			<h2 id="pdp-story-routine-heading">
				<span className="inline-block rounded-full bg-[#E85D4C] px-5 py-2 text-base font-bold uppercase tracking-wide text-white sm:px-6 sm:py-2.5 sm:text-lg">
					{story.title}
				</span>
			</h2>
			<p className="mt-5 text-pretty text-base leading-relaxed text-white sm:text-lg">{story.intro}</p>
			<div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
				<ul className="space-y-3.5" role="list">
					{story.checkItems.map((item) => (
						<li key={item} className="flex items-start gap-3 text-base text-white sm:text-lg">
							<Check className="mt-1 h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
							<span>{item}</span>
						</li>
					))}
				</ul>
				<ul className="space-y-3.5" role="list">
					{story.iconItems.map((item) => {
						const Icon = routineIconItems[item.id];
						return (
							<li key={item.id} className="flex items-start gap-3 text-base text-white sm:text-lg">
								<span
									className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/80"
									aria-hidden
								>
									<Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
								</span>
								<span>{item.label}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

function RoutineSection({ story }: { story: PdpStoryPack["routine"] }) {
	const bannerHeight = `calc(100vw * ${story.image.height} / ${story.image.width})`;

	return (
		<section className="relative bg-[#006D5B]" aria-labelledby="pdp-story-routine-heading">
			<div className="flex flex-col lg:block">
				<div className="order-2 lg:absolute lg:inset-x-0 lg:top-0">
					<StoryImage image={story.image} sizes="100vw" className="h-auto w-full" />
				</div>
				<div
					className="relative z-10 order-1 max-lg:min-h-0 lg:flex lg:min-h-[var(--routine-banner-h)] lg:items-center"
					style={{ ["--routine-banner-h" as string]: bannerHeight }}
				>
					<div className={cn(homeSignatureBannerShellClass, "w-full lg:py-8")}>
						<RoutineCopy story={story} />
					</div>
				</div>
			</div>
		</section>
	);
}

function LookInsideSection({ story, disclaimer }: { story: PdpStoryPack["lookInside"]; disclaimer: string }) {
	return (
		<section className={homeSignatureBannerSurfaceClass} aria-labelledby="pdp-story-inside-heading">
			<div className={homeSignatureBannerShellClass}>
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">{story.eyebrow}</p>
					<h2
						id="pdp-story-inside-heading"
						className="mt-3 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl"
					>
						{story.title}
					</h2>
					<p className={`mt-4 ${homeSignatureBannerBodyClass}`}>{story.intro}</p>
				</div>
				<ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4" role="list">
					{story.ingredients.map((ingredient) => (
						<li key={ingredient.name} className="text-center">
							<div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
								<StoryImage
									image={ingredient.image}
									className="aspect-square object-cover"
									sizes="(min-width: 1024px) 16rem, 45vw"
								/>
							</div>
							<p className="mt-3 text-base font-semibold text-white">{ingredient.name}</p>
							<p className="mt-1 text-sm leading-relaxed text-white/80">{ingredient.benefit}</p>
						</li>
					))}
				</ul>
				<p className="mt-10 max-w-3xl text-xs leading-relaxed text-white/55">{disclaimer}</p>
			</div>
		</section>
	);
}

export function PdpStoryModules({ story }: { story: PdpStoryPack }) {
	return (
		<div className="mt-10 sm:mt-14">
			<BlendSection story={story.blend} />
			<RoutineSection story={story.routine} />
			<LookInsideSection story={story.lookInside} disclaimer={story.disclaimer} />
		</div>
	);
}
