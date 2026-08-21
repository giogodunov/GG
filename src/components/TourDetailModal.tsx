import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { Tour, SiteSettings, Language } from '../types';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { translations } from '../utils/translations';

interface TourDetailModalProps {
  tour: Tour | null;
  settings: SiteSettings;
  onClose: () => void;
  onOpenBookingForm: (tour: Tour) => void;
  language: Language;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  settings,
  onClose,
  onOpenBookingForm,
  language
}) => {
  if (!tour) return null;

  const t = translations[language];

  const title = (language === 'en' && tour.titleEn) ? tour.titleEn : tour.title;
  const region = (language === 'en' && tour.regionEn) ? tour.regionEn : tour.region;
  const duration = (language === 'en' && tour.durationEn) ? tour.durationEn : tour.duration;
  const priceInfo = (language === 'en' && tour.priceInfoEn) ? tour.priceInfoEn : tour.priceInfo;
  const description = (language === 'en' && tour.shortDescriptionEn) ? tour.shortDescriptionEn : tour.shortDescription;
  const highlights = (language === 'en' && tour.highlightsEn && tour.highlightsEn.length > 0) ? tour.highlightsEn : tour.highlights;
  const included = (language === 'en' && tour.includedEn && tour.includedEn.length > 0) ? tour.includedEn : tour.included;

  const handleWhatsApp = () => {
    openWhatsAppDirect(settings?.whatsappNumber, {
      itemTitle: title,
      itemType: 'tour'
    });
  };

  return (
    <div
      id="tour-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id={`tour-detail-modal-${tour.id}`}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-black/10 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full bg-[#1A1A1A]">
          <img
            src={tour.imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="btn-close-tour-detail"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-[#1A1A1A] p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md"
            aria-label={t.modalClose}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title & Badges on image */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 text-[#1A1A1A] px-3 py-1 rounded-full">
                {region}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full">
                {duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#1A1A1A]">
          {/* Price banner */}
          <div className="bg-[#F9F7F2] border border-black/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#1A1A1A]/50 block uppercase tracking-wider font-medium">{t.indicativePrice}</span>
              <div className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] font-semibold">
                {priceInfo}
              </div>
            </div>
            <p className="text-xs text-[#1A1A1A]/50 sm:max-w-xs leading-relaxed italic">
              {t.priceNote}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-2">
              {t.itineraryLabel}
            </h4>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {/* Highlights & Included grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="bg-[#F9F7F2] p-5 rounded-2xl border border-black/5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  {t.routeHighlights}
                </h4>
                <ul className="space-y-2">
                  {highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#1A1A1A]/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included */}
            {included && included.length > 0 && (
              <div className="bg-[#F9F7F2] p-5 rounded-2xl border border-black/5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 mb-3 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  {t.whatIsIncluded}
                </h4>
                <ul className="space-y-2">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#1A1A1A]/80">
                      <Check className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              id="modal-tour-whatsapp-btn"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t.directWhatsAppInquiry}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBookingForm(tour);
              }}
              id="modal-tour-form-btn"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black hover:bg-black/90 text-white py-3.5 px-4 rounded-xl text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>{t.sendBookingRequest}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
