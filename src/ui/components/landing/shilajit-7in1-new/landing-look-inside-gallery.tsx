import Image from "next/image";

import { LOOK_INSIDE_GALLERY } from "@/config/landing/look-inside-gallery";
import { cn } from "@/lib/utils";

type LandingLookInsideGalleryProps = {
	className?: string;
};

/**
 * Figma 3504:502–505 — four square listing creatives in a horizontal row
 * (placed directly below “A look inside the gummy”).
 */
export function LandingLookInsideGallery({ className }: LandingLookInsideGalleryProps) {
	return (
		<section className={cn("w-full bg-white", className)} aria-label="Product highlight images">
			<div className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
				{/* Mobile: horizontal scroll; desktop: 4-up row */}
				<ul className="flex list-none gap-3 overflow-x-auto pb-1 sm:gap-4 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0">
					{LOOK_INSIDE_GALLERY.items.map((item) => (
						<li
							key={item.id}
							className="w-[78%] max-w-[22rem] shrink-0 overflow-hidden rounded-2xl bg-[#0B3D36] sm:w-[45%] lg:w-auto lg:max-w-none"
						>
							<Image
								src={item.src}
								alt={item.alt}
								width={item.width}
								height={item.height}
								className="aspect-square size-full object-cover"
								sizes="(max-width: 1024px) 70vw, 25vw"
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
