import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Layers, 
  Award, 
  Truck, 
  CheckCircle,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function Hero({ onExploreCatalog }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-brand-dark to-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* Background Decorative Grid & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E40AF_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Subtext, Badges & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-blue-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bangalore's Premier Moulded Furniture Manufacturer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Moulded for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Extreme Strength.</span><br />
              <span className="text-slate-100">Engineered for Modern Spaces.</span>
            </h1>

            {/* Subtext highlighting key pillars */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Crafted from <strong className="text-white font-semibold">100% Virgin Polypropylene</strong> with <strong className="text-amber-300 font-semibold">200 kg heavy load testing</strong>. Direct factory wholesale supply for event caterers, banquet halls, restaurants, institutions, and home spaces across Karnataka.
            </p>

            {/* Key Value Prop Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">100% Virgin Plastic</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <Award className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Heavy Load Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 col-span-2 sm:col-span-1">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Direct Factory Rates</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-blue-600 hover:from-blue-700 hover:to-brand-primary text-white font-bold text-sm shadow-lg shadow-blue-700/30 transition-all hover:shadow-blue-700/50 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={companyDetails.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                Direct Owner Dispatch: <strong>{companyDetails.proprietor}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                Kumbalgodu Industrial Hub
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                GST Compliant Invoicing
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-brand-primary/30 to-purple-500/10 rounded-3xl blur-2xl transform rotate-2"></div>
              
              {/* Main Product Feature Frame */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-4 shadow-2xl backdrop-blur-md overflow-hidden">
                
                {/* Image Container with high quality hero furniture */}
                <div className="relative h-72 sm:h-84 rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=900&q=85"
                    alt="Shri Metro Products Moulded Furniture"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Badges on image */}
                  <div className="absolute top-3 left-3 bg-brand-dark/85 backdrop-blur-md border border-slate-700 text-white text-[11px] font-mono px-2.5 py-1 rounded-md shadow-md">
                    MODEL: SMP-CHR-901A
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> BESTSELLER
                  </div>

                  {/* Caption on image bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Flagship Product</p>
                    <h3 className="text-lg font-bold">Metro Royal Elegance Armchair</h3>
                  </div>
                </div>

                {/* Spec Summary Strip */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50">
                    <p className="text-[10px] text-slate-400">TESTED LOAD</p>
                    <p className="font-extrabold text-amber-400 text-sm mt-0.5">200 kg</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50">
                    <p className="text-[10px] text-slate-400">MATERIAL</p>
                    <p className="font-extrabold text-blue-300 text-sm mt-0.5">100% Virgin PP</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50">
                    <p className="text-[10px] text-slate-400">STACK CAPACITY</p>
                    <p className="font-extrabold text-emerald-400 text-sm mt-0.5">Up to 8 Units</p>
                  </div>
                </div>

                {/* Floating factory assurance pill */}
                <div className="mt-3 py-2 px-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-between text-xs">
                  <span className="text-slate-300">Minimum Order Quantity (MOQ):</span>
                  <span className="font-bold text-amber-400">25 Units for Bulk Rate</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
