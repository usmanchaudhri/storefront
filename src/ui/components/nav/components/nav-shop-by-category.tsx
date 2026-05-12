"use client";

import { ChevronDown } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { headerShopByCategoryNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu";

const triggerClass = cn(
	"inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium tracking-tight transition-colors duration-200",
	"text-muted-foreground outline-none",
	"hover:bg-teal-500/18 hover:text-foreground",
	"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
	"data-[state=open]:bg-teal-500/15 data-[state=open]:text-foreground",
);

const itemClass = cn(
	"cursor-pointer rounded-md px-2 py-2 text-sm outline-none",
	"focus:bg-teal-500/12 focus:text-foreground",
);

export function NavShopByCategory() {
	return (
		<li className="inline-flex w-full md:w-auto">
			<DropdownMenu>
				<DropdownMenuTrigger
					type="button"
					className={cn(triggerClass, "w-full justify-between md:w-auto md:justify-center")}
				>
					Shop by category
					<ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center" className="min-w-[13rem]">
					{headerShopByCategoryNav.map((item) => (
						<DropdownMenuItem key={item.slug} asChild className="p-0 focus:bg-transparent">
							<LinkWithChannel
								href={`/categories/${item.slug}`}
								prefetch={false}
								className={cn(itemClass, "hover:bg-teal-500/12 block w-full text-foreground")}
							>
								{item.name}
							</LinkWithChannel>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</li>
	);
}
