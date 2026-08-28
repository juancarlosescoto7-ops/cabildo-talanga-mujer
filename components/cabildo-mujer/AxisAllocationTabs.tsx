"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { axes } from "./DetallePorcentajesSlide";
import { CountUpText } from "./CountUpText";

type AxisAllocationTabsProps = {
  mode: "legal" | "detail";
  activeAxis: number;
  onSelect: (index: number) => void;
};

export function AxisAllocationTabs({ mode, activeAxis, onSelect }: AxisAllocationTabsProps) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const navRef = useRef<HTMLElement>(null);
  const previousRects = useRef<Array<DOMRect>>([]);
  const previousMode = useRef(mode);

  useLayoutEffect(() => {
    const elements = itemRefs.current.filter((item): item is HTMLButtonElement => Boolean(item));
    const nextRects = elements.map((element) => element.getBoundingClientRect());
    const animations: Animation[] = [];
    let cancelled = false;

    if (previousMode.current !== mode && previousRects.current.length === nextRects.length) {
      navRef.current?.classList.remove("is-settled");

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((element, index) => {
          const previous = previousRects.current[index];
          const next = nextRects[index];
          const deltaX = previous.left - next.left;
          const deltaY = previous.top - next.top;

          animations.push(element.animate(
            [
              { transform: `translate3d(${deltaX}px, ${deltaY}px, 0)` },
              { transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 920 + index * 70,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
          ));
        });
      }

      void Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)))
        .then(() => {
          if (!cancelled && mode === "detail") navRef.current?.classList.add("is-settled");
        });
    } else if (mode === "detail") {
      navRef.current?.classList.add("is-settled");
    }

    previousRects.current = nextRects;
    previousMode.current = mode;

    return () => {
      cancelled = true;
      animations.forEach((animation) => animation.cancel());
    };
  }, [mode]);

  return (
    <nav
      ref={navRef}
      className={`axis-shared-tabs axis-shared-tabs--${mode}`}
      aria-label="Ejes de inversión del cinco por ciento"
    >
      {axes.map((item, index) => (
        <button
          key={item.name}
          ref={(element) => { itemRefs.current[index] = element; }}
          type="button"
          className={`axis-shared-tab${mode === "detail" && index === activeAxis ? " is-active" : ""}`}
          style={{ "--axis-tab-color": item.color } as CSSProperties}
          onClick={() => mode === "detail" && onSelect(index)}
          aria-current={mode === "detail" && index === activeAxis ? "step" : undefined}
          tabIndex={mode === "detail" ? 0 : -1}
        >
          <span className="legal-swatch" aria-hidden="true" />
          <span>{item.name}</span>
          <strong><CountUpText value={item.percentage} /></strong>
        </button>
      ))}
    </nav>
  );
}
