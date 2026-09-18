"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = scope.current?.querySelectorAll("[data-reveal]");
      elements?.forEach((element) => {
        // Only movement: content remains visible if JS or an animation fails.
        const cards = element.querySelectorAll<HTMLElement>("[data-reveal-card]");
        const targets = cards.length
          ? element.querySelectorAll<HTMLElement>(":scope > .section-heading")
          : [element];

        targets.forEach((target) => {
          gsap.from(target, {
            y: 16, duration: 0.55, ease: "power2.out",
            scrollTrigger: { trigger: target, start: "top 94%", once: true },
            clearProps: "transform",
          });
        });

        cards.forEach((card, index) => {
          gsap.from(card, {
            y: 16, duration: 0.55, delay: index * 0.05, ease: "power2.out",
            // Each card waits for its own entrance, including stacked mobile cards.
            scrollTrigger: { trigger: card, start: "top 94%", once: true },
            clearProps: "transform",
          });
        });
      });
    });
    return () => media.revert();
  }, { scope });
  return <div ref={scope} className={className}>{children}</div>;
}
