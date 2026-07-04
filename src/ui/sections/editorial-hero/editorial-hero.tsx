import { cn } from "@/lib/utils";
import { NavHrefLink } from "@/ui/atoms/nav-href-link";
import { homeSectionHeadlineClass } from "@/ui/components/home/home-section-styles";
import { buttonClassName } from "@/ui/components/ui/button";

export interface EditorialHeroCta {
	label: string;
	href: string;
	variant?: "primary" | "secondary";
}

export interface EditorialHeroProps {
	eyebrow?: string;
	heading: string;
	subheading?: string;
	primaryCta?: EditorialHeroCta;
	secondaryCta?: EditorialHeroCta;
	id?: string;
	className?: string;
}

function HeroCtaLink({ cta, className }: { cta: EditorialHeroCta; className: string }) {
	return (
		<NavHrefLink href={cta.href} className={className}>
			{cta.label}
		</NavHrefLink>
	);
}

export function EditorialHero({
	eyebrow,
	heading,
	subheading,
	primaryCta,
	secondaryCta,
	id = "homepage-hero-heading",
	className,
}: EditorialHeroProps) {
	return (
		<section className={cn("border-b border-border bg-background", className)} aria-labelledby={id}>
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="max-w-2xl">
					{eyebrow ? <p className="text-eyebrow uppercase text-muted-foreground">{eyebrow}</p> : null}
					<h1 id={id} className={cn(homeSectionHeadlineClass, eyebrow && "mt-4")}>
						{heading}
					</h1>
					{subheading ? (
						<p className="mt-6 max-w-prose text-pretty text-lead text-muted-foreground">{subheading}</p>
					) : null}
					{(primaryCta || secondaryCta) && (
						<div className="mt-9 flex flex-wrap gap-3">
							{primaryCta ? (
								<HeroCtaLink
									cta={primaryCta}
									className={buttonClassName({
										asLink: true,
										size: "lg",
										variant: primaryCta.variant === "secondary" ? "secondary" : "default",
									})}
								/>
							) : null}
							{secondaryCta ? (
								<HeroCtaLink
									cta={secondaryCta}
									className={buttonClassName({
										asLink: true,
										size: "lg",
										variant: secondaryCta.variant === "primary" ? "default" : "outline-solid",
									})}
								/>
							) : null}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
