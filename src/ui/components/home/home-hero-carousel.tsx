"use client";

import Image from "next/image";
import Link from "next/link";

import { homeHeroBannerSlides, type HomeHeroBannerSlide } from "@/config/home-hero-banners";
import { PLP_HERO_IMAGE_SIZES, PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";
import { HomeHeroAppleCiderTextOverlay } from "@/ui/components/home/home-hero-apple-cider-text-overlay";
import { HomeHeroDigestiveTextOverlay } from "@/ui/components/home/home-hero-digestive-text-overlay";
import { HomeHeroShilajitDropsTextOverlay } from "@/ui/components/home/home-hero-shilajit-drops-text-overlay";
import { HomeHeroShilajitTextOverlay } from "@/ui/components/home/home-hero-shilajit-text-overlay";
import { HomeHeroWeightLossTextOverlay } from "@/ui/components/home/home-hero-weight-loss-text-overlay";
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

function HeroSlideOverlay({ slide, variant }: { slide: HomeHeroBannerSlide; variant: "mobile" | "desktop" }) {
	switch (slide.textOverlay) {
		case "shilajit-gummies":
			return <HomeHeroShilajitTextOverlay textScale={slide.textScale} variant={variant} />;
		case "weight-loss-slimming":
			return <HomeHeroWeightLossTextOverlay textScale={slide.textScale} variant={variant} />;
		case "apple-cider-ashwagandha":
			return <HomeHeroAppleCiderTextOverlay textScale={slide.textScale} variant={variant} />;
		case "shilajit-liquid-drops":
			return <HomeHeroShilajitDropsTextOverlay textScale={slide.textScale} variant={variant} />;
		case "digestive-gummies":
			return <HomeHeroDigestiveTextOverlay textScale={slide.textScale} variant={variant} />;
		default:
			return null;
	}
}

/**
 * Full-bleed homepage hero carousel — default Figma artboard ~2018×841 (~2.4:1).
 * Mobile: taller frame + full-bleed cover + shared HTML overlay sizes (Figma text groups).
 * Desktop: contain artboard + left-band overlays.
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

			<div className="relative aspect-[3/4] w-full sm:aspect-[4/5] md:aspect-[2018/841]">
				<Carousel opts={{ loop: true, align: "start" }} className="absolute inset-0 size-full">
					<CarouselContent className="ml-0 h-full" viewportClassName="size-full">
						{slides.map((slide, index) => {
							const href = channelHref(channel, `/products/${slide.productSlug}`);
							const hasHtmlOverlay = Boolean(slide.textOverlay);

							return (
								<CarouselItem key={slide.id} className="h-full basis-full pl-0">
									<Link
										href={href}
										prefetch={false}
										className="focus-visible:outline-hidden relative block size-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										aria-label={slide.alt}
									>
										{hasHtmlOverlay ? (
											<>
												<div className="absolute inset-0 md:hidden">
													<Image
														src={slide.imageSrc}
														alt={slide.alt}
														fill
														priority={index === 0}
														sizes="100vw"
														quality={PRODUCT_IMAGE_QUALITY}
														className="object-cover object-[72%_center]"
													/>
													<HeroSlideOverlay slide={slide} variant="mobile" />
												</div>
												<div className="absolute inset-0 hidden items-center justify-center md:flex">
													<div
														className="relative h-auto max-h-full w-full max-w-full"
														style={{
															aspectRatio: `${slide.imageWidth} / ${slide.imageHeight}`,
														}}
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
														<HeroSlideOverlay slide={slide} variant="desktop" />
													</div>
												</div>
											</>
										) : (
											<div className="absolute inset-0 flex items-center justify-center">
												<div
													className="relative h-auto max-h-full w-full max-w-full"
													style={{
														aspectRatio: `${slide.imageWidth} / ${slide.imageHeight}`,
													}}
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
												</div>
											</div>
										)}
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
