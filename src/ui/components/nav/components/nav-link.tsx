"use client";

import clsx from "clsx";
import { type ReactElement } from "react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import useSelectedPathname from "@/hooks/use-selected-pathname";

export function NavLink({
	href,
	channel,
	children,
}: {
	href: string;
	channel: string;
	children: ReactElement | string;
}) {
	const pathname = useSelectedPathname();
	const isActive = pathname === href;

	return (
		<li className="inline-flex">
			<LinkWithChannel
				href={href}
				channel={channel}
				prefetch={false}
				className={clsx(
					// Match logo “Kaya” #09594D; hover = logo “Pure” #00A38C (text only)
					"inline-flex items-center rounded-lg px-3.5 py-2 text-[18px] font-medium uppercase tracking-tight text-[#09594D] transition-colors duration-200",
					"hover:text-[#00A38C]",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
					isActive && "text-[#00A38C]",
				)}
			>
				{children}
			</LinkWithChannel>
		</li>
	);
}
