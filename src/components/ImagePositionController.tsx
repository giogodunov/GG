import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Move,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Link2,
  Unlink,
  Check
} from 'lucide-react';
import { formatImageUrl } from '../utils/imageHelper';

interface ImagePositionControllerProps {
  imageUrl: string;
  positionMobile?: string;
  positionDesktop?: string;
  onChangeMobile: (pos: string) => void;
  onChangeDesktop: (pos: string) => void;
  overlayOpacity?: number;
  label?: string;
}

export const ImagePositionController: React.FC<ImagePositionControllerProps> = ({
  imageUrl,
  positionMobile = '50% 50%',
  positionDesktop = '50% 50%',
  onChangeMobile,
  onChangeDesktop,
  overlayOpacity = 35,
  label = 'ფოტოს პოზიციონირება და ფოკუსი'
}) => {
  // Sync mode: 'sync' (both mobile & desktop), 'mobile' (mobile only), 'desktop' (desktop only)
  const [controlMode, setControlMode] = useState<'sync' | 'mobile' | 'desktop'>('sync');

  // Parse "X% Y%" or preset string
  const parseCoordinates = (val?: string): { x: number; y: number } => {
    if (!val || val === 'center') return { x: 50, y: 50 };
    if (val === 'top') return { x: 50, y: 0 };
    if (val === 'bottom') return { x: 50, y: 100 };
    if (val === 'left') return { x: 0, y: 50 };
    if (val === 'right') return { x: 100, y: 50 };
    if (val === 'top-left') return { x: 0, y: 0 };
    if (val === 'top-right') return { x: 100, y: 0 };
    if (val === 'bottom-left') return { x: 0, y: 100 };
    if (val === 'bottom-right') return { x: 100, y: 100 };
    if (val.includes('%')) {
      const parts = val.split(' ');
      if (parts.length >= 2) {
        const px = parseFloat(parts[0]);
        const py = parseFloat(parts[1]);
        if (!isNaN(px) && !isNaN(py)) {
          return {
            x: Math.max(0, Math.min(100, Math.round(px))),
            y: Math.max(0, Math.min(100, Math.round(py)))
          };
        }
      }
    }
    return { x: 50, y: 50 };
  };

  const mobileCoords = parseCoordinates(positionMobile);
  const desktopCoords = parseCoordinates(positionDesktop);

  // Active coordinates being manipulated
  const activeCoords =
    controlMode === 'desktop' ? desktopCoords : mobileCoords;

  const updateCoordinates = (x: number, y: number) => {
    const clampedX = Math.max(0, Math.min(100, Math.round(x)));
    const clampedY = Math.max(0, Math.min(100, Math.round(y)));
    const posStr = `${clampedX}% ${clampedY}%`;

    if (controlMode === 'sync') {
      onChangeMobile(posStr);
      onChangeDesktop(posStr);
    } else if (controlMode === 'mobile') {
      onChangeMobile(posStr);
    } else if (controlMode === 'desktop') {
      onChangeDesktop(posStr);
    }
  };

  const nudge = (dx: number, dy: number) => {
    updateCoordinates(activeCoords.x + dx, activeCoords.y + dy);
  };

  const handlePointerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const clampedY = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const pctX = Math.round((clampedX / rect.width) * 100);
    const pctY = Math.round((clampedY / rect.height) * 100);
    updateCoordinates(pctX, pctY);
  };

  const formattedUrl = formatImageUrl(imageUrl);

  const presets = [
    { label: 'ცენტრი (50% 50%)', x: 50, y: 50 },
    { label: '⬆️ ზედა ნაწილი (50% 0%)', x: 50, y: 0 },
    { label: '⬇️ ქვედა ნაწილი (50% 100%)', x: 50, y: 100 },
    { label: '⬅️ მარცხენა (0% 50%)', x: 0, y: 50 },
    { label: '➡️ მარჯვენა (100% 50%)', x: 100, y: 50 }
  ];

  return (
    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      {/* Header and Control Mode Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Move className="w-4 h-4 text-amber-600" />
            {label}
          </span>
          <p className="text-[11px] text-stone-500">
            გადაათრიეთ მაუსით ან გამოიყენეთ ისრები/სლაიდერები ფოტოს სასურველი კუთხის დასაყენებლად
          </p>
        </div>

        {/* Sync vs Individual Control Buttons */}
        <div className="inline-flex p-1 bg-stone-200/90 rounded-xl gap-1 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setControlMode('sync')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              controlMode === 'sync'
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
            title="ცვლილება ერთდროულად მოქმედებს მობილურზეც და კომპიუტერზეც"
          >
            <Link2 className="w-3.5 h-3.5 text-amber-400" />
            <span>🔗 ორივეზე ერთად (სინქრონული)</span>
          </button>

          <button
            type="button"
            onClick={() => setControlMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              controlMode === 'mobile'
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>მხოლოდ მობილური</span>
          </button>

          <button
            type="button"
            onClick={() => setControlMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              controlMode === 'desktop'
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>მხოლოდ კომპიუტერი</span>
          </button>
        </div>
      </div>

      {/* Mode info banner */}
      <div className="flex items-center justify-between text-[11px] px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900">
        <span className="flex items-center gap-1.5 font-medium">
          {controlMode === 'sync' && (
            <>
              <Link2 className="w-3.5 h-3.5 text-amber-600" />
              <span>
                <strong>სინქრონული რეჟიმი ჩართულია:</strong> როდესაც კურსორს ამოძრავებთ, ფოტოს პოზიცია ერთდროულად ახლდება როგორც მობილურზე, ისე კომპიუტერზე!
              </span>
            </>
          )}
          {controlMode === 'mobile' && (
            <>
              <Smartphone className="w-3.5 h-3.5 text-amber-600" />
              <span>
                <strong>მხოლოდ მობილური:</strong> ცვლილებები შეეხება მხოლოდ მობილურის ეკრანს.
              </span>
            </>
          )}
          {controlMode === 'desktop' && (
            <>
              <Monitor className="w-3.5 h-3.5 text-amber-600" />
              <span>
                <strong>მხოლოდ კომპიუტერი:</strong> ცვლილებები შეეხება მხოლოდ კომპიუტერის ფართო ეკრანს.
              </span>
            </>
          )}
        </span>
        <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200 text-stone-900 text-[10px] shrink-0">
          X: {activeCoords.x}% | Y: {activeCoords.y}%
        </span>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: 2D Interactive Drag Canvas & Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
              <Crosshair className="w-3.5 h-3.5 text-amber-600" />
              მცოცავი დაფა (დააწკაპუნეთ და გადაათრიეთ წრე):
            </span>
          </div>

          {/* Interactive Drag Canvas */}
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
            {/* Full Image */}
            <img
              src={formattedUrl}
              alt="Focal View"
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Visual Rule of Thirds Grid */}
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

            {/* Target Reticle Horizontal Line */}
            <div
              className="absolute left-0 right-0 h-px bg-white/70 pointer-events-none transition-all duration-75"
              style={{ top: `${activeCoords.y}%` }}
            />
            {/* Target Reticle Vertical Line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white/70 pointer-events-none transition-all duration-75"
              style={{ left: `${activeCoords.x}%` }}
            />

            {/* Drag Handle Marker Pin */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-all duration-75"
              style={{
                left: `${activeCoords.x}%`,
                top: `${activeCoords.y}%`
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-500 text-white flex items-center justify-center shadow-2xl ring-4 ring-black/40 animate-pulse">
                  {controlMode === 'mobile' ? (
                    <Smartphone className="w-4 h-4" />
                  ) : controlMode === 'desktop' ? (
                    <Monitor className="w-4 h-4" />
                  ) : (
                    <Move className="w-4 h-4" />
                  )}
                </div>
                <div className="absolute -bottom-5 whitespace-nowrap bg-black/90 text-white text-[9px] px-1.5 py-0.5 rounded font-mono shadow-md">
                  {controlMode === 'sync' ? 'მობილური + კომპიუტერი' : controlMode === 'mobile' ? 'მობილური' : 'კომპიუტერი'}
                </div>
              </div>
            </div>

            {/* Helper pill */}
            <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs pointer-events-none shadow-sm">
              🖱️ დააწკაპუნეთ ან გადაათრიეთ ნებისმიერ წერტილში
            </div>
          </div>

          {/* Precision Sliders (Horizontal X & Vertical Y) */}
          <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2.5 shadow-xs">
            {/* Horizontal X Slider */}
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>ჰორიზონტალური გადაადგილება (X - მარცხნივ / მარჯვნივ):</span>
                </label>
                <span className="font-mono font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded text-[10px]">
                  {activeCoords.x}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-stone-400 font-medium shrink-0">მარცხნივ (0%)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={activeCoords.x}
                  onChange={(e) => updateCoordinates(Number(e.target.value), activeCoords.y)}
                  className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                />
                <span className="text-[10px] text-stone-400 font-medium shrink-0">მარჯვნივ (100%)</span>
              </div>
            </div>

            {/* Vertical Y Slider */}
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>ვერტიკალური გადაადგილება (Y - ზემოთ / ქვემოთ):</span>
                </label>
                <span className="font-mono font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded text-[10px]">
                  {activeCoords.y}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-stone-400 font-medium shrink-0">ზემოთ (0%)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={activeCoords.y}
                  onChange={(e) => updateCoordinates(activeCoords.x, Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                />
                <span className="text-[10px] text-stone-400 font-medium shrink-0">ქვემოთ (100%)</span>
              </div>
            </div>
          </div>

          {/* D-Pad Nudge Buttons + Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            {/* Directional Nudge D-Pad */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[10px] font-bold text-stone-500 px-1">ბიჯი:</span>
              <button
                type="button"
                onClick={() => nudge(-5, 0)}
                className="p-1 hover:bg-stone-100 rounded text-stone-700 transition-colors cursor-pointer"
                title="მარცხნივ (-5%)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => nudge(0, -5)}
                className="p-1 hover:bg-stone-100 rounded text-stone-700 transition-colors cursor-pointer"
                title="ზემოთ (-5%)"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => nudge(0, 5)}
                className="p-1 hover:bg-stone-100 rounded text-stone-700 transition-colors cursor-pointer"
                title="ქვემოთ (+5%)"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => nudge(5, 0)}
                className="p-1 hover:bg-stone-100 rounded text-stone-700 transition-colors cursor-pointer"
                title="მარჯვნივ (+5%)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => updateCoordinates(50, 50)}
                className="p-1 hover:bg-stone-100 rounded text-stone-700 transition-colors cursor-pointer ml-1 text-[10px] flex items-center gap-1 font-semibold"
                title="ცენტრში დაბრუნება (50% 50%)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>ცენტრი</span>
              </button>
            </div>

            {/* Quick Presets Buttons */}
            <div className="flex items-center gap-1 flex-wrap">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => updateCoordinates(p.x, p.y)}
                  className="text-[10px] bg-white hover:bg-stone-100 text-stone-700 px-2 py-1 rounded-lg border border-stone-200 transition-colors cursor-pointer shadow-2xs font-medium"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: DUAL LIVE PREVIEWS (Mobile + Desktop) Side-by-Side (6 cols) */}
        <div className="lg:col-span-6 space-y-3 bg-stone-100/90 p-3.5 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ცოცხალი გადახედვა (Live Preview - 2 მოწყობილობა):
            </span>
            <span className="text-[10px] text-stone-500">
              ორივე რეალურ დროში მოძრაობს
            </span>
          </div>

          {/* Desktop Preview Card (Ultra-Wide Banner) */}
          <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-blue-600" />
                კომპიუტერის ვერსია (Desktop 21:9 Widescreen):
              </span>
              <span className="text-[10px] font-mono text-stone-500 font-semibold">
                X: {desktopCoords.x}% | Y: {desktopCoords.y}%
              </span>
            </div>

            {/* Desktop Mockup Browser Window */}
            <div className="relative w-full aspect-[21/9] rounded-lg bg-stone-950 p-1.5 shadow-md border border-stone-800 overflow-hidden">
              {/* Browser bar top */}
              <div className="flex items-center gap-1 mb-1 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="ml-2 w-16 h-1 bg-stone-800 rounded-full" />
              </div>

              {/* Inner Banner Area */}
              <div className="w-full h-[calc(100%-8px)] rounded overflow-hidden relative bg-stone-900">
                <img
                  src={formattedUrl}
                  alt="Desktop Mockup View"
                  className="w-full h-full object-cover transition-all duration-150"
                  style={{ objectPosition: `${desktopCoords.x}% ${desktopCoords.y}%` }}
                  referrerPolicy="no-referrer"
                />
                {/* Darkness Tint */}
                <div
                  className="absolute inset-0 bg-stone-950 transition-opacity"
                  style={{ opacity: overlayOpacity / 100 }}
                />
                {/* Simulated Content in Desktop Mockup */}
                <div className="absolute inset-x-3 bottom-2 text-white pointer-events-none flex items-end justify-between">
                  <div>
                    <div className="w-12 h-1 bg-amber-400 rounded-full mb-1" />
                    <p className="text-[10px] font-serif italic font-bold leading-tight drop-shadow-xs">
                      აღმოაჩინე საქართველო
                    </p>
                    <p className="text-[7px] text-white/80 leading-none">
                      ინდივიდუალური ტურები და ტრანსფერები
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <div className="px-2 py-0.5 bg-[#25D366] text-white rounded text-[7px] font-bold shadow-xs">
                      WhatsApp
                    </div>
                    <div className="px-2 py-0.5 bg-white text-stone-900 rounded text-[7px] font-bold shadow-xs">
                      დაჯავშნა
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Preview Card (Phone Mockup) */}
          <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                მობილურის ვერსია (Mobile Screen):
              </span>
              <span className="text-[10px] font-mono text-stone-500 font-semibold">
                X: {mobileCoords.x}% | Y: {mobileCoords.y}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Phone Frame */}
              <div className="relative w-28 h-40 rounded-[1.4rem] bg-stone-950 p-1.5 shadow-md border-2 border-stone-800 overflow-hidden shrink-0">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full z-20" />

                {/* Inner Screen */}
                <div className="w-full h-full rounded-[1rem] overflow-hidden relative bg-stone-900">
                  <img
                    src={formattedUrl}
                    alt="Mobile Mockup View"
                    className="w-full h-full object-cover transition-all duration-150"
                    style={{ objectPosition: `${mobileCoords.x}% ${mobileCoords.y}%` }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Darkness Tint */}
                  <div
                    className="absolute inset-0 bg-stone-950 transition-opacity"
                    style={{ opacity: overlayOpacity / 100 }}
                  />
                  {/* Simulated Content in Mobile Mockup */}
                  <div className="absolute inset-x-2 bottom-2 text-white pointer-events-none space-y-1">
                    <div className="w-6 h-1 bg-amber-400 rounded-full" />
                    <p className="text-[8px] font-serif italic font-bold leading-tight drop-shadow-xs">
                      საქართველო
                    </p>
                    <div className="w-14 h-3.5 bg-[#25D366] rounded flex items-center justify-center text-[7px] font-bold">
                      WhatsApp
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info & Tips */}
              <div className="text-[11px] text-stone-600 space-y-1.5 leading-relaxed">
                <p className="font-semibold text-stone-900">
                  💡 როგორ მუშაობს:
                </p>
                <p>
                  როდესაც მარცხნივ წრეს გადააადგილებთ, <strong>კომპიუტერის ფართო ეკრანზეც</strong> და <strong>მობილურის ეკრანზეც</strong> ფოტო მყისიერად მოძრაობს.
                </p>
                {controlMode === 'sync' && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                    <Check className="w-3 h-3" />
                    ორივე მოწყობილობა სინქრონიზებულია
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
