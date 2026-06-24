"use client";

import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/components/ui/button";

type AiAssistantTriggerProps = {
	onOpen: () => void;
	className?: string;
};

export function AiAssistantTrigger({ onOpen, className }: AiAssistantTriggerProps) {
	return (
		<div className={cn("fixed bottom-4 right-4 z-40", className)}>
			<Button
				type="button"
				size="lg"
				className="h-14 rounded-full px-5 shadow-lg"
				onClick={onOpen}
				aria-haspopup="dialog"
				aria-label="Open Ask Kpure assistant"
			>
				<MessageCircle className="h-5 w-5" aria-hidden="true" />
				<span>Ask Kpure</span>
			</Button>
		</div>
	);
}
