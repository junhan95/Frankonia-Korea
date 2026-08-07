import TestSystemPage from "../../../test-system-content";
import { testStandardsMeta, testStandardsPath } from "../../../test-system-sections";
import { routeMetadata, siteViewport } from "../../../site-metadata";

export const viewport = siteViewport;

export function generateMetadata() {
  const { label, description } = testStandardsMeta.ko;
  return routeMetadata("ko", testStandardsPath, label, description);
}

export default function Page() {
  return <TestSystemPage lang="ko" view={{ kind: "standards" }} />;
}
