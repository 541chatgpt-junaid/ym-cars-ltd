// Google reviews copied by hand from the YM CARS LTD Google Business listing.
// Add each review exactly as it appears on Google. The cards on the homepage
// update automatically. (When GOOGLE_PLACES_API_KEY is set, live reviews are used instead.)

export type ManualReview = {
  author: string; // reviewer name as shown on Google
  rating: number; // 1–5 stars
  when: string; // e.g. "2 months ago"
  text: string; // review text, word for word
};

// Overall rating shown on the Google listing (checked on Google Maps: 5.0).
export const googleRating = 5.0;
// Total number of Google reviews. Set this to the number shown on the listing.
export const googleReviewCount = 0;

export const manualReviews: ManualReview[] = [
  // { author: "Name", rating: 5, when: "1 month ago", text: "Review text..." },
];
