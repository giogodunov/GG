import { Tour, Service, BookingInquiry, SiteSettings, Language, TravelGuide } from '../types';
import { DEFAULT_TOURS, DEFAULT_SERVICES, DEFAULT_SETTINGS, DEFAULT_TRAVEL_GUIDES } from '../data/defaultData';

const TOURS_KEY = 'geo_tours_data_v1';
const SERVICES_KEY = 'geo_services_data_v1';
const INQUIRIES_KEY = 'geo_inquiries_data_v1';
const SETTINGS_KEY = 'geo_settings_data_v1';
const GUIDES_KEY = 'geo_guides_data_v1';
const LANGUAGE_KEY = 'geo_language_v1';

export function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'ka' || saved === 'en') {
      return saved;
    }
    return 'ka';
  } catch (e) {
    return 'ka';
  }
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch (e) {
    console.error('Failed to save language', e);
  }
}

export function loadTours(): Tour[] {
  try {
    const raw = localStorage.getItem(TOURS_KEY);
    if (!raw) {
      localStorage.setItem(TOURS_KEY, JSON.stringify(DEFAULT_TOURS));
      return DEFAULT_TOURS;
    }
    const parsed: Tour[] = JSON.parse(raw);
    return parsed.map((t) => {
      const defaultMatch = DEFAULT_TOURS.find((d) => d.id === t.id);
      if (defaultMatch) {
        return {
          ...defaultMatch,
          ...t,
          titleEn: t.titleEn || defaultMatch.titleEn,
          regionEn: t.regionEn || defaultMatch.regionEn,
          durationEn: t.durationEn || defaultMatch.durationEn,
          priceInfoEn: t.priceInfoEn || defaultMatch.priceInfoEn,
          shortDescriptionEn: t.shortDescriptionEn || defaultMatch.shortDescriptionEn,
          highlightsEn: t.highlightsEn || defaultMatch.highlightsEn,
          includedEn: t.includedEn || defaultMatch.includedEn
        };
      }
      return t;
    });
  } catch (e) {
    console.error('Failed to load tours', e);
    return DEFAULT_TOURS;
  }
}

export function saveTours(tours: Tour[]): void {
  try {
    localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
    // Persist to server
    fetch('/api/tours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tours)
    }).catch((err) => console.warn('Server tours sync failed:', err));
  } catch (e) {
    console.error('Failed to save tours', e);
  }
}

export function loadServices(): Service[] {
  try {
    const raw = localStorage.getItem(SERVICES_KEY);
    if (!raw) {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    const parsed: Service[] = JSON.parse(raw);
    return parsed.map((s) => {
      const defaultMatch = DEFAULT_SERVICES.find((d) => d.id === s.id);
      if (defaultMatch) {
        return {
          ...defaultMatch,
          ...s,
          titleEn: s.titleEn || defaultMatch.titleEn,
          priceInfoEn: s.priceInfoEn || defaultMatch.priceInfoEn,
          shortDescriptionEn: s.shortDescriptionEn || defaultMatch.shortDescriptionEn,
          featuresEn: s.featuresEn || defaultMatch.featuresEn
        };
      }
      return s;
    });
  } catch (e) {
    console.error('Failed to load services', e);
    return DEFAULT_SERVICES;
  }
}

export function saveServices(services: Service[]): void {
  try {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
    // Persist to server
    fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(services)
    }).catch((err) => console.warn('Server services sync failed:', err));
  } catch (e) {
    console.error('Failed to save services', e);
  }
}

export function loadInquiries(): BookingInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load inquiries', e);
    return [];
  }
}

export function saveInquiry(inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>): BookingInquiry {
  const current = loadInquiries();
  const newInquiry: BookingInquiry = {
    ...inquiry,
    id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  const updated = [newInquiry, ...current];
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    // Persist to server
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    }).catch((err) => console.warn('Server inquiry sync failed:', err));
  } catch (e) {
    console.error('Failed to save inquiry', e);
  }
  return newInquiry;
}

export function updateInquiries(inquiries: BookingInquiry[]): void {
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    // Persist full list to server so deletions and status changes persist across reloads
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiries)
    }).catch((err) => console.warn('Server inquiries update failed:', err));
  } catch (e) {
    console.error('Failed to update inquiries', e);
  }
}

export function loadGuides(): TravelGuide[] {
  try {
    const raw = localStorage.getItem(GUIDES_KEY);
    if (!raw) {
      localStorage.setItem(GUIDES_KEY, JSON.stringify(DEFAULT_TRAVEL_GUIDES));
      return DEFAULT_TRAVEL_GUIDES;
    }
    const parsed: TravelGuide[] = JSON.parse(raw);
    return parsed.map((g) => {
      const defaultMatch = DEFAULT_TRAVEL_GUIDES.find((d) => d.id === g.id);
      if (defaultMatch) {
        return {
          ...defaultMatch,
          ...g,
          titleEn: g.titleEn || defaultMatch.titleEn,
          subtitleEn: g.subtitleEn || defaultMatch.subtitleEn,
          readTimeEn: g.readTimeEn || defaultMatch.readTimeEn,
          categoryEn: g.categoryEn || defaultMatch.categoryEn,
          summaryEn: g.summaryEn || defaultMatch.summaryEn,
          contentEn: g.contentEn && g.contentEn.length > 0 ? g.contentEn : defaultMatch.contentEn,
          tipsEn: g.tipsEn && g.tipsEn.length > 0 ? g.tipsEn : defaultMatch.tipsEn
        };
      }
      return g;
    });
  } catch (e) {
    console.error('Failed to load guides', e);
    return DEFAULT_TRAVEL_GUIDES;
  }
}

export function saveGuides(guides: TravelGuide[]): void {
  try {
    localStorage.setItem(GUIDES_KEY, JSON.stringify(guides));
    // Persist to server
    fetch('/api/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guides)
    }).catch((err) => console.warn('Server guides sync failed:', err));
  } catch (e) {
    console.error('Failed to save guides', e);
  }
}

export function loadSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    const resolvedLocation =
      parsed.location && parsed.location !== 'თბილისი, საქართველო'
        ? parsed.location
        : DEFAULT_SETTINGS.location;
    const resolvedLocationEn =
      parsed.locationEn && parsed.locationEn !== 'Tbilisi, Georgia'
        ? parsed.locationEn
        : DEFAULT_SETTINGS.locationEn;

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      location: resolvedLocation,
      locationEn: resolvedLocationEn,
      taglineEn: parsed.taglineEn || DEFAULT_SETTINGS.taglineEn,
      workHoursEn: parsed.workHoursEn || DEFAULT_SETTINGS.workHoursEn,
      priceDisclaimerEn: parsed.priceDisclaimerEn || DEFAULT_SETTINGS.priceDisclaimerEn,
      aboutTextEn: parsed.aboutTextEn || DEFAULT_SETTINGS.aboutTextEn,
      backgroundColor: parsed.backgroundColor || DEFAULT_SETTINGS.backgroundColor || '#F9F7F2',
      heroCoverImage: parsed.heroCoverImage !== undefined ? parsed.heroCoverImage : (DEFAULT_SETTINGS.heroCoverImage || ''),
      heroCoverOverlayOpacity: parsed.heroCoverOverlayOpacity !== undefined ? parsed.heroCoverOverlayOpacity : 35,
      heroTextColorMode: parsed.heroTextColorMode || DEFAULT_SETTINGS.heroTextColorMode || 'auto',
      heroCoverPositionMobile: parsed.heroCoverPositionMobile || DEFAULT_SETTINGS.heroCoverPositionMobile || 'center',
      heroCoverPositionDesktop: parsed.heroCoverPositionDesktop || DEFAULT_SETTINGS.heroCoverPositionDesktop || 'center'
    };
  } catch (e) {
    console.error('Failed to load settings', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Persist to server so any visitor/friend gets it
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    }).catch((err) => console.warn('Server settings sync failed:', err));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export async function fetchServerData(): Promise<{
  settings?: SiteSettings;
  tours?: Tour[];
  services?: Service[];
  guides?: TravelGuide[];
  inquiries?: BookingInquiry[];
} | null> {
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.settings) {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(json.data.settings));
        }
        if (json.data.tours && Array.isArray(json.data.tours)) {
          localStorage.setItem(TOURS_KEY, JSON.stringify(json.data.tours));
        }
        if (json.data.services && Array.isArray(json.data.services)) {
          localStorage.setItem(SERVICES_KEY, JSON.stringify(json.data.services));
        }
        if (json.data.guides && Array.isArray(json.data.guides)) {
          localStorage.setItem(GUIDES_KEY, JSON.stringify(json.data.guides));
        }
        if (json.data.inquiries && Array.isArray(json.data.inquiries)) {
          localStorage.setItem(INQUIRIES_KEY, JSON.stringify(json.data.inquiries));
        }
        return json.data;
      }
    }
  } catch (err) {
    console.warn('Could not fetch server data, fallback to local storage:', err);
  }
  return null;
}

export function resetAllDataToDefaults(): void {
  localStorage.setItem(TOURS_KEY, JSON.stringify(DEFAULT_TOURS));
  localStorage.setItem(SERVICES_KEY, JSON.stringify(DEFAULT_SERVICES));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
  localStorage.setItem(GUIDES_KEY, JSON.stringify(DEFAULT_TRAVEL_GUIDES));
  fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tours: DEFAULT_TOURS,
      services: DEFAULT_SERVICES,
      settings: DEFAULT_SETTINGS,
      guides: DEFAULT_TRAVEL_GUIDES
    })
  }).catch((err) => console.warn('Server reset sync failed:', err));
}
