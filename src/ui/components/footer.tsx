import Link from "next/link";
import { LinkWithChannel } from "../atoms/link-with-channel";
import { ChannelSelect } from "./channel-select";
import { ChannelsListDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { footerProductSections } from "@/config/footer";
import { CopyrightText } from "./copyright-text";
import { FooterNewsletter } from "./footer-newsletter";
import { Logo } from "./shared/logo";

const footerLinkClass = "text-sm text-neutral-400 transition-colors hover:text-neutral-200";

/** Cached channels list - rarely changes */
async function getChannels() {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.channels);

	if (!process.env.SALEOR_APP_TOKEN) {
		return null;
	}

	const result = await executePublicGraphQL(ChannelsListDocument, {
		headers: {
			Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
		},
	});

	return result.ok ? result.data : null;
}

export async function Footer({ channel }: { channel: string }) {
	const channels = await getChannels();

	return (
		<footer className="bg-foreground text-background">
			{/* Extra bottom padding on mobile to account for sticky add-to-cart bar */}
			<div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-12 lg:px-8 lg:py-16">
				<FooterNewsletter />

				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10">
					{/* Brand */}
					<div className="col-span-2 sm:col-span-3 lg:col-span-1">
						<Link href={`/${channel}`} prefetch={false} className="mb-4 inline-block">
							<Logo className="h-7 w-auto" inverted />
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
							Premium natural supplements crafted with scientifically-backed ingredients to unlock your
							body&apos;s potential for sustained energy, enhanced focus, and optimal wellness.
						</p>
					</div>

					{/* Product sections */}
					{footerProductSections.map((section) => (
						<div key={section.title}>
							<h4 className="mb-3 text-sm font-medium text-neutral-300">{section.title}</h4>
							<ul className="space-y-2">
								{section.products.map((product) => (
									<li key={product.slug}>
										<LinkWithChannel
											href={`/products/${product.slug}`}
											channel={channel}
											prefetch={false}
											className={footerLinkClass}
										>
											{product.name}
										</LinkWithChannel>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Channel selector */}
				{channels?.channels && (
					<div className="mt-8 text-neutral-400">
						<label className="flex items-center gap-2 text-sm">
							<span>Change currency:</span>
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				{/* Bottom bar */}
				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
					<p className="text-xs text-neutral-500">
						<CopyrightText />
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="/privacy"
							prefetch={false}
							className="text-xs text-neutral-500 transition-colors hover:text-neutral-300"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							prefetch={false}
							className="text-xs text-neutral-500 transition-colors hover:text-neutral-300"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
