import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailPage from './components/ProductDetailPage';
import CatalogueBookPage from './components/CatalogueBookPage';
import WhyChooseUs from './components/WhyChooseUs';
import ContactPage from './components/ContactPage';
import BulkQuoteDrawer from './components/BulkQuoteDrawer';
import FloatingInquiryButton from './components/FloatingInquiryButton';
import Footer from './components/Footer';
import { useData } from './context/DataContext';
import { useRouter } from './hooks/useRouter';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';

export default function App() {
  const { isAuthenticated, activeProducts } = useData();
  const { isAdmin, isLogin, navigate } = useRouter();

  const [isCatalogueBookOpen, setIsCatalogueBookOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductForPDP, setSelectedProductForPDP] = useState(null);
  const [quoteList, setQuoteList] = useState([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [prefilledInquiryMessage, setPrefilledInquiryMessage] = useState("");
  const [catalogViewMode, setCatalogViewMode] = useState('grid'); // 'grid' | 'table'

  // Synchronize URL to /admin when authenticated on /admin/login
  React.useEffect(() => {
    if (isLogin && isAuthenticated) {
      navigate('/admin');
    }
  }, [isLogin, isAuthenticated, navigate]);

  // Synchronize browser/hardware back button with in-app views
  React.useEffect(() => {
    const handlePopState = () => {
      if (isQuoteDrawerOpen) {
        setIsQuoteDrawerOpen(false);
        return;
      }
      if (selectedProductForPDP) {
        setSelectedProductForPDP(null);
        return;
      }
      if (isCatalogueBookOpen) {
        setIsCatalogueBookOpen(false);
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isQuoteDrawerOpen, selectedProductForPDP, isCatalogueBookOpen]);

  // ADMIN PORTAL & AUTHENTICATION ROUTES
  if (isAdmin || isLogin) {
    if (!isAuthenticated) {
      return (
        <AdminLogin 
          onLoginSuccess={() => navigate('/admin')} 
          onGoHome={() => navigate('/')} 
        />
      );
    }
    return (
      <AdminLayout 
        onGoHome={() => navigate('/')} 
      />
    );
  }

  // ROUTE 3: Public Website
  const handleOpenCatalogueBook = () => {
    setSelectedProductForPDP(null);
    setIsCatalogueBookOpen(true);
    try {
      window.history.pushState({ view: 'catalogue' }, '', '#catalogue');
    } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setIsCatalogueBookOpen(false);
    setSelectedProductForPDP(null);
    if (window.location.hash === '#catalogue') {
      window.history.back();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCatalog = () => {
    setSelectedProductForPDP(null);
    setCatalogViewMode('grid');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSwitchToTable = () => {
    setSelectedProductForPDP(null);
    setCatalogViewMode('table');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedProductForPDP(null);
    setSelectedCategory(category);
  };

  const handleOpenPDP = (product) => {
    setSelectedProductForPDP(product);
    try {
      window.history.pushState({ view: 'pdp', productId: product.id }, '', `#product-${product.modelCode || product.id}`);
    } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPDP = () => {
    setSelectedProductForPDP(null);
    if (window.location.hash.startsWith('#product-')) {
      window.history.back();
    }
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog-section');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigateContact = () => {
    setSelectedProductForPDP(null);
    setTimeout(() => {
      const contactElement = document.getElementById('contact-section');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleLogoClick = () => {
    setSelectedProductForPDP(null);
    setIsCatalogueBookOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bulk Quote List Handlers
  const handleAddToQuoteList = (item) => {
    setQuoteList(prev => {
      const existingIdx = prev.findIndex(i => i.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    setIsQuoteDrawerOpen(true);
  };

  const handleUpdateQuoteQuantity = (id, newQty) => {
    setQuoteList(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveQuoteItem = (id) => {
    setQuoteList(prev => prev.filter(item => item.id !== id));
  };

  const handleClearQuoteList = () => {
    setQuoteList([]);
  };

  const handleTransferToContactForm = (messageSummary) => {
    setPrefilledInquiryMessage(messageSummary);
    handleNavigateContact();
  };

  const totalQuoteUnits = quoteList.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white antialiased">
      {/* 1. Sleek Dashboard Header Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectCategory}
        quoteListCount={quoteList.length}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onNavigateContact={handleNavigateContact}
        onLogoClick={handleLogoClick}
        onSwitchView={setCatalogViewMode}
        onOpenCatalogueBook={handleOpenCatalogueBook}
      />

      {/* Conditional: Either show full Product Detail Page (PDP), Full Catalogue Lookbook, OR the Clean Dashboard */}
      {selectedProductForPDP ? (
        <ProductDetailPage
          product={activeProducts.find(p => p.id === selectedProductForPDP?.id) || selectedProductForPDP}
          onBack={handleBackFromPDP}
          onAddToQuoteList={handleAddToQuoteList}
        />
      ) : isCatalogueBookOpen ? (
        <CatalogueBookPage
          onBackToDashboard={handleBackToDashboard}
          onAddToQuoteList={handleAddToQuoteList}
        />
      ) : (
        <>
          {/* 2. Executive Dashboard Overview & KPIs */}
          <Hero 
            onExploreCatalog={handleExploreCatalog}
            onSwitchToTable={handleSwitchToTable}
            onOpenCatalogueBook={handleOpenCatalogueBook}
          />

          {/* 3. Product Catalog Workbench (PLP) with Clean Dual Views & Filters */}
          <ProductCatalog
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProductForPDP={handleOpenPDP}
            externalViewMode={catalogViewMode}
          />

          {/* 5. Clean Quality & Technical Standards Benchmark */}
          <WhyChooseUs />

          {/* 6. Comprehensive Factory Location, Route Map & Interactive Inquiry Form */}
          <ContactPage prefilledMessage={prefilledInquiryMessage} />
        </>
      )}

      {/* 7. Minimal Clean Footer with Admin Portal Access */}
      <Footer 
        onSelectCategory={handleSelectCategory} 
        onOpenCatalogueBook={handleOpenCatalogueBook}
        onNavigateAdmin={() => navigate('/admin')}
      />

      {/* 8. Floating Inquiry Cart Button */}
      <FloatingInquiryButton
        itemCount={quoteList.length}
        totalUnits={totalQuoteUnits}
        onClick={() => setIsQuoteDrawerOpen(true)}
      />

      {/* 9. Wholesale Quote List Drawer */}
      <BulkQuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteList}
        onUpdateQuantity={handleUpdateQuoteQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearAll={handleClearQuoteList}
        onNavigateToContactForm={handleTransferToContactForm}
      />
    </div>
  );
}
