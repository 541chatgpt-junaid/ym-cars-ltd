"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hoursNote, site, whatsappLink } from "@/data/site";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

// Links start with "/" so they work from every page, not just the homepage.
const nav = [
  { href: "/#rentals", label: "Car Rental" },
  { href: "/#for-sale", label: "Cars for Sale" },
  { href: "/about", label: "About Us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container header__inner">
          <Link href="/" className="header__logo" aria-label={`${site.name} home`}>
            <Image src="/logo.png" alt={`${site.name} logo`} width={560} height={120} priority />
          </Link>

          <nav className="nav" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`nav__link ${pathname === n.href ? "is-active" : ""}`}
                aria-current={pathname === n.href ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="header__cta">
            <a href={site.phoneHref} className="btn btn--blue btn--sm">
              <PhoneIcon size={16} /> <span>Call Us</span>
            </a>
            <button
              className="burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise trap this fixed panel. */}
      <div id="mobile-menu" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
          <nav aria-label="Mobile">
            {nav.map((n, i) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${i * 50}ms` }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__cta">
            <a href={site.phoneHref} className="btn btn--blue">
              <PhoneIcon size={18} /> {site.phoneDisplay}
            </a>
            <a href={whatsappLink()} className="btn btn--green" target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> WhatsApp Us
            </a>
            <p className="mobile-menu__hours">{hoursNote()}</p>
          </div>
      </div>
    </>
  );
}
