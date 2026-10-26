import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ArrowUp, 
  ExternalLink 
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function Footer({ onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerCategories = [
    { label: "Plastic Armrest Chairs", value: "Plastic Chairs (Armrest)" },
    { label: "Plastic Armless Chairs", value: "Plastic Chairs (Armless)" },
    { label: "Designer Center Tables", value: "Center Tables" },
    { label: "4 & 6-Seater Dining Tables", value: "Dining Tables" },
    { label: "Heavy Duty Stools", value: "Stools" },
    { label: "Anti-Skid Patlas", value: "Patlas" },
  ];

  const handleCategoryNav = (cat) => {
    onSelectCategory(cat);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-10 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-extrabold text-xs">
                SM
              </div>
              <div>
                <span className="font-extrabold text-white text-sm tracking-tight block">
                  {companyDetails.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Moulded Furniture Mfg • Bangalore
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Manufacturer of 100% Virgin Polypropylene commercial moulded furniture. Certified load tested for banquets, institutions, and wholesale distribution across Karnataka.
            </p>

            <div className="text-slate-400 text-xs font-mono space-y-0.5 pt-1">
              <p>Proprietor: <strong className="text-slate-200">{companyDetails.proprietor}</strong></p>
              <p>GSTIN: <strong className="text-slate-200">{companyDetails.gstin}</strong></p>
            </div>
          </div>

          {/* Quick Categories (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] block">
              Categories
            </span>
            <ul className="space-y-1.5 text-slate-400">
              {footerCategories.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleCategoryNav(item.value)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Works & Contact (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] block">
              Factory Unit & Dispatch
            </span>
            <p className="text-slate-400 leading-relaxed">
              {companyDetails.location.fullAddress}
            </p>

            <div className="pt-2 space-y-1 text-slate-300">
              <p>
                <a href={`tel:${companyDetails.phoneRaw}`} className="hover:text-white transition-colors">
                  Tel: {companyDetails.phone}
                </a>
              </p>
              <p>
                <a href={companyDetails.whatsappLink} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  WhatsApp: +91 9845287888
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <p>© {new Date().getFullYear()} {companyDetails.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Kumbalgodu Industrial Estate, Bangalore</span>
            <button
              onClick={scrollToTop}
              className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
