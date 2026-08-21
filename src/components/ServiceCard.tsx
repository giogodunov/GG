import React from 'react';
import { Plane, UserCheck, Car, Compass, Shield, Clock, MapPin, ArrowUpRight, Check } from 'lucide-react';
import { Service, Language } from '../types';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { translations } from '../utils/translations';

interface ServiceCardProps {
  service: Service;
  whatsappNumber?: string;
  onBookService: (service: Service) => void;
  language: Language;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  whatsappNumber,
  onBookService,
  language
}) => {
  const t = translations[language];

  const title = (language === 'en' && service.titleEn) ? service.titleEn : service.title;
  const priceInfo = (language === 'en' && service.priceInfoEn) ? service.priceInfoEn : service.priceInfo;
  const description = (language === 'en' && service.shortDescriptionEn) ? service.shortDescriptionEn : service.shortDescription;
  const features = (language === 'en' && service.featuresEn && service.featuresEn.length > 0) ? service.featuresEn : service.features;

  const getIcon = () => {
    switch (service.iconName) {
      case 'plane':
        return <Plane className="w-5 h-5" />;
      case 'user-check':
        return <UserCheck className="w-5 h-5" />;
      case 'car':
        return <Car className="w-5 h-5" />;
      case 'compass':
        return <Compass className="w-5 h-5" />;
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'clock':
        return <Clock className="w-5 h-5" />;
      case 'map-pin':
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppDirect(whatsappNumber, {
      itemTitle: title,
      itemType: 'service'
    });
  };

  return (
    <div
      id={`service-card-${service.id}`}
      className="bg-white rounded-3xl border border-black/5 p-6 shadow-2xs hover:shadow-xs hover:border-black/15 transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Top bar with Icon and Price */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#F9F7F2] border border-black/5 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
            {getIcon()}
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#1A1A1A]/40 block uppercase tracking-wider">{t.indicativePrice}</span>
            <span className="text-xs font-serif italic underline underline-offset-4 text-[#1A1A1A] font-semibold">
              {priceInfo}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif italic text-[#1A1A1A] group-hover:text-black transition-colors leading-snug">
          {title}
        </h3>

        {/* Short description */}
        <p className="mt-2 text-xs text-[#1A1A1A]/60 leading-relaxed font-normal">
          {description}
        </p>

        {/* Features / Bullets */}
        {features && features.length > 0 && (
          <ul className="mt-4 space-y-2 pt-4 border-t border-black/5">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#1A1A1A]/80">
                <Check className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action CTA buttons */}
      <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          id={`btn-service-whatsapp-${service.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] py-2.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => onBookService(service)}
          id={`btn-service-book-${service.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1 bg-black text-white hover:bg-black/90 py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>{t.bookService}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
