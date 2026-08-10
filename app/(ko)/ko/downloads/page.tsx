import ChamberPage from "../../../chamber-content";
import { downloadsMeta, downloadsPath } from "../../../chamber-sections";
import { routeMetadata, siteViewport } from "../../../site-metadata";

export const viewport = siteViewport;

export function generateMetadata() {
  const { label, description } = downloadsMeta.ko;
  return routeMetadata("ko", downloadsPath, label, description);
}

export default function Page() {
  return <ChamberPage lang="ko" view={{ kind: "downloads" }} />;
}
