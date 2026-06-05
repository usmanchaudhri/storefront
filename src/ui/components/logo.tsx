import { LinkWithChannel } from "../atoms/link-with-channel";
import { Logo as SharedLogo } from "./shared/logo";

/**
 * Site logo with link to homepage.
 */
export const Logo = ({ channel }: { channel: string }) => {
	return (
		<LinkWithChannel
			href="/"
			channel={channel}
			prefetch={false}
			className="flex shrink-0 items-center"
			aria-label="Homepage"
		>
			<SharedLogo className="h-7 w-auto" />
		</LinkWithChannel>
	);
};
