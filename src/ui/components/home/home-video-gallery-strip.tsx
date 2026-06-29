"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeVideoGalleryClip } from "@/config/home-video-gallery";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { cn } from "@/lib/utils";

type HomeVideoGalleryStripProps = {
	channel: string;
	clips: HomeVideoGalleryClip[];
};

function VideoClipCard({ clip, channel }: { clip: HomeVideoGalleryClip; channel: string }) {
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
			{ rootMargin: "80px", threshold: 0.2 },
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

	const media = (
		<div
			ref={containerRef}
			className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-secondary"
		>
			<video
				ref={videoRef}
				className="h-full w-full object-cover"
				poster={clip.posterUrl}
				muted
				playsInline
				loop
				preload={isVisible ? "metadata" : "none"}
				src={videoSrc ?? undefined}
				aria-label={clip.title}
			/>
		</div>
	);

	const card = (
		<>
			{media}
			<p className="mt-2.5 text-sm font-medium text-foreground sm:text-base">{clip.title}</p>
		</>
	);

	return (
		<li className="w-[11.5rem] shrink-0 snap-start sm:w-[13rem]">
			{clip.productSlug ? (
				<LinkWithChannel
					href={`/products/${clip.productSlug}`}
					channel={channel}
					prefetch={false}
					className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_p]:transition-colors [&_p]:group-hover:text-primary"
				>
					{card}
				</LinkWithChannel>
			) : (
				<div>{card}</div>
			)}
		</li>
	);
}

export function HomeVideoGalleryStrip({ channel, clips }: HomeVideoGalleryStripProps) {
	if (clips.length === 0) {
		return null;
	}

	return (
		<ul
			className={cn(
				"flex gap-4 overflow-x-auto pb-2",
				"snap-x snap-mandatory scroll-smooth",
				"[scrollbar-width:thin]",
			)}
			role="list"
			aria-label="Short product videos"
		>
			{clips.map((clip) => (
				<VideoClipCard key={clip.id} clip={clip} channel={channel} />
			))}
		</ul>
	);
}
