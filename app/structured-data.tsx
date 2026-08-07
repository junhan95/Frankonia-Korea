import { sectionMeta, sectionPath, type CompanySection } from "./company-sections";
import { asset, localeUrl, route, siteOrigin, type Lang } from "./site-config";

/**
 * Answer engines and search have to infer entities from prose unless they are
 * stated outright. Everything below is already visible on the page — the
 * partner role, the founding year, the standards listed on the cards — so
 * this only restates it in a machine-readable form. Nothing is asserted here
 * that a reader cannot also see, which is both the schema.org rule and the
 * reason the Korean entity carries no address or registration number yet.
 */

const homeUrl = `${siteOrigin}${route("/")}`;
const orgId = `${homeUrl}#organization`;
const groupId = `${homeUrl}#group`;
const siteId = `${homeUrl}#website`;
const contactEmail = "info@frankonia-korea.com";

const localeTag: Record<Lang, string> = { ko: "ko", en: "en" };

const group = {
  "@type": "Organization",
  "@id": groupId,
  name: "Frankonia Group",
  url: "https://frankonia-solutions.com/",
  foundingDate: "1987",
  description:
    "German manufacturer of EMC anechoic chambers and test systems, supplying more than 80 countries since 1987.",
};

const organisation = {
  "@type": "Organization",
  "@id": orgId,
  name: "Frankonia Korea",
  url: homeUrl,
  image: `${siteOrigin}${asset("/og.png")}`,
  parentOrganization: { "@id": groupId },
  areaServed: { "@type": "Country", name: "South Korea" },
  knowsLanguage: ["ko", "en"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: contactEmail,
    availableLanguage: ["ko", "en"],
  },
};

/** Product families, described by the standards the cards already name. */
const products = (items: readonly ProductInput[]) =>
  items.map(({ id, name, description, standards }) => ({
    "@type": "Product",
    "@id": `${homeUrl}#${id}`,
    name,
    description,
    brand: { "@id": groupId },
    manufacturer: { "@id": groupId },
    additionalProperty: standards.map((value) => ({
      "@type": "PropertyValue",
      name: "Standard",
      value,
    })),
  }));

export type ProductInput = {
  id: string;
  name: string;
  description: string;
  standards: readonly string[];
};

type Props = {
  lang: Lang;
  description: string;
} & (
  | { page: "landing"; productLines: readonly ProductInput[] }
  | { page: "company"; section: CompanySection }
);

export default function StructuredData(props: Props) {
  const { lang, description } = props;
  const path = props.page === "landing" ? "" : sectionPath(props.section);
  const pageUrl = localeUrl(lang, path);

  const graph: Record<string, unknown>[] = [
    group,
    organisation,
    {
      "@type": "WebSite",
      "@id": siteId,
      url: homeUrl,
      name: "Frankonia Korea",
      publisher: { "@id": orgId },
      inLanguage: Object.values(localeTag),
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      isPartOf: { "@id": siteId },
      inLanguage: localeTag[lang],
      about: { "@id": orgId },
      description,
      primaryImageOfPage: `${siteOrigin}${asset("/og.png")}`,
    },
  ];

  if (props.page === "landing") {
    graph.push(...products(props.productLines));
  }

  if (props.page === "company") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Frankonia Korea", item: localeUrl(lang) },
        { "@type": "ListItem", position: 2, name: sectionMeta[lang][props.section].label, item: pageUrl },
      ],
    });
  }

  return (
    <script
      type="application/ld+json"
      // The payload is built from literals in this repository, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
