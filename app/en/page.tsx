import Landing from "../landing";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("en");

export default function Page() {
  return <Landing lang="en" />;
}
