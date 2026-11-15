// Central business details: edit here and the whole site updates.
export const site = {
  name: "YM Cars Ltd",
  shortName: "YM Cars",
  tagline: "Car Rental & Quality Used Cars for Sale",
  description:
    "YM Cars Ltd: flexible daily, weekly and monthly car rental plus quality used cars for sale. Book online or WhatsApp us for a fast quote.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ymcarsltd.co.uk",

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
  // Google Maps embed for the YM CARS LTD business listing.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d533527.732898204!2d-3.0003773!3d52.50075!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e05fc9420425e95%3A0xf416ff2dd5a4efe8!2sYM%20CARS%20LTD!5e1!3m2!1sen!2s!4v1794710938003!5m2!1sen!2s",
  // Direct link to the Google Business listing (CID taken from the embed above).
  googleMapsUrl: "https://maps.google.com/?cid=17588525967065018344",
  // Text used to find the listing in the Google Places API when GOOGLE_PLACE_ID is not set.
  googlePlaceSearch: "YM CARS LTD",

  // Phone lines are open 9am–6pm, 7 days. Outside these hours customers can WhatsApp or email.
  hours: [{ days: "Monday – Sunday", time: "09:00 – 18:00" }],

  // TODO: add the client's email address. Email links appear automatically once this is set.
  email: "" as string,

  // Google Business Profile link ("Read all reviews" / "Write a review").
  googleReviewsUrl: "https://maps.google.com/?cid=17588525967065018344",
};

export const hoursNote = () =>
  `Calls 9am–6pm, 7 days a week. Outside these hours, WhatsApp ${site.email ? "or email " : ""}us anytime.`;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
