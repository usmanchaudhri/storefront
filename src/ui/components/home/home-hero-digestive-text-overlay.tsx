import Image from "next/image";
import { Montserrat } from "next/font/google";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import {
	HOME_HERO_OVERLAY_ACCENT,
	HOME_HERO_OVERLAY_CTA_TEXT,
	homeHeroMobileOverlayStyles,
	type HomeHeroOverlayVariant,
} from "@/ui/components/home/home-hero-overlay-mobile-styles";

/**
 * Figma Group 118 (2814:863) — text overlay for Digestive gummies hero.
 * Desktop: banner 2018×841 (2814:551); overlay 820×754 at (139, 44).
 * Mobile: shared responsive stack sizes with other hero banners.
 */
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
});

const ACCENT = HOME_HERO_OVERLAY_ACCENT;
const CTA_TEXT = HOME_HERO_OVERLAY_CTA_TEXT;
const m = homeHeroMobileOverlayStyles;

const BENEFITS = [
	{
		label: "Digestive Support",
		iconSrc: "/images/home-hero-banners/digestive-text-icons/digestive-support.svg",
		iconWidth: 35,
		iconHeight: 34,
	},
	{
		label: "Gut Comfort",
		iconSrc: "/images/home-hero-banners/digestive-text-icons/gut-comfort.svg",
		iconWidth: 32,
		iconHeight: 42,
	},
	{
		label: "Daily Wellness",
		iconSrc: "/images/home-hero-banners/digestive-text-icons/daily-wellness.svg",
		iconWidth: 41,
		iconHeight: 35,
	},
] as const;

type HomeHeroDigestiveTextOverlayProps = {
	className?: string;
	textScale?: number;
	variant?: HomeHeroOverlayVariant;
};

function scaled(cqi: number, property?: keyof CSSProperties): CSSProperties {
	const value = `calc(${cqi}cqi * var(--hero-text-scale, 1))`;
	if (!property) {
		return { fontSize: value };
	}
	return { [property]: value } as CSSProperties;
}

function OverlayContent({ variant }: { variant: "mobile" | "desktop" }) {
	const isMobile = variant === "mobile";

	return (
		<>
			<p
				className="font-bold uppercase"
				style={
					isMobile
						? m.eyebrow
						: {
								paddingTop: "calc(4.146cqi * var(--hero-text-scale, 1))",
								color: ACCENT,
								letterSpacing: "0.22em",
								lineHeight: 1,
								...scaled(3.395),
							}
				}
			>
				KAYA PURE
			</p>

			<h2
				className="font-bold uppercase"
				style={
					isMobile
						? m.title
						: {
								marginTop: "calc(2.8cqi * var(--hero-text-scale, 1))",
								...scaled(11.941),
								lineHeight: 0.96,
								letterSpacing: "0.005em",
							}
				}
			>
				<span className="block text-white">NATURAL</span>
				<span className="block" style={{ color: ACCENT }}>
					DIGESTIVE
				</span>
				<span className="block text-white">WELLNESS</span>
			</h2>

			<div
				style={
					isMobile
						? m.rule
						: {
								marginTop: "calc(3.17cqi * var(--hero-text-scale, 1))",
								width: "calc(11.22cqi * var(--hero-text-scale, 1))",
								height: "calc(0.366cqi * var(--hero-text-scale, 1))",
								backgroundColor: ACCENT,
							}
				}
			/>

			<p
				className="font-normal text-white"
				style={
					isMobile
						? m.sub
						: {
								marginTop: "calc(2.2cqi * var(--hero-text-scale, 1))",
								...scaled(3.629),
								lineHeight: 1.35,
								maxWidth: "94%",
							}
				}
			>
				Crafted for everyday comfort &amp; balance
			</p>

			<ul
				className="flex list-none items-start p-0"
				style={
					isMobile
						? m.benefitsList
						: {
								marginTop: "calc(3.3cqi * var(--hero-text-scale, 1))",
								width: "79.27%",
							}
				}
			>
				{BENEFITS.map((benefit, index) => (
					<li
						key={benefit.label}
						className={
							index < BENEFITS.length - 1
								? "border-white/22 flex flex-1 flex-col items-center border-r"
								: "flex flex-1 flex-col items-center"
						}
					>
						<span
							className="flex items-center justify-center rounded-full border-solid"
							style={
								isMobile
									? m.benefitIcon
									: {
											width: "calc(10.244cqi * var(--hero-text-scale, 1))",
											height: "calc(10.244cqi * var(--hero-text-scale, 1))",
											borderWidth: "calc(0.341cqi * var(--hero-text-scale, 1))",
											borderColor: ACCENT,
										}
							}
						>
							<Image
								src={benefit.iconSrc}
								alt=""
								width={benefit.iconWidth}
								height={benefit.iconHeight}
								className="h-[45%] w-auto"
								unoptimized
							/>
						</span>
						<span
							className="text-center font-medium text-white"
							style={
								isMobile
									? m.benefitLabel
									: {
											marginTop: "calc(1.22cqi * var(--hero-text-scale, 1))",
											...scaled(2.576),
											lineHeight: 1.2,
										}
							}
						>
							{benefit.label}
						</span>
					</li>
				))}
			</ul>

			<span
				className="inline-flex items-center justify-between font-bold shadow-[0px_14px_18px_rgba(0,0,0,0.18)]"
				style={
					isMobile
						? m.cta
						: {
								marginTop: "calc(3.9cqi * var(--hero-text-scale, 1))",
								width: "38.39%",
								height: "calc(10.2cqi * var(--hero-text-scale, 1))",
								borderRadius: "calc(1.463cqi * var(--hero-text-scale, 1))",
								paddingInline: "calc(4.15cqi * var(--hero-text-scale, 1))",
								backgroundColor: ACCENT,
								color: CTA_TEXT,
								letterSpacing: "0.09em",
								...scaled(3.415),
							}
				}
			>
				<span>SHOP NOW</span>
				<span
					style={
						isMobile ? { fontSize: "1.05em" } : { fontSize: "calc(3.93cqi * var(--hero-text-scale, 1))" }
					}
					aria-hidden
				>
					→
				</span>
			</span>
		</>
	);
}

export function HomeHeroDigestiveTextOverlay({
	className,
	textScale = 1,
	variant = "responsive",
}: HomeHeroDigestiveTextOverlayProps) {
	const showMobile = variant === "responsive" || variant === "mobile";
	const showDesktop = variant === "responsive" || variant === "desktop";

	return (
		<>
			{showMobile ? (
				<div
					className={cn(
						montserrat.className,
						m.shell.className,
						variant === "responsive" && "md:hidden",
						className,
					)}
					aria-hidden="true"
				>
					<OverlayContent variant="mobile" />
				</div>
			) : null}

			{showDesktop ? (
				<div
					className={cn(
						montserrat.className,
						"pointer-events-none absolute z-[1] text-white [container-type:inline-size]",
						variant === "responsive" ? "hidden md:block" : "block",
						"left-[6.89%] top-[5.23%] w-[40.63%]",
						className,
					)}
					style={{ ["--hero-text-scale" as string]: String(textScale) }}
					aria-hidden="true"
				>
					<OverlayContent variant="desktop" />
				</div>
			) : null}
		</>
	);
}
