import { Link, useLocation, useSearch } from 'wouter';
import { ArrowRight, Clock, Compass, MessageCircle } from 'lucide-react';
import { tourCategories, tours, type TourCategory } from '@/data/tours';
import { whatsappLink } from '@/lib/whatsapp';

export default function Packages() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const requested = new URLSearchParams(search).get('category');
  const selected = tourCategories.find((category) => category === requested) ?? 'All';
  const filtered = selected === 'All' ? tours : tours.filter((pkg) => pkg.categories.includes(selected));

  function selectCategory(category: TourCategory | 'All') {
    navigate(category === 'All' ? '/packages' : `/packages?category=${encodeURIComponent(category)}`, { replace: true });
  }

  return (
    <main className="min-h-screen pb-20 pt-36 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Discover your next journey</p>
          <h1 className="text-4xl sm:text-6xl">Find your kind of getaway.</h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">Explore private travel routes for family breaks, pilgrimages and business trips. Review the details, then ask us to tailor the journey to your dates.</p>
        </header>

        <div role="group" aria-label="Filter tour packages by category" className="mb-6 flex flex-wrap gap-2">
          {(['All', ...tourCategories] as const).map((category) => (
            <button key={category} type="button" onClick={() => selectCategory(category)} aria-pressed={selected === category}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${selected === category ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary'}`}>
              {category}
            </button>
          ))}
        </div>
        <p role="status" className="mb-7 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? 'route' : 'routes'}{selected !== 'All' ? ` · ${selected}` : ' to explore'}</p>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((pkg) => (
              <article key={pkg.slug} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                <Link href={`/packages/${pkg.slug}`} aria-label={`View ${pkg.title}`}>
                  <img src={pkg.image} alt={`Travel inspiration for ${pkg.title}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex flex-wrap gap-2">{pkg.categories.map((category) => <span key={category} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{category}</span>)}</div>
                  <h2 className="text-2xl"><Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link></h2>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{pkg.duration} approximate journey</p>
                  <p className="mb-6 mt-4 text-sm leading-7 text-muted-foreground">{pkg.description}</p>
                  <div className="mt-auto border-t border-border pt-5">
                    <p className="text-xs text-muted-foreground">Starting route rate</p>
                    <p className="mt-1 text-2xl font-semibold">{pkg.startingPrice}</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">Final quote depends on vehicle and travel requirements.</p>
                  </div>
                  <Link href={`/packages/${pkg.slug}`} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">View Details <ArrowRight className="h-4 w-4" /></Link>
                  <a href={whatsappLink(`Hello Dhruva Travels, I am interested in ${pkg.title}. Please share availability, package details and the final quote.`)} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5"><MessageCircle className="h-4 w-4" />WhatsApp Enquiry</a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card px-6 py-12 text-center">
            <Compass className="mx-auto mb-5 h-9 w-9 text-primary" />
            <h2 className="text-3xl">Let’s plan your {selected.toLowerCase()} trip</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">No packages are listed in this category yet. Share your dates, destination and group size to discuss a custom arrangement.</p>
            {selected === 'Urbania' && <Link href="/urbania" className="mt-5 block text-sm font-semibold text-primary underline underline-offset-4">Explore Urbania Services</Link>}
            <a href={whatsappLink(`Hello Dhruva Travels, I would like to enquire about ${selected}. Please help me plan a trip.`)} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Plan This Trip <MessageCircle className="h-4 w-4" /></a>
          </div>
        )}
      </div>
    </main>
  );
}
