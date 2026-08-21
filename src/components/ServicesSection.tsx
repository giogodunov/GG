import React from 'react';
import { Plus } from 'lucide-react';
import { Service, SiteSettings, Language } from '../types';
import { ServiceCard } from './ServiceCard';
import { translations } from '../utils/translations';

interface ServicesSectionProps {
  services: Service[];
  settings: SiteSettings;
  onBookService: (service: Service) => void;
  onOpenAddService: () => void;
  language: Language;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  settings,
  onBookService,
  onOpenAddService,
  language
}) => {
  const t = translations[language];
  const activeServices = services.filter((s) => s.isActive);

  return (
    <section id="services" className="py-16 sm:py-24 text-[#1A1A1A] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-block text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-2">
              {t.servicesBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#1A1A1A] tracking-tight">
              {t.servicesTitle}
            </h2>
            <p className="mt-2 text-sm text-[#1A1A1A]/60 max-w-xl font-normal">
              {t.servicesSubtitle}
            </p>
          </div>

          {/* Quick Add Banner Card */}
          <div
            onClick={onOpenAddService}
            id="btn-add-service-quick"
            className="bg-[#C5D1C5]/30 hover:bg-[#C5D1C5]/50 p-5 sm:p-6 rounded-3xl relative overflow-hidden group cursor-pointer border border-black/5 transition-all shrink-0"
          >
            <div className="relative z-10">
              <div className="text-[10px] uppercase font-bold tracking-widest mb-1 text-[#1A1A1A]/70">
                {t.servicesQuickAdd}
              </div>
              <div className="text-base font-serif italic text-[#1A1A1A] mb-2 font-medium">
                {t.servicesQuickAddSub}
              </div>
              <div className="inline-flex items-center justify-center bg-black group-hover:bg-black/80 p-2 rounded-xl text-white transition-all">
                <Plus className="w-4 h-4" />
              </div>
            </div>
            {/* Watermark Symbol */}
            <div className="absolute -right-3 -bottom-3 opacity-10 group-hover:opacity-20 transition-opacity text-[#1A1A1A] pointer-events-none">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
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
          <div className="text-center py-12 bg-white rounded-3xl border border-black/5 p-8">
            <p className="text-[#1A1A1A]/50 text-sm">
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
