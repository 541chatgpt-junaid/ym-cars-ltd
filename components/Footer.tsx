import Link from "next/link";
import { hoursNote, site, whatsappLink } from "@/data/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";

const links = [
  { href: "/#rentals", label: "Car Rental" },
  { href: "/#for-sale", label: "Cars for Sale" },
  { href: "/about", label: "About Us" },
  { href: "/#booking", label: "Book Now" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={`${site.name} logo`} width={220} height={47} className="footer__logo" loading="lazy" />
          <p className="muted">{site.tagline}. Friendly local service, honest prices and fast WhatsApp booking.</p>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={site.phoneHref}><PhoneIcon size={15} /> {site.phoneDisplay}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener"><WhatsAppIcon size={15} /> {site.whatsappDisplay}</a></li>
            {site.email && <li><a href={`mailto:${site.email}`}><MailIcon size={15} /> {site.email}</a></li>}
            <li><span><PinIcon size={15} /> {site.address.city}, UK</span></li>
          </ul>
        </div>
        <div>
          <h3>Opening hours</h3>
          <ul>
            {site.hours.map((h) => (
              <li key={h.days} className="hours-row"><span>{h.days}</span><span>{h.time}</span></li>
            ))}
            <li className="hours-note">{hoursNote()}</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved. Registered in England &amp; Wales.</span>
        <span className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Cookies</a>
        </span>
      </div>
    </footer>
  );
}
