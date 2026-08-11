import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { type ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { rootMetadata } from "@/lib/seo";
import { localeConfig } from "@/config/locale";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Root metadata for the entire site.
 * Configuration is in src/lib/seo/config.ts
 */
export const metadata = rootMetadata;

/** Brand teal — matches home signature banner / footer. */
const TOP_LOADER_COLOR = "#006D5B";

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang={localeConfig.htmlLang} className={`${GeistSans.variable} ${GeistMono.variable} min-h-dvh`}>
			<body className="min-h-dvh font-sans">
				{/* Global navigation progress bar for App Router soft navigations */}
				<NextTopLoader
					color={TOP_LOADER_COLOR}
					height={3}
					showSpinner={false}
					crawl
					easing="ease"
					speed={200}
					shadow={`0 0 10px ${TOP_LOADER_COLOR},0 0 5px ${TOP_LOADER_COLOR}`}
					zIndex={1600}
					showAtBottom={false}
				/>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
