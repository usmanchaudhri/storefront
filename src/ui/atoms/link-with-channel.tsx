"use client";

import Link from "next/link";
import { type ComponentProps } from "react";

export const LinkWithChannel = ({
	href,
	channel,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string; channel: string }) => {
	if (!href.startsWith("/")) {
		return <Link {...props} href={href} />;
	}

	const encodedChannel = encodeURIComponent(channel);
	const hrefWithChannel = `/${encodedChannel}${href}`;
	return <Link {...props} href={hrefWithChannel} />;
};
