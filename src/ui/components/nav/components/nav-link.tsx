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
					"inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-medium tracking-tight transition-colors duration-200",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
					isActive
						? "bg-teal-500/15 text-foreground shadow-sm"
						: "hover:bg-teal-500/18 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400",
				)}
			>
				{children}
			</LinkWithChannel>
		</li>
	);
}
