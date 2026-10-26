import React from 'react';
import { 
  X, 
  Maximize2, 
  Weight, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  Phone,
  Sparkles,
  Info
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function ProductModal({ product, onClose, onOpenPDP }) {
  if (!product) return null;

  const whatsappInquiryUrl = `https://wa.me/${companyDetails.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20I%20would%20like%20a%20bulk%20quotation%20for%20${encodeURIComponent(product.name)}%20(Model%20Code%3A%20${product.modelCode}).`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Badges */}
          <div className="relative bg-slate-100 min-h-[280px] md:min-h-full overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover max-h-[380px] md:max-h-full"
            />
            {product.isFeatured && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Featured Model
              </span>
            )}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-mono">
              Model: {product.modelCode}
            </div>
          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category */}
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                {product.category}
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="mt-5 space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400" /> Dimensions
                  </span>
                  <span className="font-mono font-bold text-slate-800">{product.dimensions}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Weight className="w-3.5 h-3.5 text-slate-400" /> Tested Capacity
                  </span>
                  <span className="font-bold text-amber-600">{product.weightCapacity}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Material Grade
                  </span>
                  <span className="font-semibold text-blue-700">{product.material}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" /> Stacking Limit
                  </span>
                  <span className="font-semibold text-emerald-700">{product.stackingLimit}</span>
                </div>

                {product.suitableFor && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Ideal For</span>
                    <span className="font-medium text-slate-700">{product.suitableFor}</span>
                  </div>
                )}
              </div>

              {/* Color Swatches */}
              <div className="mt-5">
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Factory Available Shades ({product.colors.length}):
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-slate-700 font-medium text-[11px]">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              {onOpenPDP && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPDP(product);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Interactive Spec Sheet & Bulk Estimator</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get WhatsApp Quote</span>
                </a>

                <a
                  href={`tel:${companyDetails.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Call Factory</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
