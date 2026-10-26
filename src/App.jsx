import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailPage from './components/ProductDetailPage';
import CatalogueBookPage from './components/CatalogueBookPage';
import WhyChooseUs from './components/WhyChooseUs';
import ContactPage from './components/ContactPage';
import BulkQuoteModal from './components/BulkQuoteModal';
import BulkQuoteDrawer from './components/BulkQuoteDrawer';
import FloatingInquiryButton from './components/FloatingInquiryButton';
import Footer from './components/Footer';

export default function App() {
  const [isCatalogueBookOpen, setIsCatalogueBookOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBulkQuoteOpen, setIsBulkQuoteOpen] = useState(false);
  const [selectedProductForPDP, setSelectedProductForPDP] = useState(null);
  const [quoteList, setQuoteList] = useState([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [prefilledInquiryMessage, setPrefilledInquiryMessage] = useState("");
  const [catalogViewMode, setCatalogViewMode] = useState('grid'); // 'grid' | 'table'

  const handleOpenCatalogueBook = () => {
    setSelectedProductForPDP(null);
    setIsCatalogueBookOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setIsCatalogueBookOpen(false);
    setSelectedProductForPDP(null);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPDP = () => {
    setSelectedProductForPDP(null);
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
        onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
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
          product={selectedProductForPDP}
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
            onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
            onSelectProductForPDP={handleOpenPDP}
            externalViewMode={catalogViewMode}
          />

          {/* 5. Clean Quality & Technical Standards Benchmark */}
          <WhyChooseUs />

          {/* 6. Comprehensive Factory Location, Route Map & Interactive Inquiry Form */}
          <ContactPage prefilledMessage={prefilledInquiryMessage} />
        </>
      )}

      {/* 7. Minimal Clean Footer */}
      <Footer 
        onSelectCategory={handleSelectCategory} 
        onOpenCatalogueBook={handleOpenCatalogueBook}
      />

      {/* 8. Floating Inquiry Cart Button */}
      <FloatingInquiryButton
        itemCount={quoteList.length}
        totalUnits={totalQuoteUnits}
        onClick={() => setIsQuoteDrawerOpen(true)}
      />

      {/* 9. Modals & Drawers */}
      <BulkQuoteModal
        isOpen={isBulkQuoteOpen}
        onClose={() => setIsBulkQuoteOpen(false)}
      />

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
