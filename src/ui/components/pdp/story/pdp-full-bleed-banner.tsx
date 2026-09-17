import Image from "next/image";

import type { PdpStoryImage } from "@/config/pdp-stories";

type PdpFullBleedBannerProps = {
	banner: PdpStoryImage;
};

/**
 * Full-bleed static PDP banner (e.g. Figma Made to Fit — 3000×1500).
 */
export function PdpFullBleedBanner({ banner }: PdpFullBleedBannerProps) {
	return (
		<section className="relative w-full overflow-hidden bg-[#0a1a16]" aria-label={banner.alt}>
			<Image
				src={banner.src}
				alt={banner.alt}
				width={banner.width}
				height={banner.height}
				className="h-auto w-full object-cover object-center"
				sizes="100vw"
			/>
		</section>
	);
}
