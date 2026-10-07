import { useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, ArrowRight, Check, Clock, Hotel, MapPin, MessageCircle, Utensils, X } from 'lucide-react';
import { tours } from '@/data/tours';
import { whatsappLink } from '@/lib/whatsapp';
import { TripEnquiryForm } from '@/components/booking/TripEnquiryForm';
import NotFound from '@/pages/NotFound';

const action = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export default function PackageDetail() {
  const [, params] = useRoute('/packages/:slug');
  const pkg = tours.find((item) => item.slug === params?.slug);

  useEffect(() => { window.scrollTo(0, 0); }, [params?.slug]);
  if (!pkg) return <NotFound />;

  return (
    <main className="pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/packages" className="mb-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4" />Back to Packages</Link>
        <header className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">{pkg.categories.map((category) => <Link key={category} href={`/packages?category=${encodeURIComponent(category)}`} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10">{category}</Link>)}</div>
            <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">{pkg.title}</h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground">{pkg.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary"><span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{pkg.duration} approximate journey</span><span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />Private route</span></div>
            <a href="#enquire" className={`${action} mt-7 bg-primary text-primary-foreground hover:bg-primary/90`}>Book Now / Enquire <ArrowRight className="h-4 w-4" /></a>
          </div>
          <figure>
            <img src={pkg.image} alt={`Travel inspiration for ${pkg.title}`} fetchPriority="high" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">Illustrative image. Ask us for current trip and vehicle photos.</figcaption>
          </figure>
        </header>

        <nav aria-label="Package sections" className="my-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-3 text-sm font-medium text-primary">
          {[['itinerary', 'Itinerary'], ['arrangements', 'Stay, meals & pickup'], ['included', 'Inclusions'], ['photos', 'Photos'], ['enquire', 'Enquire']].map(([id, title]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center hover:underline">{title}</a>)}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <div className="min-w-0 space-y-12">
            <section id="itinerary" className="scroll-mt-32">
              <h2 className="mb-3 text-3xl">Your journey</h2>
              <p className="mb-7 text-sm leading-7 text-muted-foreground">This is a route itinerary. For a multi-day holiday or additional sightseeing, share your plans with our team.</p>
              <ol className="space-y-4">
                {pkg.itinerary.map((item, index) => (
                  <li key={`${item.day}-${index}`} className="flex gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{index + 1}</span>
                    <div><h3 className="text-xl">{item.day}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="arrangements" className="scroll-mt-32">
              <h2 className="mb-6 text-3xl">Stay, meals &amp; pickup</h2>
              <div className="space-y-4">
                {[{ title: 'Hotel & stay', icon: Hotel, text: pkg.hotel }, { title: 'Meals', icon: Utensils, text: pkg.meals }, { title: 'Pickup arrangements', icon: MapPin, text: pkg.pickup }].map(({ title, icon: Icon, text }) => (
                  <div key={title} className="flex gap-4 rounded-xl border border-border bg-card p-5 sm:p-6"><Icon className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h3 className="text-xl">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p></div></div>
                ))}
              </div>
            </section>

            <section id="included" className="scroll-mt-32">
              <h2 className="mb-6 text-3xl">What’s included</h2>
              <div className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
                <div><h3 className="mb-5 flex items-center gap-2 text-xl"><Check className="h-5 w-5 text-primary" />Inclusions</h3><ul className="space-y-3">{pkg.inclusions.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul></div>
                <div><h3 className="mb-5 flex items-center gap-2 text-xl"><X className="h-5 w-5" />Exclusions</h3><ul className="space-y-3">{pkg.exclusions.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><X className="mt-1 h-4 w-4 shrink-0" />{item}</li>)}</ul></div>
              </div>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">Confirm the inclusions and any additional charges in your final quote before booking.</p>
            </section>

            <section id="photos" className="scroll-mt-32">
              <h2 className="mb-6 text-3xl">Photos &amp; travel inspiration</h2>
              <div className="grid gap-4 sm:grid-cols-2">{pkg.photos.map((photo) => (
                <figure key={photo.src}><a href={photo.src} target="_blank" rel="noreferrer" aria-label={`Open image for ${pkg.title} in a new tab`}><img src={photo.src} alt={`Travel inspiration for ${pkg.title}`} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" /></a><figcaption className="mt-2 text-xs leading-6 text-muted-foreground">{photo.caption}</figcaption></figure>
              ))}</div>
              <a href={whatsappLink(`Hello Dhruva Travels, please share current trip and vehicle photos for ${pkg.title}.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Request Trip Photos <MessageCircle className="h-4 w-4" /></a>
            </section>

            <section id="enquire" className="scroll-mt-32 rounded-xl border border-border bg-card p-5 sm:p-8">
              <h2 className="mb-3 text-3xl">Let’s plan your journey</h2>
              <p className="mb-7 text-sm leading-7 text-muted-foreground">Share a few details to request availability and a personalised quote.</p>
              <TripEnquiryForm key={pkg.slug} packageTitle={pkg.title} destination={pkg.title.split(' to ').slice(1).join(' to ') || pkg.title} />
            </section>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl border border-primary/20 bg-card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Starting route rate</p>
              <p className="my-3 text-4xl font-serif text-primary">{pkg.startingPrice}</p>
              <p className="text-sm leading-7 text-muted-foreground">Final pricing depends on your selected vehicle, dates and travel requirements. Ask for the total quote and pricing basis before confirming.</p>
              <a href="#enquire" className={`${action} mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90`}>Book Now / Enquire <ArrowRight className="h-4 w-4" /></a>
              <a href={whatsappLink(`Hello Dhruva Travels, I would like to enquire about ${pkg.title}. Please confirm availability, inclusions and the final quote.`)} target="_blank" rel="noreferrer" className={`${action} mt-3 w-full border border-border text-primary hover:bg-primary/5`}><MessageCircle className="h-4 w-4" />WhatsApp Enquiry</a>
              <div className="mt-6 border-t border-border pt-5"><h2 className="text-lg">Before you book</h2><p className="mt-3 text-xs leading-6 text-muted-foreground">Travel dates are subject to availability. Our team will confirm pickup details, payment requirements and cancellation/refund terms before booking. Sending an enquiry does not reserve a vehicle.</p></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
