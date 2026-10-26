import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductCatalog from './components/ProductCatalog';
import WhyChooseUs from './components/WhyChooseUs';
import OwnerContactCard from './components/OwnerContactCard';
import BulkQuoteModal from './components/BulkQuoteModal';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBulkQuoteOpen, setIsBulkQuoteOpen] = useState(false);

  const handleExploreCatalog = () => {
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Header & Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectCategory}
        onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
      />

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
      />

      {/* 5. "Why Choose Us" Quality Badges */}
      <WhyChooseUs />

      {/* 6. Direct Owner Contact Card */}
      <OwnerContactCard />

      {/* 7. Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* 8. Bulk Quotation Modal */}
      <BulkQuoteModal
        isOpen={isBulkQuoteOpen}
        onClose={() => setIsBulkQuoteOpen(false)}
      />
    </div>
  );
}
