import React, { useState, useEffect, useMemo } from 'react';
import { Tour, Service, BookingInquiry, SiteSettings, Language, TravelGuide } from './types';
import {
  loadTours,
  saveTours,
  loadServices,
  saveServices,
  loadGuides,
  saveGuides,
  loadInquiries,
  saveInquiry,
  updateInquiries,
  loadSettings,
  saveSettings,
  fetchServerData,
  resetAllDataToDefaults,
  loadLanguage,
  saveLanguage
} from './utils/storage';
import { translations } from './utils/translations';
import { Navbar } from './components/Navbar';
import { HeroMinimal } from './components/HeroMinimal';
import { TourCard } from './components/TourCard';
import { TourDetailModal } from './components/TourDetailModal';
import { ServicesSection } from './components/ServicesSection';
import { AboutPricingSection } from './components/AboutPricingSection';
import { ContactSection } from './components/ContactSection';
import { BookingFormModal } from './components/BookingFormModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Toast } from './components/Toast';
import { SeoStructuredData } from './components/SeoStructuredData';
import { TravelGuidesSection } from './components/TravelGuidesSection';
import { FaqSection } from './components/FaqSection';
import { Compass, PlusCircle, Settings } from 'lucide-react';

export default function App() {
  // Language state: 'ka' (Georgian) or 'en' (English)
  const [language, setLanguage] = useState<Language>(loadLanguage());

  // Primary persistent data states
  const [tours, setTours] = useState<Tour[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [guides, setGuides] = useState<TravelGuide[]>([]);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(loadSettings());

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeNavSection, setActiveNavSection] = useState('tours');

  // Modals state
  const [selectedTourDetails, setSelectedTourDetails] = useState<Tour | null>(null);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    initialItem?: {
      type: 'tour' | 'service' | 'general';
      title: string;
      id?: string;
    };
  }>({ isOpen: false });

  const [adminModal, setAdminModal] = useState<{
    isOpen: boolean;
    tab: 'services' | 'tours' | 'guides' | 'inquiries' | 'settings';
  }>({ isOpen: false, tab: 'services' });

  // Admin access mode: Only authorized if accessed via secret link (#admin, ?admin=secret) or saved in localStorage
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(() => {
    try {
      return localStorage.getItem('geo_admin_authorized') === 'true';
    } catch {
      return false;
    }
  });

  // Toast state
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const t = translations[language];

  // Initialize data on load and sync with server
  useEffect(() => {
    const localTours = loadTours();
    const localServices = loadServices();
    const localGuides = loadGuides();
    const localInquiries = loadInquiries();
    const localSettings = loadSettings();

    setTours(localTours);
    setServices(localServices);
    setGuides(localGuides);
    setInquiries(localInquiries);
    setSettings(localSettings);

    // Asynchronously fetch server data for visitors
    fetchServerData().then((serverData) => {
      if (serverData) {
        if (serverData.settings) setSettings(serverData.settings);
        if (serverData.tours && Array.isArray(serverData.tours)) {
          setTours(serverData.tours);
          // Check if a tour was deep-linked in URL ?tour=id
          const params = new URLSearchParams(window.location.search);
          const deepTourId = params.get('tour');
          if (deepTourId) {
            const found = serverData.tours.find((t: Tour) => t.id === deepTourId);
            if (found) setSelectedTourDetails(found);
          }
        }
        if (serverData.services && Array.isArray(serverData.services)) setServices(serverData.services);
        if (serverData.guides && Array.isArray(serverData.guides)) setGuides(serverData.guides);
        if (serverData.inquiries && Array.isArray(serverData.inquiries)) setInquiries(serverData.inquiries);
      } else {
        // If server was just initialized and empty, sync our local customized settings to server
        if (localSettings.heroCoverImage) {
          saveSettings(localSettings);
        }
      }
    });

    // Check URL parameters or hash on mount for language or secret admin entry
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'ka') {
      setLanguage(langParam);
      saveLanguage(langParam);
    }

    const deepTourId = params.get('tour');
    if (deepTourId) {
      const found = localTours.find((t) => t.id === deepTourId);
      if (found) setSelectedTourDetails(found);
    }

    const checkAdminAccess = () => {
      const p = new URLSearchParams(window.location.search);
      const h = window.location.hash.toLowerCase();
      if (p.get('admin') === 'secret' || p.has('admin') || h === '#admin' || h === '#geoadmin') {
        setIsAdminAuthorized(true);
        try {
          localStorage.setItem('geo_admin_authorized', 'true');
        } catch {}
        setAdminModal({ isOpen: true, tab: 'services' });
      }
    };

    checkAdminAccess();
    window.addEventListener('hashchange', checkAdminAccess);

    // Secret keyboard shortcut (Ctrl + Shift + A) to open admin panel directly
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminAuthorized(true);
        try {
          localStorage.setItem('geo_admin_authorized', 'true');
        } catch {}
        setAdminModal((prev) => ({ isOpen: !prev.isOpen, tab: 'services' }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkAdminAccess);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    saveLanguage(lang);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  // Updaters
  const handleUpdateTours = (newTours: Tour[]) => {
    setTours(newTours);
    saveTours(newTours);
  };

  const handleUpdateServices = (newServices: Service[]) => {
    setServices(newServices);
    saveServices(newServices);
  };

  const handleUpdateGuides = (newGuides: TravelGuide[]) => {
    setGuides(newGuides);
    saveGuides(newGuides);
  };

  const handleUpdateInquiries = (newInquiries: BookingInquiry[]) => {
    setInquiries(newInquiries);
    updateInquiries(newInquiries);
  };

  const handleUpdateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleResetData = () => {
    resetAllDataToDefaults();
    setTours(loadTours());
    setServices(loadServices());
    setGuides(loadGuides());
    setSettings(loadSettings());
  };

  const handleCreateInquiry = (inquiryData: {
    customerName: string;
    phone: string;
    email?: string;
    preferredContact: 'whatsapp' | 'call' | 'email';
    itemType: 'tour' | 'service' | 'general';
    itemTitle: string;
    itemId?: string;
    preferredDate?: string;
    peopleCount?: number;
    notes?: string;
  }) => {
    saveInquiry(inquiryData);
    setInquiries(loadInquiries());
    showToast(
      language === 'en'
        ? 'Inquiry successfully submitted! We will contact you shortly.'
        : 'მოთხოვნა წარმატებით გაიგზავნა! მალე დაგიკავშირდებით.'
    );
  };

  // Filtered active tours with bilingual search support
  const filteredTours = useMemo(() => {
    return tours
      .filter((tour) => tour.isActive)
      .filter((tour) => {
        if (selectedCategory !== 'all' && tour.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = tour.title.toLowerCase().includes(q) || (tour.titleEn?.toLowerCase().includes(q) ?? false);
          const matchRegion = tour.region.toLowerCase().includes(q) || (tour.regionEn?.toLowerCase().includes(q) ?? false);
          const matchDesc = tour.shortDescription.toLowerCase().includes(q) || (tour.shortDescriptionEn?.toLowerCase().includes(q) ?? false);
          const matchHl = tour.highlights.some((h) => h.toLowerCase().includes(q)) || (tour.highlightsEn?.some((h) => h.toLowerCase().includes(q)) ?? false);
          return matchTitle || matchRegion || matchDesc || matchHl;
        }
        return true;
      });
  }, [tours, selectedCategory, searchQuery]);

  const newInquiriesCount = useMemo(() => {
    return inquiries.filter((i) => i.status === 'new').length;
  }, [inquiries]);

  return (
    <div
      style={{ backgroundColor: settings.backgroundColor || '#F9F7F2' }}
      className="min-h-screen text-[#1A1A1A] flex flex-col font-['Noto_Sans_Georgian','Plus_Jakarta_Sans',sans-serif] transition-colors duration-300"
    >
      {/* Dynamic SEO Meta & Schema.org JSON-LD structured data */}
      <SeoStructuredData
        settings={settings}
        tours={tours}
        language={language}
        activeTour={selectedTourDetails}
      />

      {/* Navigation Bar with Language Switcher */}
      <Navbar
        settings={settings}
        newInquiriesCount={newInquiriesCount}
        onOpenAdmin={(tab = 'services') => setAdminModal({ isOpen: true, tab })}
        onOpenContact={() =>
          setBookingModal({
            isOpen: true,
            initialItem: {
              type: 'general',
              title: language === 'en' ? 'Custom Tour Inquiry' : 'ინდივიდუალური მოთხოვნა'
            }
          })
        }
        activeSection={activeNavSection}
        onSelectSection={setActiveNavSection}
        language={language}
        onLanguageChange={handleLanguageChange}
        isAdminAuthorized={isAdminAuthorized}
      />

      {/* Hero Minimal */}
      <HeroMinimal
        settings={settings}
        onQuickBookClick={() =>
          setBookingModal({
            isOpen: true,
            initialItem: {
              type: 'general',
              title: language === 'en' ? 'Custom Tour Inquiry' : 'ინდივიდუალური მოთხოვნა'
            }
          })
        }
        language={language}
      />

      {/* Main Tours Section */}
      <main id="tours" className="flex-1 py-16 sm:py-20 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-1">
                {t.toursBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#1A1A1A] tracking-tight">
                {t.toursTitle}
              </h2>
              <p className="mt-2 text-sm text-[#1A1A1A]/60 max-w-xl font-normal">
                {t.toursSubtitle}
              </p>
            </div>

            {/* Quick action button for adding tour - Only for Admin */}
            {isAdminAuthorized && (
              <button
                onClick={() => setAdminModal({ isOpen: true, tab: 'tours' })}
                id="btn-add-tour-shortcut"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors self-start sm:self-auto shrink-0 shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>{t.adminAddTour}</span>
              </button>
            )}
          </div>

          {/* Tours Grid */}
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  whatsappNumber={settings?.whatsappNumber}
                  onViewDetails={(tourItem) => setSelectedTourDetails(tourItem)}
                  onBookTour={(tourItem) =>
                    setBookingModal({
                      isOpen: true,
                      initialItem: {
                        type: 'tour',
                        title: (language === 'en' && tourItem.titleEn) ? tourItem.titleEn : tourItem.title,
                        id: tourItem.id
                      }
                    })
                  }
                  language={language}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-black/5 p-8">
              <Compass className="w-12 h-12 text-[#1A1A1A]/20 mx-auto mb-3" />
              <h3 className="text-base font-serif italic text-[#1A1A1A]">
                {t.noToursFound}
              </h3>
              <p className="text-xs text-[#1A1A1A]/50 mt-1 max-w-sm mx-auto">
                {t.tryDifferentSearch}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-black/80 transition-colors cursor-pointer"
              >
                {t.showAllTours}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Services Section (Transfer, Guide, Vehicle, Custom) */}
      <ServicesSection
        services={services}
        settings={settings}
        onBookService={(srv) =>
          setBookingModal({
            isOpen: true,
            initialItem: {
              type: 'service',
              title: (language === 'en' && srv.titleEn) ? srv.titleEn : srv.title,
              id: srv.id
            }
          })
        }
        onOpenAddService={() => setAdminModal({ isOpen: true, tab: 'services' })}
        onOpenAdminSettings={(tab = 'settings') => setAdminModal({ isOpen: true, tab })}
        language={language}
        isAdminAuthorized={isAdminAuthorized}
      />

      {/* Travel Guides & Local Insights Section (SEO Traffic Magnet) */}
      <TravelGuidesSection
        guides={guides}
        settings={settings}
        language={language}
        onBookTour={(tourId, title) => {
          if (tourId) {
            const found = tours.find((t) => t.id === tourId);
            if (found) {
              setSelectedTourDetails(found);
              return;
            }
          }
          setBookingModal({
            isOpen: true,
            initialItem: {
              type: 'general',
              title: title || (language === 'en' ? 'Custom Tour Inquiry' : 'ინდივიდუალური მოთხოვნა')
            }
          });
        }}
      />

      {/* Frequently Asked Questions (FAQ) Section with Rich Snippets */}
      <FaqSection
        settings={settings}
        language={language}
        onOpenBooking={() =>
          setBookingModal({
            isOpen: true,
            initialItem: {
              type: 'general',
              title: language === 'en' ? 'Question & Tour Inquiry' : 'კითხვა & კონსულტაცია'
            }
          })
        }
      />

      {/* Minimalist Contact & Footer */}
      <ContactSection
        settings={settings}
        onOpenAdmin={(tab = 'services') => setAdminModal({ isOpen: true, tab })}
        onOpenBooking={() =>
          setBookingModal({
            isOpen: true,
            initialItem: {
              type: 'general',
              title: language === 'en' ? 'Custom Tour Inquiry' : 'ინდივიდუალური მოთხოვნა'
            }
          })
        }
        language={language}
        isAdminAuthorized={isAdminAuthorized}
      />

      {/* Floating Quick Admin Panel Button (Bottom-Left) - Only visible when authorized via secret link */}
      {isAdminAuthorized && (
        <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40">
          <button
            type="button"
            id="floating-admin-quick-btn"
            onClick={() => setAdminModal({ isOpen: true, tab: 'services' })}
            className="flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#152e22] text-amber-300 border-2 border-amber-400/70 px-3.5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
            title={t.adminPanelBtn}
            aria-label={t.adminPanelBtn}
          >
            <Settings className="w-4 h-4 text-amber-400 animate-[spin_6s_linear_infinite]" />
            <span className="text-xs font-bold tracking-wide pr-1">სამართავი პანელი</span>
            {inquiries.filter((i) => i.status === 'new').length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>
      )}

      {/* Tour Detail Modal */}
      <TourDetailModal
        tour={selectedTourDetails}
        settings={settings}
        onClose={() => setSelectedTourDetails(null)}
        onOpenBookingForm={(tour) =>
          setBookingModal({
            isOpen: true,
            initialItem: {
              type: 'tour',
              title: (language === 'en' && tour.titleEn) ? tour.titleEn : tour.title,
              id: tour.id
            }
          })
        }
        language={language}
      />

      {/* Booking & WhatsApp Inquiry Modal */}
      <BookingFormModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false })}
        initialItem={bookingModal.initialItem}
        tours={tours.filter((t) => t.isActive)}
        services={services.filter((s) => s.isActive)}
        settings={settings}
        onSubmitInquiry={handleCreateInquiry}
        language={language}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={adminModal.isOpen}
        initialTab={adminModal.tab}
        onClose={() => setAdminModal({ isOpen: false, tab: 'services' })}
        tours={tours}
        services={services}
        guides={guides}
        inquiries={inquiries}
        settings={settings}
        onUpdateTours={handleUpdateTours}
        onUpdateServices={handleUpdateServices}
        onUpdateGuides={handleUpdateGuides}
        onUpdateInquiries={handleUpdateInquiries}
        onUpdateSettings={handleUpdateSettings}
        onResetAllData={handleResetData}
        onShowToast={(msg) => showToast(msg, 'success')}
      />

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
