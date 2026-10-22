"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Photo from "./Photo";
import { Item, Stagger } from "./Reveal";
import { HOTELS, STARS, waLink } from "@/lib/data";

export default function HotelList() {
  const [star, setStar] = useState(0);
  useEffect(() => {
    const s = Number(new URLSearchParams(window.location.search).get("s"));
    if (s) setStar(s);
  }, []);
  const list = HOTELS.filter((h) => !star || h.star === star);
  const info = STARS.find((s) => s.star === star);
  return (
    <>
      <div className="chips">
        <button className={`fchip ${!star ? "on" : ""}`} onClick={() => setStar(0)}>All Hotels</button>
        {STARS.map((s) => <button key={s.star} className={`fchip ${star === s.star ? "on" : ""}`} onClick={() => setStar(s.star)}>{s.label}</button>)}
      </div>
      {info && <p className="notice" style={{ marginBottom: 24 }}>{info.label}: {info.note}.</p>}
      <Stagger className="grid g3" key={star}>
        {list.map((h) => (
          <Item key={h.id}>
            <div className="card hotel">
              <div className="thumb"><Photo src={h.img} alt={h.name} fallback="hotel" /><span className="chip">{h.star}★</span><span className="chip r">{h.city}</span></div>
              <div className="card-body">
                <div className="stars-lg">{"★".repeat(Math.min(5, h.star))}{h.star === 7 && " ✦✦"}</div>
                <h3>{h.name}</h3>
                <ul className="ticks small">{h.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                <div className="price-row">
                  <a className="btn btn-wa btn-sm" target="_blank" rel="noreferrer" href={waLink(`Hi Go Trip, I'm interested in ${h.name} (${h.star}★, ${h.city}). Please share details.`)}>Enquire</a>
                  <Link className="btn btn-amber btn-sm" href="/custom">Add to Trip</Link>
                </div>
              </div>
            </div>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
