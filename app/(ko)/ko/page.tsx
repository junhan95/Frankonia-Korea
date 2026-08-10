import Landing from "../../landing";
import { pageMetadata, siteViewport } from "../../site-metadata";

export const viewport = siteViewport;
export const metadata = pageMetadata("ko");

export default function Page() {
  return <Landing lang="ko" />;
}
