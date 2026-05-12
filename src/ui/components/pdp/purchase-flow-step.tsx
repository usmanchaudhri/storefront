import { cn } from "@/lib/utils";

export function PurchaseFlowStep({
	step,
	title,
	description,
	className,
}: {
	step: number;
	title: string;
	description?: string;
	className?: string;
}) {
	return (
		<div className={cn("flex gap-3 sm:gap-4", className)}>
			<span
				className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm"
				aria-hidden
			>
				{step}
			</span>
			<div className="min-w-0 flex-1 pt-0.5">
				<h3 className="text-base font-semibold leading-tight tracking-tight text-foreground">{title}</h3>
				{description ? (
					<p className="mt-1 text-sm leading-snug text-muted-foreground">{description}</p>
				) : null}
			</div>
		</div>
	);
}
