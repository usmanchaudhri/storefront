import { HOME_VALUE_PROPS_BORDER, HOME_VALUE_PROPS_INK, homeValueProps } from "@/config/home-value-props";
import { cn } from "@/lib/utils";

type HomeValuePropsProps = {
	className?: string;
};

/**
 * Figma 3413:3957 — horizontal value strip under the homepage hero.
 */
export function HomeValueProps({ className }: HomeValuePropsProps) {
	return (
		<section
			className={cn("w-full bg-white", className)}
			style={{ borderBottom: `1px solid ${HOME_VALUE_PROPS_BORDER}` }}
			aria-label="Brand values"
		>
			<ul className="mx-auto flex max-w-content list-none flex-col gap-6 px-5 py-10 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:px-6 sm:py-12 lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-8 lg:gap-y-6 lg:px-11 lg:py-14">
				{homeValueProps.map((item) => (
					<li key={item.id} className="flex items-center gap-3 sm:gap-3.5 lg:min-w-0 lg:shrink">
						{/* Figma SVG roots are 172.85×172.85 — keep attrs; size via wrapper */}
						<span className="inline-flex size-8 shrink-0 items-center justify-center sm:size-9" aria-hidden>
							{/* eslint-disable-next-line @next/next/no-img-element -- local SVG icons from Figma */}
							<img src={item.iconSrc} alt="" width={173} height={173} className="max-h-full max-w-full" />
						</span>
						<p
							className="whitespace-nowrap text-[15px] font-semibold leading-snug tracking-tight sm:text-base lg:text-[17px]"
							style={{ color: HOME_VALUE_PROPS_INK }}
						>
							{item.label}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
