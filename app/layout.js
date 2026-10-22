import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
import { FAQS, SITE } from "@/lib/data";

const body = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const head = Playfair_Display({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-head", display: "swap" });

const description =
  "Go Trip — Bas Nikal Pado! Book Shimla, Manali, Leh Ladakh, Kedarnath & Spiti tour packages and taxis. Temple yatra, family, friends, women special & trekking trips. Cars from Alto to Tempo Traveller, hotels 2 star to 7 star, and fully custom packages.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Taxi & Tour Packages | Shimla, Manali, Leh Ladakh`, template: `%s | ${SITE.name}` },
  description,
  applicationName: SITE.name,
  keywords: [
    "Go Trip", "Bas Nikal Pado", "Shimla taxi", "Manali taxi", "Delhi to Shimla taxi", "Delhi to Manali cab", "Leh Ladakh tour package",
    "Kedarnath Badrinath yatra", "Char Dham yatra package", "Himachal tour packages", "family tour package", "women special trip", "trekking packages Himachal",
    "custom tour package", "Tempo Traveller on rent", "Innova Crysta on rent", "Shimla Manali honeymoon package",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: SITE.name, locale: "en_IN", url: "/",
    title: `${SITE.name} — Bas Nikal Pado!`, description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Go Trip — Bas Nikal Pado" }],
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} — Bas Nikal Pado!`, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0c3416" };

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    slogan: SITE.tagline,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/og.jpg`,
    description,
    telephone: SITE.phones.map((p) => "+" + p.raw),
    email: SITE.email,
    address: { "@type": "PostalAddress", addressLocality: "Shimla", addressRegion: "Himachal Pradesh", addressCountry: "IN" },
    areaServed: ["Shimla", "Manali", "Leh Ladakh", "Spiti Valley", "Dharamshala", "Rishikesh", "Haridwar", "Delhi", "Chandigarh"],
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₹₹",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${body.variable} ${head.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
