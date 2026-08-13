import Image from "next/image";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * Shared Logo Component
 *
 * Single source of truth for the storefront logo.
 * Header wordmark: /public/kayapure-logo-wordmark.svg (Figma 2435:1417 — two-tone)
 * Footer wordmark: /public/kayapure-footer-logo.png (Figma 2435:1490 mint wordmark)
 *
 * Header uses the Figma SVG via <img> so Next image-optimizer cache cannot
 * keep serving a replaced same-path PNG.
 *
 * @example
 * <Logo className="h-7 w-auto" />
 * <Logo className="h-7 w-auto" variant="footer" />
 */

/** Figma 2435:1417 — Kaya #09594D / Pure #00A38C */
const LOGO_SRC = "/kayapure-logo-wordmark.svg" as const;
const FOOTER_LOGO_SRC = "/kayapure-footer-logo.png" as const;
/** Figma 2435:1417 wordmark (logical 174×38). */
const LOGO_WIDTH = 174;
const LOGO_HEIGHT = 38;
/** Figma 2435:1490 wordmark export (logical 801×180). */
const FOOTER_LOGO_WIDTH = 801;
const FOOTER_LOGO_HEIGHT = 180;
const ASPECT = `${LOGO_WIDTH} / ${LOGO_HEIGHT}` as const;
const FOOTER_ASPECT = `${FOOTER_LOGO_WIDTH} / ${FOOTER_LOGO_HEIGHT}` as const;

interface LogoProps {
	className?: string;
	/** Accessible label for the logo (defaults to brand) */
	ariaLabel?: string;
	/**
	 * @deprecated Two-tone Figma logo is already colored; invert is a no-op.
	 * Kept for call-site compatibility.
	 */
	inverted?: boolean;
	/** Footer wordmark (mint teal on transparent, from Figma) */
	variant?: "default" | "footer";
}

export const Logo = ({
	className,
	ariaLabel = brandConfig.logoAriaLabel,
	inverted: _inverted = false,
	variant = "default",
}: LogoProps) => {
	const isFooter = variant === "footer";

	if (!isFooter) {
		return (
			// eslint-disable-next-line @next/next/no-img-element -- SVG wordmark; avoid stale next/image cache of replaced PNG
			<img
				src={LOGO_SRC}
				alt={ariaLabel}
				width={LOGO_WIDTH}
				height={LOGO_HEIGHT}
				className={cn("min-w-0 object-contain object-left", className)}
				style={{ aspectRatio: ASPECT }}
				decoding="async"
			/>
		);
	}

	return (
		<Image
			src={FOOTER_LOGO_SRC}
			alt={ariaLabel}
			width={FOOTER_LOGO_WIDTH}
			height={FOOTER_LOGO_HEIGHT}
			quality={100}
			priority={false}
			sizes="(max-width: 768px) 70vw, 400px"
			className={cn("min-w-0 object-contain object-left", className)}
			style={{ aspectRatio: FOOTER_ASPECT }}
		/>
	);
};
