"use client";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MapPin, Mail, House, Compass, Wand2 } from "lucide-react";
import { SITE, waLink } from "@/lib/data";

const NAV = [
  ["/", "Home"],
  ["/packages", "Tour Packages"],
  ["/custom", "Custom Package"],
  ["/fleet", "Cars"],
  ["/hotels", "Hotels"],
  ["/contact", "Contact"],
];

const icon = { verticalAlign: "-2px" };

export default function Shell({ children }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = path.startsWith("/admin");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [path]);

  if (isAdmin) return children;
  const close = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="hide-m"><MapPin size={13} style={icon} /> {SITE.address} · {SITE.hours}</span>
          <span>
            {SITE.phones.map((p, i) => (
              <a key={p.raw} href={`tel:+${p.raw}`}>{i ? "  |  " : ""}<Phone size={13} style={icon} /> {p.display}</a>
            ))}
          </span>
        </div>
      </div>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap">
          <Link href="/" className="brand" onClick={close} aria-label="Go Trip home">
            <Image src="/logo.png" alt="Go Trip — Bas Nikal Pado" width={900} height={508} priority style={{ height: 64, width: "auto" }} />
          </Link>
          <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          <nav className={`nav ${open ? "open" : ""}`}>
            {NAV.map(([href, label]) => (
              <Link key={href} href={href} className={`link ${path === href ? "on" : ""}`} onClick={close}>{label}</Link>
            ))}
            <Link href="/book" className="btn btn-amber btn-sm" onClick={close}>Book Now</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="wrap">
          <div className="cols">
            <div>
              <div className="logo-card"><Image src="/logo.png" alt="Go Trip" width={900} height={508} style={{ height: 54, width: "auto" }} /></div>
              <p>Taxi &amp; tour packages across Himachal, Ladakh, Uttarakhand and North India — your trip, your car, your hotel, your way.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <Link href="/packages">Tour Packages</Link>
              <Link href="/custom">Build Custom Package</Link>
              <Link href="/fleet">Cars — Alto to Traveller</Link>
              <Link href="/hotels">Hotels 2★ to 7★</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
            <div>
              <h4>Trip Types</h4>
              <Link href="/packages?t=Temple">Temple Yatra</Link>
              <Link href="/packages?t=Family">Family Trips</Link>
              <Link href="/packages?t=Friends">Friends Trips</Link>
              <Link href="/packages?t=Women%20Special">Women Special</Link>
              <Link href="/packages?t=Trekking">Trekking</Link>
            </div>
            <div>
              <h4>Reach Us</h4>
              {SITE.phones.map((p) => <a key={p.raw} href={`tel:+${p.raw}`}><Phone size={14} style={icon} /> {p.display}</a>)}
              <a href={`mailto:${SITE.email}`}><Mail size={14} style={icon} /> {SITE.email}</a>
              <p><MapPin size={14} style={icon} /> {SITE.address}</p>
            </div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} {SITE.name} — {SITE.tagline} All rights reserved.</span>
            <Link href="/admin" style={{ display: "inline" }}>Admin Login</Link>
          </div>
        </div>
      </footer>

      <div className="fab">
        <a className="call" href={`tel:+${SITE.phoneRaw}`} aria-label="Call Go Trip"><Phone size={24} /></a>
        <a className="wa" href={waLink("Hi Go Trip! I want to enquire about a trip.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <span className="tip">Chat on WhatsApp</span>
          <WhatsAppIcon size={30} />
        </a>
      </div>

      <nav className="tabbar" aria-label="Quick navigation">
        <Link href="/" className={path === "/" ? "on" : ""}><House size={22} /><span>Home</span></Link>
        <Link href="/packages" className={path.startsWith("/packages") ? "on" : ""}><Compass size={22} /><span>Trips</span></Link>
        <Link href="/custom" className={`mid ${path === "/custom" ? "on" : ""}`}><i><Wand2 size={24} /></i><span>Build</span></Link>
        <a href={waLink("Hi Go Trip! I want to enquire about a trip.")} target="_blank" rel="noreferrer" className="wa"><WhatsAppIcon size={22} /><span>WhatsApp</span></a>
        <a href={`tel:+${SITE.phoneRaw}`}><Phone size={22} /><span>Call</span></a>
      </nav>
    </>
  );
}
