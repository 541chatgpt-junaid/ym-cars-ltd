import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import BookingForm from "@/components/BookingForm";
import GoogleReviews from "@/components/GoogleReviews";
import FloatingButtons from "@/components/FloatingButtons";
import RevealObserver from "@/components/RevealObserver";
import EnquireButton from "@/components/EnquireButton";
import CarArt from "@/components/CarArt";
import {
  ArrowIcon, CalendarIcon, CheckIcon, ClockIcon, FuelIcon, GaugeIcon, GearIcon,
  KeyIcon, MailIcon, PhoneIcon, PinIcon, SeatIcon, ShieldIcon, SwapIcon, TagIcon, WhatsAppIcon,
} from "@/components/Icons";
import { gbp, rentalFleet } from "@/data/cars";
import { carImage, stock } from "@/data/stock";
import StockSection from "@/components/StockSection";
import HeroSlider from "@/components/HeroSlider";
import { hoursNote, site, whatsappLink } from "@/data/site";

const faqs = [
  {
    q: "What do I need to rent a car from YM Cars?",
    a: "A full UK driving licence (or valid international licence), proof of address and a refundable security deposit. Contact us for age requirements and insurance details.",
  },
  {
    q: "Do you offer weekly and monthly car rental?",
    a: "Yes. As well as daily hire, we offer discounted weekly and monthly rental. Longer rentals get a better rate. Just ask on WhatsApp for a quote.",
  },
  {
    q: "Can I part-exchange my car when buying?",
    a: "Absolutely. Tell us your registration and mileage in the booking form and we'll give you a part-exchange valuation.",
  },
  {
    q: "Are your used cars checked before sale?",
    a: "Every car we sell is inspected and history checked before it goes on sale, and we're happy for you to view and test drive before you buy.",
  },
  {
    q: "How do I book?",
    a: `Fill in the booking form on this page, WhatsApp us on ${site.whatsappDisplay} or call ${site.phoneDisplay}. We'll confirm availability and price quickly.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutoDealer", "AutoRental"],
      "@id": `${site.url}/#business`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.png`,
      image: `${site.url}/og-image.jpg`,
      description: site.description,
      telephone: "+44 121 798 4562",
      email: site.email || undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street || undefined,
        addressLocality: site.address.city,
        postalCode: site.address.postcode || undefined,
        addressCountry: site.address.country,
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "18:00" },
      ],
      contactPoint: [
        { "@type": "ContactPoint", telephone: "+44 121 798 4562", contactType: "customer service", areaServed: "GB" },
        { "@type": "ContactPoint", telephone: "+44 7383 393739", contactType: "sales", contactOption: "WhatsApp" },
      ],
    },
    {
      "@type": "ItemList",
      name: "Used Toyota cars for sale",
      itemListElement: stock.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Car",
          name: `${c.year} ${c.make} ${c.model} ${c.variant}`,
          brand: { "@type": "Brand", name: c.make },
          model: c.model,
          vehicleModelDate: String(c.year),
          bodyType: c.body || undefined,
          color: c.colour || undefined,
          fuelType: c.fuel,
          vehicleTransmission: c.gearbox,
          mileageFromOdometer: { "@type": "QuantitativeValue", value: c.mileage, unitCode: "SMI" },
          itemCondition: "https://schema.org/UsedCondition",
          image: `${site.url}${carImage(c)}`,
          offers: { "@type": "Offer", price: c.price, priceCurrency: "GBP", availability: "https://schema.org/InStock", seller: { "@id": `${site.url}/#business` } },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RevealObserver />
      <Header />

      <main id="top">
        {/* ---------- HERO ---------- */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__bg" aria-hidden>
            <span className="blob blob--blue" />
            <span className="blob blob--green" />
            <svg className="hero__circuit" viewBox="0 0 600 400" preserveAspectRatio="none">
              <path d="M0 300 H180 L230 250 H380 L430 200 H600" />
              <path d="M0 340 H120 L170 290 H300" />
              <path d="M600 120 H460 L410 170 H260" />
              <circle cx="300" cy="290" r="5" /><circle cx="260" cy="170" r="5" />
            </svg>
          </div>

          <div className="container hero__inner">
            <div className="hero__copy hero__copy--top">
              <span className="pill" data-reveal="up">
                <span className="pill__dot" /> Car Rental · Cars for Sale · Part Exchange
              </span>
              <h1 id="hero-title" data-reveal="up" style={{ ["--d" as string]: "80ms" }}>
                <span className="text-blue">Rent it.</span> <span className="text-green">Buy it.</span>
                <br />
                Drive away today.
              </h1>
              <p className="hero__lead" data-reveal="up" style={{ ["--d" as string]: "160ms" }}>
                Flexible daily, weekly and monthly car rental plus hand-picked quality used cars for sale in{" "}
                {site.address.city}. Book in minutes on WhatsApp.
              </p>
            </div>

            <div className="hero__copy hero__copy--bottom">
              <div className="hero__actions" data-reveal="up" style={{ ["--d" as string]: "220ms" }}>
                <a href="#booking" className="btn btn--gradient btn--lg">
                  <CalendarIcon size={20} /> Book a Car
                </a>
                <a href={whatsappLink("Hi YM Cars, I'd like a quote please.")} className="btn btn--outline btn--lg" target="_blank" rel="noopener">
                  <WhatsAppIcon size={20} /> WhatsApp Quote
                </a>
              </div>
              <HeroSearch />
            </div>

            <div className="hero__visual">
              <div className="hero__ring" aria-hidden />
              <div className="hero__photo">
                <HeroSlider />
              </div>
              <div className="float-card float-card--1" aria-hidden>
                <KeyIcon size={18} /> <div><strong>Rentals</strong><span>Daily · Weekly · Monthly</span></div>
              </div>
              <div className="float-card float-card--2" aria-hidden>
                <ShieldIcon size={18} /> <div><strong>Checked</strong><span>Inspected used cars</span></div>
              </div>
            </div>
          </div>

          <a href="#services" className="hero__scroll" aria-label="Scroll to services">
            <span />
          </a>
        </section>

        {/* ---------- USP STRIP ---------- */}
        <section className="usp" aria-label="Why YM Cars">
          <div className="container usp__grid">
            {[
              [ClockIcon, "Same-day rental", "Subject to availability"],
              [ShieldIcon, "Inspected cars", "History checked"],
              [SwapIcon, "Part exchange", "Fair valuations"],
              [WhatsAppIcon, "Fast replies", "Book via WhatsApp"],
            ].map(([Icon, t, s], i) => {
              const I = Icon as typeof ClockIcon;
              return (
                <div key={t as string} className="usp__item" data-reveal="up" style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <span className="usp__icon"><I size={22} /></span>
                  <div><strong>{t as string}</strong><span>{s as string}</span></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- SERVICES ---------- */}
        <section id="services" className="section" aria-labelledby="services-title">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <span className="eyebrow">Our Services</span>
              <h2 id="services-title">Two ways to get you on the road</h2>
              <p>Whether you need a car for a week or for keeps, YM Cars has you covered.</p>
            </div>
            <div className="services">
              <article className="service-card service-card--blue" data-reveal="left">
                <div className="service-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/service-rental.webp" alt="Blue Toyota Prius available for rental" width={900} height={675} loading="lazy" decoding="async" />
                </div>
                <span className="service-card__icon"><KeyIcon size={30} /></span>
                <h3>Car Rental</h3>
                <p>Clean, reliable cars for every need: daily hire, weekly rental, long-term monthly deals and replacement vehicles.</p>
                <ul className="checklist">
                  <li><CheckIcon size={16} /> Daily, weekly &amp; monthly rates</li>
                  <li><CheckIcon size={16} /> Economy, saloon, SUV &amp; 7-seaters</li>
                  <li><CheckIcon size={16} /> Simple booking, quick handover</li>
                </ul>
                <a href="#rentals" className="link-arrow">View rental fleet <ArrowIcon size={16} /></a>
              </article>
              <article className="service-card service-card--green" data-reveal="right">
                <div className="service-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/service-sales.webp" alt="White Toyota Land Cruiser for sale" width={900} height={675} loading="lazy" decoding="async" />
                </div>
                <span className="service-card__icon"><TagIcon size={30} /></span>
                <h3>Cars for Sale</h3>
                <p>Quality used cars at honest prices. Every car is inspected and history checked, and part exchange is welcome.</p>
                <ul className="checklist">
                  <li><CheckIcon size={16} /> Hand-picked, inspected stock</li>
                  <li><CheckIcon size={16} /> Part exchange welcome</li>
                  <li><CheckIcon size={16} /> Viewings &amp; test drives</li>
                </ul>
                <a href="#for-sale" className="link-arrow">Browse cars for sale <ArrowIcon size={16} /></a>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- RENTAL FLEET ---------- */}
        <section id="rentals" className="section section--alt" aria-labelledby="rentals-title">
          <div className="container">
            <div className="section-head section-head--row" data-reveal="up">
              <div>
                <span className="eyebrow eyebrow--blue">Car Rental</span>
                <h2 id="rentals-title">Our rental fleet</h2>
              </div>
              <a href="#booking" className="btn btn--ghost btn--sm">Book a rental <ArrowIcon size={16} /></a>
            </div>
            <div className="cards">
              {rentalFleet.map((c, i) => (
                <article key={c.id} className="car-card" data-reveal="up" style={{ ["--d" as string]: `${i * 90}ms` }}>
                  <div className="car-card__media car-card__media--blue">
                    <span className="badge badge--blue">{c.category}</span>
                    <CarArt shape={c.shape} color="blue" className="car-card__art" />
                  </div>
                  <div className="car-card__body">
                    <h3>{c.category}</h3>
                    <p className="muted small">{c.example}</p>
                    <ul className="specs">
                      <li><SeatIcon size={15} /> {c.seats} seats</li>
                      <li><GearIcon size={15} /> {c.gearbox}</li>
                      <li><FuelIcon size={15} /> {c.fuel}</li>
                    </ul>
                    <div className="car-card__foot">
                      <div className="price">
                        <span className="price__from">from</span>
                        <strong>{gbp(c.pricePerDay)}</strong><span>/day</span>
                        <span className="price__alt">{gbp(c.pricePerWeek)} / week</span>
                      </div>
                      <EnquireButton detail={{ service: "rent", category: c.category }}>Book</EnquireButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CARS FOR SALE ---------- */}
        <section id="for-sale" className="section" aria-labelledby="sale-title">
          <div className="container">
            <div className="section-head section-head--row" data-reveal="up">
              <div>
                <span className="eyebrow">Cars for Sale</span>
                <h2 id="sale-title">Quality used Toyota cars</h2>
                <p className="muted section-sub">{stock.length} cars in stock: Prius, Corolla, C-HR, Land Cruiser and more.</p>
              </div>
              <a href={whatsappLink("Hi YM Cars, can you send me your full stock list?")} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">
                <WhatsAppIcon size={16} /> Ask about a car
              </a>
            </div>
            <StockSection />
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="section section--dark" aria-labelledby="how-title">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <span className="eyebrow">How It Works</span>
              <h2 id="how-title">On the road in 3 easy steps</h2>
            </div>
            <ol className="steps">
              {[
                ["Choose", "Pick a rental car or a car for sale that suits you."],
                ["Book", "Send the booking form or WhatsApp us. We confirm fast."],
                ["Drive", "Collect your keys and drive away with confidence."],
              ].map(([t, d], i) => (
                <li key={t} className="step" data-reveal="up" style={{ ["--d" as string]: `${i * 120}ms` }}>
                  <span className="step__num">0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- BOOKING ---------- */}
        <section id="booking" className="section booking" aria-labelledby="booking-title">
          <div className="container booking__inner">
            <div className="booking__copy" data-reveal="left">
              <span className="eyebrow">Book Online</span>
              <h2 id="booking-title">Book your car or send an enquiry</h2>
              <p>
                Fill in the form and your request is sent straight to our team on WhatsApp. Calls are answered 9am–6pm, 7 days a week. WhatsApp messages are welcome anytime.
              </p>
              <ul className="checklist checklist--lg">
                <li><CheckIcon size={18} /> No booking fees</li>
                <li><CheckIcon size={18} /> Quick confirmation</li>
                <li><CheckIcon size={18} /> Friendly, local team</li>
              </ul>
              <div className="contact-tiles">
                <a href={site.phoneHref} className="contact-tile">
                  <span className="contact-tile__icon contact-tile__icon--blue"><PhoneIcon size={20} /></span>
                  <span><small>Call us</small><strong>{site.phoneDisplay}</strong></span>
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener" className="contact-tile">
                  <span className="contact-tile__icon contact-tile__icon--green"><WhatsAppIcon size={20} /></span>
                  <span><small>WhatsApp</small><strong>{site.whatsappDisplay}</strong></span>
                </a>
              </div>
            </div>
            <div className="booking__card" data-reveal="right">
              <BookingForm />
            </div>
          </div>
        </section>

        <GoogleReviews />

        {/* ---------- FAQ ---------- */}
        <section className="section" aria-labelledby="faq-title">
          <div className="container container--narrow">
            <div className="section-head" data-reveal="up">
              <span className="eyebrow">FAQ</span>
              <h2 id="faq-title">Frequently asked questions</h2>
            </div>
            <div className="faq">
              {faqs.map((f, i) => (
                <details key={f.q} className="faq__item" data-reveal="up" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <summary>{f.q}<span className="faq__plus" aria-hidden /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- MAP / CONTACT ---------- */}
        <section id="contact" className="section section--alt" aria-labelledby="contact-title">
          <div className="container contact">
            <div className="contact__info" data-reveal="left">
              <span className="eyebrow">Find Us</span>
              <h2 id="contact-title">Visit or contact YM Cars</h2>
              <ul className="contact__list">
                <li>
                  <PinIcon size={20} />
                  <div><strong>Address</strong><span>{[site.address.street, site.address.city, site.address.postcode].filter(Boolean).join(", ")}</span></div>
                </li>
                <li>
                  <PhoneIcon size={20} />
                  <div><strong>Phone</strong><a href={site.phoneHref}>{site.phoneDisplay}</a></div>
                </li>
                <li>
                  <WhatsAppIcon size={20} />
                  <div><strong>WhatsApp</strong><a href={whatsappLink()} target="_blank" rel="noopener">{site.whatsappDisplay}</a><span className="small muted">Available 24/7</span></div>
                </li>
                {site.email && (
                  <li>
                    <MailIcon size={20} />
                    <div><strong>Email</strong><a href={`mailto:${site.email}`}>{site.email}</a></div>
                  </li>
                )}
                <li>
                  <ClockIcon size={20} />
                  <div>
                    <strong>Opening hours</strong>
                    {site.hours.map((h) => (
                      <span key={h.days} className="hours-row"><span>{h.days}</span><span>{h.time}</span></span>
                    ))}
                    <span className="hours-note">{hoursNote()}</span>
                  </div>
                </li>
              </ul>
              <a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="btn btn--blue"
              >
                <PinIcon size={18} /> Get Directions
              </a>
            </div>
            <div className="contact__map" data-reveal="right">
              <iframe
                title={`Map showing ${site.name} location`}
                src={site.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
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
              <li><a href="#rentals">Car Rental</a></li>
              <li><a href="#for-sale">Cars for Sale</a></li>
              <li><a href="#booking">Book Now</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
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

      <FloatingButtons />
    </>
  );
}
