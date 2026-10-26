import React, { useState } from 'react';
import { 
  X, 
  MessageSquareQuote, 
  Send, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Phone,
  ShieldAlert
} from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { productCategories } from '../data/productsData';

export default function BulkQuoteModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'Plastic Chairs (Armrest)',
    quantity: '50',
    city: 'Bangalore',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const text = `*New Bulk Quote Request - Shri Metro Products*%0A%0A` +
      `*Client Name:* ${encodeURIComponent(formData.name || 'Not specified')}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone || 'Not specified')}%0A` +
      `*Category/Model:* ${encodeURIComponent(formData.category)}%0A` +
      `*Quantity Required:* ${encodeURIComponent(formData.quantity)} Units%0A` +
      `*Delivery Location:* ${encodeURIComponent(formData.city)}%0A` +
      `*Additional Notes:* ${encodeURIComponent(formData.notes || 'None')}%0A%0A` +
      `_Please provide factory gate pricing, GST invoice details, and dispatch timeframe._`;

    window.open(`https://wa.me/${companyDetails.whatsappNumber}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-dark via-slate-900 to-brand-primary text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Factory Wholesale Rate
          </div>
          <h3 className="text-xl font-bold">Request Bulk Quotation</h3>
          <p className="text-xs text-slate-300 mt-1">
            Get instant factory rates, container freight estimates, and GST invoicing for bulk orders.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleWhatsAppSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Name / Business *
              </label>
              <input
                type="text"
                required
                name="name"
                placeholder="e.g. Anand Tent House"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp / Mobile *
              </label>
              <input
                type="tel"
                required
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Product Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                {productCategories.filter(c => c !== "All Products").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estimated Units *
              </label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                <option value="25">25 - 50 Units (Trial Batch)</option>
                <option value="100">100 - 250 Units (Wholesale)</option>
                <option value="500">500 - 1000 Units (Institutional)</option>
                <option value="1000+">1000+ Units (Full Container / Truckload)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Delivery City / District
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Bangalore, Mysore, Hubli, Hassan..."
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Custom Requirements (Colors / Model Code)
            </label>
            <textarea
              name="notes"
              rows="2"
              placeholder="e.g. Need Teak Brown color chairs with fast dispatch in 3 days..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Send to Factory WhatsApp</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Opens WhatsApp chat directly with Proprietor Rakesh R Jain (+91 9845287888)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
