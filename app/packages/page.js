import { Suspense } from "react";
import { AllPackages } from "@/components/PackageLists";

export const metadata = {
  title: "Tour Packages — Temple, Family, Friends, Women Special & Trekking",
  description:
    "Shimla, Manali, Leh Ladakh, Spiti, Kedarnath, Rishikesh and Golden Triangle tour packages — temple yatra, family, friends, women special and trekking trips with taxi and driver.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <h1>Tour Packages</h1>
          <p>Temple yatras, family holidays, friends&apos; trips, women-special journeys and treks. Pick a ready plan — or <a href="/custom" style={{ textDecoration: "underline" }}>build your own</a>.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <Suspense>
            <AllPackages />
          </Suspense>
        </div>
      </section>
    </>
  );
}
