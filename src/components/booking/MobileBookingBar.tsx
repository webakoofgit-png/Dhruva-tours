import { useEffect, useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { cars, contactInfo, packages } from '@/data';
import { getUrbaniaService } from '@/data/urbania';
import { whatsappLink } from '@/lib/whatsapp';
import { TripEnquiryForm } from './TripEnquiryForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function MobileBookingBar() {
  const [location] = useLocation();
  const search = useSearch();
  const [open, setOpen] = useState(false);
  const pkg = packages.find((item) => location === `/packages/${item.slug}`);
  const car = cars.find((item) => location === `/cars/${item.id}`);
  const service = location === '/urbania' ? getUrbaniaService(search) : undefined;
  const title = pkg?.title ?? car?.name ?? (location === '/urbania' ? `Urbania${service ? ` — ${service.title}` : ' travel'}` : 'a custom trip');
  const destination = pkg ? pkg.title.split(' to ').slice(1).join(' to ') : '';
  const action = 'flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary';

  useEffect(() => { setOpen(false); }, [location, search]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <nav aria-label="Quick booking" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className={`${action} text-foreground hover:bg-primary/5`}><Phone aria-hidden="true" className="h-5 w-5" />Call</a>
        <a href={whatsappLink(`Hello Dhruva Travels, I would like to enquire about ${title}. Please share availability and a quote.`)} target="_blank" rel="noreferrer" className={`${action} border-x border-border text-primary hover:bg-primary/5`}><MessageCircle aria-hidden="true" className="h-5 w-5" />WhatsApp</a>
        <DialogTrigger className={`${action} bg-primary text-primary-foreground hover:bg-primary/90`}><CalendarDays aria-hidden="true" className="h-5 w-5" />Book Now</DialogTrigger>
      </nav>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] rounded-xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="pr-7 text-2xl font-serif">Plan your booking</DialogTitle>
          <DialogDescription>Share your trip details to request availability and a quote.</DialogDescription>
        </DialogHeader>
        <TripEnquiryForm key={`${location}-${search}`} packageTitle={title} destination={destination} />
      </DialogContent>
    </Dialog>
  );
}
