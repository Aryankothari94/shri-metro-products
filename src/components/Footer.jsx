import React from 'react';
import { ArrowUp } from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function Footer({ onSelectCategory, onOpenCatalogueBook }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200/90 text-slate-600 py-8 sm:py-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Identity & Quick Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                {companyDetails.name}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium">
                Moulded Furniture Manufacturer
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Vaishno Devi Industrial Estate, Kumbalgodu, Bangalore — 560074
            </p>
          </div>

          {/* Classy, understated navigation links */}
          <nav className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs font-medium text-slate-600">
            <button 
              type="button"
              onClick={() => {
                if (onOpenCatalogueBook) onOpenCatalogueBook();
                else scrollToSection('catalog-section');
              }}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Catalog
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection('why-choose-us')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Factory Benchmarks
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection('contact-section')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Location & Contact
            </button>
            <a 
              href={`tel:${companyDetails.phoneRaw}`}
              className="hover:text-slate-900 transition-colors"
            >
              {companyDetails.phone}
            </a>
            <a 
              href={companyDetails.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              WhatsApp Desk →
            </a>
          </nav>
        </div>

        {/* Bottom: Legal, Credentials & Back to Top */}
        <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Proprietor: <strong className="text-slate-600 font-medium">{companyDetails.proprietor}</strong></span>
            <span>•</span>
            <span>GSTIN: <span className="font-mono text-slate-600 font-medium">{companyDetails.gstin}</span></span>
            <span>•</span>
            <span>B2B Input Tax Credit</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Shri Metro Products</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-medium"
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
