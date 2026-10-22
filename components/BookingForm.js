"use client";
import Icon from "@/components/Icon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SEED_BOOKINGS, SEED_PACKAGES, SITE, VEHICLES, waLink } from "@/lib/data";
import { KEYS, useLocal } from "@/lib/store";

const today = () => new Date().toISOString().slice(0, 10);

export default function BookingForm() {
  const sp = useSearchParams();
  const [packages] = useLocal(KEYS.packages, SEED_PACKAGES);
  const [, saveBookings] = useLocal(KEYS.bookings, SEED_BOOKINGS);

  const [f, setF] = useState({
    type: sp.get("type") === "Taxi" ? "Taxi" : "Package",
    packageSlug: sp.get("package") || "",
    vehicleId: sp.get("vehicle") || "dzire",
    name: "", phone: "", email: "",
    pickup: sp.get("pickup") || "", drop: sp.get("drop") || "",
    date: sp.get("date") || "", passengers: 2, notes: "",
  });
  const [done, setDone] = useState(null);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  useEffect(() => {
    if (sp.get("package")) setF((s) => ({ ...s, type: "Package", packageSlug: sp.get("package") }));
  }, [sp]);

  const active = packages.filter((p) => p.active !== false);
  const pkg = active.find((p) => p.slug === f.packageSlug);
  const vehicle = VEHICLES.find((v) => v.id === f.vehicleId);
  const overCap = vehicle && Number(f.passengers) > vehicle.seats;

  const submit = (e) => {
    e.preventDefault();
    if (f.type === "Package" && !pkg) return alert("Please select a package");
    if (overCap) return alert(`${vehicle.name} seats only ${vehicle.seats}. Please pick a larger vehicle.`);
    const booking = {
      id: "GT-" + Math.floor(1000 + Math.random() * 9000) + Date.now().toString().slice(-3),
      type: f.type,
      packageId: pkg?.id || "", packageTitle: pkg?.title || "",
      vehicleId: vehicle.id, vehicleName: vehicle.name,
      name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(),
      pickup: f.pickup, drop: f.type === "Taxi" ? f.drop : pkg?.route || "",
      date: f.date, passengers: Number(f.passengers), notes: f.notes,
      amount: 0, status: "Pending", createdAt: new Date().toISOString(),
    };
    saveBookings((list) => [booking, ...list]);
    setDone(booking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done)
    return (
      <div className="success">
        <div className="tick">✓</div>
        <h2>Booking Request Received!</h2>
        <div className="bid">{done.id}</div>
        <div className="sum">
          <div><span>Name</span><b>{done.name}</b></div>
          <div><span>{done.type === "Package" ? "Package" : "Route"}</span><b>{done.type === "Package" ? done.packageTitle : `${done.pickup} → ${done.drop}`}</b></div>
          <div><span>Vehicle</span><b>{done.vehicleName}</b></div>
          <div><span>Date</span><b>{done.date}</b></div>
          <div className="tot"><span>Price</span><b>Quote on call / WhatsApp</b></div>
        </div>
        <p className="muted small" style={{ marginBottom: 16 }}>Our team will call <b>{done.phone}</b> within 30 minutes to confirm.</p>
        <a className="btn btn-wa" target="_blank" rel="noreferrer"
          href={waLink(`Hi Go Trip, I just made booking ${done.id} for ${done.type === "Package" ? done.packageTitle : done.pickup + " to " + done.drop} on ${done.date}. Name: ${done.name}`)}>
          <WhatsAppIcon size={18} /> Share on WhatsApp
        </a>{" "}
        <Link href="/" className="btn btn-pine">Back to Home</Link>
      </div>
    );

  return (
    <form className="detail" onSubmit={submit}>
      <div className="box" style={{ marginTop: 0 }}>
        <div className="seg">
          <button type="button" className={f.type === "Package" ? "on" : ""} onClick={() => setF({ ...f, type: "Package" })}><Icon name="luggage" size={16} /> Tour Package</button>
          <button type="button" className={f.type === "Taxi" ? "on" : ""} onClick={() => setF({ ...f, type: "Taxi" })}><Icon name="car" size={16} /> Taxi Only</button>
        </div>

        {f.type === "Package" ? (
          <div className="field"><label>Package *</label>
            <select className="input" value={f.packageSlug} onChange={set("packageSlug")} required>
              <option value="">Select a package…</option>
              {active.map((p) => <option key={p.id} value={p.slug}>{p.title} — {p.days}D/{p.nights}N</option>)}
            </select>
          </div>
        ) : (
          <div className="row2">
            <div className="field"><label>Pickup Location *</label><input className="input" required value={f.pickup} onChange={set("pickup")} placeholder="e.g. Delhi Airport" /></div>
            <div className="field"><label>Drop Location *</label><input className="input" required value={f.drop} onChange={set("drop")} placeholder="e.g. Shimla" /></div>
          </div>
        )}
        {f.type === "Package" && (
          <div className="field"><label>Pickup City *</label><input className="input" required value={f.pickup} onChange={set("pickup")} placeholder="e.g. Delhi / Chandigarh" /></div>
        )}

        <div className="row2">
          <div className="field"><label>Travel Date *</label><input className="input" type="date" min={today()} required value={f.date} onChange={set("date")} /></div>
          <div className="field"><label>Passengers *</label><input className="input" type="number" min={1} max={30} required value={f.passengers} onChange={set("passengers")} /></div>
        </div>
        <div className="field"><label>Vehicle *</label>
          <select className="input" value={f.vehicleId} onChange={set("vehicleId")}>
            {VEHICLES.map((v) => <option key={v.id} value={v.id}>{v.name} — up to {v.seats} seats</option>)}
          </select>
          {overCap && <span className="small" style={{ color: "var(--bad)" }}>Too many passengers for this vehicle.</span>}
        </div>

        <div className="row2">
          <div className="field"><label>Full Name *</label><input className="input" required value={f.name} onChange={set("name")} /></div>
          <div className="field"><label>Mobile Number *</label><input className="input" required pattern="[0-9+ ]{10,14}" title="Enter a valid phone number" value={f.phone} onChange={set("phone")} /></div>
        </div>
        <div className="field"><label>Email (optional)</label><input className="input" type="email" value={f.email} onChange={set("email")} /></div>
        <div className="field"><label>Special Requests</label><textarea className="input" rows={3} value={f.notes} onChange={set("notes")} placeholder="Hotel preference, child seat, flight number…" /></div>
      </div>

      <aside className="sticky">
        <div className="box" style={{ marginTop: 0 }}>
          <h3>Booking Summary</h3>
          <div className="sum">
            <div><span>Type</span><b>{f.type}</b></div>
            {f.type === "Package" && <div><span>Package</span><b style={{ textAlign: "right" }}>{pkg?.title || "—"}</b></div>}
            <div><span>Vehicle</span><b>{vehicle?.name}</b></div>
            <div className="tot"><span>Price</span><b>Quote on call / WhatsApp</b></div>
          </div>
          <p className="small muted" style={{ marginBottom: 14 }}>No online payment now. Pay advance after our team confirms your booking.</p>
          <button className="btn btn-amber btn-block">Confirm Booking Request</button>
          <p className="small muted" style={{ marginTop: 12, textAlign: "center" }}>Need help? {SITE.phones.map((p, i) => <span key={p.raw}>{i ? " / " : ""}<a href={`tel:+${p.raw}`} style={{ color: "var(--pine-2)", fontWeight: 600 }}>{p.display}</a></span>)}</p>
        </div>
      </aside>
    </form>
  );
}
