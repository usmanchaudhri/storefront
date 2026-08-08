import Link from "next/link";
import { LinkWithChannel } from "../atoms/link-with-channel";
import { ChannelSelect } from "./channel-select";
import { ChannelsListDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { footerLearnMoreNav, footerProductSections } from "@/config/footer";
import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";
import { CopyrightText } from "./copyright-text";
import { FooterNewsletter } from "./footer-newsletter";
import { homeSignatureBannerSurfaceClass } from "./home/home-section-styles";
import { Logo } from "./shared/logo";

const footerLinkClass = "text-base text-white/80 transition-colors hover:text-white";

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
		<footer className={cn(homeSignatureBannerSurfaceClass, "text-white")}>
			{/* Extra bottom padding on mobile to account for sticky add-to-cart bar */}
			<div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-12 lg:px-8 lg:py-16">
				<FooterNewsletter />

				{/* Full-width brand wordmark, spanning the footer above the link columns */}
				<Link href={channelHref(channel, "/")} prefetch={false} className="mb-10 block lg:mb-12">
					<Logo
						className="mx-auto h-auto max-h-32 w-full object-contain object-center lg:max-h-40"
						variant="footer"
					/>
				</Link>

				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10">
					{/* Brand */}
					<div className="col-span-2 sm:col-span-3 lg:col-span-1">
						<p className="max-w-xs text-base leading-relaxed text-white/80">
							Premium natural supplements crafted with scientifically-backed ingredients to unlock your
							body&apos;s potential for sustained energy, enhanced focus, and optimal wellness.
						</p>
					</div>

					{/* Product sections */}
					{footerProductSections.map((section) => (
						<div key={section.title}>
							<h4 className="mb-3 text-base font-semibold text-white">{section.title}</h4>
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

					{/* Learn more */}
					<div>
						<h4 className="mb-3 text-base font-semibold text-white">Learn more</h4>
						<ul className="space-y-2">
							{footerLearnMoreNav.map((item) => (
								<li key={item.href}>
									<LinkWithChannel
										href={item.href}
										channel={channel}
										prefetch={false}
										className={footerLinkClass}
									>
										{item.name}
									</LinkWithChannel>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Channel selector */}
				{channels?.channels && (
					<div className="mt-8 text-white/80">
						<label className="flex items-center gap-2 text-base">
							<span>Change currency:</span>
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				{/* Bottom bar */}
				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 sm:flex-row">
					<p className="text-sm text-white/70">
						<CopyrightText />
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="/privacy"
							prefetch={false}
							className="text-sm text-white/70 transition-colors hover:text-white"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							prefetch={false}
							className="text-sm text-white/70 transition-colors hover:text-white"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
