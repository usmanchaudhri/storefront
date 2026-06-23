import { brandConfig } from "@/config/brand";

export type ChatbotConfig = {
	enabled: boolean;
	apiUrl: string;
	defaultModel: string;
	assistantName: string;
};

export function getChatbotConfig(): ChatbotConfig {
	const apiUrl = (process.env.CHATBOT_API_URL ?? process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? "").replace(
		/\/$/,
		"",
	);

	const defaultModel = (
		process.env.CHATBOT_DEFAULT_MODEL ??
		process.env.NEXT_PUBLIC_CHATBOT_DEFAULT_MODEL ??
		""
	).trim();

	return {
		enabled: Boolean(apiUrl),
		apiUrl,
		defaultModel,
		assistantName: `${brandConfig.organizationName} Assistant`,
	};
}
