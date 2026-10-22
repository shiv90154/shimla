import { SEED_PACKAGES, SITE } from "@/lib/data";

export default function sitemap() {
  const now = new Date();
  const pages = ["", "/packages", "/custom", "/fleet", "/hotels", "/book", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
  const packages = SEED_PACKAGES.map((p) => ({
    url: `${SITE.url}/packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...packages];
}
