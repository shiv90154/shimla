"use client";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import Photo from "./Photo";
import {
  CAR_GROUPS, CUSTOM_PLACES, HOTELS, SEED_BOOKINGS, STARS, VEHICLES, estimateCustom, inr, waLink,
} from "@/lib/data";
import { KEYS, useLocal } from "@/lib/store";

const today = () => new Date().toISOString().slice(0, 10);

function Counter({ value, set, min, max }) {
  return (
    <div className="counter">
      <button type="button" aria-label="decrease" onClick={() => set(Math.max(min, value - 1))}><Minus size={16} /></button>
      <span>{value}</span>
      <button type="button" aria-label="increase" onClick={() => set(Math.min(max, value + 1))}><Plus size={16} /></button>
    </div>
  );
}

export default function CustomBuilder() {
  const sp = useSearchParams();
  const [, saveBookings] = useLocal(KEYS.bookings, SEED_BOOKINGS);
  const [f, setF] = useState({
    places: [], nights: 4, pax: 2, date: sp.get("date") || "", vehicleId: "dzire", star: 3, hotelId: "",
    meals: false, pickup: "", name: "", phone: "", notes: "",
  });
  const [group, setGroup] = useState("All");
  const [done, setDone] = useState(null);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const onInput = (k) => (e) => set(k)(e.target.value);

  const vehicle = VEHICLES.find((v) => v.id === f.vehicleId);
  const stars = STARS.find((s) => s.star === f.star);
  const hotels = useMemo(
    () => HOTELS.filter((h) => h.star === f.star && (!f.places.length || f.places.includes(h.city) || h.city === "Shimla" || h.city === "Manali")),
    [f.star, f.places]
  );
  const overCap = vehicle && f.pax > vehicle.seats;
  const estimate = estimateCustom({ places: f.places, nights: f.nights, pax: f.pax, vehicleId: f.vehicleId, star: f.star, meals: f.meals });
  const hotel = HOTELS.find((h) => h.id === f.hotelId && h.star === f.star);

  const togglePlace = (p) => set("places")(f.places.includes(p) ? f.places.filter((x) => x !== p) : [...f.places, p]);
  const title = `Custom: ${f.places.join(", ")} (${f.nights}N)`;

  const message = () =>
    [
      "Hi Go Trip! I built a custom package:",
      `Places: ${f.places.join(", ")}`,
      `Duration: ${f.nights} nights / ${f.nights + 1} days${f.date ? ` from ${f.date}` : ""}`,
      `Travellers: ${f.pax}`,
      `Car: ${vehicle.name}`,
      `Hotel: ${stars.label}${hotel ? ` — ${hotel.name}` : ""}`,
      `Meals: ${f.meals ? "Yes" : "No"}`,
      f.pickup && `Pickup: ${f.pickup}`,
      estimate && `Indicative budget on site: ${inr(estimate)}`,
      f.notes && `Notes: ${f.notes}`,
      `Name: ${f.name} · ${f.phone}`,
    ].filter(Boolean).join("\n");

  const submit = (e) => {
    e.preventDefault();
    if (!f.places.length || overCap) return;
    const booking = {
      id: "GT-" + Math.floor(1000 + Math.random() * 9000) + Date.now().toString().slice(-3),
      type: "Custom", packageId: "", packageTitle: title,
      vehicleId: vehicle.id, vehicleName: vehicle.name,
      name: f.name.trim(), phone: f.phone.trim(), email: "", pickup: f.pickup, drop: f.places.join(" → "),
      date: f.date, passengers: f.pax, notes: `Hotel ${stars.label}${hotel ? ` (${hotel.name})` : ""}; Meals: ${f.meals ? "yes" : "no"}. ${f.notes}`.trim(),
      amount: estimate, status: "Pending", createdAt: new Date().toISOString(),
    };
    saveBookings((l) => [booking, ...l]);
    setDone({ ...booking, wa: waLink(message()) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done)
    return (
      <div className="success">
        <div className="tick">✓</div>
        <h2>Custom Package Request Sent!</h2>
        <div className="bid">{done.id}</div>
        <div className="sum">
          <div><span>Trip</span><b style={{ textAlign: "right" }}>{done.packageTitle}</b></div>
          <div><span>Car</span><b>{done.vehicleName}</b></div>
          <div><span>Hotel</span><b>{stars.label}</b></div>
          <div><span>Travellers</span><b>{done.passengers}</b></div>
        </div>
        <p className="muted small" style={{ marginBottom: 16 }}>Send it on WhatsApp for the fastest reply — or wait, we will call <b>{done.phone}</b> within 30 minutes.</p>
        <a className="btn btn-wa" target="_blank" rel="noreferrer" href={done.wa}><WhatsAppIcon size={18} /> Send on WhatsApp</a>{" "}
        <Link href="/" className="btn btn-pine">Back to Home</Link>
      </div>
    );

  const shownCars = VEHICLES.filter((v) => group === "All" || v.group === group);

  return (
    <form className="detail" onSubmit={submit}>
      <div>
        <div className="box" style={{ marginTop: 0 }}>
          <div className="step-title"><i>1</i><h3>Where do you want to go?</h3></div>
          <div className="pick-grid">
            {CUSTOM_PLACES.map((p) => (
              <button type="button" key={p} className={`pick ${f.places.includes(p) ? "on" : ""}`} onClick={() => togglePlace(p)}>
                <b>{p}</b><small>{f.places.includes(p) ? "Selected ✓" : "Tap to add"}</small>
              </button>
            ))}
          </div>
          {!f.places.length && <p className="small muted" style={{ marginTop: 10 }}>Pick one or more destinations.</p>}
        </div>

        <div className="box">
          <div className="step-title"><i>2</i><h3>Dates &amp; travellers</h3></div>
          <div className="row2">
            <div className="field"><label>Start date</label><input className="input" type="date" min={today()} required value={f.date} onChange={onInput("date")} /></div>
            <div className="field"><label>Pickup city</label><input className="input" required placeholder="e.g. Delhi / Chandigarh" value={f.pickup} onChange={onInput("pickup")} /></div>
          </div>
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            <div className="field"><label>Nights</label><Counter value={f.nights} set={set("nights")} min={1} max={20} /></div>
            <div className="field"><label>Travellers</label><Counter value={f.pax} set={set("pax")} min={1} max={30} /></div>
          </div>
        </div>

        <div className="box">
          <div className="step-title"><i>3</i><h3>Choose your car</h3></div>
          <div className="chips" style={{ marginBottom: 16 }}>
            {["All", ...CAR_GROUPS].map((g) => <button type="button" key={g} className={`fchip ${group === g ? "on" : ""}`} onClick={() => setGroup(g)}>{g}</button>)}
          </div>
          <div className="car-pick">
            {shownCars.map((v) => (
              <button type="button" key={v.id} className={`pick ${f.vehicleId === v.id ? "on" : ""}`} onClick={() => set("vehicleId")(v.id)}>
                <div style={{ position: "relative", aspectRatio: "16/10", background: "var(--grad)", overflow: "hidden" }}><Photo src={v.img} alt={v.name} fallback="car" /></div>
                <div><b>{v.name}</b><small>{v.type} · {v.seats} seats · AC</small></div>
              </button>
            ))}
          </div>
          {overCap && <p className="small" style={{ color: "var(--bad)", marginTop: 10 }}>{vehicle.name} seats {vehicle.seats}. Pick a bigger vehicle for {f.pax} travellers.</p>}
        </div>

        <div className="box">
          <div className="step-title"><i>4</i><h3>Choose your hotel category</h3></div>
          <div className="star-row">
            {STARS.map((s) => (
              <button type="button" key={s.star} className={`pick ${f.star === s.star ? "on" : ""}`} onClick={() => { set("star")(s.star); set("hotelId")(""); }}>
                <b className="stars-lg" style={{ color: "var(--gold)" }}>{"★".repeat(s.star > 5 ? 5 : s.star)}{s.star === 7 ? " ✦✦" : ""}</b>
                <b>{s.label}</b><small>{s.note}</small>
              </button>
            ))}
          </div>
          {!!hotels.length && (
            <>
              <p className="small muted" style={{ margin: "18px 0 8px" }}>Optional — pick a specific {f.star}★ hotel:</p>
              <div className="pick-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(210px,1fr))" }}>
                {hotels.map((h) => (
                  <button type="button" key={h.id} className={`pick ${f.hotelId === h.id ? "on" : ""}`} onClick={() => set("hotelId")(f.hotelId === h.id ? "" : h.id)}>
                    <b>{h.name}</b><small>{h.city} · {h.perks.slice(0, 2).join(", ")}</small>
                  </button>
                ))}
              </div>
            </>
          )}
          <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 18, fontWeight: 500 }}>
            <input type="checkbox" checked={f.meals} onChange={(e) => set("meals")(e.target.checked)} /> Include meals (breakfast + dinner)
          </label>
        </div>

        <div className="box">
          <div className="step-title"><i>5</i><h3>Your details</h3></div>
          <div className="row2">
            <div className="field"><label>Full name *</label><input className="input" required value={f.name} onChange={onInput("name")} /></div>
            <div className="field"><label>Mobile number *</label><input className="input" required pattern="[0-9+ ]{10,14}" title="Enter a valid phone number" value={f.phone} onChange={onInput("phone")} /></div>
          </div>
          <div className="field"><label>Anything else?</label><textarea className="input" rows={3} value={f.notes} onChange={onInput("notes")} placeholder="Temple visits, adventure activities, birthday surprise…" /></div>
        </div>
      </div>

      <aside className="sticky">
        <div className="box" style={{ marginTop: 0 }}>
          <h3>Your Package</h3>
          <div className="sum">
            <div><span>Places</span><b style={{ textAlign: "right" }}>{f.places.join(", ") || "—"}</b></div>
            <div><span>Duration</span><b>{f.nights}N / {f.nights + 1}D</b></div>
            <div><span>Travellers</span><b>{f.pax}</b></div>
            <div><span>Car</span><b style={{ textAlign: "right" }}>{vehicle?.name}</b></div>
            <div><span>Hotel</span><b style={{ textAlign: "right" }}>{stars.label}{hotel ? ` · ${hotel.name}` : ""}</b></div>
            <div><span>Meals</span><b>{f.meals ? "Included" : "Not included"}</b></div>
          </div>
          <div className="est">
            <small>Indicative budget (for the whole group)</small>
            <b>{estimate ? inr(estimate) : "Select places"}</b>
            <small>Final price confirmed on call / WhatsApp</small>
          </div>
          <button className="btn btn-amber btn-block" disabled={!f.places.length || overCap} style={!f.places.length || overCap ? { opacity: 0.55 } : undefined}>Send My Custom Package</button>
          <p className="small muted" style={{ marginTop: 12, textAlign: "center" }}>No payment now. We reply within 30 minutes.</p>
        </div>
      </aside>
    </form>
  );
}
