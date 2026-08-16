"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Package } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import {
	headerShopAllMegaNav,
	type ShopAllCategoryColumn,
	type ShopAllProductThumbnailMap,
} from "@/config/nav";
import { cn } from "@/lib/utils";

const HOVER_CLOSE_DELAY_MS = 200;

/** Figma 2435:637 — Shop All mega menu tokens */
const MEGA = {
	sidebarBg: "bg-[#D9F6F1]",
	sidebarLabel: "text-[#6A7F7B]",
	itemDefault: "text-[#173532]",
	itemActive: "text-[#064B45]",
	itemActiveBg: "bg-white/60",
	cardBorder: "border-[#E5EFED]",
	cardShadow: "shadow-[0px_8px_13px_rgba(12,90,78,0.06)]",
	panelShadow: "shadow-[0px_20px_45px_rgba(0,0,0,0.08)]",
	title: "text-[#064B45]",
	subtitle: "text-[#66827D]",
	imageGradient: "bg-gradient-to-br from-[#EFFBF9] to-[#CFF2EC]",
} as const;

const triggerClass = cn(
	// Match logo “Kaya” #09594D (kayapure-logo-wordmark.svg)
	"inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[18px] font-medium uppercase tracking-tight transition-colors duration-200",
	"text-[#09594D] outline-none",
	"hover:bg-teal-500/18",
	"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
	"data-[state=open]:bg-teal-500/15",
);

function ProductCardImage({ slug, thumbnails }: { slug: string; thumbnails: ShopAllProductThumbnailMap }) {
	const thumb = thumbnails[slug];

	return (
		<div className={cn("relative aspect-square w-full overflow-hidden rounded-[12px]", MEGA.imageGradient)}>
			{thumb?.url ? (
				<Image
					src={thumb.url}
					alt={thumb.alt}
					fill
					quality={100}
					className="scale-[1.18] object-contain"
					sizes="(max-width: 1024px) 50vw, 220px"
				/>
			) : (
				<div className="flex h-full w-full items-center justify-center text-[#66827D]" aria-hidden>
					<Package className="h-8 w-8 opacity-50" />
				</div>
			)}
		</div>
	);
}

function ShopAllProductCard({
	product,
	channel,
	thumbnails,
	tagline,
	onNavigate,
}: {
	product: ShopAllCategoryColumn["products"][number];
	channel: string;
	thumbnails: ShopAllProductThumbnailMap;
	tagline: string;
	onNavigate?: () => void;
}) {
	return (
		<LinkWithChannel
			href={`/products/${product.slug}`}
			channel={channel}
			prefetch={false}
			onClick={onNavigate}
			className={cn(
				"flex w-[200px] shrink-0 flex-col gap-1 rounded-[16px] border bg-white px-1 pb-2.5 pt-1 transition-transform hover:-translate-y-0.5 sm:w-[220px]",
				MEGA.cardBorder,
				MEGA.cardShadow,
			)}
		>
			<ProductCardImage slug={product.slug} thumbnails={thumbnails} />
			<div className="min-w-0 px-1 pt-1">
				<p className={cn("truncate text-[13px] font-bold leading-snug", MEGA.title)}>{product.name}</p>
				{tagline ? (
					<p className={cn("mt-0.5 truncate text-[11px] font-normal leading-snug", MEGA.subtitle)}>
						{tagline}
					</p>
				) : null}
			</div>
		</LinkWithChannel>
	);
}

/** Right pane: product cards for the active category (Figma grid). */
function ShopAllProductGrid({
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
	return (
		<div key={column.slug} className="flex flex-wrap gap-3 duration-200 animate-in fade-in-0 sm:gap-3.5">
			{column.products.map((product) => (
				<ShopAllProductCard
					key={product.slug}
					product={product}
					channel={channel}
					thumbnails={thumbnails}
					tagline={column.tagline}
					onNavigate={onNavigate}
				/>
			))}
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
	const [activeSlug, setActiveSlug] = useState<string>(headerShopAllMegaNav[0]?.slug ?? "");
	const activeColumn =
		headerShopAllMegaNav.find((column) => column.slug === activeSlug) ?? headerShopAllMegaNav[0];

	return (
		<div className={cn("flex w-full overflow-hidden bg-white", className)}>
			{/* Left rail — Figma Aside (#D9F6F1) */}
			<aside
				className={cn(
					"flex min-h-[360px] w-[200px] shrink-0 flex-col self-stretch px-5 pb-6 pt-8 sm:w-[220px] lg:min-h-[400px] lg:w-[240px] lg:px-6 lg:pb-8 lg:pt-10",
					MEGA.sidebarBg,
				)}
			>
				<p
					className={cn(
						"mb-4 text-[14px] font-bold uppercase leading-tight tracking-[1.7px] lg:mb-5 lg:text-[15px]",
						MEGA.sidebarLabel,
					)}
				>
					Shop by
					<br />
					collection
				</p>

				<ul className="flex flex-col" role="list">
					{headerShopAllMegaNav.map((column) => {
						const isActive = column.slug === activeColumn?.slug;

						return (
							<li key={column.slug}>
								<LinkWithChannel
									href={`/categories/${column.slug}`}
									channel={channel}
									prefetch={false}
									onMouseEnter={() => setActiveSlug(column.slug)}
									onFocus={() => setActiveSlug(column.slug)}
									onClick={onNavigate}
									aria-current={isActive ? "true" : undefined}
									className={cn(
										"flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-3 text-left transition-colors",
										isActive ? cn(MEGA.itemActiveBg, MEGA.itemActive) : MEGA.itemDefault,
									)}
								>
									<span className="text-[16px] font-bold leading-none lg:text-[18px]">{column.name}</span>
									<span className="text-[16px] font-bold leading-none lg:text-[18px]" aria-hidden>
										›
									</span>
								</LinkWithChannel>
							</li>
						);
					})}
				</ul>

				<div className="mt-auto pt-6 lg:pt-8">
					<LinkWithChannel
						href="/products"
						channel={channel}
						prefetch={false}
						onClick={onNavigate}
						className={cn(
							"inline-block px-3 text-[13px] font-bold uppercase underline decoration-solid underline-offset-2 transition-opacity hover:opacity-80 lg:text-[14px]",
							MEGA.itemDefault,
						)}
					>
						Shop All
					</LinkWithChannel>
				</div>
			</aside>

			{/* Right pane — product cards */}
			<div className="min-w-0 flex-1 p-4 sm:p-5 lg:p-6">
				{activeColumn && (
					<ShopAllProductGrid
						column={activeColumn}
						channel={channel}
						thumbnails={thumbnails}
						onNavigate={onNavigate}
					/>
				)}
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
					<div className={cn("w-full border-b border-[#E5EFED] bg-white", MEGA.panelShadow)}>
						<div className="mx-auto max-w-[1600px]">
							<ShopAllMegaPanel channel={channel} thumbnails={thumbnails} onNavigate={closeMenu} />
						</div>
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
				<div className={cn("mt-2 overflow-hidden rounded-2xl", MEGA.sidebarBg)}>
					<p
						className={cn(
							"px-4 pb-2 pt-4 text-[13px] font-bold uppercase tracking-[1.7px]",
							MEGA.sidebarLabel,
						)}
					>
						Shop by collection
					</p>
					{headerShopAllMegaNav.map((column) => {
						const isCatOpen = openCategory === column.slug;
						return (
							<div key={column.slug} className="px-2">
								<button
									type="button"
									onClick={() => setOpenCategory(isCatOpen ? null : column.slug)}
									className={cn(
										"mb-1 flex w-full items-center justify-between rounded-[10px] px-3 py-3 text-left text-[17px] font-bold",
										isCatOpen ? cn(MEGA.itemActiveBg, MEGA.itemActive) : MEGA.itemDefault,
									)}
									aria-expanded={isCatOpen}
								>
									{column.name}
									<span aria-hidden>›</span>
								</button>
								{isCatOpen && (
									<ul className="mb-3 grid grid-cols-1 gap-2 px-1 pb-2 sm:grid-cols-2" role="list">
										{column.products.map((product) => (
											<li key={product.slug}>
												<ShopAllProductCard
													product={product}
													channel={channel}
													thumbnails={thumbnails}
													tagline={column.tagline}
													onNavigate={closeMenu}
												/>
											</li>
										))}
									</ul>
								)}
							</div>
						);
					})}
					<div className="border-t border-white/50 px-4 py-4">
						<LinkWithChannel
							href="/products"
							channel={channel}
							prefetch={false}
							className={cn(
								"text-[14px] font-bold uppercase underline decoration-solid underline-offset-2",
								MEGA.itemDefault,
							)}
							onClick={closeMenu}
						>
							Shop All
						</LinkWithChannel>
					</div>
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
