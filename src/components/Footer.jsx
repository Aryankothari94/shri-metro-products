import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ArrowUp, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  Truck, 
  Award,
  BookOpen,
  Lock
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Footer({ onSelectCategory, onOpenCatalogueBook, onNavigateAdmin }) {
  const { company, categories } = useData();
  const [copiedGstin, setCopiedGstin] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    scrollToSection('catalog-section');
  };

  const handleCopyGstin = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(company.gstin);
      setCopiedGstin(true);
      setTimeout(() => setCopiedGstin(false), 2000);
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs font-sans">
      
      {/* 1. Value & Reliability Highlights Bar */}
      <div className="border-b border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs">100% Virgin PP</p>
                <p className="text-slate-400 text-[11px]">Zero regrind or brittle fillers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs">200 kg Tested</p>
                <p className="text-slate-400 text-[11px]">Static hydraulic pressure verified</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs">High Stackability</p>
                <p className="text-slate-400 text-[11px]">Space-efficient storage & transit</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs">Direct Factory Gate</p>
                <p className="text-slate-400 text-[11px]">Full truckload & wholesale supply</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Manufacturing Identity & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-sm tracking-tight shadow-sm shadow-red-600/20">
                SM
              </div>
              <div>
                <span className="font-black text-base text-slate-900 tracking-tight block leading-none">
                  {company.name}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5 block">
                  Plastic Moulded Furniture
                </span>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed">
              Industrial-grade manufacturer of heavy-duty plastic moulded furniture for banquet halls, catering enterprises, institutions, event venues, and wholesale furniture dealers across South India.
            </p>

            {/* B2B Legal Box */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Proprietor:</span>
                <span className="font-bold text-slate-800">{company.proprietor}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">GSTIN (B2B ITC):</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-900">{company.gstin}</span>
                  <button
                    type="button"
                    onClick={handleCopyGstin}
                    className="p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                    title="Copy GSTIN"
                  >
                    {copiedGstin ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium">HSN Code Category:</span>
                <span className="font-mono text-slate-700">9403 (Moulded Furniture)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Product Lines (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
              Manufactured Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id || cat.name}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.name)}
                    className="text-slate-500 hover:text-red-600 transition-colors cursor-pointer flex items-center justify-between w-full text-left"
                  >
                    <span>{cat.name}</span>
                    <span className="text-slate-300">→</span>
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenCatalogueBook) onOpenCatalogueBook();
                    else scrollToSection('catalog-section');
                  }}
                  className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Interactive 3D Catalogue</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Wholesale & B2B Solutions (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
              Wholesale Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollToSection('catalog-section')}
                  className="hover:text-red-600 transition-colors cursor-pointer text-left"
                >
                  Bulk Institutional Supply
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollToSection('why-us')}
                  className="hover:text-red-600 transition-colors cursor-pointer text-left"
                >
                  Quality Benchmarks
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollToSection('contact-section')}
                  className="hover:text-red-600 transition-colors cursor-pointer text-left"
                >
                  Custom Colour Runs
                </button>
              </li>
              <li>
                <span className="text-slate-400">Truckload Logistics</span>
              </li>
              <li>
                <span className="text-slate-400">GST Input Tax Credit</span>
              </li>
              <li>
                <a 
                  href={company.whatsappLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-700 font-semibold hover:text-red-600 transition-colors inline-block"
                >
                  Direct Factory Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Works & Dispatch (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
              Factory Works & Dispatch
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-500">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800 leading-snug">
                    {company.location?.estate}, {company.location?.area}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {company.location?.city}, {company.location?.state} — {company.location?.pincode}
                  </p>
                  <a
                    href={company.location?.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold text-[11px] mt-1"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="font-bold text-slate-900 hover:text-red-600 transition-colors"
                >
                  {company.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={company.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  WhatsApp: +{company.whatsappNumber}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-500">
                  <p className="font-medium text-slate-700">Mon – Sat: 9:00 AM – 7:30 PM</p>
                  <p className="text-slate-400">Sunday Closed (Inquiries Monitored)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Legal & Back to Top Strip */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
              <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span>100% Virgin Polypropylene</span>
              <span className="hidden sm:inline">•</span>
              <span>Kumbalgodu Industrial Area</span>
              <span className="hidden sm:inline">•</span>
              {/* Discreet Admin Portal Link */}
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="hover:text-amber-600 transition-colors flex items-center gap-1 font-semibold cursor-pointer text-slate-500"
                title="Open Administrative Terminal"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                <span>Admin Console</span>
              </button>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>
      </div>

    </footer>
  );
}
