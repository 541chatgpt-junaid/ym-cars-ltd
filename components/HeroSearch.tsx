"use client";

import { useState } from "react";
import { rentalFleet } from "@/data/cars";
import { stock } from "@/data/stock";
import type { PrefillDetail } from "./BookingForm";
import { ArrowIcon, KeyIcon, TagIcon } from "./Icons";

const today = () => new Date().toISOString().slice(0, 10);

function goToBooking(detail: PrefillDetail) {
  window.dispatchEvent(new CustomEvent("ym:prefill", { detail }));
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSearch() {
  const [tab, setTab] = useState<"rent" | "buy">("rent");
  const [category, setCategory] = useState(rentalFleet[0].category);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicle, setVehicle] = useState("");

  return (
    <div className="hero-search" data-reveal="up" style={{ ["--d" as string]: "300ms" }}>
      <div className="hero-search__tabs" role="tablist">
        <button role="tab" aria-selected={tab === "rent"} className={tab === "rent" ? "is-active" : ""} onClick={() => setTab("rent")}>
          <KeyIcon size={18} /> Rent a Car
        </button>
        <button role="tab" aria-selected={tab === "buy"} className={tab === "buy" ? "is-active" : ""} onClick={() => setTab("buy")}>
          <TagIcon size={18} /> Buy a Car
        </button>
      </div>

      {tab === "rent" ? (
        <form
          className="hero-search__body"
          onSubmit={(e) => {
            e.preventDefault();
            goToBooking({ service: "rent", category, pickup, dropoff });
          }}
        >
          <label className="field">
            <span>Car type</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {rentalFleet.map((c) => (
                <option key={c.id}>{c.category}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Pick-up</span>
            <input type="date" min={today()} value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </label>
          <label className="field">
            <span>Return</span>
            <input type="date" min={pickup || today()} value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
          </label>
          <button className="btn btn--gradient" type="submit">
            Check Availability <ArrowIcon size={18} />
          </button>
        </form>
      ) : (
        <form
          className="hero-search__body hero-search__body--buy"
          onSubmit={(e) => {
            e.preventDefault();
            if (vehicle) goToBooking({ service: "buy", vehicle });
            else document.getElementById("for-sale")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <label className="field">
            <span>Choose a car</span>
            <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
              <option value="">Browse all cars for sale</option>
              {stock.map((c) => (
                <option key={c.id} value={`${c.year} ${c.make} ${c.model} ${c.variant} (${c.id})`}>
                  {c.year} {c.make} {c.model} {c.variant}
                </option>
              ))}
            </select>
          </label>
          <button className="btn btn--gradient" type="submit">
            {vehicle ? "Enquire Now" : "View Stock"} <ArrowIcon size={18} />
          </button>
        </form>
      )}
    </div>
  );
}
