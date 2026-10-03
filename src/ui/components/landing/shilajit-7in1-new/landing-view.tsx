"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Activity, Brain, Check, ChevronDown, Shield, Sprout, Zap, type LucideIcon } from "lucide-react";

import {
	shilajit7in1Landing,
	LANDING_SLUG,
	type ConversionLandingContent,
	type LandingImage,
} from "@/config/landing/shilajit-7in1-new";
import { getPdpStory, type PdpStoryComparison } from "@/config/pdp-stories";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	useCarousel,
} from "@/ui/components/ui/carousel";
import { Breadcrumbs, type BreadcrumbItem } from "@/ui/components/breadcrumbs";
import { PdpComparisonSection } from "@/ui/components/pdp/story/pdp-story-modules";
import { LandingDailyNutrients } from "@/ui/components/landing/shilajit-7in1-new/landing-daily-nutrients";
import { LandingNaturalFlavors } from "@/ui/components/landing/shilajit-7in1-new/landing-natural-flavors";

const accent = "text-[#C46A3A]";
const forest = "text-[#0B3D36]";

function Eyebrow({ children }: { children: ReactNode }) {
	return <p className={cn("text-[12px] font-bold uppercase tracking-[0.22em]", accent)}>{children}</p>;
}

function SectionHeading({
	eyebrow,
	title,
	intro,
	align = "left",
}: {
	eyebrow: string;
	title: string;
	intro?: string;
	align?: "left" | "center";
}) {
	return (
		<div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
			<Eyebrow>{eyebrow}</Eyebrow>
			<h2 className={cn("mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl", forest)}>
				{title}
			</h2>
			{intro ? (
				<p
					className={cn(
						"text-foreground/70 mt-3 max-w-2xl text-base leading-relaxed",
						align === "center" && "mx-auto",
					)}
				>
					{intro}
				</p>
			) : null}
		</div>
	);
}

function SoftImage({
	image,
	className,
	priority = false,
	sizes = "(max-width: 768px) 100vw, 50vw",
}: {
	image: LandingImage;
	className?: string;
	priority?: boolean;
	sizes?: string;
}) {
	return (
		<Image
			src={image.src}
			alt={image.alt}
			width={image.width}
			height={image.height}
			priority={priority}
			sizes={sizes}
			className={cn("h-auto w-full object-cover", className)}
		/>
	);
}

const WHY_IT_MATTERS_ICONS: Record<
	ConversionLandingContent["whyItMatters"]["benefits"][number]["icon"],
	LucideIcon
> = {
	energy: Zap,
	active: Activity,
	focus: Brain,
	wellness: Sprout,
};

/**
 * Known Nutrition–style benefits split (image + vertical benefit list).
 * Reference: “Feel the benefits every day.” on knownnutrition.co.uk PDPs.
 */
function WhyItMattersSection({ story }: { story: ConversionLandingContent["whyItMatters"] }) {
	const imageBg = story.imageBg || "#00675b";
	const iconBg = story.iconBg || "#E8A47D";
	const iconColor = story.iconColor || "#0B3D36";
	const imageObjectPosition = story.imageObjectPosition ?? "center 18%";
	const imageObjectFit = story.imageObjectFit === "contain" ? "contain" : "cover";

	return (
		<section className="bg-white" aria-labelledby="why-it-matters-heading">
			<div className="mx-auto grid w-full max-w-content items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
				<div
					className="relative aspect-square w-full overflow-hidden rounded-2xl lg:aspect-[1/1.05]"
					style={{ backgroundColor: imageBg }}
				>
					<Image
						src={story.image.src}
						alt={story.image.alt}
						width={story.image.width}
						height={story.image.height}
						className="absolute inset-0 size-full"
						style={{ objectFit: imageObjectFit, objectPosition: imageObjectPosition }}
						sizes="(max-width: 1024px) 100vw, 50vw"
					/>
				</div>

				<div className="flex flex-col justify-center lg:py-2">
					<h2
						id="why-it-matters-heading"
						className="text-balance text-[clamp(1.75rem,1.3rem+1.5vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.02em] text-[#0f2d24]"
					>
						{story.title}
					</h2>

					<ul className="mt-6 divide-y divide-[#e2eae5] sm:mt-8" role="list">
						{story.benefits.map((benefit) => {
							const Icon = WHY_IT_MATTERS_ICONS[benefit.icon];
							return (
								<li
									key={benefit.id}
									className="flex items-start gap-4 py-5 first:pt-2 last:pb-0 sm:gap-5 sm:py-6"
								>
									<span
										className="flex size-16 shrink-0 items-center justify-center rounded-full sm:size-20"
										style={{ backgroundColor: iconBg, color: iconColor }}
										aria-hidden
									>
										<Icon className="size-7 sm:size-8" strokeWidth={2} />
									</span>
									<div className="min-w-0 pt-0.5">
										<h3 className="text-[clamp(1.0625rem,1rem+0.2vw,1.25rem)] font-semibold leading-snug text-[#0f2d24]">
											{benefit.title}
										</h3>
										<p className="mt-1.5 text-[15px] font-normal leading-[1.5] text-[#4b5b54]">
											{benefit.body}
										</p>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}

type SocialClip = ConversionLandingContent["social"]["clips"][number];

/** Autoplay muted clip when the slide is on screen. */
function SocialClipVideo({ clip, index }: { clip: SocialClip; index: number }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState(false);
	const [showVideo, setShowVideo] = useState(false);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				const inView = entry.isIntersecting;
				setIsInView(inView);
				if (!inView) {
					setShowVideo(false);
				}
			},
			{ rootMargin: "40px", threshold: 0.25 },
		);

		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={containerRef} className="relative aspect-[9/14] overflow-hidden bg-[#0B3D36]">
			{/* Poster covers until playback is past the first keyframe (~150ms). */}
			<Image
				src={clip.poster.src}
				alt={clip.poster.alt}
				width={clip.poster.width}
				height={clip.poster.height}
				sizes="(max-width: 640px) 100vw, 33vw"
				priority={index === 0}
				className={cn("absolute inset-0 z-20 h-full w-full object-cover", showVideo && "invisible")}
			/>
			{isInView ? (
				<video
					key={clip.mp4Url}
					className={cn("absolute inset-0 z-10 size-full object-cover", !showVideo && "invisible")}
					muted
					playsInline
					loop
					autoPlay
					preload="auto"
					src={clip.mp4Url}
					onTimeUpdate={(event) => {
						if (!showVideo && event.currentTarget.currentTime >= 0.15) {
							setShowVideo(true);
						}
					}}
					aria-label={clip.poster.alt}
				/>
			) : null}
		</div>
	);
}

const socialCarouselArrowClassName = cn(
	"static shrink-0 translate-y-0",
	"size-11 rounded-full border-0 !bg-[#00A38C] !text-white shadow-none",
	"hover:!bg-[#00967f] hover:!text-white disabled:opacity-40",
	"[&_svg]:size-5",
);

function SocialGalleryDots() {
	const { selectedIndex, scrollTo, slideCount } = useCarousel();

	// Dot count = Embla scroll snaps (how many arrow/dot steps to reach the end),
	// not clip count — with 3 slides visible you only need ~3 snaps for 5 clips.
	if (slideCount <= 1) {
		return null;
	}

	return (
		<div className="flex justify-center gap-2" role="tablist" aria-label="Social video slides">
			{Array.from({ length: slideCount }).map((_, index) => (
				<button
					key={index}
					type="button"
					role="tab"
					aria-selected={selectedIndex === index}
					aria-label={`Go to slide ${index + 1}`}
					onClick={() => scrollTo(index)}
					className={cn(
						"size-2.5 rounded-full transition-colors",
						selectedIndex === index ? "bg-[#0B3D36]" : "bg-[#0B3D36]/30 hover:bg-[#0B3D36]/50",
					)}
				/>
			))}
		</div>
	);
}

function FaqAccordion({ faq }: { faq: ConversionLandingContent["faq"] }) {
	const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);

	return (
		<div className="space-y-3">
			{faq.items.map((item) => {
				const open = openId === item.id;
				return (
					<div key={item.id} className="rounded-2xl border border-border bg-white px-4 py-1 sm:px-5">
						<button
							type="button"
							aria-expanded={open}
							onClick={() => setOpenId(open ? null : item.id)}
							className="flex w-full items-center justify-between gap-4 py-4 text-left"
						>
							<span className={cn("text-base font-semibold sm:text-lg", forest)}>{item.question}</span>
							<ChevronDown
								className={cn(
									"text-foreground/50 h-5 w-5 shrink-0 transition-transform duration-200",
									open && "rotate-180",
								)}
							/>
						</button>
						{open ? (
							<p className="text-foreground/70 pb-4 text-sm leading-relaxed sm:text-base">{item.answer}</p>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

type HiddenLandingSections = {
	origin?: boolean;
	/** Two-up diagram/facts images above “A look inside the gummy”. */
	botanicalsDiagram?: boolean;
	cleanBar?: boolean;
	lifestyle?: boolean;
	routine?: boolean;
	/** “How The Formats Differ” matrix (landing content.comparison). */
	formatsDiffer?: boolean;
	proof?: boolean;
	/** Figma 3413:4391 — 18 Daily Nutrients. */
	dailyNutrients?: boolean;
	/** Figma 3413:4466 — Natural Flavors. */
	naturalFlavors?: boolean;
};

interface ConversionLandingViewProps {
	buyIsland: ReactNode;
	content?: ConversionLandingContent;
	breadcrumbs?: BreadcrumbItem[];
	hideSections?: HiddenLandingSections;
	/** Figma 2611:20 — rendered above “A look inside the gummy”. */
	comparison?: PdpStoryComparison;
}

export function ConversionLandingView({
	buyIsland,
	content = shilajit7in1Landing,
	breadcrumbs,
	hideSections,
	comparison,
}: ConversionLandingViewProps) {
	const c = content;
	const hide = hideSections ?? {};

	return (
		<div className="conversion-landing bg-[#F7F7F7] text-foreground">
			{/* SECTION 1 — Hero purchase engine (same gallery size as original PDP) */}
			<section id="offer" className="scroll-mt-24 bg-white">
				<div className="container-content py-4 sm:py-6">
					{breadcrumbs && breadcrumbs.length > 0 ? (
						<div className="mb-4 hidden sm:block">
							<Breadcrumbs items={breadcrumbs} ariaLabel="Breadcrumb" />
						</div>
					) : null}
					{/* Key required: buyIsland is created by the page (different owner) among sibling children. */}
					<Fragment key="landing-buy-island">{buyIsland}</Fragment>
				</div>
			</section>

			{/* SECTION 2 — Potency & supply metrics (Figma 3150:308) */}
			{!hide.origin ? (
				<section className="bg-white">
					<div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-14 lg:px-11 lg:py-16">
						<div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
							<div className="flex flex-col gap-6 lg:col-span-7">
								{c.origin.eyebrow ? (
									<p className="text-[14px] font-semibold uppercase tracking-[0.05em] text-[#107357]">
										{c.origin.eyebrow}
									</p>
								) : null}
								<h2 className="text-balance text-[clamp(1.75rem,1.2rem+1.5vw,2.375rem)] font-bold leading-[1.25] tracking-[-0.015em] text-[#0f2d24]">
									{c.origin.title}
									{c.origin.titleAccent ? (
										<>
											{" "}
											<span className="text-[#107357]">{c.origin.titleAccent}</span>
										</>
									) : null}
								</h2>
								<p className="max-w-xl text-lg leading-7 text-[#4b5b54]">{c.origin.body}</p>
								<dl className="grid grid-cols-3 gap-3 pt-2 sm:gap-4">
									{c.origin.stats.map((stat, index) => {
										const valueClass =
											index === 0 ? "text-[#107357]" : index === 2 ? "text-[#d9953b]" : "text-[#0f2d24]";
										return (
											<div
												key={stat.label}
												className="flex flex-col items-center gap-1 rounded-2xl border border-[#e2eae5] bg-[#f4f7f5] px-3 py-5 shadow-sm sm:px-5 sm:pb-6 sm:pt-5"
											>
												<dt
													className={cn(
														"text-[clamp(1.75rem,1.25rem+1.5vw,2.75rem)] font-bold tracking-[-0.02em]",
														valueClass,
													)}
												>
													{stat.value}
												</dt>
												<dd className="text-center text-[11px] font-semibold uppercase tracking-[0.05em] text-[#0f2d24] sm:text-xs">
													{stat.label}
												</dd>
											</div>
										);
									})}
								</dl>
							</div>
							<div className="overflow-hidden rounded-2xl border border-[#e2eae5] bg-[#f4f7f5] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] lg:col-span-5">
								<SoftImage
									image={c.origin.image}
									className="aspect-square object-cover"
									sizes="(max-width: 1024px) 100vw, 38vw"
								/>
							</div>
						</div>
					</div>
				</section>
			) : null}

			{/* Figma 3413:4391 — 18 Daily Nutrients (below purchase, above How different) */}
			{!hide.dailyNutrients ? <LandingDailyNutrients /> : null}

			{/* Figma 3413:4466 — Natural Flavors (below nutrients, above How different) */}
			{!hide.naturalFlavors ? <LandingNaturalFlavors /> : null}

			{/* Figma 2611:20 — How Kaya Pure is different (above look-inside) */}
			{comparison ? <PdpComparisonSection story={comparison} /> : null}

			{/* SECTION 5b — Format comparison matrix (above look-inside when shown) */}
			{!hide.formatsDiffer ? (
				<section className="border-y border-[#e2eae5] bg-[#f8faf9] py-14 sm:pb-24 sm:pt-16">
					<div className="mx-auto max-w-content px-5 sm:px-6 lg:px-12">
						<div className="mx-auto flex max-w-4xl flex-col items-center gap-2.5 text-center">
							{c.comparison.eyebrow ? (
								<p className="text-[14px] font-semibold uppercase tracking-[0.05em] text-[#107357]">
									{c.comparison.eyebrow}
								</p>
							) : null}
							<h2 className="text-balance text-center text-[clamp(1.875rem,1.2rem+2.2vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[0.025em]">
								<span className="text-[#0B554B]">{c.comparison.title}</span>
								{c.comparison.titleAccent ? (
									<>
										{" "}
										<span className="text-[#29C7C0]">{c.comparison.titleAccent}</span>
									</>
								) : null}
							</h2>
							{c.comparison.intro ? (
								<p className="mt-1.5 max-w-xl text-[15px] leading-6 text-[#4b5b54]">{c.comparison.intro}</p>
							) : null}
						</div>

						<div
							className={cn(
								"mt-12 grid items-stretch gap-8 sm:mt-14",
								c.comparison.image ? "lg:grid-cols-12 lg:gap-8" : "lg:grid-cols-1",
							)}
						>
							{c.comparison.image ? (
								<div className="overflow-hidden rounded-2xl border border-[#e2eae5] bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] lg:col-span-5">
									<SoftImage
										image={c.comparison.image}
										className="aspect-square object-cover"
										sizes="(max-width: 1024px) 100vw, 40vw"
									/>
								</div>
							) : null}

							<div
								className={cn(
									"overflow-x-auto rounded-2xl border border-[#e2eae5] bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]",
									c.comparison.image ? "lg:col-span-7" : "w-full",
								)}
							>
								<table className="w-full min-w-[760px] border-collapse text-left">
									<thead>
										<tr className="border-b border-[#e2eae5] bg-[#f4f7f5]">
											{c.comparison.headers.map((header, i) => (
												<th
													key={header}
													className={cn(
														"px-5 py-5 align-top text-[16px] font-medium leading-snug sm:px-6 sm:py-6 sm:text-[17px]",
														i === 0 && "text-[#0f2d24]",
														i === 1 &&
															"border-x border-[#e2eae5] bg-[rgba(234,243,239,0.6)] font-bold text-[#107357]",
														i > 1 && "font-medium text-[#4b5b54]",
													)}
												>
													{header}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{c.comparison.rows.map((row, rowIndex) => (
											<tr
												key={row[0]}
												className={cn("border-t border-[#e2eae5]", rowIndex % 2 === 1 && "bg-[#fafdfb]")}
											>
												{row.map((cell, i) => (
													<td
														key={`${row[0]}-${i}`}
														className={cn(
															"px-5 py-5 align-top text-[15px] leading-6 sm:px-6 sm:text-[16px]",
															i === 0 && "font-medium text-[#4b5b54]",
															i === 1 &&
																"border-x border-[#e2eae5] bg-[rgba(234,243,239,0.3)] font-semibold text-[#107357]",
															i > 1 && "font-normal text-[#4b5b54]",
														)}
													>
														{cell}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>
			) : null}

			{/* SECTION 3 — Botanicals + look inside the gummy */}
			<section className="bg-white py-14 sm:py-16">
				{!hide.botanicalsDiagram ? (
					<div className="mx-auto max-w-content px-4 sm:px-6">
						<div className="grid gap-4 lg:grid-cols-2">
							<div className="overflow-hidden rounded-2xl bg-[#0B3D36]">
								<SoftImage image={c.botanicals.diagram} sizes="(max-width: 1024px) 100vw, 50vw" />
							</div>
							<div className="overflow-hidden rounded-2xl bg-[#0B3D36]">
								<SoftImage image={c.botanicals.facts} sizes="(max-width: 1024px) 100vw, 50vw" />
							</div>
						</div>
					</div>
				) : null}

				<div
					className={cn(
						"bg-[linear-gradient(108.38deg,#0B4C42_7.07%,#02917D_91.12%)]",
						!hide.botanicalsDiagram && "mt-10",
					)}
				>
					<div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
						<h2 className="text-center text-[clamp(1.75rem,1.15rem+2vw,2.875rem)] font-semibold uppercase tracking-[0.5px]">
							<span className="text-[#F7F1DF]">{c.botanicals.lookInside.titlePrefix}</span>
							<span className="font-extrabold text-[#43E8D1]">{c.botanicals.lookInside.titleAccent}</span>
						</h2>
						<p className="mx-auto mt-5 max-w-[1094px] text-pretty text-center text-[clamp(0.9375rem,0.88rem+0.25vw,1.25rem)] leading-[1.4] text-[#F7F1DF]">
							{c.botanicals.lookInside.intro}
						</p>
						<ul
							className={cn(
								"mt-10 grid justify-items-center gap-x-6 gap-y-10",
								c.botanicals.lookInside.ingredients.length <= 2
									? "mx-auto max-w-2xl grid-cols-2"
									: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
							)}
							role="list"
						>
							{c.botanicals.lookInside.ingredients.map((ingredient) => (
								<li key={ingredient.name} className="flex flex-col items-center gap-[11px] text-center">
									<div className="relative mx-auto size-[clamp(9rem,8rem+4vw,12.5rem)] overflow-hidden rounded-full">
										<Image
											src={ingredient.image.src}
											alt={ingredient.image.alt}
											width={ingredient.image.width}
											height={ingredient.image.height}
											className="size-full object-cover"
											sizes="(min-width: 1024px) 12.5rem, 36vw"
										/>
									</div>
									<p className="text-[clamp(1rem,0.95rem+0.15vw,1.25rem)] font-semibold uppercase leading-normal text-[#43E8D1]">
										{ingredient.name}
									</p>
									{ingredient.dose ? (
										<p className="text-[clamp(1.125rem,1rem+0.3vw,1.375rem)] font-bold tabular-nums text-white">
											{ingredient.dose}
										</p>
									) : null}
									<p className="max-w-[236px] text-pretty text-[clamp(0.9375rem,0.9rem+0.12vw,1.125rem)] leading-[1.4] text-[#F7F1DF]">
										{ingredient.benefit}
									</p>
								</li>
							))}
						</ul>
						<div className="mt-12 flex justify-center">
							<a
								href="#offer"
								className="inline-flex min-h-[51px] items-center justify-center rounded-full bg-[#43E8D1] px-10 py-3 text-[clamp(1rem,0.95rem+0.2vw,1.375rem)] font-bold uppercase tracking-[0.5px] text-[#0B554B] transition-opacity hover:opacity-90"
							>
								{c.botanicals.lookInside.ctaLabel}
							</a>
						</div>
					</div>
				</div>

				{!hide.cleanBar ? (
					<div className="mx-auto max-w-content px-4 sm:px-6">
						<div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#0B3D36] px-6 py-6 sm:flex-row sm:items-center sm:px-8 sm:py-7">
							<p className="text-base font-semibold leading-snug text-white sm:text-lg md:text-xl">
								{c.botanicals.cleanBar}
							</p>
							<div className="flex flex-wrap gap-2.5">
								{c.botanicals.pills.map((pill) => (
									<span
										key={pill}
										className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0B3D36]"
									>
										{pill}
									</span>
								))}
							</div>
						</div>
					</div>
				) : null}
			</section>

			{/* Figma 3269:12 — Why Shilajit 7 in 1 Gummies Matter (below look-inside) */}
			{c.whyItMatters ? <WhyItMattersSection story={c.whyItMatters} /> : null}

			{/* SECTION 4 — Lifestyle cards */}
			{!hide.lifestyle ? (
				<section className="bg-[#F7F7F7] py-14 sm:py-20">
					<div className="mx-auto max-w-content px-4 sm:px-6">
						<SectionHeading
							eyebrow={c.lifestyle.eyebrow}
							title={c.lifestyle.title}
							intro={c.lifestyle.intro}
							align="center"
						/>
						<ul className="mt-10 grid gap-6 lg:grid-cols-3">
							{c.lifestyle.cards.map((card) => (
								<li
									key={card.id}
									className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
								>
									<div className="overflow-hidden bg-[#0B3D36]">
										<SoftImage
											image={card.image}
											sizes="(max-width: 1024px) 100vw, 33vw"
											className="aspect-square"
										/>
									</div>
									<div className="flex flex-1 flex-col p-5 sm:p-6">
										<Eyebrow>{card.eyebrow}</Eyebrow>
										<h3 className={cn("mt-2 text-xl font-semibold", forest)}>{card.title}</h3>
										<p className="text-foreground/70 mt-2 flex-1 text-sm leading-relaxed">{card.body}</p>
										<ul className="mt-4 space-y-2">
											{card.points.map((point) => (
												<li key={point} className="text-foreground/80 flex items-center gap-2 text-sm">
													<span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C46A3A] text-white">
														<Check className="h-3 w-3" strokeWidth={3} />
													</span>
													{point}
												</li>
											))}
										</ul>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>
			) : null}

			{/* SECTION 5 — Ritual */}
			{!hide.routine ? (
				<section className="bg-white py-14 sm:py-20">
					<div className="mx-auto max-w-content px-4 sm:px-6">
						<div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
							<div className="overflow-hidden rounded-2xl">
								<SoftImage
									image={c.routine.image}
									sizes="(max-width: 1024px) 100vw, 50vw"
									className="aspect-[4/3]"
								/>
							</div>
							<div>
								<SectionHeading eyebrow={c.routine.eyebrow} title={c.routine.title} />
								<ol className="mt-8 grid gap-3 sm:grid-cols-2">
									{c.routine.steps.map((step) => (
										<li key={step.n} className="rounded-2xl border border-border bg-[#F7F7F7] p-4">
											<span className={cn("text-sm font-bold", accent)}>{step.n}</span>
											<h3 className={cn("mt-1 text-base font-semibold", forest)}>{step.title}</h3>
											<p className="text-foreground/70 mt-1 text-sm leading-relaxed">{step.body}</p>
										</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				</section>
			) : null}

			{/* SECTION 6 — Social / customer videos */}
			<section id="pdp-story-reviews" className="scroll-mt-24 bg-[#F7F7F7] py-14 sm:py-20">
				<div className="mx-auto max-w-content px-4 sm:px-6">
					<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
						<SectionHeading eyebrow={c.social.eyebrow} title={c.social.title} />
						<div className="max-w-xs rounded-2xl border border-border bg-white px-5 py-4">
							<p className={cn("text-sm font-bold uppercase tracking-[0.14em]", accent)}>
								{c.social.asideLabel}
							</p>
							<p className="text-foreground/70 mt-2 text-sm leading-relaxed">{c.social.asideBody}</p>
						</div>
					</div>

					<div className="mt-10">
						{/* No Embla `loop` — cloning slides duplicates live <video> nodes and
						    flashes another clip's decoded frame at the loop seam. */}
						<Carousel opts={{ align: "start", loop: false }} className="relative w-full">
							<CarouselContent className="-ml-4">
								{c.social.clips.map((clip, index) => (
									<CarouselItem key={clip.id} className="basis-[78%] pl-4 sm:basis-[48%] lg:basis-1/3">
										<div className="overflow-hidden rounded-2xl bg-[#0B3D36]">
											<SocialClipVideo clip={clip} index={index} />
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<div className="mt-6 flex items-center justify-center gap-4">
								<CarouselPrevious variant="ghost" className={socialCarouselArrowClassName} />
								<SocialGalleryDots />
								<CarouselNext variant="ghost" className={socialCarouselArrowClassName} />
							</div>
						</Carousel>
					</div>

					<div className="mt-8 grid items-stretch gap-4 overflow-hidden rounded-2xl border border-border bg-white lg:grid-cols-[0.9fr_1.1fr]">
						<div className="bg-[#0B3D36]">
							<SoftImage
								image={c.social.featured.visual}
								sizes="(max-width: 1024px) 100vw, 40vw"
								className="h-full min-h-[220px] object-cover"
							/>
						</div>
						<blockquote className="flex flex-col justify-center p-6 sm:p-8">
							<p className={cn("text-xs font-bold uppercase tracking-[0.18em]", accent)}>Customer note</p>
							<p className={cn("mt-3 text-xl font-semibold leading-snug sm:text-2xl", forest)}>
								“{c.social.featured.quote}”
							</p>
							<footer className="text-foreground/70 mt-5 text-sm">
								<span className="font-semibold text-foreground">{c.social.featured.author}</span>
								{" · "}
								{c.social.featured.meta}
							</footer>
						</blockquote>
					</div>
				</div>
			</section>

			{/* SECTION 7 — Formula proof (no heavy-metal claims) */}
			{!hide.proof ? (
				<section className="bg-white py-14 sm:py-20">
					<div className="mx-auto max-w-content px-4 sm:px-6">
						<div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
							<div>
								<SectionHeading eyebrow={c.proof.eyebrow} title={c.proof.title} intro={c.proof.intro} />
								<ul className="mt-8 space-y-5">
									{c.proof.items.map((item) => (
										<li key={item.id} className="rounded-2xl border border-border bg-[#F7F7F7] px-5 py-4">
											<h3 className={cn("text-base font-semibold sm:text-lg", forest)}>{item.title}</h3>
											<p className="text-foreground/70 mt-2 text-sm leading-relaxed sm:text-base">
												{item.body}
											</p>
										</li>
									))}
								</ul>
							</div>
							<div className="overflow-hidden rounded-2xl border border-border bg-[#0B3D36]">
								<SoftImage image={c.proof.factsImage} sizes="(max-width: 1024px) 100vw, 45vw" />
							</div>
						</div>
					</div>
				</section>
			) : null}

			{/* SECTION 8 — FAQ */}
			<section className="bg-white py-14 sm:py-20">
				<div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
					<div>
						<div className="overflow-hidden rounded-2xl">
							<SoftImage
								image={c.faq.image}
								sizes="(max-width: 1024px) 100vw, 40vw"
								className="aspect-[3/4] object-cover"
							/>
						</div>
						<div className="mt-4 rounded-2xl bg-[#F0F0F0] p-5">
							<h3 className={cn("text-lg font-semibold", forest)}>{c.faq.asideTitle}</h3>
							<p className="text-foreground/70 mt-2 text-sm leading-relaxed">{c.faq.asideBody}</p>
						</div>
					</div>
					<div>
						<SectionHeading eyebrow={c.faq.eyebrow} title={c.faq.title} intro={c.faq.intro} />
						<div className="mt-8">
							<FaqAccordion faq={c.faq} />
						</div>
					</div>
				</div>
			</section>

			{/* Trust + final CTA */}
			<section className="border-t border-border bg-[#0B3D36] py-12 text-white sm:py-14">
				<div className="mx-auto max-w-content px-4 sm:px-6">
					<ul className="grid gap-6 sm:grid-cols-3">
						{c.trust.map((item) => (
							<li key={item.title} className="text-center sm:text-left">
								<p className="text-lg font-semibold">{item.title}</p>
								<p className="mt-1 text-sm text-white/70">{item.body}</p>
							</li>
						))}
					</ul>
					<div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white/5 px-6 py-6 sm:flex-row">
						<div className="flex items-start gap-3 text-center sm:text-left">
							<Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#F0A070]" />
							<div>
								<p className="font-semibold">{c.finalCta.title}</p>
								<p className="mt-1 text-sm text-white/70">{c.finalCta.body}</p>
							</div>
						</div>
						<a
							href="#offer"
							className="inline-flex h-12 items-center justify-center rounded-xl bg-[#C46A3A] px-7 text-sm font-semibold text-white transition hover:bg-[#b55c30]"
						>
							{c.finalCta.buttonLabel}
						</a>
					</div>
					<p className="mt-8 text-center text-xs leading-relaxed text-white/45">{c.disclaimer}</p>
				</div>
			</section>
		</div>
	);
}

/** @deprecated Prefer ConversionLandingView — kept for existing Shilajit page imports. */
export function Shilajit7in1LandingView({
	buyIsland,
	breadcrumbs,
}: {
	buyIsland: ReactNode;
	breadcrumbs?: BreadcrumbItem[];
}) {
	const comparison = getPdpStory(LANDING_SLUG)?.comparison;

	return (
		<ConversionLandingView
			buyIsland={buyIsland}
			content={shilajit7in1Landing}
			breadcrumbs={breadcrumbs}
			comparison={comparison}
			hideSections={{
				origin: true,
				botanicalsDiagram: true,
				cleanBar: true,
				lifestyle: true,
				routine: true,
				formatsDiffer: true,
				proof: true,
			}}
		/>
	);
}
