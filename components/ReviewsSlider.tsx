"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleIcon, StarIcon } from "./Icons";

export type SliderReview = { author: string; rating: number; when: string; text: string; photo?: string };

const AUTOPLAY = 4500;

const Stars = ({ n }: { n: number }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} size={16} className={i < Math.round(n) ? "star--on" : "star--off"} />
    ))}
  </span>
);

// One-row review carousel: native scroll-snap (swipe on mobile), arrows, dots and autoplay.
export default function ReviewsSlider({ reviews, url }: { reviews: SliderReview[]; url: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  // width of one card plus the gap between cards
  const stepOf = (el: HTMLDivElement) => {
    const card = el.querySelector<HTMLElement>(".review-card");
    return card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
  };

  // one dot per scroll position (cards - cards visible + 1)
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const step = stepOf(el);
    const perView = Math.max(1, Math.round((el.clientWidth + 1) / step));
    const n = Math.max(1, reviews.length - perView + 1);
    setPages(n);
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setPage(atEnd ? n - 1 : Math.min(n - 1, Math.round(el.scrollLeft / step)));
  }, [reviews.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scrollToCard = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const step = stepOf(el);
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const goPage = (p: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: p * stepOf(el), behavior: "smooth" });
  };

  // autoplay: one card at a time, loops back to the start
  useEffect(() => {
    if (paused || reviews.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) scrollToCard(1);
    }, AUTOPLAY);
    return () => window.clearInterval(t);
  }, [paused, reviews.length]);

  return (
    <div
      className="rslider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      aria-roledescription="carousel"
      aria-label="Google reviews"
    >
      <button className="rslider__nav rslider__nav--prev" onClick={() => scrollToCard(-1)} aria-label="Previous review">‹</button>

      <div className="rslider__track" ref={track} onScroll={measure}>
        {reviews.map((r, i) => (
          <figure key={i} className="review-card" aria-roledescription="slide" aria-label={`Review ${i + 1} of ${reviews.length}`}>
            <div className="review-card__head">
              {r.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.photo} alt="" width={42} height={42} className="avatar" loading="lazy" referrerPolicy="no-referrer" />
              ) : (
                <span className="avatar" aria-hidden>{r.author.charAt(0).toUpperCase()}</span>
              )}
              <div>
                <figcaption>{r.author}</figcaption>
                <span className="muted small">{r.when}</span>
              </div>
              <GoogleIcon size={18} />
            </div>
            <Stars n={r.rating} />
            <blockquote>{r.text.length > 320 ? `${r.text.slice(0, 317)}…` : r.text}</blockquote>
            <a href={url} target="_blank" rel="noopener" className="review-card__source">
              {r.text.endsWith("…") ? "Read full review on Google" : "Posted on Google"}
            </a>
          </figure>
        ))}
      </div>

      <button className="rslider__nav rslider__nav--next" onClick={() => scrollToCard(1)} aria-label="Next review">›</button>

      {pages > 1 && (
        <div className="rslider__dots" role="tablist" aria-label="Choose review">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === page}
              aria-label={`Go to review ${i + 1}`}
              className={i === page ? "is-active" : ""}
              onClick={() => goPage(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
