import React from 'react';
import { Check } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function CategoryGrid({ onSelectCategory, selectedCategory }) {
  const { categories, activeProducts } = useData();

  const handleCategorySelect = (categoryName) => {
    const nextCategory = selectedCategory === categoryName ? "All Products" : categoryName;
    onSelectCategory(nextCategory);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Count active products per category
  const countForCategory = (cat) => {
    const subs = cat.subcategories || [];
    return activeProducts.filter(p =>
      p.category === cat.name || subs.includes(p.category)
    ).length;
  };

  const totalCount = activeProducts.length;

  return (
    <section className="bg-slate-50/50 border-b border-slate-200/80 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Product Categories
            </span>
          </div>

          {selectedCategory !== "All Products" && (
            <button
              onClick={() => handleCategorySelect("All Products")}
              className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              {`Reset to All (${totalCount} Models)`}
            </button>
          )}
        </div>

        {/* Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            const count = countForCategory(cat);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.name)}
                className={`group rounded-xl p-3 border transition-all duration-150 cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-red-500 ring-2 ring-red-500/15 shadow-xs'
                    : 'bg-white hover:bg-red-50/20 border-slate-200/80 hover:border-red-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full mb-1">
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    {count} Model{count !== 1 ? 's' : ''}
                  </span>
                  {isSelected && (
                    <span className="w-3.5 h-3.5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-2 h-2" />
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-red-600 transition-colors leading-tight">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
