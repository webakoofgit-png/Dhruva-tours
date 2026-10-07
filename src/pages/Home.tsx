import { Link } from 'wouter';
import { ArrowRight, BriefcaseBusiness, CalendarDays, Clock, Compass, Heart, MessageCircle, Plane, Route, Users } from 'lucide-react';
import { packages } from '@/data';
import { tourCategories } from '@/data/tours';
import { urbaniaServices as serviceOptions } from '@/data/urbania';
import { whatsappLink } from '@/lib/whatsapp';
import { CustomerReviews } from '@/components/CustomerReviews';
import { travelMedia } from '@/data/travelStories';

const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
const button = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
const primaryButton = `${button} bg-primary text-primary-foreground hover:bg-primary/90`;
const eyebrow = 'mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary';
const urbaniaServices = [
  { title: 'Corporate', icon: BriefcaseBusiness, description: 'Team outings and business travel.' },
  { title: 'Family', icon: Users, description: 'Time together, wherever you go.' },
  { title: 'Wedding', icon: Heart, description: 'Travel plans for your wedding guests.' },
  { title: 'Airport Pickup / Drop', icon: Plane, description: 'Group transfers to and from the airport.' },
  { title: 'Outstation', icon: Route, description: 'City escapes and longer journeys.' },
  { title: 'Private Tours', icon: Compass, description: 'Your group, your route, your pace.' },
];

export default function Home() {
  const featured = ['pune-shirdi', 'pune-mahabaleshwar', 'pune-nashik']
    .flatMap((slug) => packages.filter((pkg) => pkg.slug === slug));

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#201c16] text-white">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&auto=format&fit=crop" alt="Mountain landscape beneath an open sky" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        <div className={`${container} pb-16 pt-44 sm:pb-24 sm:pt-52`}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Dhruva Tours &amp; Travels</p>
          <h1 className="max-w-3xl text-4xl leading-[1.12] sm:text-6xl lg:text-7xl">Good journeys.<br />Great memories.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/85 sm:text-lg">From a peaceful pilgrimage to a family escape, explore tour packages and Urbania travel for the moments that matter.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/packages" className={primaryButton}>Explore Packages <ArrowRight className="h-4 w-4" /></Link>
            <a href="#custom-trip" className={`${button} border border-white/40 bg-white/10 text-white hover:bg-white/20`}>Plan Your Custom Trip</a>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/20 pt-6 text-sm text-white/80">
            <a href="#featured-packages" className="inline-flex items-center gap-2 hover:text-white"><Compass className="h-4 w-4" /> Tour packages</a>
            <a href="#upcoming-trips" className="inline-flex items-center gap-2 hover:text-white"><CalendarDays className="h-4 w-4" /> Upcoming trips</a>
            <a href="#urbania" className="inline-flex items-center gap-2 hover:text-white"><Users className="h-4 w-4" /> Urbania services</a>
          </div>
        </div>
      </section>

      <section id="upcoming-trips" className={`${container} scroll-mt-28 py-16 sm:py-20`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div><span className={eyebrow}>Your next getaway</span><h2 className="text-3xl sm:text-4xl">Upcoming trips</h2></div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">Ask about our next departure, or plan around your preferred dates.</p>
        </div>
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 sm:p-9 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4"><CalendarDays className="mt-1 h-7 w-7 shrink-0 text-primary" /><div><h3 className="text-2xl">Where would you like to go next?</h3><p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">Confirmed departure dates will appear here. Share your destination and preferred dates to enquire about a trip.</p></div></div>
          <a href={whatsappLink('Hello Dhruva Travels, please share your upcoming trips, departure dates and prices.')} target="_blank" rel="noreferrer" className={`${primaryButton} shrink-0`}>Enquire About Dates <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>

      <section id="featured-packages" className="scroll-mt-28 border-y border-border bg-card py-16 sm:py-20">
        <div className={container}>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><span className={eyebrow}>Places to explore</span><h2 className="text-3xl sm:text-4xl">A journey for every mood</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">Explore our routes, review what is included, and enquire about a travel plan that suits you.</p></div><Link href="/packages" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">View All Packages <ArrowRight className="h-4 w-4" /></Link></div>
          <nav aria-label="Explore tour categories" className="mb-7 flex flex-wrap gap-2">
            {tourCategories.map((category) => (
              <Link key={category} href={`/packages?category=${encodeURIComponent(category)}`} className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-primary hover:border-primary">{category}</Link>
            ))}
          </nav>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((pkg) => (
              <article key={pkg.slug} className="flex flex-col overflow-hidden rounded-xl border border-border bg-background">
                <Link href={`/packages/${pkg.slug}`} aria-label={`View ${pkg.title} details`}><img src={pkg.image} alt={pkg.title} loading="lazy" className="aspect-[4/3] w-full object-cover" /></Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">Private travel</p>
                  <h3 className="text-2xl"><Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link></h3>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{pkg.duration} journey</p>
                  <p className="mb-6 mt-4 text-sm leading-7 text-muted-foreground">{pkg.description}</p>
                  <div className="mt-auto border-t border-border pt-5"><span className="text-xs text-muted-foreground">Starting from</span><p className="mt-1 text-2xl font-semibold">{pkg.startingPrice}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Enquire for your vehicle and final quote.</p></div>
                  <Link href={`/packages/${pkg.slug}`} className={`${primaryButton} mt-5`}>View Details <ArrowRight className="h-4 w-4" /></Link>
                  <a href={whatsappLink(`Hello Dhruva Travels, I am interested in ${pkg.title}. Please share package details, availability and a quote.`)} target="_blank" rel="noreferrer" className={`${button} mt-2 border border-foreground/20 hover:bg-primary/5`}><MessageCircle className="h-4 w-4" /> WhatsApp Enquiry</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="urbania" className={`${container} scroll-mt-28 py-16 sm:py-24`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div><span className={eyebrow}>Urbania services</span><h2 className="text-3xl leading-tight sm:text-5xl">One group.<br />One memorable journey.</h2><p className="mt-5 text-base leading-8 text-muted-foreground">Explore Urbania travel for family plans, team outings and special occasions. Tell us your group size and route to discuss the right arrangement.</p><Link href="/urbania" className={`${primaryButton} mt-7`}>Explore Urbania Services <ArrowRight className="h-4 w-4" /></Link><Link href="/cars" className="mt-5 block text-sm font-medium text-primary underline underline-offset-4">Also explore our cars</Link></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {urbaniaServices.map(({ title, icon: Icon, description }) => (
              <Link key={title} href={`/urbania?service=${serviceOptions.find((service) => service.title === title)?.id ?? ''}`} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Icon className="mb-4 h-6 w-6 text-primary" /><h3 className="text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary">Explore Service <ArrowRight className="h-3.5 w-3.5" /></span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-14" aria-label="How booking works">
        <div className={`${container} grid gap-8 md:grid-cols-3`}>
          {[
            { step: '01', title: 'Find your trip', text: 'Browse destinations and read the route, itinerary and inclusions.' },
            { step: '02', title: 'Make it yours', text: 'Send your travel dates, pickup point and group size on WhatsApp.' },
            { step: '03', title: 'Confirm with our team', text: 'Discuss availability, the final quote and booking terms before confirming.' },
          ].map((item) => <div key={item.step}><span className="text-sm font-semibold text-primary">{item.step} /</span><h3 className="mb-3 mt-3 text-2xl">{item.title}</h3><p className="text-sm leading-7 text-muted-foreground">{item.text}</p></div>)}
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><span className={eyebrow}>The travel journal</span><h2 className="text-3xl sm:text-4xl">A little inspiration for the road.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Explore travel inspiration and our growing collection of trip memories.</p></div><Link href="/gallery" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Explore Gallery <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-5 sm:grid-cols-3">{travelMedia.slice(0, 3).map((item) => <Link key={item.id} href="/gallery" className="overflow-hidden rounded-xl border border-border bg-card"><img src={item.type === 'photo' ? item.src : item.poster} alt={item.type === 'photo' ? item.alt : item.title} loading="lazy" className="aspect-[4/3] w-full object-cover" /><div className="p-5"><p className="mb-2 text-xs font-medium text-primary">{item.category}</p><h3 className="text-xl">{item.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.caption}</p></div></Link>)}</div>
      </section>

      <CustomerReviews />

      <section className={`${container} grid gap-8 pt-16 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
        <div><span className={eyebrow}>Meet Dhruva</span><h2 className="text-3xl sm:text-4xl">Thoughtful travel begins with a conversation.</h2><p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground">From private routes and pilgrimages to Urbania group travel, we help you explore the options and discuss the details that matter: your route, your people and your plans.</p><Link href="/about" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">About Dhruva Travels <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="rounded-xl border border-border bg-card p-7"><h3 className="text-2xl">Your next journey starts here.</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Explore the itinerary, share your dates and confirm the quote with our team before booking.</p><Link href="/packages" className={`${primaryButton} mt-5`}>Find Your Trip <ArrowRight className="h-4 w-4" /></Link></div>
      </section>

      <section id="custom-trip" className={`${container} scroll-mt-28 py-16 sm:py-20`}>
        <div className="rounded-2xl bg-[#2f251d] px-6 py-12 text-white sm:p-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Your plans, your pace</p><h2 className="text-3xl sm:text-4xl">Have a different trip in mind?</h2><p className="mt-4 text-sm leading-7 text-white/80">A family holiday, a temple visit or a weekend with friends. Share your ideas and let’s work out the details together.</p><p className="mt-5 text-xs leading-6 text-white/70">Destination · Dates · People · Pickup location</p></div>
          <a href={whatsappLink('Hello Dhruva Travels, I would like to plan a custom trip.\nName: \nDestination: \nTravel date: \nNumber of people: \nPickup location: \nAdditional requirements: ')} target="_blank" rel="noreferrer" className={`${button} mt-8 shrink-0 bg-white text-[#2f251d] hover:bg-white/90 lg:mt-0`}>Plan Your Custom Trip <MessageCircle className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
