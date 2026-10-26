import React, { useState } from 'react';
import { 
  Maximize2, 
  Weight, 
  Layers, 
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
    <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-red-300 hover:shadow-md transition-all duration-200 flex flex-col group">
      
      {/* Product Image Frame (Clean Neutral Canvas) */}
      <div 
        onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
        className="relative h-52 bg-slate-50/70 p-4 flex items-center justify-center cursor-pointer overflow-hidden border-b border-slate-100 group-hover:bg-red-50/10 transition-colors"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Minimal Model Pill Top Left */}
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 backdrop-blur-xs text-slate-700 text-[10px] font-mono font-bold border border-slate-200 shadow-2xs group-hover:border-red-200 transition-colors">
          {product.modelCode}
        </span>

        {/* Featured Tag */}
        {product.isFeatured && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-200/80">
            Featured
          </span>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            {product.category}
          </span>

          {/* Product Name */}
          <h3
            onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
            className="font-bold text-slate-900 text-sm hover:text-red-600 transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Clean Dashboard Spec Matrix */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
            <div className="flex items-center gap-1 text-slate-500">
              <Weight className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Load: <strong className="text-red-600 font-bold">{product.weightCapacity}</strong></span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Layers className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{product.stackingLimit}</span>
            </div>
            <div className="col-span-2 flex items-center gap-1 text-slate-500 font-mono text-[10px] truncate">
              <Maximize2 className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{product.dimensions}</span>
            </div>
          </div>

          {/* Color Dots */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 text-[10px]">Shade: {selectedColor}</span>
            <div className="flex items-center gap-1">
              {product.colors.map((c, idx) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={idx}
                    type="button"
                    title={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                      isSelected ? 'ring-2 ring-red-600 border-white scale-110' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-700 font-bold text-xs transition-colors cursor-pointer text-center"
          >
            Specs
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm shadow-red-500/20"
          >
            <MessageCircle className="w-3 h-3 text-white" />
            <span>Quote</span>
          </a>
        </div>

      </div>

    </div>
  );
}
