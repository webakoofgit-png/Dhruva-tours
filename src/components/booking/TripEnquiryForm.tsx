import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/whatsapp';

export function TripEnquiryForm({ packageTitle, destination }: { packageTitle: string; destination: string }) {
  const [error, setError] = useState('');
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const fieldClass = 'mt-2 min-h-12 w-full rounded-lg border border-border bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(Array.from(data.entries(), ([key, value]) => [key, String(value).trim()]));
    const digits = values.mobile.replace(/\D/g, '');
    if (!values.name || !values.destination || !values.pickup || digits.length < 7 || digits.length > 15) {
      setError('Please enter your name, destination, pickup location and a valid mobile number (7 to 15 digits).');
      return;
    }
    if (values.date < today || !Number.isInteger(Number(values.people)) || Number(values.people) < 1) {
      setError('Choose today or a future travel date and enter at least one traveller.');
      return;
    }
    setError('');
    const message = [
      `Hello Dhruva Travels, I would like to enquire about ${packageTitle}.`,
      `Name: ${values.name}`, `Mobile: ${values.mobile}`, `Destination: ${values.destination}`,
      `Travel date: ${values.date}`, `People: ${values.people}`, `Pickup location: ${values.pickup}`,
      values.notes ? `Additional requirements: ${values.notes}` : '',
      'Please confirm availability, inclusions and the final quote.',
    ].filter(Boolean).join('\n');
    window.location.assign(whatsappLink(message));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm leading-6 text-muted-foreground">Enquiring about <strong className="text-foreground">{packageTitle}</strong></p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Name *<input name="name" autoComplete="name" required maxLength={100} className={fieldClass} /></label>
        <label className="text-sm font-medium">Mobile *<input name="mobile" type="tel" autoComplete="tel" required maxLength={25} className={fieldClass} /></label>
        <label className="text-sm font-medium">Destination *<input name="destination" defaultValue={destination} required maxLength={150} className={fieldClass} /></label>
        <label className="text-sm font-medium">Travel date *<input name="date" type="date" min={today} required className={`${fieldClass} [color-scheme:light]`} /></label>
        <label className="text-sm font-medium">Number of people *<input name="people" type="number" inputMode="numeric" min={1} step={1} required className={fieldClass} /></label>
        <label className="text-sm font-medium">Pickup location *<input name="pickup" required maxLength={200} placeholder="Area, city or airport" className={fieldClass} /></label>
      </div>
      <label className="block text-sm font-medium">Additional requirements <span className="font-normal text-muted-foreground">(optional)</span><textarea name="notes" rows={3} maxLength={1000} placeholder="Hotel, meals, vehicle preference or special requests" className={fieldClass} /></label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"><MessageCircle className="h-4 w-4" />Continue on WhatsApp</button>
      <p className="text-xs leading-6 text-muted-foreground">Your details will open in WhatsApp. Press Send there to share your enquiry. This does not confirm a booking; our team will confirm availability, price and payment terms. Read our <a href="/privacy-policy" className="text-primary underline underline-offset-2">Privacy Policy</a>.</p>
    </form>
  );
}
