const TRUST_ITEMS = [
	{
		id: "shipping",
		label: ["Free Shipping for", "Subscribers"],
		iconSrc: "/pdp/7-in-1-shilajit-gummies-new/trust/shipping.svg",
	},
	{
		id: "guarantee",
		label: ["60-Day Guarantee"],
		iconSrc: "/pdp/7-in-1-shilajit-gummies-new/trust/guarantee.svg",
	},
	{
		id: "sugar",
		label: ["3g Cane Sugar"],
		iconSrc: "/pdp/7-in-1-shilajit-gummies-new/trust/sugar.svg",
	},
	{
		id: "pectin",
		label: ["100% Pectin Base", "(Zero Gelatin)"],
		iconSrc: "/pdp/7-in-1-shilajit-gummies-new/trust/pectin.svg",
	},
] as const;

/** Figma 2991:3105 — Trust Badges & Guarantee Matrix under Add to Bag. */
export function LandingTrustMatrix() {
	return (
		<ul className="grid grid-cols-4 gap-3 border-y border-[rgba(193,200,195,0.4)] py-5 sm:gap-4">
			{TRUST_ITEMS.map((item) => (
				<li key={item.id} className="flex flex-col items-center gap-2.5 text-center">
					<span className="flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
						{/* eslint-disable-next-line @next/next/no-img-element -- local SVG trust icons */}
						<img
							src={item.iconSrc}
							alt=""
							width={48}
							height={48}
							className="h-10 w-10 object-contain sm:h-11 sm:w-11"
						/>
					</span>
					<p className="text-[12px] font-semibold leading-snug text-[#001811] sm:text-[13px] sm:leading-[1.25]">
						{item.label.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</p>
				</li>
			))}
		</ul>
	);
}
