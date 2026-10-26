import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function BulkQuoteDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearAll,
  onNavigateToContactForm 
}) {
  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const handleSendConsolidatedWhatsApp = () => {
    if (items.length === 0) return;

    let text = `*Consolidated Wholesale Procurement Inquiry - SHRI METRO PRODUCTS*%0A%0A`;
    text += `Hello Rakesh R Jain, I would like to request factory wholesale quotation for the following items:%0A%0A`;

    items.forEach((item, index) => {
      text += `*${index + 1}. ${item.name}* (${item.modelCode})%0A`;
      text += `   • Quantity: *${item.quantity} units*%0A`;
      text += `   • Color Finish: ${item.color}%0A`;
      text += `   • Dimensions: ${item.dimensions}%0A%0A`;
    });

    text += `*Total Units Required:* ${totalUnits} units%0A`;
    text += `*Destination:* Bangalore / Karnataka%0A%0A`;
    text += `_Please share formal GST tax invoice estimate, delivery schedule from Kumbalgodu factory, and payment terms._`;

    window.open(`https://wa.me/${companyDetails.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleUseForm = () => {
    let summary = `Inquiry for ${totalUnits} units across ${items.length} product(s):\n`;
    items.forEach((item, idx) => {
      summary += `${idx + 1}. ${item.name} (${item.modelCode}) - ${item.quantity} units [Color: ${item.color}]\n`;
    });

    if (onNavigateToContactForm) {
      onNavigateToContactForm(summary);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/75 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                Wholesale Inquiry Cart
              </h3>
              <p className="text-xs text-red-100">
                {items.length} product{items.length === 1 ? '' : 's'} • {totalUnits} total units
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto divide-y divide-slate-100 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto border border-red-100">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">Your Quote List is Empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Add products from our catalog (e.g. 50 Chairs + 10 Tables) to compile your wholesale requisition.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-500/20 cursor-pointer"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-brand-primary font-bold">
                        {item.modelCode}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs truncate">
                        {item.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Color Badge */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className="w-3 h-3 rounded-full border border-slate-300"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    <span className="text-[11px] text-slate-600 font-medium">
                      {item.color}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(5, item.quantity - 10))}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200 cursor-pointer"
                        title="Decrease by 10"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-1 text-xs font-mono font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 10)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200 cursor-pointer"
                        title="Increase by 10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-500 font-medium">
                      Units
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Consolidated Wholesale Inquiry */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Total Bulk Requisition:</span>
              <strong className="text-sm font-black text-slate-900 font-mono">
                {totalUnits} Units
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs pb-1">
              <span className="text-slate-500">Billing:</span>
              <span className="font-semibold text-emerald-700">Official GST Invoice + ITC</span>
            </div>

            {/* Single "Send Consolidated Wholesale Inquiry" button via WhatsApp */}
            <button
              onClick={handleSendConsolidatedWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Send Consolidated Wholesale Inquiry</span>
            </button>

            {/* Option to send via Contact Form */}
            {onNavigateToContactForm && (
              <button
                onClick={handleUseForm}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-red-50/50 text-slate-700 hover:text-red-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-red-600" />
                <span>Submit via Website Inquiry Form</span>
              </button>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Direct factory dispatch from Kumbalgodu</span>
              <button
                onClick={onClearAll}
                className="text-slate-500 hover:text-red-600 underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
