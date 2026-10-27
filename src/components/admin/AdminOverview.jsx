import React from 'react';
import { 
  Package, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  Plus, 
  ExternalLink, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminOverview({ onNavigateTab, onOpenAddProduct, onOpenAddCategory, onGoHome }) {
  const { products, categories, inquiries, company } = useData();

  const activeProducts = products.filter(p => p.isActive !== false);
  const hiddenProducts = products.filter(p => p.isActive === false);
  const featuredProducts = products.filter(p => p.isFeatured && p.isActive !== false);
  const newInquiries = inquiries.filter(i => i.status === 'New');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn font-sans">
      
      {/* 1. Welcome Banner & Quick Action Bar (Pure White with Burgundy Red #A30D20 Accents) */}
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle Burgundy Red Glow Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#A30D20]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#A30D20] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#A30D20] animate-pulse" />
              <span>Plant Operational • Kumbalgodu Unit Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
              Welcome, {company.proprietor}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Manage your commercial plastic moulded catalog, review incoming wholesale procurement leads, and sync factory specs across the public portal in real-time.
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAddProduct}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add New Product</span>
            </button>

            <button
              type="button"
              onClick={onOpenAddCategory}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F5F6F8] text-[#111827] border border-[#E5E7EB] font-bold text-xs transition-all cursor-pointer shadow-2xs"
            >
              <Layers className="w-4 h-4 text-[#64748B]" />
              <span>+ Add Category</span>
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F5F6F8] text-[#111827] border border-[#E5E7EB] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Open public website in client view"
            >
              <ExternalLink className="w-4 h-4 text-[#64748B]" />
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
          className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-xs hover:border-[#A30D20]/40 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#A30D20] transition-colors">
              Active Products
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#A30D20] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#111827] mt-2 tracking-tight">
            {activeProducts.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 pt-2 border-t border-[#E5E7EB]">
            <span>{hiddenProducts.length} hidden from site</span>
            <span className="text-[#A30D20] font-bold flex items-center gap-0.5">
              <span>View Table</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 2: Total Categories */}
        <div 
          onClick={() => onNavigateTab('categories')}
          className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-xs hover:border-[#A30D20]/40 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#A30D20] transition-colors">
              Mould Categories
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#111827] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#111827] mt-2 tracking-tight">
            {categories.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 pt-2 border-t border-[#E5E7EB]">
            <span>Synced to Navbar</span>
            <span className="text-[#A30D20] font-bold flex items-center gap-0.5">
              <span>Manage</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 3: Featured Flagship Items */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-xs hover:border-[#A30D20]/40 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#A30D20] transition-colors">
              Featured Flagships
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#A30D20] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#111827] mt-2 tracking-tight">
            {featuredProducts.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 pt-2 border-t border-[#E5E7EB]">
            <span>Live on Homepage Hero</span>
            <span className="text-[#A30D20] font-bold flex items-center gap-0.5">
              <span>Edit</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 4: Total Inquiries */}
        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-xs hover:border-[#A30D20]/40 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#A30D20] transition-colors">
              Wholesale Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#A30D20] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#111827] mt-2 tracking-tight">
            {inquiries.length}
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 pt-2 border-t border-[#E5E7EB]">
            <span className="text-[#A30D20] font-bold">{newInquiries.length} New Unread</span>
            <span className="text-[#A30D20] font-bold flex items-center gap-0.5">
              <span>View Log</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>

      {/* 3. Split Grid: Recent Inquiries + Featured Products Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Inquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-sm font-black text-[#111827] tracking-tight flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A30D20]" />
                <span>Recent Wholesale Inquiries</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab('inquiries')}
                className="text-xs font-bold text-[#A30D20] hover:text-[#880A1A] cursor-pointer"
              >
                View All ({inquiries.length}) →
              </button>
            </div>

            <div className="divide-y divide-[#E5E7EB] mt-2">
              {inquiries.slice(0, 4).map(inq => (
                <div key={inq.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <div className="min-w-0">
                    <p className="font-bold text-[#111827] text-xs truncate">
                      {inq.customerName}
                      {inq.businessName && <span className="text-[#64748B] font-normal"> • {inq.businessName}</span>}
                    </p>
                    <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                      {inq.productName} ({inq.quantity ? `${inq.quantity} units` : 'Wholesale inquiry'})
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      inq.status === 'New' ? 'bg-red-50 border-red-200 text-[#A30D20]' :
                      inq.status === 'In Progress' ? 'bg-amber-50 border-amber-200 text-[#B45309]' :
                      inq.status === 'Quoted' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                      'bg-emerald-50 border-emerald-200 text-[#15803D]'
                    }`}>
                      {inq.status}
                    </span>
                    <a
                      href={`tel:${inq.phone}`}
                      className="text-xs font-mono font-bold text-[#111827] hover:text-[#A30D20]"
                    >
                      {inq.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] text-[11px] text-[#64748B]">
            Click any customer number to trigger call or WhatsApp followup.
          </div>
        </div>

        {/* Top Flagship Showcase (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-sm font-black text-[#111827] tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A30D20]" />
                <span>Homepage Flagship Items</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab('products')}
                className="text-xs font-bold text-[#A30D20] hover:text-[#880A1A] cursor-pointer"
              >
                Catalog →
              </button>
            </div>

            <div className="space-y-2.5 mt-3">
              {featuredProducts.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F5F6F8] border border-[#E5E7EB]">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] p-1 flex items-center justify-center shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#111827] truncate">{p.name}</p>
                    <p className="text-[10px] text-[#A30D20] font-mono font-semibold">{p.modelCode} • {p.loadCapacityKg}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#15803D] font-bold border border-emerald-200">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#64748B]">
            <span>GSTIN: <strong className="text-[#111827] font-mono">{company.gstin}</strong></span>
            <span>Unit: Kumbalgodu</span>
          </div>
        </div>

      </div>

    </div>
  );
}
