"use client";

import { useEffect, useMemo, useState } from "react";
import { carImage, stock, type StockCar } from "@/data/stock";
import { gbp } from "@/data/cars";
import { site, whatsappLink } from "@/data/site";
import type { PrefillDetail } from "./BookingForm";
import {
  ArrowIcon, CalendarIcon, CheckIcon, CloseIcon, FuelIcon, GaugeIcon, GearIcon, PhoneIcon, SeatIcon, WhatsAppIcon,
} from "./Icons";

const FILTERS = ["All", "Prius", "Corolla", "C-HR", "Land Cruiser", "Other"] as const;
const MAIN = ["Prius", "Corolla", "C-HR", "Land Cruiser"];
const PAGE = 8;

type Sort = "newest" | "price-asc" | "price-desc" | "mileage";

const carTitle = (c: StockCar) => `${c.year} ${c.make} ${c.model}`;

function enquire(c: StockCar) {
  const detail: PrefillDetail = { service: "buy", vehicle: `${carTitle(c)} ${c.variant} (${c.id})` };
  window.dispatchEvent(new CustomEvent("ym:prefill", { detail }));
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

export default function StockSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [sort, setSort] = useState<Sort>("newest");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<StockCar | null>(null);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: stock.length, Other: 0 };
    stock.forEach((c) => {
      if (MAIN.includes(c.model)) m[c.model] = (m[c.model] || 0) + 1;
      else m.Other++;
    });
    return m;
  }, []);

  const list = useMemo(() => {
    const l = stock.filter((c) =>
      filter === "All" ? true : filter === "Other" ? !MAIN.includes(c.model) : c.model === filter
    );
    const by: Record<Sort, (a: StockCar, b: StockCar) => number> = {
      newest: (a, b) => b.year - a.year || a.price - b.price,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      mileage: (a, b) => a.mileage - b.mileage,
    };
    return [...l].sort(by[sort]);
  }, [filter, sort]);

  const visible = showAll ? list : list.slice(0, PAGE);

  return (
    <>
      <div className="stock-toolbar" data-reveal="up">
        <div className="chips" role="tablist" aria-label="Filter by model">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? "is-active" : ""}`}
              onClick={() => {
                setFilter(f);
                setShowAll(false);
              }}
            >
              {f} <span>{counts[f] || 0}</span>
            </button>
          ))}
        </div>
        <label className="sort">
          <span className="visually-hidden">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="mileage">Lowest mileage</option>
          </select>
        </label>
      </div>

      <div className="cards" key={filter + sort}>
        {visible.map((c, i) => (
          <article key={c.id} className="car-card car-card--photo is-in" style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
            <button className="car-card__media car-card__media--photo" onClick={() => setOpen(c)} aria-label={`View photos and details of ${carTitle(c)} ${c.variant}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={carImage(c, 1, true)} alt={`${carTitle(c)} ${c.variant} in ${c.colour}`} width={640} height={480} loading={i < 4 ? "eager" : "lazy"} decoding="async" />
              {c.images > 1 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="car-card__alt" src={carImage(c, 2, true)} alt="" width={640} height={480} loading="lazy" decoding="async" />
              )}
              <span className="badge badge--green">{c.fuel === "Hybrid" ? "Hybrid" : c.body || c.fuel}</span>
              <span className="photo-count">📷 {c.images}</span>
            </button>
            <div className="car-card__body">
              <h3>
                {c.make} {c.model}
              </h3>
              <p className="muted small">{c.variant}</p>
              <ul className="specs specs--grid">
                <li><CalendarIcon size={15} /> {c.year}</li>
                <li><GaugeIcon size={15} /> {c.mileage.toLocaleString("en-GB")} mi</li>
                <li><FuelIcon size={15} /> {c.fuel}</li>
                <li><GearIcon size={15} /> {c.gearbox}</li>
              </ul>
              <div className="car-card__foot">
                <div className="price"><strong className="price--green">{gbp(c.price)}</strong></div>
                <button className="btn btn--green btn--sm" onClick={() => setOpen(c)}>
                  View
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {list.length > PAGE && (
        <div className="stock-more">
          <button className="btn btn--ghost" onClick={() => setShowAll((s) => !s)}>
            {showAll ? "Show fewer cars" : `Show all ${list.length} cars`} <ArrowIcon size={16} />
          </button>
        </div>
      )}

      {open && <CarModal car={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function CarModal({ car, onClose }: { car: StockCar; onClose: () => void }) {
  const [idx, setIdx] = useState(1);
  const n = car.images;
  const go = (d: number) => setIdx((i) => ((i - 1 + d + n) % n) + 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [touchX, setTouchX] = useState<number | null>(null);
  const specs: [string, string][] = [
    ["Year", String(car.year)],
    ["Mileage", `${car.mileage.toLocaleString("en-GB")} miles`],
    ["Fuel", car.fuel],
    ["Gearbox", car.gearbox],
    ["Body", car.body],
    ["Colour", car.colour],
    ["Doors", car.doors ? String(car.doors) : ""],
    ["Seats", car.seats ? String(car.seats) : ""],
    ["Owners", car.owners],
    ["Stock no.", car.id],
  ].filter(([, v]) => v) as [string, string][];

  const waText = `Hi YM Cars, I'm interested in the ${carTitle(car)} ${car.variant} (${car.id}) at ${gbp(car.price)}. Is it still available?`;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${carTitle(car)} ${car.variant}`} onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close" autoFocus>
          <CloseIcon size={22} />
        </button>

        <div className="modal__gallery">
          <div
            className="modal__stage"
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX === null) return;
              const dx = e.changedTouches[0].clientX - touchX;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              setTouchX(null);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={idx} src={carImage(car, idx)} alt={`${carTitle(car)} photo ${idx} of ${n}`} width={1200} height={900} />
            {n > 1 && (
              <>
                <button className="modal__nav modal__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
                <button className="modal__nav modal__nav--next" onClick={() => go(1)} aria-label="Next photo">›</button>
              </>
            )}
            <span className="modal__counter">{idx} / {n}</span>
          </div>
          <div className="modal__thumbs">
            {Array.from({ length: n }, (_, i) => i + 1).map((k) => (
              <button key={k} className={k === idx ? "is-active" : ""} onClick={() => setIdx(k)} aria-label={`Show photo ${k}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={carImage(car, k, true)} alt="" width={120} height={90} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="modal__info">
          <span className="eyebrow">Toyota · For Sale</span>
          <h2>{carTitle(car)}</h2>
          <p className="muted">{car.variant}</p>
          <div className="modal__price">{gbp(car.price)}</div>

          <div className="modal__cta">
            <button className="btn btn--gradient" onClick={() => { onClose(); enquire(car); }}>
              Enquire / Book Viewing
            </button>
            <a className="btn btn--green" href={whatsappLink(waText)} target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
            <a className="btn btn--ghost" href={site.phoneHref}>
              <PhoneIcon size={16} /> Call
            </a>
          </div>

          <dl className="spec-table">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {car.summary.map((p, i) => (
            <p key={i} className="modal__text">{p}</p>
          ))}

          {car.features.length > 0 && (
            <>
              <h3>Highlights</h3>
              <ul className="feature-list">
                {car.features.map((f) => (
                  <li key={f}><CheckIcon size={15} /> {f}</li>
                ))}
              </ul>
            </>
          )}
          <p className="small muted">
            <SeatIcon size={13} /> Part exchange welcome. Please contact us to confirm availability before travelling.
          </p>
        </div>
      </div>
    </div>
  );
}
