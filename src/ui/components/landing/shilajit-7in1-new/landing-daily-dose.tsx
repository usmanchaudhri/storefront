import Image from "next/image";

import { DAILY_DOSE } from "@/config/landing/daily-dose";
import { cn } from "@/lib/utils";

type LandingDailyDoseProps = {
	className?: string;
};

/**
 * Figma 3504:118 — “Take 2 Gummies Daily” band (below Natural Flavors).
 */
export function LandingDailyDose({ className }: LandingDailyDoseProps) {
	return (
		<section
			className={cn("w-full bg-white", className)}
			style={{ backgroundColor: DAILY_DOSE.background }}
			aria-labelledby="landing-daily-dose-heading"
		>
			<div className="mx-auto grid max-w-content grid-cols-1 items-center gap-8 px-5 py-12 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:px-11 lg:py-16">
				{/* Copy — left */}
				<div className="flex flex-col items-start lg:col-span-5">
					<p
						className="text-[clamp(0.9375rem,0.85rem+0.4vw,1.125rem)] font-black uppercase leading-none tracking-wide"
						style={{ color: DAILY_DOSE.accent }}
					>
						{DAILY_DOSE.eyebrow}
					</p>
					{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma; keep intrinsic 124×13 */}
					<img
						src={DAILY_DOSE.squiggleSrc}
						alt=""
						width={124}
						height={13}
						className="mt-1.5 h-auto w-[clamp(5.5rem,4rem+3vw,7.75rem)]"
					/>
					<h2
						id="landing-daily-dose-heading"
						className="mt-2 text-balance text-[clamp(2rem,1.3rem+2.5vw,3.75rem)] font-black leading-none tracking-tight"
						style={{ color: DAILY_DOSE.ink }}
					>
						{DAILY_DOSE.title}
					</h2>
					<p
						className="mt-3 text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] font-normal leading-snug"
						style={{ color: DAILY_DOSE.ink }}
					>
						{DAILY_DOSE.body}
					</p>
				</div>

				{/* Gummies + badge — right */}
				<div className="relative flex items-center justify-center lg:col-span-7 lg:justify-end">
					<div className="relative w-full max-w-[28rem] sm:max-w-[32rem] lg:max-w-[29.3rem]">
						<Image
							src={DAILY_DOSE.gummies.src}
							alt={DAILY_DOSE.gummies.alt}
							width={DAILY_DOSE.gummies.width}
							height={DAILY_DOSE.gummies.height}
							className="h-auto w-full object-contain"
							sizes="(max-width: 1024px) 80vw, 40vw"
						/>
						{/* Figma 3504:128 — orange callout badge */}
						<div
							className="absolute -right-1 top-1/2 flex size-[clamp(6.5rem,5rem+4vw,12.375rem)] -translate-y-[55%] flex-col items-center justify-center rounded-full border border-black/10 px-2 text-center uppercase text-white shadow-sm sm:-right-2 lg:-right-4 lg:top-[42%]"
							style={{ backgroundColor: DAILY_DOSE.badge }}
							aria-hidden={false}
						>
							<span className="flex flex-col items-center gap-0.5 text-[clamp(0.75rem,0.65rem+0.45vw,1.375rem)] font-extrabold leading-none">
								{DAILY_DOSE.badgeLines.map((line) => (
									<span key={line}>{line}</span>
								))}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
