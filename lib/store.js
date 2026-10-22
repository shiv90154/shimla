"use client";
import { useCallback, useEffect, useState } from "react";

// Demo persistence: browser localStorage. Replace with a real DB (Supabase/Neon) for production.
export function useLocal(key, seed) {
  const [val, setVal] = useState(seed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setVal(JSON.parse(raw));
    } catch {}
    setReady(true);
    const onStorage = (e) => {
      if (e.key === key && e.newValue) setVal(JSON.parse(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const save = useCallback(
    (next) => {
      setVal((prev) => {
        const v = typeof next === "function" ? next(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(v));
        } catch {}
        return v;
      });
    },
    [key]
  );
  return [val, save, ready];
}

export const KEYS = {
  packages: "gt_packages_v2",
  bookings: "gt_bookings_v2",
  enquiries: "gt_enquiries_v2",
};
