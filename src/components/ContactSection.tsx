import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Settings, ShieldCheck, Heart } from 'lucide-react';
import { SiteSettings, Language } from '../types';
import { translations } from '../utils/translations';
import { BrandLogo } from './BrandLogo';

interface ContactSectionProps {
  settings: SiteSettings;
  onOpenAdmin: (tab?: 'services' | 'tours' | 'inquiries' | 'settings') => void;
  onOpenBooking: () => void;
  language: Language;
  isAdminAuthorized?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  onOpenAdmin,
  onOpenBooking,
  language,
  isAdminAuthorized = false
}) => {
  const t = translations[language];
  const cleanWhatsApp = (settings?.whatsappNumber || '+995555123456').replace(/[^0-9]/g, '');
  const whatsAppMsg =
    language === 'en'
      ? 'Hello! I am contacting you regarding your tours in Georgia.'
      : 'გამარჯობა! გიკავშირდებით ტურებთან დაკავშირებით.';

  const directWhatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(whatsAppMsg)}`;

  return (
    <footer id="contact" className="text-[#1A1A1A] pt-16 pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-black/5">
          {/* Brand & About */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo sizeClass="text-3xl" />
            <p className="text-xs sm:text-sm text-[#1A1A1A]/60 max-w-md leading-relaxed font-normal">
              {language === 'en'
                ? (settings?.taglineEn || 'Crafted private and customized journeys across Georgia with dedicated local hosts and drivers.')
                : (settings?.tagline || 'ავთენტური და კომფორტული მოგზაურობა საქართველოს ნებისმიერ კუთხეში.')}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5D1C5]/30 text-[11px] text-[#1A1A1A]/80 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>{t.transparencyNote}</span>
              </div>
            </div>
          </div>

          {/* Quick Contacts */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-4">
              {t.footerContact}
            </h4>
            <ul className="space-y-3 text-xs text-[#1A1A1A]/70">
              <li>
                <a
                  href={`tel:${(settings?.displayPhone || settings?.phone || '+995555123456').replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2.5 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#1A1A1A]/50" />
                  <span>{settings?.displayPhone || settings?.phone || '+995 555 12 34 56'}</span>
                </a>
              </li>
              <li>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp: {settings?.whatsappNumber || '+995 555 12 34 56'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings?.email || 'info@ingeorgiatours.ge'}`}
                  className="flex items-center gap-2.5 hover:text-black transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#1A1A1A]/50" />
                  <span>{settings?.email || 'info@ingeorgiatours.ge'}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#1A1A1A]/60">
                <MapPin className="w-4 h-4 text-[#1A1A1A]/50" />
                <span>
                  {language === 'en'
                    ? (settings?.locationEn && settings.locationEn !== 'Tbilisi, Georgia' ? settings.locationEn : 'Kutaisi, Georgia')
                    : (settings?.location && settings.location !== 'თბილისი, საქართველო' ? settings.location : 'ქუთაისი, საქართველო')}
                </span>
              </li>
            </ul>
          </div>

          {/* Working hours & Admin */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-4">
              {t.footerHours}
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
              {language === 'en'
                ? (settings?.workHoursEn || settings?.workHours || settings?.workingHours || 'Everyday: 09:00 - 21:00 (GMT+4)')
                : (settings?.workHours || settings?.workingHours || 'ყოველდღე: 09:00 - 21:00')}
            </p>
            <p className="text-[11px] text-[#1A1A1A]/40 mt-1">
              {t.footerResponseTime}
            </p>

            {/* Footer Admin Button - Always visible for owner */}
            <div className="mt-6 pt-4 border-t border-black/5">
              <button
                type="button"
                onClick={() => onOpenAdmin('services')}
                id="footer-admin-btn"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3.5 py-2 rounded-xl border border-amber-300/80 transition-colors cursor-pointer shadow-2xs"
              >
                <Settings className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.adminPanelBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#1A1A1A]/40 gap-4">
          <p>© {new Date().getFullYear()} InGeorgiaTours. {t.footerCopyright}</p>
          <div className="flex items-center gap-1 text-[11px] text-[#1A1A1A]/40">
            <span>{t.madeWithPassion}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
