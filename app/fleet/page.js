import Icon from "@/components/Icon";
import Link from "next/link";
import Photo from "@/components/Photo";
import { Item, SecHead, Stagger } from "@/components/Reveal";
import { TagMarquee } from "@/components/Marquees";
import { CAR_GROUPS, SERVICES, VEHICLES, waLink } from "@/lib/data";

export const metadata = {
  title: "Taxi & Cars on Rent — Alto to Tempo Traveller",
  description: "Alto, WagonR, Swift Dzire, Ertiga, Innova, Innova Crysta and 9, 12, 17 seater Tempo Traveller on rent for Shimla, Manali, Ladakh and outstation trips.",
  alternates: { canonical: "/fleet" },
};

export default function Fleet() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <h1>Our Cars — Alto to Tempo Traveller</h1>
          <p>Hatchbacks to 17-seater Travellers — all AC, GPS-enabled and driven by verified drivers.</p>
        </div>
      </section>
      <TagMarquee items={VEHICLES.map((v) => v.name)} light speed={35} />
      <section className="section">
        <div className="wrap">
          {CAR_GROUPS.map((g) => (
            <div key={g} style={{ marginBottom: 54 }}>
              <SecHead eyebrow="Category" title={g} />
              <Stagger className="grid g3">
                {VEHICLES.filter((v) => v.group === g).map((v) => (
                  <Item key={v.id}>
                    <div className="card">
                      <div className="thumb"><Photo src={v.img} alt={v.name} fallback="car" /><span className="chip">{v.tag}</span></div>
                      <div className="card-body">
                        <h3>{v.name}</h3>
                        <span className="small muted">{v.type}</span>
                        <div className="meta"><span><Icon name="seat" size={14} /> {v.seats} seats</span><span><Icon name="bag" size={14} /> {v.bags} bags</span><span><Icon name="ac" size={14} /> AC</span></div>
                        <div className="price-row">
                          <a href={waLink(`Hi Go Trip, I need a ${v.name}. Please share availability.`)} target="_blank" rel="noreferrer" className="btn btn-wa btn-sm">WhatsApp Quote</a>
                          <Link href={`/book?type=Taxi&vehicle=${v.id}`} className="btn btn-amber btn-sm">Book</Link>
                        </div>
                      </div>
                    </div>
                  </Item>
                ))}
              </Stagger>
            </div>
          ))}
          <p className="notice">Get an exact quote for your route in minutes — message us on WhatsApp or fill the booking form. Toll, parking and driver night-halt are charged as applicable.</p>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <SecHead eyebrow="What we offer" title="Taxi Services" />
          <Stagger className="grid g2">
            {SERVICES.map((s) => (
              <Item key={s.title}><div className="card svc"><div className="ic"><Icon name={s.icon} size={26} /></div><div><h3>{s.title}</h3><p className="muted small">{s.text}</p></div></div></Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
