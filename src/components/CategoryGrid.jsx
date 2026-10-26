import React from 'react';
import { Layers, ArrowRight, Check } from 'lucide-react';
import { categoriesData } from '../data/categoriesData';

export default function CategoryGrid({ onSelectCategory, selectedCategory }) {
  const handleCategorySelect = (categoryFilter) => {
    onSelectCategory(categoryFilter);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-slate-50/60 border-b border-slate-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Product Categories
            </span>
            <span className="text-xs text-slate-400">• Click to Filter</span>
          </div>

          <button
            onClick={() => handleCategorySelect("All Products")}
            className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
          >
            Show All 10 Models
          </button>
        </div>

        {/* 5 Minimal Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categoriesData.map((cat) => {
            const isSelected = selectedCategory === cat.filterValue;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.filterValue)}
                className={`group rounded-xl p-3.5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-red-500 ring-2 ring-red-500/15 shadow-xs'
                    : 'bg-white hover:bg-red-50/20 border-slate-200/80 hover:border-red-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      {cat.count}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-red-600 transition-colors leading-tight">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-red-600">
                  <span>Filter View</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
