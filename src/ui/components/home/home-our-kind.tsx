import Link from "next/link";

import { HOME_OUR_KIND } from "@/config/home-our-kind";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeOurKindProps = {
	channel: string;
	className?: string;
};

/**
 * Figma 3413:4245 — “Our kind of wellness” teal CTA band.
 */
export function HomeOurKind({ channel, className }: HomeOurKindProps) {
	const href = channelHref(channel, HOME_OUR_KIND.ctaHref);

	return (
		<section
			className={cn("w-full", className)}
			style={{ backgroundColor: HOME_OUR_KIND.background, color: HOME_OUR_KIND.text }}
			aria-labelledby="home-our-kind-heading"
		>
			<div className="mx-auto flex max-w-content flex-col gap-8 px-5 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-11 lg:py-20">
				<div className="min-w-0 max-w-3xl">
					<p className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
						{HOME_OUR_KIND.eyebrow}
					</p>
					<h2
						id="home-our-kind-heading"
						className="mt-4 text-balance text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em]"
					>
						{HOME_OUR_KIND.titleLine1}
						<br />
						{HOME_OUR_KIND.titleLine2Before}
						<span style={{ color: HOME_OUR_KIND.accent }}>{HOME_OUR_KIND.titleLine2Accent}</span>
					</h2>
					<p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/90 sm:mt-5 sm:text-base lg:text-lg">
						{HOME_OUR_KIND.body}
					</p>
				</div>

				<Link
					href={href}
					prefetch={false}
					aria-label={HOME_OUR_KIND.ctaLabel}
					className={cn(
						"inline-flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-white/50 transition-opacity hover:opacity-80 sm:size-20 lg:size-[5.5rem]",
						"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#178975]",
					)}
				>
					{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
					<img
						src={HOME_OUR_KIND.arrowSrc}
						alt=""
						width={138}
						height={138}
						className="max-h-[48%] max-w-[48%]"
					/>
				</Link>
			</div>
		</section>
	);
}
