"use client";

import { AiAssistant } from "@/ui/components/ai-assistant/ai-assistant";

import type { AiAssistantConfig } from "./config";

type ChatAssistantShellProps = {
	channel: string;
	config: AiAssistantConfig;
};

export function ChatAssistantShell({ channel, config }: ChatAssistantShellProps) {
	if (!config.enabled) {
		return null;
	}

	return <AiAssistant config={config} channel={channel} />;
}
