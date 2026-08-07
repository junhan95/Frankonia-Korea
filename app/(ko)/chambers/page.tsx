import ChamberPage from "../../chamber-content";
import { chambersOverviewMeta, chambersPath } from "../../chamber-sections";
import { routeMetadata, siteViewport } from "../../site-metadata";

export const viewport = siteViewport;

export function generateMetadata() {
  const { title, description } = chambersOverviewMeta.ko;
  return routeMetadata("ko", chambersPath, title, description);
}

export default function Page() {
  return <ChamberPage lang="ko" view={{ kind: "overview" }} />;
}
