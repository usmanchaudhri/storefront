import Image from "next/image";
import { Montserrat } from "next/font/google";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Figma Group 114 (2814:739) — text overlay for Shilajit gummies hero.
 * Desktop: banner artboard 2018×841 (2814:679); overlay 820×718 at (139, 45).
 * Mobile: same content stack, full-width readable layout (only this banner).
 */
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
});

const ACCENT = "#f3bf8e";
const CTA_TEXT = "#073b3d";

const BENEFITS = [
	{
		label: "Energy Support",
		iconSrc: "/images/home-hero-banners/shilajit-text-icons/energy.svg",
		iconWidth: 23,
		iconHeight: 36, // Figma 2814:722 — 22.8×35.7
	},
	{
		label: "Vitality Boost",
		iconSrc: "/images/home-hero-banners/shilajit-text-icons/vitality.svg",
		iconWidth: 33,
		iconHeight: 32, // Figma 2814:727 — 32.8×32.1
	},
	{
		label: "Daily Wellness",
		iconSrc: "/images/home-hero-banners/shilajit-text-icons/wellness.svg",
		iconWidth: 39,
		iconHeight: 35, // Figma 2814:732 — 38.6×35.1
	},
] as const;

type HomeHeroShilajitTextOverlayProps = {
	className?: string;
	/**
	 * Multiplier for desktop overlay type sizes relative to Figma (1 = exact).
	 * Mobile uses fixed clamp sizes so copy stays readable.
	 */
	textScale?: number;
	/**
	 * `responsive` (default) renders both layouts with breakpoint visibility.
	 * Pass `mobile` / `desktop` when the parent already splits layouts.
	 */
	variant?: "responsive" | "mobile" | "desktop";
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
			{/* Figma 2814:711 — eyebrow */}
			<p
				className="font-bold uppercase"
				style={
					isMobile
						? {
								color: ACCENT,
								fontSize: "clamp(0.75rem, 3.4vw, 0.95rem)",
								letterSpacing: "0.22em",
								lineHeight: 1.2,
							}
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

			{/* Figma 2814:712–715 — title */}
			<h2
				className="font-bold uppercase"
				style={
					isMobile
						? {
								marginTop: "0.55rem",
								fontSize: "clamp(2rem, 9.5vw, 3.15rem)",
								lineHeight: 0.96,
								letterSpacing: "0.005em",
							}
						: {
								marginTop: "calc(2.8cqi * var(--hero-text-scale, 1))",
								...scaled(11.941),
								lineHeight: 0.96,
								letterSpacing: "0.005em",
							}
				}
			>
				<span className="block text-white">PURE</span>
				<span className="block text-white">HIMALAYAN</span>
				<span className="block" style={{ color: ACCENT }}>
					SHILAJIT
				</span>
			</h2>

			{/* Figma 2814:716 — rule */}
			<div
				style={
					isMobile
						? {
								marginTop: "0.85rem",
								width: "2.75rem",
								height: "0.1875rem",
								backgroundColor: ACCENT,
							}
						: {
								marginTop: "calc(3.17cqi * var(--hero-text-scale, 1))",
								width: "calc(11.22cqi * var(--hero-text-scale, 1))",
								height: "calc(0.366cqi * var(--hero-text-scale, 1))",
								backgroundColor: ACCENT,
							}
				}
			/>

			{/* Figma 2814:717 — sub */}
			<p
				className="font-normal text-white"
				style={
					isMobile
						? {
								marginTop: "0.75rem",
								fontSize: "clamp(0.875rem, 3.8vw, 1.05rem)",
								lineHeight: 1.35,
								maxWidth: "22rem",
							}
						: {
								marginTop: "calc(2.2cqi * var(--hero-text-scale, 1))",
								...scaled(3.629),
								lineHeight: 1.35,
								maxWidth: "94%",
							}
				}
			>
				7-IN-1 gummies for your daily wellness ritual
			</p>

			{/* Figma 2814:718 — benefits */}
			<ul
				className="flex list-none items-start p-0"
				style={
					isMobile
						? {
								marginTop: "1.15rem",
								width: "100%",
								maxWidth: "20rem",
							}
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
									? {
											width: "clamp(2.5rem, 11vw, 3.25rem)",
											height: "clamp(2.5rem, 11vw, 3.25rem)",
											borderWidth: "2px",
											borderColor: ACCENT,
										}
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
									? {
											marginTop: "0.4rem",
											fontSize: "clamp(0.625rem, 2.8vw, 0.75rem)",
											lineHeight: 1.2,
										}
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

			{/* Figma 2814:735 — Shop now */}
			<span
				className="inline-flex items-center justify-between font-bold shadow-[0px_14px_18px_rgba(0,0,0,0.18)]"
				style={
					isMobile
						? {
								marginTop: "1.25rem",
								width: "min(100%, 12.5rem)",
								height: "2.85rem",
								borderRadius: "0.55rem",
								paddingInline: "1.1rem",
								backgroundColor: ACCENT,
								color: CTA_TEXT,
								letterSpacing: "0.09em",
								fontSize: "clamp(0.8125rem, 3.5vw, 0.95rem)",
							}
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

export function HomeHeroShilajitTextOverlay({
	className,
	textScale = 1,
	variant = "responsive",
}: HomeHeroShilajitTextOverlayProps) {
	const showMobile = variant === "responsive" || variant === "mobile";
	const showDesktop = variant === "responsive" || variant === "desktop";

	return (
		<>
			{showMobile ? (
				<div
					className={cn(
						montserrat.className,
						"pointer-events-none absolute inset-0 z-[1] flex flex-col justify-end text-white",
						variant === "responsive" && "md:hidden",
						"bg-gradient-to-t from-[#052a27]/95 via-[#052a27]/55 to-transparent",
						"px-5 pb-10 pt-16",
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
						// Figma: left 139/2018, top 45/841, width 820/2018
						"left-[6.89%] top-[5.35%] w-[40.63%]",
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
