import React, { useState, useMemo } from 'react';
import { 
  LayoutGrid, 
  TableProperties, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Filter
} from 'lucide-react';
import { useData } from '../context/DataContext';
import ProductCard from './ProductCard';
import SpecTableView from './SpecTableView';
import CatalogSidebar from './CatalogSidebar';
import ProductModal from './ProductModal';
import useSwipeGesture from '../hooks/useSwipeGesture';

export default function ProductCatalog({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onSelectProductForPDP,
  externalViewMode = null
}) {
  const { activeProducts, categories } = useData();

  const [viewMode, setViewMode] = useState(externalViewMode || 'grid'); // 'grid' | 'table'
  const [selectedColor, setSelectedColor] = useState(null);
  const [stackableOnly, setStackableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Swipe right to dismiss mobile filter drawer
  const { gestureState: filterGesture, touchHandlers: filterTouchHandlers } = useSwipeGesture({
    onSwipeRight: () => setMobileFilterOpen(false),
    threshold: 40,
    disabled: !mobileFilterOpen,
  });

  // Sync externalViewMode if provided
  React.useEffect(() => {
    if (externalViewMode) {
      setViewMode(externalViewMode);
    }
  }, [externalViewMode]);

  // Calculate unique colors from reactive active products
  const colorOptions = useMemo(() => {
    const map = new Map();
    activeProducts.forEach(p => {
      (p.colors || []).forEach(c => {
        if (!map.has(c.name)) {
          map.set(c.name, { name: c.name, hex: c.hex, count: 1 });
        } else {
          map.get(c.name).count += 1;
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [activeProducts]);

  // Calculate product counts per category dynamically
  const categoryCounts = useMemo(() => {
    const counts = {
      "All Products": activeProducts.length
    };

    categories.forEach(c => {
      counts[c.name] = 0;
    });

    activeProducts.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      } else {
        counts[p.category] = 1;
      }
    });

    return counts;
  }, [activeProducts, categories]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return activeProducts.filter(product => {
      if (selectedCategory !== "All Products") {
        if (selectedCategory === "Chairs" || selectedCategory === "Plastic Chairs") {
          if (!product.category.toLowerCase().includes("chair")) return false;
        } else if (selectedCategory === "Patlas" || selectedCategory === "Patla") {
          if (!product.category.toLowerCase().includes("patla")) return false;
        } else {
          if (product.category !== selectedCategory && !product.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
        }
      }

      if (stackableOnly && !product.isStackable) return false;

      if (selectedColor) {
        const hasColor = product.colors?.some(c => c.name.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(q);
        const matchesCode = product.modelCode?.toLowerCase().includes(q);
        const matchesCategory = product.category?.toLowerCase().includes(q);
        const matchesMaterial = product.material?.toLowerCase().includes(q);
        const matchesColors = product.colors?.some(c => c.name.toLowerCase().includes(q));
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
        const capA = parseInt(a.loadCapacityKg || a.weightCapacity) || 0;
        const capB = parseInt(b.loadCapacityKg || b.weightCapacity) || 0;
        return capB - capA;
      }
      if (sortBy === 'name-asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'model-asc') {
        return (a.modelCode || '').localeCompare(b.modelCode || '');
      }
      return 0;
    });
  }, [activeProducts, selectedCategory, stackableOnly, selectedColor, searchQuery, sortBy]);

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
    <section id="catalog-section" className="py-10 sm:py-14 bg-slate-50/50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Sidebar (3) + Content (9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
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

          {/* Main Area */}
          <main className="lg:col-span-9 space-y-4">
            
            {/* Clean Workbench Toolbar */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Left: Mobile Filter Button & Results Indicator */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold"
                >
                  <Filter className="w-3.5 h-3.5 text-red-600" />
                  <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
                </button>

                <p className="text-xs text-slate-600">
                  <strong className="text-red-600 font-bold">{filteredProducts.length}</strong> items in inventory
                </p>
              </div>

              {/* Right: Sort & View Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                {/* Sort Selector */}
                <div className="relative text-xs">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-2.5 pr-6 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="capacity-desc">Highest Load Capacity</option>
                    <option value="name-asc">Product Name (A-Z)</option>
                    <option value="model-asc">Model Code</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* View Switcher: Grid vs Table */}
                <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white text-red-600 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'table'
                        ? 'bg-white text-red-600 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Spec Table View"
                  >
                    <TableProperties className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Spec Table</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                <span className="text-slate-400 text-[11px]">Filtered by:</span>
                
                {selectedCategory !== "All Products" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 text-red-700 text-[11px] font-medium border border-red-200">
                    Category: {selectedCategory}
                    <button onClick={() => onSelectCategory("All Products")} className="hover:text-red-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {stackableOnly && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 text-red-700 text-[11px] font-medium border border-red-200">
                    Stackable Only
                    <button onClick={() => setStackableOnly(false)} className="hover:text-red-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedColor && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 text-red-700 text-[11px] font-medium border border-red-200">
                    Color: {selectedColor}
                    <button onClick={() => setSelectedColor(null)} className="hover:text-red-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-slate-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-slate-500 hover:text-slate-900 underline font-semibold ml-1 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* View Rendering */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-sm mx-auto shadow-2xs">
                <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">No models found</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Adjust active filters or clear search term.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Reset Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setActiveModalProduct(p)}
                    onViewDetails={onSelectProductForPDP}
                  />
                ))}
              </div>
            ) : (
              <SpecTableView
                products={filteredProducts}
                onQuickView={(p) => setActiveModalProduct(p)}
                onViewDetails={onSelectProductForPDP}
              />
            )}

          </main>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div 
            className="w-full max-w-xs bg-white h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between transition-transform duration-75 select-none"
            style={{
              transform: filterGesture.isSwiping && filterGesture.direction === 'right'
                ? `translateX(${filterGesture.distanceX}px)`
                : 'translateX(0)',
              touchAction: 'pan-y'
            }}
            onClick={(e) => e.stopPropagation()}
            {...filterTouchHandlers}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>Filters</span>
                  <span className="text-[10px] text-slate-400 font-normal">Swipe →</span>
                </span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
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
              className="w-full py-2.5 mt-4 rounded-lg bg-slate-900 text-white font-bold text-xs"
            >
              Apply ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {activeModalProduct && (
        <ProductModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
          onOpenPDP={onSelectProductForPDP}
        />
      )}
    </section>
  );
}
