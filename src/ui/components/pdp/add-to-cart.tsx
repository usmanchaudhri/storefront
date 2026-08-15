"use client";

import { useFormStatus } from "react-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { DiscountPercentLabel } from "@/ui/components/ui/sale-label";
import { cn } from "@/lib/utils";

interface AddToCartProps {
	price: string;
	compareAtPrice?: string | null;
	discountPercent?: number | null;
	disabled?: boolean;
	disabledReason?: "no-selection" | "out-of-stock";
}

function AddToCartButton({
	disabled,
	disabledReason,
}: {
	disabled?: boolean;
	disabledReason?: "no-selection" | "out-of-stock";
}) {
	const { pending } = useFormStatus();

	const getButtonText = () => {
		if (pending) return "Adding...";
		if (!disabled) return "Add to bag";
		if (disabledReason === "out-of-stock") return "Out of stock";
		return "Select options to continue";
	};

	return (
		<Button
			type="submit"
			size="lg"
			disabled={disabled || pending}
			className={cn(
				"h-14 w-full rounded-xl text-base font-semibold transition-all duration-200",
				// Figma 2435:1331 — Add to Cart button fill
				"bg-[#0A584C] text-white hover:bg-[#084840]",
				"disabled:bg-[#0A584C]/50 disabled:text-white disabled:opacity-100",
				pending && "opacity-80",
			)}
		>
			<ShoppingBag className={cn("mr-2 h-5 w-5 transition-transform", pending && "scale-90")} />
			{getButtonText()}
		</Button>
	);
}

export function AddToCart({
	price,
	compareAtPrice,
	discountPercent,
	disabled = false,
	disabledReason,
}: AddToCartProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-baseline gap-3">
				<span className="text-2xl font-semibold tabular-nums tracking-tight">{price}</span>
				{compareAtPrice && (
					<>
						<span className="text-lg tabular-nums text-muted-foreground line-through">{compareAtPrice}</span>
						{discountPercent ? <DiscountPercentLabel percent={discountPercent} /> : null}
					</>
				)}
			</div>

			<AddToCartButton disabled={disabled} disabledReason={disabledReason} />

			{/* Figma 2435:1336 — buy-box disclaimers */}
			<div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] leading-snug text-[#313131] sm:gap-4 sm:text-sm sm:leading-normal">
				<p>
					Free
					<br />
					Shipping For
					<br />
					Subscribers
				</p>
				<p>
					60-Day
					<br />
					Satisfaction
					<br />
					Guarantee
				</p>
				<p>
					Save 20%
					<br />
					When You
					<br />
					Subscribe
				</p>
			</div>
		</div>
	);
}
