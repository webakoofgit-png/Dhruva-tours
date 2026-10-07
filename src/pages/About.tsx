import { Link } from 'wouter';
import { ArrowRight, Compass, MapPin, MessageCircle, Route, Users } from 'lucide-react';
import { contactInfo } from '@/data';
import { CustomerReviews } from '@/components/CustomerReviews';
import { whatsappLink } from '@/lib/whatsapp';

export default function About() {
  return (
    <main className="pb-20 pt-36 sm:pt-40">
      <section className="mx-auto mb-16 grid max-w-7xl gap-10 px-4 sm:mb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Dhruva Tours &amp; Travels</p>
          <h1 className="text-4xl leading-tight sm:text-6xl">Thoughtful travel.<br />From the first conversation.</h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">Dhruva brings together private travel routes, tour planning and Urbania enquiries for families, groups and business travellers. Whether you’re arranging a pilgrimage, a weekend away or an airport transfer, start with the journey you have in mind.</p>
          <p className="mt-5 text-base leading-8 text-muted-foreground">Explore a route, share your requirements and speak with our team about the vehicle, itinerary and quote. We want the details to be clear before you confirm your plans.</p>
          <Link href="/packages" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Explore Our Packages <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-7 sm:p-10">
          <Compass className="mb-7 h-10 w-10 text-primary" strokeWidth={1.25} />
          <h2 className="text-3xl">Different reasons to travel.<br />One place to begin.</h2>
          <ul className="my-7 space-y-4 text-sm leading-7 text-muted-foreground">
            <li>Pilgrimages and family getaways</li><li>Corporate, wedding and group travel enquiries</li><li>Airport transfers and outstation routes</li><li>Custom itineraries and Urbania services</li>
          </ul>
          <Link href="/urbania" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Discover Urbania <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our approach</p><h2 className="mb-9 text-3xl sm:text-4xl">Good planning makes a difference.</h2>
          <div className="grid gap-8 md:grid-cols-3">{[
            { icon: Users, title: 'Your requirements first', text: 'Tell us who is travelling, the places you want to visit and any specific needs. These details shape your enquiry.' },
            { icon: Route, title: 'The details in one place', text: 'Review the route, inclusions and exclusions. Discuss accommodation, meals and extra stops before finalising the plan.' },
            { icon: MessageCircle, title: 'A direct conversation', text: 'Speak with our team on WhatsApp to confirm availability, pickup arrangements, the full quote and booking terms.' },
          ].map(({ icon: Icon, title, text }) => <div key={title}><Icon className="mb-5 h-7 w-7 text-primary" /><h3 className="text-2xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
        <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Routes &amp; destinations</p><h2 className="text-3xl sm:text-4xl">Closer to your next getaway.</h2><p className="mt-5 text-sm leading-8 text-muted-foreground">Our listed routes connect Pune and Mumbai with destinations including Nashik, Shirdi, Mahabaleshwar and Lonavala. For a different destination or a multi-day plan, share your requirements with us.</p><Link href="/gallery" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Explore Travel Inspiration <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8"><MapPin className="mb-4 h-6 w-6 text-primary" /><h2 className="text-2xl">Let’s talk about your trip</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{contactInfo.address}</p><a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary">{contactInfo.phone}</a><a href={`mailto:${contactInfo.email}`} className="block break-words text-sm text-primary underline underline-offset-4">{contactInfo.email}</a><a href={whatsappLink('Hello Dhruva Travels, I would like to discuss a trip with your team.')} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Talk to Our Team <MessageCircle className="h-4 w-4" /></a></div>
      </section>
      <CustomerReviews />
    </main>
  );
}
