import { cn } from "@/lib/utils";
import { ArrowLink } from "@/ui/components/ui/arrow-link";

export interface SectionHeaderCta {
	label: string;
	href: string;
}

export interface SectionHeaderProps {
	id: string;
	eyebrow?: string;
	heading?: string;
	intro?: string;
	align?: "left" | "center";
	cta?: SectionHeaderCta;
	className?: string;
	headingClassName?: string;
}

export function SectionHeader({
	id,
	eyebrow,
	heading,
	intro,
	align = "left",
	cta,
	className,
	headingClassName,
}: SectionHeaderProps) {
	if (!eyebrow && !heading && !intro && !cta) {
		return null;
	}

	const isCenter = align === "center";

	return (
		<div
			className={cn(
				"flex flex-col gap-y-4",
				isCenter ? "items-center text-center" : "items-start",
				cta && !isCenter && "sm:flex-row sm:items-end sm:justify-between sm:gap-x-8",
				className,
			)}
		>
			<div className={cn(isCenter && "max-w-prose")}>
				{eyebrow ? <p className="text-eyebrow uppercase text-muted-foreground">{eyebrow}</p> : null}
				{heading ? (
					<h2 id={id} className={cn("text-balance text-h2", eyebrow && "mt-3", headingClassName)}>
						{heading}
					</h2>
				) : null}
				{intro ? (
					<p
						className={cn(
							"max-w-prose text-pretty text-lead text-muted-foreground",
							(eyebrow || heading) && "mt-4",
							isCenter && "mx-auto",
						)}
					>
						{intro}
					</p>
				) : null}
			</div>
			{cta ? (
				<ArrowLink href={cta.href} className={cn("shrink-0", isCenter ? "mt-1" : "mt-1 sm:mt-0")}>
					{cta.label}
				</ArrowLink>
			) : null}
		</div>
	);
}
