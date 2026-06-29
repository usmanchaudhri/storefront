"use client";

import type { HomeFaqItem } from "@/config/home-faq";
import {
	Accordion,
	AccordionContent,
	AccordionItemWithContext,
	AccordionTrigger,
} from "@/ui/components/ui/accordion";
import { homeSectionBodyClass } from "@/ui/components/home/home-section-styles";

type HomeFaqAccordionProps = {
	items: readonly HomeFaqItem[];
};

export function HomeFaqAccordion({ items }: HomeFaqAccordionProps) {
	return (
		<Accordion type="single" className="w-full">
			{items.map((item) => (
				<AccordionItemWithContext key={item.id} value={item.id} className="border-border">
					<AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline sm:text-lg">
						{item.question}
					</AccordionTrigger>
					<AccordionContent className={homeSectionBodyClass}>{item.answer}</AccordionContent>
				</AccordionItemWithContext>
			))}
		</Accordion>
	);
}
