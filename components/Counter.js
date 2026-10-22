"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Counter({ to, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix; },
    });
    return () => c.stop();
  }, [inView, to, suffix, decimals]);
  return <span ref={ref}>0{suffix}</span>;
}
