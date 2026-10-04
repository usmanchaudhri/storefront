"use client";

import { AiAssistant } from "@/ui/components/ai-assistant/ai-assistant";

import type { AssistantCollection } from "./collections";
import type { AiAssistantConfig } from "./config";

type ChatAssistantShellProps = {
	channel: string;
	config: AiAssistantConfig;
	collections: AssistantCollection[];
};

export function ChatAssistantShell({ channel, config, collections }: ChatAssistantShellProps) {
	if (!config.enabled) {
		return null;
	}

	return <AiAssistant config={config} channel={channel} collections={collections} />;
}
