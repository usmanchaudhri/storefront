import { type ReactNode, Suspense } from "react";
import { Footer } from "@/ui/components/footer";
import { Header } from "@/ui/components/header";
import { CartProvider, CartDrawerWrapper } from "@/ui/components/cart";
import { ChatAssistantShell } from "@/app/[channel]/(main)/chat/chat-assistant-shell";
import { brandConfig } from "@/config/brand";

export const metadata = {
	title: brandConfig.siteName,
	description: brandConfig.description,
};

export default function RootLayout(props: { children: ReactNode; params: Promise<{ channel: string }> }) {
	return (
		<CartProvider>
			<Suspense fallback={<MainLayoutSkeleton />}>
				<MainLayout params={props.params}>{props.children}</MainLayout>
			</Suspense>
		</CartProvider>
	);
}

async function MainLayout({
	params,
	children,
}: {
	params: Promise<{ channel: string }>;
	children: ReactNode;
}) {
	const { channel } = await params;

	return (
		<>
			<Header channel={channel} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">
					<Suspense fallback={null}>{children}</Suspense>
				</main>
				<Suspense fallback={<footer className="h-16 bg-foreground" aria-hidden="true" />}>
					<Footer channel={channel} />
				</Suspense>
			</div>
			<Suspense fallback={null}>
				<CartDrawerWrapper channel={channel} />
			</Suspense>
			<ChatAssistantShell channel={channel} />
		</>
	);
}

function MainLayoutSkeleton() {
	return (
		<>
			<header className="sticky top-0 z-40 h-16 border-b border-border bg-white" aria-hidden="true" />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1" />
				<footer className="h-16 bg-foreground" aria-hidden="true" />
			</div>
		</>
	);
}
