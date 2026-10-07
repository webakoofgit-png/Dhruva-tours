import { useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import { ArrowRight, BriefcaseBusiness, BusFront, CalendarDays, Compass, Heart, MessageCircle, Plane, Route, Users } from 'lucide-react';
import { urbaniaServices, getUrbaniaService } from '@/data/urbania';
import { TripEnquiryForm } from '@/components/booking/TripEnquiryForm';
import { whatsappLink } from '@/lib/whatsapp';

const icons = [BriefcaseBusiness, Users, Heart, Plane, Route, Compass];
const action = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export default function Urbania() {
  const [, navigate] = useLocation();
  const selected = getUrbaniaService(useSearch());
  const enquiryTitle = selected ? `Urbania — ${selected.title}` : 'Urbania travel';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function chooseService(id: string, scroll = false) {
    navigate(id ? `/urbania?service=${encodeURIComponent(id)}` : '/urbania', { replace: true });
    if (scroll) document.getElementById('urbania-enquiry')?.scrollIntoView({ block: 'start' });
  }

  return (
    <main className="pb-20 pt-36 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Dhruva Urbania services</p>
            <h1 className="text-4xl leading-tight sm:text-6xl">More moments.<br />Together.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">Family holidays, team outings or a special celebration. Plan Urbania travel around your people, your route and your schedule.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#urbania-enquiry" className={`${action} bg-primary text-primary-foreground hover:bg-primary/90`}>Plan Your Journey <ArrowRight className="h-4 w-4" /></a>
              <a href={whatsappLink(`Hello Dhruva Travels, I would like to enquire about ${enquiryTitle}. Please share availability, seating options and pricing.`)} target="_blank" rel="noreferrer" className={`${action} border border-border hover:bg-primary/5`}><MessageCircle className="h-4 w-4" />WhatsApp Us</a>
            </div>
          </div>
          <div className="rounded-2xl bg-[#2f251d] p-7 text-white sm:p-10">
            <BusFront className="mb-8 h-12 w-12 text-[#dbc4a7]" strokeWidth={1.25} />
            <p className="text-xs uppercase tracking-[0.2em] text-white/65">Make room for your plans</p>
            <h2 className="mt-4 text-3xl leading-snug">A shared journey.<br />A personal travel plan.</h2>
            <p className="mt-5 text-sm leading-7 text-white/80">Tell us your group size and luggage needs. We’ll discuss the available vehicle configuration before you confirm.</p>
            <a href={whatsappLink('Hello Dhruva Travels, please share current Urbania exterior and interior photos, seating capacity, luggage space and available amenities.')} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">Request Vehicle Photos &amp; Details <ArrowRight className="h-4 w-4 shrink-0" /></a>
          </div>
        </header>

        <section className="py-16 sm:py-20" aria-labelledby="urbania-services-heading">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">For every occasion</p>
          <h2 id="urbania-services-heading" className="mb-8 text-3xl sm:text-4xl">How are you travelling?</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {urbaniaServices.map((service, index) => {
              const Icon = icons[index];
              return (
                <article key={service.id} className="flex flex-col rounded-xl border border-border bg-card p-6 sm:p-7">
                  <Icon className="mb-5 h-7 w-7 text-primary" />
                  <h3 className="text-2xl">{service.title}</h3>
                  <p className="mt-3 text-sm font-medium">{service.description}</p>
                  <p className="mb-6 mt-3 text-sm leading-7 text-muted-foreground">{service.detail}</p>
                  <button type="button" onClick={() => chooseService(service.id, true)} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Enquire for {service.title} <ArrowRight className="h-4 w-4" /></button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-border bg-card p-6 sm:p-9" aria-labelledby="planning-heading">
          <h2 id="planning-heading" className="mb-7 text-3xl">A few details. A clearer plan.</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Users, title: 'People & comfort', text: 'Confirm seating capacity, luggage space and amenities for the vehicle offered to your group.' },
              { icon: CalendarDays, title: 'Dates & route', text: 'Share pickup points, stops and return dates. Availability is confirmed when our team reviews your request.' },
              { icon: Route, title: 'Your complete quote', text: 'Confirm the total fare, tolls, parking, driver allowance, extra kilometres and cancellation terms before booking.' },
            ].map(({ icon: Icon, title, text }) => <div key={title}><Icon className="mb-4 h-5 w-5 text-primary" /><h3 className="text-xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></div>)}
          </div>
        </section>

        <section id="urbania-enquiry" className="grid scroll-mt-32 gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Start planning</p><h2 className="text-3xl sm:text-4xl">Where shall we take you?</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Choose your service and share the essentials. Continue on WhatsApp to send your request directly to our team.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Have multiple pickups or a longer itinerary? Add them under additional requirements.</p></div>
          <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
            <label className="mb-6 block text-sm font-medium">Urbania service
              <select value={selected?.id ?? ''} onChange={(event) => chooseService(event.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-border bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Help me choose</option>
                {urbaniaServices.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
              </select>
            </label>
            <TripEnquiryForm packageTitle={enquiryTitle} destination="" />
          </div>
        </section>
      </div>
    </main>
  );
}
