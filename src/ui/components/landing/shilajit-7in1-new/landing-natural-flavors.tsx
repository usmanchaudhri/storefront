import Image from "next/image";

import { NATURAL_FLAVORS } from "@/config/landing/natural-flavors";
import { cn } from "@/lib/utils";

type LandingNaturalFlavorsProps = {
	className?: string;
};

/**
 * Figma 3504:742 — “Natural Flavors, Delicious Taste” banner with lifestyle photo.
 */
export function LandingNaturalFlavors({ className }: LandingNaturalFlavorsProps) {
	return (
		<section
			className={cn("relative w-full overflow-hidden", className)}
			style={{ backgroundColor: NATURAL_FLAVORS.background }}
			aria-labelledby="landing-natural-flavors-heading"
		>
			{/* Figma curve fill — dark green wave along the bottom */}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] sm:h-[42%]" aria-hidden>
				{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
				<img
					src={NATURAL_FLAVORS.curveSrc}
					alt=""
					width={5760}
					height={1976}
					className="absolute inset-0 size-full object-cover object-top"
				/>
			</div>

			<div className="relative z-10 mx-auto grid max-w-content grid-cols-1 items-end gap-6 px-5 pb-14 pt-10 sm:gap-8 sm:px-6 sm:pb-16 sm:pt-12 lg:grid-cols-12 lg:items-center lg:gap-4 lg:px-11 lg:pb-10 lg:pt-6">
				{/* Lifestyle photo — left (Figma 3504:804) */}
				<div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:mx-0 lg:-ml-6 lg:max-w-none xl:-ml-10">
					<Image
						src={NATURAL_FLAVORS.lifestyle.src}
						alt={NATURAL_FLAVORS.lifestyle.alt}
						width={NATURAL_FLAVORS.lifestyle.width}
						height={NATURAL_FLAVORS.lifestyle.height}
						className="h-auto w-full object-contain object-bottom"
						sizes="(max-width: 1024px) 70vw, 38vw"
						priority={false}
					/>
				</div>

				{/* Copy + flavor pills — right */}
				<div className="relative flex flex-col items-center lg:col-span-7 lg:items-center lg:py-10">
					<h2
						id="landing-natural-flavors-heading"
						className="max-w-xl text-balance text-center text-[clamp(2rem,1.2rem+2.8vw,3.75rem)] font-black leading-[1] tracking-tight text-white"
					>
						<span className="block">{NATURAL_FLAVORS.titleLine1}</span>
						<span className="block">{NATURAL_FLAVORS.titleLine2}</span>
					</h2>

					<ul className="mt-8 flex list-none flex-wrap items-start justify-center gap-5 sm:mt-10 sm:gap-6 lg:mt-12 lg:gap-[25px]">
						{NATURAL_FLAVORS.flavors.map((flavor) => (
							<li
								key={flavor.id}
								className="flex size-[9.5rem] flex-col items-center justify-center rounded-full bg-white px-4 sm:size-[11rem] lg:size-[12.5rem]"
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
									className="mt-2 text-center font-mono text-[13px] font-bold leading-tight sm:mt-2.5 sm:text-sm lg:text-lg"
									style={{ color: NATURAL_FLAVORS.ink }}
								>
									{flavor.label}
								</p>
							</li>
						))}
					</ul>

					<p className="mt-8 w-full text-center text-[12px] text-white/60 sm:mt-10 sm:text-right sm:text-[13px] lg:mt-12 lg:text-[18px] lg:leading-[1.8]">
						{NATURAL_FLAVORS.footnote}
					</p>
				</div>
			</div>
		</section>
	);
}
