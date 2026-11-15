import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import RevealObserver from "@/components/RevealObserver";
import {
  ArrowIcon, CalendarIcon, CheckIcon, ClockIcon, KeyIcon, PhoneIcon, ShieldIcon, SwapIcon, TagIcon, WhatsAppIcon,
} from "@/components/Icons";
import { site, whatsappLink } from "@/data/site";
import { stock } from "@/data/stock";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.name}: a local car rental and used car sales company in ${site.address.city}. Inspected cars, honest prices, part exchange welcome and fast WhatsApp booking.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${site.name}`,
    description: `Car rental and quality used cars for sale in ${site.address.city}.`,
    url: "/about",
    images: [{ url: "/images/about-story.webp", width: 1000, height: 750, alt: `${site.name} showroom` }],
  },
};

const values = [
  { icon: ShieldIcon, title: "Inspected cars", text: "Every car is checked and history checked before it is rented out or put on sale." },
  { icon: TagIcon, title: "Honest pricing", text: "Clear prices with no hidden extras. What you see is what you pay." },
  { icon: SwapIcon, title: "Part exchange", text: "Trade in your current car towards your next one at a fair valuation." },
  { icon: WhatsAppIcon, title: "Fast replies", text: "Message us on WhatsApp anytime and get a quick, friendly answer." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: `About ${site.name}`,
      url: `${site.url}/about`,
      about: { "@id": `${site.url}/#business` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "About Us", item: `${site.url}/about` },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RevealObserver />
      <Header />

      <main id="top">
        {/* ---------- PAGE BANNER ---------- */}
        <section className="page-hero" aria-labelledby="about-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="page-hero__bg" src="/images/about-banner.webp" alt="" width={1280} height={960} fetchPriority="high" />
          <div className="container page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-reveal="up">
              <Link href="/">Home</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">About Us</span>
            </nav>
            <h1 id="about-title" data-reveal="up" style={{ ["--d" as string]: "80ms" }}>
              About <span className="text-blue">YM</span> <span className="text-green">Cars</span>
            </h1>
            <p data-reveal="up" style={{ ["--d" as string]: "160ms" }}>
              Car rental and quality used cars for sale in {site.address.city}, with a friendly team that keeps things simple.
            </p>
          </div>
        </section>

        {/* ---------- STORY ---------- */}
        <section className="section" aria-labelledby="story-title">
          <div className="container about-story">
            <div className="about-story__media" data-reveal="left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about-story.webp" alt="White Toyota Land Cruiser in the YM Cars showroom" width={1000} height={750} loading="lazy" />
              <div className="about-story__badge">
                <strong>{stock.length}</strong>
                <span>cars in stock now</span>
              </div>
            </div>
            <div className="about-story__copy" data-reveal="right">
              <span className="eyebrow">Who we are</span>
              <h2 id="story-title">Your local partner for renting and buying cars</h2>
              <p>
                {site.name} brings car rental and used car sales together under one roof. Whether you need a car for a few
                days, a few months, or you are ready to buy your next car, we make it quick, clear and stress-free.
              </p>
              <p>
                We hand-pick our cars, with a focus on reliable Toyota models such as the Prius, Corolla, C-HR and Land
                Cruiser, and we check every one before it goes out. Part exchange is welcome, and our team is always happy to
                help you choose the right car.
              </p>
              <ul className="checklist checklist--dark">
                <li><CheckIcon size={18} /> Daily, weekly and monthly car rental</li>
                <li><CheckIcon size={18} /> Quality used cars for sale</li>
                <li><CheckIcon size={18} /> Part exchange and simple booking</li>
              </ul>
              <div className="about-story__actions">
                <Link href="/#for-sale" className="btn btn--gradient">
                  View our cars <ArrowIcon size={18} />
                </Link>
                <a href={whatsappLink("Hi YM Cars, I'd like some information please.")} className="btn btn--ghost" target="_blank" rel="noopener">
                  <WhatsAppIcon size={18} /> WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- NUMBERS ---------- */}
        <section className="stats" aria-label="YM Cars at a glance">
          <div className="container stats__grid">
            {[
              [String(stock.length), "Cars for sale in stock"],
              ["2", "Services: rental & sales"],
              ["7 days", "Calls 9am – 6pm"],
              ["24/7", "WhatsApp messages"],
            ].map(([n, l], i) => (
              <div key={l} className="stats__item" data-reveal="up" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- WHAT WE DO ---------- */}
        <section className="section section--alt" aria-labelledby="do-title">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <span className="eyebrow">What we do</span>
              <h2 id="do-title">Two services, one trusted team</h2>
            </div>
            <div className="about-services">
              <article className="about-service" data-reveal="left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/about-rental.webp" alt="Toyota Land Cruiser available for rental" width={800} height={600} loading="lazy" />
                <div className="about-service__body">
                  <span className="about-service__icon about-service__icon--blue"><KeyIcon size={24} /></span>
                  <h3>Car Rental</h3>
                  <p>Clean, reliable cars for everyday driving, trips away and longer-term needs, on daily, weekly or monthly terms.</p>
                  <Link href="/#rentals" className="link-arrow">See rental fleet <ArrowIcon size={16} /></Link>
                </div>
              </article>
              <article className="about-service" data-reveal="right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/about-sales.webp" alt="Blue Toyota Prius for sale" width={800} height={600} loading="lazy" />
                <div className="about-service__body">
                  <span className="about-service__icon about-service__icon--green"><TagIcon size={24} /></span>
                  <h3>Cars for Sale</h3>
                  <p>Quality used cars at honest prices, with viewings, test drives and part exchange available.</p>
                  <Link href="/#for-sale" className="link-arrow">Browse cars for sale <ArrowIcon size={16} /></Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- VALUES ---------- */}
        <section className="section" aria-labelledby="values-title">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <span className="eyebrow">Why choose us</span>
              <h2 id="values-title">What to expect from YM Cars</h2>
            </div>
            <div className="values">
              {values.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="value-card" data-reveal="up" style={{ ["--d" as string]: `${i * 90}ms` }}>
                  <span className="value-card__icon"><Icon size={26} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="cta-band" aria-labelledby="cta-title">
          <div className="container cta-band__inner" data-reveal="up">
            <div>
              <h2 id="cta-title">Ready to get on the road?</h2>
              <p>
                <ClockIcon size={16} /> Calls 9am – 6pm, 7 days a week. WhatsApp us anytime.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link href="/#booking" className="btn btn--white btn--lg">
                <CalendarIcon size={20} /> Book a Car
              </Link>
              <a href={site.phoneHref} className="btn btn--outline btn--lg">
                <PhoneIcon size={20} /> {site.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}
