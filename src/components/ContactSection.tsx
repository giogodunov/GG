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

              {(() => {
                const googleUrl = settings?.googleBusinessUrl || 'https://share.google/ljHaCKoL7bDPdtIg3';
                return (
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-google-badge"
                    title={language === 'en' ? 'View Google Business Profile and customer reviews' : 'Google ბიზნეს პროფილისა და შეფასებების ნახვა'}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:scale-105 border cursor-pointer ${
                      isLightText 
                        ? 'bg-white/15 hover:bg-white/25 text-white border-white/20 backdrop-blur-xs' 
                        : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-300 shadow-2xs'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="text-amber-400">★★★★★</span>
                    <span className="font-bold">5.0</span>
                    <span className="opacity-90">{language === 'en' ? 'Google Reviews' : 'Google შეფასებები'}</span>
                  </a>
                );
              })()}

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
              {(() => {
                const googleUrl = settings?.googleBusinessUrl || 'https://share.google/ljHaCKoL7bDPdtIg3';
                return (
                  <li>
                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="footer-google-profile-link"
                      className="flex items-center gap-2.5 hover:text-amber-300 transition-colors group"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span className="group-hover:underline">
                        {language === 'en' ? 'Google Profile & Reviews' : 'Google პროფილი & შეფასებები'}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                        5.0 ★
                      </span>
                    </a>
                  </li>
                );
              })()}
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
