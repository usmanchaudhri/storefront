/**
 * Figma 2435:843 — five-star rating row shown under the PDP product title.
 */
export function PdpReviewRating({ label = "Kaya Pure product" }: { label?: string }) {
	return (
		<p className="mt-1 text-[18px] leading-[20.45px]" aria-label={`5 out of 5 stars — ${label}`}>
			<span className="text-[#E69B21]" aria-hidden>
				★★★★★{" "}
			</span>
			<span className="text-[#5F716D]">{label}</span>
		</p>
	);
}
