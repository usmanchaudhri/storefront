import Image from "next/image";
import Link from "next/link";

import { homeSignatureProductBanner } from "@/config/home-signature-product";
import { channelHref } from "@/lib/channel-path";
import { PLP_HERO_IMAGE_SIZES, PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";

export function HomeSignatureProductBanner({ channel }: { channel: string }) {
	const { sectionId, productSlug, imageSrc, imageWidth, imageHeight, imageAlt } = homeSignatureProductBanner;
	const href = channelHref(channel, `/products/${productSlug}`);
	const bannerHeight = `calc(100vw * ${imageHeight} / ${imageWidth})`;

	return (
		<section
			id={sectionId}
			className={cn("relative w-full scroll-mt-16 overflow-hidden bg-[#073B35] lg:scroll-mt-[4.25rem]")}
			aria-label={imageAlt}
		>
			<div className="relative mx-auto w-full max-w-[1920px]" style={{ minHeight: bannerHeight }}>
				<Link
					href={href}
					prefetch={false}
					className="focus-visible:outline-hidden relative block w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					aria-label={`Shop ${productSlug.replace(/-/g, " ")}`}
				>
					<Image
						src={imageSrc}
						alt={imageAlt}
						width={imageWidth}
						height={imageHeight}
						sizes={PLP_HERO_IMAGE_SIZES}
						quality={PRODUCT_IMAGE_QUALITY}
						className="h-auto w-full object-contain object-center"
					/>
				</Link>
			</div>
		</section>
	);
}
