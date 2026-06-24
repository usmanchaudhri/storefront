"use client";

import { useCallback, useEffect, useState } from "react";

import type { AiAssistantConfig } from "@/app/[channel]/(main)/chat/config";

import { AiAssistantOverlay } from "./ai-assistant-overlay";
import { AiAssistantTrigger } from "./ai-assistant-trigger";
import { useAiAssist } from "./use-ai-assist";
import { useAiSearch } from "./use-ai-search";
import { useOpenAssistantShortcut } from "./use-open-assistant-shortcut";

type AiAssistantProps = {
	config: AiAssistantConfig;
	channel: string;
};

export function AiAssistant({ config, channel }: AiAssistantProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const searchState = useAiSearch({
		channel,
		debounceMs: config.searchDebounceMs,
		enabled: open,
	});
	const assistState = useAiAssist({
		channel,
		enabled: open && config.chatEnabled,
	});

	const openAssistant = useCallback(() => {
		setOpen(true);
	}, []);

	const { searchDebounced, search, reset: resetSearch } = searchState;
	const { assist, reset: resetAssist } = assistState;

	useOpenAssistantShortcut({ enabled: config.enabled, onTrigger: openAssistant });

	useEffect(() => {
		if (!open) {
			return;
		}

		return searchDebounced(query);
	}, [open, query, searchDebounced]);

	const runSubmit = useCallback(
		(value: string) => {
			const trimmed = value.trim();
			if (!trimmed) {
				return;
			}

			void search(trimmed);
			if (config.chatEnabled) {
				void assist(trimmed);
			}
		},
		[assist, config.chatEnabled, search],
	);

	const handleSubmit = useCallback(() => {
		runSubmit(query);
	}, [query, runSubmit]);

	const handleStarterSelect = useCallback(
		(value: string) => {
			setQuery(value);
			runSubmit(value);
		},
		[runSubmit],
	);

	const handleSuggestionSelect = useCallback(
		(value: string) => {
			setQuery(value);
			runSubmit(value);
		},
		[runSubmit],
	);

	const handleOpenChange = useCallback(
		(nextOpen: boolean) => {
			if (!nextOpen) {
				resetSearch();
				resetAssist();
				setQuery("");
			}
			setOpen(nextOpen);
		},
		[resetAssist, resetSearch],
	);

	if (!config.enabled) {
		return null;
	}

	return (
		<>
			{!open ? <AiAssistantTrigger onOpen={openAssistant} /> : null}
			<AiAssistantOverlay
				open={open}
				onOpenChange={handleOpenChange}
				config={config}
				channel={channel}
				query={query}
				onQueryChange={setQuery}
				onSubmit={handleSubmit}
				onStarterSelect={handleStarterSelect}
				onSuggestionSelect={handleSuggestionSelect}
				searchState={searchState}
				assistState={assistState}
			/>
		</>
	);
}
