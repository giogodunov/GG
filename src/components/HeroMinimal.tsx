import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SiteSettings, Language } from '../types';
import { translations } from '../utils/translations';
import { formatImageUrl } from '../utils/imageHelper';

interface HeroMinimalProps {
  settings: SiteSettings;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onQuickBookClick: () => void;
  language: Language;
}

export const HeroMinimal: React.FC<HeroMinimalProps> = ({
  settings,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onQuickBookClick,
  language
}) => {
  const t = translations[language];
  const cleanWhatsApp = (settings?.whatsappNumber || '+995555123456').replace(/[^0-9]/g, '');
  const whatsAppMsg =
    language === 'en'
      ? 'Hello! I would like to get information about your private tours and travel packages in Georgia.'
      : 'გამარჯობა! მსურს ტურის ან სერვისის შესახებ ინფორმაციის მიღება.';

  const directWhatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(whatsAppMsg)}`;

  const categories = [
    { id: 'all', label: t.heroAllTours },
    { id: 'day_tour', label: t.heroDayTours },
    { id: 'multi_day', label: t.heroMultiDay },
    { id: 'wine', label: t.heroWine },
    { id: 'adventure', label: t.heroAdventure },
    { id: 'cultural', label: t.heroCultural }
  ];

  const formattedCoverUrl = formatImageUrl(settings?.heroCoverImage);
  const [imageError, setImageError] = useState(false);
  const hasCoverImage = Boolean(formattedCoverUrl && !imageError);
  const isLightText =
    hasCoverImage &&
    (settings?.heroTextColorMode === 'light' ||
      (settings?.heroTextColorMode !== 'dark' && (settings?.heroCoverOverlayOpacity ?? 35) >= 20));

  // Reset error when URL changes
  React.useEffect(() => {
    setImageError(false);
  }, [settings?.heroCoverImage]);

  // Convert position to CSS object-position
  const getObjectPositionStyle = (pos?: string): string => {
    if (!pos || pos === 'center') return '50% 50%';
    if (pos === 'top') return '50% 0%';
    if (pos === 'bottom') return '50% 100%';
    if (pos === 'left') return '0% 50%';
    if (pos === 'right') return '100% 50%';
    if (pos === 'top-left') return '0% 0%';
    if (pos === 'top-right') return '100% 0%';
    if (pos === 'bottom-left') return '0% 100%';
    if (pos === 'bottom-right') return '100% 100%';
    // If it's already "X% Y%"
    if (pos.includes('%') || pos.includes('px')) {
      return pos;
    }
    return '50% 50%';
  };

  const mobilePos = getObjectPositionStyle(settings?.heroCoverPositionMobile);
  const desktopPos = getObjectPositionStyle(settings?.heroCoverPositionDesktop);

  return (
    <section
      id="hero-section"
      className={`relative pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-black/5 overflow-hidden transition-colors ${
        isLightText ? 'text-white' : 'text-[#1A1A1A]'
      }`}
    >
      {/* Cover Image Background if configured */}
      {hasCoverImage && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Mobile Image (hidden on sm+) */}
          <img
            src={formattedCoverUrl}
            alt="Hero Background"
            className="w-full h-full object-cover sm:hidden"
            style={{ objectPosition: mobilePos }}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
          {/* Desktop Image (hidden on mobile) */}
          <img
            src={formattedCoverUrl}
            alt="Hero Background"
            className="hidden sm:block w-full h-full object-cover"
            style={{ objectPosition: desktopPos }}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
          <div
            className="absolute inset-0 bg-black transition-opacity"
            style={{ opacity: (settings?.heroCoverOverlayOpacity ?? 35) / 100 }}
          />
          {/* Subtle bottom gradient to ease smoothly into tours section */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtle label */}
          <div
            className={`text-[10px] uppercase font-bold tracking-widest mb-3 ${
              isLightText ? 'text-white/80' : 'text-[#1A1A1A]/40'
            }`}
          >
            {t.heroBadge}
          </div>

          {/* Artistic Serif Headline */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-serif italic tracking-tight leading-[1.05] mb-4 ${
              isLightText ? 'text-white drop-shadow-xs' : 'text-[#1C1917]'
            }`}
          >
            {t.heroHeadline} {t.heroHeadlineHighlight}
          </h1>

          {/* Subtext */}
          <p
            className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
              isLightText ? 'text-white/90 drop-shadow-xs' : 'text-[#1A1A1A]/60'
            }`}
          >
            {language === 'en'
              ? (settings?.taglineEn || t.heroSubtext)
              : (settings?.tagline || t.heroSubtext)}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-btn"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-xs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t.navWhatsApp}</span>
            </a>

            <button
              onClick={onQuickBookClick}
              id="hero-form-btn"
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer shadow-xs ${
                isLightText
                  ? 'bg-white text-stone-900 hover:bg-stone-100 font-bold'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              <span>{t.heroBookNow}</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div
          className={`mt-12 rounded-2xl p-3 sm:p-4 border transition-all ${
            hasCoverImage
              ? 'bg-white/95 backdrop-blur-md border-white/20 shadow-md text-[#1A1A1A]'
              : 'bg-white/70 backdrop-blur-xs border-black/10 shadow-none text-[#1A1A1A]'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
              <input
                type="text"
                id="search-tours-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.heroSearchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9F7F2]/80 border border-black/5 rounded-xl text-[#1A1A1A] text-xs placeholder:text-[#1A1A1A]/40 focus:outline-none focus:ring-1 ring-black/15 transition-all shadow-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  id="clear-search-query-btn"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                >
                  {t.clearFilter}
                </button>
              )}
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`hero-category-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs transition-all shrink-0 cursor-pointer shadow-none ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white font-medium'
                      : 'border border-black/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-black/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
