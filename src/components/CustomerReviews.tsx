import { ExternalLink, MessageCircle, Quote, Star } from 'lucide-react';
import { customerReviews, googleReviewLinks } from '@/data/travelStories';
import { whatsappLink } from '@/lib/whatsapp';

export function CustomerReviews() {
  return (
    <section id="reviews" className="scroll-mt-32 border-y border-border bg-card py-16 sm:py-20" aria-label="Customer reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Traveller feedback</p>
          <h2 className="text-3xl sm:text-4xl">Every journey has a story.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Experiences shared by the people who travel with us.</p>
        </div>
        {customerReviews.length > 0 ? (
          <div className="mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {customerReviews.map((review) => (
              <figure key={review.id} className="flex flex-col rounded-xl border border-border bg-background p-6">
                <Quote aria-hidden="true" className="mb-4 h-6 w-6 text-primary" />
                {review.rating != null && <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><Star aria-hidden="true" className="h-4 w-4" />{review.rating} / 5</p>}
                <blockquote className="mb-6 text-sm leading-7">{review.text}</blockquote>
                <figcaption className="mt-auto border-t border-border pt-4"><p className="font-semibold">{review.name}</p>{review.trip && <p className="mt-1 text-xs text-muted-foreground">{review.trip}</p>}{review.sourceUrl ? <a href={review.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-medium text-primary">{review.source} <ExternalLink className="h-3 w-3" /></a> : <p className="mt-2 text-xs text-muted-foreground">{review.source}</p>}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-border bg-background p-6 sm:p-8">
            <MessageCircle className="mb-4 h-7 w-7 text-primary" />
            <h3 className="text-2xl">Travelled with Dhruva?</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Customer stories will appear here as they are added. We’d love to hear about your journey, the moments you enjoyed and what we could improve.</p>
            <a href={whatsappLink('Hello Dhruva Travels, I would like to share feedback about my trip.\nTravel date: \nDestination: \nMy feedback: ')} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Share Your Experience <MessageCircle className="h-4 w-4" /></a>
          </div>
        )}
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div><h3 className="text-2xl">Google Reviews</h3><p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{googleReviewLinks.profile ? 'Read customer feedback on our Google Business Profile.' : 'Ask our team for our Google review link to read or share feedback.'}</p></div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href={googleReviewLinks.profile ?? whatsappLink('Hello Dhruva Travels, please share your official Google Business Profile / Google Reviews link.')} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5">{googleReviewLinks.profile ? 'Read Google Reviews' : 'Request Review Link'}<ExternalLink className="h-4 w-4" /></a>
            {googleReviewLinks.writeReview && <a href={googleReviewLinks.writeReview} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Write a Review <ExternalLink className="h-4 w-4" /></a>}
          </div>
        </div>
      </div>
    </section>
  );
}
