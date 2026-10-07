import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Play, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { travelMedia, type TravelMedia } from '@/data/travelStories';
import { whatsappLink } from '@/lib/whatsapp';

const filters = ['All', 'Trip moments', 'Videos', 'Travel inspiration'] as const;

export default function Gallery() {
  const [filter, setFilter] = useState<typeof filters[number]>('All');
  const [selected, setSelected] = useState<TravelMedia | null>(null);
  const previewTrigger = useRef<HTMLButtonElement | null>(null);
  const visible = travelMedia.filter((item) => filter === 'All' || (filter === 'Videos' ? item.type === 'video' : item.category === filter));
  const selectedIndex = visible.findIndex((item) => item.id === selected?.id);

  function move(direction: number) {
    if (visible.length) setSelected(visible[(selectedIndex + direction + visible.length) % visible.length]);
  }

  return (
    <main className="min-h-screen pb-20 pt-36 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The travel journal</p><h1 className="text-4xl leading-tight sm:text-6xl">Places to go.<br />Moments to keep.</h1></div>
          <p className="max-w-lg text-base leading-8 text-muted-foreground">Explore travel inspiration and, as they are added, photos and videos from Dhruva journeys. Illustrative images are labelled separately from customer trips.</p>
        </header>
        <div role="group" aria-label="Filter gallery" className="mb-5 flex flex-wrap gap-2">
          {filters.map((name) => <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${filter === name ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary'}`}>{name}</button>)}
        </div>
        <p role="status" className="mb-7 text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? 'item' : 'items'} · {filter}</p>
        {visible.length ? (
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, index) => (
              <figure key={item.id} className="overflow-hidden rounded-xl border border-border bg-card">
                <button type="button" onClick={(event) => { previewTrigger.current = event.currentTarget; setSelected(item); }} aria-label={`Open ${item.type}: ${item.title}`} className="group relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                  <img src={item.type === 'photo' ? item.src : item.poster} alt={item.type === 'photo' ? item.alt : `Video preview: ${item.title}`} loading="lazy" className={`w-full object-cover ${index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} />
                  <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-xs text-white">{item.category}</span>
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-primary shadow-sm">{item.type === 'video' ? <Play className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}</span>
                </button>
                <figcaption className="p-5"><h2 className="text-xl">{item.title}</h2><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.caption}</p></figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card px-6 py-14 text-center"><Camera className="mx-auto mb-5 h-9 w-9 text-primary" /><h2 className="text-3xl">{filter === 'Videos' ? 'Trip films are on the way' : 'More memories to come'}</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{filter === 'Videos' ? 'No trip videos have been published yet.' : 'No customer trip photos have been published yet.'} Planning a journey? Ask our team for current trip and vehicle photos.</p><a href={whatsappLink('Hello Dhruva Travels, please share current trip photos and videos to help me plan my journey.')} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Request Trip Photos <ArrowRight className="h-4 w-4" /></a></div>
        )}
        <div className="mt-12 flex flex-col gap-4 rounded-xl bg-[#2f251d] p-6 text-white sm:p-9 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl">Inspired to take a trip?</h2><p className="mt-2 text-sm leading-7 text-white/75">Share your destination and dates. Let’s plan your own travel story.</p></div><a href={whatsappLink('Hello Dhruva Travels, I would like help planning a custom trip.')} target="_blank" rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#2f251d]">Plan Your Trip <ArrowRight className="h-4 w-4" /></a></div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent onCloseAutoFocus={(event) => { event.preventDefault(); previewTrigger.current?.focus(); }} className="w-[calc(100%-2rem)] max-w-4xl rounded-xl p-5 sm:p-6">
          {selected && <>
            <DialogHeader className="pr-7"><DialogTitle className="text-2xl font-serif">{selected.title}</DialogTitle><DialogDescription>{selected.caption}</DialogDescription></DialogHeader>
            {selected.type === 'photo' ? <img src={selected.src} alt={selected.alt} className="max-h-[55dvh] w-full rounded-lg object-contain" /> : <video key={selected.id} src={selected.src} poster={selected.poster} controls playsInline preload="metadata" className="max-h-[55dvh] w-full rounded-lg">{selected.captions && <track default kind="captions" src={selected.captions} srcLang="en" label="English" />}Your browser does not support video playback.</video>}
            {visible.length > 1 && <div className="flex items-center justify-between gap-3"><button type="button" aria-label="Previous gallery item" onClick={() => move(-1)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-primary/5"><ArrowLeft className="h-4 w-4" />Previous</button><span aria-live="polite" className="text-xs text-muted-foreground">{selectedIndex + 1} / {visible.length}</span><button type="button" aria-label="Next gallery item" onClick={() => move(1)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-primary/5">Next<ArrowRight className="h-4 w-4" /></button></div>}
          </>}
        </DialogContent>
      </Dialog>
    </main>
  );
}
