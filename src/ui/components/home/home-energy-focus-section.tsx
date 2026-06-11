import type { LucideIcon } from "lucide-react";
import { Brain, FlaskConical, Leaf, Zap } from "lucide-react";
import { homeEnergyFocusSection } from "@/config/home-energy-focus";
import {
	homeSectionBodyClass,
	homeSectionHeadlineClass,
	homeSectionIconWrapClass,
	homeSectionIntroClass,
	homeSectionSubheadingClass,
	homeSectionSurfaceClass,
} from "@/ui/components/home/home-section-styles";

const pillarIcons: Record<(typeof homeEnergyFocusSection.pillars)[number]["id"], LucideIcon> = {
	"steady-energy": Zap,
	"mental-clarity": Brain,
	"daily-ritual": Leaf,
	"clean-quality": FlaskConical,
};

export function HomeEnergyFocusSection() {
	const { headline, intro, pillars } = homeEnergyFocusSection;

	return (
		<section className={homeSectionSurfaceClass} aria-labelledby="home-energy-focus-heading">
			<div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8 lg:pb-20 lg:pt-10">
				<div className="mx-auto max-w-3xl text-center">
					<h2 id="home-energy-focus-heading" className={homeSectionHeadlineClass}>
						{headline.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</h2>
					<p className={`mx-auto mt-5 max-w-2xl ${homeSectionIntroClass}`}>{intro}</p>
				</div>

				<ul
					className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
					role="list"
				>
					{pillars.map((pillar) => {
						const Icon = pillarIcons[pillar.id];
						return (
							<li key={pillar.id} className="text-center">
								<div className="mx-auto flex flex-col items-center gap-3">
									<span className={homeSectionIconWrapClass} aria-hidden>
										<Icon className="h-8 w-8" strokeWidth={1.5} />
									</span>
									<h3 className={homeSectionSubheadingClass}>{pillar.title}</h3>
									<p className={`max-w-[16rem] ${homeSectionBodyClass}`}>{pillar.description}</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
