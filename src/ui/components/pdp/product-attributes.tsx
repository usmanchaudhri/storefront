"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionItemWithContext,
	AccordionTrigger,
	AccordionContent,
} from "@/ui/components/ui/accordion";

interface Attribute {
	name: string;
	value: string | boolean | string[];
}

interface ProductAttributesProps {
	attributes?: Attribute[];
	careInstructions?: string | null;
	className?: string;
}

function extractKeyBenefits(attributes: Attribute[]): string[] {
	const benefitsAttribute = attributes.find((attr) =>
		["benefits", "key benefits", "key features"].includes(attr.name.trim().toLowerCase()),
	);

	if (!benefitsAttribute) return [];

	if (Array.isArray(benefitsAttribute.value)) {
		return benefitsAttribute.value.filter(Boolean).slice(0, 4);
	}

	if (typeof benefitsAttribute.value === "string") {
		return benefitsAttribute.value
			.split(/[\n,;|]+/)
			.map((item) => item.trim())
			.filter(Boolean)
			.slice(0, 4);
	}

	return [];
}

export function ProductAttributes({ attributes = [], careInstructions, className }: ProductAttributesProps) {
	const keyBenefits = extractKeyBenefits(attributes);

	if (keyBenefits.length === 0 && !careInstructions) {
		return null;
	}

	const defaultOpen = keyBenefits.length > 0 ? ["details"] : ["care"];

	return (
		<Accordion type="multiple" defaultValue={defaultOpen} className={cn("w-full", className)}>
			{keyBenefits.length > 0 && (
				<AccordionItemWithContext value="details" className="border-border">
					<AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
						Product Details
					</AccordionTrigger>
					<AccordionContent>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							{keyBenefits.map((benefit) => (
								<div key={benefit} className="bg-secondary/40 rounded-lg border border-border p-3 text-sm">
									<p className="flex items-start gap-2 font-medium text-foreground">
										<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
										<span>{benefit}</span>
									</p>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItemWithContext>
			)}

			{careInstructions && (
				<AccordionItemWithContext value="care" className="border-border">
					<AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
						Care Instructions
					</AccordionTrigger>
					<AccordionContent className="leading-relaxed text-muted-foreground">
						{careInstructions}
					</AccordionContent>
				</AccordionItemWithContext>
			)}
		</Accordion>
	);
}
