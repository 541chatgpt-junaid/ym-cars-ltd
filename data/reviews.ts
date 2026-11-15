// Google reviews copied by hand from the YM CARS LTD Google Business listing (15 Nov 2026).
// Add each review exactly as it appears on Google. The cards on the homepage
// update automatically. (When GOOGLE_PLACES_API_KEY is set, live reviews are used instead.)
// Reviews that Google cuts off with "More" end with "…": only the visible part is copied.

export type ManualReview = {
  author: string; // reviewer name as shown on Google
  rating: number; // 1–5 stars
  when: string; // as shown on Google when copied, e.g. "2 months ago"
  text: string; // review text, word for word
};

// Overall rating and review count shown on the Google listing.
export const googleRating = 5.0;
export const googleReviewCount = 11;

export const manualReviews: ManualReview[] = [
  {
    author: "Hamzah",
    rating: 5,
    when: "a day ago",
    text: "Really good experience with YM Cars. The team have been very helpful, friendly and professional from the start. The car was provided in good condition, and the whole rental process was smooth and straightforward. They’re always happy to …",
  },
  {
    author: "Purushottam Giri",
    rating: 5,
    when: "2 days ago",
    text: "I would like to give a special shoutout to YM Cars and, in particular, to Umar for the outstanding customer service and support he provided throughout my experience of renting a private hire vehicle. …",
  },
  {
    author: "Sajjad H",
    rating: 5,
    when: "2 weeks ago",
    text: "I picked up a Kia Niro off these guys and the service and communication has been excellent. The car was in top condition when I got it. I’ve had it for nearly 6 weeks and no problems at all with the car.",
  },
  {
    author: "Jason Chandler",
    rating: 5,
    when: "2 weeks ago",
    text: "Best private hire rental in the game thankyou Umar 10/10 cars 10/10 customer service",
  },
  {
    author: "Wais Mohammad Noori",
    rating: 5,
    when: "a month ago",
    text: "Great services. I spoke to someone yesterday, got documents all verified overnight, and the car collected within 24hours couldn’t complain I would recommend this company to my own family and friends.",
  },
  {
    author: "Yaqoob Ibrahim",
    rating: 5,
    when: "a month ago",
    text: "Had an excellent experience renting a 2017 Toyota Prius from YM Cars Ltd. The car was clean, reliable and exactly as described. Umar provided fantastic customer service and made the whole rental process incredibly easy and stress-free. …",
  },
  {
    author: "Farhan M",
    rating: 5,
    when: "a month ago",
    text: "Exceptional customer service from Umar YM cars provided me a car straight away and helped get me on the roads ready to earn straight away. Fast customer service and best prices for all your taxi rental needs get at YM Cars Best in the Game. 💯 …",
  },
  {
    author: "ibrahim patel",
    rating: 5,
    when: "a month ago",
    text: "Best taxi rental company with 5 star service. They have a simple and effective system in place and work very hard. They have helped me out in a difficult situation whilst my car has broken down. A bonus is they deliver the car and send the …",
  },
  {
    author: "M.U. Car Dealership",
    rating: 5,
    when: "3 weeks ago",
    text: "Umar made things easy and clear. 5 stars can't recommend enough",
  },
  {
    author: "Martin Ayiwuri",
    rating: 5,
    when: "2 weeks ago",
    text: "Very credible and good company",
  },
];
