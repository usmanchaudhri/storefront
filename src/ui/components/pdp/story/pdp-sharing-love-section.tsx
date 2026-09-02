"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Barlow } from "next/font/google";

import type { PdpStorySharingLove } from "@/config/pdp-stories/types";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	useCarousel,
} from "@/ui/components/ui/carousel";

const sharingLoveFont = Barlow({
	subsets: ["latin"],
	weight: ["600", "800"],
	display: "swap",
});

const carouselArrowClassName = cn(
	"static shrink-0 translate-y-0",
	"size-[50px] rounded-full border-0",
	"!bg-[#00A38C] !text-white shadow-none",
	"hover:!bg-[#00967f] disabled:opacity-40",
	"[&_svg]:size-[18px]",
);

function SocialVideoSlide({ clip }: { clip: PdpStorySharingLove["clips"][number] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [{ isVisible, isActivated }, setPlayback] = useState({
		isVisible: false,
		isActivated: false,
	});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setPlayback((prev) => ({
					isVisible: entry.isIntersecting,
					isActivated: prev.isActivated || entry.isIntersecting,
				}));
			},
			{ rootMargin: "80px", threshold: 0.25 },
		);

		observer.observe(container);

		return () => observer.disconnect();
	}, []);

	const videoSrc = isActivated ? clip.mp4Url : null;

	useEffect(() => {
		const video = videoRef.current;
		if (!video || !videoSrc) {
			return;
		}

		if (!isVisible) {
			video.pause();
			return;
		}

		const play = () => {
			void video.play().catch(() => undefined);
		};

		video.addEventListener("loadeddata", play);
		if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			play();
		}

		return () => video.removeEventListener("loadeddata", play);
	}, [isVisible, videoSrc]);

	return (
		<div
			ref={containerRef}
			className="relative aspect-[318/466] w-full overflow-hidden rounded-[30px] bg-[#E5EFED]"
		>
			<Image
				src={clip.poster.src}
				alt={clip.poster.alt}
				fill
				className={cn(
					"object-cover object-center transition-opacity",
					videoSrc ? "opacity-0" : "opacity-100",
				)}
				sizes="(max-width: 768px) 85vw, 320px"
			/>
			{videoSrc ? (
				<video
					ref={videoRef}
					className="absolute inset-0 size-full object-cover"
					poster={clip.poster.src}
					muted
					playsInline
					loop
					preload={isVisible ? "metadata" : "none"}
					src={videoSrc}
					aria-label={clip.poster.alt}
				/>
			) : null}
		</div>
	);
}

function SharingLoveDots({ clipIds }: { clipIds: readonly string[] }) {
	const { selectedIndex, scrollTo } = useCarousel();

	return (
		<div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Social video slides">
			{clipIds.map((id, index) => (
				<button
					key={id}
					type="button"
					role="tab"
					aria-selected={selectedIndex === index}
					aria-label={`Go to slide ${index + 1}`}
					onClick={() => scrollTo(index)}
					className={cn(
						"size-3.5 rounded-[7px] transition-colors",
						selectedIndex === index ? "bg-[#073B35]" : "bg-[#073B35]/55 hover:bg-[#073B35]/75",
					)}
				/>
			))}
		</div>
	);
}

export function PdpSharingLoveSection({ story }: { story: PdpStorySharingLove }) {
	return (
		<section
			className={cn(sharingLoveFont.className, "bg-[#F7F7F7]")}
			aria-labelledby="pdp-story-sharing-love-heading"
		>
			<div className="mx-auto w-full max-w-[1255px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<h2
					id="pdp-story-sharing-love-heading"
					className="text-center text-[clamp(1.75rem,1.2rem+2vw,3.1875rem)] font-semibold uppercase tracking-[0.5px] text-[#073B35]"
				>
					{story.titlePrefix}
					<span className="font-extrabold text-[#00A38C]">{story.titleAccent}</span>
					{story.titleSuffix}
				</h2>

				<div className="mt-10 sm:mt-12">
					<Carousel opts={{ align: "start", loop: true }} className="w-full">
						<div className="flex items-center gap-4 sm:gap-8 lg:gap-14">
							<CarouselPrevious variant="ghost" className={carouselArrowClassName} />
							<div className="min-w-0 flex-1">
								<CarouselContent className="-ml-4 md:-ml-11">
									{story.clips.map((clip) => (
										<CarouselItem
											key={clip.id}
											className="basis-[85%] pl-4 sm:basis-[55%] md:basis-[44%] md:pl-11 lg:basis-[31.5%]"
										>
											<SocialVideoSlide clip={clip} />
										</CarouselItem>
									))}
								</CarouselContent>
								<SharingLoveDots clipIds={story.clips.map((clip) => clip.id)} />
							</div>
							<CarouselNext variant="ghost" className={carouselArrowClassName} />
						</div>
					</Carousel>
				</div>

				<div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12">
					{story.testimonials.map((testimonial) => (
						<article
							key={testimonial.id}
							className="rounded-[20px] bg-[#EFFBF8] px-6 py-6 text-center sm:px-8 sm:py-7"
						>
							<div className="flex flex-wrap items-center justify-center gap-3">
								<p className="text-[clamp(1.125rem,1rem+0.25vw,1.375rem)] font-semibold text-[#073B35]">
									{testimonial.author}
								</p>
								<Image
									src={story.starsIcon.src}
									alt=""
									width={story.starsIcon.width}
									height={story.starsIcon.height}
									className="h-[30px] w-[120px]"
									aria-hidden
									unoptimized={story.starsIcon.src.endsWith(".svg")}
								/>
							</div>
							<blockquote className="mx-auto mt-4 max-w-[28rem] text-pretty text-base leading-[1.4] text-[#073B35]">
								&ldquo;{testimonial.quote}&rdquo;
							</blockquote>
						</article>
					))}
				</div>

				<div className="mt-10 flex justify-center lg:mt-12">
					<Link
						href="#pdp-story-reviews"
						className="inline-flex min-w-[298px] items-center justify-center rounded-full bg-[#073B35] px-6 py-3 text-center text-[clamp(1.125rem,1rem+0.35vw,1.625rem)] font-bold uppercase tracking-[0.5px] text-white transition-colors hover:bg-[#062f2a]"
					>
						{story.ctaLabel}
					</Link>
				</div>
			</div>
		</section>
	);
}
