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
	const { headline, intro, pillars } = homeEnergyFocusSection;

	return (
		<section
			className="to-secondary/25 border-b border-border bg-gradient-to-b from-[#073B35]/[0.06] via-background"
			aria-labelledby="home-energy-focus-heading"
		>
			<div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-14">
				<div className="mx-auto max-w-4xl text-center">
					<h2
						id="home-energy-focus-heading"
						className="text-balance text-4xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
					>
						<span className="block">{headline[0]}</span>
						<span className="mt-1 block text-[#00A38C] sm:mt-2">{headline[1]}</span>
					</h2>
					<p className="mx-auto mt-6 max-w-3xl text-pretty text-lg font-medium leading-relaxed text-muted-foreground sm:mt-8 sm:text-xl lg:text-2xl lg:leading-relaxed">
						{intro}
					</p>
				</div>

				<ul
					className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6"
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
									<h3 className="text-balance text-lg font-bold tracking-tight text-foreground sm:text-xl">
										{pillar.title}
									</h3>
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
