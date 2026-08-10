import { notFound } from "next/navigation";
import { industryLabel } from "../../../../../industries";
import TestSystemPage from "../../../../../test-system-content";
import {
  isTestIndustry,
  testIndustries,
  testIndustryMeta,
  testIndustryPath,
} from "../../../../../test-system-sections";
import { routeMetadata, siteViewport } from "../../../../../site-metadata";

/** The five industries are known at build time; anything else is a 404 rather
 *  than an attempt to render an unknown slug. */
export const dynamicParams = false;
export const viewport = siteViewport;

export function generateStaticParams() {
  return testIndustries.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  if (!isTestIndustry(industry)) notFound();
  const { description } = testIndustryMeta.ko[industry];
  return routeMetadata("ko", testIndustryPath(industry), industryLabel.ko[industry], description);
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  if (!isTestIndustry(industry)) notFound();
  return <TestSystemPage lang="ko" view={{ kind: "industry", slug: industry }} />;
}
