import { site } from "@/data/site";
import { GoogleIcon, StarIcon } from "./Icons";

type Review = { author: string; rating: number; text: string; when: string; photo?: string };
type ReviewData = { rating: number; total: number; reviews: Review[]; live: boolean };

// Live Google reviews come from the Google Places API (New).
// Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the environment and reviews refresh every 24 hours.
// Without those keys, clearly labelled placeholder reviews are shown so the layout can be previewed.
async function getReviews(): Promise<ReviewData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (key && placeId) {
    try {
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 },
      });
      if (res.ok) {
        const d = await res.json();
        return {
          live: true,
          rating: d.rating ?? 5,
          total: d.userRatingCount ?? 0,
          reviews: (d.reviews ?? []).map((r: any) => ({
            author: r.authorAttribution?.displayName ?? "Google user",
            photo: r.authorAttribution?.photoUri,
            rating: r.rating ?? 5,
            text: r.text?.text ?? r.originalText?.text ?? "",
            when: r.relativePublishTimeDescription ?? "",
          })),
        };
      }
    } catch {
      /* fall through to placeholders */
    }
  }
  return {
    live: false,
    rating: 5,
    total: 0,
    reviews: [
      { author: "Sample Review", rating: 5, when: "Placeholder", text: "Rented a 7-seater for a family trip. The car was spotless and the booking over WhatsApp took minutes. Will use again." },
      { author: "Sample Review", rating: 5, when: "Placeholder", text: "Bought my first car here. No pressure, honest advice, and they took my old car in part-exchange at a fair price." },
      { author: "Sample Review", rating: 5, when: "Placeholder", text: "Needed a car at short notice after an accident. Sorted the same day. Friendly team and great communication." },
    ],
  };
}

const Stars = ({ n }: { n: number }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} size={16} className={i < Math.round(n) ? "star--on" : "star--off"} />
    ))}
  </span>
);

export default async function GoogleReviews() {
  const data = await getReviews();
  return (
    <section id="reviews" className="section section--alt" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Google Reviews</span>
          <h2 id="reviews-title">What our customers say</h2>
        </div>

        <div className="reviews__summary" data-reveal="up">
          <GoogleIcon size={36} />
          <div>
            {data.live && (
              <div className="reviews__score">
                <strong>{data.rating.toFixed(1)}</strong> <Stars n={data.rating} />
              </div>
            )}
            <span className="muted">{data.live ? `Based on ${data.total} Google reviews` : "Live Google rating appears here once connected"}</span>
          </div>
          <a href={site.googleReviewsUrl} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">
            Read all reviews
          </a>
        </div>

        {!data.live && (
          <p className="reviews__notice">Preview only: these are placeholder reviews. Real Google reviews load automatically when the Google Places API key is added.</p>
        )}

        <div className="reviews__grid">
          {data.reviews.slice(0, 6).map((r, i) => (
            <figure key={i} className="review-card" data-reveal="up" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <div className="review-card__head">
                <span className="avatar" aria-hidden>
                  {r.author.charAt(0)}
                </span>
                <div>
                  <figcaption>{r.author}</figcaption>
                  <span className="muted small">{r.when}</span>
                </div>
                <GoogleIcon size={18} />
              </div>
              <Stars n={r.rating} />
              <blockquote>{r.text}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
