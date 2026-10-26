import React, { useState, useMemo } from 'react';
import { 
  LayoutGrid, 
  TableProperties, 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  ArrowUpDown, 
  Filter,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { companyDetails } from '../data/companyData';
import ProductCard from './ProductCard';
import SpecTableView from './SpecTableView';
import CatalogSidebar from './CatalogSidebar';
import ProductModal from './ProductModal';

export default function ProductCatalog({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onOpenBulkQuote
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedColor, setSelectedColor] = useState(null);
  const [stackableOnly, setStackableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'capacity-desc' | 'name-asc' | 'model-asc'
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Calculate unique colors with hex codes and model count
  const colorOptions = useMemo(() => {
    const map = new Map();
    productsData.forEach(p => {
      p.colors.forEach(c => {
        if (!map.has(c.name)) {
          map.set(c.name, { name: c.name, hex: c.hex, count: 1 });
        } else {
          map.get(c.name).count += 1;
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, []);

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts = {
      "All Products": productsData.length,
      "Plastic Chairs": 0,
      "Center Tables": 0,
      "Dining Tables": 0,
      "Stools": 0,
      "Patlas": 0
    };

    productsData.forEach(p => {
      if (p.category.includes("Plastic Chairs")) counts["Plastic Chairs"] += 1;
      if (p.category.includes("Center Tables")) counts["Center Tables"] += 1;
      if (p.category.includes("Dining Tables")) counts["Dining Tables"] += 1;
      if (p.category.includes("Stools")) counts["Stools"] += 1;
      if (p.category.includes("Patlas")) counts["Patlas"] += 1;
    });

    return counts;
  }, []);

  // Filter products based on all active criteria
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // 1. Category Filter
      if (selectedCategory !== "All Products") {
        if (selectedCategory === "Plastic Chairs") {
          if (!product.category.includes("Plastic Chairs")) return false;
        } else {
          if (!product.category.includes(selectedCategory)) return false;
        }
      }

      // 2. Stackable Only Filter
      if (stackableOnly && !product.isStackable) {
        return false;
      }

      // 3. Color Filter
      if (selectedColor) {
        const hasColor = product.colors.some(c => c.name.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }

      // 4. Live Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCode = product.modelCode.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesMaterial = product.material.toLowerCase().includes(q);
        const matchesColors = product.colors.some(c => c.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCode && !matchesCategory && !matchesMaterial && !matchesColors) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      if (sortBy === 'capacity-desc') {
        const capA = parseInt(a.weightCapacity) || 0;
        const capB = parseInt(b.weightCapacity) || 0;
        return capB - capA;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'model-asc') {
        return a.modelCode.localeCompare(b.modelCode);
      }
      return 0;
    });
  }, [selectedCategory, stackableOnly, selectedColor, searchQuery, sortBy]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All Products") count += 1;
    if (stackableOnly) count += 1;
    if (selectedColor) count += 1;
    if (searchQuery.trim()) count += 1;
    return count;
  }, [selectedCategory, stackableOnly, selectedColor, searchQuery]);

  const handleResetFilters = () => {
    onSelectCategory("All Products");
    setSelectedColor(null);
    setStackableOnly(false);
    setSearchQuery("");
  };

  return (
    <section id="catalog-section" className="py-16 sm:py-20 bg-brand-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Product Catalogue (PLP)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Moulded Plastic Furniture Collection
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
              Switch between High-Impact Grid View and Wholesale Spec Table View for bulk procurement comparisons.
            </p>
          </div>

          {/* Top Actions: View Switcher & Bulk Rate Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBulkQuote}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-primary text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Get Wholesale Price List</span>
            </button>
          </div>
        </div>

        {/* Catalog Layout: Sidebar + Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <CatalogSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              stackableOnly={stackableOnly}
              onToggleStackable={() => setStackableOnly(!stackableOnly)}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
              categoryCounts={categoryCounts}
              colorOptions={colorOptions}
            />
          </aside>

          {/* Main Content Area (9 Cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Control Bar: View Toggle, Sort, Results Count & Mobile Filter Trigger */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Left: Mobile Filter Toggle + Results Count */}
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                >
                  <Filter className="w-4 h-4 text-brand-primary" />
                  <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
                </button>

                <p className="text-xs text-slate-600">
                  Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> of {productsData.length} models
                </p>
              </div>

              {/* Right: Sort Dropdown & View Mode Switcher */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 hidden md:inline">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-3 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer"
                    >
                      <option value="featured">Featured First</option>
                      <option value="capacity-desc">Highest Load Capacity</option>
                      <option value="name-asc">Product Name (A-Z)</option>
                      <option value="model-asc">Model Code</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* View Switcher: Grid View vs Spec Table View */}
                <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white text-brand-primary shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Grid Card View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'table'
                        ? 'bg-white text-brand-primary shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Wholesale Spec Table View"
                  >
                    <TableProperties className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Spec Table</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Active Filter Chips Strip */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 text-[11px] font-semibold">Active Filters:</span>
                
                {selectedCategory !== "All Products" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-brand-primary font-medium border border-blue-200">
                    Category: {selectedCategory}
                    <button onClick={() => onSelectCategory("All Products")} className="hover:text-blue-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {stackableOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                    Stackable Only
                    <button onClick={() => setStackableOnly(false)} className="hover:text-emerald-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedColor && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 font-medium border border-amber-200">
                    Color: {selectedColor}
                    <button onClick={() => setSelectedColor(null)} className="hover:text-amber-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-medium border border-slate-200">
                    Query: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-slate-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 underline font-semibold ml-1 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Catalogue Display: Dual Views */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
                <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No products match your filters</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
                  Try clearing active color swatches, stackable filters, or broadening your search query.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* 1. Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setActiveModalProduct(p)}
                  />
                ))}
              </div>
            ) : (
              /* 2. Spec Table View */
              <SpecTableView
                products={filteredProducts}
                onQuickView={(p) => setActiveModalProduct(p)}
              />
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filter Slide-over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <CatalogSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  onSelectCategory(cat);
                  setMobileFilterOpen(false);
                }}
                selectedColor={selectedColor}
                onSelectColor={(col) => {
                  setSelectedColor(col);
                  setMobileFilterOpen(false);
                }}
                stackableOnly={stackableOnly}
                onToggleStackable={() => setStackableOnly(!stackableOnly)}
                onResetFilters={handleResetFilters}
                activeFilterCount={activeFilterCount}
                categoryCounts={categoryCounts}
                colorOptions={colorOptions}
              />
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 mt-6 rounded-xl bg-brand-primary text-white font-bold text-xs"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}

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
