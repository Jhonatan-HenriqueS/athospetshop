"use client";

import { useSyncExternalStore } from "react";
import { isBusinessOpen } from "@/lib/opening-status";

function subscribe(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const update = () => {
    clearTimeout(timer);
    onChange();
    // Check on the next minute boundary, including opening and closing times.
    timer = setTimeout(update, 60_000 - (Date.now() % 60_000));
  };
  const onVisibility = () => {
    if (document.visibilityState === "visible") update();
  };
  update();
  document.addEventListener("visibilitychange", onVisibility);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

// No build-time status: SSR and hydration share a neutral initial state.
const getServerSnapshot = () => null;

export function OpeningStatus() {
  const open = useSyncExternalStore<boolean | null>(subscribe, isBusinessOpen, getServerSnapshot);
  return (
    <span
      className="opening-status"
      data-state={open === null ? "pending" : open ? "open" : "closed"}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="opening-status-dot" aria-hidden="true" />
      {open === null ? "Verificando horário…" : open ? "Aberto" : "Fechado"}
    </span>
  );
}
