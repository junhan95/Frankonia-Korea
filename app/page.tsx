import Landing from "./landing";
import { pageMetadata } from "./site-metadata";

export const metadata = pageMetadata("ko");

export default function Page() {
  return <Landing lang="ko" />;
}
