import { site } from "@/data/site";
import { GoogleIcon, StarIcon } from "./Icons";
import { googleRating, googleReviewCount, manualReviews } from "@/data/reviews";

type Review = { author: string; rating: number; text: string; when: string; photo?: string };
type ReviewData = { rating: number; total: number; reviews: Review[]; url: string };

const FIELDS = "rating,userRatingCount,reviews,googleMapsUri";

// Live Google reviews from the Google Places API (New), refreshed every 24 hours.
// Only GOOGLE_PLACES_API_KEY is required. GOOGLE_PLACE_ID is optional: without it the
// listing is found by name (site.googlePlaceSearch).
async function getReviews(): Promise<ReviewData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  const placeId = process.env.GOOGLE_PLACE_ID;

  try {
    let place: any;
    if (placeId) {
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
        headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELDS },
        next: { revalidate: 86400 },
      });
      if (!res.ok) return null;
      place = await res.json();
    } else {
      const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": FIELDS.split(",").map((f) => `places.${f}`).join(","),
        },
        body: JSON.stringify({ textQuery: site.googlePlaceSearch, regionCode: "GB", pageSize: 1 }),
        next: { revalidate: 86400 },
      });
      if (!res.ok) return null;
      place = (await res.json()).places?.[0];
    }
    if (!place) return null;

    return {
      rating: place.rating ?? 0,
      total: place.userRatingCount ?? 0,
      url: place.googleMapsUri || site.googleReviewsUrl,
      reviews: (place.reviews ?? [])
        .map((r: any) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          photo: r.authorAttribution?.photoUri,
          rating: r.rating ?? 5,
          text: r.text?.text ?? r.originalText?.text ?? "",
          when: r.relativePublishTimeDescription ?? "",
        }))
        .filter((r: Review) => r.text),
    };
  } catch {
    return null;
  }
}

const Stars = ({ n, size = 16 }: { n: number; size?: number }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} size={size} className={i < Math.round(n) ? "star--on" : "star--off"} />
    ))}
  </span>
);

export default async function GoogleReviews() {
  // Live API data when a key is set; otherwise the reviews copied into data/reviews.ts.
  const data: ReviewData = (await getReviews()) ?? {
    rating: googleRating,
    total: googleReviewCount || manualReviews.length,
    url: site.googleReviewsUrl,
    reviews: manualReviews,
  };
  const url = data.url || site.googleReviewsUrl;

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
            {data.rating > 0 ? (
              <>
                <div className="reviews__score">
                  <strong>{data.rating.toFixed(1)}</strong> <Stars n={data.rating} size={20} />
                </div>
                <span className="muted">
                  {data.total > 0 ? `Based on ${data.total} Google review${data.total === 1 ? "" : "s"}` : "Our rating on Google"}
                </span>
              </>
            ) : (
              <>
                <strong>Rated by our customers on Google</strong>
                <br />
                <span className="muted">Read genuine reviews from YM Cars customers</span>
              </>
            )}
          </div>
          <div className="reviews__actions">
            <a href={url} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">
              Read all reviews
            </a>
            <a href={url} target="_blank" rel="noopener" className="btn btn--blue btn--sm">
              Write a review
            </a>
          </div>
        </div>

        {data.reviews.length > 0 && (
          <div className="reviews__grid">
            {data.reviews.slice(0, 12).map((r, i) => (
              <figure key={i} className="review-card" data-reveal="up" style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}>
                <div className="review-card__head">
                  {r.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.photo} alt="" width={42} height={42} className="avatar" loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="avatar" aria-hidden>
                      {r.author.charAt(0)}
                    </span>
                  )}
                  <div>
                    <figcaption>{r.author}</figcaption>
                    <span className="muted small">{r.when}</span>
                  </div>
                  <GoogleIcon size={18} />
                </div>
                <Stars n={r.rating} />
                <blockquote>{r.text.length > 320 ? `${r.text.slice(0, 317)}…` : r.text}</blockquote>
                <a href={url} target="_blank" rel="noopener" className="review-card__source">{r.text.endsWith("…") ? "Read full review on Google" : "Posted on Google"}</a>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
