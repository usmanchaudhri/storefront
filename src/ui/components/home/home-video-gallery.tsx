import { getResolvedHomeVideoGalleryClips, homeVideoGallery } from "@/config/home-video-gallery";
import { HomeVideoGalleryStrip } from "@/ui/components/home/home-video-gallery-strip";
import {
	homeSectionHeadlineClass,
	homeSectionIntroClass,
	homeSectionSurfaceClass,
} from "@/ui/components/home/home-section-styles";

export function HomeVideoGallery({ channel }: { channel: string }) {
	const clips = getResolvedHomeVideoGalleryClips();

	if (clips.length === 0) {
		return null;
	}

	const { headline, intro } = homeVideoGallery;

	return (
		<section className={homeSectionSurfaceClass} aria-labelledby="home-video-gallery-heading">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="max-w-2xl">
					<h2 id="home-video-gallery-heading" className={homeSectionHeadlineClass}>
						{headline}
					</h2>
					<p className={`mt-4 ${homeSectionIntroClass}`}>{intro}</p>
				</div>

				<div className="mt-8 sm:mt-10">
					<HomeVideoGalleryStrip channel={channel} clips={clips} />
				</div>
			</div>
		</section>
	);
}
