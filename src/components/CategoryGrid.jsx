import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { categoriesData } from '../data/categoriesData';

export default function CategoryGrid({ onSelectCategory }) {
  const handleCategorySelect = (categoryFilter) => {
    onSelectCategory(categoryFilter);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-brand-primary text-xs font-bold tracking-wider uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Manufacturing Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Explore By Product Category
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-xl">
              Precision moulded commercial & residential plastic furniture, tested for heavy continuous daily load.
            </p>
          </div>

          <button
            onClick={() => handleCategorySelect("All Products")}
            className="text-xs sm:text-sm font-bold text-brand-primary hover:text-blue-700 flex items-center gap-1 self-start md:self-auto group cursor-pointer"
          >
            <span>View All Products (10)</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.filterValue)}
              className="group relative bg-brand-bg rounded-2xl overflow-hidden border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-brand-primary/40 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden bg-slate-200">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                
                {/* Count Badge */}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm">
                  {cat.count}
                </span>

                {/* Category title overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-base leading-tight group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-brand-primary mb-1">
                    {cat.tagline}
                  </p>
                  <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-brand-primary transition-colors">
                  <span>Explore Models</span>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-700 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-xs">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
