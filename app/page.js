import Icon from "@/components/Icon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Hero from "@/components/Hero";
import Photo from "@/components/Photo";
import FAQ from "@/components/FAQ";
import Counter from "@/components/Counter";
import { FeaturedPackages } from "@/components/PackageLists";
import { PlaceMarquee, ReviewMarquee, TagMarquee } from "@/components/Marquees";
import { Item, Reveal, SecHead, Stagger } from "@/components/Reveal";
import { DESTINATIONS, HOTELS, SERVICES, STARS, THEMES, VEHICLES, WHY, SITE, waLink } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <TagMarquee />

      <section className="section">
        <div className="wrap">
          <SecHead eyebrow="Trips for everyone" title="Choose Your Kind of Trip" text="Temple yatras, family holidays, friends' gang trips, women-special journeys and trekking — all planned end to end." />
          <Stagger className="grid g3">
            {THEMES.map((t) => (
              <Item key={t.id}>
                <Link href={`/packages?t=${encodeURIComponent(t.id)}`} className="theme">
                  <Photo src={t.img} alt={t.title} />
                  <div><span className="em"><Icon name={t.icon} size={26} /></span><h3>{t.title}</h3><p>{t.text}</p></div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SecHead eyebrow="Handpicked trips" title="Popular Tour Packages" text="Fixed itineraries with car, driver and sightseeing included. Customise anything — dates, hotels, vehicle." />
          <FeaturedPackages />
          <Reveal className="center" style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/packages" className="btn btn-pine">See All Packages <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="build">
            <div>
              <span className="eyebrow">Build it yourself</span>
              <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", margin: "10px 0 14px" }}>Make Your Own <span className="grad-text">Custom Package</span></h2>
              <p className="muted" style={{ marginBottom: 18 }}>Don&apos;t like a ready-made plan? Design the entire trip yourself in under two minutes.</p>
              <ul style={{ marginBottom: 26 }}>
                <li>Pick any destinations — Shimla to Ladakh to Kedarnath</li>
                <li>Choose your car: Alto to Tempo Traveller</li>
                <li>Choose your hotel: 2★, 3★, 4★, 5★ or 7★ ultra-luxury</li>
                <li>Get a live budget estimate &amp; send on WhatsApp</li>
              </ul>
              <Link href="/custom" className="btn btn-amber">Start Building <ArrowRight size={18} /></Link>
            </div>
            <div className="mini-pick">
              <div><span className="ml"><Icon name="pin" /> Destinations</span> <small>Manali · Leh Ladakh</small></div>
              <div><span className="ml"><Icon name="car" /> Car</span> <small>Innova Crysta</small></div>
              <div><span className="ml"><Icon name="hotel" /> Hotel</span> <small>5★ Luxury</small></div>
              <div><span className="ml"><Icon name="calendar" /> Duration</span> <small>7 Nights</small></div>
              <div style={{ background: "var(--grad)", color: "#fff" }}>Your trip, your rules <ArrowRight size={18} /></div>
            </div>
          </Reveal>
        </div>
      </section>

      <PlaceMarquee />

      <section className="section">
        <div className="wrap">
          <SecHead eyebrow="Where to?" title="Top Destinations" />
          <Stagger className="grid g4">
            {DESTINATIONS.map((d) => (
              <Item key={d.name}>
                <Link href={`/packages?c=${encodeURIComponent(d.cat)}`} className="dest">
                  <Photo src={d.img} alt={d.name} />
                  <div><h3>{d.name}</h3><span>Explore packages →</span></div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SecHead eyebrow="Our fleet" title="Every Car — From Alto to Tempo Traveller" text="Clean, AC, GPS-enabled vehicles with verified drivers. Pick the one that fits your group." />
          <Stagger className="grid g4">
            {VEHICLES.slice(0, 8).map((v) => (
              <Item key={v.id}>
                <div className="card">
                  <div className="thumb"><Photo src={v.img} alt={v.name} fallback="car" /><span className="chip">{v.tag}</span></div>
                  <div className="card-body">
                    <h3>{v.name}</h3>
                    <span className="small muted">{v.type}</span>
                    <div className="meta"><span><Icon name="seat" size={14} /> {v.seats} seats</span><span><Icon name="bag" size={14} /> {v.bags} bags</span><span><Icon name="ac" size={14} /> AC</span></div>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal style={{ marginTop: 34, textAlign: "center" }}><Link href="/fleet" className="btn btn-pine">View Full Fleet</Link></Reveal>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <SecHead center eyebrow="Stay your way" title="Hotels From 2★ to 7★" text="Backpacker stays to ultra-luxury villas — choose the comfort level that suits your budget and mood." />
          <Stagger className="grid" gap={0.1}>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
              {STARS.map((s) => (
                <Item key={s.star}>
                  <Link href={`/hotels?s=${s.star}`} className="card" style={{ padding: 24, background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.14)", color: "#fff", height: "100%" }}>
                    <div style={{ color: "var(--gold)", fontSize: "1.4rem", letterSpacing: 2 }}>{"★".repeat(Math.min(5, s.star))}{s.star === 7 && " ✦✦"}</div>
                    <h3 style={{ marginTop: 6 }}>{s.label}</h3>
                    <p className="small" style={{ color: "#b9d6b4" }}>{s.note}</p>
                  </Link>
                </Item>
              ))}
            </div>
          </Stagger>
          <p className="center small" style={{ marginTop: 24, color: "#9cc196" }}>{HOTELS.length}+ partner stays across Shimla, Manali, Dharamshala &amp; Leh</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SecHead center eyebrow="Services" title="Taxi Services For Every Journey" />
          <Stagger className="grid g2">
            {SERVICES.map((s) => (
              <Item key={s.title}>
                <div className="card svc"><div className="ic"><Icon name={s.icon} size={26} /></div><div><h3>{s.title}</h3><p className="muted small">{s.text}</p></div></div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SecHead center eyebrow={`Why ${SITE.name}`} title="Travel With People You Can Trust" />
          <Stagger className="grid g4">
            {WHY.map((w) => (
              <Item key={w.title}>
                <div className="card feature" style={{ height: "100%" }}>
                  <div className="ic"><Icon name={w.icon} size={26} /></div>
                  <h3 style={{ fontSize: "1.1rem" }}>{w.title}</h3>
                  <p className="muted small">{w.text}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section dark" style={{ padding: "64px 0" }}>
        <div className="wrap stats-strip">
          <div><b><Counter to={15000} suffix="+" /></b><span>Happy travellers</span></div>
          <div><b><Counter to={9} /></b><span>Car categories</span></div>
          <div><b><Counter to={5} /></b><span>Hotel categories</span></div>
          <div><b><Counter to={24} suffix="×7" /></b><span>Support</span></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SecHead center eyebrow="Simple process" title="Book in 3 Easy Steps" />
          <Stagger className="grid g3 steps">
            {[
              ["Choose", "Pick a package or build your own — car, hotel, dates."],
              ["Share details", "Fill the form or just WhatsApp us. Takes under 2 minutes."],
              ["Get confirmation", "Our team calls, confirms the price and shares driver details."],
            ].map(([h, t]) => (
              <Item key={h}><div className="step"><h3>{h}</h3><p className="muted small">{t}</p></div></Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section alt" style={{ overflow: "hidden" }}>
        <div className="wrap"><SecHead center eyebrow="Testimonials" title="Loved by Travellers" /></div>
        <ReviewMarquee />
      </section>

      <section className="section">
        <div className="wrap">
          <SecHead center eyebrow="FAQ" title="Questions? We've Got Answers" />
          <FAQ />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta">
            <h2>Bas Nikal Pado — we&apos;ll handle the rest!</h2>
            <p>Talk to our travel expert today — free itinerary &amp; best-price guarantee.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <Link href="/book" className="btn btn-amber">Book Now</Link>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn-wa"><WhatsAppIcon size={18} /> WhatsApp</a>
              {SITE.phones.map((p) => <a key={p.raw} href={`tel:+${p.raw}`} className="btn btn-ghost"><Phone size={16} /> {p.display}</a>)}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
