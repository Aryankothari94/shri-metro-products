import React from 'react';
import { 
  MessageCircle, 
  Eye, 
  Layers, 
  Weight, 
  Maximize2
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function SpecTableView({ products, onQuickView, onViewDetails }) {
  const { company: companyDetails } = useData();
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs">
      
      {/* Table Control Header */}
      <div className="px-5 py-3 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          <span className="font-bold text-slate-900">Wholesale Technical Specification Register</span>
          <span className="text-slate-300">•</span>
          <span className="text-red-600 font-mono text-[11px] font-semibold">{products.length} models listed</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Material Standard: 100% Virgin Polypropylene
        </div>
      </div>

      {/* Desktop & Tablet Table Element */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-4">Model Code & Item</th>
              <th className="py-2.5 px-4">Category</th>
              <th className="py-2.5 px-4 font-mono">Dimensions</th>
              <th className="py-2.5 px-4">Load Tested</th>
              <th className="py-2.5 px-4">Stacking Limit</th>
              <th className="py-2.5 px-4">Colors</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const whatsappUrl = `https://wa.me/${companyDetails.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20please%20send%20wholesale%20quotation%20for%20${encodeURIComponent(product.name)}%20(Model%3A%20${product.modelCode}).`;

              return (
                <tr 
                  key={product.id}
                  className="hover:bg-red-50/20 transition-colors group"
                >
                  {/* Model & Name */}
                  <td className="py-3 px-4 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div 
                        onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                        className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 group-hover:border-red-200 overflow-hidden shrink-0 cursor-pointer flex items-center justify-center p-0.5 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80 inline-block whitespace-nowrap">
                          {product.modelCode}
                        </span>
                        <button
                          onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                          className="font-bold text-slate-900 hover:text-red-600 transition-colors text-left text-xs line-clamp-1 block cursor-pointer mt-0.5"
                        >
                          {product.name}
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                    <span className="text-[11px] font-medium">
                      {product.category}
                    </span>
                  </td>

                  {/* Dimensions */}
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-700">
                    {product.dimensions}
                  </td>

                  {/* Load Tested */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-red-700 text-[11px] bg-red-50 px-2 py-0.5 rounded border border-red-200/80">
                      {product.weightCapacity}
                    </span>
                  </td>

                  {/* Stacking Limit */}
                  <td className="py-3 px-4 whitespace-nowrap text-slate-600 text-[11px]">
                    {product.stackingLimit}
                  </td>

                  {/* Colors */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 flex-wrap max-w-[100px]">
                      {product.colors.map((c, i) => (
                        <span
                          key={i}
                          title={c.name}
                          className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                        className="px-2.5 py-1 rounded-md bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Specs
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-xs shadow-red-500/20"
                      >
                        <MessageCircle className="w-3 h-3 text-white" />
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

      {/* Mobile Vertical Spec Cards View (< 640px) */}
      <div className="sm:hidden divide-y divide-slate-100">
        {products.map((product) => {
          const whatsappUrl = `https://wa.me/${companyDetails.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20please%20send%20wholesale%20quotation%20for%20${encodeURIComponent(product.name)}%20(Model%3A%20${product.modelCode}).`;

          return (
            <div key={product.id} className="p-4 space-y-3 bg-white">
              <div className="flex items-start gap-3">
                <div 
                  onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                  className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/80 px-1.5 py-0.2 rounded">
                      {product.modelCode}
                    </span>
                    <span className="text-[10px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">
                      {product.weightCapacity}
                    </span>
                  </div>
                  <h4 
                    onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                    className="font-bold text-slate-900 text-xs mt-1 hover:text-red-600 transition-colors cursor-pointer truncate"
                  >
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Quick Spec Matrix */}
              <div className="bg-slate-50 rounded-lg p-2 text-[11px] grid grid-cols-2 gap-1.5 border border-slate-100">
                <div className="col-span-2 text-slate-600 font-mono text-[10px] flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{product.dimensions}</span>
                </div>
                <div className="text-slate-500 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{product.stackingLimit}</span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  {product.colors.map((c, i) => (
                    <span
                      key={i}
                      title={c.name}
                      className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => (onViewDetails ? onViewDetails(product) : onQuickView(product))}
                  className="py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center cursor-pointer"
                >
                  Full Specs
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3 h-3 text-white" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
