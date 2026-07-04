import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export type BreadcrumbsSurface = "default" | "pill";

export interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	ariaLabel?: string;
	/** `pill` places crumbs on a compact surface for busy backgrounds (default: white). */
	surface?: BreadcrumbsSurface;
	className?: string;
}

/**
 * Functional chrome breadcrumbs.
 * Use `surface="pill"` on photo heroes; `default` on solid page backgrounds.
 */
export function Breadcrumbs({
	items,
	ariaLabel = "Breadcrumb",
	surface = "default",
	className,
}: BreadcrumbsProps) {
	const isPill = surface === "pill";
	const crumbClass = isPill ? "text-foreground" : "text-muted-foreground";
	const currentClass = "font-medium text-foreground";
	const linkClass = isPill
		? "text-foreground transition-opacity hover:opacity-70"
		: "text-muted-foreground transition-colors hover:text-foreground";

	return (
		<nav
			aria-label={ariaLabel}
			className={cn(
				"text-sm",
				isPill && "bg-background/85 inline-flex w-fit items-center rounded-full px-3 py-1.5 shadow-sm",
				className,
			)}
		>
			<ol className={cn("flex items-center gap-1.5", !isPill && crumbClass)}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const showLink = Boolean(item.href) && !isLast;

					return (
						<li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
							{index > 0 && (
								<ChevronRight
									className={cn("h-3.5 w-3.5", isPill ? "text-foreground" : undefined)}
									aria-hidden="true"
								/>
							)}
							{showLink ? (
								<Link href={item.href!} className={linkClass}>
									{item.label}
								</Link>
							) : (
								<span className={currentClass}>{item.label}</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
