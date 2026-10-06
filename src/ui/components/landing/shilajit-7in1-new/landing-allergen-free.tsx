import { ALLERGEN_FREE } from "@/config/landing/allergen-free";
import { cn } from "@/lib/utils";

type LandingAllergenFreeProps = {
	className?: string;
};

/**
 * Figma 3504:135 — “Certified Allergen Free” (below Natural Flavors).
 *
 * Designed on a 1920px artboard (content band ~1600px). Site `--container-content`
 * is 1400px, so typography/spacing use fluid clamps that preserve Figma ratios
 * without stretching the 103×103 allergen SVG assets.
 */
export function LandingAllergenFree({ className }: LandingAllergenFreeProps) {
	return (
		<section
			className={cn("w-full", className)}
			style={{ backgroundColor: ALLERGEN_FREE.background }}
			aria-labelledby="landing-allergen-free-heading"
		>
			{/*
			  Figma: px-160 / py-110 on 1920 → ~8.3% / 5.7% of artboard.
			  Inner max-w 1600 with gap-327 between copy and icon grid.
			*/}
			<div className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-14 sm:gap-12 sm:px-6 sm:py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-[clamp(2rem,6vw,5rem)] lg:px-11 lg:py-[clamp(4rem,7vw,6.875rem)]">
				{/* Left copy — Figma max-w 475 */}
				<div className="flex w-full max-w-[29.6875rem] flex-col gap-3.5 lg:shrink-0 lg:pt-1">
					<h2
						id="landing-allergen-free-heading"
						className="text-[clamp(2rem,1.25rem+2.5vw,3.75rem)] font-black leading-none tracking-tight"
						style={{ color: ALLERGEN_FREE.ink }}
					>
						<span className="block">{ALLERGEN_FREE.titleLine1}</span>
						<span className="mt-0 inline-flex flex-wrap items-center gap-2.5 sm:gap-3">
							<span>{ALLERGEN_FREE.titleLine2}</span>
							{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma; keep intrinsic 59×59 */}
							<img
								src={ALLERGEN_FREE.checkmarkSrc}
								alt=""
								width={59}
								height={59}
								className="inline-block h-auto w-[clamp(2.5rem,2rem+1.5vw,3.6875rem)] shrink-0"
							/>
						</span>
					</h2>
					<p
						className="text-[clamp(1.0625rem,0.95rem+0.6vw,1.5rem)] font-black leading-[1.8]"
						style={{ color: ALLERGEN_FREE.accent }}
					>
						{ALLERGEN_FREE.subtitle}
					</p>
				</div>

				{/*
				  Right grid — Figma 642×397, 3×3 items (~206px columns, 103px icons).
				  Cap width so icons stay near design size on large screens.
				*/}
				<ul
					className="grid w-full list-none grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-y-7 md:grid-cols-3 md:gap-x-4 md:gap-y-8 lg:max-w-[40.125rem] lg:shrink-0 lg:grow-0 lg:gap-x-5 lg:gap-y-9 lg:pt-8"
					role="list"
				>
					{ALLERGEN_FREE.items.map((item) => (
						<li key={item.id} className="flex min-w-0 items-center gap-3 sm:gap-3.5">
							{/* Wrapper sizes the slot; SVG keeps native width/height attrs */}
							<span className="inline-flex h-[clamp(4.5rem,3.5rem+2vw,6.4375rem)] w-[clamp(4.5rem,3.5rem+2vw,6.4375rem)] shrink-0 items-center justify-center">
								{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma; keep intrinsic 103×103 */}
								<img
									src={item.iconSrc}
									alt=""
									width={103}
									height={103}
									className="h-auto max-h-full w-auto max-w-full"
								/>
							</span>
							<span
								className="min-w-0 text-[clamp(0.8125rem,0.75rem+0.25vw,0.9375rem)] font-medium leading-[1.05]"
								style={{ color: ALLERGEN_FREE.ink }}
							>
								{item.labelLines.map((line) => (
									<span key={line} className="block">
										{line}
									</span>
								))}
							</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
