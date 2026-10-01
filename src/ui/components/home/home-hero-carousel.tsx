"use client";

import Image from "next/image";
import Link from "next/link";

import {
	HOME_HERO_DESKTOP_ASPECT_H,
	HOME_HERO_DESKTOP_ASPECT_W,
	HOME_HERO_MOBILE_ASPECT_H,
	HOME_HERO_MOBILE_ASPECT_W,
	homeHeroBannerSlides,
	type HomeHeroBannerSlide,
} from "@/config/home-hero-banners";
import { PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

type HomeHeroCarouselProps = {
	channel: string;
	slides?: readonly HomeHeroBannerSlide[];
	className?: string;
};

/**
 * Homepage hero — full-bleed band sized like Known Nutrition’s landing banner
 * (~1440×563 desktop / ~721×473 mobile). Art uses object-cover to fill the band.
 */
export function HomeHeroCarousel({
	channel,
	slides = homeHeroBannerSlides,
	className,
}: HomeHeroCarouselProps) {
	const slide = slides[0];
	if (!slide) {
		return null;
	}

	const href = channelHref(channel, `/products/${slide.productSlug}`);

	return (
		<section
			className={cn("relative w-full overflow-hidden border-b border-border bg-[#F3E6DC]", className)}
			aria-label="Featured product"
		>
			<h1 className="sr-only">Kaya Pure — Premium natural supplements</h1>

			<Link
				href={href}
				prefetch={false}
				className="focus-visible:outline-hidden relative block w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				aria-label={slide.alt}
			>
				{/* Mobile — Known-like hero height (~473 @ 721) */}
				<div
					className="relative w-full md:hidden"
					style={{
						aspectRatio: `${HOME_HERO_MOBILE_ASPECT_W} / ${HOME_HERO_MOBILE_ASPECT_H}`,
					}}
				>
					<Image
						src={slide.mobileImageSrc}
						alt={slide.alt}
						fill
						priority
						sizes="100vw"
						quality={PRODUCT_IMAGE_QUALITY}
						className="object-cover object-center"
					/>
				</div>

				{/* Desktop — Known-like hero height (~563 @ 1440) */}
				<div
					className="relative hidden w-full md:block"
					style={{
						aspectRatio: `${HOME_HERO_DESKTOP_ASPECT_W} / ${HOME_HERO_DESKTOP_ASPECT_H}`,
					}}
				>
					<Image
						src={slide.imageSrc}
						alt={slide.alt}
						fill
						priority
						sizes="100vw"
						quality={PRODUCT_IMAGE_QUALITY}
						className="object-cover object-center"
					/>
				</div>
			</Link>
		</section>
	);
}
