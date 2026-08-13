"use client";

import Image from "next/image";
import { useState } from "react";
import type { PdpStoryFaqItem } from "@/config/pdp-stories/types";
import { cn } from "@/lib/utils";

const PLUS_ICON = "/pdp/7-in-1-shilajit-gummies/faq-icon-plus.svg";
const MINUS_ICON = "/pdp/7-in-1-shilajit-gummies/faq-icon-minus.svg";

type PdpStoryFaqAccordionProps = {
	items: readonly PdpStoryFaqItem[];
	/** Figma shows the first item in the open (minus) state. */
	defaultOpenId?: string;
};

/**
 * Figma 2435:996 FAQ accordion — teal circular +/- controls, #00A38C bottom borders.
 */
export function PdpStoryFaqAccordion({ items, defaultOpenId }: PdpStoryFaqAccordionProps) {
	const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

	return (
		<ul className="w-full list-none" role="list">
			{items.map((item) => {
				const isOpen = openId === item.id;
				return (
					<li key={item.id} className="border-b-2 border-[#00A38C]">
						<button
							type="button"
							className="flex w-full items-center justify-between gap-4 py-6 text-left sm:py-8"
							aria-expanded={isOpen}
							onClick={() => setOpenId(isOpen ? null : item.id)}
						>
							<span className="text-[clamp(1rem,0.95rem+0.25vw,1.375rem)] font-semibold leading-normal text-[#0B554B]">
								{item.question}
							</span>
							<span
								className="flex size-[42px] shrink-0 items-center justify-center rounded-[21px] border-2 border-[#00A38C] bg-[#00A38C]"
								aria-hidden
							>
								<Image
									src={isOpen ? MINUS_ICON : PLUS_ICON}
									alt=""
									width={17}
									height={17}
									className="size-[17px]"
									unoptimized
								/>
							</span>
						</button>
						<div
							className={cn(
								"grid transition-[grid-template-rows] duration-300 ease-out",
								isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
							)}
							aria-hidden={!isOpen}
						>
							<div className="overflow-hidden">
								<p className="pb-6 text-[clamp(0.9375rem,0.9rem+0.15vw,1.125rem)] leading-relaxed text-[#3F3F3F]">
									{item.answer}
								</p>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
