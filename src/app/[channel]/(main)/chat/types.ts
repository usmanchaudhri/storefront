export type ChatRole = "user" | "assistant";

export type ChatMessage = {
	role: ChatRole;
	content: string;
};

export type ChatModelsResponse = {
	models?: string[];
	defaultModel?: string;
	error?: string;
};

export type ChatReplyResponse = {
	model?: string;
	reply?: string;
	error?: string;
};
