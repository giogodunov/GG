import React, { useState } from 'react';
import { Settings, Menu, X } from 'lucide-react';
import { SiteSettings, Language } from '../types';
import { translations } from '../utils/translations';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  settings: SiteSettings;
  newInquiriesCount: number;
  onOpenAdmin: (tab?: 'tours' | 'services' | 'inquiries' | 'settings') => void;
  onOpenContact: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isAdminAuthorized?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  newInquiriesCount,
  onOpenAdmin,
  onOpenContact,
  activeSection,
  onSelectSection,
  language,
  onLanguageChange,
  isAdminAuthorized = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const cleanWhatsApp = (settings?.whatsappNumber || '+995555123456').replace(/[^0-9]/g, '');
  const whatsAppMessage =
    language === 'en'
      ? 'Hello! I would like to enquire about your private tours and travel services in Georgia.'
      : 'გამარჯობა! მაინტერესებს თქვენი ტურები და მომსახურებები საქართველოში.';

  const directWhatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(whatsAppMessage)}`;

  const navItems = [
    { id: 'tours', label: t.navTours },
    { id: 'services', label: t.navServices },
    { id: 'contact', label: t.navContact }
  ];

  const handleNavClick = (id: string) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      style={{ backgroundColor: '#1B3B2B' }}
      className="sticky top-0 z-40 backdrop-blur-md text-white border-b border-emerald-950/40 shadow-md transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand in Artistic Flair typography */}
        <button
          onClick={() => handleNavClick('tours')}
          id="brand-logo-button"
          className="text-left group cursor-pointer"
        >
          <BrandLogo
            sizeClass="text-2xl"
            showTagline={true}
            light={true}
            tagline={
              language === 'en'
                ? (settings?.taglineEn || 'Georgia Tours & Travel')
                : (settings?.brandName || 'InGeorgiaTours')
            }
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs uppercase tracking-widest text-emerald-100/80 font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors cursor-pointer hover:text-white ${
                activeSection === item.id
                  ? 'text-white font-bold border-b-2 border-amber-400 pb-0.5'
                  : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher Selector */}
          <div
            id="language-switcher-desktop"
            className="flex items-center bg-black/25 border border-emerald-700/40 rounded-xl p-1 shadow-inner"
          >
            <button
              type="button"
              id="lang-btn-ka"
              onClick={() => onLanguageChange('ka')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                language === 'ka'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-emerald-100/70 hover:text-white'
              }`}
              title="ქართული ენა"
            >
              GE
            </button>
            <button
              type="button"
              id="lang-btn-en"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-emerald-100/70 hover:text-white'
              }`}
              title="English Language"
            >
              EN
            </button>
          </div>

          {/* Direct WhatsApp Button */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-direct-btn"
            className="flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide hover:brightness-105 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Quick Booking CTA */}
          <button
            type="button"
            id="nav-quick-booking-btn"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#1B3B2B] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <span>{t.navBook}</span>
          </button>

          {/* Admin Panel button - Only shown when in admin mode */}
          {isAdminAuthorized && (
            <button
              type="button"
              id="nav-admin-btn"
              onClick={() => onOpenAdmin('services')}
              className="p-2 rounded-xl text-amber-300 bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer relative"
              title={t.adminPanelBtn}
              aria-label={t.adminPanelBtn}
            >
              <Settings className="w-4 h-4" />
              {newInquiriesCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Burger and Language switcher */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center bg-black/25 border border-emerald-700/40 rounded-lg p-0.5">
            <button
              onClick={() => onLanguageChange('ka')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                language === 'ka' ? 'bg-emerald-500 text-white' : 'text-emerald-100/70'
              }`}
            >
              GE
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                language === 'en' ? 'bg-emerald-500 text-white' : 'text-emerald-100/70'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#25D366] text-white rounded-xl"
            aria-label="WhatsApp"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        <button
          type="button"
          id="btn-mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-xl cursor-pointer"
          aria-label="მენიუს გახსნა"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {mobileMenuOpen && (
      <div
        id="mobile-nav-menu"
        className="sm:hidden border-t border-emerald-900/50 bg-[#1B3B2B] px-4 pt-3 pb-6 space-y-3 shadow-lg"
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-3 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold ${
                activeSection === item.id
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-emerald-100/80 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="pt-3 border-t border-emerald-900/50 flex flex-col gap-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-[#1B3B2B] rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-sm"
          >
            {t.navBook}
          </button>

          {isAdminAuthorized && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin('services');
              }}
              className="w-full py-2.5 bg-white/10 border border-white/15 text-amber-300 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>{t.adminPanelBtn}</span>
              {newInquiriesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>
          )}
        </div>
      </div>
    )}
  </header>
  );
};
