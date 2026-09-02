import type { LucideIcon } from "lucide-react";
import { Brain, FlaskConical, Leaf, Zap } from "lucide-react";
import { homeEnergyFocusSection } from "@/config/home-energy-focus";

const pillarIcons: Record<(typeof homeEnergyFocusSection.pillars)[number]["id"], LucideIcon> = {
	"steady-energy": Zap,
	"mental-clarity": Brain,
	"daily-ritual": Leaf,
	"clean-quality": FlaskConical,
};

export function HomeEnergyFocusSection() {
	const { pillars } = homeEnergyFocusSection;

	return (
		<section
			className="to-secondary/25 border-b border-border bg-gradient-to-b from-[#073B35]/[0.06] via-background"
			aria-label="Why Kaya Pure"
		>
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
				<ul
					className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6"
					role="list"
				>
					{pillars.map((pillar) => {
						const Icon = pillarIcons[pillar.id];
						return (
							<li key={pillar.id} className="text-center">
								<div className="mx-auto flex flex-col items-center gap-4">
									<span
										className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#00A38C]/15 text-[#006D5B] sm:h-20 sm:w-20"
										aria-hidden
									>
										<Icon className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.5} />
									</span>
									<h2 className="text-balance text-lg font-bold tracking-tight text-foreground sm:text-xl">
										{pillar.title}
									</h2>
									<p className="max-w-[18rem] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
										{pillar.description}
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
