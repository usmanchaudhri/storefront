import { ArrowRight } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { homeSignatureProductBanner } from "@/config/home-signature-product";
import {
	homeSignatureBannerBodyClass,
	homeSectionSubheadingClass,
	homeSignatureBannerShellClass,
	homeSignatureBannerSurfaceClass,
} from "@/ui/components/home/home-section-styles";
import { cn } from "@/lib/utils";

export function HomeSignatureProductBanner({ channel }: { channel: string }) {
	const { problem, solution, ingredients, productName, productSlug } = homeSignatureProductBanner;

	return (
		<section className={homeSignatureBannerSurfaceClass} aria-labelledby="signature-product-heading">
			<div
				className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#006D5B]/70 blur-3xl"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-[#006D5B]/70 blur-3xl"
				aria-hidden
			/>

			<div className={homeSignatureBannerShellClass}>
				<div className="grid items-center gap-4 lg:grid-cols-[1fr_minmax(200px,36%)] lg:gap-4">
					<div className="flex flex-col justify-center">
						<div className="max-w-lg">
							<h2 id="signature-product-heading" className={homeSectionSubheadingClass}>
								{problem.title}
							</h2>
							<p className={`mt-1.5 ${homeSignatureBannerBodyClass}`}>{problem.description}</p>
						</div>

						<div className="my-2.5 flex items-center gap-2.5 sm:my-3" aria-hidden>
							<div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#006D5B]/25 to-[#006D5B]/35" />
							<span className="rounded-full bg-white/50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
								Meet the solution
							</span>
							<div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#006D5B]/25 to-[#006D5B]/35" />
						</div>

						<div className="max-w-lg">
							<p className={homeSectionSubheadingClass}>{productName}</p>
							<ul className={`mt-2 space-y-1.5 ${homeSignatureBannerBodyClass}`} role="list">
								{solution.bullets.map((bullet) => (
									<li key={bullet} className="flex gap-2.5">
										<span
											className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#006D5B]"
											aria-hidden
										/>
										<span>{bullet}</span>
									</li>
								))}
							</ul>

							<ul
								className="mt-2 flex flex-wrap gap-1.5"
								aria-label={`${ingredients.length} key ingredients`}
							>
								{ingredients.map((ingredient) => (
									<li
										key={ingredient}
										className="rounded-full bg-white/55 px-2.5 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
									>
										{ingredient}
									</li>
								))}
							</ul>

							<div className="mt-3">
								<LinkWithChannel
									href={`/products/${productSlug}`}
									channel={channel}
									prefetch={false}
									className={cn(
										"inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200",
										"hover:bg-primary/90 bg-primary text-primary-foreground",
										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
									)}
								>
									{solution.ctaLabel}
									<ArrowRight className="h-3.5 w-3.5" aria-hidden />
								</LinkWithChannel>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
