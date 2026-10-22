import PackageDetail from "@/components/PackageDetail";
import { SEED_PACKAGES, SITE } from "@/lib/data";

export function generateStaticParams() {
  return SEED_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = SEED_PACKAGES.find((x) => x.slug === slug);
  if (!p) return { title: "Tour Package" };
  return {
    title: `${p.title} — ${p.days}D/${p.nights}N Package`,
    description: `${p.summary} ${p.days} days / ${p.nights} nights from ₹${p.price.toLocaleString("en-IN")}.`,
    alternates: { canonical: `/packages/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, images: [{ url: p.img }] },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const p = SEED_PACKAGES.find((x) => x.slug === slug);
  const ld = p && {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: p.title,
    description: p.summary,
    image: p.img,
    touristType: p.themes,
    itinerary: { "@type": "ItemList", itemListElement: p.itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d })) },
    offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, url: `${SITE.url}/packages/${p.slug}`, availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.url },
  };
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <PackageDetail slug={slug} />
    </>
  );
}
