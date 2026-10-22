"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePackages } from "./PackageLists";

export default function HeroForm() {
  const router = useRouter();
  const [packages] = usePackages();
  const [mode, setMode] = useState("Package");
  const [pkg, setPkg] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");

  const go = (e) => {
    e.preventDefault();
    if (mode === "Custom") return router.push(`/custom${date ? `?date=${date}` : ""}`);
    const p = new URLSearchParams({ type: mode });
    if (mode === "Package" && pkg) p.set("package", pkg);
    if (mode === "Taxi") { if (pickup) p.set("pickup", pickup); if (drop) p.set("drop", drop); }
    if (date) p.set("date", date);
    router.push(`/book?${p.toString()}`);
  };

  return (
    <form className="qcard" onSubmit={go}>
      <h3>Plan Your Trip</h3>
      <p>Pick a ready package, a taxi — or design your own. We confirm in 30 minutes.</p>
      <div className="seg">
        <button type="button" className={mode === "Package" ? "on" : ""} onClick={() => setMode("Package")}>Package</button>
        <button type="button" className={mode === "Custom" ? "on" : ""} onClick={() => setMode("Custom")}>Custom</button>
        <button type="button" className={mode === "Taxi" ? "on" : ""} onClick={() => setMode("Taxi")}>Taxi</button>
      </div>
      {mode === "Package" && (
        <div className="field">
          <label>Choose Package</label>
          <select className="input" value={pkg} onChange={(e) => setPkg(e.target.value)}>
            <option value="">Select a destination…</option>
            {packages.map((p) => <option key={p.id} value={p.slug}>{p.title} ({p.days}D)</option>)}
          </select>
        </div>
      )}
      {mode === "Taxi" && (
        <div className="row2">
          <div className="field"><label>Pickup</label><input className="input" placeholder="e.g. Delhi" value={pickup} onChange={(e) => setPickup(e.target.value)} /></div>
          <div className="field"><label>Drop</label><input className="input" placeholder="e.g. Shimla" value={drop} onChange={(e) => setDrop(e.target.value)} /></div>
        </div>
      )}
      {mode === "Custom" && (
        <p className="notice" style={{ marginBottom: 14 }}>Choose your own destinations, car (Alto → Traveller) and hotel (2★ → 7★) on the next page.</p>
      )}
      <div className="field">
        <label>Travel Date</label>
        <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button className="btn btn-amber btn-block">{mode === "Custom" ? "Build My Package →" : "Continue →"}</button>
    </form>
  );
}
