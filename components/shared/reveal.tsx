"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);
  // Keep completed entrances visible when a breakpoint or motion preference changes.
  const revealed = useRef(new WeakSet<Element>());

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      mobile: "(max-width: 767px)",
      desktop: "(min-width: 768px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduced) return;
      const mobile = context.conditions?.mobile;
      const tweens = new Map<HTMLElement, gsap.core.Tween>();
      const restoreStyles: (() => void)[] = [];
      const elements = scope.current?.querySelectorAll<HTMLElement>("[data-reveal]");

      elements?.forEach((element) => {
        // Nested reveal groups own their cards; never animate a card twice.
        const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-card]"))
          .filter((card) => card.closest("[data-reveal]") === element);
        const headings = Array.from(element.querySelectorAll<HTMLElement>(".section-heading, .care-collections-intro"))
          .filter((heading) => heading.closest("[data-reveal]") === element);
        const directional = Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-direction]"))
          .filter((target) => target.closest("[data-reveal]") === element);
        const targets = cards.length ? [...headings, ...cards] : directional.length ? directional : [element];
        const pending: HTMLElement[] = [];

        targets.forEach((target) => {
          // SSR/no-JS stays visible. Do not hide content already on screen at hydration.
          if (revealed.current.has(target) || target.getBoundingClientRect().top < window.innerHeight) {
            revealed.current.add(target);
            return;
          }
          const card = target.hasAttribute("data-reveal-card");
          const direction = target.dataset.revealDirection;
          const horizontal = direction === "left" || direction === "right";
          // A shorter lateral distance stays within the mobile page gutters.
          const x = horizontal ? (direction === "left" ? -1 : 1) * (mobile ? 16 : 30) : 0;
          // Explicitly preserve inline styles too: reverting a completed fromTo
          // must not leave its starting transform behind after a media change.
          const original = ["opacity", "transform"].map((property) => ({
            property,
            value: target.style.getPropertyValue(property),
            priority: target.style.getPropertyPriority(property),
          }));
          restoreStyles.push(() => original.forEach(({ property, value, priority }) => {
            if (value) target.style.setProperty(property, value, priority);
            else target.style.removeProperty(property);
          }));
          gsap.set(target, { opacity: 0 });
          // Pre-create inside the matchMedia context so cleanup owns every tween.
          const tween = gsap.fromTo(target, {
            opacity: 0,
            x,
            y: horizontal ? 0 : mobile ? 24 : 30,
            scale: card ? (mobile ? 0.99 : 0.985) : 1,
          }, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: mobile ? 0.95 : 1.05,
            ease: "power3.out",
            paused: true,
            immediateRender: false,
            clearProps: "transform,opacity",
          });
          tweens.set(target, tween);
          pending.push(target);
        });

        if (!pending.length) return;
        ScrollTrigger.batch(pending, {
          start: "top 88%",
          once: true,
          interval: 0.05,
          batchMax: 3,
          onEnter: (batch) => {
            let cardIndex = 0;
            batch.forEach((target) => {
              const node = target as HTMLElement;
              if (revealed.current.has(node)) return;
              revealed.current.add(node);
              const delay = node.hasAttribute("data-reveal-card")
                ? cardIndex++ * (mobile ? 0.08 : 0.1)
                : 0;
              tweens.get(node)?.delay(delay).play();
            });
          },
        });
      });

      // Keyboard navigation must never focus an invisible pending card/section.
      const root = scope.current;
      const showFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        for (const [target, tween] of tweens) {
          if (target.contains(event.target)) {
            revealed.current.add(target);
            tween.progress(1);
          }
        }
      };
      root?.addEventListener("focusin", showFocused);
      return () => {
        root?.removeEventListener("focusin", showFocused);
        restoreStyles.forEach((restore) => restore());
      };
    });
    return () => media.revert();
  }, { scope });

  return <div ref={scope} className={className}>{children}</div>;
}
