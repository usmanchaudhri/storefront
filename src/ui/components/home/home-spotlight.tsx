import Image from "next/image";
import Link from "next/link";

import { HOME_SPOTLIGHT } from "@/config/home-spotlight";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeSpotlightProps = {
	channel: string;
	className?: string;
};

/**
 * Figma 3413:4210 — “The Spotlight / 01” burgundy product band.
 */
export function HomeSpotlight({ channel, className }: HomeSpotlightProps) {
	const href = channelHref(channel, HOME_SPOTLIGHT.ctaHref);

	return (
		<section
			className={cn("w-full", className)}
			style={{ backgroundColor: HOME_SPOTLIGHT.background }}
			aria-labelledby="home-spotlight-heading"
		>
			<div className="mx-auto grid max-w-content grid-cols-1 items-center gap-8 px-5 py-14 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-11 lg:py-16 xl:gap-10">
				<div className="text-white lg:pr-4">
					<p className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
						{HOME_SPOTLIGHT.eyebrow}
					</p>
					<h2
						id="home-spotlight-heading"
						className="mt-4 max-w-xl text-balance text-[clamp(2.25rem,1.4rem+3.4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
					>
						{HOME_SPOTLIGHT.title}
					</h2>
					<p className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-white/95 sm:mt-6 sm:text-base lg:text-lg lg:leading-relaxed">
						{HOME_SPOTLIGHT.body}
					</p>

					<ul className="mt-7 flex list-none flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
						{HOME_SPOTLIGHT.tags.map((tag) => (
							<li
								key={tag}
								className="border border-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] sm:px-4 sm:text-xs"
							>
								{tag}
							</li>
						))}
					</ul>

					<div className="mt-8 sm:mt-10">
						<Link
							href={href}
							prefetch={false}
							className={cn(
								"inline-flex items-center gap-2.5 rounded-md px-5 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 sm:gap-3 sm:px-6 sm:py-4 sm:text-base",
								"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6F010D]",
							)}
							style={{ backgroundColor: HOME_SPOTLIGHT.buttonBackground }}
						>
							{HOME_SPOTLIGHT.ctaLabel}
							<span className="inline-flex size-5 shrink-0 items-center justify-center sm:size-6" aria-hidden>
								{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
								<img
									src={HOME_SPOTLIGHT.arrowSrc}
									alt=""
									width={100}
									height={100}
									className="max-h-full max-w-full"
								/>
							</span>
						</Link>
					</div>
				</div>

				{/* Figma 3413:5448 — full panel; contain so apple/roots are not cropped */}
				<div className="relative w-full overflow-visible">
					<Image
						src={HOME_SPOTLIGHT.image.src}
						alt={HOME_SPOTLIGHT.image.alt}
						width={HOME_SPOTLIGHT.image.width}
						height={HOME_SPOTLIGHT.image.height}
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="h-auto w-full object-contain object-center"
					/>
				</div>
			</div>
		</section>
	);
}
