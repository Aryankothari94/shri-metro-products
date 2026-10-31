import React, { useState } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  ShoppingBag, 
  ChevronRight
} from 'lucide-react';
import { useData } from '../context/DataContext';

import Logo from './Logo';

export default function Navbar({ 
  quoteListCount = 0,
  onOpenQuoteDrawer,
  onNavigateContact,
  onNavigateAbout,
  onNavigateQuality,
  onNavigateCatalog,
  onLogoClick,
  onOpenCatalogueBook
}) {
  const { company: companyDetails } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About Us", id: "about-section", isAbout: true },
    { label: "Catalogue", id: "catalog-section", isCatalogue: true },
    { label: "Quality & Testing", id: "why-us", isQuality: true },
    { label: "Contact Factory", id: "contact-section", isContact: true }
  ];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    if (item.isAbout) {
      if (onNavigateAbout) onNavigateAbout();
      return;
    }
    if (item.isCatalogue && onOpenCatalogueBook) {
      onOpenCatalogueBook();
      return;
    }
    if (item.isQuality) {
      if (onNavigateQuality) {
        onNavigateQuality();
        return;
      }
    }
    if (item.isContact) {
      if (onNavigateContact) {
        onNavigateContact();
        return;
      }
    }
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Clean Brand Logo & Name */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onLogoClick) onLogoClick();
            }}
            className="flex items-center group cursor-pointer"
          >
            <Logo variant="horizontal" iconSize="w-9 h-9" />
          </a>

          {/* Center: Minimalist, Airy Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-red-600 transition-colors cursor-pointer py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Classy Minimal Quote Cart Action */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={onOpenQuoteDrawer}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              title="View wholesale quote list"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-red-400" />
              <span>Quote Cart</span>
              {quoteListCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-xs">
                  {quoteListCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenQuoteDrawer}
              className="relative p-2 rounded-lg bg-red-50 text-slate-800 text-xs border border-red-100 cursor-pointer"
              aria-label="Open Quote Cart"
            >
              <ShoppingBag className="w-4 h-4 text-red-600" />
              {quoteListCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {quoteListCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Clean Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:text-red-600 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href={`tel:${companyDetails.phoneRaw}`}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Call Factory: {companyDetails.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
