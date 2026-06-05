import { Suspense } from "react";
import { Logo } from "./logo";
import { NavLinks } from "./nav/components/nav-links";
import { CartNavItem } from "./nav/components/cart-nav-item";
import { UserMenuContainer } from "./nav/components/user-menu/user-menu-container";
import { MobileMenu } from "./nav/components/mobile-menu";

function NavLinksSkeleton() {
	return (
		<>
			<li className="inline-flex">
				<span className="h-9 w-12 animate-pulse rounded-lg bg-muted" />
			</li>
			<li className="inline-flex">
				<span className="h-9 w-16 animate-pulse rounded-lg bg-muted" />
			</li>
			<li className="inline-flex">
				<span className="h-9 w-14 animate-pulse rounded-lg bg-muted" />
			</li>
			<li className="inline-flex">
				<span className="h-9 w-16 animate-pulse rounded-lg bg-muted" />
			</li>
		</>
	);
}

export async function Header({ channel }: { channel: string }) {
	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/90 sticky top-0 z-40 border-b border-border backdrop-blur">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center gap-3 sm:gap-4 lg:h-[4.25rem] lg:gap-6">
					<div className="flex shrink-0 items-center">
						<Logo channel={channel} />
					</div>

					<nav className="hidden min-w-0 flex-1 lg:block" aria-label="Main">
						<ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-0.5 gap-y-1 sm:gap-x-1">
							<Suspense fallback={<NavLinksSkeleton />}>
								<NavLinks channel={channel} />
							</Suspense>
						</ul>
					</nav>

					<div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
						<Suspense fallback={<div className="h-10 w-10" />}>
							<UserMenuContainer channel={channel} />
						</Suspense>
						<Suspense fallback={<div className="h-10 w-10" />}>
							<CartNavItem channel={channel} />
						</Suspense>
						<Suspense>
							<MobileMenu channel={channel}>
								<Suspense fallback={<NavLinksSkeleton />}>
									<NavLinks channel={channel} />
								</Suspense>
							</MobileMenu>
						</Suspense>
					</div>
				</div>
			</div>
		</header>
	);
}
