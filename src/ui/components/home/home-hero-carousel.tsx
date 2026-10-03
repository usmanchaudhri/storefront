import Image from "next/image";
import Link from "next/link";

import {
	HOME_HERO_ACCENT,
	HOME_HERO_ARROW_SRC,
	HOME_HERO_BG,
	HOME_HERO_COPY,
	HOME_HERO_CTA_BG,
	HOME_HERO_CTA_FG,
	HOME_HERO_IMAGE,
	HOME_HERO_INK,
} from "@/config/home-hero-banners";
import { PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeHeroCarouselProps = {
	channel: string;
	className?: string;
};

/**
 * Homepage hero — Figma 3413:3984.
 * Full-bleed lifestyle photo with left-side copy over mint wash.
 */
export function HomeHeroCarousel({ channel, className }: HomeHeroCarouselProps) {
	const href = channelHref(channel, HOME_HERO_COPY.ctaHref);

	return (
		<section
			className={cn("relative w-full overflow-hidden border-b border-border", className)}
			style={{ backgroundColor: HOME_HERO_BG }}
			aria-label="Kaya Pure brand hero"
		>
			<div className="relative w-full">
				{/* Photo */}
				<div className="relative aspect-[3/4] w-full sm:aspect-[4/3] md:absolute md:inset-0 md:aspect-auto">
					<Image
						src={HOME_HERO_IMAGE.src}
						alt={HOME_HERO_IMAGE.alt}
						fill
						priority
						sizes="100vw"
						quality={PRODUCT_IMAGE_QUALITY}
						className="object-cover object-[78%_18%] md:object-center"
					/>
				</div>

				{/* Copy — stacked under photo on mobile; overlaid left on desktop */}
				<div className="relative z-10 px-5 py-9 sm:px-8 sm:py-10 md:absolute md:inset-0 md:flex md:items-center md:px-0 md:py-0">
					<div className="mx-auto w-full max-w-content md:px-6 lg:px-11">
						<div
							className="flex max-w-xl flex-col items-start text-left md:max-w-[min(34rem,42%)]"
							style={{ color: HOME_HERO_INK }}
						>
							<p className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
								{HOME_HERO_COPY.eyebrow}
							</p>

							<h1 className="mt-3 text-balance text-[clamp(2.75rem,1.2rem+4.5vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.04em]">
								<span className="block">{HOME_HERO_COPY.titleLine1}</span>
								<span className="block" style={{ color: HOME_HERO_ACCENT }}>
									{HOME_HERO_COPY.titleLine2}
								</span>
							</h1>

							<p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed sm:mt-6 sm:text-[1.05rem] sm:leading-[1.55]">
								{HOME_HERO_COPY.body}
							</p>

							<Link
								href={href}
								prefetch={false}
								className={cn(
									"mt-7 inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-[15px] font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90 sm:mt-8 sm:gap-4 sm:px-7 sm:py-4 sm:text-base",
									"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
								)}
								style={{ backgroundColor: HOME_HERO_CTA_BG, color: HOME_HERO_CTA_FG }}
							>
								{HOME_HERO_COPY.ctaLabel}
								<span
									className="inline-flex size-5 shrink-0 items-center justify-center sm:size-6"
									aria-hidden
								>
									{/* eslint-disable-next-line @next/next/no-img-element -- local SVG CTA icon from Figma */}
									<img
										src={HOME_HERO_ARROW_SRC}
										alt=""
										width={87}
										height={87}
										className="max-h-full max-w-full"
									/>
								</span>
							</Link>

							<div className="mt-8 flex items-center gap-3 sm:mt-10 sm:gap-4">
								<span
									className="h-px w-8 shrink-0 sm:w-10"
									style={{ backgroundColor: HOME_HERO_INK }}
									aria-hidden
								/>
								<p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.18em]">
									{HOME_HERO_COPY.footer}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Reserve desktop height so absolute photo + copy have a band */}
				<div
					className="pointer-events-none hidden w-full md:block"
					style={{ aspectRatio: `${HOME_HERO_IMAGE.width} / ${HOME_HERO_IMAGE.height}` }}
					aria-hidden
				/>
			</div>
		</section>
	);
}
