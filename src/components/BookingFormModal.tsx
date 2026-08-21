import React, { useState } from 'react';
import { X, Calendar, Phone, Mail, MessageCircle, Send, CheckCircle2, User, Users, FileText } from 'lucide-react';
import { Tour, Service, SiteSettings, Language } from '../types';
import { translations } from '../utils/translations';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: {
    type: 'tour' | 'service' | 'general';
    title: string;
    id?: string;
  };
  tours: Tour[];
  services: Service[];
  settings: SiteSettings;
  onSubmitInquiry: (inquiry: {
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
  }) => void;
  language: Language;
}

export const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  initialItem,
  tours,
  services,
  settings,
  onSubmitInquiry,
  language
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [itemType, setItemType] = useState<'tour' | 'service' | 'general'>(
    initialItem?.type || 'general'
  );
  const [selectedItemId, setSelectedItemId] = useState<string>(
    initialItem?.id || ''
  );
  const [customItemTitle, setCustomItemTitle] = useState<string>(
    initialItem?.title || ''
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [notes, setNotes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg(t.formValidationName);
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(t.formValidationPhone);
      return;
    }

    let finalTitle = customItemTitle;
    if (itemType === 'tour' && selectedItemId) {
      const found = tours.find((x) => x.id === selectedItemId);
      if (found) {
        finalTitle = (language === 'en' && found.titleEn) ? found.titleEn : found.title;
      }
    } else if (itemType === 'service' && selectedItemId) {
      const found = services.find((x) => x.id === selectedItemId);
      if (found) {
        finalTitle = (language === 'en' && found.titleEn) ? found.titleEn : found.title;
      }
    }

    onSubmitInquiry({
      customerName,
      phone,
      email: email.trim() || undefined,
      preferredContact,
      itemType,
      itemTitle: finalTitle || (language === 'en' ? 'General Inquiry' : 'ზოგადი მოთხოვნა'),
      itemId: selectedItemId || undefined,
      preferredDate: preferredDate || undefined,
      peopleCount: Number(peopleCount) || 1,
      notes: notes.trim() || undefined
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  const safeWhatsAppNumber = (settings?.whatsappNumber || '+995555123456').replace(/[^0-9]/g, '');

  return (
    <div
      id="booking-form-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="booking-form-modal-card"
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-black/10 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#F9F7F2] px-6 py-5 border-b border-black/5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 mb-0.5">
              {t.formModalBadge}
            </div>
            <h3 className="text-xl font-serif italic text-[#1A1A1A]">
              {t.formModalTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-black/5 rounded-full cursor-pointer transition-colors"
            aria-label={t.modalClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-[#25D366] mx-auto animate-bounce" />
            <h4 className="text-2xl font-serif italic text-[#1A1A1A]">{t.formSuccessTitle}</h4>
            <p className="text-xs text-[#1A1A1A]/60 max-w-xs mx-auto leading-relaxed">
              {t.formSuccessSubtitle}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs text-[#1A1A1A]">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Interest Item selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-1.5">
                {t.formInterestedIn}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setItemType('tour');
                    if (tours.length > 0 && !selectedItemId) setSelectedItemId(tours[0].id);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                    itemType === 'tour'
                      ? 'bg-black text-white border-black'
                      : 'bg-black/5 border-black/5 text-[#1A1A1A]/70 hover:bg-black/10'
                  }`}
                >
                  {t.formOptionTour}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setItemType('service');
                    if (services.length > 0 && !selectedItemId) setSelectedItemId(services[0].id);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                    itemType === 'service'
                      ? 'bg-black text-white border-black'
                      : 'bg-black/5 border-black/5 text-[#1A1A1A]/70 hover:bg-black/10'
                  }`}
                >
                  {t.formOptionService}
                </button>
                <button
                  type="button"
                  onClick={() => setItemType('general')}
                  className={`py-2 px-2 rounded-xl text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                    itemType === 'general'
                      ? 'bg-black text-white border-black'
                      : 'bg-black/5 border-black/5 text-[#1A1A1A]/70 hover:bg-black/10'
                  }`}
                >
                  {t.formOptionCustom}
                </button>
              </div>
            </div>

            {/* Dropdown for specific items */}
            {itemType === 'tour' && (
              <div>
                <label className="block text-[11px] text-[#1A1A1A]/60 mb-1">{t.formSelectTour}</label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                >
                  {tours.map((tItem) => (
                    <option key={tItem.id} value={tItem.id}>
                      {(language === 'en' && tItem.titleEn) ? tItem.titleEn : tItem.title} - {(language === 'en' && tItem.priceInfoEn) ? tItem.priceInfoEn : tItem.priceInfo}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {itemType === 'service' && (
              <div>
                <label className="block text-[11px] text-[#1A1A1A]/60 mb-1">{t.formSelectService}</label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                >
                  {services.map((sItem) => (
                    <option key={sItem.id} value={sItem.id}>
                      {(language === 'en' && sItem.titleEn) ? sItem.titleEn : sItem.title} ({(language === 'en' && sItem.priceInfoEn) ? sItem.priceInfoEn : sItem.priceInfo})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {itemType === 'general' && (
              <div>
                <label className="block text-[11px] text-[#1A1A1A]/60 mb-1">{t.formTopicSubject}</label>
                <input
                  type="text"
                  value={customItemTitle}
                  onChange={(e) => setCustomItemTitle(e.target.value)}
                  placeholder={language === 'en' ? 'e.g. 5-day tour with private driver...' : 'მაგ: 5-დღიანი ტური საკუთარი მძღოლით...'}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                />
              </div>
            )}

            {/* Customer Name & Phone in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-medium text-[#1A1A1A] mb-1">
                  {t.formFullName} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#1A1A1A]/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder={language === 'en' ? 'Alex Miller' : 'გიორგი მაისურაძე'}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1A1A1A] mb-1">
                  {t.formPhone} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#1A1A1A]/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="+995 5xx xx xx xx"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                  />
                </div>
              </div>
            </div>

            {/* Date & Guests in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#1A1A1A]/60 mb-1">{t.formDesiredDate}</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#1A1A1A]/60 mb-1">{t.formTravelersCount}</label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-[#1A1A1A]/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(parseInt(e.target.value) || 1)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Contact Mode */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-1.5">
                {t.formPreferredContact}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreferredContact('whatsapp')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    preferredContact === 'whatsapp'
                      ? 'bg-[#25D366] text-white border-[#25D366]'
                      : 'bg-black/5 border-black/5 text-[#1A1A1A]'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredContact('call')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    preferredContact === 'call'
                      ? 'bg-black text-white border-black'
                      : 'bg-black/5 border-black/5 text-[#1A1A1A]'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.formOptionPhoneCall}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredContact('email')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    preferredContact === 'email'
                      ? 'bg-black text-white border-black'
                      : 'bg-black/5 border-black/5 text-[#1A1A1A]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            {preferredContact === 'email' && (
              <div>
                <label className="block text-[11px] font-medium text-[#1A1A1A] mb-1">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10"
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-[11px] text-[#1A1A1A]/60 mb-1">{t.formWishesNotes}</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.formWishesPlaceholder}
                className="w-full px-3.5 py-2 bg-[#F9F7F2] border border-black/5 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 ring-black/10 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-booking-form"
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white py-3.5 px-4 rounded-xl text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.formSubmitBtn}</span>
              </button>
              <p className="text-[10px] text-center text-[#1A1A1A]/40 mt-2">
                {t.formDirectWhatsAppClarify}{' '}
                <a
                  href={`https://wa.me/${safeWhatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#128C7E] font-medium underline ml-1"
                >
                  WhatsApp-ში
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
