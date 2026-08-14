import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  highContrast?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  highContrast = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl p-6 sm:p-8 shadow-2xl border ${
          highContrast
            ? 'bg-black text-white border-4 border-cyan-400'
            : 'bg-slate-900/95 text-slate-100 border-cyan-500/40 glow-cyan-lg'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            {title}
          </h2>
          <Button
            variant="ghost"
            size="normal"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full w-12 h-12 !p-0"
            highContrast={highContrast}
          >
            <X className="w-7 h-7" />
          </Button>
        </div>

        {/* Body */}
        <div className="py-6 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer && <div className="pt-4 border-t border-slate-800 flex justify-end gap-4">{footer}</div>}
      </div>
    </div>
  );
};
