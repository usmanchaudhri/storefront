import Image from "next/image";
import Link from "next/link";

import { HOME_WELLNESS_RITUAL } from "@/config/home-wellness-ritual";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeWellnessRitualProps = {
	channel: string;
	className?: string;
};

/**
 * Figma 3413:4076 — split lifestyle + copy band under Shop Now.
 */
export function HomeWellnessRitual({ channel, className }: HomeWellnessRitualProps) {
	const href = channelHref(channel, HOME_WELLNESS_RITUAL.ctaHref);

	return (
		<section
			className={cn("w-full", className)}
			style={{ backgroundColor: HOME_WELLNESS_RITUAL.background }}
			aria-labelledby="home-wellness-ritual-heading"
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
				<div className="relative aspect-square w-full overflow-hidden lg:aspect-auto lg:min-h-[min(100vw,42rem)]">
					<Image
						src={HOME_WELLNESS_RITUAL.image.src}
						alt={HOME_WELLNESS_RITUAL.image.alt}
						width={HOME_WELLNESS_RITUAL.image.width}
						height={HOME_WELLNESS_RITUAL.image.height}
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="absolute inset-0 size-full object-cover object-center"
						priority={false}
					/>
				</div>

				<div className="flex flex-col justify-center px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
					<p className="text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]">
						{HOME_WELLNESS_RITUAL.eyebrow}
					</p>

					<h2
						id="home-wellness-ritual-heading"
						className="mt-4 max-w-xl text-balance text-[clamp(2rem,1.3rem+2.8vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] sm:mt-5"
					>
						{HOME_WELLNESS_RITUAL.title}
					</h2>

					<p className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-white/95 sm:mt-6 sm:text-base lg:text-lg lg:leading-relaxed">
						{HOME_WELLNESS_RITUAL.body}
					</p>

					<div className="mt-8 sm:mt-10">
						<Link
							href={href}
							prefetch={false}
							className={cn(
								"inline-flex items-center gap-2.5 rounded-md bg-white px-5 py-3.5 text-[15px] font-medium shadow-sm transition-opacity hover:opacity-90 sm:gap-3 sm:px-6 sm:py-4 sm:text-base",
								"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#048270]",
							)}
							style={{ color: HOME_WELLNESS_RITUAL.buttonText }}
						>
							{HOME_WELLNESS_RITUAL.ctaLabel}
							<span className="inline-flex size-5 shrink-0 items-center justify-center sm:size-6" aria-hidden>
								{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
								<img
									src={HOME_WELLNESS_RITUAL.arrowSrc}
									alt=""
									width={114}
									height={114}
									className="max-h-full max-w-full"
								/>
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
