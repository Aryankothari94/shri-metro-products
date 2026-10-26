import React from 'react';
import { 
  MessageCircle, 
  Eye, 
  ExternalLink, 
  Layers, 
  Weight, 
  Maximize2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function SpecTableView({ products, onQuickView, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle">
      {/* Wholesale Header Banner */}
      <div className="bg-slate-900 text-white px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold uppercase tracking-wider text-amber-400">
            Wholesale B2B Specification Comparison
          </span>
          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-slate-300 hidden md:inline">
            Direct Factory Dispatch • 100% Virgin Polypropylene
          </span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Showing {products.length} technical specifications
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Model & Product</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Dimensions (H×W×D)</th>
              <th className="py-3.5 px-4">Load Tested</th>
              <th className="py-3.5 px-4">Stacking Limit</th>
              <th className="py-3.5 px-4">Factory Colors</th>
              <th className="py-3.5 px-4 text-right">Wholesale Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const whatsappUrl = `https://wa.me/${companyDetails.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20please%20send%20wholesale%20quotation%20for%20${encodeURIComponent(product.name)}%20(Model%3A%20${product.modelCode}).`;

              return (
                <tr 
                  key={product.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Model & Name with Thumbnail */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div 
                        onClick={() => onQuickView(product)}
                        className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 cursor-pointer relative group/thumb"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-brand-primary block">
                          {product.modelCode}
                        </span>
                        <button
                          onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                          className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-left text-xs line-clamp-1 cursor-pointer"
                        >
                          {product.name}
                        </button>
                        {product.isFeatured && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200">
                      {product.category}
                    </span>
                  </td>

                  {/* Dimensions */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3 h-3 text-slate-400" />
                      <span>{product.dimensions}</span>
                    </div>
                  </td>

                  {/* Load Tested */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 inline-flex items-center gap-1">
                      <Weight className="w-3 h-3" />
                      <span>{product.weightCapacity}</span>
                    </span>
                  </td>

                  {/* Stacking Limit */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                      product.isStackable ? 'text-emerald-700' : 'text-slate-500'
                    }`}>
                      <Layers className="w-3 h-3" />
                      <span>{product.stackingLimit}</span>
                    </span>
                  </td>

                  {/* Colors */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 flex-wrap max-w-[120px]">
                      {product.colors.map((c, i) => (
                        <span
                          key={i}
                          title={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs inline-block"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Wholesale Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Specs
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Quote</span>
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Note */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
        <span>Raw Material: 100% Virgin Polypropylene (Zero Recycled Chalk)</span>
        <span>Standard Packaging: Protective Heavy Corrugated Bundles / Polythene Wrap</span>
      </div>
    </div>
  );
}
