import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Plus, 
  Search,
  Bell,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminInquiries from './AdminInquiries';
import AdminSettings from './AdminSettings';
import ProductModalForm from './ProductModalForm';

export default function AdminLayout({ onGoHome }) {
  const { products, categories, inquiries, company, logout, addProduct } = useData();
  
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'categories' | 'inquiries' | 'settings'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickProductModalOpen, setQuickProductModalOpen] = useState(false);

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Product Inventory', icon: Package, badge: products.length },
    { id: 'categories', label: 'Categories Engine', icon: Layers, badge: categories.length },
    { id: 'inquiries', label: 'Wholesale Inquiries', icon: MessageSquare, badge: newInquiriesCount > 0 ? newInquiriesCount : null, badgeColor: 'bg-red-500' },
    { id: 'settings', label: 'Factory Settings', icon: Settings }
  ];

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleQuickAddProduct = (productData) => {
    addProduct(productData);
    setActiveTab('products');
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex font-sans selection:bg-amber-500 selection:text-slate-900">
      
      {/* 1. Desktop Collapsible Sidebar */}
      <aside className={`hidden md:flex flex-col bg-[#0F172A] border-r border-slate-800/90 transition-all duration-300 relative z-30 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white font-black text-sm tracking-tight shadow-md shadow-red-900/30 shrink-0">
              SM
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm tracking-tight text-white truncate">
                  SHRI METRO
                </span>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest truncate">
                  Admin Console
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabSelect(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600/20 via-amber-500/15 to-transparent text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                {!sidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge !== undefined && item.badge !== null && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Public site & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            type="button"
            onClick={onGoHome}
            title={sidebarCollapsed ? 'Go to Public Site' : undefined}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            {!sidebarCollapsed && <span className="truncate">Public Website</span>}
          </button>

          <button
            type="button"
            onClick={logout}
            title={sidebarCollapsed ? 'Sign Out' : undefined}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span className="truncate">Logout Terminal</span>}
          </button>

          {!sidebarCollapsed && (
            <div className="pt-2 border-t border-slate-800/80 px-2 text-[10px] text-slate-500">
              <p className="truncate font-semibold text-slate-400">{company.proprietor}</p>
              <p className="font-mono text-slate-500">Kumbalgodu Works</p>
            </div>
          )}
        </div>

      </aside>

      {/* 2. Main Terminal Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-20">
          
          {/* Left: Mobile hamburger & breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-slate-400 hidden sm:inline">Admin</span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="text-amber-400 font-extrabold capitalize">
                {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right: Quick actions & Profile */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuickProductModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Product</span>
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Site</span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
                RJ
              </div>
              <div className="hidden lg:block text-left text-[11px]">
                <p className="font-bold text-white leading-none">{company.proprietor}</p>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Admin Authorized</p>
              </div>
            </div>
          </div>

        </header>

        {/* 3. Main View Render */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'overview' && (
            <AdminOverview
              onNavigateTab={setActiveTab}
              onOpenAddProduct={() => setQuickProductModalOpen(true)}
              onOpenAddCategory={() => setActiveTab('categories')}
              onGoHome={onGoHome}
            />
          )}

          {activeTab === 'products' && <AdminProducts />}

          {activeTab === 'categories' && <AdminCategories />}

          {activeTab === 'inquiries' && <AdminInquiries />}

          {activeTab === 'settings' && <AdminSettings />}
        </main>

      </div>

      {/* 4. Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 bg-[#0F172A] border-r border-slate-800 h-full p-4 flex flex-col justify-between animate-fadeIn">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-xs">
                    SM
                  </div>
                  <span className="font-extrabold text-sm text-white">SHRI METRO</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabSelect(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge !== undefined && item.badge !== null && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                type="button"
                onClick={onGoHome}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Public Site</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/40"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Global Quick Add Product Modal */}
      <ProductModalForm
        isOpen={quickProductModalOpen}
        onClose={() => setQuickProductModalOpen(false)}
        productToEdit={null}
        onSave={handleQuickAddProduct}
      />

    </div>
  );
}
