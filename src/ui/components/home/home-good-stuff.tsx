import Image from "next/image";
import Link from "next/link";

import {
	HOME_GOOD_STUFF_ARROW_SRC,
	HOME_GOOD_STUFF_COPY,
	HOME_GOOD_STUFF_INK,
	HOME_SHOP_NOW,
	homeGoodStuffProducts,
} from "@/config/home-good-stuff";
import { PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeGoodStuffProps = {
	channel: string;
	className?: string;
};

/**
 * Figma 3414:2 — “THE GOOD STUFF” products + Shop Now captions (3413:5232).
 */
export function HomeGoodStuff({ channel, className }: HomeGoodStuffProps) {
	const exploreHref = channelHref(channel, HOME_GOOD_STUFF_COPY.ctaHref);

	return (
		<section
			className={cn("w-full bg-white", className)}
			style={{ color: HOME_GOOD_STUFF_INK }}
			aria-labelledby="home-good-stuff-heading"
		>
			<div className="mx-auto max-w-content px-5 pb-12 pt-12 sm:px-6 sm:pb-14 sm:pt-14 lg:px-11 lg:pb-16 lg:pt-16">
				<div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
					<div className="min-w-0 max-w-3xl">
						<p className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
							{HOME_GOOD_STUFF_COPY.eyebrow}
						</p>
						<h2
							id="home-good-stuff-heading"
							className="mt-3 text-balance text-[clamp(2rem,1.2rem+3.2vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
						>
							{HOME_GOOD_STUFF_COPY.title}
						</h2>
					</div>

					<Link
						href={exploreHref}
						prefetch={false}
						className={cn(
							"inline-flex shrink-0 items-center gap-2.5 border-b-2 pb-2 text-[15px] font-semibold transition-opacity hover:opacity-70 sm:gap-3 sm:text-base",
							"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						)}
						style={{ borderColor: HOME_GOOD_STUFF_INK }}
					>
						{HOME_GOOD_STUFF_COPY.ctaLabel}
						<span className="inline-flex size-5 shrink-0 items-center justify-center sm:size-6" aria-hidden>
							{/* eslint-disable-next-line @next/next/no-img-element -- local SVG from Figma */}
							<img
								src={HOME_GOOD_STUFF_ARROW_SRC}
								alt=""
								width={105}
								height={105}
								className="max-h-full max-w-full"
							/>
						</span>
					</Link>
				</div>

				<ul className="mt-10 grid list-none grid-cols-1 gap-10 sm:mt-12 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-0 lg:mt-14 lg:gap-x-6">
					{homeGoodStuffProducts.map((product, index) => {
						const href = channelHref(channel, `/products/${product.productSlug}`);
						return (
							<li key={product.id} className="flex flex-col">
								<Link
									href={href}
									prefetch={false}
									aria-label={`View ${product.name}`}
									className={cn(
										"focus-visible:outline-hidden group relative block overflow-hidden rounded-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									)}
									style={{ backgroundColor: product.background }}
								>
									<div className="relative aspect-[5/6] w-full sm:aspect-[4/5]">
										<Image
											src={product.imageSrc}
											alt={product.name}
											width={product.imageWidth}
											height={product.imageHeight}
											priority={index === 0}
											quality={PRODUCT_IMAGE_QUALITY}
											sizes="(max-width: 640px) 100vw, 33vw"
											className="absolute inset-0 size-full object-contain object-center mix-blend-multiply transition-transform duration-500 ease-out md:group-hover:scale-[1.03]"
										/>
										{product.badgeSrc ? (
											<span className="absolute left-3 top-3 z-10 size-14 sm:left-4 sm:top-4 sm:size-16 lg:size-[4.5rem]">
												<Image
													src={product.badgeSrc}
													alt={product.badgeAlt ?? ""}
													width={458}
													height={458}
													className="size-full object-contain"
												/>
											</span>
										) : null}
									</div>
								</Link>

								{/* Figma Shop Now caption — 3413:5232 */}
								<div className="mt-5 flex flex-col items-center text-center sm:mt-6">
									<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
										{product.tags.map((tag) => (
											<span
												key={tag.label}
												className="inline-flex items-center justify-center px-3 py-1.5 font-mono text-[11px] font-normal tracking-tight text-white sm:px-3.5 sm:py-2 sm:text-xs"
												style={{ backgroundColor: tag.background }}
											>
												{tag.label}
											</span>
										))}
									</div>

									<h3
										className="mt-4 text-balance text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-black leading-none tracking-tight sm:mt-5"
										style={{ color: HOME_SHOP_NOW.titleColor }}
									>
										<Link
											href={href}
											prefetch={false}
											className="focus-visible:outline-hidden transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										>
											{product.shortTitle}
										</Link>
									</h3>

									<Link
										href={href}
										prefetch={false}
										className={cn(
											"mt-3 text-[15px] font-normal underline decoration-solid underline-offset-4 transition-opacity hover:opacity-70 sm:mt-4 sm:text-base",
											"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
										)}
										style={{ color: HOME_SHOP_NOW.ctaColor }}
									>
										{HOME_GOOD_STUFF_COPY.shopNowLabel}
									</Link>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
