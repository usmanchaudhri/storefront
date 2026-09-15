import Image from "next/image";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";

/**
 * Figma Group 114 (2814:739) — text overlay for Shilajit gummies hero.
 * Banner artboard 2018×841; overlay frame 820×718 at (139, 45).
 * Sizes use cqi against the 820-wide overlay frame.
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
		iconHeight: 36,
	},
	{
		label: "Vitality Boost",
		iconSrc: "/images/home-hero-banners/shilajit-text-icons/vitality.svg",
		iconWidth: 33,
		iconHeight: 32,
	},
	{
		label: "Daily Wellness",
		iconSrc: "/images/home-hero-banners/shilajit-text-icons/wellness.svg",
		iconWidth: 39,
		iconHeight: 35,
	},
] as const;

type HomeHeroShilajitTextOverlayProps = {
	className?: string;
};

export function HomeHeroShilajitTextOverlay({ className }: HomeHeroShilajitTextOverlayProps) {
	return (
		<div
			className={cn(
				montserrat.className,
				"pointer-events-none absolute z-[1] text-white [container-type:inline-size]",
				// Figma: left 139/2018, top 45/841, width 820/2018
				"left-[6.89%] top-[5.35%] w-[40.63%]",
				className,
			)}
			aria-hidden="true"
		>
			{/* Eyebrow — 27.84 / 820 */}
			<p
				className="font-bold uppercase"
				style={{
					color: ACCENT,
					fontSize: "3.395cqi",
					letterSpacing: "0.22em",
					lineHeight: 1,
					paddingTop: "4.146cqi",
				}}
			>
				KAYA PURE
			</p>

			{/* Title — 97.92 / 820, leading 94 */}
			<h2
				className="font-bold uppercase"
				style={{
					marginTop: "2.91cqi",
					fontSize: "11.941cqi",
					lineHeight: "0.96",
					letterSpacing: "0.005em",
				}}
			>
				<span className="block text-white">PURE</span>
				<span className="block text-white">HIMALAYAN</span>
				<span className="block" style={{ color: ACCENT }}>
					SHILAJIT
				</span>
			</h2>

			{/* Rule — 92×3 */}
			<div
				style={{
					marginTop: "3.17cqi",
					width: "11.22cqi",
					height: "0.366cqi",
					backgroundColor: ACCENT,
				}}
			/>

			{/* Sub — 29.76 / 820 */}
			<p
				className="font-normal text-white"
				style={{
					marginTop: "2.2cqi",
					fontSize: "3.629cqi",
					lineHeight: 1.35,
					maxWidth: "94%",
				}}
			>
				7-IN-1 gummies for your daily wellness ritual
			</p>

			{/* Benefits — 650 wide */}
			<ul className="flex list-none items-start p-0" style={{ marginTop: "3.3cqi", width: "79.27%" }}>
				{BENEFITS.map((benefit, index) => (
					<li
						key={benefit.label}
						className={cn(
							"flex flex-1 flex-col items-center",
							index < BENEFITS.length - 1 && "border-white/22 border-r",
						)}
					>
						<span
							className="flex items-center justify-center rounded-full border-solid"
							style={{
								width: "10.244cqi",
								height: "10.244cqi",
								borderWidth: "0.341cqi",
								borderColor: ACCENT,
							}}
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
							style={{
								marginTop: "1.22cqi",
								fontSize: "2.576cqi",
								lineHeight: 1.2,
							}}
						>
							{benefit.label}
						</span>
					</li>
				))}
			</ul>

			{/* Shop Now — decorative; slide Link handles navigation */}
			<span
				className="inline-flex items-center justify-between font-bold shadow-[0px_14px_18px_rgba(0,0,0,0.18)]"
				style={{
					marginTop: "3.9cqi",
					width: "38.39%",
					height: "10.2cqi",
					borderRadius: "1.463cqi",
					paddingInline: "4.15cqi",
					backgroundColor: ACCENT,
					color: CTA_TEXT,
					letterSpacing: "0.09em",
					fontSize: "3.415cqi",
				}}
			>
				<span>SHOP NOW</span>
				<span style={{ fontSize: "3.93cqi" }} aria-hidden>
					→
				</span>
			</span>
		</div>
	);
}
