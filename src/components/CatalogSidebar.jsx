import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  Layers, 
  RotateCcw, 
  Check
} from 'lucide-react';

import { useData } from '../context/DataContext';

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
  const { categories: dynamicCategories } = useData();

  const categories = [
    { label: "All Products", value: "All Products" },
    ...dynamicCategories.map(c => ({ label: c.name, value: c.name }))
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-5">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Filters
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>



      {/* 2. Category List */}
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Category
        </label>
        <div className="space-y-0.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            const count = categoryCounts[cat.value] || 0;

            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white font-bold shadow-xs shadow-red-500/20'
                    : 'text-slate-600 hover:bg-red-50/40 hover:text-red-700 font-medium'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Stackable Only Toggle Switch */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-xs font-bold text-slate-800">Stackable Only</span>
          <span className="block text-[10px] text-slate-400">Space saving nested items</span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={stackableOnly}
          onClick={onToggleStackable}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            stackableOnly ? 'bg-red-600' : 'bg-slate-200'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
              stackableOnly ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 4. Color Swatches */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Available Shades
          </label>
          {selectedColor && (
            <button
              onClick={() => onSelectColor(null)}
              className="text-[10px] text-red-600 hover:text-red-700 font-semibold underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {colorOptions.map((color) => {
            const isSelected = selectedColor === color.name;

            return (
              <button
                key={color.name}
                type="button"
                title={`${color.name} (${color.count} models)`}
                onClick={() => onSelectColor(isSelected ? null : color.name)}
                className={`w-7 h-7 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-red-600 border-white scale-105'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && <Check className="w-3 h-3 text-white drop-shadow-sm" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Factory Direct Note */}
      <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 leading-tight">
        Custom container color runs available for orders &gt;100 units.
      </div>

    </div>
  );
}
