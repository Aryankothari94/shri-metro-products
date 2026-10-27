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
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminInquiries from './AdminInquiries';
import ProductModalForm from './ProductModalForm';
import Logo, { LogoIcon } from '../Logo';
import useSwipeGesture from '../../hooks/useSwipeGesture';
import GestureBackIndicator from '../common/GestureBackIndicator';

export default function AdminLayout({ onGoHome }) {
  const { products, categories, inquiries, company, logout, addProduct } = useData();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickProductModalOpen, setQuickProductModalOpen] = useState(false);

  // Edge swipe to go back (from modals -> subtabs -> overview -> public website)
  const handleEdgeBack = () => {
    if (quickProductModalOpen) {
      setQuickProductModalOpen(false);
      return;
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      return;
    }
    if (activeTab !== 'overview') {
      setActiveTab('overview');
      return;
    }
    if (onGoHome) {
      onGoHome();
    }
  };

  const { gestureState, touchHandlers } = useSwipeGesture({
    onSwipeRight: handleEdgeBack,
    edgeOnly: true,
    edgeWidth: 65,
    threshold: 50,
  });

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Product Inventory', icon: Package, badge: products.length },
    { id: 'categories', label: 'Mould Categories', icon: Layers, badge: categories.length },
    { 
      id: 'inquiries', 
      label: 'Wholesale Leads', 
      icon: MessageSquare, 
      badge: pendingInquiriesCount > 0 ? pendingInquiriesCount : null,
      badgeColor: 'bg-red-600 text-white' 
    },
    { id: 'settings', label: 'Factory Profile', icon: Settings },
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
    <div 
      className="min-h-screen bg-[#F5F6F8] text-[#111827] flex font-sans selection:bg-[#A30D20] selection:text-white relative"
      {...touchHandlers}
    >
      {/* Edge Swipe Back Feedback */}
      <GestureBackIndicator 
        gestureState={gestureState} 
        label={activeTab !== 'overview' ? 'Overview' : 'Website'} 
      />
      
      {/* 1. Desktop Collapsible Sidebar (Deep Navy #111827 with Burgundy Red #A30D20 Active Items) */}
      <aside className={`hidden md:flex flex-col bg-[#111827] border-r border-[#1F2937] transition-all duration-300 relative z-30 shadow-md ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1F2937]">
          <div className="flex items-center gap-3 overflow-hidden">
            <LogoIcon className="w-9 h-9 shrink-0 shadow-xs" />
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm tracking-tight text-white truncate">
                  SHRI METRO
                </span>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest truncate">
                  Admin Console
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
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
                    ? 'bg-[#A30D20] text-white shadow-sm shadow-[#A30D20]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!sidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge !== undefined && item.badge !== null && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Public site & Logout */}
        <div className="p-3 border-t border-[#1F2937] space-y-2">
          <button
            type="button"
            onClick={onGoHome}
            title={sidebarCollapsed ? 'Go to Public Site' : undefined}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            {!sidebarCollapsed && <span className="truncate">Public Website</span>}
          </button>

          <button
            type="button"
            onClick={logout}
            title={sidebarCollapsed ? 'Sign Out' : undefined}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span className="truncate">Logout Terminal</span>}
          </button>

          {!sidebarCollapsed && (
            <div className="pt-2 border-t border-[#1F2937] px-2 text-[10px] text-slate-400">
              <p className="truncate font-semibold text-slate-300">{company.proprietor}</p>
              <p className="font-mono text-slate-500">Kumbalgodu Works</p>
            </div>
          )}
        </div>

      </aside>

      {/* 2. Main Terminal Content Area (Cool Light Gray #F5F6F8) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F5F6F8]">
        
        {/* Top Header Bar (Pure White with Soft Gray #E5E7EB border) */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          
          {/* Left: Mobile hamburger & breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-[#111827] hover:bg-slate-100 cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-[#64748B] hidden sm:inline">Admin</span>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="text-[#111827] font-extrabold capitalize">
                {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right: Quick actions & Profile */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuickProductModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Add Product</span>
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#111827] border border-[#E5E7EB] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="hidden sm:inline">Public Site</span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#E5E7EB]">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center font-bold text-xs text-[#A30D20]">
                RJ
              </div>
              <div className="hidden lg:block text-left text-[11px]">
                <p className="font-bold text-[#111827] leading-none">{company.proprietor}</p>
                <p className="text-[10px] text-[#15803D] font-semibold mt-0.5">Admin Authorized</p>
              </div>
            </div>
          </div>

        </header>

        {/* 3. Main View Render */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#F5F6F8]">
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

      {/* 4. Mobile Drawer Overlay (Deep Navy #111827) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex">
          <div className="w-72 bg-[#111827] border-r border-[#1F2937] text-white h-full p-4 flex flex-col justify-between animate-fadeIn shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]">
                <div className="flex items-center gap-2.5">
                  <LogoIcon className="w-8 h-8" />
                  <span className="font-extrabold text-sm text-white">SHRI METRO</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1.5">
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
                          ? 'bg-[#A30D20] text-white shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge !== undefined && item.badge !== null && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F2937] space-y-2">
              <button
                type="button"
                onClick={onGoHome}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>Visit Public Site</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10"
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
