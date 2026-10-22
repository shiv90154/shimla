import { Suspense } from "react";
import CustomBuilder from "@/components/CustomBuilder";

export const metadata = {
  title: "Build Your Own Custom Tour Package",
  description:
    "Create your own trip: choose destinations, your car (Alto to Tempo Traveller) and your hotel category (2 star to 7 star). Get a quick budget and send it on WhatsApp.",
  alternates: { canonical: "/custom" },
};

export default function CustomPage() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <h1>Build Your Own Package</h1>
          <p>Your destinations. Your car. Your hotel. Design the perfect trip in five easy steps.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <Suspense>
            <CustomBuilder />
          </Suspense>
        </div>
      </section>
    </>
  );
}
