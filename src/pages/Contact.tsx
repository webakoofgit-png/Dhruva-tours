import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { cars, contactInfo, packages } from '@/data';
import { TripEnquiryForm } from '@/components/booking/TripEnquiryForm';
import { whatsappLink } from '@/lib/whatsapp';

function enquiryContext() {
  const params = new URLSearchParams(window.location.search);
  const route = packages.find((item) => item.slug === params.get('route'));
  const vehicle = cars.find((item) => item.id === params.get('vehicle'));
  const service = params.get('service');
  if (route) return { title: route.title, destination: route.title.split(' to ').slice(1).join(' to ') };
  if (vehicle) return { title: `${vehicle.name} vehicle enquiry`, destination: '' };
  if (service) return { title: `${service} enquiry`, destination: '' };
  return { title: 'a custom trip', destination: '' };
}

export default function Contact() {
  const context = enquiryContext();
  return <main className="min-h-screen pb-20 pt-36 sm:pt-40"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><header className="mb-10 max-w-2xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Talk to Dhruva</p><h1 className="text-4xl leading-tight sm:text-6xl">Let’s plan your journey.</h1><p className="mt-5 text-base leading-8 text-muted-foreground">Share your travel details and we’ll prepare your enquiry in WhatsApp. Our team can then confirm availability, the full quote and booking terms.</p></header><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16"><section className="rounded-xl border border-border bg-card p-5 sm:p-8"><h2 className="text-3xl">Send an enquiry</h2><p className="mb-7 mt-3 text-sm leading-7 text-muted-foreground">Fields marked with an asterisk are needed to request a quote.</p><TripEnquiryForm key={context.title} packageTitle={context.title} destination={context.destination} /></section><aside className="space-y-7"><section><h2 className="text-2xl">Direct contact</h2><ul className="mt-6 space-y-5 text-sm"><li className="flex gap-3"><Phone className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Call us</p><a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="mt-1 inline-block text-muted-foreground hover:text-primary">{contactInfo.phone}</a></div></li><li className="flex gap-3"><Mail className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Email</p><a href={`mailto:${contactInfo.email}`} className="mt-1 inline-block break-all text-muted-foreground hover:text-primary">{contactInfo.email}</a></div></li><li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Address</p><p className="mt-1 leading-6 text-muted-foreground">{contactInfo.address}</p></div></li><li className="flex gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Operations</p><p className="mt-1 text-muted-foreground">{contactInfo.workingHours}</p></div></li></ul></section><section className="rounded-xl bg-[#2f251d] p-6 text-white"><h2 className="text-2xl">Corporate or group travel?</h2><p className="mt-3 text-sm leading-7 text-white/75">Tell us your route, dates and group size to discuss a suitable vehicle and plan.</p><a href={whatsappLink('Hello Dhruva Travels, I would like to enquire about corporate or group travel.\nCompany/Group: \nTravel date: \nPickup location: \nDestination: \nPeople: ')} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">Start a group enquiry <MessageCircle className="h-4 w-4" /></a></section></aside></div></div></main>;
}
