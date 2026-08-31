import React, { useState } from 'react';
import { Smartphone, Monitor, Move, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Sliders, Crosshair } from 'lucide-react';
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
  const [deviceTab, setDeviceTab] = useState<'mobile' | 'desktop'>('mobile');

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

  const currentVal = deviceTab === 'mobile' ? positionMobile : positionDesktop;
  const currentCoords = parseCoordinates(currentVal);

  const updateCoordinates = (x: number, y: number) => {
    const clampedX = Math.max(0, Math.min(100, Math.round(x)));
    const clampedY = Math.max(0, Math.min(100, Math.round(y)));
    const posStr = `${clampedX}% ${clampedY}%`;

    if (deviceTab === 'mobile') {
      onChangeMobile(posStr);
    } else {
      onChangeDesktop(posStr);
    }
  };

  const nudge = (dx: number, dy: number) => {
    updateCoordinates(currentCoords.x + dx, currentCoords.y + dy);
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
    { label: '⬆️ ზედა (50% 10%)', x: 50, y: 10 },
    { label: '⬇️ ქვედა (50% 90%)', x: 50, y: 90 },
    { label: '⬅️ მარცხენა (10% 50%)', x: 10, y: 50 },
    { label: '➡️ მარჯვენა (90% 50%)', x: 90, y: 50 },
    { label: '↖️ ზედა-მარცხენა', x: 15, y: 15 },
    { label: '↗️ ზედა-მარჯვენა', x: 85, y: 15 }
  ];

  return (
    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
      {/* Header and Device Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Move className="w-4 h-4 text-amber-600" />
            {label}
          </span>
          <p className="text-[11px] text-stone-500">
            მართეთ ფოტოს ცენტრირება და მცოცავი პოზიცია ოთხივე მიმართულებით
          </p>
        </div>

        {/* Device Switcher Tabs */}
        <div className="inline-flex p-1 bg-stone-200/80 rounded-xl">
          <button
            type="button"
            onClick={() => setDeviceTab('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              deviceTab === 'mobile'
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>ტელეფონი (Mobile)</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceTab('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              deviceTab === 'desktop'
                ? 'bg-stone-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>კომპიუტერი (Desktop)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas & Live Device Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: 2D Interactive Drag Canvas & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
              <Crosshair className="w-3.5 h-3.5 text-amber-600" />
              ინტერაქციული მცოცავი დაფა (გადაათრიეთ წრე):
            </span>
            <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-700">
              X: {currentCoords.x}% | Y: {currentCoords.y}%
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

            {/* Target Reticle Lines */}
            <div
              className="absolute left-0 right-0 h-px bg-white/70 pointer-events-none transition-all duration-75"
              style={{ top: `${currentCoords.y}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-px bg-white/70 pointer-events-none transition-all duration-75"
              style={{ left: `${currentCoords.x}%` }}
            />

            {/* Drag Handle Marker Pin */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-all duration-75"
              style={{
                left: `${currentCoords.x}%`,
                top: `${currentCoords.y}%`
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-500 text-white flex items-center justify-center shadow-2xl ring-4 ring-black/40 animate-pulse">
                  {deviceTab === 'mobile' ? (
                    <Smartphone className="w-4 h-4" />
                  ) : (
                    <Monitor className="w-4 h-4" />
                  )}
                </div>
                <div className="absolute -bottom-5 whitespace-nowrap bg-black/85 text-white text-[9px] px-1.5 py-0.5 rounded font-mono shadow-md">
                  {deviceTab === 'mobile' ? 'მობილური' : 'დესკტოპი'}
                </div>
              </div>
            </div>

            {/* Helper pill */}
            <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs pointer-events-none shadow-sm">
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
                  {currentCoords.x}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-stone-400 font-medium shrink-0">მარცხნივ (0%)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={currentCoords.x}
                  onChange={(e) => updateCoordinates(Number(e.target.value), currentCoords.y)}
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
                  {currentCoords.y}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-stone-400 font-medium shrink-0">ზემოთ (0%)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={currentCoords.y}
                  onChange={(e) => updateCoordinates(currentCoords.x, Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                />
                <span className="text-[10px] text-stone-400 font-medium shrink-0">ქვემოთ (100%)</span>
              </div>
            </div>
          </div>

          {/* D-Pad Nudge Buttons + Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            {/* Directional Nudge D-Pad */}
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-stone-200 shadow-xs">
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
              {presets.slice(0, 5).map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => updateCoordinates(p.x, p.y)}
                  className="text-[10px] bg-white hover:bg-stone-100 text-stone-700 px-2 py-1.5 rounded-lg border border-stone-200 transition-colors cursor-pointer shadow-2xs font-medium"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Live Device Mockup Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-2 bg-stone-100/70 p-4 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
              {deviceTab === 'mobile' ? (
                <Smartphone className="w-4 h-4 text-amber-600" />
              ) : (
                <Monitor className="w-4 h-4 text-amber-600" />
              )}
              ცოცხალი შედეგი ({deviceTab === 'mobile' ? 'ტელეფონზე' : 'კომპიუტერზე'}):
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
              Live Preview
            </span>
          </div>

          {/* Conditional Mockup Display */}
          {deviceTab === 'mobile' ? (
            /* Mobile Phone Mockup */
            <div className="relative w-40 h-64 rounded-[2.2rem] bg-stone-950 p-2.5 shadow-2xl border-4 border-stone-800 overflow-hidden shrink-0">
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full z-20" />

              {/* Screen Area */}
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-stone-900">
                <img
                  src={formattedUrl}
                  alt="Mobile Mockup View"
                  className="w-full h-full object-cover transition-all duration-150"
                  style={{ objectPosition: `${currentCoords.x}% ${currentCoords.y}%` }}
                  referrerPolicy="no-referrer"
                />
                {/* Darkness Tint */}
                <div
                  className="absolute inset-0 bg-stone-950 transition-opacity"
                  style={{ opacity: overlayOpacity / 100 }}
                />
                {/* Simulated Content in Mockup */}
                <div className="absolute inset-x-3 bottom-4 text-white pointer-events-none space-y-1.5">
                  <div className="w-10 h-1.5 bg-amber-400 rounded-full" />
                  <div className="w-24 h-2.5 bg-white/95 rounded" />
                  <div className="w-16 h-2 bg-white/70 rounded" />
                  <div className="w-20 h-5 bg-[#25D366] rounded-md shadow-xs flex items-center justify-center text-[8px] font-bold">
                    WhatsApp
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop / Laptop Screen Mockup */
            <div className="w-full space-y-1">
              <div className="relative w-full aspect-[16/10] rounded-xl bg-stone-950 p-2 shadow-xl border-4 border-stone-800 overflow-hidden">
                {/* Top browser bar mockup */}
                <div className="flex items-center gap-1 mb-1.5 px-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div className="ml-2 w-20 h-1.5 bg-stone-800 rounded-full" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-[calc(100%-14px)] rounded-lg overflow-hidden relative bg-stone-900">
                  <img
                    src={formattedUrl}
                    alt="Desktop Mockup View"
                    className="w-full h-full object-cover transition-all duration-150"
                    style={{ objectPosition: `${currentCoords.x}% ${currentCoords.y}%` }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Darkness Tint */}
                  <div
                    className="absolute inset-0 bg-stone-950 transition-opacity"
                    style={{ opacity: overlayOpacity / 100 }}
                  />
                  {/* Simulated Hero / Services Content */}
                  <div className="absolute inset-x-4 bottom-4 text-white pointer-events-none">
                    <div className="w-16 h-2 bg-amber-400 rounded-full mb-1" />
                    <div className="w-36 h-3 bg-white/95 rounded mb-1" />
                    <div className="w-28 h-2 bg-white/70 rounded" />
                  </div>
                </div>
              </div>
              {/* Stand mockup */}
              <div className="w-16 h-2 bg-stone-700 mx-auto rounded-b-md" />
              <div className="w-24 h-1 bg-stone-600 mx-auto rounded-full" />
            </div>
          )}

          <p className="text-[10px] text-stone-500 text-center leading-tight pt-1">
            ამ პოზიციით გამოჩნდება საიტზე • შეგიძლიათ გადართოთ ტელეფონსა და დესკტოპს შორის
          </p>
        </div>
      </div>
    </div>
  );
};
