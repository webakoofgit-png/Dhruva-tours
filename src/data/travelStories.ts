import { galleryImages } from '@/data';

type MediaBase = {
  id: string;
  title: string;
  caption: string;
  category: 'Trip moments' | 'Travel inspiration';
};
export type TravelMedia = MediaBase & (
  | { type: 'photo'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; captions?: string }
);

// Publish client-owned trip photos/videos here once supplied and approved.
// Video entries use a local or hosted video file, a poster, and optional VTT captions.
export const tripMedia: TravelMedia[] = [];
export const inspirationMedia: TravelMedia[] = [
  { id: 'open-road', type: 'photo', title: 'The journey begins', src: galleryImages[0], alt: 'Illustrative road travel photograph', category: 'Travel inspiration', caption: 'Stock travel photograph for inspiration; not a Dhruva customer trip.' },
  { id: 'road-trip', type: 'photo', title: 'Take the scenic route', src: galleryImages[2], alt: 'Illustrative road trip photograph', category: 'Travel inspiration', caption: 'Stock travel photograph for inspiration; not a Dhruva customer trip.' },
  { id: 'outdoors', type: 'photo', title: 'A little further from everyday', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop', alt: 'Mountain landscape beneath an open sky', category: 'Travel inspiration', caption: 'Stock travel photograph for inspiration; not a Dhruva customer trip.' },
];
export const travelMedia = [...tripMedia, ...inspirationMedia];

export type CustomerReview = {
  id: string;
  name: string;
  text: string;
  trip?: string;
  rating?: number;
  source: 'Customer feedback' | 'Google';
  sourceUrl?: string;
};
// Use only genuine, publication-approved reviews. Existing sample testimonials
// in data/index.ts are deliberately not used as customer endorsements.
export const customerReviews: CustomerReview[] = [];
export const googleReviewLinks: { profile: string | null; writeReview: string | null } = {
  profile: null,
  writeReview: null,
};
