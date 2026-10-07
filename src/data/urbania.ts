export const urbaniaServices = [
  { id: 'corporate', title: 'Corporate', description: 'Team outings, meetings and business travel.', detail: 'Share your office pickup points, team size and schedule so we can discuss a suitable travel plan.' },
  { id: 'family', title: 'Family', description: 'Family holidays and time together on the road.', detail: 'Tell us about your destination, luggage and any travel needs for children or older family members.' },
  { id: 'wedding', title: 'Wedding', description: 'Guest transfers for your celebrations.', detail: 'Share the venue locations, event timings and number of guests to plan the required transfers.' },
  { id: 'airport', title: 'Airport Pickup / Drop', description: 'Airport transfers for your whole group.', detail: 'Include the airport, flight timing, passenger count and luggage requirements in your enquiry.' },
  { id: 'outstation', title: 'Outstation', description: 'Weekend escapes and longer road trips.', detail: 'Share your route, travel dates and return plans to request a quote for the complete journey.' },
  { id: 'private-tours', title: 'Private Tours', description: 'A journey built around your group.', detail: 'Tell us the places you want to visit, preferred stops and pace of travel to discuss a custom itinerary.' },
] as const;

export function getUrbaniaService(search: string) {
  const id = new URLSearchParams(search).get('service');
  return urbaniaServices.find((service) => service.id === id);
}
