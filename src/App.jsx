import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailPage from './components/ProductDetailPage';
import WhyChooseUs from './components/WhyChooseUs';
import OwnerContactCard from './components/OwnerContactCard';
import BulkQuoteModal from './components/BulkQuoteModal';
import BulkQuoteDrawer from './components/BulkQuoteDrawer';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBulkQuoteOpen, setIsBulkQuoteOpen] = useState(false);
  const [selectedProductForPDP, setSelectedProductForPDP] = useState(null);
  const [quoteList, setQuoteList] = useState([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  const handleExploreCatalog = () => {
    setSelectedProductForPDP(null);
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

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Header & Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectCategory}
        onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
        quoteListCount={quoteList.length}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
      />

      {/* Conditional: Either show full Product Detail Page (PDP) OR the Homepage / PLP */}
      {selectedProductForPDP ? (
        <ProductDetailPage
          product={selectedProductForPDP}
          onBack={handleBackFromPDP}
          onAddToQuoteList={handleAddToQuoteList}
        />
      ) : (
        <>
          {/* 2. Hero Section */}
          <Hero onExploreCatalog={handleExploreCatalog} />

          {/* 3. Category Grid Showcase */}
          <CategoryGrid onSelectCategory={handleSelectCategory} />

          {/* 4. Dynamic Product Catalogue (PLP) with Dual Views (Grid vs. Spec Table) & Sidebar Filters */}
          <ProductCatalog
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
            onSelectProductForPDP={handleOpenPDP}
          />

          {/* 5. "Why Choose Us" Quality Badges */}
          <WhyChooseUs />

          {/* 6. Direct Owner Contact Card */}
          <OwnerContactCard />
        </>
      )}

      {/* 7. Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* 8. Modals & Drawers */}
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
      />
    </div>
  );
}
