import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone, Image as ImageIcon } from 'lucide-react';
import { Language, SiteSettings } from '../types';
import { SEO_FAQS, FaqItem } from '../data/seoData';
import { formatImageUrl, getObjectPositionStyle } from '../utils/imageHelper';

interface FaqSectionProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
  onOpenAdminSettings?: (tab?: 'services' | 'settings') => void;
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
            className={`text-3xl sm:text-4xl lg:text-5xl font-serif italic tracking-tight ${
              isLightText ? 'text-white drop-shadow-xs' : 'text-[#1A1A1A]'
            }`}
          >
            {isEn ? 'Frequently Asked Questions' : 'კითხვები & პასუხები'}
          </h2>
          <p
            className={`mt-3 text-sm max-w-xl mx-auto ${
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
                onClick={() => onOpenAdminSettings('settings')}
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
