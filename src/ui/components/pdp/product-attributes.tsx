"use client";

import { Shirt, Leaf, Droplets, Ruler, Sparkles } from "lucide-react";
import {
	Accordion,
	AccordionItemWithContext,
	AccordionTrigger,
	AccordionContent,
} from "@/ui/components/ui/accordion";
import { Badge } from "@/ui/components/ui/badge";
import type { PolicyLabelValues } from "@/lib/content/policy-format";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface Attribute {
	name: string;
	value: string | boolean | string[];
}

interface ProductAttributesProps {
	attributes?: Attribute[];
	careInstructions?: string | null;
	policyLabels: PolicyLabelValues;
	className?: string;
	/** Larger body text for accordion content (e.g. conversion landing). */
	largeContent?: boolean;
}

const attributeIcons: Record<string, ReactNode> = {
	Material: <Shirt className="h-4 w-4" />,
	"Made with Recycled Fibers": <Leaf className="h-4 w-4" />,
	Waterproof: <Droplets className="h-4 w-4" />,
	Fit: <Ruler className="h-4 w-4" />,
	"Key Features": <Sparkles className="h-4 w-4" />,
};

const SHIPPING_BODY =
	"Free shipping on orders over {freeShippingThreshold}. Standard delivery 3-5 business days.";
const RETURNS_BODY =
	"Free returns within {returnsWindowDays} days of purchase. Items must be unused and in original packaging.";

function interpolatePolicyCopy(template: string, policyLabels: PolicyLabelValues): string {
	return template
		.replace("{freeShippingThreshold}", policyLabels.freeShippingThreshold)
		.replace("{returnsWindowDays}", String(policyLabels.returnsWindowDays));
}

export function ProductAttributes({
	attributes = [],
	careInstructions,
	policyLabels,
	className,
	largeContent = false,
}: ProductAttributesProps) {
	const formatValue = (value: string | boolean | string[]): ReactNode => {
		if (typeof value === "boolean") return value ? "Yes" : "No";
		if (Array.isArray(value)) {
			return (
				<div className="flex flex-wrap justify-end gap-1">
					{value.map((v) => (
						<Badge key={v} variant="secondary" className="font-normal">
							{v}
						</Badge>
					))}
				</div>
			);
		}
		return value;
	};

	const displayAttributes = attributes.filter((attr) => !["Size", "Color", "Bundle"].includes(attr.name));

	const hasContent =
		displayAttributes.length > 0 ||
		careInstructions ||
		policyLabels.freeShippingThreshold ||
		policyLabels.returnsWindowDays;

	if (!hasContent) {
		return null;
	}

	const bodyText = largeContent ? "text-lg leading-relaxed sm:text-xl" : "text-base leading-relaxed";
	const rowText = largeContent ? "text-lg sm:text-xl" : "text-base";
	const triggerText = largeContent
		? "py-4 text-lg font-medium hover:no-underline sm:text-xl"
		: "py-4 text-base font-medium hover:no-underline sm:text-lg";

	return (
		<Accordion type="multiple" className={className}>
			{displayAttributes.length > 0 && (
				<AccordionItemWithContext value="details" className="border-border">
					<AccordionTrigger className={triggerText}>Product Details</AccordionTrigger>
					<AccordionContent>
						<div className="grid gap-3">
							{displayAttributes.map((attr) => (
								<div key={attr.name} className={cn("flex items-start justify-between gap-4", rowText)}>
									<span className="text-foreground/80 flex items-center gap-2">
										{attributeIcons[attr.name]}
										{attr.name}
									</span>
									<span className="text-right font-medium">{formatValue(attr.value)}</span>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItemWithContext>
			)}

			{careInstructions && (
				<AccordionItemWithContext value="care" className="border-border">
					<AccordionTrigger className={triggerText}>Care Instructions</AccordionTrigger>
					<AccordionContent className={cn("text-foreground/80", bodyText)}>
						{careInstructions}
					</AccordionContent>
				</AccordionItemWithContext>
			)}

			<AccordionItemWithContext value="shipping" className="border-border">
				<AccordionTrigger className={triggerText}>Shipping & Returns</AccordionTrigger>
				<AccordionContent className={cn("text-foreground/80", bodyText)}>
					{policyLabels.freeShippingThreshold ? (
						<p className="mb-2">{interpolatePolicyCopy(SHIPPING_BODY, policyLabels)}</p>
					) : null}
					<p>{interpolatePolicyCopy(RETURNS_BODY, policyLabels)}</p>
				</AccordionContent>
			</AccordionItemWithContext>
		</Accordion>
	);
}
