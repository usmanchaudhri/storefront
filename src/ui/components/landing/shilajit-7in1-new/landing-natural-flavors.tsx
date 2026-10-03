import { NATURAL_FLAVORS } from "@/config/landing/natural-flavors";
import { cn } from "@/lib/utils";

type LandingNaturalFlavorsProps = {
	className?: string;
};

/**
 * Figma 3413:4466 — “Natural Flavors, Delicious Taste”.
 */
export function LandingNaturalFlavors({ className }: LandingNaturalFlavorsProps) {
	return (
		<section
			className={cn("relative w-full overflow-hidden", className)}
			style={{ backgroundColor: NATURAL_FLAVORS.background }}
			aria-labelledby="landing-natural-flavors-heading"
		>
			{/* Figma curve fill — dark green wave along the bottom */}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] sm:h-[45%]" aria-hidden>
				{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
				<img
					src={NATURAL_FLAVORS.curveSrc}
					alt=""
					width={27436}
					height={9414}
					className="absolute inset-0 size-full object-cover object-top"
				/>
			</div>

			<div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-11 lg:pb-24 lg:pt-20">
				<h2
					id="landing-natural-flavors-heading"
					className="max-w-3xl text-balance text-center text-[clamp(2rem,1.3rem+2.8vw,3.5rem)] font-black leading-[1.05] tracking-tight text-white"
				>
					{NATURAL_FLAVORS.title}
				</h2>

				<ul className="mt-10 flex list-none flex-wrap items-start justify-center gap-5 sm:mt-12 sm:gap-8 lg:mt-14 lg:gap-10">
					{NATURAL_FLAVORS.flavors.map((flavor) => (
						<li
							key={flavor.id}
							className="flex size-[9.5rem] flex-col items-center justify-center rounded-full bg-white px-4 sm:size-[11.5rem] lg:size-[14rem]"
						>
							<span className="inline-flex h-[42%] w-[55%] items-center justify-center sm:h-[44%]">
								{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
								<img
									src={flavor.iconSrc}
									alt=""
									width={flavor.iconWidth}
									height={flavor.iconHeight}
									className="max-h-full max-w-full object-contain"
								/>
							</span>
							<p
								className="mt-2 text-center font-mono text-[13px] font-bold leading-tight sm:mt-2.5 sm:text-sm lg:text-base"
								style={{ color: NATURAL_FLAVORS.ink }}
							>
								{flavor.label}
							</p>
						</li>
					))}
				</ul>

				<p className="mt-10 self-end text-right text-[12px] text-white/60 sm:mt-12 sm:text-[13px] lg:mt-14">
					{NATURAL_FLAVORS.footnote}
				</p>
			</div>
		</section>
	);
}
