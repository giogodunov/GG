import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      id="app-toast-banner"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-stone-50 px-4 py-3 rounded-xl shadow-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-md"
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
      )}
      <span className="text-sm font-medium leading-snug flex-1">{message}</span>
      <button
        onClick={onClose}
        id="btn-toast-close"
        className="text-stone-400 hover:text-stone-100 p-1 transition-colors"
        aria-label="დახურვა"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
