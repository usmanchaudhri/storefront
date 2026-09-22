import { PRODUCT_FACTS, shilajit7in1Landing } from "@/config/landing/shilajit-7in1-new";
import { cn } from "@/lib/utils";

/** Explicit above-the-fold offer facts under the hero benefit line. */
export function LandingOfferFacts({ className }: { className?: string }) {
	const { offerFacts, reviewsCta } = shilajit7in1Landing.hero;

	return (
		<div className={cn("mt-4 space-y-3", className)}>
			<p className="text-sm font-medium text-[#0B3D36]">
				{PRODUCT_FACTS.factLine}
				<span className="text-foreground/50"> · </span>
				{PRODUCT_FACTS.supplyLabel}
			</p>
			<dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
				{offerFacts.map((fact) => (
					<div key={fact.label} className="rounded-xl border border-border bg-[#F7F7F7] px-3 py-2.5">
						<dt className="text-foreground/50 text-[11px] font-bold uppercase tracking-[0.12em]">
							{fact.label}
						</dt>
						<dd className="mt-1 text-sm font-semibold leading-snug text-[#0B3D36]">{fact.value}</dd>
					</div>
				))}
			</dl>
			<a
				href={reviewsCta.href}
				className="inline-flex text-sm font-semibold text-[#00A38C] underline-offset-4 hover:underline"
			>
				{reviewsCta.label}
			</a>
		</div>
	);
}
