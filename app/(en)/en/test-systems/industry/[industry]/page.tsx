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

export const dynamicParams = false;
export const viewport = siteViewport;

export function generateStaticParams() {
  return testIndustries.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  if (!isTestIndustry(industry)) notFound();
  const { description } = testIndustryMeta.en[industry];
  return routeMetadata("en", testIndustryPath(industry), industryLabel.en[industry], description);
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  if (!isTestIndustry(industry)) notFound();
  return <TestSystemPage lang="en" view={{ kind: "industry", slug: industry }} />;
}
