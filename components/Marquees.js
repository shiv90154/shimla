"use client";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { MARQUEE_SERVICES, MARQUEE_TAGS, TESTIMONIALS } from "@/lib/data";

// items: strings or { label, href }. Every tag is a real link.
export function TagMarquee({ items = MARQUEE_SERVICES, light = false, reverse = false, speed = 40 }) {
  return (
    <div className={`marq ${light ? "light" : ""}`}>
      <Marquee speed={speed} direction={reverse ? "right" : "left"} pauseOnHover gradient={false}>
        {items.map((t, i) => {
          const it = typeof t === "string" ? { label: t, href: "/packages" } : t;
          return <Link key={it.label + i} href={it.href} className="tag">{it.label}</Link>;
        })}
      </Marquee>
    </div>
  );
}

export function PlaceMarquee() {
  return (
    <div style={{ overflow: "hidden", padding: "30px 0 0" }}>
      <Marquee speed={55} gradient={false} pauseOnHover>
        {MARQUEE_TAGS.map((t) => (
          <Link key={t.label} href={t.href} className="big-marq">{t.label}<b>✦</b></Link>
        ))}
      </Marquee>
    </div>
  );
}

export function ReviewMarquee() {
  return (
    <Marquee speed={32} pauseOnHover gradient={false}>
      {TESTIMONIALS.map((t) => (
        <div key={t.name} className="card quote">
          <div className="stars">★★★★★</div>
          <p>“{t.text}”</p>
          <b>{t.name}</b> <span className="muted small">· {t.place}</span>
        </div>
      ))}
    </Marquee>
  );
}
