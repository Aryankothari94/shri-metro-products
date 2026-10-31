import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailPage from './components/ProductDetailPage';
import CatalogueBookPage from './components/CatalogueBookPage';
import AboutUsPage from './components/AboutUsPage';
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
  const [isAboutPageOpen, setIsAboutPageOpen] = useState(false);
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
      if (isAboutPageOpen) {
        setIsAboutPageOpen(false);
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isQuoteDrawerOpen, selectedProductForPDP, isCatalogueBookOpen, isAboutPageOpen]);

  // Synchronize hash / path navigation for #about and /about
  React.useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      const path = (window.location.pathname || '').toLowerCase();
      if (hash === '#about' || path === '/about') {
        setSelectedProductForPDP(null);
        setIsCatalogueBookOpen(false);
        setIsAboutPageOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

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
    setIsAboutPageOpen(false);
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

  const handleOpenAboutPage = () => {
    setSelectedProductForPDP(null);
    setIsCatalogueBookOpen(false);
    setIsAboutPageOpen(true);
    try {
      window.history.pushState({ view: 'about' }, '', '#about');
    } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromAbout = () => {
    setIsAboutPageOpen(false);
    if (window.location.hash === '#about') {
      window.history.back();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCatalogFromAbout = () => {
    setIsAboutPageOpen(false);
    handleExploreCatalog();
  };

  const handleNavigateContactFromAbout = () => {
    setIsAboutPageOpen(false);
    handleNavigateContact();
  };

  const handleOpenCatalogueBookFromAbout = () => {
    setIsAboutPageOpen(false);
    handleOpenCatalogueBook();
  };

  const handleExploreCatalog = () => {
    setSelectedProductForPDP(null);
    setIsAboutPageOpen(false);
    setIsCatalogueBookOpen(false);
    setCatalogViewMode('grid');
    if (window.location.hash === '#about' || window.location.hash === '#catalogue' || window.location.hash.startsWith('#product-')) {
      window.history.pushState({}, '', '/');
    }
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog-section');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSwitchToTable = () => {
    setSelectedProductForPDP(null);
    setIsAboutPageOpen(false);
    setIsCatalogueBookOpen(false);
    setCatalogViewMode('table');
    if (window.location.hash === '#about' || window.location.hash === '#catalogue' || window.location.hash.startsWith('#product-')) {
      window.history.pushState({}, '', '/');
    }
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog-section');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleNavigateQuality = () => {
    setSelectedProductForPDP(null);
    setIsAboutPageOpen(false);
    setIsCatalogueBookOpen(false);
    if (window.location.hash === '#about' || window.location.hash === '#catalogue' || window.location.hash.startsWith('#product-')) {
      window.history.pushState({}, '', '/');
    }
    setTimeout(() => {
      const qualityElement = document.getElementById('why-us');
      if (qualityElement) {
        qualityElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSelectCategory = (category) => {
    setSelectedProductForPDP(null);
    setIsAboutPageOpen(false);
    setSelectedCategory(category);
  };

  const handleOpenPDP = (product) => {
    setSelectedProductForPDP(product);
    setIsAboutPageOpen(false);
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
    setIsCatalogueBookOpen(false);
    setIsAboutPageOpen(false);
    if (window.location.hash === '#about' || window.location.hash === '#catalogue' || window.location.hash.startsWith('#product-')) {
      window.history.pushState({}, '', '/');
    }
    setTimeout(() => {
      const contactElement = document.getElementById('contact-section');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleLogoClick = () => {
    setSelectedProductForPDP(null);
    setIsCatalogueBookOpen(false);
    setIsAboutPageOpen(false);
    if (window.location.hash === '#about' || window.location.hash === '#catalogue' || window.location.hash.startsWith('#product-')) {
      window.history.pushState({}, '', '/');
    }
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
        onNavigateAbout={handleOpenAboutPage}
        onNavigateQuality={handleNavigateQuality}
        onNavigateCatalog={handleExploreCatalog}
        onLogoClick={handleLogoClick}
        onSwitchView={setCatalogViewMode}
        onOpenCatalogueBook={handleOpenCatalogueBook}
      />

      {/* Conditional: Either show full Product Detail Page (PDP), Full Catalogue Lookbook, Dedicated About Us Page, OR the Clean Dashboard */}
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
      ) : isAboutPageOpen ? (
        <AboutUsPage
          onBackToDashboard={handleBackFromAbout}
          onExploreCatalog={handleExploreCatalog}
          onNavigateContact={handleNavigateContact}
          onOpenCatalogueBook={handleOpenCatalogueBook}
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

          {/* 4. Clean Quality & Technical Standards Benchmark */}
          <WhyChooseUs />

          {/* 5. Comprehensive Factory Location, Route Map & Interactive Inquiry Form */}
          <ContactPage prefilledMessage={prefilledInquiryMessage} />
        </>
      )}

      {/* 6. Minimal Clean Footer with Admin Portal Access */}
      <Footer 
        onSelectCategory={handleSelectCategory} 
        onOpenCatalogueBook={handleOpenCatalogueBook}
        onNavigateAdmin={() => navigate('/admin')}
        onNavigateAbout={handleOpenAboutPage}
        onNavigateCatalog={handleExploreCatalog}
        onNavigateQuality={handleNavigateQuality}
        onNavigateContact={handleNavigateContact}
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
