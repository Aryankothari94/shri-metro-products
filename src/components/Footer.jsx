import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  ArrowUp, 
  ExternalLink, 
  BookOpen, 
  Lock 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Logo from './Logo';

export default function Footer({ 
  onSelectCategory, 
  onOpenCatalogueBook, 
  onNavigateAdmin, 
  onNavigateAbout,
  onNavigateCatalog,
  onNavigateQuality,
  onNavigateContact
}) {
  const { company, categories } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    if (id === 'catalog-section' && onNavigateCatalog) {
      onNavigateCatalog();
      return;
    }
    if (id === 'why-us' && onNavigateQuality) {
      onNavigateQuality();
      return;
    }
    if (id === 'contact-section' && onNavigateContact) {
      onNavigateContact();
      return;
    }
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

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs font-sans border-t border-slate-900 relative">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Brand & Brief Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="horizontal" theme="dark" iconSize="w-9 h-9" subtitle="Plastic Moulded Furniture" />
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Bangalore-based manufacturer of high-quality moulded plastic furniture, proudly serving the industry since 2012 with a manufacturing capacity of 2,000+ pieces per day across South India.
            </p>

            {/* Minimalist Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Since 2012
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                2,000+ Pcs/Day
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                100% Virgin PP
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium italic pt-1">
              “Quality you can rely on. Service you can trust.”
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    if (onNavigateAbout) onNavigateAbout();
                    else scrollToSection('about-section');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollToSection('catalog-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Product Catalog
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    if (onOpenCatalogueBook) onOpenCatalogueBook();
                    else scrollToSection('catalog-section');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-red-400 font-semibold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Digital Catalogue</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollToSection('why-us')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Quality & Testing
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollToSection('contact-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Factory
                </button>
              </li>
            </ul>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider">
              Categories
            </p>
            <ul className="space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id || cat.name}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-white transition-colors cursor-pointer text-left truncate max-w-full"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Factory Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider">
              Factory Works
            </p>
            <div className="space-y-2.5 text-slate-400">
              <p className="leading-snug text-slate-300">
                {company.location?.estate}, {company.location?.area}, {company.location?.city} - {company.location?.pincode}
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a 
                  href={`tel:${company.phoneRaw}`} 
                  className="inline-flex items-center gap-2 text-white hover:text-red-400 transition-colors font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{company.phone}</span>
                </a>
                <a 
                  href={company.whatsappLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp Factory Desk</span>
                </a>
                <a 
                  href={company.location?.googleMapsUrl}
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[11px]"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Kumbalgodu Works on Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Minimalist Bottom Strip */}
      <div className="border-t border-slate-900 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            
            {/* Left: Copyright & GSTIN */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
              <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="font-mono text-slate-400">GSTIN: {company.gstin}</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="text-slate-400">HSN: 9403</span>
            </div>

            {/* Right: Admin Link & Smooth Scroll to Top */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                title="Open Administrative Console"
              >
                <Lock className="w-3 h-3 text-amber-500/70" />
                <span>Admin</span>
              </button>
              <span className="text-slate-800">•</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold group"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
