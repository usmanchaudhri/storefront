import Image from "next/image";
import Link from "next/link";

import { HOME_LITTLE_JOY } from "@/config/home-little-joy";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeLittleJoyProps = {
	channel: string;
	className?: string;
};

/**
 * Figma 3413:4176 — “Find the good in your every day” dual editorial tiles.
 */
export function HomeLittleJoy({ channel, className }: HomeLittleJoyProps) {
	return (
		<section className={cn("w-full bg-white", className)} aria-labelledby="home-little-joy-heading">
			<div className="mx-auto max-w-content px-5 py-14 sm:px-6 sm:py-16 lg:px-11 lg:py-20">
				<div className="mx-auto max-w-3xl text-center">
					<p
						className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]"
						style={{ color: HOME_LITTLE_JOY.ink }}
					>
						{HOME_LITTLE_JOY.eyebrow}
					</p>
					<h2
						id="home-little-joy-heading"
						className="mt-4 text-balance text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
					>
						<span style={{ color: HOME_LITTLE_JOY.ink }}>{HOME_LITTLE_JOY.titleLine1}</span>
						<br />
						<span style={{ color: HOME_LITTLE_JOY.accent }}>{HOME_LITTLE_JOY.titleLine2}</span>
					</h2>
					<p
						className="mt-4 text-pretty text-[15px] leading-relaxed sm:mt-5 sm:text-base lg:text-lg"
						style={{ color: HOME_LITTLE_JOY.muted }}
					>
						{HOME_LITTLE_JOY.subtitle}
					</p>
				</div>

				<ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:gap-6">
					{HOME_LITTLE_JOY.tiles.map((tile) => {
						const href = channelHref(channel, tile.ctaHref);
						return (
							<li key={tile.id}>
								<Link
									href={href}
									prefetch={false}
									className={cn(
										"focus-visible:outline-hidden group relative block aspect-[4/5] overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:aspect-[3/4]",
									)}
								>
									<Image
										src={tile.imageSrc}
										alt={tile.imageAlt}
										width={tile.imageWidth}
										height={tile.imageHeight}
										sizes="(max-width: 640px) 100vw, 50vw"
										className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 ease-out md:group-hover:scale-[1.03]"
									/>
									<div
										className="absolute inset-0 bg-gradient-to-t from-[rgba(2,33,19,0.7)] via-[rgba(2,33,19,0.15)] to-transparent"
										aria-hidden
									/>
									<div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6 lg:p-8">
										<p className="text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">
											{tile.eyebrow}
										</p>
										<h3 className="mt-2 max-w-[16ch] text-balance text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
											{tile.title}
										</h3>
										<span className="mt-4 inline-flex items-center gap-2.5 border-b border-white pb-1.5 text-[14px] font-semibold sm:mt-5 sm:gap-3 sm:text-[15px]">
											{tile.ctaLabel}
											<span
												className="inline-flex size-4 shrink-0 items-center justify-center sm:size-5"
												aria-hidden
											>
												{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
												<img
													src={tile.arrowSrc}
													alt=""
													width={100}
													height={100}
													className="max-h-full max-w-full"
												/>
											</span>
										</span>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
