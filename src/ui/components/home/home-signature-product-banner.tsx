import { ArrowRight } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { homeSignatureProductBanner } from "@/config/home-signature-product";
import {
	homeSignatureBannerBodyClass,
	homeSignatureBannerProblemBodyClass,
	homeSignatureBannerProblemHeadlineClass,
	homeSignatureBannerShellClass,
	homeSignatureBannerSolutionTitleClass,
	homeSignatureBannerSurfaceClass,
} from "@/ui/components/home/home-section-styles";
import { cn } from "@/lib/utils";

export function HomeSignatureProductBanner({ channel }: { channel: string }) {
	const { problem, solution, ingredients, productName, productSlug, sectionId } = homeSignatureProductBanner;

	return (
		<section
			id={sectionId}
			className={cn(homeSignatureBannerSurfaceClass, "scroll-mt-16 lg:scroll-mt-[4.25rem]")}
			aria-labelledby="signature-product-heading"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10"
				aria-hidden
			/>

			<div className={homeSignatureBannerShellClass}>
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-base">
						Sound familiar?
					</p>
					<h2 id="signature-product-heading" className={`mt-3 ${homeSignatureBannerProblemHeadlineClass}`}>
						{problem.title}
					</h2>
					<p className={`mt-4 max-w-2xl ${homeSignatureBannerProblemBodyClass}`}>{problem.description}</p>
				</div>

				<div className="my-8 flex items-center gap-3 sm:my-10" aria-hidden>
					<div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/35 to-white/50" />
					<span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-sm">
						Meet the solution
					</span>
					<div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/35 to-white/50" />
				</div>

				<div className="max-w-3xl">
					<p className={homeSignatureBannerSolutionTitleClass}>{productName}</p>
					<p className="mt-2 text-base font-medium text-white/90 sm:text-lg">{solution.title}</p>
					<ul className={`mt-4 space-y-2.5 ${homeSignatureBannerBodyClass}`} role="list">
						{solution.bullets.map((bullet) => (
							<li key={bullet} className="flex gap-3">
								<span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" aria-hidden />
								<span>{bullet}</span>
							</li>
						))}
					</ul>

					<ul className="mt-5 flex flex-wrap gap-2" aria-label={`${ingredients.length} key ingredients`}>
						{ingredients.map((ingredient) => (
							<li
								key={ingredient}
								className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
							>
								{ingredient}
							</li>
						))}
					</ul>

					<div className="mt-8">
						<LinkWithChannel
							href={`/products/${productSlug}`}
							channel={channel}
							prefetch={false}
							className={cn(
								"inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition-all duration-200",
								"bg-white text-[#006D5B] hover:bg-white/95",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#006D5B]",
							)}
						>
							{solution.ctaLabel}
							<ArrowRight className="h-4 w-4" aria-hidden />
						</LinkWithChannel>
					</div>
				</div>
			</div>
		</section>
	);
}
