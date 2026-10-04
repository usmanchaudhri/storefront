"use client";

import { useCallback, useState } from "react";

import type { AssistantCollection } from "@/app/[channel]/(main)/chat/collections";
import type { AiAssistantConfig } from "@/app/[channel]/(main)/chat/config";

import { AiAssistantOverlay } from "./ai-assistant-overlay";
import { AiAssistantTrigger } from "./ai-assistant-trigger";
import { useAiAssist } from "./use-ai-assist";
import { useOpenAssistantShortcut } from "./use-open-assistant-shortcut";

type AiAssistantProps = {
	config: AiAssistantConfig;
	channel: string;
	collections: AssistantCollection[];
};

export function AiAssistant({ config, channel, collections }: AiAssistantProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const assistState = useAiAssist({
		channel,
		enabled: open && config.chatEnabled,
	});

	const openAssistant = useCallback(() => {
		setOpen(true);
	}, []);

	const { assist, browseCollection, reset: resetAssist, loading } = assistState;

	useOpenAssistantShortcut({ enabled: config.enabled, onTrigger: openAssistant });

	const runSubmit = useCallback(
		(value: string) => {
			const trimmed = value.trim();
			if (!trimmed || loading) {
				return;
			}

			setQuery("");
			void assist(trimmed);
		},
		[assist, loading],
	);

	const handleSubmit = useCallback(() => {
		runSubmit(query);
	}, [query, runSubmit]);

	const handleStarterSelect = useCallback(
		(value: string) => {
			runSubmit(value);
		},
		[runSubmit],
	);

	const handleSuggestionSelect = useCallback(
		(value: string) => {
			runSubmit(value);
		},
		[runSubmit],
	);

	const handleCollectionSelect = useCallback(
		(collection: AssistantCollection) => {
			if (loading) {
				return;
			}

			setQuery("");
			void browseCollection({ name: collection.name, slug: collection.slug });
		},
		[browseCollection, loading],
	);

	const handleOpenChange = useCallback(
		(nextOpen: boolean) => {
			if (!nextOpen) {
				resetAssist();
				setQuery("");
			}
			setOpen(nextOpen);
		},
		[resetAssist],
	);

	if (!config.enabled) {
		return null;
	}

	return (
		<>
			{!open ? <AiAssistantTrigger onOpen={openAssistant} label={config.assistantName} /> : null}
			<AiAssistantOverlay
				open={open}
				onOpenChange={handleOpenChange}
				config={config}
				channel={channel}
				collections={collections}
				query={query}
				onQueryChange={setQuery}
				onSubmit={handleSubmit}
				onStarterSelect={handleStarterSelect}
				onSuggestionSelect={handleSuggestionSelect}
				onCollectionSelect={handleCollectionSelect}
				assistState={assistState}
			/>
		</>
	);
}
