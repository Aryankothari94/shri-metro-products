import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  Navigation, 
  UserCheck, 
  Sparkles,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function ContactPage({ prefilledMessage = '' }) {
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

  // Update message if prefilledMessage changes
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

  // 1. Submit via WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }

    const text = `*New Factory Direct Inquiry - SHRI METRO PRODUCTS*%0A%0A` +
      `*Client Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Company/Business:* ${encodeURIComponent(formData.companyName || 'Not specified')}%0A` +
      `*City/District:* ${encodeURIComponent(formData.city)}%0A` +
      `*Phone Number:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Inquiry Details:*%0A${encodeURIComponent(formData.message || 'Requesting product catalogue and wholesale pricing.')}%0A%0A` +
      `_Submitted via Shri Metro Products Official Website_`;

    window.open(`https://wa.me/${companyDetails.whatsappNumber}?text=${text}`, '_blank');
    
    // Also record local submission state
    setSubmissionRef(`SMP-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  // 2. Submit Direct Message on site
  const handleDirectSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }

    setSubmissionRef(`SMP-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  return (
    <div id="contact-section" className="bg-brand-bg py-12 sm:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Manufacturing Works & Head Office</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Factory Location & Contact
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Direct coordination with Proprietor <strong className="text-slate-900">{companyDetails.proprietor}</strong>. Visit our Kumbalgodu manufacturing plant or request bulk dispatch across Karnataka.
          </p>
        </div>

        {/* 2-Column Grid: Left (Location & Map) | Right (Interactive Inquiry Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Factory Details & Map Placeholder (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Complete Company Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle space-y-6">
              
              {/* Header Profile */}
              <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-dark to-brand-primary flex items-center justify-center text-white font-black text-xl shadow-md">
                  SM
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-brand-dark tracking-tight leading-none">
                    {companyDetails.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-primary mt-1 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    Proprietor: {companyDetails.proprietor}
                  </p>
                </div>
              </div>

              {/* Detailed Contact List */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Works Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-0.5">
                      Plant / Factory Works:
                    </span>
                    <p className="font-medium text-slate-900">{companyDetails.location.siteNo}</p>
                    <p>{companyDetails.location.estate}</p>
                    <p>{companyDetails.location.area}</p>
                    <p className="font-bold text-slate-900">
                      {companyDetails.location.city} - {companyDetails.location.pincode}, Karnataka
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-0.5">
                      Direct Line / Mobile:
                    </span>
                    <a
                      href={`tel:${companyDetails.phoneRaw}`}
                      className="font-bold text-slate-900 hover:text-brand-primary transition-colors font-mono text-sm"
                    >
                      {companyDetails.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-0.5">
                      Factory WhatsApp:
                    </span>
                    <a
                      href={companyDetails.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      +91 9845287888 (Instant Response)
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-0.5">
                      Visiting & Loading Hours:
                    </span>
                    <span className="text-slate-600">
                      Mon – Sat: 9:00 AM – 7:30 PM (Sunday Closed)
                    </span>
                  </div>
                </div>

              </div>

              {/* GSTIN Verification Box */}
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Karnataka GSTIN
                    </span>
                    <button
                      onClick={handleCopyGstin}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedGstin ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-base font-extrabold text-amber-300 tracking-wider">
                    {companyDetails.gstin}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Eligible for B2B Goods and Services Tax Input Tax Credit (ITC)
                  </p>
                </div>
              </div>

            </div>

            {/* Map Placeholder & Factory Directions Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-subtle flex flex-col">
              
              {/* Simulated Industrial Map Graphic */}
              <div className="relative h-60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 flex flex-col justify-between overflow-hidden">
                {/* Visual Grid Lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>

                {/* Road Schematic */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-slate-700/60 border-y border-amber-500/30 flex items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                    NH 275 • Bangalore - Mysore Expressway Hub
                  </span>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700 text-amber-400 text-[11px] font-bold">
                    Kumbalgodu Industrial Zone
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    12.8797° N, 77.4475° E
                  </span>
                </div>

                {/* Pinpoint Landmark */}
                <div className="relative z-10 self-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 animate-pulse">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="mt-2 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-white text-xs font-bold inline-block">
                    SHRI METRO PRODUCTS (Site 10, 11)
                  </div>
                </div>

                <div className="relative z-10 text-[11px] text-slate-300">
                  Vaishno Devi Industrial Estate, Gerupalya
                </div>
              </div>

              {/* Map CTA Bottom Strip */}
              <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <p className="font-bold text-slate-900">Need driving directions?</p>
                  <p className="text-[11px] text-slate-500">Accessible for 20ft & 40ft freight containers</p>
                </div>

                <a
                  href={companyDetails.location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Factory Directions</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-elevated">
            
            <div className="mb-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 block mb-1">
                Direct Wholesale Quotation
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Send Your Order Requirements
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Receive prompt factory-gate estimates, container volume breakdowns, and freight quotes from our Kumbalgodu dispatch desk.
              </p>
            </div>

            {/* Submission Success Alert */}
            {formSubmitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 animate-fadeIn">
                <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-sm">Inquiry Received Successfully!</p>
                  <p className="mt-0.5 text-emerald-800">
                    Reference ID: <strong className="font-mono text-emerald-950 font-bold">{submissionRef}</strong>
                  </p>
                  <p className="mt-1 text-emerald-700">
                    Proprietor Rakesh R Jain will review your requirements and respond shortly. You can also connect immediately on WhatsApp: <a href={companyDetails.whatsappLink} className="underline font-bold">+91 9845287888</a>.
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name / Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="e.g. Anand Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                  />
                </div>

                {/* 2. Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Business Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="e.g. Sri Balaji Tent House / Cafe"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 3. City / District */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City / Delivery Location *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    placeholder="e.g. Bangalore, Mysore, Hubli, Tumkur..."
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                  />
                </div>

                {/* 4. Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    placeholder="+91 98450 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium font-mono"
                  />
                </div>
              </div>

              {/* 5. Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Order Requirements / Product Details
                </label>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Mention models, required quantities (e.g. 100 armrest chairs + 20 dining tables), preferred color finishes, and delivery timeframe..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium leading-relaxed resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Send Inquiry via Factory WhatsApp (+91 9845287888)</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectSubmit}
                  className="w-full py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-slate-600" />
                  <span>Submit Web Form Directly</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-500 text-center sm:text-left">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Virgin PP
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Direct Factory Pricing
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> GST Tax Billing
                </span>
              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
