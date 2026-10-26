import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Search, 
  Menu, 
  X, 
  MessageSquareQuote, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  onSelectCategory, 
  onOpenBulkQuote 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = [
    { label: "Chairs", value: "Plastic Chairs" },
    { label: "Center Tables", value: "Center Tables" },
    { label: "Dining Tables", value: "Dining Tables" },
    { label: "Stools", value: "Stools" },
    { label: "Patlas", value: "Patlas" }
  ];

  const handleCategoryClick = (catValue) => {
    onSelectCategory(catValue);
    setMobileMenuOpen(false);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-brand-dark text-slate-300 text-xs py-2 px-4 border-b border-slate-800 tracking-wide font-sans relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="flex items-center gap-1 font-semibold text-amber-400">
              <span className="text-sm">🏭</span> Factory Unit: Kumbalgodu, Bangalore
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              GSTIN: <strong className="font-mono text-white tracking-wider">{companyDetails.gstin}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${companyDetails.phoneRaw}`} 
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {companyDetails.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Prop: <strong className="text-slate-200">{companyDetails.proprietor}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Brand Logo & Tagline */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-dark via-slate-900 to-brand-primary flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform duration-200 ring-2 ring-brand-primary/20">
                <span className="font-black text-lg tracking-tight text-amber-400 font-sans">SM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-brand-dark leading-none group-hover:text-brand-primary transition-colors">
                  {companyDetails.name}
                </span>
                <span className="text-[11px] font-semibold text-brand-muted tracking-wider uppercase mt-1">
                  Moulded Furniture Mfg • Bangalore
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
              {navCategories.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleCategoryClick(item.value)}
                  className="px-3 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="#why-us"
                className="px-3 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors"
              >
                Quality
              </a>
              <a
                href="#contact-card"
                className="px-3 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Live Search & CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Live Search Input */}
              <form onSubmit={handleSearchSubmit} className="relative w-48 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products, models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Request Bulk Quote CTA Button */}
              <button
                type="button"
                onClick={onOpenBulkQuote}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0"
              >
                <MessageSquareQuote className="w-4 h-4 text-slate-950" />
                <span>Request Bulk Quote</span>
              </button>
            </div>

            {/* Mobile Menu & Search Icon Trigger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={onOpenBulkQuote}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Quote
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Live Search Bar (visible on extra small screens) */}
          <div className="sm:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search chairs, tables, patlas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 rounded-lg border border-slate-200 focus:bg-white outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-elevated">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Explore Categories
            </p>
            <div className="grid grid-cols-2 gap-2">
              {navCategories.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleCategoryClick(item.value)}
                  className="text-left px-3 py-2 text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Quality Assurance & Specs
              </a>
              <a
                href="#contact-card"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Factory Location & Contact
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBulkQuote();
                }}
                className="w-full mt-2 py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs text-center flex items-center justify-center gap-2"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Request Wholesale Bulk Quote</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
