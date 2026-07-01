"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, Candy, Droplets, FlaskConical, Package } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import {
	headerShopAllMegaNav,
	type ShopAllCategoryColumn,
	type ShopAllProductThumbnailMap,
} from "@/config/nav";
import { cn } from "@/lib/utils";

const HOVER_CLOSE_DELAY_MS = 200;

const triggerClass = cn(
	"inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium tracking-tight transition-colors duration-200",
	"text-muted-foreground outline-none",
	"hover:bg-teal-500/18 hover:text-teal-700 dark:hover:text-teal-400",
	"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
	"data-[state=open]:bg-teal-500/15 data-[state=open]:text-teal-700 dark:data-[state=open]:text-teal-400",
);

const productNameClass =
	"min-w-0 flex-1 text-[16px] font-medium leading-snug text-foreground transition-colors";

type ColumnAccent = {
	icon: string;
	heading: string;
	productHover: string;
	productHoverText: string;
	productArrow: string;
};

const columnAccent: Record<string, ColumnAccent> = {
	gummy: {
		icon: "text-red-600 dark:text-red-400",
		heading: "text-red-600 dark:text-red-400",
		productHover: "hover:bg-red-500/10",
		productHoverText: "group-hover:text-red-700 dark:group-hover:text-red-400",
		productArrow: "group-hover:text-red-600 dark:group-hover:text-red-400",
	},
	shots: {
		icon: "text-orange-600 dark:text-orange-400",
		heading: "text-orange-600 dark:text-orange-400",
		productHover: "hover:bg-orange-500/10",
		productHoverText: "group-hover:text-orange-700 dark:group-hover:text-orange-400",
		productArrow: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
	},
	drops: {
		icon: "text-blue-600 dark:text-blue-400",
		heading: "text-blue-600 dark:text-blue-400",
		productHover: "hover:bg-blue-500/10",
		productHoverText: "group-hover:text-blue-700 dark:group-hover:text-blue-400",
		productArrow: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
	},
};

function getColumnAccent(slug: string): ColumnAccent {
	return columnAccent[slug] ?? columnAccent.gummy;
}

function CategoryIcon({ slug }: { slug: string }) {
	const className = "h-4 w-4 shrink-0";
	switch (slug) {
		case "gummy":
			return <Candy className={className} aria-hidden />;
		case "shots":
			return <FlaskConical className={className} aria-hidden />;
		case "drops":
			return <Droplets className={className} aria-hidden />;
		default:
			return null;
	}
}

function ProductThumbnail({
	slug,
	thumbnails,
	size = "md",
}: {
	slug: string;
	thumbnails: ShopAllProductThumbnailMap;
	size?: "md" | "sm";
}) {
	const thumb = thumbnails[slug];
	const dimension = size === "sm" ? 40 : 44;

	if (!thumb?.url) {
		return (
			<div
				className={cn(
					"border-border/80 bg-background/80 flex shrink-0 items-center justify-center rounded-md border text-muted-foreground",
					size === "sm" ? "h-10 w-10" : "h-11 w-11",
				)}
				aria-hidden
			>
				<Package className={size === "sm" ? "h-4 w-4" : "h-4 w-4"} />
			</div>
		);
	}

	return (
		<div
			className={cn(
				"border-border/60 relative shrink-0 overflow-hidden rounded-md border bg-background",
				size === "sm" ? "h-10 w-10" : "h-11 w-11",
			)}
		>
			<Image
				src={thumb.url}
				alt={thumb.alt}
				width={dimension}
				height={dimension}
				className="h-full w-full object-cover"
				sizes={`${dimension}px`}
			/>
		</div>
	);
}

function ShopAllProductLink({
	product,
	channel,
	thumbnails,
	accent,
	onNavigate,
}: {
	product: ShopAllCategoryColumn["products"][number];
	channel: string;
	thumbnails: ShopAllProductThumbnailMap;
	accent: ColumnAccent;
	onNavigate?: () => void;
}) {
	return (
		<LinkWithChannel
			href={`/products/${product.slug}`}
			channel={channel}
			prefetch={false}
			className={cn(
				"group flex items-center gap-2.5 rounded-md py-0.5 pr-1 transition-colors",
				accent.productHover,
			)}
			onClick={onNavigate}
		>
			<ProductThumbnail slug={product.slug} thumbnails={thumbnails} />
			<span className={cn(productNameClass, accent.productHoverText)}>{product.name}</span>
			<ArrowRight
				className={cn(
					"h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-70",
					accent.productArrow,
				)}
				aria-hidden
			/>
		</LinkWithChannel>
	);
}

function ShopAllColumn({
	column,
	channel,
	thumbnails,
	onNavigate,
}: {
	column: ShopAllCategoryColumn;
	channel: string;
	thumbnails: ShopAllProductThumbnailMap;
	onNavigate?: () => void;
}) {
	const accent = getColumnAccent(column.slug);

	return (
		<div className="flex min-w-0 flex-col px-1 sm:px-2">
			<div className="mb-1.5 flex items-start gap-1.5">
				<span className={cn("mt-px", accent.icon)}>
					<CategoryIcon slug={column.slug} />
				</span>
				<div className="min-w-0">
					<LinkWithChannel
						href={`/categories/${column.slug}`}
						channel={channel}
						prefetch={false}
						className={cn("text-sm font-semibold tracking-tight hover:underline", accent.heading)}
						onClick={onNavigate}
					>
						{column.name}
					</LinkWithChannel>
					<p className="text-[11px] leading-tight text-muted-foreground">{column.tagline}</p>
				</div>
			</div>
			<ul className="space-y-0.5" role="list">
				{column.products.map((product) => (
					<li key={product.slug}>
						<ShopAllProductLink
							product={product}
							channel={channel}
							thumbnails={thumbnails}
							accent={accent}
							onNavigate={onNavigate}
						/>
					</li>
				))}
			</ul>
			<LinkWithChannel
				href={`/categories/${column.slug}`}
				channel={channel}
				prefetch={false}
				className={cn(
					"mt-0 inline-flex items-center gap-1.5 text-sm font-semibold uppercase leading-none tracking-wide",
					accent.heading,
					"transition-opacity hover:opacity-80",
				)}
				onClick={onNavigate}
			>
				Shop {column.name.toLowerCase()}
				<ArrowRight className={cn("h-3.5 w-3.5 shrink-0", accent.icon)} aria-hidden />
			</LinkWithChannel>
		</div>
	);
}

function ShopAllMegaPanel({
	channel,
	thumbnails,
	className,
	onNavigate,
}: {
	channel: string;
	thumbnails: ShopAllProductThumbnailMap;
	className?: string;
	onNavigate?: () => void;
}) {
	return (
		<div className={cn("px-4 pb-1.5 pt-1 sm:px-6 lg:px-8", className)}>
			<div className="grid gap-1.5 sm:grid-cols-3">
				{headerShopAllMegaNav.map((column) => (
					<ShopAllColumn
						key={column.slug}
						column={column}
						channel={channel}
						thumbnails={thumbnails}
						onNavigate={onNavigate}
					/>
				))}
			</div>
			<div className="border-border/60 mt-2 flex justify-end border-t pt-1.5">
				<LinkWithChannel
					href="/products"
					channel={channel}
					prefetch={false}
					className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background transition-opacity hover:opacity-90"
					onClick={onNavigate}
				>
					Shop all products
					<ArrowRight className="h-3.5 w-3.5" aria-hidden />
				</LinkWithChannel>
			</div>
		</div>
	);
}

function useHoverMenuState() {
	const [open, setOpen] = useState(false);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const cancelClose = () => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
	};

	const openMenu = () => {
		cancelClose();
		setOpen(true);
	};

	const scheduleClose = () => {
		cancelClose();
		closeTimerRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY_MS);
	};

	const closeMenu = () => {
		cancelClose();
		setOpen(false);
	};

	useEffect(() => () => cancelClose(), []);

	return { open, openMenu, scheduleClose, closeMenu };
}

function ShopAllDesktopHoverMenu({
	channel,
	thumbnails,
}: {
	channel: string;
	thumbnails: ShopAllProductThumbnailMap;
}) {
	const { open, openMenu, scheduleClose, closeMenu } = useHoverMenuState();

	return (
		<li
			className="hidden lg:inline-flex"
			onMouseEnter={openMenu}
			onMouseLeave={scheduleClose}
			onFocus={openMenu}
			onBlur={scheduleClose}
		>
			<button
				type="button"
				className={cn(triggerClass, open && "bg-teal-500/15 text-teal-700 dark:text-teal-400")}
				aria-expanded={open}
				aria-haspopup="true"
			>
				Shop All
				<ChevronDown
					className={cn("h-4 w-4 shrink-0 opacity-70 transition-transform", open && "rotate-180")}
					aria-hidden
				/>
			</button>
			{open && (
				<div
					className="fixed inset-x-0 top-[calc(4rem+1px)] z-30 lg:top-[calc(4.25rem+1px)]"
					onMouseEnter={openMenu}
					onMouseLeave={scheduleClose}
				>
					{/* Invisible hover bridge — overlaps upward without pushing the panel down */}
					<div className="absolute -top-3 left-0 right-0 h-3" aria-hidden />
					<div className="border-border/80 w-full border-b bg-popover shadow-xl">
						<ShopAllMegaPanel channel={channel} thumbnails={thumbnails} onNavigate={closeMenu} />
					</div>
				</div>
			)}
		</li>
	);
}

function ShopAllMobileAccordion({
	channel,
	thumbnails,
}: {
	channel: string;
	thumbnails: ShopAllProductThumbnailMap;
}) {
	const [open, setOpen] = useState(false);
	const [openCategory, setOpenCategory] = useState<string | null>(null);

	const closeMenu = () => {
		setOpen(false);
		setOpenCategory(null);
	};

	return (
		<div className="w-full">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className={cn(triggerClass, "w-full justify-between")}
				aria-expanded={open}
			>
				Shop All
				<ChevronDown
					className={cn("h-4 w-4 shrink-0 opacity-70 transition-transform", open && "rotate-180")}
				/>
			</button>
			{open && (
				<div className="bg-secondary/30 mt-2 space-y-2 rounded-xl border border-border p-3">
					<LinkWithChannel
						href="/products"
						channel={channel}
						prefetch={false}
						className="flex items-center justify-between rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background"
						onClick={closeMenu}
					>
						Shop all products
						<ArrowRight className="h-4 w-4" aria-hidden />
					</LinkWithChannel>
					{headerShopAllMegaNav.map((column) => {
						const isCatOpen = openCategory === column.slug;
						const accent = getColumnAccent(column.slug);
						return (
							<div key={column.slug} className="rounded-lg bg-background">
								<button
									type="button"
									onClick={() => setOpenCategory(isCatOpen ? null : column.slug)}
									className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-semibold"
									aria-expanded={isCatOpen}
								>
									<span className={cn("flex items-center gap-2", accent.heading)}>
										<span className={accent.icon}>
											<CategoryIcon slug={column.slug} />
										</span>
										{column.name}
									</span>
									<ChevronDown
										className={cn("h-4 w-4 opacity-60 transition-transform", isCatOpen && "rotate-180")}
									/>
								</button>
								{isCatOpen && (
									<ul className="space-y-0.5 px-2 pb-2 pt-1" role="list">
										{column.products.map((product) => (
											<li key={product.slug}>
												<LinkWithChannel
													href={`/products/${product.slug}`}
													channel={channel}
													prefetch={false}
													className={cn(
														"group flex items-center gap-2.5 rounded-md py-0.5 pr-1 transition-colors",
														accent.productHover,
													)}
													onClick={closeMenu}
												>
													<ProductThumbnail slug={product.slug} thumbnails={thumbnails} size="sm" />
													<span className={cn(productNameClass, accent.productHoverText)}>
														{product.name}
													</span>
												</LinkWithChannel>
											</li>
										))}
										<li>
											<LinkWithChannel
												href={`/categories/${column.slug}`}
												channel={channel}
												prefetch={false}
												className="block px-2 py-2 text-xs font-medium uppercase tracking-wide text-foreground"
												onClick={closeMenu}
											>
												View all {column.name.toLowerCase()}
											</LinkWithChannel>
										</li>
									</ul>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export function NavShopAllMenu({
	channel,
	productThumbnails = {},
}: {
	channel: string;
	productThumbnails?: ShopAllProductThumbnailMap;
}) {
	const pathname = usePathname();

	return (
		<>
			<ShopAllDesktopHoverMenu key={pathname} channel={channel} thumbnails={productThumbnails} />
			<li className="w-full lg:hidden">
				<ShopAllMobileAccordion key={pathname} channel={channel} thumbnails={productThumbnails} />
			</li>
		</>
	);
}
