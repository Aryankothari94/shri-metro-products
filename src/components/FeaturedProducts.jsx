import React, { useState } from 'react';
import { 
  Maximize2, 
  Weight, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Eye, 
  Check, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useData } from '../context/DataContext';
import ProductModal from './ProductModal';

export default function FeaturedProducts({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  setSearchQuery,
  onOpenBulkQuote
}) {
  const { activeProducts: productsData, company: companyDetails } = useData();
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [activeColorSelection, setActiveColorSelection] = useState({});

  const filterTabs = [
    { label: "All Products", value: "All Products" },
    { label: "Chairs", value: "Chairs" },
    { label: "Dining Tables", value: "Dining Tables" },
    { label: "Center Tables", value: "Center Tables" },
    { label: "Stools", value: "Stools" },
    { label: "Patla", value: "Patla" }
  ];

  // Filter products based on category and live search
  const filteredProducts = productsData.filter((product) => {
    let matchesCategory = true;
    if (selectedCategory !== "All Products") {
      if (selectedCategory === "Chairs" || selectedCategory === "Plastic Chairs") {
        matchesCategory = product.category.toLowerCase().includes("chair");
      } else if (selectedCategory === "Patlas" || selectedCategory === "Patla") {
        matchesCategory = product.category.toLowerCase().includes("patla");
      } else {
        matchesCategory = product.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }
    }

    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch = 
        product.name.toLowerCase().includes(q) ||
        product.modelCode.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q);
    }

    return matchesCategory && matchesSearch;
  });

  const handleColorClick = (productId, colorName) => {
    setActiveColorSelection(prev => ({
      ...prev,
      [productId]: colorName
    }));
  };

  return (
    <section id="catalog-section" className="py-16 sm:py-24 bg-brand-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Factory Catalogue
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Featured Heavy-Duty Moulded Furniture
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Manufactured from 100% Virgin Polypropylene with reinforced stress zones. Explore specifications or request custom container bulk loads.
          </p>
        </div>

        {/* Filter Navigation & Search Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => onSelectCategory(tab.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-blue-800/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Search / Filter indicator */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs text-slate-500">
            <span>
              Showing <strong className="text-brand-dark">{filteredProducts.length}</strong> items
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-medium hover:bg-amber-200"
              >
                <span>Clear search: "{searchQuery}"</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              We couldn't find any models matching your filter criteria. Try adjusting the search term or category.
            </p>
            <button
              onClick={() => {
                onSelectCategory("All Products");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-brand-primary text-white text-xs font-bold hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const selectedColor = activeColorSelection[product.id] || product.colors[0]?.name;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:shadow-elevated hover:border-slate-300 transition-all duration-300 flex flex-col group relative"
                >
                  {/* Top Image Box */}
                  <div className="relative h-56 bg-slate-50 overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xs"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Featured Ribbon */}
                    {product.isFeatured && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-extrabold shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> FEATURED
                      </span>
                    )}

                    {/* Model Code */}
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-brand-dark/85 backdrop-blur-sm text-white text-[11px] font-mono tracking-wider shadow-sm">
                      {product.modelCode}
                    </span>

                    {/* Quick View Button on Hover */}
                    <button
                      type="button"
                      onClick={() => setActiveModalProduct(product)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-bold shadow-md flex items-center gap-1.5 hover:bg-white hover:text-brand-primary"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Label */}
                      <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider block">
                        {product.category}
                      </span>

                      {/* Name */}
                      <h3 
                        onClick={() => setActiveModalProduct(product)}
                        className="font-extrabold text-slate-900 text-base mt-1 line-clamp-1 hover:text-brand-primary transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Technical Specs Summary */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Maximize2 className="w-3.5 h-3.5" /> Size
                          </span>
                          <span className="font-mono text-[11px] font-semibold text-slate-700">
                            {product.dimensions}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Weight className="w-3.5 h-3.5" /> Load
                          </span>
                          <span className="font-bold text-amber-600">
                            {product.weightCapacity}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Layers className="w-3.5 h-3.5" /> Stack
                          </span>
                          <span className={`font-semibold text-[11px] ${product.isStackable ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {product.stackingLimit}
                          </span>
                        </div>
                      </div>

                      {/* Colors Palette with interactive selection */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                          <span>Colors: <strong className="text-slate-700">{selectedColor}</strong></span>
                          <span>{product.colors.length} shades</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {product.colors.map((c, idx) => {
                            const isSelected = selectedColor === c.name;
                            return (
                              <button
                                key={idx}
                                title={c.name}
                                onClick={() => handleColorClick(product.id, c.name)}
                                className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                                  isSelected 
                                    ? 'ring-2 ring-brand-primary scale-110 border-white' 
                                    : 'border-slate-300 hover:scale-105'
                                }`}
                                style={{ backgroundColor: c.hex }}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 text-white drop-shadow-sm" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href={`https://wa.me/${companyDetails.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20I%20would%20like%20a%20price%20quote%20for%20${encodeURIComponent(product.name)}%20(Model%3A%20${product.modelCode})%20in%20${encodeURIComponent(selectedColor)}%20color.`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Quote</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setActiveModalProduct(product)}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        Specs
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Catalog Banner */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-brand-dark to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase">Direct Factory Orders</span>
            <h3 className="text-xl sm:text-2xl font-extrabold mt-1">Need 50+ Units or Custom Colors?</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              We cater directly to tent-houses, event rental agencies, schools, institutions, and wholesale dealers with customized color batching and factory gate pricing.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBulkQuote}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap active:scale-95 cursor-pointer"
          >
            Calculate Bulk Pricing
          </button>
        </div>

      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <ProductModal 
          product={activeModalProduct} 
          onClose={() => setActiveModalProduct(null)} 
        />
      )}
    </section>
  );
}
