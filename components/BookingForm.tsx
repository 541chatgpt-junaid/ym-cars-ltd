"use client";

import { useEffect, useState } from "react";
import { rentalFleet, carsForSale } from "@/data/cars";
import { site, whatsappLink } from "@/data/site";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

type Service = "rent" | "buy" | "sell";

export type PrefillDetail = Partial<{
  service: Service;
  category: string;
  pickup: string;
  dropoff: string;
  vehicle: string;
}>;

const today = () => new Date().toISOString().slice(0, 10);

const ukPhone = /^(?:\+44\s?|0)\d[\d\s]{8,12}$/;

export default function BookingForm() {
  const [service, setService] = useState<Service>("rent");
  const [values, setValues] = useState({
    category: rentalFleet[0].category,
    pickup: "",
    pickupTime: "10:00",
    dropoff: "",
    vehicle: "",
    budget: "",
    reg: "",
    mileage: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<PrefillDetail>).detail || {};
      if (d.service) setService(d.service);
      setValues((v) => ({
        ...v,
        ...(d.category && { category: d.category }),
        ...(d.pickup && { pickup: d.pickup }),
        ...(d.dropoff && { dropoff: d.dropoff }),
        ...(d.vehicle && { vehicle: d.vehicle }),
      }));
      setSent(false);
    };
    window.addEventListener("ym:prefill", onPrefill);
    return () => window.removeEventListener("ym:prefill", onPrefill);
  }, []);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const er: Record<string, string> = {};
    if (values.name.trim().length < 2) er.name = "Please enter your name";
    if (!ukPhone.test(values.phone.trim())) er.phone = "Please enter a valid UK phone number";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) er.email = "Please enter a valid email";
    if (service === "rent") {
      if (!values.pickup) er.pickup = "Choose a pick-up date";
      if (!values.dropoff) er.dropoff = "Choose a return date";
      else if (values.pickup && values.dropoff < values.pickup) er.dropoff = "Return must be after pick-up";
    }
    if (service === "sell" && values.reg.trim().length < 2) er.reg = "Enter your registration";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const buildMessage = () => {
    const lines = [`*New ${service === "rent" ? "Rental Booking" : service === "buy" ? "Car Purchase Enquiry" : "Sell / Part-Exchange Enquiry"}* via website`];
    if (service === "rent") {
      lines.push(`Car type: ${values.category}`, `Pick-up: ${values.pickup} at ${values.pickupTime}`, `Return: ${values.dropoff}`);
    } else if (service === "buy") {
      if (values.vehicle) lines.push(`Interested in: ${values.vehicle}`);
      if (values.budget) lines.push(`Budget: ${values.budget}`);
    } else {
      lines.push(`Registration: ${values.reg.toUpperCase()}`);
      if (values.mileage) lines.push(`Mileage: ${values.mileage}`);
    }
    lines.push(`Name: ${values.name}`, `Phone: ${values.phone}`);
    if (values.email) lines.push(`Email: ${values.email}`);
    if (values.message) lines.push(`Message: ${values.message}`);
    return lines.join("\n");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappLink(buildMessage()), "_blank", "noopener");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="booking__success" role="status">
        <div className="booking__success-icon">
          <CheckIcon size={36} />
        </div>
        <h3>Thank you, {values.name.split(" ")[0]}!</h3>
        <p>
          Your request has been prepared in WhatsApp. Just press <strong>send</strong> and our team will reply shortly.
          Didn&apos;t open? Call us on <a href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
        <div className="booking__success-actions">
          <a href={whatsappLink(buildMessage())} target="_blank" rel="noopener" className="btn btn--green">
            <WhatsAppIcon size={18} /> Open WhatsApp again
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
            Make another booking
          </button>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <span className="field__error" id={`${k}-error`}>
        {errors[k]}
      </span>
    ) : null;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form className="booking__form" onSubmit={onSubmit} noValidate>
      <div className="segmented" role="radiogroup" aria-label="What can we help with?">
        {(
          [
            ["rent", "Rent a Car"],
            ["buy", "Buy a Car"],
            ["sell", "Sell / Part-Ex"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={service === k}
            className={`segmented__btn ${service === k ? "is-active" : ""}`}
            onClick={() => {
              setService(k);
              setErrors({});
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="form-grid" key={service}>
        {service === "rent" && (
          <>
            <label className="field field--full">
              <span>Car type</span>
              <select value={values.category} onChange={set("category")}>
                {rentalFleet.map((c) => (
                  <option key={c.id} value={c.category}>
                    {c.category}: {c.example}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Pick-up date *</span>
              <input type="date" min={today()} value={values.pickup} onChange={set("pickup")} {...aria("pickup")} />
              {err("pickup")}
            </label>
            <label className="field">
              <span>Pick-up time</span>
              <input type="time" value={values.pickupTime} onChange={set("pickupTime")} />
            </label>
            <label className="field field--full">
              <span>Return date *</span>
              <input type="date" min={values.pickup || today()} value={values.dropoff} onChange={set("dropoff")} {...aria("dropoff")} />
              {err("dropoff")}
            </label>
          </>
        )}

        {service === "buy" && (
          <>
            <label className="field field--full">
              <span>Car you&apos;re interested in</span>
              <select value={values.vehicle} onChange={set("vehicle")}>
                <option value="">Not sure yet / help me choose</option>
                {carsForSale.map((c) => (
                  <option key={c.id} value={`${c.year} ${c.make} ${c.model}`}>
                    {c.year} {c.make} {c.model} {c.variant}
                  </option>
                ))}
              </select>
            </label>
            <label className="field field--full">
              <span>Budget</span>
              <select value={values.budget} onChange={set("budget")}>
                <option value="">Any budget</option>
                <option>Under £8,000</option>
                <option>£8,000 – £12,000</option>
                <option>£12,000 – £18,000</option>
                <option>£18,000+</option>
              </select>
            </label>
          </>
        )}

        {service === "sell" && (
          <>
            <label className="field">
              <span>Registration *</span>
              <input className="input-plate" placeholder="AB12 CDE" value={values.reg} onChange={set("reg")} maxLength={8} {...aria("reg")} />
              {err("reg")}
            </label>
            <label className="field">
              <span>Mileage</span>
              <input inputMode="numeric" placeholder="e.g. 45,000" value={values.mileage} onChange={set("mileage")} />
            </label>
          </>
        )}

        <label className="field field--full">
          <span>Full name *</span>
          <input autoComplete="name" value={values.name} onChange={set("name")} {...aria("name")} />
          {err("name")}
        </label>
        <label className="field">
          <span>Phone *</span>
          <input type="tel" autoComplete="tel" placeholder="07xxx xxxxxx" value={values.phone} onChange={set("phone")} {...aria("phone")} />
          {err("phone")}
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" autoComplete="email" value={values.email} onChange={set("email")} {...aria("email")} />
          {err("email")}
        </label>
        <label className="field field--full">
          <span>Message</span>
          <textarea rows={3} value={values.message} onChange={set("message")} placeholder="Anything else we should know?" />
        </label>
      </div>

      <button type="submit" className="btn btn--gradient btn--block btn--lg">
        <WhatsAppIcon size={20} /> {service === "rent" ? "Request Booking" : "Send Enquiry"}
      </button>
      <p className="booking__note">
        Prefer to talk? <a href={site.phoneHref}><PhoneIcon size={14} /> {site.phoneDisplay}</a>
      </p>
    </form>
  );
}
