import WhatsAppIcon from "@/components/WhatsAppIcon";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE, waLink } from "@/lib/data";

export const metadata = {
  title: "Contact Us",
  description: "Call or WhatsApp Go Trip for taxi bookings and tour packages. Phone: +91 78074 66559, +91 80917 19146.",
  alternates: { canonical: "/contact" },
};

const row = { display: "flex", gap: 12, alignItems: "center", margin: "12px 0" };

export default function Contact() {
  return (
    <>
      <section className="phero">
        <div className="wrap"><h1>Contact Us</h1><p>We&apos;re available 24×7 — call, WhatsApp, or send an enquiry.</p></div>
      </section>
      <section className="section">
        <div className="wrap detail" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div className="box" style={{ marginTop: 0 }}>
              <h3>Get in touch</h3>
              {SITE.phones.map((p) => (
                <p key={p.raw} style={row}><Phone size={18} color="var(--pine-2)" /><a href={`tel:+${p.raw}`}><b>{p.display}</b></a></p>
              ))}
              <p style={row}><Mail size={18} color="var(--pine-2)" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <p style={row}><MapPin size={18} color="var(--pine-2)" />{SITE.address}</p>
              <p style={row}><Clock size={18} color="var(--pine-2)" />{SITE.hours}, all days</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                {SITE.phones.map((p) => (
                  <a key={p.raw} href={waLink("Hi Go Trip!", p.raw)} target="_blank" rel="noreferrer" className="btn btn-wa"><WhatsAppIcon size={18} /> WhatsApp {p.display.slice(-5)}</a>
                ))}
              </div>
            </div>
            <div className="box" style={{ padding: 0, overflow: "hidden" }}>
              <iframe title="Map" loading="lazy" style={{ border: 0, width: "100%", height: 260 }} src="https://www.google.com/maps?q=Shimla+Himachal+Pradesh&output=embed" />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <style>{`@media(max-width:900px){.detail{grid-template-columns:1fr !important}}`}</style>
    </>
  );
}
