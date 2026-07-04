"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { channelHref } from "@/lib/channel-path";
import { cn } from "@/lib/utils";

export interface NavHrefLinkProps extends Omit<ComponentProps<"a">, "href"> {
	href: string;
	children: ReactNode;
}

function isExternalHref(href: string): boolean {
	return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

/** Channel-aware link for CMS/marketing hrefs. */
export function NavHrefLink({ href, children, className, ...props }: NavHrefLinkProps) {
	const { channel } = useParams<{ channel?: string }>();

	if (isExternalHref(href)) {
		return (
			<a href={href} rel="noopener noreferrer" className={className} {...props}>
				{children}
			</a>
		);
	}

	const resolvedHref = channel && href.startsWith("/") ? channelHref(channel, href) : href;

	return (
		<Link href={resolvedHref} prefetch={false} className={cn(className)} {...props}>
			{children}
		</Link>
	);
}
