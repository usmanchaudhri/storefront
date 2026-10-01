import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { PLP_IMAGE_SIZES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { NavHrefLink } from "@/ui/atoms/nav-href-link";
import { Section, type SectionSpacing, type SectionTone, type SectionWidth } from "@/ui/sections/section";
import { SectionHeader, type SectionHeaderCta } from "@/ui/sections/section-header";

export interface CategoryTile {
	title: string;
	href: string;
	image?: string | null;
	imageAlt?: string;
	/** Small overline above the title (e.g. item count, category group). */
	subtitle?: string;
}

export type CategoryTileColumns = 2 | 3 | 4;
export type CategoryTileFit = "cover" | "contain";
export type CategoryTileAspect = "portrait" | "square" | "landscape";

export interface CategoryTileGridProps {
	heading?: string;
	eyebrow?: string;
	intro?: string;
	cta?: SectionHeaderCta;
	tiles: readonly CategoryTile[];
	columns?: CategoryTileColumns;
	/** `cover` overlays the label on a lifestyle photo; `contain` suits packshots (label below). */
	imageFit?: CategoryTileFit;
	aspect?: CategoryTileAspect;
	tone?: SectionTone;
	width?: SectionWidth;
	spacing?: SectionSpacing;
	/** Section heading alignment. */
	align?: "left" | "center";
	/** When false, hides collection titles/subtitles on tiles (image-only). */
	showTileLabels?: boolean;
	headingClassName?: string;
	headerClassName?: string;
	className?: string;
}

const columnsClassName: Record<CategoryTileColumns, string> = {
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "grid-cols-2 lg:grid-cols-4",
};

const aspectClassName: Record<CategoryTileAspect, string> = {
	portrait: "aspect-[4/5]",
	square: "aspect-square",
	landscape: "aspect-[4/3]",
};

function TileLink({
	href,
	className,
	children,
	"aria-label": ariaLabel,
}: {
	href: string;
	className: string;
	children: React.ReactNode;
	"aria-label"?: string;
}) {
	return (
		<NavHrefLink href={href} className={className} aria-label={ariaLabel}>
			{children}
		</NavHrefLink>
	);
}

/**
 * Paper storefront “Shop by category” tile grid.
 * @see https://github.com/saleor/storefront/blob/main/src/ui/sections/category-tile-grid/category-tile-grid.tsx
 */
export function CategoryTileGrid({
	heading,
	eyebrow,
	intro,
	cta,
	tiles,
	columns = 3,
	imageFit = "cover",
	aspect = "portrait",
	tone = "default",
	width = "content",
	spacing = "lg",
	align = "left",
	showTileLabels = true,
	headingClassName,
	headerClassName = "mb-10",
	className,
}: CategoryTileGridProps) {
	if (tiles.length === 0) {
		return null;
	}

	const headingId = "category-tile-grid-heading";
	const isContain = imageFit === "contain";

	return (
		<Section
			tone={tone}
			width={width}
			spacing={spacing}
			className={className}
			aria-labelledby={heading ? headingId : undefined}
		>
			<SectionHeader
				id={headingId}
				eyebrow={eyebrow}
				heading={heading}
				intro={intro}
				cta={cta}
				align={align}
				className={headerClassName}
				headingClassName={headingClassName}
			/>
			<ul className={cn("grid list-none gap-4 lg:gap-6", columnsClassName[columns])}>
				{tiles.map((tile) => (
					<li key={tile.href}>
						{isContain ? (
							<TileLink
								href={tile.href}
								className="group block no-underline hover:no-underline"
								aria-label={tile.title}
							>
								<div
									className={cn(
										"relative overflow-hidden rounded-card bg-secondary",
										aspectClassName[aspect],
									)}
								>
									{tile.image ? (
										<Image
											src={tile.image}
											alt={tile.imageAlt || tile.title}
											fill
											sizes={PLP_IMAGE_SIZES}
											className="object-contain p-8 transition-all duration-500 ease-out md:group-hover:scale-105"
										/>
									) : null}
								</div>
								{showTileLabels ? (
									<div className="mt-4 flex items-center justify-between gap-3">
										<div>
											{tile.subtitle ? (
												<p className="text-eyebrow uppercase text-muted-foreground">{tile.subtitle}</p>
											) : null}
											<h3 className="text-h3 text-foreground">{tile.title}</h3>
										</div>
										<ArrowRight
											className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out motion-reduce:transition-none md:group-hover:translate-x-1"
											aria-hidden="true"
										/>
									</div>
								) : null}
							</TileLink>
						) : (
							<TileLink
								href={tile.href}
								aria-label={tile.title}
								className={cn(
									"group relative block overflow-hidden rounded-card bg-secondary no-underline hover:no-underline",
									aspectClassName[aspect],
								)}
							>
								{tile.image ? (
									<Image
										src={tile.image}
										alt={tile.imageAlt || tile.title}
										fill
										sizes={PLP_IMAGE_SIZES}
										className="object-cover transition-all duration-500 ease-out md:group-hover:scale-105"
									/>
								) : null}
								{showTileLabels ? (
									<>
										<div
											className="from-foreground/75 via-foreground/15 absolute inset-0 bg-gradient-to-t to-transparent"
											aria-hidden="true"
										/>
										<div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
											<div>
												{tile.subtitle ? (
													<p className="text-background/80 text-eyebrow uppercase">{tile.subtitle}</p>
												) : null}
												<h3 className="text-h3 text-background">{tile.title}</h3>
											</div>
											<ArrowRight
												className="h-5 w-5 shrink-0 text-background transition-transform duration-300 ease-out motion-reduce:transition-none md:group-hover:translate-x-1"
												aria-hidden="true"
											/>
										</div>
									</>
								) : null}
							</TileLink>
						)}
					</li>
				))}
			</ul>
		</Section>
	);
}
