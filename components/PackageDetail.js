"use client";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Link from "next/link";
import { CalendarDays, Car, Phone, Star } from "lucide-react";
import Photo from "./Photo";
import { SEED_PACKAGES, SITE, inr, waLink } from "@/lib/data";
import { KEYS, useLocal } from "@/lib/store";

export default function PackageDetail({ slug }) {
  const [packages, , ready] = useLocal(KEYS.packages, SEED_PACKAGES);
  const p = packages.find((x) => x.slug === slug);

  if (!p) {
    return (
      <section className="section"><div className="wrap">
        <h2>{ready ? "Package not found" : "Loading…"}</h2>
        {ready && <p style={{ margin: "12px 0" }}><Link href="/packages" className="btn btn-pine">Browse all packages</Link></p>}
      </div></section>
    );
  }

  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="crumb"><Link href="/packages">Packages</Link> / {p.category}</div>
          <h1>{p.title}</h1>
          <p>{p.route}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap detail">
          <div>
            <div className="banner"><Photo src={p.img} alt={p.title} /></div>
            <div className="box">
              <div className="meta" style={{ fontSize: ".95rem", marginBottom: 12 }}>
                <span><CalendarDays size={16} style={{ verticalAlign: "-3px" }} /> {p.days} Days / {p.nights} Nights</span>
                <span><Star size={16} style={{ verticalAlign: "-3px" }} /> {p.rating} rating</span>
                <span><Car size={16} style={{ verticalAlign: "-3px" }} /> Car + Driver included</span>
              </div>
              <div className="tags" style={{ marginBottom: 12 }}>{(p.themes || []).map((t) => <span key={t}>{t}</span>)}</div>
              <p>{p.summary}</p>
            </div>
            <div className="box">
              <h3>Trip Highlights</h3>
              <ul className="ticks">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
            <div className="box">
              <h3>Day-wise Itinerary</h3>
              <ul className="timeline">
                {p.itinerary.map((d) => {
                  const [day, ...rest] = d.split(": ");
                  return <li key={d}><b>{day}</b><br /><span className="muted">{rest.join(": ")}</span></li>;
                })}
              </ul>
            </div>
            <div className="grid g2">
              <div className="box"><h3>Inclusions</h3><ul className="ticks">{p.inclusions.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div className="box"><h3>Exclusions</h3><ul className="ticks x">{p.exclusions.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
          </div>

          <aside className="sticky">
            <div className="box" style={{ marginTop: 0 }}>
              <span className="muted small">Package starts from</span>
              <div className="price"><b style={{ fontSize: "2.1rem" }}>{inr(p.price)}</b></div>
              <p className="small muted" style={{ marginBottom: 14 }}>Final quote depends on your car and hotel choice. Want something different? <Link href="/custom" style={{ color: "var(--pine-2)", fontWeight: 600 }}>Customise this trip →</Link></p>
              <Link href={`/book?package=${p.slug}`} className="btn btn-amber btn-block">Book This Package</Link>
              <a href={waLink(`Hi Go Trip, I'm interested in "${p.title}". Please share details.`)} target="_blank" rel="noreferrer" className="btn btn-wa btn-block" style={{ marginTop: 10 }}><WhatsAppIcon size={18} /> Ask on WhatsApp</a>
              {SITE.phones.map((ph) => (
                <a key={ph.raw} href={`tel:+${ph.raw}`} className="btn btn-outline btn-block" style={{ marginTop: 10 }}><Phone size={16} /> Call {ph.display}</a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
