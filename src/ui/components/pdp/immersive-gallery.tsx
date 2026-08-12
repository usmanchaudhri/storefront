"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PDP_IMMERSIVE_IMAGE_SIZES, PDP_THUMBNAIL_IMAGE_SIZES, PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import { type ImageCarouselImage } from "@/ui/components/ui/image-carousel";
import { Button } from "@/ui/components/ui/button";
import { galleryImageFrameClass } from "@/ui/components/shared/gallery-image-frame";
import {
	GalleryImageThumbTrigger,
	GalleryImageZoomTrigger,
} from "@/ui/components/shared/gallery-image-zoom-trigger";
import { GalleryZoomLayer } from "./gallery-zoom-layer";
import {
	PDP_IMMERSIVE_HERO_FRAME_CLASS,
	PDP_IMMERSIVE_HERO_MARGIN_CLASS,
	PDP_IMMERSIVE_MOBILE_DOTS_CLASS,
	PDP_IMMERSIVE_THUMB_STRIP_CLASS,
} from "./gallery-layout";
import { useProductImageViewer } from "./use-product-image-viewer";

interface ImmersiveGalleryProps {
	images: ImageCarouselImage[];
	productName: string;
}

/**
 * Immersive PDP gallery — MoonBrew-style 631×490 hero frame with the full image
 * visible (`object-contain`), thumbnail strip below (86px squares, desktop only).
 */
export function ImmersiveGallery({ images, productName }: ImmersiveGalleryProps) {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [isHeroHovered, setIsHeroHovered] = React.useState(false);

	const imagesKey = images.map((image) => image.url).join(",");
	const { viewerIndex, isViewerOpen, openViewer, onViewerOpenChange } = useProductImageViewer(imagesKey);

	React.useEffect(() => {
		setSelectedIndex(0);
	}, [imagesKey]);

	const goToPrevious = React.useCallback(() => {
		setSelectedIndex((current) => (current === 0 ? images.length - 1 : current - 1));
	}, [images.length]);

	const goToNext = React.useCallback(() => {
		setSelectedIndex((current) => (current === images.length - 1 ? 0 : current + 1));
	}, [images.length]);

	if (!images.length) {
		return (
			<div
				className={galleryImageFrameClass(
					"flex w-full items-center justify-center",
					PDP_IMMERSIVE_HERO_FRAME_CLASS,
				)}
			>
				<span className="text-muted-foreground">No image available</span>
			</div>
		);
	}

	const activeImage = images[selectedIndex] ?? images[0];
	const hasMultiple = images.length > 1;

	return (
		<>
			<div className="flex flex-col">
				<div
					className={cn("relative w-full", PDP_IMMERSIVE_HERO_MARGIN_CLASS)}
					onMouseEnter={() => setIsHeroHovered(true)}
					onMouseLeave={() => setIsHeroHovered(false)}
				>
					<GalleryImageZoomTrigger
						onClick={() => openViewer(selectedIndex)}
						className={PDP_IMMERSIVE_HERO_FRAME_CLASS}
						aria-label={`${productName} - View ${selectedIndex + 1}`}
					>
						<Image
							key={activeImage.url}
							src={activeImage.url}
							alt={activeImage.alt || `${productName} - View ${selectedIndex + 1}`}
							fill
							draggable={false}
							className="pointer-events-none object-contain"
							sizes={PDP_IMMERSIVE_IMAGE_SIZES}
							quality={PRODUCT_IMAGE_QUALITY}
							priority={selectedIndex === 0}
							loading={selectedIndex === 0 ? "eager" : "lazy"}
						/>
					</GalleryImageZoomTrigger>

					{hasMultiple ? (
						<div
							className={cn(
								"absolute inset-y-0 left-0 right-0 z-10 hidden items-center justify-between px-3 transition-opacity duration-200 sm:px-4 min-[1201px]:flex",
								isHeroHovered ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
							)}
						>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="pointer-events-auto h-12 w-12 rounded-full border-0 bg-[#006D5B] text-white shadow-md hover:bg-[#005a4b] hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
								onClick={(event) => {
									event.stopPropagation();
									goToPrevious();
									event.currentTarget.blur();
								}}
								aria-label="Previous image"
							>
								<ChevronLeft className="h-6 w-6" strokeWidth={3.5} />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="pointer-events-auto h-12 w-12 rounded-full border-0 bg-[#006D5B] text-white shadow-md hover:bg-[#005a4b] hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
								onClick={(event) => {
									event.stopPropagation();
									goToNext();
									event.currentTarget.blur();
								}}
								aria-label="Next image"
							>
								<ChevronRight className="h-6 w-6" strokeWidth={3.5} />
							</Button>
						</div>
					) : null}
				</div>

				{hasMultiple ? (
					<>
						<div
							className={PDP_IMMERSIVE_THUMB_STRIP_CLASS}
							role="tablist"
							aria-label={`${productName} images`}
						>
							{images.map((image, index) => (
								<GalleryImageThumbTrigger
									key={image.url}
									selected={selectedIndex === index}
									onClick={() => setSelectedIndex(index)}
									aria-label={`Show image ${index + 1}`}
									aria-selected={selectedIndex === index}
									role="tab"
								>
									<Image
										src={image.thumbnailUrl || image.url}
										alt={image.alt || `${productName} - Thumbnail ${index + 1}`}
										fill
										className="object-cover object-center"
										sizes={PDP_THUMBNAIL_IMAGE_SIZES}
									/>
								</GalleryImageThumbTrigger>
							))}
						</div>

						<div className={PDP_IMMERSIVE_MOBILE_DOTS_CLASS} aria-hidden={!hasMultiple}>
							{images.map((image, index) => (
								<button
									key={image.url}
									type="button"
									onClick={() => setSelectedIndex(index)}
									aria-label={`Go to image ${index + 1}`}
									aria-current={selectedIndex === index ? "true" : undefined}
									className={cn(
										"h-2 w-2 rounded-full transition-all",
										selectedIndex === index ? "w-5 bg-foreground" : "bg-border hover:bg-muted-foreground",
									)}
								/>
							))}
						</div>
					</>
				) : null}
			</div>

			<GalleryZoomLayer
				images={images}
				productName={productName}
				viewerIndex={viewerIndex}
				isViewerOpen={isViewerOpen}
				onOpenChange={onViewerOpenChange}
			/>
		</>
	);
}
