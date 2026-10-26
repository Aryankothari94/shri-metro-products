import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  Layers, 
  Palette, 
  RotateCcw, 
  Check,
  CheckCircle2
} from 'lucide-react';

export default function CatalogSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory,
  selectedColor,
  onSelectColor,
  stackableOnly,
  onToggleStackable,
  onResetFilters,
  activeFilterCount,
  categoryCounts,
  colorOptions
}) {
  const categories = [
    { label: "All Products", value: "All Products" },
    { label: "Plastic Chairs", value: "Plastic Chairs" },
    { label: "Center Tables", value: "Center Tables" },
    { label: "Dining Tables", value: "Dining Tables" },
    { label: "Stools", value: "Stools" },
    { label: "Patlas", value: "Patlas" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-subtle space-y-6">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-primary" />
          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
            Filter Catalogue
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-brand-muted hover:text-brand-primary font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Quick Search Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Search Products
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search model, name, PP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Categories
        </label>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            const count = categoryCounts[cat.value] || 0;

            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-brand-primary text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Stackable Only Toggle Switch */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-slate-800">Stackable Only</span>
              <span className="block text-[11px] text-slate-500">Space saving models</span>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={stackableOnly}
            onClick={onToggleStackable}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${
              stackableOnly ? 'bg-emerald-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                stackableOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 4. Filter by Color Swatches */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-brand-primary" />
            <span>Filter By Color</span>
          </label>
          {selectedColor && (
            <button
              onClick={() => onSelectColor(null)}
              className="text-[10px] text-amber-600 hover:underline font-semibold"
            >
              Clear color
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((color) => {
            const isSelected = selectedColor === color.name;

            return (
              <button
                key={color.name}
                type="button"
                title={`${color.name} (${color.count} models)`}
                onClick={() => onSelectColor(isSelected ? null : color.name)}
                className={`flex flex-col items-center p-2 rounded-xl border text-[10px] transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-primary bg-blue-50/50 shadow-xs ring-1 ring-brand-primary'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-slate-300 shadow-xs flex items-center justify-center relative mb-1"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-white drop-shadow-sm" />}
                </div>
                <span className="truncate max-w-[54px] text-slate-600 font-medium">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Direct Factory Bulk Support Note */}
      <div className="pt-4 border-t border-slate-100 bg-slate-50 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
        <div className="flex items-center gap-1 text-slate-800 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Custom Masterbatches</span>
        </div>
        <p className="leading-tight text-slate-500">
          Orders &gt;100 units can be cast in custom institutional Pantone / corporate brand shades.
        </p>
      </div>

    </div>
  );
}
