"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { carImage, stock } from "@/data/stock";
import { gbp } from "@/data/cars";

const INTERVAL = 5000; // each car stays on screen for 5 seconds

// Auto-rotating showcase of every car currently in stock (data/stock.ts).
// Adding or removing a car there updates the slider automatically.
export default function HeroSlider() {
  const cars = stock;
  const n = cars.length;
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (to: number) => {
      setIdx((cur) => {
        const next = ((to % n) + n) % n;
        if (next !== cur) setPrev(cur);
        return next;
      });
    },
    [n]
  );

  // autoplay (pauses on hover, when the tab is hidden, or for reduced-motion users)
  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      if (!document.hidden) go(idx + 1);
    }, INTERVAL);
    return () => window.clearTimeout(t);
  }, [idx, paused, go, n]);

  // preload the next image so the fade is seamless
  useEffect(() => {
    if (n < 2) return;
    const img = new Image();
    img.src = carImage(cars[(idx + 1) % n]);
  }, [idx, cars, n]);

  if (!n) return null;
  const car = cars[idx];

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      aria-roledescription="carousel"
      aria-label="Cars in stock"
    >
      {prev !== null && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`p${prev}`}
          className="hero-slider__img is-prev"
          src={carImage(cars[prev])}
          alt=""
          width={1200}
          height={900}
          onAnimationEnd={(e) => e.animationName === "heroFadeOut" && setPrev(null)}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`c${idx}`}
        className="hero-slider__img is-current"
        src={carImage(car)}
        alt={`${car.year} ${car.make} ${car.model} ${car.variant} for sale at YM Cars`}
        width={1200}
        height={900}
        fetchPriority={idx === 0 ? "high" : "auto"}
      />

      <a href="#for-sale" className="hero-slider__caption" aria-live="polite">
        <span>
          <strong>
            {car.year} {car.make} {car.model}
          </strong>
          <small>
            {car.variant} · {car.mileage.toLocaleString("en-GB")} mi
          </small>
        </span>
        <em>{gbp(car.price)}</em>
      </a>

      <button className="hero-slider__nav hero-slider__nav--prev" onClick={() => go(idx - 1)} aria-label="Previous car">
        ‹
      </button>
      <button className="hero-slider__nav hero-slider__nav--next" onClick={() => go(idx + 1)} aria-label="Next car">
        ›
      </button>

      <div className="hero-slider__meta">
        <span className="hero-slider__count">
          {idx + 1} / {n}
        </span>
        <span className="hero-slider__bar">
          <span key={`${idx}-${paused}`} className={paused ? "" : "is-running"} style={{ animationDuration: `${INTERVAL}ms` }} />
        </span>
      </div>
    </div>
  );
}
