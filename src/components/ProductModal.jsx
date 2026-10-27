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
  Info,
  ExternalLink
} from 'lucide-react';
import { useData } from '../context/DataContext';
import useSwipeGesture from '../hooks/useSwipeGesture';

export default function ProductModal({ product, onClose, onOpenPDP }) {
  const { company: companyDetails } = useData();

  // Swipe right or swipe down to dismiss modal
  const { gestureState, touchHandlers } = useSwipeGesture({
    onSwipeRight: onClose,
    onSwipeDown: onClose,
    threshold: 45,
    disabled: !product,
  });

  if (!product) return null;

  const whatsappInquiryUrl = `https://wa.me/${companyDetails.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20I%20would%20like%20a%20bulk%20quotation%20for%20${encodeURIComponent(product.name)}%20(Model%20Code%3A%20${product.modelCode}).`;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 transform transition-all duration-75 select-none"
        style={{
          transform: gestureState.isSwiping
            ? gestureState.direction === 'right'
              ? `translateX(${gestureState.distanceX}px)`
              : gestureState.direction === 'down'
              ? `translateY(${gestureState.distanceY}px)`
              : 'none'
            : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
        {...touchHandlers}
      >
        {/* Mobile Swipe Hint Bar */}
        <div className="sm:hidden w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Badges */}
          <div className="relative bg-slate-100 min-h-[240px] sm:min-h-[280px] md:min-h-full overflow-hidden flex items-center justify-center">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              className="w-full h-full object-contain p-4 max-h-[300px] sm:max-h-[380px] md:max-h-full"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {product.isFeatured && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Model
              </span>
            )}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-mono">
              Model: {product.modelCode}
            </div>
          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div>
              {/* Category */}
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
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
                  className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-red-500/20"
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
