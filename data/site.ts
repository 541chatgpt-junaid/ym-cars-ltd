// Central business details: edit here and the whole site updates.
export const site = {
  name: "YM Cars Ltd",
  shortName: "YM Cars",
  tagline: "Car Rental & Quality Used Cars for Sale",
  description:
    "YM Cars Ltd: flexible daily, weekly and monthly car rental plus quality used cars for sale. Book online or WhatsApp us for a fast quote.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ymcars.co.uk",

  phoneDisplay: "0121 798 4562",
  phoneHref: "tel:+441217984562",
  whatsappDisplay: "07383 393739",
  whatsappNumber: "447383393739", // international format, no "+" (for wa.me links)

  // TODO: confirm the real address with the client. It powers the map and the SEO schema.
  address: {
    street: "",
    city: "Birmingham",
    postcode: "",
    country: "GB",
  },
  // Text the Google Map searches for. Change it to the full address once it is confirmed.
  mapQuery: "Birmingham, UK",

  hours: [
    { days: "Monday – Friday", time: "09:00 – 18:00" },
    { days: "Saturday", time: "09:00 – 17:00" },
    { days: "Sunday", time: "By appointment" },
  ],

  // Google Business Profile link ("Read all reviews" / "Write a review").
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=YM+Cars+Ltd",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
