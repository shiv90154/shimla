"use client";
import Marquee from "react-fast-marquee";
import { MARQUEE_SERVICES, MARQUEE_TAGS, TESTIMONIALS } from "@/lib/data";

export function TagMarquee({ items = MARQUEE_SERVICES, light = false, reverse = false, speed = 40 }) {
  return (
    <div className={`marq ${light ? "light" : ""}`} aria-hidden="true">
      <Marquee speed={speed} direction={reverse ? "right" : "left"} pauseOnHover gradient={false}>
        {items.map((t, i) => <span key={t + i} className="tag">{t}</span>)}
      </Marquee>
    </div>
  );
}

export function PlaceMarquee() {
  return (
    <div style={{ overflow: "hidden", padding: "30px 0 0" }} aria-hidden="true">
      <Marquee speed={55} gradient={false}>
        {MARQUEE_TAGS.map((t) => <span key={t} className="big-marq">{t}<b>✦</b></span>)}
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
