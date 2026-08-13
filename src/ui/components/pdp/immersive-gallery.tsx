"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PDP_IMMERSIVE_IMAGE_SIZES, PDP_THUMBNAIL_IMAGE_SIZES, PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/ui/components/ui/carousel";
import { type ImageCarouselImage } from "@/ui/components/ui/image-carousel";
import { Button } from "@/ui/components/ui/button";
import {
	galleryImageFrameClass,
	galleryImageZoomTriggerClass,
	PDP_GALLERY_IMAGE_CLIP_CLASS,
	PDP_GALLERY_IMAGE_FOCUS_OVERLAY_CLASS,
} from "@/ui/components/shared/gallery-image-frame";
import { GalleryImageThumbTrigger } from "@/ui/components/shared/gallery-image-zoom-trigger";
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
 * Mobile uses Embla swipe; desktop keeps hover arrows + thumbnails.
 */
export function ImmersiveGallery({ images, productName }: ImmersiveGalleryProps) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [isHeroHovered, setIsHeroHovered] = React.useState(false);

	const imagesKey = images.map((image) => image.url).join(",");
	const { viewerIndex, isViewerOpen, openViewer, onViewerOpenChange } = useProductImageViewer(imagesKey);

	React.useEffect(() => {
		setSelectedIndex(0);
		api?.scrollTo(0, true);
	}, [imagesKey, api]);

	React.useEffect(() => {
		if (!api) return;

		const onSelect = () => {
			setSelectedIndex(api.selectedScrollSnap());
		};

		api.on("select", onSelect);
		onSelect();

		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	const goToPrevious = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const goToNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const scrollToImage = React.useCallback(
		(index: number) => {
			api?.scrollTo(index);
		},
		[api],
	);

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

	const hasMultiple = images.length > 1;

	return (
		<>
			<div className="flex flex-col">
				<div
					className={cn("relative w-full", PDP_IMMERSIVE_HERO_MARGIN_CLASS)}
					onMouseEnter={() => setIsHeroHovered(true)}
					onMouseLeave={() => setIsHeroHovered(false)}
				>
					<Carousel
						setApi={setApi}
						opts={{
							align: "start",
							loop: hasMultiple,
							dragFree: false,
						}}
						className="w-full"
					>
						<div className={cn("relative w-full overflow-hidden", PDP_IMMERSIVE_HERO_FRAME_CLASS)}>
							<CarouselContent className="ml-0">
								{images.map((image, index) => (
									<CarouselItem key={image.url} className="pl-0">
										{/*
										  Div (not <button>) so Embla can own touch drag on mobile.
										  Tap still opens the zoom viewer; drag does not.
										*/}
										<div
											role="button"
											tabIndex={0}
											onClick={() => openViewer(index)}
											onKeyDown={(event) => {
												if (event.key === "Enter" || event.key === " ") {
													event.preventDefault();
													openViewer(index);
												}
											}}
											className={galleryImageZoomTriggerClass(
												"h-full w-full",
												PDP_IMMERSIVE_HERO_FRAME_CLASS,
											)}
											aria-label={`${productName} - View ${index + 1}`}
										>
											<span className={PDP_GALLERY_IMAGE_CLIP_CLASS}>
												<Image
													src={image.url}
													alt={image.alt || `${productName} - View ${index + 1}`}
													fill
													draggable={false}
													className="pointer-events-none object-contain"
													sizes={PDP_IMMERSIVE_IMAGE_SIZES}
													quality={PRODUCT_IMAGE_QUALITY}
													priority={index === 0}
													loading={index === 0 ? "eager" : "lazy"}
												/>
											</span>
											<span className={PDP_GALLERY_IMAGE_FOCUS_OVERLAY_CLASS} aria-hidden />
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
						</div>
					</Carousel>

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
									onClick={() => scrollToImage(index)}
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
									onClick={() => scrollToImage(index)}
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
