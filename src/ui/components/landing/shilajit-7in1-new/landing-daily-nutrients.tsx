import Image from "next/image";

import { DAILY_NUTRIENTS } from "@/config/landing/daily-nutrients";
import { cn } from "@/lib/utils";

type LandingDailyNutrientsProps = {
	className?: string;
};

/**
 * Figma 3413:4391 — “18 Daily Nutrients” support grid.
 */
export function LandingDailyNutrients({ className }: LandingDailyNutrientsProps) {
	return (
		<section className={cn("w-full bg-white", className)} aria-labelledby="landing-daily-nutrients-heading">
			<div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-11 lg:py-20">
				<div className="lg:col-span-4">
					<h2
						id="landing-daily-nutrients-heading"
						className="text-balance text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] font-black leading-[1.05] tracking-tight"
						style={{ color: DAILY_NUTRIENTS.ink }}
					>
						{DAILY_NUTRIENTS.title}
					</h2>
					<p
						className="mt-3 text-[13px] font-black uppercase tracking-[0.04em] sm:mt-4 sm:text-sm"
						style={{ color: DAILY_NUTRIENTS.accent }}
					>
						{DAILY_NUTRIENTS.subtitle}
					</p>
				</div>

				<ul className="grid list-none grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:col-span-8 lg:gap-x-10">
					{DAILY_NUTRIENTS.items.map((item) => (
						<li key={item.id} className="flex items-center gap-4 sm:gap-5">
							<span className="inline-flex size-16 shrink-0 items-center justify-center sm:size-20 lg:size-[5.5rem]">
								{item.iconSrc.endsWith(".webp") ? (
									<Image
										src={item.iconSrc}
										alt=""
										width={item.iconWidth}
										height={item.iconHeight}
										className="size-full object-contain"
									/>
								) : (
									// eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma
									<img
										src={item.iconSrc}
										alt=""
										width={item.iconWidth}
										height={item.iconHeight}
										className="max-h-full max-w-full"
									/>
								)}
							</span>
							<div className="min-w-0" style={{ color: DAILY_NUTRIENTS.ink }}>
								<p className="text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-bold leading-tight">
									{item.title}
								</p>
								<p className="mt-0.5 text-[clamp(0.875rem,0.8rem+0.35vw,1.0625rem)] font-normal leading-snug">
									{item.detail}
									{item.showAsterisk ? <span aria-hidden>*</span> : null}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
