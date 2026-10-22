"use client";
import Icon from "@/components/Icon";
import Link from "next/link";
import Image from "next/image";
import "../admin.css";
import { useEffect, useMemo, useState } from "react";
import { SEED_BOOKINGS, SEED_PACKAGES, STATUSES, inr } from "@/lib/data";
import { KEYS, useLocal } from "@/lib/store";

// DEMO login. For production move auth to the server (NextAuth / Supabase Auth).
const ADMIN_USER = "admin";
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "gotrip@123";

export default function AdminPage() {
  const [authed, setAuthed] = useState(null);
  useEffect(() => {
    try { setAuthed(sessionStorage.getItem("ut_admin") === "1"); } catch { setAuthed(false); }
  }, []);
  if (authed === null) return null;
  if (!authed) return <Login onOk={() => { sessionStorage.setItem("ut_admin", "1"); setAuthed(true); }} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem("ut_admin"); setAuthed(false); }} />;
}

function Login({ onOk }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) onOk();
    else setErr("Wrong username or password");
  };
  return (
    <div className="login">
      <form className="box" onSubmit={submit}>
        <div className="logo" style={{ marginBottom: 18 }}>
          <Image src="/logo.png" alt="Go Trip" width={900} height={508} style={{ height: 64, width: "auto" }} />
        </div>
        <div className="field"><label>Username</label><input className="input" value={u} onChange={(e) => setU(e.target.value)} autoFocus /></div>
        <div className="field"><label>Password</label><input className="input" type="password" value={p} onChange={(e) => setP(e.target.value)} /></div>
        {err && <p className="small" style={{ color: "var(--bad)", marginBottom: 10 }}>{err}</p>}
        <button className="btn btn-amber" style={{ width: "100%" }}>Sign in</button>
        <p className="small muted" style={{ marginTop: 14 }}>Demo login: <b>admin</b> / <b>gotrip@123</b></p>
        <p className="small" style={{ marginTop: 8 }}><Link href="/" style={{ color: "var(--pine-2)" }}>← Back to website</Link></p>
      </form>
    </div>
  );
}

const TABS = [
  ["dash", "dash", "Dashboard"],
  ["bookings", "receipt", "Bookings"],
  ["packages", "luggage", "Packages"],
  ["enq", "mail", "Enquiries"],
];

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("dash");
  const [bookings, saveBookings] = useLocal(KEYS.bookings, SEED_BOOKINGS);
  const [packages, savePackages] = useLocal(KEYS.packages, SEED_PACKAGES);
  const [enq, saveEnq] = useLocal(KEYS.enquiries, []);

  const reset = () => {
    if (!confirm("Reset all demo data (bookings, packages, enquiries)?")) return;
    saveBookings(SEED_BOOKINGS); savePackages(SEED_PACKAGES); saveEnq([]);
  };
  const pending = bookings.filter((b) => b.status === "Pending").length;

  return (
    <div className="adm">
      <aside>
        <div style={{ background: "#fff", borderRadius: 14, padding: "8px 12px", display: "inline-block" }}><Image src="/logo.png" alt="Go Trip" width={900} height={508} style={{ height: 44, width: "auto" }} /></div>
        <nav>
          {TABS.map(([k, ic, label]) => (
            <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>
              <Icon name={ic} size={17} /> {label}
              {k === "bookings" && pending > 0 && <span className="pill s-Pending" style={{ marginLeft: "auto" }}>{pending}</span>}
            </button>
          ))}
          <Link href="/" style={{ padding: "11px 14px" }}><Icon name="globe" size={17} /> View Website</Link>
          <button onClick={reset}><Icon name="reset" size={17} /> Reset Demo Data</button>
          <button onClick={onLogout}><Icon name="logout" size={17} /> Logout</button>
        </nav>
      </aside>
      <main>
        {tab === "dash" && <Overview bookings={bookings} packages={packages} enq={enq} go={setTab} />}
        {tab === "bookings" && <Bookings bookings={bookings} save={saveBookings} />}
        {tab === "packages" && <Packages packages={packages} save={savePackages} />}
        {tab === "enq" && <Enquiries enq={enq} save={saveEnq} />}
      </main>
    </div>
  );
}

function Overview({ bookings, packages, enq, go }) {
  const revenue = bookings.filter((b) => b.status === "Confirmed" || b.status === "Completed").reduce((s, b) => s + (b.amount || 0), 0);
  const byStatus = STATUSES.map((s) => [s, bookings.filter((b) => b.status === s).length]);
  const max = Math.max(1, ...byStatus.map(([, n]) => n));
  const recent = bookings.slice(0, 5);
  return (
    <>
      <h1>Dashboard</h1>
      <p className="muted">Overview of your bookings and business.</p>
      <div className="stats">
        <div className="stat"><span>Total bookings</span><b>{bookings.length}</b></div>
        <div className="stat"><span>Pending to confirm</span><b>{bookings.filter((b) => b.status === "Pending").length}</b></div>
        <div className="stat"><span>Confirmed revenue</span><b>{inr(revenue)}</b></div>
        <div className="stat"><span>New enquiries</span><b>{enq.filter((e) => !e.handled).length}</b></div>
      </div>
      <div className="grid g2">
        <div className="panel">
          <h3 style={{ marginBottom: 14 }}>Bookings by status</h3>
          {byStatus.map(([s, n]) => (
            <div className="bar" key={s}>
              <span style={{ width: 90 }}>{s}</span>
              <i style={{ width: `${(n / max) * 70 + 2}%` }} />
              <b>{n}</b>
            </div>
          ))}
          <p className="small muted" style={{ marginTop: 10 }}>{packages.length} packages live on website</p>
        </div>
        <div className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <h3>Recent bookings</h3>
            <button className="btn btn-sm btn-pine" onClick={() => go("bookings")}>View all</button>
          </div>
          {recent.map((b) => (
            <div key={b.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed var(--line)" }}>
              <span><b>{b.name}</b><br /><span className="small muted">{b.type === "Package" ? b.packageTitle : `${b.pickup} → ${b.drop}`}</span></span>
              <span className={`pill s-${b.status}`} style={{ alignSelf: "center" }}>{b.status}</span>
            </div>
          ))}
          {!recent.length && <p className="muted">No bookings yet.</p>}
        </div>
      </div>
    </>
  );
}

function Bookings({ bookings, save }) {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => bookings.filter((b) => (filter === "All" || b.status === filter) &&
      (b.name + b.phone + b.id + (b.packageTitle || "") + (b.pickup || "")).toLowerCase().includes(q.toLowerCase())),
    [bookings, filter, q]
  );
  const setStatus = (id, status) => save((l) => l.map((b) => (b.id === id ? { ...b, status } : b)));
  const del = (id) => confirm("Delete this booking?") && save((l) => l.filter((b) => b.id !== id));
  const csv = () => {
    const head = ["ID", "Name", "Phone", "Type", "Package/Route", "Vehicle", "Date", "Pax", "Amount", "Status"];
    const rows = bookings.map((b) => [b.id, b.name, b.phone, b.type, b.type === "Package" ? b.packageTitle : `${b.pickup} to ${b.drop}`, b.vehicleName, b.date, b.passengers, b.amount, b.status]);
    const text = [head, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    a.download = "gotrip-bookings.csv";
    a.click();
  };
  return (
    <>
      <h1>Bookings</h1>
      <p className="muted" style={{ marginBottom: 16 }}>Confirm, complete or cancel customer requests.</p>
      <div className="toolbar">
        <input className="input" placeholder="Search name, phone, ID…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" style={{ maxWidth: 160 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className="btn btn-pine btn-sm" onClick={csv}>⬇ Export CSV</button>
      </div>
      <div className="panel tbl-wrap">
        <table className="tbl">
          <thead><tr><th>ID</th><th>Customer</th><th>Trip</th><th>Vehicle</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {list.map((b) => (
              <tr key={b.id}>
                <td><b>{b.id}</b><br /><span className="small muted">{new Date(b.createdAt).toLocaleDateString("en-IN")}</span></td>
                <td><b>{b.name}</b><br /><a href={`tel:${b.phone}`} style={{ color: "var(--pine-2)" }}>{b.phone}</a>{b.notes && <><br /><span className="small muted">“{b.notes}”</span></>}</td>
                <td>{b.type === "Package" ? b.packageTitle : `${b.pickup} → ${b.drop}`}<br /><span className="small muted">{b.type} · {b.passengers} pax{b.type === "Package" && b.pickup ? ` · from ${b.pickup}` : ""}</span></td>
                <td>{b.vehicleName}</td>
                <td>{b.date}</td>
                <td>{b.amount ? inr(b.amount) : "—"}</td>
                <td>
                  <select className={`input pill s-${b.status}`} style={{ padding: "5px 8px", width: "auto" }} value={b.status} onChange={(e) => setStatus(b.id, e.target.value)}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td><button className="btn btn-danger btn-sm" onClick={() => del(b.id)}>Delete</button></td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={8} className="muted">No bookings found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

const blank = { title: "", route: "", category: "Himachal", themes: [], days: 3, nights: 2, price: 8000, img: "", summary: "", highlights: [], itinerary: [], rating: 4.8, featured: false, active: true };
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const lines = (arr) => (arr || []).join("\n");
const toArr = (s) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function Packages({ packages, save }) {
  const [edit, setEdit] = useState(null);
  const toggle = (id, k) => save((l) => l.map((p) => (p.id === id ? { ...p, [k]: !p[k] } : p)));
  const del = (id) => confirm("Delete this package from the website?") && save((l) => l.filter((p) => p.id !== id));
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div><h1>Packages</h1><p className="muted">Add, edit or hide tour packages shown on your website.</p></div>
        <button className="btn btn-amber" onClick={() => setEdit({ ...blank })}>+ Add Package</button>
      </div>
      <div className="panel tbl-wrap" style={{ marginTop: 16 }}>
        <table className="tbl">
          <thead><tr><th>Package</th><th>Category</th><th>Duration</th><th>Price</th><th>Featured</th><th>Visible</th><th></th></tr></thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id}>
                <td><b>{p.title}</b><br /><span className="small muted">{p.route}</span></td>
                <td>{p.category}</td>
                <td>{p.days}D / {p.nights}N</td>
                <td>{inr(p.price)}</td>
                <td><input type="checkbox" checked={!!p.featured} onChange={() => toggle(p.id, "featured")} /></td>
                <td><input type="checkbox" checked={p.active !== false} onChange={() => toggle(p.id, "active")} /></td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button className="btn btn-pine btn-sm" onClick={() => setEdit(p)}>Edit</button>{" "}
                  <button className="btn btn-danger btn-sm" onClick={() => del(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {edit && <PackageModal pkg={edit} close={() => setEdit(null)} onSave={(p) => {
        save((l) => (l.some((x) => x.id === p.id) ? l.map((x) => (x.id === p.id ? p : x)) : [p, ...l]));
        setEdit(null);
      }} />}
    </>
  );
}

function PackageModal({ pkg, close, onSave }) {
  const [f, setF] = useState({ ...pkg, hl: lines(pkg.highlights), it: lines(pkg.itinerary), th: (pkg.themes || []).join(", ") });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const { hl, it, th, ...rest } = f;
    const base = {
      ...rest,
      id: pkg.id || "p" + Date.now(),
      slug: pkg.slug || slugify(f.title) + "-" + Date.now().toString().slice(-4),
      days: Number(f.days), nights: Number(f.nights), price: Number(f.price), rating: Number(f.rating),
      highlights: toArr(hl), itinerary: toArr(it), themes: th.split(",").map((x) => x.trim()).filter(Boolean),
      inclusions: pkg.inclusions || ["AC vehicle for entire trip", "Experienced driver & allowance", "Fuel, toll, parking & state taxes", "24×7 trip support"],
      exclusions: pkg.exclusions || ["Hotel / stay costs", "Meals & personal expenses", "Entry tickets"],
    };
    onSave(base);
  };
  return (
    <div className="modal-bg" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <form className="modal" onSubmit={submit}>
        <h2 style={{ marginBottom: 14 }}>{pkg.id ? "Edit Package" : "Add Package"}</h2>
        <div className="field"><label>Title *</label><input className="input" required value={f.title} onChange={set("title")} /></div>
        <div className="row2">
          <div className="field"><label>Route *</label><input className="input" required value={f.route} onChange={set("route")} placeholder="Delhi → Shimla → Delhi" /></div>
          <div className="field"><label>Category</label>
            <input className="input" list="cats" value={f.category} onChange={set("category")} />
            <datalist id="cats"><option>Himachal</option><option>Uttarakhand</option><option>Punjab & J&K</option><option>Ladakh</option><option>Spiti</option><option>Golden Triangle</option></datalist>
          </div>
        </div>
        <div className="row2">
          <div className="field"><label>Days</label><input className="input" type="number" min={1} value={f.days} onChange={set("days")} /></div>
          <div className="field"><label>Nights</label><input className="input" type="number" min={0} value={f.nights} onChange={set("nights")} /></div>
        </div>
        <div className="row2">
          <div className="field"><label>Starting price ₹</label><input className="input" type="number" min={0} value={f.price} onChange={set("price")} /></div>
          <div className="field"><label>Rating</label><input className="input" type="number" step="0.1" min={1} max={5} value={f.rating} onChange={set("rating")} /></div>
        </div>
        <div className="field"><label>Trip types (comma separated: Temple, Family, Friends, Women Special, Trekking, Honeymoon)</label><input className="input" value={f.th} onChange={set("th")} /></div>
        <div className="field"><label>Image URL</label><input className="input" value={f.img} onChange={set("img")} placeholder="https://… or /images/shimla.jpg" /></div>
        <div className="field"><label>Short summary</label><textarea className="input" rows={2} value={f.summary} onChange={set("summary")} /></div>
        <div className="field"><label>Highlights (one per line)</label><textarea className="input" rows={4} value={f.hl} onChange={set("hl")} /></div>
        <div className="field"><label>Itinerary (one line per day, e.g. “Day 1: …”)</label><textarea className="input" rows={6} value={f.it} onChange={set("it")} /></div>
        <label style={{ marginRight: 20 }}><input type="checkbox" checked={!!f.featured} onChange={set("featured")} /> Show on home page</label>
        <label><input type="checkbox" checked={f.active !== false} onChange={set("active")} /> Visible</label>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={close}>Cancel</button>
          <button className="btn btn-amber btn-sm">Save Package</button>
        </div>
      </form>
    </div>
  );
}

function Enquiries({ enq, save }) {
  return (
    <>
      <h1>Enquiries</h1>
      <p className="muted" style={{ marginBottom: 16 }}>Messages sent from the Contact page.</p>
      <div className="panel tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>Message</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {enq.map((e) => (
              <tr key={e.id}>
                <td>{new Date(e.createdAt).toLocaleDateString("en-IN")}</td>
                <td><b>{e.name}</b></td>
                <td><a href={`tel:${e.phone}`} style={{ color: "var(--pine-2)" }}>{e.phone}</a></td>
                <td style={{ maxWidth: 360 }}>{e.message}</td>
                <td><span className={`pill ${e.handled ? "s-Completed" : "s-Pending"}`}>{e.handled ? "Handled" : "New"}</span></td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button className="btn btn-pine btn-sm" onClick={() => save((l) => l.map((x) => (x.id === e.id ? { ...x, handled: !x.handled } : x)))}>{e.handled ? "Reopen" : "Mark handled"}</button>{" "}
                  <button className="btn btn-danger btn-sm" onClick={() => save((l) => l.filter((x) => x.id !== e.id))}>Delete</button>
                </td>
              </tr>
            ))}
            {!enq.length && <tr><td colSpan={6} className="muted">No enquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
