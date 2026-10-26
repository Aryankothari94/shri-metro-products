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
        
        {/* Dashboard Title & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Clean Executive Title & Description */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200/80 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-red-600" />
              <span>Direct Factory Wholesale Pricing • Bangalore</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Precision Moulded <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-600">Plastic Furniture.</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Manufactured using <strong className="text-slate-900 font-semibold">100% Virgin Polypropylene</strong> with <strong className="text-red-600 font-semibold">200 kg load tolerance</strong>. Direct factory supply for event caterers, banquet halls, restaurants, schools, and wholesale dealers across Karnataka.
            </p>

            {/* Clean Single Primary Action (No redundant duplicate buttons) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shadow-red-500/25 hover:shadow-md hover:shadow-red-500/30 cursor-pointer active:scale-95"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Quick Plant Highlights Strip */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600"></div>
            
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Factory Benchmark</span>
              <span className="text-red-700 font-bold text-[11px] bg-red-50 border border-red-200/70 px-2.5 py-0.5 rounded-full">ISO Virgin PP</span>
            </div>
            
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Moulding Technology</span>
                <span className="font-semibold text-slate-900">High-Pressure Injection</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Polymer Density</span>
                <span className="font-semibold text-slate-900">Zero Recycled Fillers</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Dispatch Location</span>
                <span className="font-semibold text-slate-900">Kumbalgodu, Bangalore</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500">Minimum Order</span>
                <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200/60">25 Units Wholesale</span>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Dashboard KPI Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-200 hover:shadow-xs transition-all group">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Tested Load</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">200 kg</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Hydraulic static tolerance</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-200 hover:shadow-xs transition-all group">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Material Grade</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">100% Virgin</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Polypropylene granules</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-200 hover:shadow-xs transition-all group">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Active Dies</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">10+ Models</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Chairs, tables, stools, patlas</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-200 hover:shadow-xs transition-all group">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Invoicing</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">B2B GST</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Direct Input Tax Credit (ITC)</p>
          </div>

        </div>

      </div>
    </section>
  );
}
