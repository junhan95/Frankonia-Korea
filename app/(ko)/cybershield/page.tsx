import CyberShieldPage from "../../cybershield-content";
import { pageMetadata, siteViewport } from "../../site-metadata";

export const viewport = siteViewport;
export const metadata = pageMetadata("ko", "cybershield");

export default function Page() {
  return <CyberShieldPage lang="ko" />;
}
