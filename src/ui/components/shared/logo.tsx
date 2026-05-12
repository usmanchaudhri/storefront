import Image from "next/image";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * Shared Logo Component
 *
 * Single source of truth for the storefront logo.
 * Raster wordmark: /public/kayapure-logo.png
 *
 * Black-on-white source asset: CSS `invert` adapts the mark for
 * light header (default), dark header (dark:invert), and dark footer
 * (inverted prop). Footer uses `invert dark:invert-0` for correct
 * contrast in both color schemes.
 *
 * @example
 * <Logo className="h-7 w-auto" />
 * <Logo className="h-7 w-auto" inverted />
 */

const LOGO_SRC = "/kayapure-logo.png" as const;
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 231;
const ASPECT = `${LOGO_WIDTH} / ${LOGO_HEIGHT}` as const;

interface LogoProps {
	className?: string;
	/** Accessible label for the logo (defaults to brand) */
	ariaLabel?: string;
	/** Invert for dark backgrounds (e.g. dark footer) */
	inverted?: boolean;
}

export const Logo = ({ className, ariaLabel = brandConfig.logoAriaLabel, inverted = false }: LogoProps) => {
	return (
		<Image
			src={LOGO_SRC}
			alt={ariaLabel}
			width={LOGO_WIDTH}
			height={LOGO_HEIGHT}
			quality={100}
			priority={false}
			sizes="(max-width: 768px) 40vw, 200px"
			className={cn(
				"min-w-0 object-contain object-left",
				inverted ? "invert dark:invert-0" : "dark:invert",
				className,
			)}
			style={{ aspectRatio: ASPECT }}
		/>
	);
};
