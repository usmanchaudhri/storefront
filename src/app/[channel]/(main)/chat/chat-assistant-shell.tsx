import { ChatAssistant } from "@/ui/components/chat/chat-assistant";

import { getChatbotConfig } from "./config";

export function ChatAssistantShell() {
	const config = getChatbotConfig();

	if (!config.enabled) {
		return null;
	}

	return <ChatAssistant config={config} />;
}
