"use client";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronsDown, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import HeroForm from "./HeroForm";
import Counter from "./Counter";
import { IMG, SITE, waLink } from "@/lib/data";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero h1 .line > span", { yPercent: 110, duration: 0.8, ease: "power3.out", stagger: 0.1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero-bg" style={{ "--hero-img": `url(${IMG.hero})` }} />
      <div className="wrap">
        <div>
          <motion.span className="badge" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <ShieldCheck size={16} /> Trusted taxi &amp; tour partner · {SITE.hours}
          </motion.span>
          <h1>
            <span className="line"><span>Bas Nikal Pado!</span></span>
            <span className="line"><span><em>Your trip,</em></span></span>
            <span className="line"><span>your way.</span></span>
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            Shimla, Manali, Ladakh, Kedarnath &amp; beyond. Pick any car from Alto to Tempo Traveller and any hotel from 2★ to 7★ — or build the whole package yourself.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <Link href="/custom" className="btn btn-amber">Build My Package</Link>
            <Link href="/packages" className="btn btn-ghost">Explore Packages</Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn-wa"><WhatsAppIcon size={18} /> WhatsApp</a>
          </motion.div>
          <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <div><b><Counter to={15000} suffix="+" /></b><span>Happy travellers</span></div>
            <div><b><Counter to={17} suffix="+" /></b><span>Trip packages</span></div>
            <div><b><Counter to={4.9} decimals={1} suffix="★" /></b><span>Average rating</span></div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <HeroForm />
        </motion.div>
      </div>
      <ChevronsDown className="scroll-hint" />
    </section>
  );
}
