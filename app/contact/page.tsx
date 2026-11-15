import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import RevealObserver from "@/components/RevealObserver";
import ContactForm from "@/components/ContactForm";
import { ArrowIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { hoursNote, site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} in ${site.address.city}. Call ${site.phoneDisplay} (9am–6pm, 7 days) or WhatsApp ${site.whatsappDisplay} anytime about car rental, buying or selling a car.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${site.name}`,
    description: `Call ${site.phoneDisplay} or WhatsApp ${site.whatsappDisplay}.`,
    url: "/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: `Contact ${site.name}`,
      url: `${site.url}/contact`,
      about: { "@id": `${site.url}/#business` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Contact Us", item: `${site.url}/contact` },
      ],
    },
  ],
};

export default function ContactPage() {
  const address = [site.address.street, site.address.city, site.address.postcode].filter(Boolean).join(", ");

  const cards = [
    {
      icon: PhoneIcon,
      tone: "blue",
      title: "Call us",
      value: site.phoneDisplay,
      note: "9am – 6pm, 7 days a week",
      href: site.phoneHref,
      cta: "Call now",
      external: false,
    },
    {
      icon: WhatsAppIcon,
      tone: "wa",
      title: "WhatsApp",
      value: site.whatsappDisplay,
      note: "Message us anytime, 24/7",
      href: whatsappLink("Hi YM Cars, I have a question."),
      cta: "Start chat",
      external: true,
    },
    site.email
      ? {
          icon: MailIcon,
          tone: "green",
          title: "Email",
          value: site.email,
          note: "We reply as soon as we can",
          href: `mailto:${site.email}`,
          cta: "Send email",
          external: false,
        }
      : null,
    {
      icon: PinIcon,
      tone: "dark",
      title: "Find us",
      value: address,
      note: "See us on Google Maps",
      href: site.googleMapsUrl,
      cta: "Get directions",
      external: true,
    },
  ].filter(Boolean) as {
    icon: typeof PhoneIcon; tone: string; title: string; value: string; note: string; href: string; cta: string; external: boolean;
  }[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RevealObserver />
      <Header />

      <main id="top">
        {/* ---------- BANNER ---------- */}
        <section className="page-hero" aria-labelledby="contact-page-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="page-hero__bg" src="/images/service-rental.webp" alt="" width={900} height={675} fetchPriority="high" />
          <div className="container page-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-reveal="up">
              <Link href="/">Home</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">Contact Us</span>
            </nav>
            <h1 id="contact-page-title" data-reveal="up" style={{ ["--d" as string]: "80ms" }}>
              Get in <span className="text-blue">touch</span> <span className="text-green">with us</span>
            </h1>
            <p data-reveal="up" style={{ ["--d" as string]: "160ms" }}>
              Questions about renting, buying or selling a car? Call, WhatsApp or send us a message and we&apos;ll help.
            </p>
          </div>
        </section>

        {/* ---------- CONTACT CARDS ---------- */}
        <section className="contact-cards-wrap" aria-label="Ways to contact us">
          <div className={`container contact-cards contact-cards--${cards.length}`}>
            {cards.map(({ icon: Icon, tone, title, value, note, href, cta, external }, i) => (
              <a
                key={title}
                href={href}
                className="contact-card"
                data-reveal="up"
                style={{ ["--d" as string]: `${i * 90}ms` }}
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
              >
                <span className={`contact-card__icon contact-card__icon--${tone}`}><Icon size={24} /></span>
                <h2>{title}</h2>
                <strong>{value}</strong>
                <span className="contact-card__note">{note}</span>
                <span className="contact-card__cta">{cta} <ArrowIcon size={15} /></span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- FORM + HOURS ---------- */}
        <section className="section" aria-labelledby="form-title">
          <div className="container contact-main">
            <div className="contact-main__form" data-reveal="left">
              <span className="eyebrow">Send a message</span>
              <h2 id="form-title">How can we help?</h2>
              <p className="muted">
                Fill in the form and your message goes straight to our team on WhatsApp.
              </p>
              <div className="booking__card">
                <ContactForm />
              </div>
            </div>

            <aside className="contact-main__side" data-reveal="right">
              <div className="hours-card">
                <span className="hours-card__icon"><ClockIcon size={24} /></span>
                <h3>Opening hours</h3>
                <ul>
                  {site.hours.map((h) => (
                    <li key={h.days} className="hours-row"><span>{h.days}</span><strong>{h.time}</strong></li>
                  ))}
                </ul>
                <p>{hoursNote()}</p>
              </div>

              <div className="quick-links">
                <h3>Looking for something?</h3>
                <Link href="/#for-sale"><span>Browse cars for sale</span> <ArrowIcon size={16} /></Link>
                <Link href="/#rentals"><span>See our rental fleet</span> <ArrowIcon size={16} /></Link>
                <Link href="/#booking"><span>Book a car</span> <ArrowIcon size={16} /></Link>
                <Link href="/about"><span>About YM Cars</span> <ArrowIcon size={16} /></Link>
              </div>
            </aside>
          </div>
        </section>

        {/* ---------- MAP ---------- */}
        <section className="section section--alt" aria-labelledby="map-title">
          <div className="container">
            <div className="section-head section-head--row" data-reveal="up">
              <div>
                <span className="eyebrow">Find us</span>
                <h2 id="map-title">Our location</h2>
                <p className="muted section-sub">{address}</p>
              </div>
              <a href={site.googleMapsUrl} target="_blank" rel="noopener" className="btn btn--blue btn--sm">
                <PinIcon size={16} /> Open in Google Maps
              </a>
            </div>
            <div className="contact__map contact__map--wide" data-reveal="up">
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

      <Footer />
      <FloatingButtons />
    </>
  );
}
