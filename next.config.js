/** @type {import('next').NextConfig} */

// `/_next/image` fetches the upstream URL on the server. Next.js blocks hostnames that
// resolve to loopback/private IPs unless `dangerouslyAllowLocalIP` is true — otherwise
// it returns the same 400 body as a failed `remotePatterns` match ("url" parameter is not allowed).
const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL ?? "";
const allowLocalIpForImages =
	process.env.IMAGES_DANGEROUSLY_ALLOW_LOCAL_IP === "true" ||
	/\b(localhost|127\.0\.0\.1|\[::1\])\b/i.test(saleorApiUrl);

/** Hostname from NEXT_PUBLIC_SALEOR_API_URL for product/thumbnail images (e.g. api.kayapure.com). */
const saleorImageRemotePattern = (() => {
	try {
		const { protocol, hostname } = new URL(saleorApiUrl);
		if (!hostname) return null;
		return {
			protocol: protocol.replace(":", ""),
			hostname,
			pathname: "/**",
		};
	} catch {
		return null;
	}
})();

const config = {
	// Cache Components (Partial Prerendering)
	// Enables mixing static, cached, and dynamic content in a single route.
	// See: https://nextjs.org/docs/app/getting-started/cache-components
	cacheComponents: true,

	// Optimize barrel file imports for better bundle size and cold start performance
	// See: https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
	experimental: {
		optimizePackageImports: ["lucide-react", "lodash-es"],
		// Note: API rate limiting is handled by RequestQueue in src/lib/graphql.ts
		// (max 3 concurrent requests + 200ms delay between requests)
	},

	transpilePackages: ["@stripe/stripe-js"],
	images: {
		dangerouslyAllowLocalIP: allowLocalIpForImages,
		qualities: [75, 100],
		// next/image only proxies URLs that match a pattern (protocol + hostname + optional port/path).
		// Wildcard hostname "*" is not supported — without explicit localhost rules, `/_next/image`
		// returns: "url" parameter is not allowed (e.g. http://localhost:8001/media/...).
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.saleor.cloud",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.media.saleor.cloud",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.amazonaws.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "media.kayapure.com",
				pathname: "/**",
			},
			...(saleorImageRemotePattern ? [saleorImageRemotePattern] : []),
			// Local Saleor (docker-compose often maps API to host :8001; dev may use :8000)
			{ protocol: "http", hostname: "localhost", port: "8000", pathname: "/**" },
			{ protocol: "http", hostname: "localhost", port: "8001", pathname: "/**" },
			{ protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/**" },
			{ protocol: "http", hostname: "127.0.0.1", port: "8001", pathname: "/**" },
		],
	},
	typedRoutes: false,

	// Used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
				? "export"
				: undefined,

	// Cache headers for static assets and API routes
	async headers() {
		const isDev = process.env.NODE_ENV === "development";
		return [
			// In development, prevent aggressive caching of dynamic chunks
			...(isDev
				? [
						{
							source: "/_next/static/chunks/:path*",
							headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
						},
					]
				: []),
			{
				// Static assets - cache for 1 year (immutable with hash in filename)
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				// Public folder assets - cache for 1 month (logos, favicons, etc.)
				source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|webmanifest)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=2592000, stale-while-revalidate=31536000",
					},
				],
			},
			{
				// OG Image API - cache for 1 day
				source: "/api/og",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=604800",
					},
				],
			},
		];
	},

	// Logging configuration
	logging: {
		fetches: {
			fullUrl: process.env.NODE_ENV === "development",
		},
	},
};

export default config;
