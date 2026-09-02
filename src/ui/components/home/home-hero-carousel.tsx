"use client";

import Image from "next/image";
import Link from "next/link";

import { homeHeroBannerSlides, type HomeHeroBannerSlide } from "@/config/home-hero-banners";
import { PLP_HERO_IMAGE_SIZES, PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/ui/components/ui/carousel";

const heroCarouselArrowClassName = cn(
	"top-1/2 z-20 size-11 -translate-y-1/2 rounded-full border border-white/80",
	"!bg-white !text-[#073B35] shadow-[0_4px_14px_rgba(0,0,0,0.25)]",
	"hover:!bg-white hover:!text-[#073B35] hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)]",
	"[&_svg]:size-5",
);

type HomeHeroCarouselProps = {
	channel: string;
	slides?: readonly HomeHeroBannerSlide[];
	className?: string;
};

/**
 * Full-bleed homepage hero carousel — 2:1 banners (Figma 3000×1500).
 * Height follows width so the full artwork is visible (no top/bottom crop).
 */
export function HomeHeroCarousel({
	channel,
	slides = homeHeroBannerSlides,
	className,
}: HomeHeroCarouselProps) {
	if (slides.length === 0) {
		return null;
	}

	return (
		<section
			className={cn("relative w-full overflow-hidden border-b border-border bg-[#073B35]", className)}
			aria-roledescription="carousel"
			aria-label="Featured products"
		>
			<h1 className="sr-only">Kaya Pure — Premium natural supplements</h1>

			{/* Full viewport width — height scales from 2:1 aspect ratio */}
			<div className="relative aspect-[2/1] w-full">
				<Carousel opts={{ loop: true, align: "start" }} className="absolute inset-0 size-full">
					<CarouselContent className="ml-0 h-full" viewportClassName="size-full">
						{slides.map((slide, index) => {
							const href = channelHref(channel, `/products/${slide.productSlug}`);
							return (
								<CarouselItem key={slide.id} className="h-full basis-full pl-0">
									<Link
										href={href}
										prefetch={false}
										className="focus-visible:outline-hidden relative block size-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										aria-label={slide.alt}
									>
										<Image
											src={slide.imageSrc}
											alt={slide.alt}
											fill
											priority={index === 0}
											sizes={PLP_HERO_IMAGE_SIZES}
											quality={PRODUCT_IMAGE_QUALITY}
											className="object-contain object-center"
										/>
									</Link>
								</CarouselItem>
							);
						})}
					</CarouselContent>

					{slides.length > 1 ? (
						<>
							<CarouselPrevious
								variant="ghost"
								className={cn(heroCarouselArrowClassName, "left-3 sm:left-6")}
							/>
							<CarouselNext
								variant="ghost"
								className={cn(heroCarouselArrowClassName, "right-3 sm:right-6")}
							/>
							<CarouselDots
								className={cn(
									"absolute bottom-3 left-0 right-0 z-10 sm:bottom-4",
									"[&_button]:bg-white/50 [&_button]:shadow-sm",
									"[&_button[aria-current=true]]:bg-white",
								)}
							/>
						</>
					) : null}
				</Carousel>
			</div>
		</section>
	);
}
