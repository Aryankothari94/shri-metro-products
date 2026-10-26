import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Grid, 
  ShieldCheck, 
  Layers, 
  Award, 
  Truck, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { companyDetails } from '../data/companyData';

export default function CatalogueBookPage({ onBackToDashboard, onAddToQuoteList }) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [viewMode, setViewMode] = useState('book'); // 'book' | 'grid'
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev'
  const [orderQuantity, setOrderQuantity] = useState(50);
  const [isAddedToast, setIsAddedToast] = useState(false);

  // Available categories with counts
  const categories = [
    { name: "All Categories", count: productsData.length },
    { name: "Plastic Chairs (Armrest)", count: productsData.filter(p => p.category === "Plastic Chairs (Armrest)").length },
    { name: "Plastic Chairs (Armless)", count: productsData.filter(p => p.category === "Plastic Chairs (Armless)").length },
    { name: "Center Tables", count: productsData.filter(p => p.category === "Center Tables").length },
    { name: "Dining Tables", count: productsData.filter(p => p.category === "Dining Tables").length },
    { name: "Stools", count: productsData.filter(p => p.category === "Stools").length },
    { name: "Patlas", count: productsData.filter(p => p.category === "Patlas").length },
  ];

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All Categories" 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);

  // Ensure currentIndex stays within bounds when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setActiveColorIdx(0);
  }, [selectedCategory]);

  const currentProduct = filteredProducts[currentIndex] || filteredProducts[0];
  const currentColor = currentProduct?.colors?.[activeColorIdx] || currentProduct?.colors?.[0] || { name: "Standard", hex: "#DC2626", image: currentProduct?.image };

  // Page turn handlers with smooth flip animation
  const handleNextPage = () => {
    if (currentIndex < filteredProducts.length - 1) {
      setFlipDirection('next');
      setActiveColorIdx(0);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setFlipDirection(null), 450);
    }
  };

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      setFlipDirection('prev');
      setActiveColorIdx(0);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setFlipDirection(null), 450);
    }
  };

  const handleJumpToProduct = (idx) => {
    if (idx === currentIndex) return;
    setFlipDirection(idx > currentIndex ? 'next' : 'prev');
    setActiveColorIdx(0);
    setCurrentIndex(idx);
    setTimeout(() => setFlipDirection(null), 450);
  };

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'book') return;
      if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredProducts.length, viewMode]);

  // Handle Add to Quote List
  const handleAddQuote = () => {
    if (onAddToQuoteList && currentProduct) {
      onAddToQuoteList({
        id: currentProduct.id,
        name: currentProduct.name,
        modelCode: currentProduct.modelCode,
        category: currentProduct.category,
        image: currentColor.image || currentProduct.image,
        selectedColor: currentColor.name,
        quantity: orderQuantity,
        loadCapacity: currentProduct.loadCapacityKg
      });
      setIsAddedToast(true);
      setTimeout(() => setIsAddedToast(false), 2500);
    }
  };

  // WhatsApp pre-formatted direct link
  const buildWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Shri Metro Products, I am reviewing the 2026 Product Catalogue for ${currentProduct.name} (${currentProduct.modelCode}), Finish: ${currentColor.name}, Quantity: ${orderQuantity} units. Please provide wholesale pricing and dispatch terms.`
    );
    return `https://api.whatsapp.com/send/?phone=919845287888&text=${text}`;
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      
      {/* 1. Sleek Minimal Catalogue Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Back button & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Dashboard</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span>/</span>
              <span className="font-semibold text-slate-800">Official Product Catalogue 2026</span>
            </div>
          </div>

          {/* Center: View Switcher (Book Spread vs Grid) */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setViewMode('book')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'book' 
                  ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>Book Lookbook</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-slate-600" />
              <span>Grid Index</span>
            </button>
          </div>

          {/* Right: Quick Inquire Action */}
          <div className="flex items-center gap-3">
            <a
              href={companyDetails.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm shadow-red-500/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp Factory Desk</span>
            </a>
          </div>

        </div>
      </header>

      {/* 2. Horizontal Category Filter Strip */}
      <section className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Categories:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-red-600 text-white shadow-xs font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/70'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.name ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Main Catalogue Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center justify-center">
        
        {viewMode === 'book' ? (
          /* =========================================================
             A. SMOOTH BOOK SPREAD VIEW (Dual Pages with Page-Turn FX)
             ========================================================= */
          <div className="w-full max-w-5xl space-y-4">
            
            {/* Top Page Progress Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{selectedCategory}</span>
                <span>•</span>
                <span>Model Code: <strong className="text-red-600 font-mono">{currentProduct.modelCode}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-medium text-xs">
                  Model <strong>{currentIndex + 1}</strong> of <strong>{filteredProducts.length}</strong>
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="hidden sm:inline text-[11px] text-slate-400">Use ← → arrow keys to flip</span>
              </div>
            </div>

            {/* The Physical Book Container with 3D Perspective */}
            <div className="relative perspective-1000">
              
              {/* Outer Book Frame */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-12 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden transform-style-preserve-3d transition-all duration-300 ${
                  flipDirection === 'next' ? 'animate-book-flip-next' : flipDirection === 'prev' ? 'animate-book-flip-prev' : ''
                }`}
              >
                
                {/* ---------------- LEFT PAGE: Visual Studio & Design ---------------- */}
                <div className="md:col-span-6 p-6 sm:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50/60 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between relative">
                  
                  {/* Model Code Watermark */}
                  <div className="absolute top-4 right-4 text-slate-200 font-black text-2xl tracking-widest select-none pointer-events-none">
                    {currentProduct.modelCode}
                  </div>

                  {/* Left Page Top Badges */}
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/70 text-[11px] font-bold">
                        {currentProduct.category}
                      </span>
                      {currentProduct.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                          ★ Flagship Series
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Product Photography Canvas */}
                  <div className="relative my-4 py-4 flex items-center justify-center min-h-[260px] sm:min-h-[300px]">
                    
                    {/* Floating Quality Stamps */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs text-[10px] font-bold text-slate-800">
                        <ShieldCheck className="w-3 h-3 text-red-600" />
                        <span>{currentProduct.loadCapacityKg} Tested</span>
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs text-[10px] font-bold text-slate-800">
                        <Layers className="w-3 h-3 text-slate-700" />
                        <span>{currentProduct.stackabilityLimit}</span>
                      </div>
                    </div>

                    {/* Product Photo with Smooth Transition */}
                    <img 
                      src={currentColor.image || currentProduct.image} 
                      alt={currentProduct.name}
                      key={currentColor.image}
                      className="max-h-64 sm:max-h-72 object-contain drop-shadow-md hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  {/* Left Page Bottom: Color Finish Selector */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium text-[11px]">Factory Finish:</span>
                      <span className="font-bold text-slate-900 text-xs">{currentColor.name}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentProduct.colors?.map((color, idx) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setActiveColorIdx(idx)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
                            activeColorIdx === idx 
                              ? 'border-red-600 bg-red-50 text-slate-900 font-bold shadow-2xs' 
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                          }`}
                        >
                          <span 
                            className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-[11px] truncate">{color.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>PAGE {String(currentIndex * 2 + 1).padStart(2, '0')}</span>
                      <span>SHRI METRO WORKS • KUMBALGODU</span>
                    </div>
                  </div>

                </div>

                {/* ---------------- RIGHT PAGE: Technical Specs & B2B Order ---------------- */}
                <div className="md:col-span-6 p-6 sm:p-8 bg-white flex flex-col justify-between relative">
                  
                  {/* Subtle Center Book Spine Shadow Seam */}
                  <div className="hidden md:block absolute top-0 bottom-0 left-0 w-3 book-spine-gradient pointer-events-none"></div>

                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                        {currentProduct.modelCode}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                        {currentProduct.name}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {currentProduct.description}
                      </p>
                    </div>

                    {/* Structured Technical Specifications Table */}
                    <div className="border border-slate-200/90 rounded-xl overflow-hidden text-xs">
                      <div className="bg-slate-50 px-3 py-2 border-b border-slate-200/90 font-bold text-slate-800 text-[11px] flex items-center justify-between">
                        <span>TECHNICAL BENCHMARK</span>
                        <span className="text-emerald-700 font-mono text-[10px]">ISO VIRGIN PP</span>
                      </div>

                      <div className="divide-y divide-slate-100 text-[11px]">
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-slate-500">Dimensions</span>
                          <span className="font-semibold text-slate-900">{currentProduct.dimensions}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-slate-500">Net Product Weight</span>
                          <span className="font-semibold text-slate-900">{currentProduct.netWeight}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-slate-500">Load Capacity</span>
                          <span className="font-bold text-red-600">{currentProduct.loadCapacityKg} Static Tested</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-slate-500">Material Finish</span>
                          <span className="font-semibold text-slate-800 truncate max-w-[200px]">{currentProduct.materialFinish}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-slate-500">Moulding Tech</span>
                          <span className="font-semibold text-slate-800">{currentProduct.mouldTech}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-slate-500">Suitability</span>
                          <span className="font-semibold text-slate-800 truncate max-w-[200px]">{currentProduct.suitableEnvironments}</span>
                        </div>
                      </div>
                    </div>

                    {/* B2B Wholesale Quantity Estimator & Order Box */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">Wholesale Order Quantity:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setOrderQuantity(prev => Math.max(25, prev - 25))}
                            className="w-6 h-6 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-black text-red-600 w-12 text-center text-sm">
                            {orderQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setOrderQuantity(prev => prev + 25)}
                            className="w-6 h-6 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleAddQuote}
                          className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-red-400" />
                          <span>{isAddedToast ? '✓ Added to Cart' : 'Add to Quote'}</span>
                        </button>

                        <a
                          href={buildWhatsAppLink()}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                          <span>WhatsApp Quote</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Page Bottom */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>PAGE {String(currentIndex * 2 + 2).padStart(2, '0')}</span>
                    <span className="font-mono">GSTIN: {companyDetails.gstin}</span>
                  </div>

                </div>

              </div>

              {/* Floating Book Page Turn Controls (Left and Right Flaps) */}
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 transition-all z-30 cursor-pointer ${
                  currentIndex === 0 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:bg-red-600 hover:text-white hover:scale-110 active:scale-95'
                }`}
                title="Previous model"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentIndex === filteredProducts.length - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 transition-all z-30 cursor-pointer ${
                  currentIndex === filteredProducts.length - 1 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:bg-red-600 hover:text-white hover:scale-110 active:scale-95'
                }`}
                title="Next model"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* 4. Bottom Lookbook Model Index Strip */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  Browse All Models in this Category ({filteredProducts.length})
                </span>
                <span className="text-slate-400 text-[11px]">
                  Click to open page
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
                {filteredProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleJumpToProduct(idx)}
                    className={`flex items-center gap-2 p-1.5 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                      currentIndex === idx 
                        ? 'border-red-600 bg-red-50 ring-1 ring-red-500/30' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-10 h-10 object-contain rounded-lg bg-white p-0.5 border border-slate-200"
                    />
                    <div className="pr-2">
                      <p className="text-[11px] font-bold text-slate-900 truncate max-w-[120px]">{p.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">{p.modelCode}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* =========================================================
             B. CLEAN CATALOGUE GRID VIEW (All Models at a Glance)
             ========================================================= */
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {selectedCategory}
                </h2>
                <p className="text-xs text-slate-500">
                  Showing all {filteredProducts.length} models manufactured at Kumbalgodu Unit
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewMode('book')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open in Book View</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-red-200 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        {product.modelCode}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {product.loadCapacityKg} Tested
                      </span>
                    </div>

                    {/* Image */}
                    <div className="h-48 py-2 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-40 object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Info */}
                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Specs preview */}
                    <div className="grid grid-cols-2 gap-2 my-3 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Net Weight:</span>
                        <span className="font-semibold">{product.netWeight}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Stacking:</span>
                        <span className="font-semibold">{product.stackabilityLimit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleJumpToProduct(idx);
                        setViewMode('book');
                      }}
                      className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-center"
                    >
                      Book Page →
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send/?phone=919845287888&text=${encodeURIComponent(
                        `Inquiry for ${product.name} (${product.modelCode})`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-2xs"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
