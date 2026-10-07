import { Link } from 'wouter';
import { ArrowLeft, FileText, ShieldCheck, XCircle } from 'lucide-react';
import { contactInfo } from '@/data';

type Policy = {
  icon: typeof FileText;
  label: string;
  title: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const updated = '7 October 2026';

const policies: Record<'terms' | 'cancellation' | 'privacy', Policy> = {
  terms: {
    icon: FileText, label: 'Terms & conditions', title: 'Clear plans begin with clear terms.',
    intro: 'These terms explain how enquiries and bookings are handled through this website. Your confirmed quote and booking communication will contain the trip-specific details that apply to your journey.',
    sections: [
      { heading: 'Enquiries and availability', paragraphs: ['Submitting an enquiry or sending a WhatsApp message does not reserve a vehicle, tour, seat, hotel, or service. Availability is confirmed by Dhruva Tours & Travels after reviewing your dates, route, group size and other requirements.'] },
      { heading: 'Quotes and booking confirmation', paragraphs: ['A displayed starting rate is not a final booking price. Your final quote may depend on the selected vehicle, travel dates, route, tolls, parking, driver allowance, accommodation, meals, taxes and any other agreed requirements.', 'A booking is confirmed only when Dhruva Tours & Travels provides written confirmation and the agreed booking requirements have been completed.'] },
      { heading: 'Traveller information', paragraphs: ['Please provide accurate contact, pickup, destination, travel-date and passenger information. Tell the team about schedule changes, special requirements, additional stops, luggage needs or accessibility requirements as early as possible.'] },
      { heading: 'Changes to a journey', paragraphs: ['Route, timing, passenger count, vehicle and itinerary changes may affect availability and the final price. Please request changes through the contact channel used for your booking so the team can confirm them in writing.'] },
      { heading: 'Third-party services', paragraphs: ['Where accommodation, meals, entry tickets or other third-party services are included in a quote, their availability and their own terms may apply. Ask the team to identify these services in your final quote.'] },
      { heading: 'Questions', paragraphs: [`For questions about a quote or booking, contact us at ${contactInfo.phone} or ${contactInfo.email}.`] },
    ],
  },
  cancellation: {
    icon: XCircle, label: 'Cancellation & refund policy', title: 'Plans can change. Let us know early.',
    intro: 'Cancellation charges, advance-payment requirements and refund timelines depend on the final trip, vehicle, dates and any third-party arrangements. These details will be confirmed in writing before a booking is finalised.',
    sections: [
      { heading: 'Before booking', paragraphs: ['Before you make a payment, ask for the written cancellation terms that apply to your exact booking. This should include the booking amount, applicable cancellation charges, any non-refundable third-party costs and the refund method or timeline.'] },
      { heading: 'Cancelling or changing a confirmed booking', paragraphs: ['To request a cancellation or change, contact Dhruva Tours & Travels using the phone number, email or WhatsApp details associated with your booking. Include your name, travel date, route and booking reference if one has been provided.', 'The team will confirm the applicable amount and next steps after reviewing your written booking terms and any third-party commitments.'] },
      { heading: 'Refunds', paragraphs: ['If a refund is due under your confirmed booking terms, the team will confirm the amount, payment method and expected processing timeline in writing. Bank or payment-provider processing may take additional time.'] },
      { heading: 'No-show and late changes', paragraphs: ['A no-show, late change, or change after a third-party service has been committed may affect eligibility for a refund. The applicable outcome will follow the terms confirmed for that booking.'] },
      { heading: 'Need help?', paragraphs: [`For help with a cancellation or a booking change, contact us at ${contactInfo.phone} or ${contactInfo.email}.`] },
    ],
  },
  privacy: {
    icon: ShieldCheck, label: 'Privacy policy', title: 'Your trip details stay focused on your trip.',
    intro: 'This policy explains how this website handles information you choose to submit through its enquiry forms and WhatsApp links.',
    sections: [
      { heading: 'Information you provide', paragraphs: ['When you use an enquiry form, you may provide your name, mobile number, destination, travel date, group size, pickup location and trip requirements.'] },
      { heading: 'How enquiries work', paragraphs: ['This website prepares your enquiry as a WhatsApp message. The form does not currently submit your details to a separate website database. Your message is sent only when you choose to send it through WhatsApp.'] },
      { heading: 'How information may be used', paragraphs: ['Information you send to Dhruva Tours & Travels may be used to respond to your enquiry, prepare a quote, arrange a booking, communicate about a confirmed journey or provide support.'] },
      { heading: 'Third-party services', paragraphs: ['WhatsApp and any links to other websites are operated by their respective providers. Their privacy terms may apply when you use those services.'] },
      { heading: 'Contact', paragraphs: [`For questions about privacy or your enquiry information, contact us at ${contactInfo.email}.`] },
    ],
  },
};

function PolicyPage({ type }: { type: keyof typeof policies }) {
  const policy = policies[type];
  const Icon = policy.icon;
  return <main className="min-h-screen pb-20 pt-36 sm:pt-40"><article className="mx-auto max-w-3xl px-4 sm:px-6"><Link href="/" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" />Back to home</Link><header className="border-b border-border pb-9"><Icon className="mb-5 h-8 w-8 text-primary" /><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{policy.label}</p><h1 className="text-4xl leading-tight sm:text-5xl">{policy.title}</h1><p className="mt-5 text-base leading-8 text-muted-foreground">{policy.intro}</p><p className="mt-5 text-xs text-muted-foreground">Last updated: {updated}</p></header><div className="space-y-9 py-10">{policy.sections.map((section) => <section key={section.heading}><h2 className="text-2xl">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-muted-foreground">{paragraph}</p>)}</section>)}</div><aside className="rounded-xl border border-primary/20 bg-card p-6"><h2 className="text-xl">Booking-specific details</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Your written quote and booking confirmation take priority for the services, price, payment, cancellation and refund conditions that apply to your particular trip.</p></aside></article></main>;
}

export function Terms() { return <PolicyPage type="terms" />; }
export function Cancellation() { return <PolicyPage type="cancellation" />; }
export function Privacy() { return <PolicyPage type="privacy" />; }
