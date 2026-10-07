"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import { LocateFixed, MapPin } from "lucide-react";
import { business, fullAddress } from "@/lib/business";

const position: [number, number] = [business.coordinates.latitude, business.coordinates.longitude];
const initialZoom = 17;

export function LocationMap() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [status, setStatus] = useState<"waiting" | "loading" | "ready" | "error">("waiting");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    async function initialize() {
      setStatus("loading");
      try {
        const L = await import("leaflet");
        if (cancelled || !element) return;
        const map = L.map(element, {
          center: position,
          zoom: initialZoom,
          zoomControl: false,
          scrollWheelZoom: false,
        });
        mapRef.current = map;
        L.control.zoom({
          position: "bottomright",
          zoomInTitle: "Aproximar mapa",
          zoomOutTitle: "Afastar mapa",
        }).addTo(map);
        L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);

        let hasTiles = false;
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          minZoom: 3,
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
          .on("tileload", () => {
            hasTiles = true;
            if (!cancelled) setStatus("ready");
          })
          .on("tileerror", () => {
            if (!cancelled && !hasTiles) setStatus("error");
          })
          .addTo(map);

        const popup = document.createElement("div");
        popup.className = "athos-map-popup";
        const name = document.createElement("strong");
        name.textContent = business.name;
        const address = document.createElement("p");
        address.textContent = fullAddress;
        const route = document.createElement("a");
        route.href = business.maps;
        route.target = "_blank";
        route.rel = "noopener noreferrer";
        route.textContent = "Abrir rota no Google Maps ↗";
        popup.append(name, address, route);

        L.marker(position, {
          title: business.name,
          icon: L.divIcon({
            className: "athos-map-marker",
            html: '<span class="athos-map-pin" aria-hidden="true"></span>',
            iconSize: [40, 48],
            iconAnchor: [20, 48],
            popupAnchor: [0, -46],
          }),
        })
          .addTo(map)
          .bindTooltip("Athos", { permanent: true, direction: "top", offset: [0, -44], className: "athos-map-label" })
          .bindPopup(popup, { maxWidth: 240 });

        resizeObserver = new ResizeObserver(() => map.invalidateSize({ pan: false }));
        resizeObserver.observe(element);
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        void initialize();
      }
    }, { rootMargin: "150px" });
    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [attempt]);

  return (
    <div className="location-map" data-reveal-direction="right">
      <div
        ref={container}
        className="location-map-canvas"
        role="region"
        aria-label={`Mapa da ${business.name}, ${fullAddress}. Use os controles para aproximar ou afastar e arraste para explorar.`}
      />
      {status !== "ready" && (
        <div className="map-status" role="status">
          <MapPin aria-hidden="true" size={28} />
          <strong>{status === "error" ? "Não foi possível carregar o mapa." : status === "loading" ? "Carregando mapa…" : "Mapa interativo da Athos"}</strong>
          {status === "error" && <><span>Você ainda pode abrir a rota no Google Maps.</span><button type="button" onClick={() => setAttempt((value) => value + 1)}>Tentar novamente</button></>}
          <a href={business.maps} target="_blank" rel="noopener noreferrer">Abrir localização ↗</a>
          <noscript><p>Ative o JavaScript para explorar o mapa nesta página.</p></noscript>
        </div>
      )}
      {status === "ready" && <button
        type="button"
        className="map-recenter"
        onClick={() => mapRef.current?.setView(position, initialZoom, { animate: false })}
        aria-label="Voltar à localização da Athos"
        title="Voltar à Athos"
      ><LocateFixed size={20} aria-hidden="true" /><span>Ver a Athos</span></button>}
    </div>
  );
}
