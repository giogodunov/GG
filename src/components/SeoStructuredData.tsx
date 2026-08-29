import React, { useEffect } from 'react';
import { Tour, SiteSettings, Language } from '../types';
import { SEO_FAQS } from '../data/seoData';

interface SeoStructuredDataProps {
  settings: SiteSettings;
  tours: Tour[];
  language: Language;
  activeTour?: Tour | null;
}

export const SeoStructuredData: React.FC<SeoStructuredDataProps> = ({
  settings,
  tours,
  language,
  activeTour
}) => {
  useEffect(() => {
    // 1. Dynamic Title and Meta Description update
    const isEn = language === 'en';
    const siteBrand = settings.brandName || 'InGeorgiaTours';
    
    if (activeTour) {
      const tourTitle = isEn && activeTour.titleEn ? activeTour.titleEn : activeTour.title;
      const tourDesc = isEn && activeTour.shortDescriptionEn ? activeTour.shortDescriptionEn : activeTour.shortDescription;
      document.title = `${tourTitle} | ${siteBrand}`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', tourDesc);
      }
    } else {
      const defaultTitle = isEn
        ? `${siteBrand} | Private Tours, Transfers & Travel in Georgia`
        : `${siteBrand} | ტურები, ტრანსფერები და მოგზაურობა საქართველოში`;
      const defaultDesc = isEn
        ? 'Discover Georgia with tailor-made private tours, Kutaisi & Tbilisi airport transfers, wine tastings in Kakheti, and mountain expeditions in Kazbegi and Svaneti. Instant WhatsApp booking.'
        : 'ინდივიდუალური და ჯგუფური ტურები საქართველოში, აეროპორტის ტრანსფერები (ქუთაისი, თბილისი, ბათუმი), გიდის მომსახურება და მანქანის ქირაობა მძღოლით. მარტივი დაჯავშნა WhatsApp-ით.';
      
      document.title = defaultTitle;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', defaultDesc);
      }
    }

    // Set HTML lang attribute
    document.documentElement.lang = language;

    // 2. Schema.org Organization (TravelAgency)
    const orgData = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      '@id': 'https://ingeorgiatours.ge/#organization',
      name: settings.brandName || 'InGeorgiaTours',
      url: 'https://ingeorgiatours.ge/',
      logo: 'https://ingeorgiatours.ge/logo.png',
      image: settings.heroCoverImage || 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
      description: isEn
        ? (settings.aboutTextEn || 'Tailor-made private tours, airport transfers, and certified guide services across Georgia.')
        : (settings.aboutText || 'ინდივიდუალური ტურები, აეროპორტის ტრანსფერები და გიდის მომსახურება საქართველოში.'),
      telephone: (settings.displayPhone || settings.phone || '+995555123456').replace(/\s+/g, ''),
      email: settings.email || 'info@ingeorgiatours.ge',
      address: {
        '@type': 'PostalAddress',
        addressLocality: isEn ? (settings.locationEn || 'Kutaisi') : (settings.location || 'ქუთაისი'),
        addressRegion: 'Imereti',
        addressCountry: 'GE'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 42.2679,
        longitude: 42.6946
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '09:00',
        closes: '21:00'
      },
      priceRange: '$$',
      currenciesAccepted: 'GEL, USD, EUR',
      paymentAccepted: 'Cash, Bank Transfer',
      areaServed: [
        { '@type': 'Country', name: 'Georgia' },
        { '@type': 'City', name: 'Kutaisi' },
        { '@type': 'City', name: 'Tbilisi' },
        { '@type': 'City', name: 'Batumi' }
      ]
    };

    // 3. Schema.org TouristTrip structured data for active tours
    const activeTours = tours.filter((t) => t.isActive);
    const tripsData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: activeTours.map((t, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'TouristTrip',
          name: isEn && t.titleEn ? t.titleEn : t.title,
          description: isEn && t.shortDescriptionEn ? t.shortDescriptionEn : t.shortDescription,
          image: t.imageUrl,
          touristType: ['Family', 'Couples', 'Solo Travelers', 'Groups'],
          itinerary: {
            '@type': 'ItemList',
            itemListElement: (isEn && t.highlightsEn ? t.highlightsEn : t.highlights).map((hl, hIdx) => ({
              '@type': 'ListItem',
              position: hIdx + 1,
              name: hl
            }))
          },
          offers: {
            '@type': 'Offer',
            price: t.priceValue || 120,
            priceCurrency: 'GEL',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01',
            url: `https://ingeorgiatours.ge/?tour=${encodeURIComponent(t.id)}`
          },
          provider: {
            '@id': 'https://ingeorgiatours.ge/#organization'
          }
        }
      }))
    };

    // 4. Schema.org FAQPage structured data
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: SEO_FAQS.map((faq) => ({
        '@type': 'Question',
        name: isEn ? faq.questionEn : faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEn ? faq.answerEn : faq.answer
        }
      }))
    };

    // Helper to safely upsert JSON-LD script tags in document head
    const updateScript = (id: string, jsonData: object) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(jsonData, null, 2);
    };

    updateScript('seo-jsonld-org', orgData);
    updateScript('seo-jsonld-trips', tripsData);
    updateScript('seo-jsonld-faq', faqData);

    return () => {
      // Cleanup if needed on unmount
    };
  }, [settings, tours, language, activeTour]);

  return null;
};
