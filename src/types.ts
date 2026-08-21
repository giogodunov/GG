export type Language = 'ka' | 'en';

export interface Tour {
  id: string;
  title: string;
  titleEn?: string;
  region: string;
  regionEn?: string;
  duration: string; // e.g. "1 დღე", "2 დღე / 1 ღამე", "3 დღე"
  durationEn?: string; // e.g. "1 Day", "2 Days / 1 Night", "3 Days"
  priceInfo: string; // e.g. "120 ₾-დან (ინდივიდუალური)", "საინფორმაციო: 250 ₾"
  priceInfoEn?: string; // e.g. "From 120 GEL", "Indicative: 250 GEL"
  priceValue?: number; // optional numeric for sorting if needed
  category: 'day_tour' | 'multi_day' | 'wine' | 'adventure' | 'cultural';
  shortDescription: string;
  shortDescriptionEn?: string;
  highlights: string[];
  highlightsEn?: string[];
  included: string[];
  includedEn?: string[];
  imageUrl: string;
  featured?: boolean;
  isActive: boolean;
}

export interface Service {
  id: string;
  title: string;
  titleEn?: string;
  category: 'transfer' | 'guide' | 'vehicle' | 'custom';
  priceInfo: string; // e.g. "80 ₾-დან / რეისი", "შეთანხმებით", "150 ₾ / დღე"
  priceInfoEn?: string; // e.g. "From 80 GEL", "On request", "150 GEL / day"
  shortDescription: string;
  shortDescriptionEn?: string;
  features: string[];
  featuresEn?: string[];
  iconName: 'plane' | 'user-check' | 'car' | 'compass' | 'shield' | 'clock' | 'map-pin';
  isActive: boolean;
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email?: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
  itemType: 'tour' | 'service' | 'general';
  itemTitle: string;
  itemId?: string;
  preferredDate?: string;
  peopleCount?: number;
  notes?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  taglineEn?: string;
  whatsappNumber: string; // digits only with country code, e.g. "995555123456"
  displayPhone: string; // formatted e.g. "+995 555 12 34 56"
  email: string;
  location: string;
  locationEn?: string;
  workHours: string;
  workHoursEn?: string;
  priceDisclaimer: string;
  priceDisclaimerEn?: string;
  aboutText: string;
  aboutTextEn?: string;
  backgroundColor?: string; // e.g. "#F9F7F2", "#FFFFFF", "#FDE047"
  heroCoverImage?: string; // custom cover photo URL or Base64
  heroCoverOverlayOpacity?: number; // 0 to 90 (% darkness)
  heroTextColorMode?: 'auto' | 'dark' | 'light'; // text color mode for hero
  heroCoverPositionMobile?: string; // e.g. 'center', 'top', 'bottom', 'left', 'right', or '50% 30%'
  heroCoverPositionDesktop?: string; // e.g. 'center', 'top', 'bottom', or '50% 50%'
}
