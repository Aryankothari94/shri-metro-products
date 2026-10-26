import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  ArrowUp, 
  Sparkles,
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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-850 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-900/30">
                SM
              </div>
              <div>
                <h3 className="font-black text-white text-lg tracking-tight leading-none">
                  {companyDetails.name}
                </h3>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  Moulded Furniture Manufacturer
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Bangalore's dedicated manufacturer of 100% Virgin Polypropylene plastic chairs, dining tables, coffee tables, stools, and patlas. Engineered for extreme load tolerance and commercial longevity.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="text-slate-500">Proprietor:</span>
                <strong className="text-white font-semibold">{companyDetails.proprietor}</strong>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">GSTIN:</span>
                <strong className="font-mono text-amber-400 font-bold tracking-wider">{companyDetails.gstin}</strong>
              </p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {footerCategories.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleCategoryNav(item.value)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Works Location & Direct Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Factory Unit & Works
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <p className="font-medium text-white">{companyDetails.location.siteNo}</p>
                <p>{companyDetails.location.estate}</p>
                <p>{companyDetails.location.area}</p>
                <p>{companyDetails.location.city} - {companyDetails.location.pincode}</p>
                <a
                  href={companyDetails.location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold mt-1"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <a 
                href={`tel:${companyDetails.phoneRaw}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Line: {companyDetails.phone}</span>
              </a>

              <a 
                href={companyDetails.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Factory WhatsApp: +91 9845287888</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {companyDetails.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Kumbalgodu Industrial Estate, Bangalore</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors text-xs font-semibold"
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
