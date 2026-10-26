import React, { useState } from 'react';
import { 
  Maximize2, 
  Weight, 
  Layers, 
  Sparkles, 
  MessageCircle, 
  Eye, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function ProductCard({ product, onQuickView, onViewDetails }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  const whatsappInquiryUrl = `https://wa.me/${companyDetails.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20I%20would%20like%20a%20price%20quote%20for%20${encodeURIComponent(product.name)}%20(Model%3A%20${product.modelCode})%20in%20${encodeURIComponent(selectedColor)}%20color.`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:shadow-elevated hover:border-brand-primary/40 transition-all duration-300 flex flex-col group relative">
      
      {/* Product Image & Badges */}
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Featured Ribbon */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-extrabold shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> FEATURED
          </span>
        )}

        {/* Model Code */}
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-brand-dark/90 backdrop-blur-sm text-white text-[11px] font-mono tracking-wider shadow-sm">
          {product.modelCode}
        </span>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-brand-primary hover:text-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Model */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {product.modelCode}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
            className="font-extrabold text-slate-900 text-base line-clamp-1 hover:text-brand-primary transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Dimension Preview Badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{product.dimensions}</span>
          </div>

          {/* Specifications Preview (Weight Capacity & Stackability) */}
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Weight className="w-3.5 h-3.5" /> Load Tested
              </span>
              <span className="font-bold text-amber-600">
                {product.weightCapacity}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Layers className="w-3.5 h-3.5" /> Stacking Limit
              </span>
              <span className={`font-semibold text-[11px] ${product.isStackable ? 'text-emerald-700' : 'text-slate-500'}`}>
                {product.stackingLimit}
              </span>
            </div>
          </div>

          {/* Available Color Swatches */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
              <span>Shade: <strong className="text-slate-700">{selectedColor}</strong></span>
              <span className="text-[10px] text-slate-400">{product.colors.length} options</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.map((c, idx) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={idx}
                    type="button"
                    title={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                      isSelected 
                        ? 'ring-2 ring-brand-primary scale-110 border-white' 
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 text-white drop-shadow-sm" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Quote</span>
          </a>

          <button
            type="button"
            onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            View Details
          </button>
        </div>

      </div>

    </div>
  );
}
