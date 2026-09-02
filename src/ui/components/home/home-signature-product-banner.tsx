import { homeSignatureProductBanner } from "@/config/home-signature-product";
import { BlendBanner } from "@/ui/components/shared/blend-banner";

export function HomeSignatureProductBanner() {
	const { sectionId, blend } = homeSignatureProductBanner;

	return <BlendBanner story={blend} sectionId={sectionId} headingId="home-signature-blend-heading" />;
}
