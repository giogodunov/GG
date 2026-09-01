import React from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { Service, SiteSettings, Language } from '../types';
import { ServiceCard } from './ServiceCard';
import { translations } from '../utils/translations';
import { SectionCoverKey } from './SectionCoverCustomizer';

interface ServicesSectionProps {
  services: Service[];
  settings: SiteSettings;
  onBookService: (service: Service) => void;
  onOpenAddService: () => void;
  onOpenAdminSettings?: (tab?: 'services' | 'tours' | 'guides' | 'inquiries' | 'settings', sectionCover?: SectionCoverKey) => void;
  language: Language;
  isAdminAuthorized?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  settings,
  onBookService,
  onOpenAddService,
  onOpenAdminSettings,
  language,
  isAdminAuthorized = false
}) => {
  const t = translations[language];
  const activeServices = services.filter((s) => s.isActive);
  const hasCoverImage = Boolean(settings.servicesCoverImage && settings.servicesCoverImage.trim() !== '');
  const opacity = settings.servicesCoverOverlayOpacity !== undefined ? settings.servicesCoverOverlayOpacity : 45;
  const isLightText = hasCoverImage && (settings.servicesTextColorMode === 'light' || !settings.servicesTextColorMode || settings.servicesTextColorMode === 'auto');

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
    if (pos.includes('%') || pos.includes('px')) {
      return pos;
    }
    return '50% 50%';
  };

  const mobilePos = getObjectPositionStyle(settings.servicesCoverPositionMobile);
  const desktopPos = getObjectPositionStyle(settings.servicesCoverPositionDesktop);

  return (
    <section
      id="services"
      className={`relative py-16 sm:py-24 border-b border-black/5 transition-all overflow-hidden ${
        hasCoverImage ? 'text-white' : 'text-[#1A1A1A]'
      }`}
    >
      {/* Background Cover Image with responsive alignment & overlay */}
      {hasCoverImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Mobile Cover Image (hidden on sm+) */}
          <img
            src={settings.servicesCoverImage}
            alt="Services background cover mobile"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 sm:hidden"
            style={{
              objectPosition: mobilePos
            }}
          />
          {/* Desktop Cover Image (hidden on mobile) */}
          <img
            src={settings.servicesCoverImage}
            alt="Services background cover desktop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hidden sm:block"
            style={{
              objectPosition: desktopPos
            }}
          />
          {/* Darkness Tint / Overlay */}
          <div
            className="absolute inset-0 bg-stone-950"
            style={{ opacity: opacity / 100 }}
          />
          {/* Subtle top & bottom blend gradients */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div
              className={`inline-block text-[10px] uppercase font-bold tracking-widest mb-2 ${
                isLightText ? 'text-amber-300 drop-shadow-xs' : 'text-[#1A1A1A]/40'
              }`}
            >
              {t.servicesBadge}
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-serif italic tracking-tight ${
                isLightText ? 'text-white drop-shadow-sm' : 'text-[#1A1A1A]'
              }`}
            >
              {t.servicesTitle}
            </h2>
            <p
              className={`mt-2 text-sm max-w-xl font-normal ${
                isLightText ? 'text-stone-200/90' : 'text-[#1A1A1A]/60'
              }`}
            >
              {t.servicesSubtitle}
            </p>
          </div>

          {/* Quick Add Banner Card - Only shown for Admin */}
          {isAdminAuthorized && (
            <div className="flex flex-wrap items-center gap-3">
              {onOpenAdminSettings && (
                <button
                  type="button"
                  onClick={() => onOpenAdminSettings('settings', 'services')}
                  id="btn-customize-services-bg"
                  className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-stone-900 px-3.5 py-2.5 rounded-2xl text-xs font-semibold shadow-md transition-all cursor-pointer backdrop-blur-md border border-stone-200"
                  title="ფონის შეცვლა ან გამორთვა"
                >
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  <span>ფონის პარამეტრები</span>
                </button>
              )}

              <div
                onClick={onOpenAddService}
                id="btn-add-service-quick"
                className="bg-amber-50/95 hover:bg-amber-100 p-4 sm:p-5 rounded-3xl relative overflow-hidden group cursor-pointer border border-amber-300/80 shadow-md transition-all shrink-0 backdrop-blur-md"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-amber-900">
                      {t.servicesQuickAdd}
                    </div>
                    <div className="text-xs font-serif italic text-stone-900 font-medium">
                      {t.servicesQuickAddSub}
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-center bg-stone-900 group-hover:bg-black p-2 rounded-xl text-amber-300 transition-all shadow-xs">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services Grid */}
        {activeServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                whatsappNumber={settings?.whatsappNumber}
                onBookService={onBookService}
                language={language}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/95 backdrop-blur-md rounded-3xl border border-black/5 p-8 shadow-sm">
            <p className="text-[#1A1A1A]/70 text-sm">
              {language === 'en' ? 'No active services available.' : 'აქტიური მომსახურებები არ არის დამატებული.'}
            </p>
            <button
              onClick={onOpenAddService}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:underline cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {t.adminAddService}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
