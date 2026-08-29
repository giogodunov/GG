import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
  MessageCircle,
  Phone,
  Calendar,
  Users,
  Settings,
  Layers,
  Compass,
  Inbox,
  Save,
  Plane,
  UserCheck,
  Car,
  Shield,
  Clock,
  MapPin,
  ExternalLink,
  Eye,
  EyeOff,
  Palette,
  Image as ImageIcon,
  Upload,
  Sliders,
  Sun,
  Moon,
  Smartphone,
  Monitor,
  Move,
  Globe,
  Languages
} from 'lucide-react';
import { Tour, Service, BookingInquiry, SiteSettings } from '../types';
import { compressImageFile, formatImageUrl } from '../utils/imageHelper';

interface AdminPanelModalProps {
  isOpen: boolean;
  initialTab?: 'services' | 'tours' | 'inquiries' | 'settings';
  onClose: () => void;
  tours: Tour[];
  services: Service[];
  inquiries: BookingInquiry[];
  settings: SiteSettings;
  onUpdateTours: (tours: Tour[]) => void;
  onUpdateServices: (services: Service[]) => void;
  onUpdateInquiries: (inquiries: BookingInquiry[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onResetAllData: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  initialTab = 'services',
  onClose,
  tours,
  services,
  inquiries,
  settings,
  onUpdateTours,
  onUpdateServices,
  onUpdateInquiries,
  onUpdateSettings,
  onResetAllData,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'tours' | 'inquiries' | 'settings'>(initialTab);

  // Service form state
  const [isEditingService, setIsEditingService] = useState<boolean>(false);
  const [serviceFormLangTab, setServiceFormLangTab] = useState<'both' | 'ka' | 'en'>('both');
  const [serviceFormData, setServiceFormData] = useState<Partial<Service>>({
    title: '',
    titleEn: '',
    category: 'transfer',
    priceInfo: '50 ₾-დან',
    priceInfoEn: 'From 50 GEL',
    shortDescription: '',
    shortDescriptionEn: '',
    features: ['სანდო და კომფორტული მომსახურება', 'გამოცდილი სპეციალისტები'],
    featuresEn: ['Reliable and comfortable service', 'Experienced professionals'],
    iconName: 'plane',
    imageUrl: '',
    isActive: true
  });
  const [featureInput, setFeatureInput] = useState('');
  const [featureEnInput, setFeatureEnInput] = useState('');

  // Tour form state
  const [isEditingTour, setIsEditingTour] = useState<boolean>(false);
  const [tourFormLangTab, setTourFormLangTab] = useState<'both' | 'ka' | 'en'>('both');
  const [tourFormData, setTourFormData] = useState<Partial<Tour>>({
    title: '',
    titleEn: '',
    region: 'საქართველო',
    regionEn: 'Georgia',
    duration: '1 დღე',
    durationEn: '1 Day',
    priceInfo: '100 ₾-დან',
    priceInfoEn: 'From 100 GEL',
    category: 'day_tour',
    shortDescription: '',
    shortDescriptionEn: '',
    highlights: ['ღირსშესანიშნაობა 1', 'ღირსშესანიშნაობა 2'],
    highlightsEn: ['Sightseeing location 1', 'Sightseeing location 2'],
    included: ['ტრანსპორტირება', 'გიდი'],
    includedEn: ['Transportation', 'Guide'],
    imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    isActive: true
  });
  const [highlightInput, setHighlightInput] = useState('');
  const [highlightEnInput, setHighlightEnInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');
  const [includedEnInput, setIncludedEnInput] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [settingsLangTab, setSettingsLangTab] = useState<'both' | 'ka' | 'en'>('both');

  const PRESET_COVERS = [
    {
      name: 'ყაზბეგი & გერგეტი',
      url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2000&q=85'
    },
    {
      name: 'სვანეთის კოშკები (უშგული)',
      url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=85'
    },
    {
      name: 'კახეთის ვენახები & ალაზანი',
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=85'
    },
    {
      name: 'გუდაურის პანორამა',
      url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=85'
    },
    {
      name: 'მარტვილის კანიონი',
      url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85'
    }
  ];

  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingTourImage, setIsUploadingTourImage] = useState(false);
  const [isUploadingServiceImage, setIsUploadingServiceImage] = useState(false);

  const handleTourImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('ფაილის ზომა არ უნდა აღემატებოდეს 15MB-ს');
        return;
      }
      try {
        setIsUploadingTourImage(true);
        const compressedBase64 = await compressImageFile(file, 1600, 1060, 0.85);
        setTourFormData((prev) => ({ ...prev, imageUrl: compressedBase64 }));
      } catch (err) {
        console.error('Error optimizing tour image:', err);
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const result = loadEvent.target?.result as string;
          if (result) {
            setTourFormData((prev) => ({ ...prev, imageUrl: result }));
          }
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploadingTourImage(false);
      }
    }
  };

  const handleServiceImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('ფაილის ზომა არ უნდა აღემატებოდეს 15MB-ს');
        return;
      }
      try {
        setIsUploadingServiceImage(true);
        const compressedBase64 = await compressImageFile(file, 1200, 800, 0.85);
        setServiceFormData((prev) => ({ ...prev, imageUrl: compressedBase64 }));
      } catch (err) {
        console.error('Error optimizing service image:', err);
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const result = loadEvent.target?.result as string;
          if (result) {
            setServiceFormData((prev) => ({ ...prev, imageUrl: result }));
          }
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploadingServiceImage(false);
      }
    }
  };

  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('ფაილის ზომა არ უნდა აღემატებოდეს 15MB-ს');
        return;
      }
      try {
        setIsUploadingCover(true);
        const compressedBase64 = await compressImageFile(file, 1920, 1080, 0.85);
        setSettingsForm((prev) => ({ ...prev, heroCoverImage: compressedBase64 }));
      } catch (err) {
        console.error('Error optimizing image:', err);
        // Fallback to FileReader
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const result = loadEvent.target?.result as string;
          if (result) {
            setSettingsForm((prev) => ({ ...prev, heroCoverImage: result }));
          }
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploadingCover(false);
      }
    }
  };

  React.useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  if (!isOpen) return null;

  // --- SERVICE HANDLERS ---
  const handleStartAddService = () => {
    setServiceFormData({
      id: 'srv_' + Date.now(),
      title: '',
      titleEn: '',
      category: 'transfer',
      priceInfo: '80 ₾-დან',
      priceInfoEn: 'From 80 GEL',
      shortDescription: '',
      shortDescriptionEn: '',
      features: ['კომფორტული ავტომობილი', 'პუნქტუალური მომსახურება'],
      featuresEn: ['Comfortable Air-conditioned Vehicle', 'Punctual & Reliable Service'],
      iconName: 'plane',
      imageUrl: '',
      isActive: true
    });
    setFeatureInput('');
    setFeatureEnInput('');
    setIsEditingService(true);
  };

  const handleStartEditService = (service: Service) => {
    setServiceFormData({ ...service });
    setFeatureInput('');
    setFeatureEnInput('');
    setIsEditingService(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.title || !serviceFormData.title.trim()) {
      alert('გთხოვთ მიუთითოთ მომსახურების სათაური ქართულად');
      return;
    }

    const currentId = serviceFormData.id || 'srv_' + Date.now();
    const newService: Service = {
      id: currentId,
      title: serviceFormData.title.trim(),
      titleEn: serviceFormData.titleEn?.trim() || undefined,
      category: serviceFormData.category || 'transfer',
      priceInfo: serviceFormData.priceInfo?.trim() || 'შეთანხმებით',
      priceInfoEn: serviceFormData.priceInfoEn?.trim() || undefined,
      shortDescription: serviceFormData.shortDescription?.trim() || '',
      shortDescriptionEn: serviceFormData.shortDescriptionEn?.trim() || undefined,
      features: serviceFormData.features || [],
      featuresEn: serviceFormData.featuresEn && serviceFormData.featuresEn.length > 0 ? serviceFormData.featuresEn : undefined,
      iconName: (serviceFormData.iconName as any) || 'plane',
      imageUrl: serviceFormData.imageUrl?.trim() || undefined,
      isActive: serviceFormData.isActive ?? true
    };

    const exists = services.some((s) => s.id === currentId);
    let updated: Service[];
    if (exists) {
      updated = services.map((s) => (s.id === currentId ? newService : s));
      onShowToast(`მომსახურება "${newService.title}" განახლდა`);
    } else {
      updated = [newService, ...services];
      onShowToast(`ახალი მომსახურება "${newService.title}" დაემატა`);
    }

    onUpdateServices(updated);
    setIsEditingService(false);
  };

  const handleDeleteService = (id: string, title: string) => {
    if (window.confirm(`ნამდვილად გსურთ "${title}"-ს წაშლა?`)) {
      const updated = services.filter((s) => s.id !== id);
      onUpdateServices(updated);
      onShowToast('მომსახურება წაიშალა');
    }
  };

  const handleToggleServiceActive = (id: string) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    onUpdateServices(updated);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setServiceFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()]
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setServiceFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddFeatureEn = () => {
    if (!featureEnInput.trim()) return;
    setServiceFormData((prev) => ({
      ...prev,
      featuresEn: [...(prev.featuresEn || []), featureEnInput.trim()]
    }));
    setFeatureEnInput('');
  };

  const handleRemoveFeatureEn = (idx: number) => {
    setServiceFormData((prev) => ({
      ...prev,
      featuresEn: (prev.featuresEn || []).filter((_, i) => i !== idx)
    }));
  };

  // --- TOUR HANDLERS ---
  const handleStartAddTour = () => {
    setTourFormData({
      id: 'tour_' + Date.now(),
      title: '',
      titleEn: '',
      region: 'მცხეთა-მთიანეთი',
      regionEn: 'Mtskheta-Mtianeti',
      duration: '1 დღე',
      durationEn: '1 Day',
      priceInfo: '120 ₾-დან / პერსონა',
      priceInfoEn: 'From 120 GEL / Person',
      priceValue: 120,
      category: 'day_tour',
      shortDescription: '',
      shortDescriptionEn: '',
      highlights: ['მთავარი ლოკაცია 1', 'მთავარი ლოკაცია 2'],
      highlightsEn: ['Main Sight 1', 'Main Sight 2'],
      included: ['კომფორტული ტრანსპორტი', 'მძღოლი-გიდი'],
      includedEn: ['Comfortable AC Transport', 'Private Driver / Guide'],
      imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      isActive: true
    });
    setHighlightInput('');
    setHighlightEnInput('');
    setIncludedInput('');
    setIncludedEnInput('');
    setIsEditingTour(true);
  };

  const handleStartEditTour = (tour: Tour) => {
    setTourFormData({ ...tour });
    setHighlightInput('');
    setHighlightEnInput('');
    setIncludedInput('');
    setIncludedEnInput('');
    setIsEditingTour(true);
  };

  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourFormData.title || !tourFormData.title.trim()) {
      alert('გთხოვთ მიუთითოთ ტურის სათაური ქართულად');
      return;
    }

    const currentId = tourFormData.id || 'tour_' + Date.now();
    const newTour: Tour = {
      id: currentId,
      title: tourFormData.title.trim(),
      titleEn: tourFormData.titleEn?.trim() || undefined,
      region: tourFormData.region?.trim() || 'საქართველო',
      regionEn: tourFormData.regionEn?.trim() || undefined,
      duration: tourFormData.duration?.trim() || '1 დღე',
      durationEn: tourFormData.durationEn?.trim() || undefined,
      priceInfo: tourFormData.priceInfo?.trim() || 'შეთანხმებით',
      priceInfoEn: tourFormData.priceInfoEn?.trim() || undefined,
      priceValue: tourFormData.priceValue || 100,
      category: tourFormData.category || 'day_tour',
      shortDescription: tourFormData.shortDescription?.trim() || '',
      shortDescriptionEn: tourFormData.shortDescriptionEn?.trim() || undefined,
      highlights: tourFormData.highlights || [],
      highlightsEn: tourFormData.highlightsEn && tourFormData.highlightsEn.length > 0 ? tourFormData.highlightsEn : undefined,
      included: tourFormData.included || [],
      includedEn: tourFormData.includedEn && tourFormData.includedEn.length > 0 ? tourFormData.includedEn : undefined,
      imageUrl: tourFormData.imageUrl || 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
      featured: tourFormData.featured || false,
      isActive: tourFormData.isActive ?? true
    };

    const exists = tours.some((t) => t.id === currentId);
    let updated: Tour[];
    if (exists) {
      updated = tours.map((t) => (t.id === currentId ? newTour : t));
      onShowToast(`ტური "${newTour.title}" განახლდა`);
    } else {
      updated = [newTour, ...tours];
      onShowToast(`ახალი ტური "${newTour.title}" დაემატა`);
    }

    onUpdateTours(updated);
    setIsEditingTour(false);
  };

  const handleDeleteTour = (id: string, title: string) => {
    if (window.confirm(`ნამდვილად გსურთ "${title}"-ს წაშლა?`)) {
      const updated = tours.filter((t) => t.id !== id);
      onUpdateTours(updated);
      onShowToast('ტური წაიშალა');
    }
  };

  const handleToggleTourActive = (id: string) => {
    const updated = tours.map((t) =>
      t.id === id ? { ...t, isActive: !t.isActive } : t
    );
    onUpdateTours(updated);
  };

  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setTourFormData((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), highlightInput.trim()]
    }));
    setHighlightInput('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setTourFormData((prev) => ({
      ...prev,
      highlights: (prev.highlights || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddHighlightEn = () => {
    if (!highlightEnInput.trim()) return;
    setTourFormData((prev) => ({
      ...prev,
      highlightsEn: [...(prev.highlightsEn || []), highlightEnInput.trim()]
    }));
    setHighlightEnInput('');
  };

  const handleRemoveHighlightEn = (idx: number) => {
    setTourFormData((prev) => ({
      ...prev,
      highlightsEn: (prev.highlightsEn || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddIncluded = () => {
    if (!includedInput.trim()) return;
    setTourFormData((prev) => ({
      ...prev,
      included: [...(prev.included || []), includedInput.trim()]
    }));
    setIncludedInput('');
  };

  const handleRemoveIncluded = (idx: number) => {
    setTourFormData((prev) => ({
      ...prev,
      included: (prev.included || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddIncludedEn = () => {
    if (!includedEnInput.trim()) return;
    setTourFormData((prev) => ({
      ...prev,
      includedEn: [...(prev.includedEn || []), includedEnInput.trim()]
    }));
    setIncludedEnInput('');
  };

  const handleRemoveIncludedEn = (idx: number) => {
    setTourFormData((prev) => ({
      ...prev,
      includedEn: (prev.includedEn || []).filter((_, i) => i !== idx)
    }));
  };

  // --- INQUIRY HANDLERS ---
  const handleUpdateInquiryStatus = (id: string, newStatus: BookingInquiry['status']) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    onUpdateInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    onUpdateInquiries(updated);
    onShowToast('მოთხოვნა წაიშალა');
  };

  // --- SETTINGS HANDLERS ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings: SiteSettings = {
      ...settingsForm,
      brandName: settingsForm.brandName || 'InGeorgiaTours',
      tagline: settingsForm.tagline || 'აღმოაჩინე საქართველოს გამორჩეული კუთხეები',
      taglineEn: settingsForm.taglineEn || 'Discover Georgia’s Most Breathtaking Destinations',
      displayPhone: settingsForm.displayPhone || settingsForm.phone || '+995 555 12 34 56',
      phone: settingsForm.displayPhone || settingsForm.phone || '+995 555 12 34 56',
      address: settingsForm.location || settingsForm.address || 'თბილისი, საქართველო',
      location: settingsForm.location || settingsForm.address || 'თბილისი, საქართველო',
      locationEn: settingsForm.locationEn || 'Tbilisi, Georgia',
      workingHours: settingsForm.workHours || settingsForm.workingHours || 'ყოველდღე: 09:00 - 21:00',
      workHours: settingsForm.workHours || settingsForm.workingHours || 'ყოველდღე: 09:00 - 21:00',
      workHoursEn: settingsForm.workHoursEn || 'Everyday: 09:00 - 21:00 (GMT+4)',
      priceDisclaimer: settingsForm.priceDisclaimer || '',
      priceDisclaimerEn: settingsForm.priceDisclaimerEn || '',
      aboutText: settingsForm.aboutText || '',
      aboutTextEn: settingsForm.aboutTextEn || ''
    };
    onUpdateSettings(updatedSettings);
    onShowToast('პარამეტრები წარმატებით შეინახა');
  };

  return (
    <div
      id="admin-panel-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#1A1A1A]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="admin-panel-modal-card"
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-black/5 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">მართვის ცენტრი</div>
              <h2 className="text-lg sm:text-xl font-serif italic text-white">სამართავი პანელი</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('გსურთ ადმინ რეჟიმის გამორთვა და საიტის ჩაკეტვა?')) {
                  localStorage.removeItem('geo_admin_authorized');
                  window.location.href = window.location.pathname;
                }
              }}
              title="ადმინ რეჟიმიდან გამოსვლა და ღილაკების დამალვა"
              className="text-xs text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>🔒 გამოსვლა & ჩაკეტვა</span>
            </button>

            <button
              onClick={onClose}
              id="btn-close-admin-panel"
              className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F9F7F2] px-6 py-2.5 border-b border-black/5 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => {
              setActiveTab('services');
              setIsEditingService(false);
            }}
            id="admin-tab-services"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-black text-white shadow-xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-black/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>მომსახურებები ({services.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('tours');
              setIsEditingTour(false);
            }}
            id="admin-tab-tours"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeTab === 'tours'
                ? 'bg-black text-white shadow-xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-black/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>ტურები ({tours.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            id="admin-tab-inquiries"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-black text-white shadow-xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-black/5'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>მოთხოვნები ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            id="admin-tab-settings"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-black text-white shadow-xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-black/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>პარამეტრები, ფონი & WhatsApp</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#F9F7F2]/50">
          {/* TAB 1: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {!isEditingService ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        დამატებითი სერვისების სია
                      </h3>
                      <p className="text-xs text-stone-500">
                        აქ შეგიძლიათ დაამატოთ აეროპორტის ტრანსფერი, გიდი, ავტომობილის ქირაობა და სხვა სერვისები.
                      </p>
                    </div>
                    <button
                      onClick={handleStartAddService}
                      id="btn-admin-add-service"
                      className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>ახალი სერვისის დამატება</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className={`bg-white rounded-xl border p-4 flex flex-col justify-between shadow-xs transition-all ${
                          srv.isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-100/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                                {srv.category}
                              </span>
                              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5 flex-wrap">
                                <span>🇬🇪 {srv.title}</span>
                              </h4>
                              {srv.titleEn ? (
                                <p className="text-xs text-stone-500 font-medium mt-0.5">
                                  🇬🇧 {srv.titleEn}
                                </p>
                              ) : (
                                <span className="inline-block text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded mt-1 font-medium">
                                  🇬🇧 ინგლისური არ არის შეყვანილი
                                </span>
                              )}
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded block">
                                {srv.priceInfo}
                              </span>
                              {srv.priceInfoEn && (
                                <span className="text-[10px] text-stone-500 block mt-0.5">
                                  {srv.priceInfoEn}
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-stone-600 mb-2 line-clamp-2">
                            {srv.shortDescription}
                          </p>

                          {srv.shortDescriptionEn && (
                            <p className="text-xs text-stone-400 italic mb-2 line-clamp-2">
                              EN: {srv.shortDescriptionEn}
                            </p>
                          )}

                          {srv.features && srv.features.length > 0 && (
                            <ul className="text-xs text-stone-500 space-y-1 mb-3">
                              {srv.features.slice(0, 2).map((f, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span className="truncate">🇬🇪 {f}</span>
                                </li>
                              ))}
                              {srv.featuresEn && srv.featuresEn.length > 0 && (
                                <li className="flex items-center gap-1.5 text-stone-400">
                                  <Check className="w-3 h-3 text-stone-400 shrink-0" />
                                  <span className="truncate">🇬🇧 {srv.featuresEn[0]}</span>
                                </li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleServiceActive(srv.id)}
                            className="text-xs flex items-center gap-1 text-stone-600 hover:text-stone-900"
                          >
                            {srv.isActive ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                <span>აქტიური</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                                <span>დამალული</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEditService(srv)}
                              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                              title="რედაქტირება"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(srv.id, srv.title)}
                              className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                              title="წაშლა"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Service Add / Edit Form */
                <form onSubmit={handleSaveService} className="bg-white p-6 rounded-2xl border border-stone-200 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {serviceFormData.id ? 'მომსახურების რედაქტირება' : 'ახალი მომსახურების დამატება'}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        შეიყვანეთ ინფორმაცია ქართულ და ინგლისურ ენებზე
                      </p>
                    </div>

                    {/* Language Switcher Tabs */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
                      <button
                        type="button"
                        onClick={() => setServiceFormLangTab('both')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          serviceFormLangTab === 'both'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🌐 ორივე ენა
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceFormLangTab('ka')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          serviceFormLangTab === 'ka'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🇬🇪 ქართული
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceFormLangTab('en')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          serviceFormLangTab === 'en'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🇬🇧 English
                      </button>
                    </div>
                  </div>

                  {/* 🇬🇪 GEORGIAN SECTION */}
                  {(serviceFormLangTab === 'both' || serviceFormLangTab === 'ka') && (
                    <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-950 pb-2 border-b border-amber-200/50">
                        <span className="text-base">🇬🇪</span>
                        <span>ქართული ვერსია (Georgian Content)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            მომსახურების სათაური (ქართულად) *
                          </label>
                          <input
                            type="text"
                            required
                            value={serviceFormData.title || ''}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                            placeholder="მაგ: აეროპორტის ტრანსფერი (თბილისი/ქუთაისი)"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            საინფორმაციო ფასი (ქართულად) *
                          </label>
                          <input
                            type="text"
                            required
                            value={serviceFormData.priceInfo || ''}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, priceInfo: e.target.value })}
                            placeholder="მაგ: 60 ₾-დან / რეისი, ან შეთანხმებით"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          მოკლე აღწერა (ქართულად)
                        </label>
                        <textarea
                          rows={2}
                          value={serviceFormData.shortDescription || ''}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescription: e.target.value })}
                          placeholder="მაგ: დახვედრა აეროპორტში კომფორტული ავტომობილით ნებისმიერ დროს."
                          className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      {/* Georgian Features */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          სერვისის დეტალები / პუნქტები (ქართულად)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddFeature();
                              }
                            }}
                            placeholder="მაგ: უფასო ლოდინი ფრენის დაგვიანებისას"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={handleAddFeature}
                            className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-medium hover:bg-stone-900"
                          >
                            დამატება
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {(serviceFormData.features || []).map((feat, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-white text-stone-800 text-xs px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs"
                            >
                              <span>🇬🇪 {feat}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(idx)}
                                className="text-stone-400 hover:text-rose-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 🇬🇧 ENGLISH SECTION */}
                  {(serviceFormLangTab === 'both' || serviceFormLangTab === 'en') && (
                    <div className="bg-sky-50/40 border border-sky-200/70 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-950 pb-2 border-b border-sky-200/50">
                        <span className="text-base">🇬🇧</span>
                        <span>ინგლისური ვერსია (English Version)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            Service Title (in English)
                          </label>
                          <input
                            type="text"
                            value={serviceFormData.titleEn || ''}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, titleEn: e.target.value })}
                            placeholder="e.g. Airport Transfer (Tbilisi / Kutaisi / Batumi)"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            Price Info (in English)
                          </label>
                          <input
                            type="text"
                            value={serviceFormData.priceInfoEn || ''}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, priceInfoEn: e.target.value })}
                            placeholder="e.g. From 60 GEL / Ride, or By agreement"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          Short Description (in English)
                        </label>
                        <textarea
                          rows={2}
                          value={serviceFormData.shortDescriptionEn || ''}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescriptionEn: e.target.value })}
                          placeholder="e.g. Punctual private airport pickup and drop-off with comfortable AC vehicles 24/7."
                          className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      {/* English Features */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          Service Details / Bullet Points (in English)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={featureEnInput}
                            onChange={(e) => setFeatureEnInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddFeatureEn();
                              }
                            }}
                            placeholder="e.g. Free flight delay waiting included"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={handleAddFeatureEn}
                            className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-medium hover:bg-stone-900"
                          >
                            Add (დამატება)
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {(serviceFormData.featuresEn || []).map((feat, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-white text-stone-800 text-xs px-2.5 py-1 rounded-lg border border-sky-200 shadow-2xs"
                            >
                              <span>🇬🇧 {feat}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFeatureEn(idx)}
                                className="text-stone-400 hover:text-rose-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ⚙️ SHARED CONFIGURATION (Category, Icon, Image, Active) */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-800 pb-2 border-b border-stone-200/60">
                      <Settings className="w-4 h-4 text-stone-600" />
                      <span>სერვისის პარამეტრები და სურათი (საერთო)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          კატეგორია
                        </label>
                        <select
                          value={serviceFormData.category || 'transfer'}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value as any })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl"
                        >
                          <option value="transfer">ტრანსფერი (აეროპორტი/ქალაქები)</option>
                          <option value="guide">გიდი (ექსკურსიამძღოლი)</option>
                          <option value="vehicle">ავტომობილის ქირაობა მძღოლით</option>
                          <option value="custom">ინდივიდუალური სერვისი</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ხატულა (Icon)
                        </label>
                        <select
                          value={serviceFormData.iconName || 'plane'}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, iconName: e.target.value as any })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl"
                        >
                          <option value="plane">✈️ თვითმფრინავი (აეროპორტი/ტრანსფერი)</option>
                          <option value="user-check">👤 გიდი (ადამიანი)</option>
                          <option value="car">🚗 ავტომობილი (მანქანა)</option>
                          <option value="compass">🧭 კომპასი (მარშრუტი)</option>
                          <option value="shield">🛡️ ფარი (დაცვა/სანდოობა)</option>
                          <option value="clock">⏱️ საათი (24/7)</option>
                          <option value="map-pin">📍 ლოკაცია</option>
                        </select>
                      </div>
                    </div>

                    {/* Service Image Upload & URL */}
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-stone-500" />
                          <span>მომსახურების სურათი (არასავალდებულო)</span>
                        </label>
                        {serviceFormData.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setServiceFormData({ ...serviceFormData, imageUrl: '' })}
                            className="text-[11px] text-rose-600 hover:text-rose-700 hover:underline"
                          >
                            სურათის წაშლა
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {/* Image Preview */}
                        {serviceFormData.imageUrl ? (
                          <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-200">
                            <img
                              src={serviceFormData.imageUrl}
                              alt="სერვისის სურათი"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-14 rounded-xl border border-dashed border-stone-300 flex items-center justify-center shrink-0 text-stone-400 bg-white">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}

                        {/* Upload Button + URL Input */}
                        <div className="flex-1 w-full space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-medium transition-colors shadow-2xs">
                              <Upload className="w-3.5 h-3.5 text-stone-600" />
                              <span>{isUploadingServiceImage ? 'იტვირთება...' : 'ფოტოს ატვირთვა კომპიუტერიდან'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleServiceImageFileUpload}
                                disabled={isUploadingServiceImage}
                              />
                            </label>
                            <span className="text-[10px] text-stone-400">ან ჩაწერეთ ბმული:</span>
                          </div>

                          <input
                            type="url"
                            value={serviceFormData.imageUrl || ''}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, imageUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Active toggle */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="service-is-active"
                        checked={serviceFormData.isActive ?? true}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, isActive: e.target.checked })}
                        className="rounded text-stone-900"
                      />
                      <label htmlFor="service-is-active" className="text-xs text-stone-700 font-medium cursor-pointer">
                        მომსახურება აქტიურია და ჩანს მთავარ გვერდზე
                      </label>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingService(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
                    >
                      გაუქმება
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-xs"
                    >
                      შენახვა (Save Service)
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TOURS */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              {!isEditingTour ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        ტურების სია
                      </h3>
                      <p className="text-xs text-stone-500">
                        დაამატეთ ან შეცვალეთ მარშრუტები, ხანგრძლივობა, ფოტოები და საინფორმაციო ფასები.
                      </p>
                    </div>
                    <button
                      onClick={handleStartAddTour}
                      id="btn-admin-add-tour"
                      className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>ახალი ტურის დამატება</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tours.map((tour) => (
                      <div
                        key={tour.id}
                        className={`bg-white rounded-xl border overflow-hidden shadow-xs flex flex-col justify-between ${
                          tour.isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-100/50'
                        }`}
                      >
                        <div className="h-32 w-full bg-stone-200 relative">
                          <img
                            src={tour.imageUrl}
                            alt={tour.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
                            <span className="bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded">
                              {tour.region} {tour.regionEn ? `(${tour.regionEn})` : ''}
                            </span>
                            <span className="bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded">
                              {tour.duration}
                            </span>
                          </div>
                          <span className="absolute bottom-2 right-2 bg-amber-400 text-stone-950 font-bold text-[11px] px-2 py-0.5 rounded shadow-2xs">
                            {tour.priceInfo}
                          </span>
                        </div>

                        <div className="p-3.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-stone-900 line-clamp-1 mb-0.5">
                              🇬🇪 {tour.title}
                            </h4>
                            {tour.titleEn ? (
                              <p className="text-xs text-stone-500 font-medium mb-1 line-clamp-1">
                                🇬🇧 {tour.titleEn}
                              </p>
                            ) : (
                              <span className="inline-block text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded mb-1 font-medium">
                                🇬🇧 ინგლისური არ არის შეყვანილი
                              </span>
                            )}
                            <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                              {tour.shortDescription}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => handleToggleTourActive(tour.id)}
                              className="text-xs flex items-center gap-1 text-stone-600 hover:text-stone-900"
                            >
                              {tour.isActive ? (
                                <>
                                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>აქტიური</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                                  <span>დამალული</span>
                                </>
                              )}
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleStartEditTour(tour)}
                                className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                                title="რედაქტირება"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTour(tour.id, tour.title)}
                                className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                                title="წაშლა"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Tour Edit / Add Form */
                <form onSubmit={handleSaveTour} className="bg-white p-6 rounded-2xl border border-stone-200 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {tourFormData.id ? 'ტურის რედაქტირება' : 'ახალი ტურის დამატება'}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        შეიყვანეთ ტურის დეტალები ქართულ და ინგლისურ ენებზე
                      </p>
                    </div>

                    {/* Language Switcher Tabs */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
                      <button
                        type="button"
                        onClick={() => setTourFormLangTab('both')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          tourFormLangTab === 'both'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🌐 ორივე ენა
                      </button>
                      <button
                        type="button"
                        onClick={() => setTourFormLangTab('ka')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          tourFormLangTab === 'ka'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🇬🇪 ქართული
                      </button>
                      <button
                        type="button"
                        onClick={() => setTourFormLangTab('en')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          tourFormLangTab === 'en'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🇬🇧 English
                      </button>
                    </div>
                  </div>

                  {/* 🇬🇪 GEORGIAN SECTION */}
                  {(tourFormLangTab === 'both' || tourFormLangTab === 'ka') && (
                    <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-950 pb-2 border-b border-amber-200/50">
                        <span className="text-base">🇬🇪</span>
                        <span>ქართული ვერსია (Georgian Content)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            ტურის სათაური (ქართულად) *
                          </label>
                          <input
                            type="text"
                            required
                            value={tourFormData.title || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, title: e.target.value })}
                            placeholder="მაგ: ყაზბეგი & გერგეტის სამება"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            რეგიონი (ქართულად) *
                          </label>
                          <input
                            type="text"
                            required
                            value={tourFormData.region || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, region: e.target.value })}
                            placeholder="მაგ: მცხეთა-მთიანეთი, კახეთი, სვანეთი..."
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            ხანგრძლივობა (ქართულად)
                          </label>
                          <input
                            type="text"
                            value={tourFormData.duration || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, duration: e.target.value })}
                            placeholder="მაგ: 1 დღე, 2 დღე / 1 ღამე"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            საინფორმაციო ფასი (ქართულად)
                          </label>
                          <input
                            type="text"
                            value={tourFormData.priceInfo || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, priceInfo: e.target.value })}
                            placeholder="მაგ: 130 ₾-დან / პერსონა"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          მოკლე აღწერა (ქართულად)
                        </label>
                        <textarea
                          rows={2}
                          value={tourFormData.shortDescription || ''}
                          onChange={(e) => setTourFormData({ ...tourFormData, shortDescription: e.target.value })}
                          placeholder="მარშრუტის მოკლე მიმოხილვა ქართულად..."
                          className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      {/* Georgian Highlights */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          მარშრუტის პუნქტები (Highlights - ქართულად)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={highlightInput}
                            onChange={(e) => setHighlightInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (highlightInput.trim()) {
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    highlights: [...(prev.highlights || []), highlightInput.trim()]
                                  }));
                                  setHighlightInput('');
                                }
                              }
                            }}
                            placeholder="მაგ: ანანურის ციხე, გუდაური, გერგეტის სამება"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (highlightInput.trim()) {
                                setTourFormData((prev) => ({
                                  ...prev,
                                  highlights: [...(prev.highlights || []), highlightInput.trim()]
                                }));
                                setHighlightInput('');
                              }
                            }}
                            className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-medium hover:bg-stone-900"
                          >
                            დამატება
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {(tourFormData.highlights || []).map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-white text-stone-800 text-xs px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs"
                            >
                              <span>🇬🇪 {item}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    highlights: (prev.highlights || []).filter((_, i) => i !== idx)
                                  }))
                                }
                                className="text-stone-400 hover:text-rose-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Georgian Included */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          ფასში შედის (Included - ქართულად)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={includedInput}
                            onChange={(e) => setIncludedInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (includedInput.trim()) {
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    included: [...(prev.included || []), includedInput.trim()]
                                  }));
                                  setIncludedInput('');
                                }
                              }
                            }}
                            placeholder="მაგ: კომფორტული ტრანსპორტირება, პროფესიონალი გიდი"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (includedInput.trim()) {
                                setTourFormData((prev) => ({
                                  ...prev,
                                  included: [...(prev.included || []), includedInput.trim()]
                                }));
                                setIncludedInput('');
                              }
                            }}
                            className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-medium hover:bg-stone-900"
                          >
                            დამატება
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {(tourFormData.included || []).map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-white text-emerald-800 text-xs px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs"
                            >
                              <span>🇬🇪 {item}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    included: (prev.included || []).filter((_, i) => i !== idx)
                                  }))
                                }
                                className="text-stone-400 hover:text-rose-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 🇬🇧 ENGLISH SECTION */}
                  {(tourFormLangTab === 'both' || tourFormLangTab === 'en') && (
                    <div className="bg-sky-50/40 border border-sky-200/70 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-950 pb-2 border-b border-sky-200/50">
                        <span className="text-base">🇬🇧</span>
                        <span>ინგლისური ვერსია (English Version)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            Tour Title (in English)
                          </label>
                          <input
                            type="text"
                            value={tourFormData.titleEn || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, titleEn: e.target.value })}
                            placeholder="e.g. Kazbegi & Gergeti Trinity Church"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            Region (in English)
                          </label>
                          <input
                            type="text"
                            value={tourFormData.regionEn || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, regionEn: e.target.value })}
                            placeholder="e.g. Kazbegi, Kakheti, Svaneti..."
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            Duration (in English)
                          </label>
                          <input
                            type="text"
                            value={tourFormData.durationEn || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, durationEn: e.target.value })}
                            placeholder="e.g. 1 Day, 2 Days / 1 Night"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-800 mb-1">
                            Price Info (in English)
                          </label>
                          <input
                            type="text"
                            value={tourFormData.priceInfoEn || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, priceInfoEn: e.target.value })}
                            placeholder="e.g. From 130 GEL / Person"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          Short Description (in English)
                        </label>
                        <textarea
                          rows={2}
                          value={tourFormData.shortDescriptionEn || ''}
                          onChange={(e) => setTourFormData({ ...tourFormData, shortDescriptionEn: e.target.value })}
                          placeholder="Short tour overview in English..."
                          className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      {/* English Highlights */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          Tour Highlights (in English)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={highlightEnInput}
                            onChange={(e) => setHighlightEnInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (highlightEnInput.trim()) {
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    highlightsEn: [...(prev.highlightsEn || []), highlightEnInput.trim()]
                                  }));
                                  setHighlightEnInput('');
                                }
                              }
                            }}
                            placeholder="e.g. Ananuri Fortress, Gudauri Viewpoint, Gergeti Church"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (highlightEnInput.trim()) {
                                setTourFormData((prev) => ({
                                  ...prev,
                                  highlightsEn: [...(prev.highlightsEn || []), highlightEnInput.trim()]
                                }));
                                setHighlightEnInput('');
                              }
                            }}
                            className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-medium hover:bg-stone-900"
                          >
                            Add (დამატება)
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {(tourFormData.highlightsEn || []).map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-white text-stone-800 text-xs px-2.5 py-1 rounded-lg border border-sky-200 shadow-2xs"
                            >
                              <span>🇬🇧 {item}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    highlightsEn: (prev.highlightsEn || []).filter((_, i) => i !== idx)
                                  }))
                                }
                                className="text-stone-400 hover:text-rose-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* English Included */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          What's Included (in English)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={includedEnInput}
                            onChange={(e) => setIncludedEnInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (includedEnInput.trim()) {
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    includedEn: [...(prev.includedEn || []), includedEnInput.trim()]
                                  }));
                                  setIncludedEnInput('');
                                }
                              }
                            }}
                            placeholder="e.g. Private transport with AC, English-speaking guide"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (includedEnInput.trim()) {
                                setTourFormData((prev) => ({
                                  ...prev,
                                  includedEn: [...(prev.includedEn || []), includedEnInput.trim()]
                                }));
                                setIncludedEnInput('');
                              }
                            }}
                            className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-medium hover:bg-stone-900"
                          >
                            Add (დამატება)
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {(tourFormData.includedEn || []).map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-white text-emerald-800 text-xs px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs"
                            >
                              <span>🇬🇧 {item}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setTourFormData((prev) => ({
                                    ...prev,
                                    includedEn: (prev.includedEn || []).filter((_, i) => i !== idx)
                                  }))
                                }
                                className="text-stone-400 hover:text-rose-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ⚙️ SHARED TOUR CONFIGURATION (Category, Image, PriceValue, Toggles) */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-800 pb-2 border-b border-stone-200/60">
                      <Settings className="w-4 h-4 text-stone-600" />
                      <span>ტურის პარამეტრები და ფოტო (საერთო)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          კატეგორია
                        </label>
                        <select
                          value={tourFormData.category || 'day_tour'}
                          onChange={(e) => setTourFormData({ ...tourFormData, category: e.target.value as any })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl"
                        >
                          <option value="day_tour">1-დღიანი ტური</option>
                          <option value="multi_day">მრავალდღიანი ტური</option>
                          <option value="wine">ღვინის ტური</option>
                          <option value="adventure">სათავგადასავლო ტური</option>
                          <option value="cultural">კულტურული ტური</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ფასის ციფრი (სორტირებისთვის, ლარში)
                        </label>
                        <input
                          type="number"
                          value={tourFormData.priceValue || ''}
                          onChange={(e) => setTourFormData({ ...tourFormData, priceValue: Number(e.target.value) || 0 })}
                          placeholder="მაგ: 130"
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Tour Image Upload & URL */}
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-stone-500" />
                          <span>ტურის მთავარი ფოტო *</span>
                        </label>
                        {tourFormData.imageUrl && (
                          <span className="text-[11px] text-emerald-700 font-medium">✓ ფოტო არჩეულია</span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {/* Image Preview */}
                        {tourFormData.imageUrl ? (
                          <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-200 shadow-2xs">
                            <img
                              src={tourFormData.imageUrl}
                              alt="ტურის ფოტო"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-16 rounded-xl border border-dashed border-stone-300 flex items-center justify-center shrink-0 text-stone-400 bg-white">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}

                        {/* Upload Button + URL Input */}
                        <div className="flex-1 w-full space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-medium transition-colors shadow-2xs">
                              <Upload className="w-3.5 h-3.5 text-stone-600" />
                              <span>{isUploadingTourImage ? 'იტვირთება...' : 'ფოტოს ატვირთვა კომპიუტერიდან'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleTourImageFileUpload}
                                disabled={isUploadingTourImage}
                              />
                            </label>
                            <span className="text-[10px] text-stone-400">ან ჩაწერეთ ბმული:</span>
                          </div>

                          <input
                            type="url"
                            value={tourFormData.imageUrl || ''}
                            onChange={(e) => setTourFormData({ ...tourFormData, imageUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center gap-6 pt-1">
                      <label className="inline-flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tourFormData.featured || false}
                          onChange={(e) => setTourFormData({ ...tourFormData, featured: e.target.checked })}
                          className="rounded text-stone-900"
                        />
                        <span>პოპულარული ტური (Featured badge)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tourFormData.isActive ?? true}
                          onChange={(e) => setTourFormData({ ...tourFormData, isActive: e.target.checked })}
                          className="rounded text-stone-900"
                        />
                        <span>აქტიური ტური (ჩანს საიტზე)</span>
                      </label>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingTour(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
                    >
                      გაუქმება
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-xs"
                    >
                      შენახვა (Save Tour)
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    შემოსული ჯავშნები და მოთხოვნები
                  </h3>
                  <p className="text-xs text-stone-500">
                    მომხმარებლების მიერ ფორმიდან დატოვებული საკონტაქტო მოთხოვნები
                  </p>
                </div>
                {inquiries.length > 0 && (
                  <span className="text-xs font-semibold text-stone-600 bg-stone-200 px-3 py-1 rounded-full">
                    სულ: {inquiries.length}
                  </span>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
                  <Inbox className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-stone-500 text-sm font-medium">შემოსული მოთხოვნები ჯერ არ არის.</p>
                  <p className="text-stone-400 text-xs mt-1">
                    როდესაც მომხმარებელი შეავსებს საკონტაქტო ფორმას, მოთხოვნა გამოჩნდება აქ.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => {
                    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `გამარჯობა ${inq.customerName}! გწერთ GEORGIA TOURS-დან თქვენს მოთხოვნასთან (${inq.itemTitle}) დაკავშირებით.`
                    )}`;

                    return (
                      <div
                        key={inq.id}
                        className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900">
                              {inq.customerName}
                            </span>
                            <span className="text-xs text-stone-500">
                              📞 {inq.phone}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                inq.status === 'new'
                                  ? 'bg-rose-100 text-rose-800'
                                  : inq.status === 'contacted'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {inq.status === 'new'
                                ? 'ახალი'
                                : inq.status === 'contacted'
                                ? 'დაკავშირებული'
                                : 'დადასტურებული'}
                            </span>
                          </div>

                          <div className="text-xs text-stone-700">
                            <span className="font-semibold text-stone-900">{inq.itemTitle}</span>
                            {inq.preferredDate && <span> • 📅 {inq.preferredDate}</span>}
                            {inq.peopleCount && <span> • 👥 {inq.peopleCount} პერსონა</span>}
                          </div>

                          {inq.notes && (
                            <p className="text-xs text-stone-500 italic bg-stone-50 p-2 rounded-lg mt-1">
                              "{inq.notes}"
                            </p>
                          )}

                          <span className="text-[10px] text-stone-400 block">
                            გამოგზავნილია: {new Date(inq.createdAt).toLocaleString('ka-GE')}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Direct WhatsApp button */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {/* Status select */}
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-xs bg-stone-100 border border-stone-200 rounded-lg px-2 py-1.5 text-stone-800"
                          >
                            <option value="new">ახალი</option>
                            <option value="contacted">დაკავშირებული</option>
                            <option value="confirmed">დადასტურებული</option>
                            <option value="cancelled">გაუქმებული</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-lg"
                            title="წაშლა"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SETTINGS & WHATSAPP */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-stone-200 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      საიტის პარამეტრები & ტექსტები
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      შეცვალეთ საკონტაქტო მონაცემები და საიტის ტექსტები ქართულ და ინგლისურ ენებზე
                    </p>
                  </div>

                  {/* Language Switcher for Settings */}
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
                    <button
                      type="button"
                      onClick={() => setSettingsLangTab('both')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        settingsLangTab === 'both'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      🌐 ორივე ენა
                    </button>
                    <button
                      type="button"
                      onClick={() => setSettingsLangTab('ka')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        settingsLangTab === 'ka'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      🇬🇪 ქართული
                    </button>
                    <button
                      type="button"
                      onClick={() => setSettingsLangTab('en')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        settingsLangTab === 'en'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                  </div>
                </div>

                {/* WhatsApp & Core Contacts */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp და პირდაპირი ჩატი</span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      WhatsApp ნომერი (პირდაპირი ჩატის დასაწყებად) *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="995555123456 (მხოლოდ ციფრები ქვეყნის კოდით)"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      მიუთითეთ ციფრები პლიუსის და სფეისების გარეშე (მაგ: 995555123456)
                    </p>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                    <Phone className="w-4 h-4 text-stone-700" />
                    <span>ტელეფონის ნომერი, ელ-ფოსტა და ბრენდი</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ტელეფონი (ზარისთვის)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.displayPhone || settingsForm.phone || ''}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            displayPhone: e.target.value,
                            phone: e.target.value
                          })
                        }
                        placeholder="+995 555 12 34 56"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ელ-ფოსტა (Email)
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        placeholder="info@ingeorgiatours.ge"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        კომპანიის სახელი
                      </label>
                      <input
                        type="text"
                        value={settingsForm.brandName || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                        placeholder="InGeorgiaTours"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* 🇬🇪 GEORGIAN SETTINGS TEXTS */}
                {(settingsLangTab === 'both' || settingsLangTab === 'ka') && (
                  <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-950 pb-2 border-b border-amber-200/50">
                      <span className="text-base">🇬🇪</span>
                      <span>ქართული ტექსტები (Georgian Texts)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          მისამართი / ქალაქი (ქართულად)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.location || settingsForm.address || ''}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              location: e.target.value,
                              address: e.target.value
                            })
                          }
                          placeholder="თბილისი, საქართველო"
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          სამუშაო საათები (ქართულად)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.workHours || settingsForm.workingHours || ''}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              workHours: e.target.value,
                              workingHours: e.target.value
                            })
                          }
                          placeholder="ყოველდღე: 09:00 - 21:00"
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        სლოგანი / ტაგლაინი (ქართულად)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.tagline || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                        placeholder="ინდივიდუალური ტურები და კომფორტული ტრანსფერები საქართველოში"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        ფასების საინფორმაციო განმარტება (ქართულად)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.priceDisclaimer || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, priceDisclaimer: e.target.value })}
                        placeholder="* საიტზე მითითებული ფასები არის საინფორმაციო ხასიათის..."
                        className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        ჩვენ შესახებ მოკლე ტექსტი (ქართულად)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.aboutText || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutText: e.target.value })}
                        placeholder="მოკლე ინფორმაცია კომპანიის შესახებ..."
                        className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}

                {/* 🇬🇧 ENGLISH SETTINGS TEXTS */}
                {(settingsLangTab === 'both' || settingsLangTab === 'en') && (
                  <div className="bg-sky-50/40 border border-sky-200/70 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-950 pb-2 border-b border-sky-200/50">
                      <span className="text-base">🇬🇧</span>
                      <span>ინგლისური ტექსტები (English Texts)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          Location / Address (in English)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.locationEn || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, locationEn: e.target.value })}
                          placeholder="Tbilisi, Georgia"
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-800 mb-1">
                          Working Hours (in English)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.workHoursEn || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, workHoursEn: e.target.value })}
                          placeholder="Everyday: 09:00 - 21:00"
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        Tagline / Slogan (in English)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.taglineEn || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, taglineEn: e.target.value })}
                        placeholder="Private tours, VIP transfers and custom travel in Georgia"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        Price Disclaimer (in English)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.priceDisclaimerEn || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, priceDisclaimerEn: e.target.value })}
                        placeholder="* Prices shown on the website are indicative..."
                        className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1">
                        About Us text (in English)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.aboutTextEn || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutTextEn: e.target.value })}
                        placeholder="Short overview about the company in English..."
                        className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl resize-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                )}

                {/* Hero Cover Photo Customizer */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-stone-700" />
                      <label className="block text-xs font-bold text-stone-900">
                        მთავარი ბლოკის ქავერ ფოტო (Hero Cover Photo)
                      </label>
                    </div>
                    {settingsForm.heroCoverImage && (
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, heroCoverImage: '' })}
                        className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                      >
                        ფოტოს წაშლა
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mb-2">
                    დააყენეთ ლამაზი ფოტო მთავარი სათაურის, WhatsApp-ის და ძებნის პანელის უკან.
                  </p>

                  {/* Dimension Recommendation Box */}
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 mb-3 text-[11px] text-amber-900 leading-relaxed">
                    <span className="font-bold">📐 რეკომენდებული ზომა:</span> <strong>1920 × 800 px</strong> (ან <strong>16:9 / 21:9</strong> ჰორიზონტალური ფორმატი, მინიმუმ 1200px სიგანე). ოპტიმალური ფორმატებია JPG, PNG ან WebP.
                  </div>

                  {/* Upload and URL input */}
                  <div className="space-y-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200 mb-3">
                    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                      <label className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer shrink-0 transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isUploadingCover ? 'ოპტიმიზაცია...' : 'კომპიუტერიდან ატვირთვა'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingCover}
                          onChange={handleCoverFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-stone-400 text-center sm:text-left">ან ჩასვით ფოტოს ბმული (URL):</span>
                    </div>

                    <input
                      type="url"
                      value={settingsForm.heroCoverImage || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroCoverImage: formatImageUrl(e.target.value) })}
                      placeholder="https://... (პირდაპირი ბმული, Google Drive, Unsplash და ა.შ.)"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />

                    {/* Presets */}
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-stone-500 mb-1.5">
                        სწრაფი საჩვენებელი ფოტოები (Presets):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {PRESET_COVERS.map((preset) => {
                          const isCurrent = settingsForm.heroCoverImage === preset.url;
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setSettingsForm({ ...settingsForm, heroCoverImage: preset.url })}
                              className={`flex items-center gap-2 p-1.5 rounded-lg border text-[11px] text-left transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                                  : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
                              }`}
                            >
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className="w-8 h-8 rounded object-cover shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <span className="truncate text-[11px]">{preset.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Controls if cover image is active */}
                    {settingsForm.heroCoverImage && (
                      <div className="pt-3 border-t border-stone-200/80 space-y-3">
                        {/* Live Miniature Preview */}
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                            გადახედვა (Preview):
                          </span>
                          <div className="relative w-full h-28 rounded-xl overflow-hidden border border-stone-300 shadow-inner">
                            <img
                              src={settingsForm.heroCoverImage}
                              alt="Hero Cover Preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {/* Overlay */}
                            <div
                              className="absolute inset-0 bg-black"
                              style={{ opacity: (settingsForm.heroCoverOverlayOpacity ?? 35) / 100 }}
                            />
                            <div className="absolute inset-0 p-3 flex flex-col justify-between text-white pointer-events-none">
                              <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                                პერსონალიზებული მოგზაურობა
                              </span>
                              <div>
                                <p className="text-sm font-serif italic font-bold">
                                  აღმოაჩინე საქართველო
                                </p>
                                <p className="text-[10px] opacity-75">
                                  აღმოაჩინე საქართველოს გამორჩეული კუთხეები
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Overlay Darkness Slider */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-[11px] font-semibold text-stone-700 flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5 text-stone-500" />
                              <span>ფოტოს დაბნელება / გამუქება (Overlay):</span>
                            </label>
                            <span className="text-[11px] font-mono font-bold text-stone-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                              {settingsForm.heroCoverOverlayOpacity ?? 35}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="85"
                            step="5"
                            value={settingsForm.heroCoverOverlayOpacity ?? 35}
                            onChange={(e) =>
                              setSettingsForm({
                                ...settingsForm,
                                heroCoverOverlayOpacity: Number(e.target.value)
                              })
                            }
                            className="w-full accent-stone-900 cursor-pointer"
                          />
                          <div className="flex justify-between text-[10px] text-stone-400">
                            <span>0% (გამჭვირვალე)</span>
                            <span>35% (ოპტიმალური)</span>
                            <span>85% (მუქი)</span>
                          </div>
                        </div>

                        {/* Text Color Mode */}
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1.5">
                            ტექსტის ფერის რეჟიმი ქავერზე:
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'auto', label: 'ავტომატური' },
                              { id: 'light', label: 'თეთრი ტექსტი' },
                              { id: 'dark', label: 'მუქი ტექსტი' }
                            ].map((mode) => {
                              const isSelected = (settingsForm.heroTextColorMode || 'auto') === mode.id;
                              return (
                                <button
                                  key={mode.id}
                                  type="button"
                                  onClick={() =>
                                    setSettingsForm({
                                      ...settingsForm,
                                      heroTextColorMode: mode.id as any
                                    })
                                  }
                                  className={`py-1.5 px-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-stone-900 text-white font-bold border-stone-900'
                                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                                  }`}
                                >
                                  {mode.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Mobile Focal Point / Position Selector with Interactive Drag */}
                        <div className="pt-3 border-t border-stone-200">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-semibold text-stone-700 flex items-center gap-1.5">
                              <Smartphone className="w-3.5 h-3.5 text-stone-700" />
                              <span>მობილურზე ფოტოს ხედვის არე (მაუსით / თითით გასწორება):</span>
                            </label>
                            <span className="text-[10px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <Move className="w-3 h-3" />
                              მაუსით ამოძრავეთ
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mb-3">
                            დააკლიკეთ ან მაუსით გადააადგილეთ წითელი წრე მთლიან ფოტოზე, რომ ზუსტად აირჩიოთ მობილურის კადრი:
                          </p>

                          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                              
                              {/* Interactive Focal Pin Canvas / Full Photo Box */}
                              <div className="lg:col-span-7 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
                                    <Move className="w-3.5 h-3.5 text-amber-600" />
                                    სრული ფოტო (დააწკაპუნეთ ან გადაათრიეთ წრე):
                                  </span>
                                  {(() => {
                                    const val = settingsForm.heroCoverPositionMobile || '50% 50%';
                                    let xPercent = 50;
                                    let yPercent = 50;
                                    if (val === 'top') { xPercent = 50; yPercent = 0; }
                                    else if (val === 'bottom') { xPercent = 50; yPercent = 100; }
                                    else if (val === 'left') { xPercent = 0; yPercent = 50; }
                                    else if (val === 'right') { xPercent = 100; yPercent = 50; }
                                    else if (val.includes('%')) {
                                      const parts = val.split(' ');
                                      if (parts.length === 2) {
                                        xPercent = Math.round(parseFloat(parts[0]));
                                        yPercent = Math.round(parseFloat(parts[1]));
                                      }
                                    }
                                    return (
                                      <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-600">
                                        X: {xPercent}% | Y: {yPercent}%
                                      </span>
                                    );
                                  })()}
                                </div>

                                {/* Drag Surface Container */}
                                {(() => {
                                  const val = settingsForm.heroCoverPositionMobile || '50% 50%';
                                  let currentX = 50;
                                  let currentY = 50;
                                  if (val === 'top') { currentX = 50; currentY = 0; }
                                  else if (val === 'bottom') { currentX = 50; currentY = 100; }
                                  else if (val === 'left') { currentX = 0; currentY = 50; }
                                  else if (val === 'right') { currentX = 100; currentY = 50; }
                                  else if (val === 'top-left') { currentX = 0; currentY = 0; }
                                  else if (val === 'top-right') { currentX = 100; currentY = 0; }
                                  else if (val === 'bottom-left') { currentX = 0; currentY = 100; }
                                  else if (val === 'bottom-right') { currentX = 100; currentY = 100; }
                                  else if (val.includes('%')) {
                                    const parts = val.split(' ');
                                    if (parts.length === 2) {
                                      currentX = parseFloat(parts[0]);
                                      currentY = parseFloat(parts[1]);
                                    }
                                  }

                                  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const clientX = e.clientX;
                                    const clientY = e.clientY;
                                    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
                                    const clampedY = Math.max(0, Math.min(rect.height, clientY - rect.top));
                                    const pctX = Math.round((clampedX / rect.width) * 100);
                                    const pctY = Math.round((clampedY / rect.height) * 100);
                                    setSettingsForm((prev) => ({
                                      ...prev,
                                      heroCoverPositionMobile: `${pctX}% ${pctY}%`
                                    }));
                                  };

                                  return (
                                    <div
                                      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden cursor-crosshair border-2 border-stone-300 shadow-inner bg-stone-900 select-none group"
                                      onPointerDown={(e) => {
                                        e.currentTarget.setPointerCapture(e.pointerId);
                                        handlePointerMove(e);
                                      }}
                                      onPointerMove={(e) => {
                                        if (e.buttons === 1) {
                                          handlePointerMove(e);
                                        }
                                      }}
                                    >
                                      {/* Full image */}
                                      <img
                                        src={formatImageUrl(settingsForm.heroCoverImage)}
                                        alt="Focal full view"
                                        className="w-full h-full object-cover pointer-events-none"
                                        referrerPolicy="no-referrer"
                                      />
                                      
                                      {/* Visual Rule of Thirds Grid */}
                                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-25">
                                        <div className="border-r border-b border-white" />
                                        <div className="border-r border-b border-white" />
                                        <div className="border-b border-white" />
                                        <div className="border-r border-b border-white" />
                                        <div className="border-r border-b border-white" />
                                        <div className="border-b border-white" />
                                        <div className="border-r border-white" />
                                        <div className="border-r border-white" />
                                        <div />
                                      </div>

                                      {/* Crosshair Horizontal Line */}
                                      <div
                                        className="absolute left-0 right-0 h-px bg-white/60 pointer-events-none transition-all"
                                        style={{ top: `${currentY}%` }}
                                      />
                                      {/* Crosshair Vertical Line */}
                                      <div
                                        className="absolute top-0 bottom-0 w-px bg-white/60 pointer-events-none transition-all"
                                        style={{ left: `${currentX}%` }}
                                      />

                                      {/* Target Pin Marker (Interactive Handle) */}
                                      <div
                                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-all"
                                        style={{
                                          left: `${currentX}%`,
                                          top: `${currentY}%`
                                        }}
                                      >
                                        <div className="relative flex items-center justify-center">
                                          <div className="w-9 h-9 rounded-full border-2 border-white bg-amber-500/90 text-white flex items-center justify-center shadow-lg ring-4 ring-black/30 animate-pulse">
                                            <Smartphone className="w-4 h-4" />
                                          </div>
                                          <div className="absolute -bottom-5 whitespace-nowrap bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded font-mono shadow-xs">
                                            მობილურის ფოკუსი
                                          </div>
                                        </div>
                                      </div>

                                      {/* Hover Instruction Overlay */}
                                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded backdrop-blur-xs pointer-events-none">
                                        🖱️ დააწექით მაუსით სასურველ ადგილას
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* Quick Presets for Reset */}
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                  <span className="text-[10px] text-stone-500 font-medium">სწრაფი გასწორება:</span>
                                  {[
                                    { label: 'ცენტრი (50% 50%)', val: '50% 50%' },
                                    { label: 'ზედა (50% 15%)', val: '50% 15%' },
                                    { label: 'ქვედა (50% 85%)', val: '50% 85%' },
                                    { label: 'მარცხენა (20% 50%)', val: '20% 50%' },
                                    { label: 'მარჯვენა (80% 50%)', val: '80% 50%' }
                                  ].map((p) => (
                                    <button
                                      key={p.val}
                                      type="button"
                                      onClick={() => setSettingsForm({ ...settingsForm, heroCoverPositionMobile: p.val })}
                                      className="text-[10px] bg-white hover:bg-stone-100 text-stone-700 px-2 py-1 rounded border border-stone-200 transition-colors cursor-pointer"
                                    >
                                      {p.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Live Mobile Phone Mockup Preview */}
                              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                                <span className="text-[11px] font-bold text-stone-700 mb-2 flex items-center gap-1.5">
                                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                                  როგორ გამოჩნდება ტელეფონზე:
                                </span>
                                
                                {(() => {
                                  const val = settingsForm.heroCoverPositionMobile || '50% 50%';
                                  let objPos = val;
                                  if (val === 'top') objPos = '50% 0%';
                                  else if (val === 'bottom') objPos = '50% 100%';
                                  else if (val === 'left') objPos = '0% 50%';
                                  else if (val === 'right') objPos = '100% 50%';
                                  else if (val === 'top-left') objPos = '0% 0%';
                                  else if (val === 'top-right') objPos = '100% 0%';
                                  else if (val === 'bottom-left') objPos = '0% 100%';
                                  else if (val === 'bottom-right') objPos = '100% 100%';

                                  return (
                                    <div className="relative w-36 h-56 rounded-[2rem] bg-stone-950 p-2 shadow-xl border-4 border-stone-800 overflow-hidden shrink-0">
                                      {/* Dynamic Island / Notch */}
                                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-full z-20" />
                                      
                                      {/* Inner Screen */}
                                      <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative bg-stone-900">
                                        <img
                                          src={formatImageUrl(settingsForm.heroCoverImage)}
                                          alt="Mobile Preview"
                                          className="w-full h-full object-cover transition-all duration-150"
                                          style={{ objectPosition: objPos }}
                                          referrerPolicy="no-referrer"
                                        />
                                        <div
                                          className="absolute inset-0 bg-black"
                                          style={{ opacity: (settingsForm.heroCoverOverlayOpacity ?? 35) / 100 }}
                                        />
                                        {/* Mockup content */}
                                        <div className="absolute inset-x-2.5 bottom-4 text-white pointer-events-none">
                                          <div className="w-8 h-1.5 bg-amber-400 rounded-full mb-1.5" />
                                          <div className="w-20 h-2.5 bg-white/95 rounded mb-1" />
                                          <div className="w-14 h-2 bg-white/70 rounded mb-2" />
                                          <div className="w-16 h-4 bg-[#25D366] rounded-md" />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                                <span className="text-[10px] text-stone-500 mt-2 text-center">
                                  ცოცხალი რეჟიმი • გადაადგილეთ მაუსით მარცხენა ფოტოზე
                                </span>
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* Desktop Focal Point */}
                        <div className="pt-2 border-t border-stone-200">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] font-semibold text-stone-700 flex items-center gap-1.5">
                              <Monitor className="w-3.5 h-3.5 text-stone-700" />
                              <span>კომპიუტერზე / დესკტოპზე ფოკუსი (Desktop Crop):</span>
                            </label>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'top', label: '⬆️ ზედა ნაწილი (50% 0%)', val: '50% 0%' },
                              { id: 'center', label: '⏺️ ცენტრი (50% 50%)', val: '50% 50%' },
                              { id: 'bottom', label: '⬇️ ქვედა ნაწილი (50% 100%)', val: '50% 100%' }
                            ].map((pos) => {
                              const currentVal = settingsForm.heroCoverPositionDesktop || 'center';
                              const isSelected = currentVal === pos.id || currentVal === pos.val;
                              return (
                                <button
                                  key={pos.id}
                                  type="button"
                                  onClick={() =>
                                    setSettingsForm({
                                      ...settingsForm,
                                      heroCoverPositionDesktop: pos.val
                                    })
                                  }
                                  className={`py-1.5 px-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-stone-900 text-white font-bold border-stone-900'
                                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                                  }`}
                                >
                                  {pos.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Background Color Customizer */}
                <div className="pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-stone-700" />
                    <label className="block text-xs font-bold text-stone-900">
                      საიტის უკანა ფონის ფერი (Background Color)
                    </label>
                  </div>
                  <p className="text-[11px] text-stone-500 mb-3">
                    აირჩიეთ მზა ფერებიდან ან გამოიყენეთ პალიტრა / ჩაწერეთ სასურველი HEX კოდი.
                  </p>

                  {/* Visual Color Picker & Hex Input */}
                  <div className="flex items-center gap-3 mb-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <div className="relative flex items-center">
                      <input
                        type="color"
                        id="admin-bg-color-picker"
                        value={settingsForm.backgroundColor || '#F9F7F2'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, backgroundColor: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-stone-300 p-0.5 bg-white"
                        title="აირჩიეთ ფერი პალიტრიდან"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-stone-500 mb-0.5">
                        HEX კოდი
                      </label>
                      <input
                        type="text"
                        value={settingsForm.backgroundColor || '#F9F7F2'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, backgroundColor: e.target.value })}
                        placeholder="#F9F7F2"
                        className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-white border border-stone-200 rounded-lg"
                      />
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-stone-400 mb-0.5">მიმდინარე</span>
                      <div
                        className="w-8 h-8 rounded-lg border border-stone-300 shadow-inner"
                        style={{ backgroundColor: settingsForm.backgroundColor || '#F9F7F2' }}
                      />
                    </div>
                  </div>

                  {/* Preset Quick Swatches */}
                  <div>
                    <span className="block text-[11px] font-semibold text-stone-600 mb-2">
                      მზა პალიტრები:
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[
                        { name: 'საწყისი თბილი', hex: '#F9F7F2', border: '#E5E0D8' },
                        { name: 'სუფთა თეთრი', hex: '#FFFFFF', border: '#E2E8F0' },
                        { name: 'კრემისფერი', hex: '#FDFBF7', border: '#EAE6DF' },
                        { name: 'მზის ყვითელი', hex: '#FDE047', border: '#EAB308' },
                        { name: 'ნაზი სალბი', hex: '#F2F5F2', border: '#CBD5E1' },
                        { name: 'ნაზი ცისფერი', hex: '#F0F6FC', border: '#BFDBFE' },
                        { name: 'მსუბუქი ნაცრისფერი', hex: '#F3F4F6', border: '#D1D5DB' },
                        { name: 'მუქი ლურჯი', hex: '#1E293B', border: '#0F172A' },
                        { name: 'ღამის შავი', hex: '#18181B', border: '#09090B' }
                      ].map((preset) => {
                        const isSelected =
                          (settingsForm.backgroundColor || '#F9F7F2').toLowerCase() === preset.hex.toLowerCase();
                        return (
                          <button
                            key={preset.hex}
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, backgroundColor: preset.hex })}
                            className={`flex items-center gap-1.5 p-2 rounded-xl border text-[11px] transition-all cursor-pointer ${
                              isSelected
                                ? 'ring-2 ring-stone-900 font-bold shadow-xs bg-stone-100'
                                : 'hover:bg-stone-50 border-stone-200'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full shrink-0 border"
                              style={{
                                backgroundColor: preset.hex,
                                borderColor: preset.border
                              }}
                            />
                            <span className="truncate text-stone-800">{preset.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="btn-save-site-settings"
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>პარამეტრების შენახვა</span>
                  </button>
                </div>
              </form>

              {/* Reset to defaults section */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-1">
                  მონაცემების გადატვირთვა
                </h4>
                <p className="text-xs text-rose-700 mb-3">
                  თუ გსურთ საწყისი საჩვენებელი ტურებისა და სერვისების დაბრუნება:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('დარწმუნებული ხართ რომ გსურთ საწყის მონაცემებზე დაბრუნება?')) {
                      onResetAllData();
                      onShowToast('მონაცემები გადაიტვირთა საწყის მდგომარეობაზე');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>საწყის მონაცემებზე დაბრუნება (Reset)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
