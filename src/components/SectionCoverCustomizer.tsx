import React, { useState } from 'react';
import {
  Upload,
  Sliders,
  Smartphone,
  Monitor,
  Move,
  Check,
  Trash2,
  Sparkles,
  Compass,
  Car,
  BookOpen,
  HelpCircle,
  Phone,
  Layout,
  ExternalLink
} from 'lucide-react';
import { SiteSettings } from '../types';
import { formatImageUrl, compressImageFile, parseXYPosition, getObjectPositionStyle } from '../utils/imageHelper';

export type SectionCoverKey = 'hero' | 'tours' | 'services' | 'guides' | 'faq' | 'footer';

interface SectionConfig {
  id: SectionCoverKey;
  labelKa: string;
  labelEn: string;
  icon: React.ElementType;
  badgeKa: string;
  sampleTitleKa: string;
  sampleSubtitleKa: string;
  imageKey: keyof SiteSettings;
  opacityKey: keyof SiteSettings;
  textColorKey: keyof SiteSettings;
  mobilePosKey: keyof SiteSettings;
  desktopPosKey: keyof SiteSettings;
  defaultOpacity: number;
}

export const SECTIONS_COVER_CONFIG: SectionConfig[] = [
  {
    id: 'hero',
    labelKa: 'მთავარი ბანერი (Hero)',
    labelEn: 'Hero Banner',
    icon: Layout,
    badgeKa: 'აღმოაჩინე საქართველო',
    sampleTitleKa: 'ავთენტური მოგზაურობა',
    sampleSubtitleKa: 'ინდივიდუალური ტურები & ტრანსფერები',
    imageKey: 'heroCoverImage',
    opacityKey: 'heroCoverOverlayOpacity',
    textColorKey: 'heroTextColorMode',
    mobilePosKey: 'heroCoverPositionMobile',
    desktopPosKey: 'heroCoverPositionDesktop',
    defaultOpacity: 35
  },
  {
    id: 'tours',
    labelKa: 'რჩეული ტურები (Tours)',
    labelEn: 'Featured Tours',
    icon: Compass,
    badgeKa: 'ექსკლუზიური მიმართულებები',
    sampleTitleKa: 'რჩეული ტურები & მარშრუტები',
    sampleSubtitleKa: 'ყაზბეგი, სვანეთი, მარტვილი, კახეთი',
    imageKey: 'toursCoverImage',
    opacityKey: 'toursCoverOverlayOpacity',
    textColorKey: 'toursTextColorMode',
    mobilePosKey: 'toursCoverPositionMobile',
    desktopPosKey: 'toursCoverPositionDesktop',
    defaultOpacity: 35
  },
  {
    id: 'services',
    labelKa: 'ტრანსფერები & სერვისები',
    labelEn: 'Transfers & Services',
    icon: Car,
    badgeKa: 'კომფორტული მგზავრობა',
    sampleTitleKa: 'აეროპორტის ტრანსფერები & გიდები',
    sampleSubtitleKa: 'ქუთაისი, თბილისი, ბათუმი',
    imageKey: 'servicesCoverImage',
    opacityKey: 'servicesCoverOverlayOpacity',
    textColorKey: 'servicesTextColorMode',
    mobilePosKey: 'servicesCoverPositionMobile',
    desktopPosKey: 'servicesCoverPositionDesktop',
    defaultOpacity: 45
  },
  {
    id: 'guides',
    labelKa: 'გზამკვლევები & რჩევები',
    labelEn: 'Travel Guides',
    icon: BookOpen,
    badgeKa: 'სასარგებლო რჩევები',
    sampleTitleKa: 'საქართველოს გზამკვლევი',
    sampleSubtitleKa: 'პრაქტიკული ინფორმაცია & მარშრუტები',
    imageKey: 'guidesCoverImage',
    opacityKey: 'guidesCoverOverlayOpacity',
    textColorKey: 'guidesTextColorMode',
    mobilePosKey: 'guidesCoverPositionMobile',
    desktopPosKey: 'guidesCoverPositionDesktop',
    defaultOpacity: 35
  },
  {
    id: 'faq',
    labelKa: 'ხშირად დასმული კითხვები (FAQ)',
    labelEn: 'FAQ Section',
    icon: HelpCircle,
    badgeKa: 'ინფორმაცია & პასუხები',
    sampleTitleKa: 'ხშირად დასმული კითხვები',
    sampleSubtitleKa: 'დაჯავშნა, ტრანსფერები და გადახდის პირობები',
    imageKey: 'faqCoverImage',
    opacityKey: 'faqCoverOverlayOpacity',
    textColorKey: 'faqTextColorMode',
    mobilePosKey: 'faqCoverPositionMobile',
    desktopPosKey: 'faqCoverPositionDesktop',
    defaultOpacity: 35
  },
  {
    id: 'footer',
    labelKa: 'კონტაქტი & ფუტერი',
    labelEn: 'Contact & Footer',
    icon: Phone,
    badgeKa: 'დაგვიკავშირდით',
    sampleTitleKa: 'დაგეგმეთ თქვენი მოგზაურობა',
    sampleSubtitleKa: 'WhatsApp, ტელეფონი და ოფისის მისამართი',
    imageKey: 'footerCoverImage',
    opacityKey: 'footerCoverOverlayOpacity',
    textColorKey: 'footerTextColorMode',
    mobilePosKey: 'footerCoverPositionMobile',
    desktopPosKey: 'footerCoverPositionDesktop',
    defaultOpacity: 45
  }
];

export const PRESET_BACKGROUND_IMAGES = [
  {
    name: 'ყაზბეგი & გერგეტის სამება',
    url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'სვანეთის კოშკები & მთები',
    url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'მარტვილის კანიონი & ზურმუხტისფერი წყალი',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'გუდაურის პანორამა & სამხედრო გზა',
    url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'კახეთის ვენახები & ალაზნის ველი',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'ძველი თბილისი & ნარიყალა',
    url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=2000&q=85'
  }
];

interface SectionCoverCustomizerProps {
  settings: SiteSettings;
  onChangeSettings: (updated: SiteSettings) => void;
  initialSection?: SectionCoverKey;
}

export const SectionCoverCustomizer: React.FC<SectionCoverCustomizerProps> = ({
  settings,
  onChangeSettings,
  initialSection = 'hero'
}) => {
  const [activeSectionId, setActiveSectionId] = useState<SectionCoverKey>(initialSection);
  const [focalDeviceMode, setFocalDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isUploading, setIsUploading] = useState(false);

  const activeSection = SECTIONS_COVER_CONFIG.find((s) => s.id === activeSectionId) || SECTIONS_COVER_CONFIG[0];

  const currentImageUrl = (settings[activeSection.imageKey] as string) || '';
  const currentOpacity = (settings[activeSection.opacityKey] as number) ?? activeSection.defaultOpacity;
  const currentTextColor = (settings[activeSection.textColorKey] as 'auto' | 'light' | 'dark') || 'auto';
  const currentMobilePos = (settings[activeSection.mobilePosKey] as string) || '50% 50%';
  const currentDesktopPos = (settings[activeSection.desktopPosKey] as string) || '50% 50%';

  const formattedCoverUrl = formatImageUrl(currentImageUrl);
  const hasCover = Boolean(formattedCoverUrl && formattedCoverUrl.trim() !== '');

  const activePosString = focalDeviceMode === 'desktop' ? currentDesktopPos : currentMobilePos;
  const activePos = parseXYPosition(activePosString);

  // Handle direct file upload with client-side canvas compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('ფაილის ზომა არ უნდა აღემატებოდეს 15MB-ს');
      return;
    }

    try {
      setIsUploading(true);
      const compressedBase64 = await compressImageFile(file, 1920, 1080, 0.85);
      onChangeSettings({
        ...settings,
        [activeSection.imageKey]: compressedBase64
      });
    } catch (err) {
      console.error('Error optimizing image:', err);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          onChangeSettings({
            ...settings,
            [activeSection.imageKey]: result
          });
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  // Interactive mouse drag handler for focal positioning
  const handlePointerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const clampedY = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const pctX = Math.round((clampedX / rect.width) * 100);
    const pctY = Math.round((clampedY / rect.height) * 100);
    const newPosString = `${pctX}% ${pctY}%`;

    if (focalDeviceMode === 'desktop') {
      onChangeSettings({
        ...settings,
        [activeSection.desktopPosKey]: newPosString
      });
    } else {
      onChangeSettings({
        ...settings,
        [activeSection.mobilePosKey]: newPosString
      });
    }
  };

  const desktopPosStyle = getObjectPositionStyle(currentDesktopPos);
  const mobilePosStyle = getObjectPositionStyle(currentMobilePos);

  return (
    <div className="space-y-6">
      {/* Section Selector Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            აირჩიეთ სასურველი სექცია:
          </label>
          <span className="text-[11px] text-stone-500 font-medium">
            სულ {SECTIONS_COVER_CONFIG.length} სექცია
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SECTIONS_COVER_CONFIG.map((sec) => {
            const Icon = sec.icon;
            const isSelected = sec.id === activeSectionId;
            const secHasImage = Boolean(settings[sec.imageKey]);

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSectionId(sec.id)}
                className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-white hover:bg-stone-100/80 border-stone-200 text-stone-700'
                }`}
              >
                {secHasImage && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
                <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-amber-300' : 'text-stone-600'}`} />
                <span className="text-[11px] font-semibold leading-tight line-clamp-1">
                  {sec.labelKa.split('(')[0].trim()}
                </span>
                <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                  {secHasImage ? 'ფონი ჩართულია' : 'სტანდარტული'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Section Customizer Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-5">
        {/* Header with Title and Clear Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
              {React.createElement(activeSection.icon, { className: 'w-4 h-4 text-amber-700' })}
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                {activeSection.labelKa} — ფონის მორგება
              </h4>
              <p className="text-[11px] text-stone-500">
                დააყენეთ მაღალი ხარისხის ფონი, დაბნელება და მაუსით გადააადგილეთ სურათი
              </p>
            </div>
          </div>

          {hasCover && (
            <button
              type="button"
              onClick={() =>
                onChangeSettings({
                  ...settings,
                  [activeSection.imageKey]: ''
                })
              }
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer self-start sm:self-auto border border-rose-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ფონის წაშლა / გამორთვა</span>
            </button>
          )}
        </div>

        {/* Resolution Recommendation Box */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-[11px] text-amber-950 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">📐 რეკომენდებული გარჩევადობა:</span> <strong>1920 × 1080 px</strong> (Full HD) ან <strong>2560 × 1440 px</strong> (2K), <strong>16:9</strong> ჰორიზონტალური ფორმატი. ავტომატურად ოპტიმიზირდება ატვირთვისას.
          </div>
        </div>

        {/* Image Source (Upload, URL, Presets) */}
        <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
            <label className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition-colors shadow-xs">
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>{isUploading ? 'ოპტიმიზაცია...' : 'კომპიუტერიდან ატვირთვა'}</span>
              <input
                type="file"
                accept="image/*"
                disabled={isUploading}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-stone-400 text-center sm:text-left font-medium">ან ჩასვით ფოტოს ბმული (URL):</span>
          </div>

          <input
            type="url"
            value={currentImageUrl}
            onChange={(e) =>
              onChangeSettings({
                ...settings,
                [activeSection.imageKey]: formatImageUrl(e.target.value)
              })
            }
            placeholder="https://... (პირდაპირი ბმული, Google Drive, Unsplash და ა.შ.)"
            className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
          />

          {/* Preset Buttons */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-stone-500 mb-1.5">
              საქართველოს ულამაზესი ხედები (Presets):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_BACKGROUND_IMAGES.map((preset) => {
                const isCurrent = currentImageUrl === preset.url;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() =>
                      onChangeSettings({
                        ...settings,
                        [activeSection.imageKey]: preset.url
                      })
                    }
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-[11px] text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-xs'
                        : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-8 h-8 rounded-md object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="truncate text-[11px]">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Controls When Photo is Active */}
        {hasCover && (
          <div className="space-y-6 pt-2">
            {/* Overlay Darkness Slider */}
            <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-stone-600" />
                  <span>ფოტოს დაბნელება / გამუქება (Darkness Overlay):</span>
                </label>
                <span className="text-xs font-mono font-bold text-stone-900 bg-white px-2.5 py-0.5 rounded-md border border-stone-300 shadow-2xs">
                  {currentOpacity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={currentOpacity}
                onChange={(e) =>
                  onChangeSettings({
                    ...settings,
                    [activeSection.opacityKey]: Number(e.target.value)
                  })
                }
                className="w-full accent-stone-900 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                <span>0% (სუფთა ფოტო)</span>
                <span>35% (რეკომენდებული)</span>
                <span>50% (საშუალო)</span>
                <span>90% (ძალიან მუქი)</span>
              </div>
            </div>

            {/* Text Color Mode */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                ტექსტის ფერის რეჟიმი ამ სექციაში:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'auto', label: 'ავტომატური' },
                  { id: 'light', label: 'თეთრი ტექსტი (White)' },
                  { id: 'dark', label: 'მუქი ტექსტი (Dark)' }
                ].map((mode) => {
                  const isSelected = currentTextColor === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() =>
                        onChangeSettings({
                          ...settings,
                          [activeSection.textColorKey]: mode.id as any
                        })
                      }
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* INTERACTIVE DRAG-TO-POSITION FOCAL CANVAS (DESKTOP + MOBILE) */}
            <div className="pt-2 border-t border-stone-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h5 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Move className="w-4 h-4 text-amber-600" />
                    <span>ინტერაქტიული კადრირება (მაუსით გადაადგილება):</span>
                  </h5>
                  <p className="text-[11px] text-stone-500">
                    დააწკაპუნეთ ან <strong>გადაათრიეთ მაუსით</strong> სურათზე სასურველი ადგილის დასაფიქსირებლად
                  </p>
                </div>

                {/* Switch between Desktop Mode and Mobile Mode */}
                <div className="inline-flex p-1 bg-stone-200/80 rounded-xl border border-stone-300">
                  <button
                    type="button"
                    onClick={() => setFocalDeviceMode('desktop')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      focalDeviceMode === 'desktop'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5 text-stone-700" />
                    <span>კომპიუტერი (Desktop)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFocalDeviceMode('mobile')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      focalDeviceMode === 'mobile'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-stone-700" />
                    <span>მობილური (Mobile)</span>
                  </button>
                </div>
              </div>

              {/* Main Interactive Drag Box */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Full Interactive Canvas with Crosshair & Dragging */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                        {focalDeviceMode === 'desktop' ? (
                          <>
                            <Monitor className="w-3.5 h-3.5 text-amber-600" />
                            <span>კომპიუტერის ფოკუსი (დააწკაპუნეთ/აცოცეთ მაუსით):</span>
                          </>
                        ) : (
                          <>
                            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                            <span>მობილურის ფოკუსი (დააწკაპუნეთ/აცოცეთ მაუსით):</span>
                          </>
                        )}
                      </span>
                      <span className="text-[11px] font-mono font-bold bg-white px-2.5 py-0.5 rounded-md border border-stone-200 text-stone-700 shadow-2xs">
                        X: {activePos.x}% | Y: {activePos.y}%
                      </span>
                    </div>

                    {/* The Drag Canvas Surface */}
                    <div
                      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden cursor-crosshair border-2 border-stone-300 shadow-inner bg-stone-900 select-none group touch-none"
                      onPointerDown={(e) => {
                        e.currentTarget.setPointerCapture(e.pointerId);
                        handlePointerDrag(e);
                      }}
                      onPointerMove={(e) => {
                        if (e.buttons === 1) {
                          handlePointerDrag(e);
                        }
                      }}
                    >
                      <img
                        src={formattedCoverUrl}
                        alt="Focal View Canvas"
                        className="w-full h-full object-cover pointer-events-none"
                        referrerPolicy="no-referrer"
                      />

                      {/* 3x3 Rule of Thirds Grid Overlay */}
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
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

                      {/* Crosshairs Lines */}
                      <div
                        className="absolute left-0 right-0 h-px bg-white/70 pointer-events-none shadow-xs"
                        style={{ top: `${activePos.y}%` }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-px bg-white/70 pointer-events-none shadow-xs"
                        style={{ left: `${activePos.x}%` }}
                      />

                      {/* Interactive Dragging Target Pin Badge */}
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-transform"
                        style={{
                          left: `${activePos.x}%`,
                          top: `${activePos.y}%`
                        }}
                      >
                        <div className="relative flex items-center justify-center">
                          <div className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shadow-2xl ring-4 ring-black/40 ${
                            focalDeviceMode === 'desktop' ? 'bg-amber-500 text-stone-950' : 'bg-emerald-600 text-white'
                          }`}>
                            {focalDeviceMode === 'desktop' ? (
                              <Monitor className="w-5 h-5" />
                            ) : (
                              <Smartphone className="w-5 h-5" />
                            )}
                          </div>
                          <div className="absolute -bottom-6 whitespace-nowrap bg-black/85 text-white text-[9px] px-2 py-0.5 rounded-full font-mono shadow-md backdrop-blur-xs">
                            {focalDeviceMode === 'desktop' ? 'კომპიუტერი' : 'მობილური'}: {activePos.x}%, {activePos.y}%
                          </div>
                        </div>
                      </div>

                      {/* Bottom Banner Info */}
                      <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs pointer-events-none flex items-center gap-1.5 shadow-xs">
                        <Move className="w-3 h-3 text-amber-300" />
                        <span>🖱️ გადაათრიეთ მაუსით ნებისმიერ წერტილში</span>
                      </div>
                    </div>

                    {/* Quick Align Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">
                        სწრაფი გასწორება:
                      </span>
                      {[
                        { label: 'ცენტრი (50% 50%)', pos: '50% 50%' },
                        { label: 'ზედა (50% 15%)', pos: '50% 15%' },
                        { label: 'ქვედა (50% 85%)', pos: '50% 85%' },
                        { label: 'მარცხენა (15% 50%)', pos: '15% 50%' },
                        { label: 'მარჯვენა (85% 50%)', pos: '85% 50%' }
                      ].map((preset) => (
                        <button
                          key={preset.pos}
                          type="button"
                          onClick={() => {
                            if (focalDeviceMode === 'desktop') {
                              onChangeSettings({
                                ...settings,
                                [activeSection.desktopPosKey]: preset.pos
                              });
                            } else {
                              onChangeSettings({
                                ...settings,
                                [activeSection.mobilePosKey]: preset.pos
                              });
                            }
                          }}
                          className="text-[10px] bg-white hover:bg-stone-100 text-stone-700 px-2 py-1 rounded-lg border border-stone-200 font-medium transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Live Realistic Device Mockup Preview */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
                    <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
                      {focalDeviceMode === 'desktop' ? (
                        <>
                          <Monitor className="w-3.5 h-3.5 text-stone-800" />
                          <span>როგორ გამოჩნდება კომპიუტერზე:</span>
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-3.5 h-3.5 text-stone-800" />
                          <span>როგორ გამოჩნდება მობილურზე:</span>
                        </>
                      )}
                    </span>

                    {/* Desktop Browser Window Mockup */}
                    {focalDeviceMode === 'desktop' && (
                      <div className="w-full max-w-sm rounded-xl overflow-hidden border border-stone-300 shadow-lg bg-stone-900">
                        {/* Browser Top Bar */}
                        <div className="bg-stone-800 px-3 py-1.5 flex items-center gap-1.5 border-b border-stone-700">
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div className="ml-2 flex-1 bg-stone-900/80 rounded px-2 py-0.5 text-[9px] text-stone-400 truncate">
                            ingeorgiatours.ge/#{activeSection.id}
                          </div>
                        </div>

                        {/* Browser Content Area */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
                          <img
                            src={formattedCoverUrl}
                            alt="Desktop Preview"
                            className="w-full h-full object-cover transition-all duration-100"
                            style={{ objectPosition: desktopPosStyle }}
                            referrerPolicy="no-referrer"
                          />
                          <div
                            className="absolute inset-0 bg-black"
                            style={{ opacity: currentOpacity / 100 }}
                          />
                          {/* Live Simulated Section Header */}
                          <div className="absolute inset-0 p-3 flex flex-col justify-between text-white pointer-events-none">
                            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-300">
                              {activeSection.badgeKa}
                            </span>
                            <div>
                              <h6 className="text-xs font-serif italic font-bold">
                                {activeSection.sampleTitleKa}
                              </h6>
                              <p className="text-[8px] text-white/80 line-clamp-1">
                                {activeSection.sampleSubtitleKa}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-1 pt-1 opacity-70">
                              <div className="h-6 bg-white/20 rounded backdrop-blur-xs" />
                              <div className="h-6 bg-white/20 rounded backdrop-blur-xs" />
                              <div className="h-6 bg-white/20 rounded backdrop-blur-xs" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mobile Smartphone Mockup */}
                    {focalDeviceMode === 'mobile' && (
                      <div className="relative w-36 h-56 rounded-[2rem] bg-stone-950 p-2 shadow-xl border-4 border-stone-800 overflow-hidden shrink-0">
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-full z-20" />
                        <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative bg-stone-900">
                          <img
                            src={formattedCoverUrl}
                            alt="Mobile Preview"
                            className="w-full h-full object-cover transition-all duration-100"
                            style={{ objectPosition: mobilePosStyle }}
                            referrerPolicy="no-referrer"
                          />
                          <div
                            className="absolute inset-0 bg-black"
                            style={{ opacity: currentOpacity / 100 }}
                          />
                          <div className="absolute inset-x-2.5 bottom-4 text-white pointer-events-none">
                            <div className="w-10 h-1 bg-amber-400 rounded-full mb-1" />
                            <div className="w-20 h-2 bg-white/95 rounded mb-1" />
                            <div className="w-14 h-1.5 bg-white/70 rounded mb-2" />
                            <div className="w-16 h-3.5 bg-amber-500 rounded-md" />
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="text-[10px] text-stone-500 text-center">
                      ცოცხალი რეჟიმი • გადაადგილეთ მაუსით მარცხენა ფოტოზე
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
