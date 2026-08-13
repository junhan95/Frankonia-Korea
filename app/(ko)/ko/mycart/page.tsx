import MyCartPage from "../../../cart-content";
import { cartMeta, cartPath } from "../../../cart-sections";
import { routeMetadata, siteViewport } from "../../../site-metadata";

export const viewport = siteViewport;

export function generateMetadata() {
  const { label, description } = cartMeta.ko;
  return routeMetadata("ko", cartPath, label, description);
}

export default function Page() {
  return <MyCartPage lang="ko" />;
}
