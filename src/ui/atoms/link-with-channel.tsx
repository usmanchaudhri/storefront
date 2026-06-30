"use client";

import Link from "next/link";
import { type ComponentProps } from "react";

import { channelHref } from "@/lib/channel-path";

export const LinkWithChannel = ({
	href,
	channel,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string; channel: string }) => {
	if (!href.startsWith("/")) {
		return <Link {...props} href={href} />;
	}

	return <Link {...props} href={channelHref(channel, href)} />;
};
