import ChamberPage from "../../../chamber-content";
import { downloadsMeta, downloadsPath } from "../../../chamber-sections";
import { routeMetadata, siteViewport } from "../../../site-metadata";

export const viewport = siteViewport;

export function generateMetadata() {
  const { label, description } = downloadsMeta.en;
  return routeMetadata("en", downloadsPath, label, description);
}

export default function Page() {
  return <ChamberPage lang="en" view={{ kind: "downloads" }} />;
}
