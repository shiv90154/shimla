import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book Now — Taxi or Tour Package",
  description: "Book your taxi or tour package with Go Trip. No advance payment to enquire — we confirm within 30 minutes.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <section className="phero">
        <div className="wrap"><h1>Book Your Trip</h1><p>Fill in the details — our team will call to confirm the final price and driver.</p></div>
      </section>
      <section className="section">
        <div className="wrap">
          <Suspense>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
