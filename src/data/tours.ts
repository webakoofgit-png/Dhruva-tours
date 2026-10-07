import { packages } from '@/data';

export const tourCategories = ['Pilgrimage', 'Family', 'Hill Station', 'Beach', 'Corporate', 'Urbania', 'Group Tours'] as const;
export type TourCategory = typeof tourCategories[number];

type TourDetails = {
  categories: TourCategory[];
  hotel: string;
  meals: string;
  pickup: string;
  photos: { src: string; caption: string }[];
};

const categoriesBySlug: Record<string, TourCategory[]> = {
  'pune-mumbai': ['Corporate', 'Family'],
  'pune-shirdi': ['Pilgrimage', 'Family'],
  'pune-nashik': ['Corporate', 'Family'],
  'pune-mahabaleshwar': ['Hill Station', 'Family'],
  'mumbai-nashik': ['Corporate', 'Family'],
  'pune-lonavala': ['Hill Station', 'Family'],
};

// Replace these notes and illustrative images with confirmed package content
// as hotel arrangements, meals, pickup schedules and real trip photos arrive.
export const tours = packages.map((pkg): typeof pkg & TourDetails => ({
  ...pkg,
  categories: categoriesBySlug[pkg.slug] ?? [],
  hotel: 'Hotel accommodation is not listed in this route’s inclusions. Ask our team about stay arrangements if you are planning an overnight trip.',
  meals: 'Meals are not listed in this route’s inclusions. Share any meal preferences when requesting your quote.',
  pickup: `${pkg.itinerary[0].description} Exact pickup address and time will be agreed with you before booking.`,
  photos: [{ src: pkg.image, caption: 'Illustrative travel image. Request current trip and vehicle photos from our team.' }],
}));
