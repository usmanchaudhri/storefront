"use client";

import { AiAssistant } from "@/ui/components/ai-assistant/ai-assistant";

import { getChatbotConfig } from "./config";

type ChatAssistantShellProps = {
	channel: string;
};

export function ChatAssistantShell({ channel }: ChatAssistantShellProps) {
	const config = getChatbotConfig();

	if (!config.enabled) {
		return null;
	}

	return <AiAssistant config={config} channel={channel} />;
}
