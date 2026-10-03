import { HOME_HUMAN_WELLNESS } from "@/config/home-human-wellness";
import { cn } from "@/lib/utils";

type HomeHumanWellnessProps = {
	className?: string;
};

/**
 * Figma 3413:4237 — centered wellness quote band.
 */
export function HomeHumanWellness({ className }: HomeHumanWellnessProps) {
	return (
		<section className={cn("w-full bg-white", className)} aria-labelledby="home-human-wellness-heading">
			<div className="mx-auto max-w-content px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-11 lg:py-24">
				<p
					className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]"
					style={{ color: HOME_HUMAN_WELLNESS.eyebrowColor }}
				>
					{HOME_HUMAN_WELLNESS.eyebrow}
				</p>

				<blockquote id="home-human-wellness-heading" className="mt-6 sm:mt-8">
					<p
						className="mx-auto max-w-4xl text-balance text-[clamp(1.75rem,1.1rem+2.8vw,3.25rem)] font-semibold leading-[1.2] tracking-[-0.03em]"
						style={{ color: HOME_HUMAN_WELLNESS.quoteColor }}
					>
						{HOME_HUMAN_WELLNESS.quoteBefore}
						<span style={{ color: HOME_HUMAN_WELLNESS.accentColor }}>{HOME_HUMAN_WELLNESS.quoteAccent}</span>
						{HOME_HUMAN_WELLNESS.quoteAfter}
					</p>
				</blockquote>

				<p
					className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] sm:mt-8 sm:text-xs sm:tracking-[0.18em]"
					style={{ color: HOME_HUMAN_WELLNESS.eyebrowColor }}
				>
					{HOME_HUMAN_WELLNESS.footer}
				</p>
			</div>
		</section>
	);
}
