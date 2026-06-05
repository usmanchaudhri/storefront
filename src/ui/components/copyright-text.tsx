import { getCopyrightText } from "@/config/brand";

/**
 * Static year baked at build time (NEXT_PUBLIC_COPYRIGHT_YEAR).
 * Avoids new Date()/connection() which break Next.js 16 Cache Components prerender.
 */
const copyrightYear = Number(process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ?? "2026");

export function CopyrightText() {
	return <>{getCopyrightText(copyrightYear)}</>;
}
