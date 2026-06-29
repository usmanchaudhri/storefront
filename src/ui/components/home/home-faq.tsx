import { homeFaq } from "@/config/home-faq";
import { HomeFaqAccordion } from "@/ui/components/home/home-faq-accordion";
import {
	homeSectionHeadlineClass,
	homeSectionIntroClass,
	homeSectionShellClass,
} from "@/ui/components/home/home-section-styles";

export function HomeFaq() {
	const { headline, intro, items, support } = homeFaq;

	return (
		<section aria-labelledby="home-faq-heading">
			<div className={homeSectionShellClass}>
				<div className="mx-auto max-w-3xl text-center">
					<h2 id="home-faq-heading" className={homeSectionHeadlineClass}>
						{headline}
					</h2>
					<p className={`mt-4 ${homeSectionIntroClass}`}>{intro}</p>
				</div>

				<div className="mx-auto mt-10 max-w-3xl sm:mt-12">
					<HomeFaqAccordion items={items} />
				</div>

				<div className="bg-secondary/30 mx-auto mt-12 max-w-3xl rounded-2xl border border-border p-6 text-center sm:mt-14 sm:p-8">
					<h3 className="text-lg font-semibold text-foreground sm:text-xl">{support.headline}</h3>
					<p className={`mt-2 ${homeSectionIntroClass}`}>{support.body}</p>
					<ul className="mt-4 flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center sm:gap-6">
						<li>
							<a
								href={`mailto:${support.email}`}
								className="font-medium text-primary underline-offset-4 hover:underline"
							>
								{support.email}
							</a>
						</li>
						<li>
							<a
								href={`tel:${support.phone.replace(/\s/g, "")}`}
								className="font-medium text-primary underline-offset-4 hover:underline"
							>
								{support.phone}
							</a>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
