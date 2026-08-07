import type { MetadataRoute } from "next";
import {
  chamberIndustries,
  chamberTopics,
  chamberTypes,
  chambersPath,
  downloadsPath,
  industryPath,
  topicPath,
  typePath,
} from "./chamber-sections";
import { companySections, sectionPath } from "./company-sections";
import { industries } from "./industries";
import {
  testCategories,
  testCategoryPath,
  testIndustryPath,
  testProductPath,
  testProducts,
  testStandardsPath,
  testSystemsPath,
} from "./test-system-sections";
import { languages, localeUrl } from "./site-config";

export const dynamic = "force-static";

/** Every locale of a page carries the full alternate set. */
const alternates = (path: string) => ({
  languages: Object.fromEntries(
    languages.map(([code]) => [code, localeUrl(code, path)]),
  ),
});

/** Same entry for every locale of one path. */
const perLocale = (
  path: string,
  lastModified: Date,
  priority: number,
  changeFrequency: "monthly" | "yearly",
) =>
  languages.map(([code]) => ({
    url: localeUrl(code, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: alternates(path),
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-08");

  return [
    ...languages.map(([code, , , path]) => ({
      url: localeUrl(code),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.9,
      alternates: alternates(""),
    })),
    ...languages.map(([code]) => ({
      url: localeUrl(code, "/cybershield"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternates("/cybershield"),
    })),
    ...companySections.flatMap((section) =>
      languages.map(([code]) => ({
        url: localeUrl(code, sectionPath(section)),
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.5,
        alternates: alternates(sectionPath(section)),
      })),
    ),
    // The chamber branch. The overview outranks its two index axes, which in
    // turn outrank the technology pages — the order a crawler should read them
    // in, and the order the dropdown presents them.
    ...perLocale(chambersPath, lastModified, 0.9, "monthly"),
    ...chamberIndustries.flatMap((i) => perLocale(industryPath(i), lastModified, 0.7, "monthly")),
    ...chamberTypes.flatMap((t) => perLocale(typePath(t), lastModified, 0.7, "monthly")),
    ...chamberTopics.flatMap((t) => perLocale(topicPath(t), lastModified, 0.6, "yearly")),
    // The test-system branch, ranked the same way: overview, then its three
    // index axes, then the standards index.
    ...perLocale(testSystemsPath, lastModified, 0.9, "monthly"),
    ...industries.flatMap((i) => perLocale(testIndustryPath(i), lastModified, 0.7, "monthly")),
    ...testCategories.flatMap((c) => perLocale(testCategoryPath(c), lastModified, 0.7, "monthly")),
    ...testProducts.flatMap((p) => perLocale(testProductPath(p), lastModified, 0.7, "monthly")),
    ...perLocale(testStandardsPath, lastModified, 0.6, "yearly"),
    ...perLocale(downloadsPath, lastModified, 0.5, "yearly"),
  ];
}
