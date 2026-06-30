import { DefaultChannelSlug } from "@/app/config";

/**
 * Shown only when NEXT_PUBLIC_DEFAULT_CHANNEL is unset.
 * When configured, middleware rewrites `/` to the channel homepage internally.
 */
export default function RootPage() {
	if (DefaultChannelSlug) {
		return null;
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-8">
			<div className="max-w-md text-center">
				<h1 className="mb-4 text-2xl font-semibold text-foreground">Channel Not Configured</h1>
				<p className="mb-6 text-muted-foreground">
					Set the <code className="rounded bg-muted px-2 py-1">NEXT_PUBLIC_DEFAULT_CHANNEL</code> environment
					variable to your Saleor channel slug.
				</p>
				<div className="rounded-lg bg-muted p-4 text-left">
					<p className="mb-2 text-sm font-medium text-foreground">In your .env.local file:</p>
					<code className="text-sm text-muted-foreground">NEXT_PUBLIC_DEFAULT_CHANNEL=default-channel</code>
				</div>
			</div>
		</div>
	);
}
