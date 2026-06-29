export type HomeFaqItem = {
	id: string;
	question: string;
	answer: string;
};

/** Homepage FAQ — copied from kayapure.com. */
export const homeFaq = {
	headline: "Frequently Asked Questions",
	intro: "Get answers to common questions about our energy supplement",
	items: [
		{
			id: "coffee-difference",
			question: "How is this different from coffee or other energy drinks?",
			answer:
				"Unlike coffee or energy drinks that rely on high doses of caffeine and sugar, our supplement provides clean, sustained energy through natural caffeine (100mg) combined with L-theanine for smooth focus without jitters or crashes. The adaptogenic herbs help your body manage stress and maintain consistent energy levels throughout the day.",
		},
		{
			id: "when-to-take",
			question: "When should I take it and how quickly will I feel the effects?",
			answer:
				"Take 2 capsules in the morning with food for best results. Most people start feeling increased energy and focus within 30-45 minutes, with peak effects lasting 4-6 hours. The adaptogenic benefits build over time, so you'll notice even better stress resilience and energy stability after 2-3 weeks of consistent use.",
		},
		{
			id: "side-effects",
			question: "Are there any side effects?",
			answer:
				"Our supplement is made with natural ingredients and is generally well-tolerated. Some people may experience mild digestive upset if taken on an empty stomach, which is why we recommend taking it with food. If you're sensitive to caffeine, start with 1 capsule to assess tolerance. Always consult your healthcare provider before starting any new supplement.",
		},
		{
			id: "medications",
			question: "Can I take this with other supplements or medications?",
			answer:
				"While our ingredients are natural, they can interact with certain medications, especially blood thinners or medications for anxiety/depression. We strongly recommend consulting with your healthcare provider before combining with other supplements or medications. Avoid taking with other caffeine sources to prevent overstimulation.",
		},
		{
			id: "long-term",
			question: "Is this safe for long-term use?",
			answer:
				"Yes, our supplement is designed for daily use and contains ingredients that are safe for long-term consumption. The adaptogenic herbs actually become more effective with consistent use. However, we recommend taking one day off per week to prevent tolerance buildup, and always consult your healthcare provider for personalized advice.",
		},
		{
			id: "satisfaction",
			question: "What if I'm not satisfied with the results?",
			answer:
				"We offer a 30-day money-back guarantee. If you're not completely satisfied with your energy levels and focus improvement, simply contact our customer service team for a full refund. We're confident in our formula and want you to experience the benefits risk-free.",
		},
		{
			id: "shipping",
			question: "How long does shipping take?",
			answer:
				"We offer free shipping on orders over $50. Orders are processed within 24 hours and typically arrive within 2-3 business days via expedited shipping. You'll receive tracking information once your order ships so you can monitor its progress.",
		},
		{
			id: "ingredients-quality",
			question: "Are the ingredients organic and tested for quality?",
			answer:
				"All our ingredients are sourced from reputable suppliers and undergo third-party testing for purity and potency. While not all ingredients are certified organic, they are all natural and free from pesticides, heavy metals, and contaminants. We manufacture in an FDA-approved facility following strict GMP guidelines.",
		},
	] as const satisfies readonly HomeFaqItem[],
	support: {
		headline: "Still have questions?",
		body: "Our customer support team is here to help you make the best choice for your energy needs.",
		email: "info@kayapure.com",
		phone: "3108098581",
	},
} as const;
