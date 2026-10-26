import React from 'react';
import { 
  Package, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  Plus, 
  ExternalLink, 
  ArrowUpRight, 
  ShieldCheck, 
  Award, 
  TrendingUp,
  Clock,
  ChevronRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminOverview({ onNavigateTab, onOpenAddProduct, onOpenAddCategory, onGoHome }) {
  const { products, categories, inquiries, company } = useData();

  const activeProducts = products.filter(p => p.isActive !== false);
  const hiddenProducts = products.filter(p => p.isActive === false);
  const featuredProducts = products.filter(p => p.isFeatured && p.isActive !== false);
  const newInquiries = inquiries.filter(i => i.status === 'New');

  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      
      {/* 1. Welcome Banner & Quick Action Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Plant Operational • Kumbalgodu Unit Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome, {company.proprietor}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Manage your commercial plastic moulded catalog, adjust load capacities, review incoming wholesale inquiries, and sync factory specs across the public portal in real-time.
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAddProduct}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add New Product</span>
            </button>

            <button
              type="button"
              onClick={onOpenAddCategory}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>+ Add Category</span>
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
              title="Open public website in client view"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Go to Public Website</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Products */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-400 transition-colors">
              Active Products
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 tracking-tight">
            {activeProducts.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
            <span>{hiddenProducts.length} hidden from site</span>
            <span className="text-amber-400 font-semibold flex items-center gap-0.5">
              <span>View Table</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 2: Total Categories */}
        <div 
          onClick={() => onNavigateTab('categories')}
          className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-400 transition-colors">
              Mould Categories
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 tracking-tight">
            {categories.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
            <span>Synced to Navbar</span>
            <span className="text-amber-400 font-semibold flex items-center gap-0.5">
              <span>Manage</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 3: Featured Flagship Items */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-400 transition-colors">
              Featured Flagships
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 tracking-tight">
            {featuredProducts.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
            <span>Live on Homepage Hero</span>
            <span className="text-amber-400 font-semibold flex items-center gap-0.5">
              <span>Edit</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 4: Total Inquiries */}
        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-400 transition-colors">
              Wholesale Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 tracking-tight">
            {inquiries.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
            <span className="text-emerald-400 font-semibold">{newInquiries.length} New Unread</span>
            <span className="text-amber-400 font-semibold flex items-center gap-0.5">
              <span>View Log</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>

      {/* 3. Split Grid: Recent Inquiries + Featured Products Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Inquiries (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Recent Wholesale Inquiries</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab('inquiries')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                View All ({inquiries.length}) →
              </button>
            </div>

            <div className="divide-y divide-slate-800/80 mt-2">
              {inquiries.slice(0, 4).map(inq => (
                <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-bold text-white text-xs truncate">
                      {inq.customerName}
                      {inq.businessName && <span className="text-slate-400 font-normal"> • {inq.businessName}</span>}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {inq.productName} ({inq.quantity ? `${inq.quantity} units` : 'Wholesale inquiry'})
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      inq.status === 'New' ? 'bg-red-950/60 border-red-500/40 text-red-300' :
                      inq.status === 'In Progress' ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' :
                      inq.status === 'Quoted' ? 'bg-blue-950/60 border-blue-500/40 text-blue-300' :
                      'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    }`}>
                      {inq.status}
                    </span>
                    <a
                      href={`tel:${inq.phone}`}
                      className="text-xs font-mono font-bold text-slate-300 hover:text-white"
                    >
                      {inq.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
            Click any customer number to trigger call or WhatsApp followup.
          </div>
        </div>

        {/* Top Flagship Showcase (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Homepage Flagship Items</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab('products')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                Catalog →
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {featuredProducts.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-slate-900 p-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-amber-400 font-mono">{p.modelCode} • {p.loadCapacityKg}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-500/40">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>GSTIN: <strong className="text-white font-mono">{company.gstin}</strong></span>
            <span>Unit: Kumbalgodu</span>
          </div>
        </div>

      </div>

    </div>
  );
}
