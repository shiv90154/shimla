"use client";
import Icon from "@/components/Icon";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import PackageCard from "./PackageCard";
import { Item, Stagger } from "./Reveal";
import { SEED_PACKAGES, THEMES } from "@/lib/data";
import { KEYS, useLocal } from "@/lib/store";

export function usePackages() {
  const [packages, , ready] = useLocal(KEYS.packages, SEED_PACKAGES);
  return [packages.filter((p) => p.active !== false), ready];
}

export function FeaturedPackages() {
  const [packages] = usePackages();
  const list = packages.filter((p) => p.featured).slice(0, 6);
  return (
    <Stagger className="grid g3">
      {list.map((p) => <Item key={p.id}><PackageCard p={p} /></Item>)}
    </Stagger>
  );
}

export function AllPackages() {
  const [packages] = usePackages();
  const [theme, setTheme] = useState("All");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("t")) setTheme(sp.get("t"));
    if (sp.get("c")) setCat(sp.get("c"));
  }, []);

  const cats = useMemo(() => ["All", ...new Set(packages.map((p) => p.category))], [packages]);
  const list = packages.filter(
    (p) =>
      (theme === "All" || (p.themes || []).includes(theme)) &&
      (cat === "All" || p.category === cat) &&
      (p.title + p.route + p.category).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <div className="chips">
        <button className={`fchip ${theme === "All" ? "on" : ""}`} onClick={() => setTheme("All")}>All Trips</button>
        {THEMES.map((t) => (
          <button key={t.id} className={`fchip ${theme === t.id ? "on" : ""}`} onClick={() => setTheme(t.id)}><Icon name={t.icon} size={15} /> {t.title}</button>
        ))}
      </div>
      <div className="chips filters">
        <select className="input" style={{ maxWidth: 220 }} value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Destination">
          {cats.map((c) => <option key={c} value={c}>{c === "All" ? "All destinations" : c}</option>)}
        </select>
        <div style={{ position: "relative", maxWidth: 280, flex: "1 1 180px" }}>
          <Search size={16} style={{ position: "absolute", left: 14, top: 15, color: "var(--muted)" }} />
          <input className="input" style={{ paddingLeft: 38 }} placeholder="Search destination…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <span className="muted small">{list.length} packages</span>
      </div>
      {list.length ? (
        <div className="grid g3">
          {list.map((p) => <PackageCard key={p.id} p={p} />)}
        </div>
      ) : (
        <p className="muted">No packages found. Try another filter or <a href="/custom" style={{ color: "var(--pine-2)", fontWeight: 600 }}>build your own custom package</a>.</p>
      )}
    </>
  );
}
