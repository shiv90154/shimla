"use client";
import { useState } from "react";
import { KEYS, useLocal } from "@/lib/store";

export default function ContactForm() {
  const [, saveEnq] = useLocal(KEYS.enquiries, []);
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    saveEnq((list) => [
      { id: "GT-ENQ-" + Date.now().toString().slice(-6), ...f, createdAt: new Date().toISOString(), handled: false },
      ...list,
    ]);
    setDone(true);
    setF({ name: "", phone: "", message: "" });
  };

  if (done)
    return (
      <div className="box" style={{ marginTop: 0, textAlign: "center" }}>
        <div className="success" style={{ boxShadow: "none", padding: 10 }}>
          <div className="tick">✓</div>
          <h3>Thank you!</h3>
          <p className="muted">We received your enquiry and will call you shortly.</p>
          <button className="btn btn-pine btn-sm" style={{ marginTop: 14 }} onClick={() => setDone(false)}>Send another</button>
        </div>
      </div>
    );

  return (
    <form className="box" style={{ marginTop: 0 }} onSubmit={submit}>
      <h3>Send us an Enquiry</h3>
      <div className="field"><label>Your Name *</label><input className="input" required value={f.name} onChange={set("name")} /></div>
      <div className="field"><label>Mobile Number *</label><input className="input" required pattern="[0-9+ ]{10,14}" title="Enter a valid phone number" value={f.phone} onChange={set("phone")} /></div>
      <div className="field"><label>Message *</label><textarea className="input" rows={4} required value={f.message} onChange={set("message")} placeholder="Tell us where you want to go, dates and number of travellers…" /></div>
      <button className="btn btn-amber" style={{ width: "100%" }}>Submit Enquiry</button>
    </form>
  );
}
