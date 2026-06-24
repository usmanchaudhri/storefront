import { brandConfig } from "@/config/brand";

export type AiAssistantConfig = {
	enabled: boolean;
	chatEnabled: boolean;
	apiUrl: string;
	defaultModel: string;
	assistantName: string;
	placeholder: string;
	suggestedQueries: string[];
	searchDebounceMs: number;
};

const DEFAULT_SUGGESTED_QUERIES = [
	"Vitamin C serum",
	"Moisturizer for dry skin",
	"Best sellers",
	"Gift under $50",
];

export function getChatbotConfig(): AiAssistantConfig {
	const apiUrl = (process.env.CHATBOT_API_URL ?? process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? "").replace(
		/\/$/,
		"",
	);

	const defaultModel = (
		process.env.CHATBOT_DEFAULT_MODEL ??
		process.env.NEXT_PUBLIC_CHATBOT_DEFAULT_MODEL ??
		""
	).trim();

	const searchExplicitlyDisabled = process.env.NEXT_PUBLIC_AI_SEARCH_ENABLED === "false";

	return {
		enabled: !searchExplicitlyDisabled,
		chatEnabled: Boolean(apiUrl),
		apiUrl,
		defaultModel,
		assistantName: `${brandConfig.organizationName} Assistant`,
		placeholder: "Search products or ask a question…",
		suggestedQueries: DEFAULT_SUGGESTED_QUERIES,
		searchDebounceMs: 300,
	};
}
