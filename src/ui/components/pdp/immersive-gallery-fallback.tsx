import Image from "next/image";
import { PDP_IMMERSIVE_IMAGE_SIZES, PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import { GalleryImageFrame, galleryImageFrameClass } from "@/ui/components/shared/gallery-image-frame";
import {
	PDP_IMMERSIVE_HERO_FRAME_CLASS,
	PDP_IMMERSIVE_HERO_MARGIN_CLASS,
	PDP_IMMERSIVE_MOBILE_DOTS_CLASS,
	PDP_IMMERSIVE_THUMB_STRIP_CLASS,
} from "./gallery-layout";

interface ImmersiveGalleryFallbackProps {
	src: string;
	alt: string;
	imageCount: number;
	showChrome?: boolean;
}

/**
 * Server-rendered immersive gallery for the Suspense fallback.
 * Matches MoonBrew-style hero + thumbnail strip so the streamed gallery does not shift.
 */
export function ImmersiveGalleryFallback({
	src,
	alt,
	imageCount,
	showChrome,
}: ImmersiveGalleryFallbackProps) {
	const showGalleryChrome = showChrome ?? imageCount > 1;

	return (
		<div className="flex flex-col">
			<div className={cn("w-full", PDP_IMMERSIVE_HERO_MARGIN_CLASS)}>
				<GalleryImageFrame className={galleryImageFrameClass(PDP_IMMERSIVE_HERO_FRAME_CLASS)}>
					<Image
						src={src}
						alt={alt}
						fill
						className="object-contain"
						sizes={PDP_IMMERSIVE_IMAGE_SIZES}
						quality={PRODUCT_IMAGE_QUALITY}
						priority
					/>
				</GalleryImageFrame>
				{showGalleryChrome ? (
					<div className={cn("mt-4", PDP_IMMERSIVE_MOBILE_DOTS_CLASS)} aria-hidden>
						{Array.from({ length: imageCount }).map((_, index) => (
							<span
								key={index}
								className={cn("h-2 w-2 rounded-full", index === 0 ? "w-5 bg-foreground" : "bg-border")}
							/>
						))}
					</div>
				) : null}
			</div>
			{showGalleryChrome ? (
				<div className={PDP_IMMERSIVE_THUMB_STRIP_CLASS} aria-hidden>
					{Array.from({ length: imageCount }).map((_, index) => (
						<div
							key={index}
							className={cn(
								"relative size-[86px] max-w-[86px] shrink-0 overflow-hidden rounded-xl border bg-secondary",
								index === 0 ? "border-foreground" : "border-border/40 opacity-60",
							)}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}

/** Pre-stream skeleton matching the immersive gallery footprint. */
export function ImmersiveGallerySkeleton() {
	return (
		<div className="flex flex-col">
			<div className={cn("w-full", PDP_IMMERSIVE_HERO_MARGIN_CLASS)}>
				<div className={galleryImageFrameClass("animate-pulse bg-muted", PDP_IMMERSIVE_HERO_FRAME_CLASS)} />
			</div>
			<div className={PDP_IMMERSIVE_THUMB_STRIP_CLASS} aria-hidden>
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="border-border/40 relative size-[86px] max-w-[86px] shrink-0 animate-pulse overflow-hidden rounded-xl border bg-muted"
					/>
				))}
			</div>
		</div>
	);
}
