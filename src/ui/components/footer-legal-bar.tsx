import Image from "next/image";
import Link from "next/link";
import { footerLegalCopy, footerPaymentMethods, getFooterCopyrightText } from "@/config/footer-legal";

/**
 * Static year baked at build time (NEXT_PUBLIC_COPYRIGHT_YEAR).
 * Avoids new Date()/connection() which break Next.js 16 Cache Components prerender.
 */
const copyrightYear = Number(process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ?? "2026");

/**
 * Figma 2435:1192 — footer legal strip: privacy / disclaimer / copyright + payment badges.
 */
export function FooterLegalBar() {
	return (
		<div className="mt-12 flex flex-col gap-8 border-t border-[#F7F1DF] pt-5 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
			<div className="flex min-w-0 flex-1 flex-col gap-3.5 text-sm leading-normal text-white">
				<div className="flex flex-col gap-0">
					<Link
						href={footerLegalCopy.privacyChoicesHref}
						prefetch={false}
						className="underline decoration-solid underline-offset-2 transition-opacity hover:opacity-80"
					>
						{footerLegalCopy.privacyChoicesLabel}
					</Link>
					<p>{footerLegalCopy.disclaimer}</p>
					<Link
						href={footerLegalCopy.refundHref}
						prefetch={false}
						className="transition-opacity hover:opacity-80"
					>
						{footerLegalCopy.refundNote}
					</Link>
				</div>
				<p>{getFooterCopyrightText(copyrightYear)}</p>
			</div>

			<ul
				className="grid w-[274px] shrink-0 grid-cols-6 gap-x-2 gap-y-2 self-start lg:self-center"
				aria-label="Accepted payment methods"
			>
				{footerPaymentMethods.map((method) => (
					<li key={method.id} className="size-auto overflow-hidden">
						<Image
							src={method.src}
							alt={method.label}
							width={38}
							height={24}
							className="h-6 w-[38px]"
							unoptimized
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
