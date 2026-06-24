"use client";

import { useEffect } from "react";

type UseKeyboardShortcutOptions = {
	enabled: boolean;
	onTrigger: () => void;
};

function isEditableTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	const tag = target.tagName;

	return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function useOpenAssistantShortcut({ enabled, onTrigger }: UseKeyboardShortcutOptions) {
	useEffect(() => {
		if (!enabled) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") {
				return;
			}

			if (isEditableTarget(event.target)) {
				return;
			}

			event.preventDefault();
			onTrigger();
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [enabled, onTrigger]);
}
