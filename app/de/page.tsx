import Landing from "../landing";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("de");

export default function Page() {
  return <Landing lang="de" />;
}
