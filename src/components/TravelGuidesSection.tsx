import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { Language, SiteSettings, TravelGuide } from '../types';
import { TRAVEL_GUIDES } from '../data/seoData';

interface TravelGuidesSectionProps {
  guides?: TravelGuide[];
  settings: SiteSettings;
  language: Language;
  onBookTour: (tourId?: string, title?: string) => void;
}

export const TravelGuidesSection: React.FC<TravelGuidesSectionProps> = ({
  guides = TRAVEL_GUIDES,
  settings,
  language,
  onBookTour
}) => {
  const isEn = language === 'en';
  const [selectedGuide, setSelectedGuide] = useState<TravelGuide | null>(null);

  const activeGuides = (guides && guides.length > 0 ? guides : TRAVEL_GUIDES).filter(
    (g) => g.isActive !== false
  );

  const whatsappCleanNumber = (settings.whatsappNumber || '995555123456').replace(/[^0-9]/g, '');

  return (
    <section id="guides" className="py-16 sm:py-20 border-b border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isEn ? 'Georgia Travel Insights' : 'გზამკვლევები & რჩევები'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#1A1A1A] tracking-tight">
              {isEn ? 'Travel Guides & Local Tips' : 'სასარგებლო გზამკვლევი'}
            </h2>
            <p className="mt-2 text-sm text-[#1A1A1A]/60 max-w-xl font-normal">
              {isEn
                ? 'Practical advice, airport transfer logistics, and scenic road trip recommendations for traveling in Georgia.'
                : 'პრაქტიკული რჩევები, აეროპორტის ტრანსფერები და რეკომენდაციები საქართველოს აღმოსაჩენად.'}
            </p>
          </div>
        </div>

        {/* Guides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {activeGuides.map((guide) => {
            const title = (isEn ? guide.titleEn : guide.title) || guide.title;
            const subtitle = (isEn ? guide.subtitleEn : guide.subtitle) || guide.subtitle;
            const category = (isEn ? guide.categoryEn : guide.category) || guide.category;
            const readTime = (isEn ? guide.readTimeEn : guide.readTime) || guide.readTime;
            const summary = (isEn ? guide.summaryEn : guide.summary) || guide.summary;

            return (
              <article
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="group bg-[#F9F7F2] rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 transition-all duration-300 flex flex-col cursor-pointer shadow-xs hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-200">
                  <img
                    src={guide.imageUrl}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    {category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#1A1A1A]/60" />
                    <span>{readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] leading-snug group-hover:text-amber-900 transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/65 mt-2 line-clamp-3 leading-relaxed">
                      {summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-black">
                    <span>{isEn ? 'Read Guide' : 'გზამკვლევის წაკითხვა'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Image */}
            <div className="relative h-56 sm:h-64 w-full shrink-0 bg-stone-900">
              <img
                src={selectedGuide.imageUrl}
                alt={isEn ? selectedGuide.titleEn : selectedGuide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <button
                onClick={() => setSelectedGuide(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-amber-400 text-stone-950 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                    {isEn ? selectedGuide.categoryEn : selectedGuide.category}
                  </span>
                  <span className="text-white/80 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {isEn ? selectedGuide.readTimeEn : selectedGuide.readTime}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                  {isEn ? selectedGuide.titleEn : selectedGuide.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed">
              <p className="font-medium text-[#1A1A1A] italic text-sm sm:text-base border-l-2 border-amber-500 pl-3">
                {(isEn ? selectedGuide.subtitleEn : selectedGuide.subtitle) || selectedGuide.subtitle}
              </p>

              <div className="space-y-3">
                {((isEn && selectedGuide.contentEn && selectedGuide.contentEn.length > 0
                  ? selectedGuide.contentEn
                  : selectedGuide.content) || []
                ).map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Local Tips Box */}
              {(((isEn && selectedGuide.tipsEn && selectedGuide.tipsEn.length > 0
                ? selectedGuide.tipsEn
                : selectedGuide.tips) || []
              ).length > 0) && (
                <div className="bg-[#F9F7F2] rounded-2xl p-4 sm:p-5 border border-black/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-3">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{isEn ? 'Local Insider Tips' : 'ადგილობრივი რჩევები'}</span>
                  </div>
                  <ul className="space-y-2">
                    {((isEn && selectedGuide.tipsEn && selectedGuide.tipsEn.length > 0
                      ? selectedGuide.tipsEn
                      : selectedGuide.tips) || []
                    ).map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-xs text-[#1A1A1A]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <a
                href={`https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(
                  isEn
                    ? `Hello! I was reading "${selectedGuide.titleEn}" and want to inquire about travel options.`
                    : `გამარჯობა! ვკითხულობდი გზამკვლევს "${selectedGuide.title}" და მინდა კონსულტაცია.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isEn ? 'Consult on WhatsApp' : 'WhatsApp კონსულტაცია'}</span>
              </a>

              <button
                onClick={() => {
                  const guideTitle = isEn ? selectedGuide.titleEn : selectedGuide.title;
                  setSelectedGuide(null);
                  onBookTour(selectedGuide.recommendedTourId, guideTitle);
                }}
                className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>{isEn ? 'Book Related Tour / Service' : 'შესაბამისი ტურის დაჯავშნა'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
