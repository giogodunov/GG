import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Tour, Language } from '../types';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { translations } from '../utils/translations';

interface TourCardProps {
  tour: Tour;
  whatsappNumber?: string;
  onViewDetails: (tour: Tour) => void;
  onBookTour: (tour: Tour) => void;
  language: Language;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  whatsappNumber,
  onViewDetails,
  onBookTour,
  language
}) => {
  const t = translations[language];

  const title = (language === 'en' && tour.titleEn) ? tour.titleEn : tour.title;
  const region = (language === 'en' && tour.regionEn) ? tour.regionEn : tour.region;
  const duration = (language === 'en' && tour.durationEn) ? tour.durationEn : tour.duration;
  const priceInfo = (language === 'en' && tour.priceInfoEn) ? tour.priceInfoEn : tour.priceInfo;
  const description = (language === 'en' && tour.shortDescriptionEn) ? tour.shortDescriptionEn : tour.shortDescription;
  const highlights = (language === 'en' && tour.highlightsEn && tour.highlightsEn.length > 0) ? tour.highlightsEn : tour.highlights;

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppDirect(whatsappNumber, {
      itemTitle: title,
      itemType: 'tour'
    });
  };

  return (
    <div
      id={`tour-card-${tour.id}`}
      onClick={() => onViewDetails(tour)}
      className="group cursor-pointer flex flex-col justify-between bg-white rounded-3xl p-4 border border-black/5 hover:border-black/15 transition-all shadow-2xs hover:shadow-xs"
    >
      <div>
        {/* Unified 16:9 Standard Image Container */}
        <div className="aspect-[16/9] bg-[#E8E4DB] rounded-2xl mb-4 overflow-hidden relative shadow-xs">
          <img
            src={tour.imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Region Tag Top Left */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-xs text-[#1A1A1A] px-2.5 py-1 rounded-full">
              {region}
            </span>
          </div>

          {tour.featured && (
            <span className="absolute top-3 right-3 bg-[#C5D1C5] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              {t.featuredBadge}
            </span>
          )}

          {/* Direct WhatsApp Quick Icon Overlay */}
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            title={t.directWhatsAppInquiry}
            className="absolute bottom-3 right-3 w-8 h-8 bg-[#25D366] hover:scale-110 text-white rounded-full flex items-center justify-center transition-transform shadow-md cursor-pointer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif italic text-[#1A1A1A] group-hover:text-black transition-colors leading-snug">
          {title}
        </h3>

        <p className="mt-1.5 text-xs text-[#1A1A1A]/60 line-clamp-2 leading-relaxed font-normal">
          {description}
        </p>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {highlights.slice(0, 2).map((hl, idx) => (
              <span key={idx} className="text-[11px] text-[#1A1A1A]/70 bg-black/5 px-2 py-0.5 rounded-md">
                {hl}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Price & Duration */}
      <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#1A1A1A]/40 block uppercase tracking-wider">{t.indicativePrice}</span>
          <span className="text-sm text-[#1A1A1A] font-serif italic underline underline-offset-4 font-semibold">
            {priceInfo}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-tighter border border-black/20 px-2 py-0.5 rounded-full text-[#1A1A1A]/70 font-medium">
            {duration}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookTour(tour);
            }}
            className="p-1.5 rounded-full bg-black text-white hover:bg-black/80 transition-colors cursor-pointer"
            title={t.bookTour}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
