/** Single short-form clip for the homepage video gallery. */
export type HomeVideoGalleryClip = {
	id: string;
	title: string;
	/** Path (`/videos/...`) or full CDN URL. Omit when using the first video frame as thumbnail. */
	posterUrl?: string;
	mp4Url: string;
	webmUrl?: string;
	/** Optional PDP link when the clip is tapped. */
	productSlug?: string;
};

/**
 * Homepage video gallery — paths must match files under `public/videos/`
 * (or set `NEXT_PUBLIC_VIDEO_CDN_BASE_URL` for CDN-hosted assets).
 */
export const homeVideoGallery = {
	headline: "Real rituals. Real results.",
	intro: "Short clips from the Kaya Pure community — steady energy, simple daily habits.",
	clips: [
		{
			id: "section-video-2",
			title: "Daily energy ritual",
			mp4Url: "/videos/section-video-2.mp4",
			productSlug: "energy-boost-pro",
		},
		{
			id: "section-video-3",
			title: "Focus & clarity",
			mp4Url: "/videos/section-video-3-1.mp4",
		},
		{
			id: "section-video-4",
			title: "Stay consistent",
			mp4Url: "/videos/section-video-4-1.mp4",
		},
		{
			id: "video-9",
			title: "Kaya Pure in action",
			mp4Url: "/videos/Video-9-1-1.mp4",
		},
		{
			id: "whatsapp-morning",
			title: "Morning routine",
			mp4Url: "/videos/WhatsApp-Video-2025-06-12-at-12.34.25-AM-1.mp4",
		},
		{
			id: "whatsapp-evening",
			title: "Wind down",
			mp4Url: "/videos/WhatsApp-Video-2025-06-12-at-12.35.22-AM-1.mp4",
		},
	] as const satisfies readonly HomeVideoGalleryClip[],
} as const;

function resolveMediaUrl(pathOrUrl: string): string {
	if (/^https?:\/\//i.test(pathOrUrl)) {
		return pathOrUrl;
	}

	const base = process.env.NEXT_PUBLIC_VIDEO_CDN_BASE_URL?.trim().replace(/\/$/, "") ?? "";
	const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

	return base ? `${base}${path}` : path;
}

export function getResolvedHomeVideoGalleryClips(): HomeVideoGalleryClip[] {
	return homeVideoGallery.clips.map((clip: HomeVideoGalleryClip) => ({
		...clip,
		posterUrl: clip.posterUrl ? resolveMediaUrl(clip.posterUrl) : undefined,
		mp4Url: resolveMediaUrl(clip.mp4Url),
		webmUrl: clip.webmUrl ? resolveMediaUrl(clip.webmUrl) : undefined,
	}));
}
