import React from 'react';
import { Sparkles, MessageCircle, Phone, Calendar, ArrowRight, ShieldCheck, CreditCard, Clock } from 'lucide-react';
import { SiteSettings, Language } from '../types';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { translations } from '../utils/translations';

interface AboutPricingSectionProps {
  settings: SiteSettings;
  onOpenBooking: () => void;
  language: Language;
}

export const AboutPricingSection: React.FC<AboutPricingSectionProps> = ({
  settings,
  onOpenBooking,
  language
}) => {
  const t = translations[language];

  const handleWhatsApp = () => {
    openWhatsAppDirect(settings?.whatsappNumber, {
      itemTitle: language === 'en' ? 'General Inquiry / Price Clarification' : 'ფასებისა და პირობების დაზუსტება',
      itemType: 'general'
    });
  };

  const steps = [
    {
      num: '1',
      title: t.step1Title,
      desc: t.step1Desc
    },
    {
      num: '2',
      title: t.step2Title,
      desc: t.step2Desc
    },
    {
      num: '3',
      title: t.step3Title,
      desc: t.step3Desc
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 text-[#1A1A1A] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: About & Pricing Clarification */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-block text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-2">
                {t.aboutBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#1A1A1A] tracking-tight">
                {t.aboutTitle}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#1A1A1A]/70 leading-relaxed font-normal">
                {t.aboutDesc1}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#1A1A1A]/60 leading-relaxed font-normal">
                {t.aboutDesc2}
              </p>
            </div>

            {/* 3 Step Process Card */}
            <div className="space-y-4 pt-4 border-t border-black/5">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#1A1A1A]/50">
                {t.howToBook}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-black/5 shadow-2xs">
                    <span className="text-2xl font-serif italic text-[#1A1A1A] block mb-2">{step.num}</span>
                    <h4 className="text-xs font-serif italic text-[#1A1A1A] font-semibold mb-1">{step.title}</h4>
                    <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Fast Clarification Box */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-black/5 shadow-xs relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 block mb-1">
                  {t.fastContactBadge}
                </span>
                <h3 className="text-2xl font-serif italic text-[#1A1A1A]">
                  {t.fastContactTitle}
                </h3>
                <p className="mt-2 text-xs text-[#1A1A1A]/60 leading-relaxed font-normal">
                  {t.fastContactDesc}
                </p>
              </div>

              <div className="space-y-3">
                {/* WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  id="about-whatsapp-action-btn"
                  className="w-full flex items-center justify-between bg-[#25D366] hover:opacity-90 text-white py-3.5 px-5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-opacity cursor-pointer shadow-xs"
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>{t.whatsappFastInquiry}</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Direct Phone Call Button */}
                <a
                  href={`tel:${(settings?.displayPhone || settings?.phone || '+995555123456').replace(/[^0-9+]/g, '')}`}
                  id="about-call-action-btn"
                  className="w-full flex items-center justify-between bg-[#F9F7F2] hover:bg-[#F9F7F2]/80 text-[#1A1A1A] py-3 px-5 rounded-2xl text-xs font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#1A1A1A]" />
                    <span>{settings?.displayPhone || settings?.phone || '+995 555 12 34 56'}</span>
                  </span>
                  <span className="text-[10px] text-[#1A1A1A]/50">{t.directCall}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-black/5 text-center">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-xs text-[#1A1A1A]/70 hover:text-black underline underline-offset-4 cursor-pointer"
                >
                  {t.sendBookingRequest}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
