"use client";

import { useParams, usePathname } from "next/navigation";

import { isDefaultChannel } from "@/lib/channel-path";

function useSelectedPathname() {
	const pathname = usePathname();
	const { channel } = useParams<{ channel?: string }>();

	if (!channel || isDefaultChannel(channel)) {
		return pathname;
	}

	const channelPrefix = `/${channel}`;
	return pathname.startsWith(channelPrefix) ? pathname.slice(channelPrefix.length) || "/" : pathname;
}

export default useSelectedPathname;
