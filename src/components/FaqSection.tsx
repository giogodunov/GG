import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone, Image as ImageIcon } from 'lucide-react';
import { Language, SiteSettings } from '../types';
import { SEO_FAQS, FaqItem } from '../data/seoData';
import { formatImageUrl, getObjectPositionStyle } from '../utils/imageHelper';
import { SectionCoverKey } from './SectionCoverCustomizer';

interface FaqSectionProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
  onOpenAdminSettings?: (tab?: 'services' | 'tours' | 'guides' | 'inquiries' | 'settings', sectionCover?: SectionCoverKey) => void;
  isAdminAuthorized?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  settings,
  language,
  onOpenBooking,
  onOpenAdminSettings,
  isAdminAuthorized = false
}) => {
  const isEn = language === 'en';
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelKa: 'ყველა კითხვა', labelEn: 'All Questions' },
    { id: 'booking', labelKa: 'დაჯავშნა', labelEn: 'Booking' },
    { id: 'transfer', labelKa: 'ტრანსფერები', labelEn: 'Transfers' },
    { id: 'payment', labelKa: 'გადახდა & ფასები', labelEn: 'Payments & Pricing' },
    { id: 'general', labelKa: 'ზოგადი', labelEn: 'General' }
  ];

  const filteredFaqs = SEO_FAQS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const formattedCoverUrl = formatImageUrl(settings?.faqCoverImage);
  const hasCoverImage = Boolean(formattedCoverUrl && formattedCoverUrl.trim() !== '');
  const opacity = settings?.faqCoverOverlayOpacity !== undefined ? settings.faqCoverOverlayOpacity : 35;
  const isLightText =
    hasCoverImage &&
    (settings?.faqTextColorMode === 'light' ||
      (!settings?.faqTextColorMode && opacity >= 25) ||
      settings?.faqTextColorMode === 'auto');

  const mobilePos = getObjectPositionStyle(settings?.faqCoverPositionMobile);
  const desktopPos = getObjectPositionStyle(settings?.faqCoverPositionDesktop);

  const whatsappCleanNumber = (settings.whatsappNumber || '995555123456').replace(/[^0-9]/g, '');

  return (
    <section
      id="faq"
      className={`relative py-16 sm:py-20 border-b border-black/5 transition-all overflow-hidden ${
        hasCoverImage ? 'text-white' : 'text-[#1A1A1A] bg-[#F9F7F2]'
      }`}
    >
      {/* Background Cover Image with responsive alignment & overlay */}
      {hasCoverImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={formattedCoverUrl}
            alt="FAQ background mobile"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover sm:hidden"
            style={{ objectPosition: mobilePos }}
          />
          <img
            src={formattedCoverUrl}
            alt="FAQ background desktop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover hidden sm:block"
            style={{ objectPosition: desktopPos }}
          />
          <div
            className="absolute inset-0 bg-stone-950"
            style={{ opacity: opacity / 100 }}
          />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Top-Right Google Reviews Badge — positioned at the absolute top-right edge of the FAQ section */}
      {(() => {
        const googleUrl = settings?.googleBusinessUrl || 'https://share.google/ljHaCKoL7bDPdtIg3';
        return (
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 lg:right-8 z-20">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="faq-google-reviews-badge"
              title={isEn ? 'View In Georgia Tours on Google (5.0 ★)' : 'In Georgia Tours Google-ზე (5.0 ★)'}
              className={`group inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:scale-105 shadow-2xs cursor-pointer ${
                isLightText
                  ? 'text-white bg-white/15 hover:bg-white/25 border-white/25 backdrop-blur-md'
                  : 'text-stone-900 bg-white hover:bg-stone-50 border-stone-300 shadow-xs'
              }`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="font-bold">5.0</span>
              <span className={`text-[11px] underline underline-offset-2 ${
                isLightText ? 'text-white/90 group-hover:text-amber-300' : 'text-stone-700 group-hover:text-amber-600'
              }`}>
                {isEn ? 'Google Reviews' : 'Google შეფასებები'}
              </span>
            </a>
          </div>
        );
      })()}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 relative">
          <div
            className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest mb-2 ${
              isLightText ? 'text-amber-300 drop-shadow-xs' : 'text-[#1A1A1A]/40'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isEn ? 'Common Questions' : 'ხშირად დასმული კითხვები'}</span>
          </div>

          <h2
            className={`text-center text-3xl sm:text-4xl lg:text-5xl font-serif italic tracking-tight ${
              isLightText ? 'text-white drop-shadow-xs' : 'text-[#1A1A1A]'
            }`}
          >
            {isEn ? 'Frequently Asked Questions' : 'კითხვები & პასუხები'}
          </h2>
          <p
            className={`text-center mt-3 text-sm max-w-xl mx-auto ${
              isLightText ? 'text-stone-200 drop-shadow-xs' : 'text-[#1A1A1A]/60'
            }`}
          >
            {isEn
              ? 'Everything you need to know about our private tours, Kutaisi & Tbilisi airport transfers, and flexible booking conditions.'
              : 'ყველაფერი რაც უნდა იცოდეთ ჩვენი ტურების, აეროპორტის ტრანსფერებისა და დაჯავშნის პირობების შესახებ.'}
          </p>

          {isAdminAuthorized && onOpenAdminSettings && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => onOpenAdminSettings('settings', 'faq')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 hover:bg-white text-stone-900 border border-stone-300 shadow-xs cursor-pointer backdrop-blur-xs"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>ფონის მორგება</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white/80 text-[#1A1A1A]/70 hover:bg-white hover:text-black border border-black/5'
              }`}
            >
              {isEn ? cat.labelEn : cat.labelKa}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 hover:bg-black/[0.01] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-medium text-[#1A1A1A] pr-2">
                    {isEn ? faq.questionEn : faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F9F7F2] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-black text-white' : 'text-[#1A1A1A]/60'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed border-t border-black/[0.04]">
                    <p>{isEn ? faq.answerEn : faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Callout */}
        <div className="mt-10 bg-white rounded-2xl border border-black/5 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="text-sm font-serif italic text-[#1A1A1A] font-semibold">
              {isEn ? 'Have another question?' : 'ვერ იპოვეთ პასუხი?'}
            </h4>
            <p className="text-xs text-[#1A1A1A]/60 mt-0.5">
              {isEn
                ? 'Send us a message on WhatsApp or submit a quick custom inquiry.'
                : 'მოგვწერეთ WhatsApp-ში ან გამოგვიგზავნეთ ინდივიდუალური მოთხოვნა.'}
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(
                isEn ? 'Hello! I have a question about travel in Georgia.' : 'გამარჯობა! მაქვს შეკითხვა ტურებთან დაკავშირებით.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <span>{isEn ? 'Ask a Question' : 'კითხვის დასმა'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
