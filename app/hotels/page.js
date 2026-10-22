import { Suspense } from "react";
import HotelList from "@/components/HotelList";

export const metadata = {
  title: "Hotels 2 Star to 7 Star — Shimla, Manali, Dharamshala, Leh",
  description: "Choose your stay: budget 2 star, comfort 3 star, premium 4 star, luxury 5 star and ultra-luxury 7 star hotels and villas across Himachal and Ladakh.",
  alternates: { canonical: "/hotels" },
};

export default function HotelsPage() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <h1>Hotels — 2★ to 7★</h1>
          <p>Budget stays to ultra-luxury villas. Add any of them to your trip with our Custom Package builder.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <Suspense><HotelList /></Suspense>
        </div>
      </section>
    </>
  );
}
