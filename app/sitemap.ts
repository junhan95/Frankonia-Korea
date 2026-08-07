import type { MetadataRoute } from "next";
import { companySections, sectionPath } from "./company-sections";
import { languages, localeUrl } from "./site-config";

export const dynamic = "force-static";

/** Every locale of a page carries the full alternate set. */
const alternates = (path: string) => ({
  languages: Object.fromEntries(
    languages.map(([code]) => [code, localeUrl(code, path)]),
  ),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-07");

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
  ];
}
