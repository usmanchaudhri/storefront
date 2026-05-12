"use client";

import { Fragment, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { ShoppingBag, ShieldCheck, FlaskConical, Award } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/config/locale";
import {
	DEFAULT_PACKAGE_TIERS_FALLBACK,
	type PdpPackageSelectionMode,
	type PdpPackageTier,
} from "@/config/pdp-layout";
import { PurchaseFlowStep } from "./purchase-flow-step";

/**
 * Responsive tier grid: 1 column for a single tier, 2 columns from `sm` for two tiers,
 * 3 columns from `lg` for three or more (stacks to one column on narrow screens).
 */
function packageTierGridClassForCount(tierCount: number): string {
	if (tierCount <= 1) {
		return "grid grid-cols-1 gap-3";
	}
	if (tierCount === 2) {
		return "grid grid-cols-1 gap-3 sm:grid-cols-2";
	}
	return "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";
}

interface AddToCartProps {
	basePriceAmount?: number | null;
	currency?: string | null;
	fallbackPriceLabel: string;
	disabled?: boolean;
	disabledReason?: "no-selection" | "out-of-stock";
	/** From `pdp_package_section_title` — shown as step title when `pdp_bundle_display` is on (default: "Choose Your Package"). */
	packageSectionTitle?: string;
	/** From `pdp_package_unit_label` — singular form (e.g. bottle). */
	packageUnitSingular?: string;
	/** From `pdp_package_unit_label` — plural form (e.g. bottles). */
	packageUnitPlural?: string;
	/** From `pdp_package_selection_mode`: tier bundles vs quantity-only. */
	packageSelectionMode?: PdpPackageSelectionMode;
	/** From `pdp_package_tiers` attribute (or defaults). */
	packageTiers: PdpPackageTier[];
	/** From `pdp_bundle_display` — when true, show package step title + tier grid; when false, hide entirely. */
	showPackageSection?: boolean;
	/** First step number inside the purchase flow (2 if a variant step is shown above, else 1). */
	flowStepStart?: number;
}

function AddToCartButton({
	disabled,
	disabledReason,
	totalLabel,
}: {
	disabled?: boolean;
	disabledReason?: "no-selection" | "out-of-stock";
	totalLabel: string;
}) {
	const { pending } = useFormStatus();

	const getButtonText = () => {
		if (pending) return "Adding...";
		if (!disabled) return `Add to bag — ${totalLabel}`;
		if (disabledReason === "out-of-stock") return "Out of stock";
		return "Select options to continue";
	};

	return (
		<Button
			type="submit"
			size="lg"
			disabled={disabled || pending}
			className={cn(
				"h-14 w-full rounded-xl text-base font-semibold shadow-md transition-all duration-200",
				"bg-teal-600 text-white hover:bg-teal-700",
				"disabled:bg-teal-600/50 disabled:text-white disabled:opacity-100",
				pending && "opacity-80",
			)}
		>
			<ShoppingBag className={cn("mr-2 h-5 w-5 transition-transform", pending && "scale-90")} />
			{getButtonText()}
		</Button>
	);
}

export function AddToCart({
	basePriceAmount,
	currency,
	fallbackPriceLabel,
	disabled = false,
	disabledReason,
	packageSectionTitle = "Choose Your Package",
	packageUnitSingular = "bottle",
	packageUnitPlural = "bottles",
	packageSelectionMode = "package_tiers",
	packageTiers: packageTiersProp,
	showPackageSection = true,
	flowStepStart = 1,
}: AddToCartProps) {
	const effectiveSelectionMode: PdpPackageSelectionMode = showPackageSection
		? packageSelectionMode
		: "simple_quantity";

	const packageTiers = packageTiersProp.length > 0 ? packageTiersProp : DEFAULT_PACKAGE_TIERS_FALLBACK;
	const defaultTierId = packageTiers.length >= 2 ? packageTiers[1]!.id : packageTiers[0]!.id;
	const [selectedTierId, setSelectedTierId] = useState(defaultTierId);
	const selectedTier = packageTiers.find((tier) => tier.id === selectedTierId) ?? packageTiers[0]!;

	const hasPrice = typeof basePriceAmount === "number" && !!currency;
	const computed = useMemo(() => {
		if (!hasPrice || typeof basePriceAmount !== "number" || !currency) {
			return null;
		}
		if (effectiveSelectionMode === "simple_quantity") {
			const totalDiscounted = basePriceAmount;
			return {
				packageBase: totalDiscounted,
				packageDiscounted: totalDiscounted,
				totalDiscounted,
				totalOriginal: totalDiscounted,
				totalBottles: 1,
			};
		}
		const packageBase = basePriceAmount * selectedTier.units;
		const packageDiscounted = packageBase * (1 - selectedTier.discountRate);
		return {
			packageBase,
			packageDiscounted,
			totalDiscounted: packageDiscounted,
			totalOriginal: packageBase,
			totalBottles: selectedTier.units,
		};
	}, [basePriceAmount, currency, selectedTier, hasPrice, effectiveSelectionMode]);

	const ctaTotalLabel =
		computed && currency
			? formatPrice(computed.totalDiscounted, currency)
			: fallbackPriceLabel || "Price unavailable";

	const packageStep = flowStepStart;
	const tierGridClass = packageTierGridClassForCount(packageTiers.length);

	return (
		<Fragment>
			<input type="hidden" name="quantity" value={computed?.totalBottles ?? 1} />

			{showPackageSection && (
				<div className="px-5 py-5 sm:px-6 sm:py-6">
					<PurchaseFlowStep
						step={packageStep}
						title={packageSectionTitle}
						description="Bundle pricing is applied at checkout—pick the pack that fits your routine."
					/>
					{effectiveSelectionMode === "package_tiers" && (
						<div className={cn("mt-5", tierGridClass)}>
							{packageTiers.map((tier) => {
								const isSelected = tier.id === selectedTier.id;
								const tierBase =
									hasPrice && typeof basePriceAmount === "number" ? basePriceAmount * tier.units : null;
								const tierDiscounted = tierBase !== null ? tierBase * (1 - tier.discountRate) : null;
								const savePercent = Math.round(tier.discountRate * 100);
								const unitLabel = tier.units === 1 ? packageUnitSingular : packageUnitPlural;

								return (
									<button
										key={tier.id}
										type="button"
										onClick={() => setSelectedTierId(tier.id)}
										className={cn(
											"relative flex min-h-[104px] flex-col justify-between rounded-xl border-2 p-4 text-left transition-colors sm:min-h-[112px] sm:p-4",
											isSelected
												? "bg-destructive/5 border-destructive"
												: "bg-muted/15 hover:border-destructive/25 hover:bg-muted/30 border-border",
										)}
									>
										{tier.badge ? (
											<span className="absolute -top-2.5 left-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground sm:left-4">
												{tier.badge}
											</span>
										) : null}
										<div className="flex flex-1 flex-col justify-between gap-3">
											<div>
												<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
													Bundle
												</p>
												<p className="mt-1 text-lg font-semibold leading-tight text-foreground">
													{tier.units} {unitLabel}
												</p>
											</div>
											<div className="flex flex-col gap-1.5">
												{tierDiscounted !== null && currency ? (
													<div className="flex flex-wrap items-end gap-x-2 gap-y-0.5">
														<span className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">
															{formatPrice(tierDiscounted, currency)}
														</span>
														{tier.discountRate > 0 && (
															<span className="text-sm text-muted-foreground line-through">
																{formatPrice(tierBase!, currency)}
															</span>
														)}
													</div>
												) : (
													<p className="text-lg font-semibold">{fallbackPriceLabel}</p>
												)}
												{savePercent > 0 ? (
													<span className="bg-primary/12 inline-flex w-fit rounded-md px-2 py-0.5 text-xs font-semibold text-primary">
														Save {savePercent}%
													</span>
												) : (
													<span className="text-xs text-muted-foreground">Standard price</span>
												)}
											</div>
										</div>
									</button>
								);
							})}
						</div>
					)}
				</div>
			)}

			<div className="bg-muted/35 border-t border-border px-5 py-5 sm:px-6 sm:py-6">
				<AddToCartButton disabled={disabled} disabledReason={disabledReason} totalLabel={ctaTotalLabel} />
				<div className="border-border/70 bg-background/90 mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl border px-3 py-3 text-xs text-muted-foreground">
					<span className="flex items-center gap-1.5">
						<ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
						30-Day Money Back
					</span>
					<span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
					<span className="flex items-center gap-1.5">
						<FlaskConical className="h-4 w-4 shrink-0 text-primary" />
						Lab Tested
					</span>
					<span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
					<span className="flex items-center gap-1.5">
						<Award className="h-4 w-4 shrink-0 text-primary" />
						Premium Quality
					</span>
				</div>
			</div>
		</Fragment>
	);
}
