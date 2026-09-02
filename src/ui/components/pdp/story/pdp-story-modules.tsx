import Image from "next/image";
import { Barlow, Inter } from "next/font/google";
import type { PdpStoryImage, PdpStoryPack } from "@/config/pdp-stories";
import { cn } from "@/lib/utils";
import { BlendBanner } from "@/ui/components/shared/blend-banner";
import { PdpStoryFaqAccordion } from "@/ui/components/pdp/story/pdp-story-faq-accordion";

/**
 * Figma comparison section typeface (nodes 2435:1089–2435:1135).
 * Inter Bold / SemiBold / Black / Regular as used in the design file.
 */
const comparisonFont = Inter({
	subsets: ["latin"],
	weight: ["400", "600", "700", "900"],
	display: "swap",
});

/** Figma FAQ heading (2435:999) — Barlow SemiBold. */
const faqHeadingFont = Barlow({
	subsets: ["latin"],
	weight: ["600"],
	display: "swap",
});

/** Figma off-white token (Quarter Spanish White). */
const blendTextClass = "text-[#F7F1DF]";

/** Figma accent cyan for look-inside highlights. */
const lookInsideAccentClass = "text-[#43E8D1]";

/** Figma teal gradient background for look-inside section. */
const lookInsideSurfaceClass = "bg-[linear-gradient(108.38deg,#0B4C42_7.07%,#02917D_91.12%)]";

/** Figma table column template: Feature 819.47 / Kaya Pure 300.58 / Traditional 300.58. */
const comparisonGridClass = "grid grid-cols-[minmax(0,2.726fr)_minmax(0,1fr)_minmax(0,1fr)]";

/** Figma Jagged Ice — Kaya Pure column highlight. */
const kayaPureColumnClass = "bg-[#BCE8E5]";

/** Figma 2435:901 — mint positioning strip under the blend banner. */
function PositioningBannerSection({ story }: { story: PdpStoryPack["positioningBanner"] }) {
	return (
		<section className="w-full bg-[#EFFBF8] px-5 pb-[50px] pt-[30px]" aria-label="Product positioning">
			<div className="mx-auto flex w-full max-w-[1039px] flex-col items-center gap-4">
				<div className="relative h-[45px] w-[56px] shrink-0" aria-hidden>
					<Image
						src={story.icon.src}
						alt=""
						width={story.icon.width}
						height={story.icon.height}
						className="h-[45px] w-[56px] object-contain"
						unoptimized={story.icon.src.endsWith(".svg")}
					/>
				</div>
				<p className="max-w-[751px] text-center text-[clamp(1rem,0.95rem+0.2vw,1.375rem)] font-normal leading-[1.5] text-[#052F30]">
					{story.body}
				</p>
			</div>
		</section>
	);
}

/** Figma 2492:408 — full-bleed “2 Gummies. Simple Routine.” artwork (copy is in the image). */
function SimpleRoutineBannerSection({ story }: { story: PdpStoryPack["simpleRoutineBanner"] }) {
	const bannerHeight = `calc(100vw * ${story.image.height} / ${story.image.width})`;

	return (
		<section
			className="relative w-full overflow-hidden bg-[#073B35]"
			aria-label={story.image.alt}
			style={{ minHeight: bannerHeight }}
		>
			<div className="absolute inset-0">
				<Image
					src={story.image.src}
					alt={story.image.alt}
					width={story.image.width}
					height={story.image.height}
					className="h-full w-full object-cover object-center"
					sizes="100vw"
				/>
			</div>
			<div className="relative z-10" style={{ minHeight: bannerHeight }} aria-hidden />
		</section>
	);
}

function RoutineIconRow({ icon, label }: { icon: PdpStoryImage; label: string }) {
	return (
		<li className="flex items-center gap-[13px]">
			<span className="inline-flex h-12 w-12 shrink-0 items-center justify-center" aria-hidden>
				<Image
					src={icon.src}
					alt=""
					width={icon.width}
					height={icon.height}
					className="h-12 w-12 object-contain"
				/>
			</span>
			<span
				className={cn(
					blendTextClass,
					"text-[clamp(1rem,0.95rem+0.15vw,1.375rem)] font-medium leading-normal",
				)}
			>
				{label}
			</span>
		</li>
	);
}

function RoutineCopy({ story }: { story: PdpStoryPack["routine"] }) {
	return (
		<div className="flex max-w-[732px] flex-col gap-7">
			<h2 id="pdp-story-routine-heading">
				<span
					className={cn(
						blendTextClass,
						"inline-block rounded-full bg-[#E84660] px-10 py-[18px] text-[clamp(0.9375rem,0.88rem+0.2vw,1.25rem)] font-semibold uppercase leading-[1.4] sm:px-16 lg:px-20",
					)}
				>
					{story.title}
				</span>
			</h2>
			<div className="flex flex-col gap-2.5">
				<p className="text-pretty text-[clamp(1.0625rem,1rem+0.2vw,1.375rem)] font-bold leading-[1.25] text-white">
					{story.intro}
				</p>
				<ul className="space-y-1" role="list">
					{story.checkItems.map((item) => (
						<li
							key={item}
							className="flex items-start gap-[17px] text-[clamp(1rem,0.95rem+0.15vw,1.25rem)] leading-[1.85] text-white"
						>
							<span className="shrink-0 font-black" aria-hidden>
								✓
							</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
			<ul className="flex max-w-[450px] flex-col gap-6" role="list">
				{story.iconItems.map((item) => (
					<RoutineIconRow key={item.id} icon={item.icon} label={item.label} />
				))}
			</ul>
		</div>
	);
}

function RoutineSection({ story }: { story: PdpStoryPack["routine"] }) {
	const bannerHeight = `calc(100vw * ${story.image.height} / ${story.image.width})`;

	return (
		<section
			className="relative w-full overflow-hidden bg-[#073B35]"
			aria-labelledby="pdp-story-routine-heading"
			style={{ minHeight: bannerHeight }}
		>
			<div className="absolute inset-0">
				<Image
					src={story.image.src}
					alt={story.image.alt}
					width={story.image.width}
					height={story.image.height}
					className="h-full w-full object-cover object-center"
					sizes="100vw"
				/>
			</div>
			<div
				className="relative z-10 flex items-center py-10 sm:py-12 lg:py-[40px]"
				style={{ minHeight: bannerHeight }}
			>
				<div className="mx-auto w-full max-w-[1255px] px-4 sm:px-6 lg:px-8">
					<RoutineCopy story={story} />
				</div>
			</div>
		</section>
	);
}

function LookInsideIngredientCard({
	ingredient,
}: {
	ingredient: PdpStoryPack["lookInside"]["ingredients"][number];
}) {
	return (
		<li className="flex flex-col items-center gap-[11px] text-center">
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
			<p
				className={cn(
					lookInsideAccentClass,
					"text-[clamp(1rem,0.95rem+0.15vw,1.25rem)] font-semibold uppercase leading-normal",
				)}
			>
				{ingredient.name}
			</p>
			<p
				className={cn(
					blendTextClass,
					"max-w-[236px] text-pretty text-[clamp(0.9375rem,0.9rem+0.12vw,1.125rem)] leading-[1.4]",
				)}
			>
				{ingredient.benefit}
			</p>
		</li>
	);
}

function LookInsideSection({ story, disclaimer }: { story: PdpStoryPack["lookInside"]; disclaimer: string }) {
	return (
		<section className={lookInsideSurfaceClass} aria-labelledby="pdp-story-inside-heading">
			<div className="mx-auto max-w-[1255px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
				<h2
					id="pdp-story-inside-heading"
					className="text-center text-[clamp(1.75rem,1.15rem+2vw,2.875rem)] font-semibold uppercase tracking-[0.5px]"
				>
					<span className={blendTextClass}>{story.titlePrefix}</span>
					<span className={cn(lookInsideAccentClass, "font-extrabold")}>{story.titleAccent}</span>
				</h2>
				<p
					className={cn(
						blendTextClass,
						"mx-auto mt-5 max-w-[1094px] text-pretty text-center text-[clamp(0.9375rem,0.88rem+0.25vw,1.25rem)] leading-[1.4]",
					)}
				>
					{story.intro}
				</p>
				<ul
					className="mt-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
					role="list"
				>
					{story.ingredients.map((ingredient) => (
						<LookInsideIngredientCard key={ingredient.name} ingredient={ingredient} />
					))}
				</ul>
				<div className="mt-12 flex justify-center">
					<a
						href="#main"
						className="inline-flex min-h-[51px] items-center justify-center rounded-full bg-[#43E8D1] px-10 py-3 text-[clamp(1rem,0.95rem+0.2vw,1.375rem)] font-bold uppercase tracking-[0.5px] text-[#0B554B] transition-opacity hover:opacity-90"
					>
						{story.ctaLabel}
					</a>
				</div>
				<p
					className={cn(
						blendTextClass,
						"mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed opacity-55",
					)}
				>
					{disclaimer}
				</p>
			</div>
		</section>
	);
}

/**
 * Figma composite (nodes 2435:1089, 1091, 1092, 1093, 1135, 1523).
 *
 * Exact layout relative to table left (content width 1423.79):
 * - Heading + subline centered above
 * - Cyan protrusion #BCE8E5 at x=821 (Kaya Pure column), 301×169, overlaps table by ~17px
 * - Gummy 2435:1523 (204×136) as Kaya Pure column heading on the cyan tab
 * - Traditional bottle 2435:1135 at x=1210, 109×132, above Traditional column
 * - Table at y offset 152 below protrusion top, rounded 31.64, border rgba(0,163,140,0.5)
 */
function ComparisonSection({ story }: { story: PdpStoryPack["comparison"] }) {
	return (
		<section
			className={cn(comparisonFont.className, "bg-[#F7F1DF]")}
			aria-labelledby="pdp-story-comparison-heading"
		>
			<div className="mx-auto w-full max-w-[1504px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
				{/* 2435:1089 / 2435:1090 */}
				<h2
					id="pdp-story-comparison-heading"
					className="mx-auto max-w-[962px] text-center text-[clamp(1.75rem,1.1rem+2.6vw,3.492rem)] font-bold uppercase leading-none tracking-[1.397px]"
				>
					<span className="text-[#0B554B]">{story.titlePrefix}</span>
					<span className="text-[#29C7C0]"> {story.titleAccent}</span>
				</h2>

				{/* 2435:1091 — 25px / leading 41px */}
				<p className="mx-auto mt-5 max-w-[817px] text-center text-[clamp(1rem,0.9rem+0.4vw,1.5625rem)] font-normal leading-[1.64] text-[#2F2C3C]">
					{story.intro}
				</p>

				<div className="mt-10 overflow-x-auto sm:mt-12">
					{/*
					  Stage matches Figma composite height from cyan top (y=208) to table bottom (y=846) = 638px
					  at content width 1423.79. Aspect-ratio keeps alignment while scaling.
					*/}
					<div className="relative mx-auto aspect-[1423.79/638] w-full min-w-[720px] max-w-[1424px]">
						{/* 2435:1092 — cyan Kaya Pure tab (x=821, 301×169) */}
						<div
							className={cn(
								kayaPureColumnClass,
								"absolute left-[57.65%] top-0 z-10 flex h-[26.49%] w-[21.14%] items-end justify-center pb-[2%]",
							)}
							role="presentation"
						>
							{/* 2435:1523 — gummy as Kaya Pure column heading */}
							<Image
								src={story.kayaPureImage.src}
								alt={story.kayaPureImage.alt}
								width={story.kayaPureImage.width}
								height={story.kayaPureImage.height}
								className="h-[80%] w-auto max-w-[90%] object-contain drop-shadow-sm"
								sizes="204px"
							/>
						</div>

						{/* 2435:1135 — traditional bottle (x=1210, 109×132) */}
						<div className="absolute left-[85%] top-0 z-20 h-[20.69%] w-[7.66%]">
							<Image
								src={story.traditionalImage.src}
								alt={story.traditionalImage.alt}
								width={story.traditionalImage.width}
								height={story.traditionalImage.height}
								className="size-full object-cover"
								sizes="109px"
							/>
						</div>

						{/* 2435:1093 — table starts 152px below stage top */}
						<div
							className="absolute inset-x-0 bottom-0 top-[23.82%] z-0 overflow-hidden rounded-[31.64px] border-[1.582px] border-[rgba(0,163,140,0.5)] bg-white"
							role="table"
							aria-label={`${story.kayaPureLabel} versus ${story.traditionalLabel.replace("\n", " ")}`}
						>
							{/* Header ~112px of 486 */}
							<div
								className={cn(
									comparisonGridClass,
									"h-[23.05%] border-b-[1.582px] border-[rgba(0,163,140,0.2)]",
								)}
								role="row"
							>
								<div className="h-full" role="columnheader">
									<span className="sr-only">Feature</span>
								</div>
								<div className={cn(kayaPureColumnClass, "relative z-10 h-full")} role="columnheader">
									<span className="sr-only">{story.kayaPureLabel}</span>
								</div>
								<div
									className="flex h-full flex-col items-center justify-center px-7 text-center text-[clamp(0.875rem,0.8rem+0.3vw,1.374rem)] font-bold uppercase leading-[1.43] text-[#0B554B]"
									role="columnheader"
								>
									<span className="inline-block max-w-[151px] whitespace-pre-line">
										{story.traditionalLabel}
									</span>
								</div>
							</div>

							{story.rows.map((row, index) => {
								const isLast = index === story.rows.length - 1;
								return (
									<div
										key={row.feature}
										className={cn(
											comparisonGridClass,
											"h-[15.39%]",
											!isLast && "border-b-[1.582px] border-[rgba(0,163,140,0.2)]",
										)}
										role="row"
									>
										<div
											className="flex h-full items-center px-7 text-[clamp(0.9375rem,0.88rem+0.25vw,1.625rem)] font-semibold leading-[1.03] text-[#2F2C3C]"
											role="cell"
										>
											{row.feature}
										</div>
										<div
											className={cn(kayaPureColumnClass, "flex h-full items-center justify-center px-7")}
											role="cell"
										>
											<span
												className="text-[clamp(1.125rem,1rem+0.5vw,1.5625rem)] font-black leading-none text-[#067C6F]"
												aria-hidden
											>
												{row.kayaPure ? "✓" : "x"}
											</span>
											<span className="sr-only">{row.kayaPure ? "Yes" : "No"}</span>
										</div>
										<div className="flex h-full items-center justify-center px-7" role="cell">
											<span
												className="text-[clamp(1.5rem,1.25rem+0.75vw,2.1875rem)] font-normal leading-none text-[#5D746F]"
												aria-hidden
											>
												{row.traditional ? "✓" : "x"}
											</span>
											<span className="sr-only">{row.traditional ? "Yes" : "No"}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/**
 * Figma 2435:996 — Got Questions?
 * Left: Barlow heading + intro + rounded product image.
 * Right: accordion FAQ with teal +/- controls.
 */
function FaqSection({ story }: { story: PdpStoryPack["faq"] }) {
	return (
		<section className="bg-white" aria-labelledby="pdp-story-faq-heading">
			<div className="mx-auto grid w-full max-w-[1255px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,453px)_minmax(0,1fr)] lg:items-start lg:gap-x-[114px] lg:px-8 lg:py-20">
				<div className="max-w-[453px]">
					<h2
						id="pdp-story-faq-heading"
						className={cn(
							faqHeadingFont.className,
							"text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-semibold uppercase leading-none text-[#0B554B]",
						)}
					>
						{story.title}
					</h2>
					<p className="mt-7 max-w-[453px] text-[clamp(1rem,0.95rem+0.2vw,1.375rem)] font-normal leading-[1.4] text-[#3F3F3F]">
						{story.intro}
					</p>
					<div className="mt-7 max-w-[402px] overflow-hidden rounded-[30px]">
						<Image
							src={story.image.src}
							alt={story.image.alt}
							width={story.image.width}
							height={story.image.height}
							className="aspect-[402/610] w-full object-cover"
							sizes="(max-width: 1024px) 90vw, 402px"
						/>
					</div>
				</div>

				<div className="min-w-0 lg:pt-[7.5rem]">
					<PdpStoryFaqAccordion items={story.items} defaultOpenId={story.items[0]?.id} />
				</div>
			</div>
		</section>
	);
}

/**
 * Figma 2435:1040 — teal trust bar with shipping / social proof / guarantee columns.
 */
function TrustSection({ story }: { story: PdpStoryPack["trust"] }) {
	return (
		<section className="bg-[#00A38C]" aria-label="Shipping, community, and satisfaction guarantee">
			<div className="mx-auto grid w-full max-w-[1255px] gap-10 px-4 py-[60px] sm:px-6 md:grid-cols-3 md:gap-8 lg:px-8">
				{story.items.map((item) => (
					<div key={item.id} className="flex flex-col items-center text-center">
						<div className="relative size-[62px] shrink-0" aria-hidden>
							<Image
								src={item.icon.src}
								alt=""
								width={item.icon.width}
								height={item.icon.height}
								className="size-full object-contain"
								sizes="62px"
								unoptimized={item.icon.src.endsWith(".svg")}
							/>
						</div>
						<div className="mt-[15px] flex w-full max-w-[336px] flex-col items-center gap-2.5">
							<h3
								className={cn(
									faqHeadingFont.className,
									"text-[clamp(1.0625rem,1rem+0.2vw,1.375rem)] font-semibold leading-normal text-white",
								)}
							>
								{item.title}
							</h3>
							{item.id === "guarantee" && item.detailsLabel && item.email ? (
								<p className="text-[clamp(0.9375rem,0.9rem+0.15vw,1.125rem)] leading-[1.4] text-white">
									<a
										href={item.detailsHref ?? "#"}
										className="font-semibold text-[#F7F1DF] underline-offset-2 hover:underline"
									>
										{item.detailsLabel}
									</a>
									<span className="font-normal">{` or email `}</span>
									<a
										href={`mailto:${item.email}`}
										className="font-bold text-white underline-offset-2 hover:underline"
									>
										{item.email}
									</a>
									<br />
									<span className="font-normal">{item.body}</span>
								</p>
							) : (
								<p className="whitespace-pre-line text-[clamp(0.9375rem,0.9rem+0.15vw,1.125rem)] font-normal leading-[1.4] text-white">
									{item.body}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

/**
 * Figma 2435:1088 band + 2435:1486 / 1488 / 1452 —
 * REAL REVIEWS. REAL RESULTS. placeholder feed with SHOP NOW CTA.
 */
function ReviewsSection({ story }: { story: PdpStoryPack["reviews"] }) {
	return (
		<section
			id="pdp-story-reviews"
			className={cn(comparisonFont.className, "bg-white")}
			aria-labelledby="pdp-story-reviews-heading"
		>
			<div className="mx-auto w-full max-w-[1354px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
				<h2
					id="pdp-story-reviews-heading"
					className="text-center text-[clamp(1.75rem,1.2rem+2.2vw,3.227rem)] font-bold uppercase leading-none tracking-[-0.03em]"
				>
					<span className="text-[#073B35]">{story.titlePrefix}</span>{" "}
					<span className="text-[#00A38C]">{story.titleAccent}</span>
				</h2>

				<p className="mx-auto mt-5 max-w-[56rem] text-center text-[clamp(0.875rem,0.85rem+0.12vw,0.968rem)] font-normal leading-[1.57] text-[#8A9A96]">
					{story.intro}
				</p>

				<ul className="mt-10 list-none sm:mt-12" role="list">
					{story.items.map((item) => (
						<li
							key={item.id}
							className="flex flex-col gap-4 border-b border-[#E5E9E7] py-6 sm:flex-row sm:items-end sm:gap-[25px] sm:py-[24px]"
						>
							<div className="flex w-full shrink-0 flex-col items-center rounded-[8.37px] bg-[#EFFBF8] px-4 py-4 text-center sm:w-[237px]">
								<p className="text-[clamp(0.9375rem,0.9rem+0.15vw,1.116rem)] font-bold leading-[1.47] text-[#17352F]">
									{item.badgeLabel}
								</p>
								<p
									className="text-[clamp(0.9375rem,0.9rem+0.15vw,1.116rem)] font-normal leading-[1.47] text-[#17352F]"
									aria-label="5 out of 5 stars"
								>
									{item.ratingLabel}
								</p>
							</div>

							<div className="flex min-w-0 flex-1 flex-col items-center gap-4 text-center">
								<p className="text-[clamp(0.9375rem,0.9rem+0.15vw,1.081rem)] font-bold leading-[1.52] text-[#17352F]">
									{item.title}
								</p>
								<p className="text-[clamp(0.9375rem,0.9rem+0.15vw,1.073rem)] font-normal leading-[1.53] text-[#17352F]">
									{item.body}
								</p>
							</div>

							<div className="flex w-full shrink-0 justify-center sm:w-[126px] sm:justify-center sm:pb-16">
								<span className="text-[1.134rem] font-normal leading-[1.45] text-[#17352F]">
									{item.author}
								</span>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-8 flex justify-center sm:mt-10">
					<a
						href="#main"
						className="inline-flex h-[55px] w-full max-w-[276px] items-center justify-center rounded-full bg-[#073B35] px-8 text-[clamp(0.9375rem,0.9rem+0.12vw,1.047rem)] font-bold uppercase leading-none tracking-wide text-white transition-opacity hover:opacity-90"
					>
						{story.ctaLabel}
					</a>
				</div>
			</div>
		</section>
	);
}

export function PdpStoryModules({ story }: { story: PdpStoryPack }) {
	return (
		<div className="mt-10 sm:mt-14">
			<BlendBanner story={story.blend} headingId="pdp-story-blend-heading" priority />
			<PositioningBannerSection story={story.positioningBanner} />
			<SimpleRoutineBannerSection story={story.simpleRoutineBanner} />
			<RoutineSection story={story.routine} />
			<LookInsideSection story={story.lookInside} disclaimer={story.disclaimer} />
			<ComparisonSection story={story.comparison} />
			<FaqSection story={story.faq} />
			<TrustSection story={story.trust} />
			<ReviewsSection story={story.reviews} />
		</div>
	);
}
