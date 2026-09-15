import React, { useState, useMemo, useEffect } from 'react';
import { X, Check, Sparkles, ChevronLeft, ChevronRight, Maximize2, Camera, Image as ImageIcon } from 'lucide-react';
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

  // Extract all photos: preferred gallery, falling back to imageUrl
  const photos: string[] = useMemo(() => {
    if (tour.gallery && tour.gallery.length > 0) {
      return tour.gallery;
    }
    return tour.imageUrl ? [tour.imageUrl] : [];
  }, [tour]);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset index when modal opens for a different tour
  useEffect(() => {
    setActivePhotoIdx(0);
    setIsLightboxOpen(false);
  }, [tour?.id]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (photos.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActivePhotoIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setActivePhotoIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, photos.length, onClose]);

  const handleWhatsApp = () => {
    openWhatsAppDirect(settings?.whatsappNumber, {
      itemTitle: title,
      itemType: 'tour'
    });
  };

  const currentPhoto = photos[activePhotoIdx] || tour.imageUrl || 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80';

  return (
    <>
      <div
        id="tour-detail-modal-backdrop"
        className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          id={`tour-detail-modal-${tour.id}`}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-black/10 overflow-hidden my-6 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image & Gallery Carousel */}
          <div className="relative h-64 sm:h-84 w-full bg-stone-900 select-none overflow-hidden group">
            <img
              src={currentPhoto}
              alt={`${title} - ${activePhotoIdx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300 cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

            {/* Top Bar on Image: Region/Duration & Close */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                {photos.length > 1 && (
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                    <Camera className="w-3.5 h-3.5 text-stone-300" />
                    <span>{activePhotoIdx + 1} / {photos.length}</span>
                  </span>
                )}
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 text-[#1A1A1A] px-3 py-1 rounded-full">
                  {region}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-black/40 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full">
                  {duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Expand / View all photos button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="bg-white/80 hover:bg-white text-stone-900 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md"
                  title={t.viewAllPhotos}
                  aria-label={t.viewAllPhotos}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Close modal button */}
                <button
                  onClick={onClose}
                  id="btn-close-tour-detail"
                  className="bg-white/80 hover:bg-white text-[#1A1A1A] p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md"
                  aria-label={t.modalClose}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Prev/Next Buttons (if > 1 photo) */}
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-10 shadow-md sm:opacity-90 sm:hover:opacity-100"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-10 shadow-md sm:opacity-90 sm:hover:opacity-100"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Title on image */}
            <div className="absolute bottom-4 left-6 right-6 text-white pointer-events-none">
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight drop-shadow-xs">
                {title}
              </h2>
            </div>
          </div>

          {/* Thumbnail Carousel Bar below Hero (Variant A Gallery) */}
          {photos.length > 1 && (
            <div className="bg-stone-900 px-4 py-2.5 flex items-center gap-2 overflow-x-auto border-t border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 shrink-0 mr-1 flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-stone-400" />
                <span>{t.photoGallery}:</span>
              </span>
              <div className="flex items-center gap-2">
                {photos.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer ${
                      activePhotoIdx === idx
                        ? 'ring-2 ring-white scale-105 shadow-md opacity-100'
                        : 'opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`მინიატურა ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[7px] text-white text-center font-bold uppercase tracking-tight py-0.2">
                        Cover
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

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

            {/* Full Gallery Grid (Variant A) if multiple photos */}
            {photos.length > 1 && (
              <div className="pt-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-stone-700" />
                    <span>{t.photoGallery} ({photos.length} {t.photosCount})</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="text-xs font-semibold text-stone-700 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{t.viewAllPhotos}</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {photos.map((photoUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActivePhotoIdx(idx);
                        setIsLightboxOpen(true);
                      }}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all group/item cursor-pointer ${
                        activePhotoIdx === idx
                          ? 'border-stone-900 ring-2 ring-stone-900/40'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <img
                        src={photoUrl}
                        alt={`${title} photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                      />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                          Cover
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

      {/* Fullscreen Lightbox Overlay (Variant A) */}
      {isLightboxOpen && (
        <div
          id="tour-lightbox-backdrop"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Top Header */}
          <div
            className="flex items-center justify-between text-white pb-3 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-semibold text-white/90">
                {title}
              </span>
              <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full font-mono">
                {activePhotoIdx + 1} / {photos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label={t.modalClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Stage */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {photos.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={currentPhoto}
              alt={`${title} - ${activePhotoIdx + 1}`}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] sm:max-h-[76vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-200"
            />

            {photos.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails */}
          {photos.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 pt-3 border-t border-white/10 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer ${
                    activePhotoIdx === idx
                      ? 'ring-2 ring-white scale-105 opacity-100 shadow-lg'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img
                    src={thumbUrl}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
