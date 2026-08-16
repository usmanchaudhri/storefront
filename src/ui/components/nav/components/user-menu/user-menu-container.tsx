import { cookies } from "next/headers";
import { UserIcon } from "lucide-react";
import { UserMenu } from "./user-menu";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeAuthenticatedGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export async function UserMenuContainer({ channel }: { channel: string }) {
	// During static generation, cookies() throws - skip user fetch entirely
	let hasCookies = false;
	try {
		const cookieStore = await cookies();
		hasCookies = cookieStore.getAll().length > 0;
	} catch {
		// Static generation - no cookies available
	}

	// Only fetch user if we have cookies (runtime request with potential session)
	let user = null;
	if (hasCookies) {
		const result = await executeAuthenticatedGraphQL(CurrentUserDocument, {
			cache: "no-cache",
		});
		// Auth failed or expired = treat as not logged in
		user = result.ok ? result.data.me : null;
	}

	if (user) {
		return <UserMenu user={user} channel={channel} />;
	} else {
		return (
			<LinkWithChannel
				href="/login"
				channel={channel}
				className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#09594D] transition-colors duration-200 hover:bg-[#D9F6F1] hover:text-[#00A38C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
			>
				<UserIcon className="h-5 w-5" aria-hidden="true" />
				<span className="sr-only">Log in</span>
			</LinkWithChannel>
		);
	}
}
