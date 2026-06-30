import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

function heroImageSrc(): string | null {
	const raw = process.env.NEXT_PUBLIC_HOME_HERO_IMAGE_URL?.trim();
	return raw || null;
}

export function HomeHeroSkeleton() {
	return (
		<section className="bg-muted/40 relative w-full border-b border-border" aria-hidden>
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="mx-auto max-w-2xl space-y-4 text-center">
					<div className="mx-auto h-9 w-3/4 max-w-md animate-pulse rounded-lg bg-secondary" />
					<div className="bg-secondary/80 mx-auto h-5 w-full max-w-lg animate-pulse rounded" />
					<div className="mx-auto mt-8 h-11 w-36 animate-pulse rounded-xl bg-secondary" />
				</div>
			</div>
		</section>
	);
}

export function HomeHero({ channel }: { channel: string }) {
	const { eyebrow, title, subtitle, ctaLabel, ctaHref } = brandConfig.homeHero;
	const path = ctaHref.startsWith("/") ? ctaHref : `/${ctaHref}`;
	const ctaUrl = channelHref(channel, path);
	const imgSrc = heroImageSrc();

	return (
		<section className="relative w-full overflow-hidden border-b border-border">
			{imgSrc ? (
				<div className="absolute inset-0" aria-hidden>
					<Image
						src={imgSrc}
						alt=""
						role="presentation"
						fill
						className="object-cover object-center"
						sizes="100vw"
						priority
					/>
					<div
						className="from-background/95 via-background/85 to-background/55 absolute inset-0 bg-gradient-to-r"
						aria-hidden
					/>
				</div>
			) : (
				<div
					className="from-primary/[0.09] to-muted/40 absolute inset-0 bg-gradient-to-br via-card"
					aria-hidden
				/>
			)}

			<div
				className="bg-primary/[0.06] pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl sm:right-0"
				aria-hidden
			/>

			<div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="max-w-xl text-center sm:text-left">
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
					<h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
						{title}
					</h1>
					<p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
						{subtitle}
					</p>
					<div className="mt-8 flex justify-center sm:justify-start">
						<Link
							href={ctaUrl}
							prefetch={false}
							className={cn(
								"inline-flex h-14 min-w-[10rem] items-center justify-center rounded-xl px-8 text-base font-semibold shadow-md transition-all duration-200",
								"hover:bg-primary/90 bg-primary text-primary-foreground",
								"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
							)}
						>
							{ctaLabel}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
