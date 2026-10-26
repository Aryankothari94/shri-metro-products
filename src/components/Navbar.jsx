import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Search, 
  Menu, 
  X, 
  ShoppingBag, 
  MessageCircle, 
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  onSelectCategory, 
  onOpenBulkQuote,
  quoteListCount = 0,
  onOpenQuoteDrawer,
  onNavigateContact,
  onLogoClick,
  activeView = 'catalogue',
  onSwitchView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Catalogue", id: "catalog-section" },
    { label: "Wholesale Specs", id: "catalog-section", isTableTrigger: true },
    { label: "Quality Testing", id: "why-us" },
    { label: "Factory & Works", id: "contact-section", isContact: true }
  ];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    if (item.isContact) {
      if (onNavigateContact) onNavigateContact();
      return;
    }
    if (item.isTableTrigger && onSwitchView) {
      onSwitchView('table');
    }
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sleek Minimal Dashboard Header (Single-Tier, Clean UI) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left: Clean Brand Monogram & Factory Status */}
            <div className="flex items-center gap-6">
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onLogoClick) onLogoClick();
                }}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-xs group-hover:bg-brand-primary transition-colors">
                  SM
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 leading-none">
                    SHRI METRO
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    Industrial Moulded Furniture
                  </span>
                </div>
              </a>

              {/* Status Badge (Dashboard Feel) */}
              <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Kumbalgodu Works</span>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-[11px] text-slate-600">GSTIN: {companyDetails.gstin}</span>
              </div>
            </div>

            {/* Center: Clean Segmented Navigation */}
            <nav className="hidden md:flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-600">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right: Search, Cart, WhatsApp */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Minimal Search Input */}
              <form onSubmit={handleSearchSubmit} className="relative w-44 md:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search catalogue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </form>

              {/* Inquiry Cart Pill */}
              <button
                type="button"
                onClick={onOpenQuoteDrawer}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                title="View wholesale quote list"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-brand-primary" />
                <span className="hidden lg:inline font-semibold">Quote Cart</span>
                {quoteListCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {quoteListCount}
                  </span>
                )}
              </button>

              {/* Direct WhatsApp Callout */}
              <a
                href={companyDetails.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sales Desk</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={onOpenQuoteDrawer}
                className="relative p-2 rounded-lg bg-slate-100 text-slate-800 text-xs"
              >
                <ShoppingBag className="w-4 h-4 text-brand-primary" />
                {quoteListCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center">
                    {quoteListCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search models, chairs, tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 outline-none"
              />
            </form>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-[11px] text-slate-500 font-mono px-3">
                GSTIN: {companyDetails.gstin}
              </div>
              <a
                href={`tel:${companyDetails.phoneRaw}`}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Call Factory: {companyDetails.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
