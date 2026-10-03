import Link from "next/link";

import {
	HOME_YOUR_DAY_COPY,
	HOME_YOUR_DAY_INK,
	HOME_YOUR_DAY_SHOP_ARROW,
	homeYourDayCards,
} from "@/config/home-your-day";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeYourDayProps = {
	channel: string;
	className?: string;
};

/**
 * Figma 3413:4123 — “What feels good to you?” ritual cards.
 */
export function HomeYourDay({ channel, className }: HomeYourDayProps) {
	const shopAllHref = channelHref(channel, HOME_YOUR_DAY_COPY.shopAllHref);

	return (
		<section
			className={cn("w-full bg-white", className)}
			style={{ color: HOME_YOUR_DAY_INK }}
			aria-labelledby="home-your-day-heading"
		>
			<div className="mx-auto max-w-content px-5 py-14 sm:px-6 sm:py-16 lg:px-11 lg:py-20">
				<div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
					<div className="min-w-0 max-w-3xl">
						<p className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
							{HOME_YOUR_DAY_COPY.eyebrow}
						</p>
						<h2
							id="home-your-day-heading"
							className="mt-3 text-balance text-[clamp(2rem,1.2rem+3.2vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
						>
							{HOME_YOUR_DAY_COPY.title}
						</h2>
					</div>

					<Link
						href={shopAllHref}
						prefetch={false}
						className={cn(
							"inline-flex shrink-0 items-center gap-2.5 border-b-2 pb-2 text-[15px] font-semibold transition-opacity hover:opacity-70 sm:gap-3 sm:text-base",
							"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						)}
						style={{ borderColor: HOME_YOUR_DAY_INK }}
					>
						{HOME_YOUR_DAY_COPY.shopAllLabel}
						<span className="inline-flex size-5 shrink-0 items-center justify-center sm:size-6" aria-hidden>
							{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
							<img
								src={HOME_YOUR_DAY_SHOP_ARROW}
								alt=""
								width={101}
								height={101}
								className="max-h-full max-w-full"
							/>
						</span>
					</Link>
				</div>

				<ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:mt-14 lg:gap-6">
					{homeYourDayCards.map((card) => {
						const href = channelHref(channel, card.href);
						return (
							<li key={card.id}>
								<Link
									href={href}
									prefetch={false}
									className={cn(
										"group relative flex min-h-[18rem] flex-col p-6 transition-opacity hover:opacity-95 sm:min-h-[22rem] sm:p-7 lg:min-h-[26rem] lg:p-8",
										"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									)}
									style={{ backgroundColor: card.background }}
								>
									<span className="inline-flex size-14 items-center justify-center rounded-full bg-white sm:size-16 lg:size-[4.5rem]">
										{card.iconSrc ? (
											// eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma
											<img
												src={card.iconSrc}
												alt=""
												width={163}
												height={163}
												className="max-h-[55%] max-w-[55%]"
											/>
										) : (
											<span className="text-2xl leading-none sm:text-3xl" aria-hidden>
												{card.iconGlyph}
											</span>
										)}
									</span>

									<div className="mt-auto pt-16 sm:pt-20">
										<p className="text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs">
											{card.label}
										</p>
										<h3 className="mt-2 max-w-[10ch] text-balance text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
											{card.title}
										</h3>
									</div>

									<span
										className="absolute bottom-6 right-6 inline-flex size-5 items-center justify-center sm:bottom-7 sm:right-7 sm:size-6 lg:bottom-8 lg:right-8"
										aria-hidden
									>
										{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
										<img
											src={card.arrowSrc}
											alt=""
											width={129}
											height={129}
											className="max-h-full max-w-full transition-transform duration-300 ease-out md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5"
										/>
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
