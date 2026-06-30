import Image from "next/image";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * Shared Logo Component
 *
 * Single source of truth for the storefront logo.
 * Raster wordmark: /public/kayapure-logo.png (header)
 * Footer wordmark: /public/kayapure-footer-logo.png
 *
 * Black-on-white source asset: CSS `invert` adapts the header mark for
 * light header (default) and dark mode (dark:invert). Footer uses the
 * dedicated teal wordmark (variant="footer") without inversion.
 *
 * @example
 * <Logo className="h-7 w-auto" />
 * <Logo className="h-7 w-auto" inverted />
 * <Logo className="h-7 w-auto" variant="footer" />
 */

const LOGO_SRC = "/kayapure-logo.png" as const;
const FOOTER_LOGO_SRC = "/kayapure-footer-logo.png" as const;
const LOGO_WIDTH = 543;
const LOGO_HEIGHT = 116;
const ASPECT = `${LOGO_WIDTH} / ${LOGO_HEIGHT}` as const;

interface LogoProps {
	className?: string;
	/** Accessible label for the logo (defaults to brand) */
	ariaLabel?: string;
	/** Invert for dark backgrounds (e.g. dark footer) — default header logo only */
	inverted?: boolean;
	/** Footer wordmark (dark teal on transparent) */
	variant?: "default" | "footer";
}

export const Logo = ({
	className,
	ariaLabel = brandConfig.logoAriaLabel,
	inverted = false,
	variant = "default",
}: LogoProps) => {
	const isFooter = variant === "footer";

	return (
		<Image
			src={isFooter ? FOOTER_LOGO_SRC : LOGO_SRC}
			alt={ariaLabel}
			width={LOGO_WIDTH}
			height={LOGO_HEIGHT}
			quality={100}
			priority={false}
			sizes="(max-width: 768px) 40vw, 200px"
			className={cn(
				"min-w-0 object-contain object-left",
				!isFooter && (inverted ? "invert dark:invert-0" : "dark:invert"),
				className,
			)}
			style={{ aspectRatio: ASPECT }}
		/>
	);
};
