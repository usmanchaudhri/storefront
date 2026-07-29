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
	// Prefer an explicit public flag for client builds; otherwise enable chat whenever
	// the server-side assist proxy has a configured kpure-ai base URL.
	const chatExplicitlyEnabled = process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === "true";
	const chatExplicitlyDisabled = process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === "false";
	const chatEnabled = chatExplicitlyDisabled ? false : chatExplicitlyEnabled || Boolean(apiUrl);

	return {
		enabled: !searchExplicitlyDisabled,
		chatEnabled,
		apiUrl,
		defaultModel,
		assistantName: `${brandConfig.organizationName} Assistant`,
		placeholder: "Search products or ask a question…",
		suggestedQueries: DEFAULT_SUGGESTED_QUERIES,
		searchDebounceMs: 300,
	};
}
