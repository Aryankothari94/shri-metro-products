import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function FloatingInquiryButton({ itemCount, totalUnits, onClick }) {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce-subtle">
      <button
        onClick={onClick}
        type="button"
        className="group relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-600/30 border border-red-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        title="Open Wholesale Inquiry Cart"
      >
        {/* Glow */}
        <span className="absolute -inset-0.5 rounded-2xl bg-red-500 opacity-25 group-hover:opacity-50 blur-sm transition duration-300 pointer-events-none"></span>

        {/* Icon & Counter Badge */}
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-white text-red-600 flex items-center justify-center shadow-xs font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
            {itemCount}
          </span>
        </div>

        {/* Text */}
        <div className="relative text-left leading-tight hidden sm:block">
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-100">
            Wholesale Inquiry Cart
          </p>
          <p className="text-xs font-extrabold text-white">
            {totalUnits} Units Ready
          </p>
        </div>
      </button>
    </div>
  );
}
