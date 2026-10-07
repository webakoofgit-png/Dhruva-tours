import { contactInfo } from '@/data';

export function whatsappLink(message: string) {
  return `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
