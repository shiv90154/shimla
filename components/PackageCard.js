import Link from "next/link";
import { Star } from "lucide-react";
import Photo from "./Photo";
import { inr } from "@/lib/data";

export default function PackageCard({ p }) {
  return (
    <Link href={`/packages/${p.slug}`} className="card">
      <div className="thumb">
        <Photo src={p.img} alt={p.title} />
        <span className="chip">{p.days}D / {p.nights}N</span>
        <span className="chip r"><Star size={12} fill="currentColor" style={{ verticalAlign: "-1px" }} /> {p.rating}</span>
      </div>
      <div className="card-body">
        <div className="tags">{[p.category, ...(p.themes || [])].map((t) => <span key={t}>{t}</span>)}</div>
        <h3>{p.title}</h3>
        <p className="small muted">{p.route}</p>
        <div className="price-row">
          <div className="price">
            <small>Starting from</small>
            <b>{inr(p.price)}</b>
          </div>
          <span className="btn btn-pine btn-sm">View Details</span>
        </div>
      </div>
    </Link>
  );
}
