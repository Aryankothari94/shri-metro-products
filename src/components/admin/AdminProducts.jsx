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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
            <span>Product Catalog Inventory</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-50 text-[#A30D20] font-semibold border border-red-200/80">
              {products.length} Items Total
            </span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">
            Manage models, technical benchmarks, finish swatches, and live visibility across the public store.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5E7EB] p-4 rounded-2xl shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Product Name, Model Code (SKU), or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20] transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] font-medium focus:bg-white focus:outline-none focus:border-[#A30D20] cursor-pointer"
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
            className="px-3 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] font-medium focus:bg-white focus:outline-none focus:border-[#A30D20] cursor-pointer"
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
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            
            {/* Table Header */}
            <thead className="bg-[#F5F6F8] text-[#64748B] uppercase tracking-wider text-[10px] font-bold border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3.5 px-4">Thumbnail</th>
                <th className="py-3.5 px-4">Model & Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Technical Specs</th>
                <th className="py-3.5 px-4">Finishes</th>
                <th className="py-3.5 px-4">Status Badges</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isActive = product.isActive !== false;
                  return (
                    <tr 
                      key={product.id}
                      className={`hover:bg-[#F5F6F8]/70 transition-colors ${!isActive ? 'opacity-60 bg-[#F5F6F8]/30' : ''}`}
                    >
                      {/* 1. Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl bg-[#F5F6F8] border border-[#E5E7EB] p-1 flex items-center justify-center overflow-hidden shrink-0 group">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                          />
                        </div>
                      </td>

                      {/* 2. Model & Name */}
                      <td className="py-3 px-4 max-w-[220px]">
                        <span className="font-mono font-bold text-[#A30D20] bg-red-50 px-2 py-0.5 rounded border border-red-200/80 text-[10px] block w-fit mb-1">
                          {product.modelCode}
                        </span>
                        <p className="font-bold text-[#111827] text-xs truncate" title={product.name}>
                          {product.name}
                        </p>
                        <p className="text-[11px] text-[#64748B] truncate mt-0.5" title={product.tagline}>
                          {product.tagline || product.description}
                        </p>
                      </td>

                      {/* 3. Category & Subcategory */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5F6F8] border border-[#E5E7EB] text-[#111827] text-[11px] font-semibold">
                          {product.category}
                        </span>
                        {product.subcategory && (
                          <span className="block text-[10px] text-[#64748B] mt-1 font-medium">
                            {product.subcategory}
                          </span>
                        )}
                      </td>

                      {/* 4. Specs */}
                      <td className="py-3 px-4 text-[11px] space-y-0.5">
                        <p className="text-[#111827] font-medium truncate max-w-[160px]">{product.dimensions}</p>
                        <p className="text-[#A30D20] font-bold">{product.loadCapacityKg || product.weightCapacity}</p>
                        <p className="text-[10px] text-[#64748B]">{product.netWeight}</p>
                      </td>

                      {/* 5. Colors Swatches Preview */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap max-w-[120px]">
                          {product.colors?.map((c, idx) => (
                            <span
                              key={idx}
                              title={`${c.name} (${c.hex})`}
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs shrink-0 cursor-help"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                          <span className="text-[10px] text-[#64748B] font-mono font-medium">
                            ({product.colors?.length || 0})
                          </span>
                        </div>
                      </td>

                      {/* 6. Status Badges */}
                      <td className="py-3 px-4 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#15803D] text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-[#E5E7EB] text-[#64748B] text-[10px] font-bold">
                              Hidden
                            </span>
                          )}

                          {product.isFeatured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[#A30D20] text-[10px] font-bold">
                              <Sparkles className="w-2.5 h-2.5 text-[#A30D20]" />
                              Featured
                            </span>
                          )}

                          {product.isBestSeller && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
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
                                ? 'bg-white border-[#E5E7EB] text-[#64748B] hover:text-[#A30D20] hover:border-red-200'
                                : 'bg-red-50 border-red-200 text-[#A30D20] hover:bg-red-100'
                            }`}
                            title={isActive ? 'Hide from public site' : 'Make visible on public site'}
                          >
                            {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>

                          {/* Edit Product */}
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(product)}
                            className="p-1.5 rounded-lg bg-white hover:bg-[#F5F6F8] border border-[#E5E7EB] text-[#64748B] hover:text-[#111827] transition-colors cursor-pointer"
                            title="Edit technical specs and details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Product */}
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 rounded-lg bg-white hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 text-[#64748B] hover:text-[#A30D20] transition-colors cursor-pointer"
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
                  <td colSpan={7} className="py-12 text-center text-[#64748B]">
                    <p className="text-sm font-semibold">No products match your search or filter criteria.</p>
                    <p className="text-xs text-[#64748B]/70 mt-1">Try clearing filters or add a new product.</p>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Table Summary Footer */}
        <div className="bg-[#F5F6F8] px-4 py-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#64748B] font-medium">
          <span>Showing {filteredProducts.length} of {products.length} catalog items</span>
          <span className="font-mono text-[11px] text-[#64748B]/80">Reactive LocalStorage Engine Active</span>
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
