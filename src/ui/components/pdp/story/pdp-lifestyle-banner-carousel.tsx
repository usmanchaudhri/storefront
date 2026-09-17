"use client";

import Image from "next/image";

import type { PdpStoryImage } from "@/config/pdp-stories";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/ui/components/ui/carousel";

const carouselArrowClassName = cn(
	"top-1/2 z-20 size-11 -translate-y-1/2 rounded-full border border-white/80",
	"!bg-white !text-[#073B35] shadow-[0_4px_14px_rgba(0,0,0,0.25)]",
	"hover:!bg-white hover:!text-[#073B35] hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)]",
	"[&_svg]:size-5",
);

type PdpLifestyleBannerCarouselProps = {
	slides: readonly PdpStoryImage[];
};

/**
 * Figma 2538:60 / 2538:61 / 2538:57 — full-bleed lifestyle banner carousel (3000×1500).
 * Placed under the 2×2 gallery, above Got Questions?
 */
export function PdpLifestyleBannerCarousel({ slides }: PdpLifestyleBannerCarouselProps) {
	if (slides.length === 0) {
		return null;
	}

	return (
		<section
			className="relative w-full overflow-hidden bg-[#0a1a16]"
			aria-roledescription="carousel"
			aria-label="Product lifestyle banners"
		>
			<div className="relative aspect-[3000/1500] w-full">
				<Carousel opts={{ loop: true, align: "start" }} className="absolute inset-0 size-full">
					<CarouselContent className="ml-0 h-full" viewportClassName="size-full">
						{slides.map((slide) => (
							<CarouselItem key={slide.src} className="h-full basis-full pl-0">
								<div className="relative size-full">
									<Image
										src={slide.src}
										alt={slide.alt}
										fill
										sizes="100vw"
										className="object-cover object-center"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{slides.length > 1 ? (
						<>
							<CarouselPrevious variant="ghost" className={cn(carouselArrowClassName, "left-3 sm:left-6")} />
							<CarouselNext variant="ghost" className={cn(carouselArrowClassName, "right-3 sm:right-6")} />
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
