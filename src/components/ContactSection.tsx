import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Settings, ShieldCheck, Heart, Image as ImageIcon } from 'lucide-react';
import { SiteSettings, Language } from '../types';
import { translations } from '../utils/translations';
import { BrandLogo } from './BrandLogo';
import { formatImageUrl, getObjectPositionStyle } from '../utils/imageHelper';
import { SectionCoverKey } from './SectionCoverCustomizer';

interface ContactSectionProps {
  settings: SiteSettings;
  onOpenAdmin: (tab?: 'services' | 'tours' | 'guides' | 'inquiries' | 'settings', sectionCover?: SectionCoverKey) => void;
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

  const formattedCoverUrl = formatImageUrl(settings?.footerCoverImage);
  const hasCoverImage = Boolean(formattedCoverUrl && formattedCoverUrl.trim() !== '');
  const opacity = settings?.footerCoverOverlayOpacity !== undefined ? settings.footerCoverOverlayOpacity : 45;
  const isLightText =
    hasCoverImage &&
    (settings?.footerTextColorMode === 'light' ||
      (!settings?.footerTextColorMode && opacity >= 25) ||
      settings?.footerTextColorMode === 'auto');

  const mobilePos = getObjectPositionStyle(settings?.footerCoverPositionMobile);
  const desktopPos = getObjectPositionStyle(settings?.footerCoverPositionDesktop);

  return (
    <footer
      id="contact"
      className={`relative pt-16 pb-12 border-t border-black/5 transition-all overflow-hidden ${
        hasCoverImage ? 'text-white' : 'text-[#1A1A1A]'
      }`}
    >
      {/* Background Cover Image with responsive alignment & overlay */}
      {hasCoverImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={formattedCoverUrl}
            alt="Footer background mobile"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover sm:hidden"
            style={{ objectPosition: mobilePos }}
          />
          <img
            src={formattedCoverUrl}
            alt="Footer background desktop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover hidden sm:block"
            style={{ objectPosition: desktopPos }}
          />
          <div
            className="absolute inset-0 bg-stone-950"
            style={{ opacity: opacity / 100 }}
          />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b ${isLightText ? 'border-white/15' : 'border-black/5'}`}>
          {/* Brand & About */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo sizeClass="text-3xl" lightText={isLightText} />
            <p className={`text-xs sm:text-sm max-w-md leading-relaxed font-normal ${isLightText ? 'text-stone-200' : 'text-[#1A1A1A]/60'}`}>
              {language === 'en'
                ? (settings?.taglineEn || 'Crafted private and customized journeys across Georgia with dedicated local hosts and drivers.')
                : (settings?.tagline || 'ავთენტური და კომფორტული მოგზაურობა საქართველოს ნებისმიერ კუთხეში.')}
            </p>
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium ${
                isLightText ? 'bg-white/15 text-white backdrop-blur-xs' : 'bg-[#C5D1C5]/30 text-[#1A1A1A]/80'
              }`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${isLightText ? 'text-amber-300' : 'text-[#1A1A1A]'}`} />
                <span>{t.transparencyNote}</span>
              </div>

              {isAdminAuthorized && (
                <button
                  type="button"
                  onClick={() => onOpenAdmin('settings', 'footer')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 hover:bg-white text-stone-900 border border-stone-300 shadow-xs cursor-pointer backdrop-blur-xs"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>ფონის მორგება</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Contacts */}
          <div>
            <h4 className={`text-xs uppercase font-bold tracking-widest mb-4 ${isLightText ? 'text-amber-300 drop-shadow-xs' : 'text-[#1A1A1A]/40'}`}>
              {t.footerContact}
            </h4>
            <ul className={`space-y-3 text-xs ${isLightText ? 'text-stone-200' : 'text-[#1A1A1A]/70'}`}>
              <li>
                <a
                  href={`tel:${(settings?.displayPhone || settings?.phone || '+995555123456').replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2.5 hover:text-amber-300 transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{settings?.displayPhone || settings?.phone || '+995 555 12 34 56'}</span>
                </a>
              </li>
              <li>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp: {settings?.whatsappNumber || '+995 555 12 34 56'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings?.email || 'info@ingeorgiatours.ge'}`}
                  className="flex items-center gap-2.5 hover:text-amber-300 transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{settings?.email || 'info@ingeorgiatours.ge'}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 shrink-0" />
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
            <h4 className={`text-xs uppercase font-bold tracking-widest mb-4 ${isLightText ? 'text-amber-300 drop-shadow-xs' : 'text-[#1A1A1A]/40'}`}>
              {t.footerHours}
            </h4>
            <p className={`text-xs leading-relaxed ${isLightText ? 'text-stone-200' : 'text-[#1A1A1A]/70'}`}>
              {language === 'en'
                ? (settings?.workHoursEn || settings?.workHours || settings?.workingHours || 'Everyday: 09:00 - 21:00 (GMT+4)')
                : (settings?.workHours || settings?.workingHours || 'ყოველდღე: 09:00 - 21:00')}
            </p>
            <p className={`text-[11px] mt-1 ${isLightText ? 'text-stone-300' : 'text-[#1A1A1A]/40'}`}>
              {t.footerResponseTime}
            </p>

            {/* Footer Admin Button - Only visible when authorized via secret link */}
            {isAdminAuthorized && (
              <div className={`mt-6 pt-4 border-t ${isLightText ? 'border-white/15' : 'border-black/5'}`}>
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
            )}
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4 ${isLightText ? 'text-stone-300' : 'text-[#1A1A1A]/40'}`}>
          <p>© {new Date().getFullYear()} InGeorgiaTours. {t.footerCopyright}</p>
          <div className="flex items-center gap-1">
            <span>{t.madeWithPassion}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
