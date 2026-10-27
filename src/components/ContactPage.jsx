import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Navigation, 
  UserCheck, 
  ArrowUpRight,
  Send,
  FileCheck2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { LogoIcon } from './Logo';

export default function ContactPage({ prefilledMessage = '' }) {
  const { company: companyDetails, addInquiry } = useData();

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    city: 'Bangalore',
    phone: '',
    message: prefilledMessage || ''
  });

  const [copiedGstin, setCopiedGstin] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');

  // Update message if prefilledMessage changes from Quote Cart
  useEffect(() => {
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyGstin = () => {
    navigator.clipboard.writeText(companyDetails.gstin);
    setCopiedGstin(true);
    setTimeout(() => setCopiedGstin(false), 2500);
  };

  // Submit via WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const text = `*Direct Factory Inquiry - SHRI METRO PRODUCTS*%0A%0A` +
      `*Contact Person:* ${encodeURIComponent(formData.name)}%0A` +
      `*Company/Business:* ${encodeURIComponent(formData.companyName || 'Wholesale Buyer')}%0A` +
      `*Delivery Location:* ${encodeURIComponent(formData.city)}%0A` +
      `*Phone Number:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Order Requirements:*%0A${encodeURIComponent(formData.message || 'Requesting wholesale catalog and bulk pricing.')}%0A%0A` +
      `_Inquiry sent from official website_`;

    window.open(`https://wa.me/${companyDetails.whatsappNumber}?text=${text}`, '_blank');
    
    // Automatically log into Admin Inquiries
    if (addInquiry) {
      addInquiry({
        customerName: formData.name,
        businessName: formData.companyName || 'Wholesale Buyer',
        phone: formData.phone,
        quantity: 'Direct Inquiry',
        productName: formData.city ? `Delivery Hub: ${formData.city}` : 'Product Catalog Inquiry',
        message: formData.message || 'Direct factory inquiry submitted via contact form.'
      });
    }

    setSubmissionRef(`SMP-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  return (
    <section id="contact-section" className="bg-[#F8FAFC] py-12 sm:py-16 border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200 text-xs font-semibold shadow-2xs mb-2">
            <Building2 className="w-3.5 h-3.5 text-red-600" />
            <span>Manufacturing Works & Dispatch Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Factory Coordination & Direct Inquiry
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Direct wholesale pricing and dispatch coordination with Proprietor <strong className="text-slate-800 font-semibold">{companyDetails.proprietor}</strong>.
          </p>
        </div>

        {/* Clean, Non-Bulky 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Clean Factory Profile & Verified Credentials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
            
            <div className="space-y-5">
              {/* Header Identity */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <LogoIcon className="w-10 h-10 shadow-xs" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight">
                      {companyDetails.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Proprietor: <span className="text-slate-800 font-semibold">{companyDetails.proprietor}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                  ● Plant Active
                </span>
              </div>

              {/* Minimal Clean Details List */}
              <div className="space-y-3.5 text-xs text-slate-600">
                
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-medium text-[11px] block">Factory Location:</span>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      Site no: 10, 11, Vaishno Devi Industrial Estate, Kumbalgodu, Bangalore — 560074
                    </p>
                  </div>
                </div>

                {/* Direct Line & WhatsApp in a clean row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-medium text-[11px] block">Phone / Direct Line:</span>
                      <a href={`tel:${companyDetails.phoneRaw}`} className="font-semibold text-slate-900 hover:text-red-600 transition-colors">
                        {companyDetails.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-medium text-[11px] block">WhatsApp Desk:</span>
                      <a href={companyDetails.whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                        +91 9845287888
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-2.5 pt-1">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-medium text-[11px] block">Plant Loading Hours:</span>
                    <p className="text-slate-700 font-medium">
                      Mon – Sat: 9:00 AM – 7:30 PM <span className="text-slate-400">(Sunday Closed)</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom: Classy Minimal GSTIN & Directions Bar */}
            <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
              {/* Clean White/Slate GSTIN Box */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                    Verified GSTIN (100% ITC)
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    {companyDetails.gstin}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyGstin}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-red-600 text-[11px] font-semibold transition-all cursor-pointer shadow-2xs flex items-center gap-1 active:scale-95"
                >
                  {copiedGstin ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Minimal Directions Button */}
              <a
                href={companyDetails.location.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-red-600" />
                  <span>Kumbalgodu Works (NH 275 Corridor)</span>
                </div>
                <span className="text-slate-400 group-hover:text-red-600 font-medium text-[11px] flex items-center gap-0.5">
                  Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

          </div>

          {/* Right Column: Clean, Modern Inquiry Desk (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    Direct Wholesale Quotation
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Receive prompt factory-gate estimates, container packaging breakdowns, and freight terms.
                  </p>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  MOQ: 25 Units
                </span>
              </div>

              {/* Success Notification */}
              {formSubmitted && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inquiry sent! Ref: <strong>{submissionRef}</strong>. Opening WhatsApp...</span>
                  </div>
                  <span className="text-emerald-700 font-semibold text-[11px]">Connecting...</span>
                </div>
              )}

              {/* Clean Lightweight Form */}
              <form onSubmit={handleWhatsAppSubmit} className="space-y-3.5">
                
                {/* Row 1: Name & Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1">
                      Business / Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="e.g. Sri Balaji Tent House / Cafe"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      placeholder="+91 98450 12345"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all placeholder:text-slate-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1">
                      Delivery City / District *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      placeholder="e.g. Bangalore, Mysore, Hubli..."
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Row 3: Order Details */}
                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">
                    Order Requirements / Models & Quantities
                  </label>
                  <textarea
                    rows="3"
                    name="message"
                    placeholder="Mention models, required quantities (e.g. 50 armchairs + 10 dining tables), and target delivery date..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all placeholder:text-slate-400 resize-none"
                  ></textarea>
                </div>

                {/* Action Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-red-500/20 transition-all cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Inquiry to Factory Desk</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600 shrink-0" /> Direct Manufacturer Rates
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600 shrink-0" /> B2B GST Invoicing
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600 shrink-0" /> Karnataka Freight Dispatch
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
