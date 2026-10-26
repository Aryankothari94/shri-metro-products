import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  SlidersHorizontal,
  ChevronRight,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProductModalForm from './ProductModalForm';

export default function AdminProducts() {
  const { 
    products, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductVisibility,
    toggleProductFeatured 
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Hidden' | 'Featured' | 'BestSeller'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(q);
        const matchesCode = product.modelCode?.toLowerCase().includes(q);
        const matchesCat = product.category?.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Status Filter
      if (statusFilter === 'Active' && product.isActive === false) return false;
      if (statusFilter === 'Hidden' && product.isActive !== false) return false;
      if (statusFilter === 'Featured' && !product.isFeatured) return false;
      if (statusFilter === 'BestSeller' && !product.isBestSeller) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, statusFilter]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from the product database?`)) {
      deleteProduct(id);
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Product Catalog Inventory</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono border border-slate-700">
              {products.length} Items Total
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage models, technical benchmarks, finish swatches, and live visibility across the public store.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Product Name, Model Code (SKU), or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map(c => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active Only</option>
            <option value="Hidden">Hidden Only</option>
            <option value="Featured">Featured Only</option>
            <option value="BestSeller">Best Sellers</option>
          </select>
        </div>

      </div>

      {/* Interactive Products Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            {/* Table Header */}
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Thumbnail</th>
                <th className="py-3 px-4">Model & Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Technical Specs</th>
                <th className="py-3 px-4">Finishes</th>
                <th className="py-3 px-4">Status Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isActive = product.isActive !== false;
                  return (
                    <tr 
                      key={product.id}
                      className={`hover:bg-slate-800/40 transition-colors ${!isActive ? 'opacity-60 bg-slate-950/30' : ''}`}
                    >
                      {/* 1. Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 p-1 flex items-center justify-center overflow-hidden shrink-0 group">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                          />
                        </div>
                      </td>

                      {/* 2. Model & Name */}
                      <td className="py-3 px-4 max-w-[220px]">
                        <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 text-[10px] block w-fit mb-1">
                          {product.modelCode}
                        </span>
                        <p className="font-bold text-white text-xs truncate" title={product.name}>
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5" title={product.tagline}>
                          {product.tagline || product.description}
                        </p>
                      </td>

                      {/* 3. Category & Subcategory */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-medium">
                          {product.category}
                        </span>
                        {product.subcategory && (
                          <span className="block text-[10px] text-slate-400 mt-1">
                            {product.subcategory}
                          </span>
                        )}
                      </td>

                      {/* 4. Specs */}
                      <td className="py-3 px-4 text-[11px] space-y-0.5">
                        <p className="text-slate-300 font-medium truncate max-w-[160px]">{product.dimensions}</p>
                        <p className="text-red-400 font-semibold">{product.loadCapacityKg || product.weightCapacity}</p>
                        <p className="text-[10px] text-slate-500">{product.netWeight}</p>
                      </td>

                      {/* 5. Colors Swatches Preview */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap max-w-[120px]">
                          {product.colors?.map((c, idx) => (
                            <span
                              key={idx}
                              title={`${c.name} (${c.hex})`}
                              className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-xs shrink-0 cursor-help"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                          <span className="text-[10px] text-slate-500 font-mono">
                            ({product.colors?.length || 0})
                          </span>
                        </div>
                      </td>

                      {/* 6. Status Badges */}
                      <td className="py-3 px-4 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold">
                              Hidden
                            </span>
                          )}

                          {product.isFeatured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                              Featured
                            </span>
                          )}

                          {product.isBestSeller && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
                              Best Seller
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 7. Action Buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          
                          {/* Toggle Active Visibility */}
                          <button
                            type="button"
                            onClick={() => toggleProductVisibility(product.id)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-amber-400'
                                : 'bg-amber-950/40 border-amber-500/40 text-amber-400 hover:bg-amber-900/40'
                            }`}
                            title={isActive ? 'Hide from public site' : 'Make visible on public site'}
                          >
                            {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>

                          {/* Edit Product */}
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(product)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit technical specs and details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Product */}
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/80 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No products match your search or filter criteria.</p>
                    <p className="text-xs text-slate-500 mt-1">Try clearing filters or add a new product.</p>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Table Summary Footer */}
        <div className="bg-slate-950/60 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredProducts.length} of {products.length} catalog items</span>
          <span className="font-mono text-[11px]">Storage: Reactive LocalStorage Engine Active</span>
        </div>

      </div>

      {/* Product Add / Edit Modal Form */}
      <ProductModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productToEdit={editingProduct}
        onSave={handleSaveProduct}
      />

    </div>
  );
}
