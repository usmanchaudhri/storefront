"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";

export function FooterNewsletter() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email.trim()) {
			return;
		}
		setSubmitted(true);
	};

	return (
		<div className="mb-12 border-b border-white/20 pb-12 lg:mb-14 lg:pb-14">
			<div className="mx-auto max-w-2xl text-center">
				<h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
					Stay Updated with Kaya Pure
				</h3>
				<p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
					Get exclusive offers, health tips, and be the first to know about new products
				</p>

				{submitted ? (
					<p className="mt-6 text-base font-medium text-white" role="status">
						Thanks for subscribing! We&apos;ll be in touch soon.
					</p>
				) : (
					<form
						className="mt-6 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row"
						onSubmit={handleSubmit}
					>
						<label htmlFor="footer-newsletter-email" className="sr-only">
							Email address
						</label>
						<Input
							id="footer-newsletter-email"
							type="email"
							name="email"
							autoComplete="email"
							required
							placeholder="Enter your email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="h-11 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white"
						/>
						<Button type="submit" className="h-11 shrink-0 bg-white px-6 text-[#006D5B] hover:bg-white/95">
							Subscribe
						</Button>
					</form>
				)}
			</div>
		</div>
	);
}
