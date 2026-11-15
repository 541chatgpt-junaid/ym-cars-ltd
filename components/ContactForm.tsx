"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/data/site";
import { CheckIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

const TOPICS = ["General enquiry", "Car rental", "Buying a car", "Selling / part exchange", "Feedback"] as const;
const ukPhone = /^(?:\+44\s?|0)\d[\d\s]{8,12}$/;

// Sends the message to the YM Cars WhatsApp (no server needed). When site.email is set,
// customers can also send the same message by email.
export default function ContactForm() {
  const [v, setV] = useState({ topic: TOPICS[0] as string, name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const er: Record<string, string> = {};
    if (v.name.trim().length < 2) er.name = "Please enter your name";
    if (!ukPhone.test(v.phone.trim())) er.phone = "Please enter a valid UK phone number";
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) er.email = "Please enter a valid email";
    if (v.message.trim().length < 5) er.message = "Please write a short message";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const text = () =>
    [
      `*${v.topic}* (website contact form)`,
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.email && `Email: ${v.email}`,
      `Message: ${v.message}`,
    ]
      .filter(Boolean)
      .join("\n");

  const mailto = () =>
    `mailto:${site.email}?subject=${encodeURIComponent(`${v.topic}: ${v.name}`)}&body=${encodeURIComponent(text().replace(/\*/g, ""))}`;

  const submit = (via: "whatsapp" | "email") => (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    if (via === "whatsapp") window.open(whatsappLink(text()), "_blank", "noopener");
    else window.location.href = mailto();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="booking__success" role="status">
        <div className="booking__success-icon">
          <CheckIcon size={36} />
        </div>
        <h3>Thanks, {v.name.split(" ")[0]}!</h3>
        <p>
          Your message is ready to send. Just press <strong>send</strong> and we&apos;ll get back to you soon. For anything
          urgent, call <a href={site.phoneHref}>{site.phoneDisplay}</a> (9am – 6pm, 7 days).
        </p>
        <div className="booking__success-actions">
          <a href={whatsappLink(text())} target="_blank" rel="noopener" className="btn btn--green">
            <WhatsAppIcon size={18} /> Open WhatsApp again
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? <span className="field__error" id={`c-${k}-error`}>{errors[k]}</span> : null);
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `c-${k}-error` : undefined });

  return (
    <form className="booking__form" onSubmit={submit("whatsapp")} noValidate>
      <div className="form-grid">
        <label className="field field--full">
          <span>What is it about?</span>
          <select value={v.topic} onChange={set("topic")}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="field field--full">
          <span>Full name *</span>
          <input autoComplete="name" value={v.name} onChange={set("name")} {...aria("name")} />
          {err("name")}
        </label>
        <label className="field">
          <span>Phone *</span>
          <input type="tel" autoComplete="tel" placeholder="07xxx xxxxxx" value={v.phone} onChange={set("phone")} {...aria("phone")} />
          {err("phone")}
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" autoComplete="email" value={v.email} onChange={set("email")} {...aria("email")} />
          {err("email")}
        </label>
        <label className="field field--full">
          <span>Message *</span>
          <textarea rows={5} value={v.message} onChange={set("message")} placeholder="How can we help?" {...aria("message")} />
          {err("message")}
        </label>
      </div>

      <div className="contact-form__actions">
        <button type="submit" className="btn btn--gradient btn--lg">
          <WhatsAppIcon size={20} /> Send via WhatsApp
        </button>
        {site.email && (
          <button type="button" className="btn btn--ghost btn--lg" onClick={submit("email")}>
            <MailIcon size={20} /> Send by email
          </button>
        )}
      </div>
      <p className="booking__note">
        Prefer to talk? <a href={site.phoneHref}><PhoneIcon size={14} /> {site.phoneDisplay}</a> · 9am – 6pm, 7 days
      </p>
    </form>
  );
}
