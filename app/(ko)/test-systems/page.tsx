import TestSystemPage from "../../test-system-content";
import { testSystemsOverviewMeta, testSystemsPath } from "../../test-system-sections";
import { routeMetadata, siteViewport } from "../../site-metadata";

export const viewport = siteViewport;

export function generateMetadata() {
  const { title, description } = testSystemsOverviewMeta.ko;
  return routeMetadata("ko", testSystemsPath, title, description);
}

export default function Page() {
  return <TestSystemPage lang="ko" view={{ kind: "overview" }} />;
}
