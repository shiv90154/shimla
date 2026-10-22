"use client";
import Icon from "@/components/Icon";
import { useState } from "react";

// Image with graceful fallback: the parent's gradient background shows if the photo fails to load.
export default function Photo({ src, alt, fallback = "mountain" }) {
  const [bad, setBad] = useState(false);
  if (bad || !src) return <span className="fallback"><Icon name={fallback} size={44} /></span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}
