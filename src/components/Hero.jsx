import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Layers, 
  Award, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function Hero({ onExploreCatalog, onSwitchToTable }) {
  return (
    <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Operational Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-6 mb-8 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-900">Direct Factory Manufacturing Unit</span>
            <span className="text-slate-300">•</span>
            <span>Kumbalgodu, Bangalore - 560074</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px] font-mono">
            <span>GSTIN: <strong className="text-slate-800">{companyDetails.gstin}</strong></span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">Proprietor: <strong className="text-slate-800">{companyDetails.proprietor}</strong></span>
          </div>
        </div>

        {/* Dashboard Title & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Clean Executive Title & Description */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-brand-primary" />
              <span>B2B Commercial & Institutional Catalogue</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Precision Moulded Plastic Furniture.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Manufactured using <strong className="text-slate-900 font-semibold">100% Virgin Polypropylene</strong> with <strong className="text-slate-900 font-semibold">200 kg load tolerance</strong>. Direct factory supply for event caterers, banquet halls, restaurants, schools, and wholesale dealers across Karnataka.
            </p>

            {/* Clean Dashboard Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onSwitchToTable || onExploreCatalog}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-brand-primary" />
                <span>Wholesale Spec Table</span>
              </button>

              <a
                href={companyDetails.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: +91 9845287888</span>
              </a>
            </div>
          </div>

          {/* Right: Quick Plant Highlights Strip */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Factory Benchmark</span>
              <span className="text-emerald-700 font-bold text-[11px] bg-emerald-100/60 px-2 py-0.5 rounded">ISO Virgin PP</span>
            </div>
            
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Moulding Technology</span>
                <span className="font-semibold text-slate-800">High-Pressure Injection</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Polymer Density</span>
                <span className="font-semibold text-slate-800">Zero Recycled Fillers</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Dispatch Location</span>
                <span className="font-semibold text-slate-800">Kumbalgodu, Bangalore</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Minimum Order</span>
                <span className="font-semibold text-brand-primary">25 Units Wholesale</span>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Dashboard KPI Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tested Load</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">200 kg</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Hydraulic static tolerance</p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Material Grade</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">100% Virgin</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Polypropylene granules</p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Dies</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">10+ Models</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Chairs, tables, stools, patlas</p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Invoicing</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">B2B GST</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Direct Input Tax Credit (ITC)</p>
          </div>

        </div>

      </div>
    </section>
  );
}
