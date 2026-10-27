import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Layers, 
  Image as ImageIcon, 
  Check, 
  X, 
  AlertCircle,
  Tag
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ImageUploadPicker from '../common/ImageUploadPicker';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subcategories: '',
    description: '',
    bannerImage: ''
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      subcategories: '',
      description: '',
      bannerImage: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      subcategories: Array.isArray(category.subcategories) ? category.subcategories.join(', ') : '',
      description: category.description || '',
      bannerImage: category.bannerImage || ''
    });
    setModalOpen(true);
  };

  const handleDelete = (category) => {
    const associatedCount = products.filter(p => p.category === category.name).length;
    if (associatedCount > 0) {
      if (!window.confirm(`Warning: There are ${associatedCount} products under "${category.name}". Deleting this category will leave these products uncategorized. Do you still wish to proceed?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Are you sure you want to delete category "${category.name}"?`)) {
        return;
      }
    }
    deleteCategory(category.id || category.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      subcategories: formData.subcategories.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description.trim(),
      bannerImage: formData.bannerImage.trim() || 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'
    };

    if (editingCategory) {
      updateCategory(editingCategory.id || editingCategory.name, payload);
    } else {
      addCategory(payload);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
            <span>Product Categories Engine</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-50 text-[#A30D20] font-semibold border border-red-200/80">
              {categories.length} Categories Active
            </span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">
            Changes made here instantly sync with public navigation bars, filter sidebars, and catalogue lookbooks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => {
          const count = products.filter(p => p.category === category.name).length;
          return (
            <div 
              key={category.id || category.name}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:border-[#A30D20]/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Banner Image Preview */}
                <div className="relative h-28 rounded-xl overflow-hidden bg-[#F5F6F8] border border-[#E5E7EB] mb-3.5">
                  <img 
                    src={category.bannerImage || 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white bg-[#111827]/85 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/20 shadow-xs">
                      {count} Products Attached
                    </span>
                  </div>
                </div>

                {/* Category Title & Description */}
                <h3 className="font-extrabold text-[#111827] text-base tracking-tight group-hover:text-[#A30D20] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed line-clamp-2 font-medium">
                  {category.description || 'Precision injection moulded commercial furniture line.'}
                </p>

                {/* Subcategories tags */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1.5">
                      Subcategories:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {category.subcategories.map((sub, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#F5F6F8] text-[#111827] border border-[#E5E7EB] text-[10px] font-semibold"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-mono">
                  Sync: Live in Navbar & Filters
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(category)}
                    className="p-1.5 rounded-lg bg-white hover:bg-[#F5F6F8] border border-[#E5E7EB] text-[#64748B] hover:text-[#111827] transition-colors cursor-pointer"
                    title="Edit category"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(category)}
                    className="p-1.5 rounded-lg bg-white hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 text-[#64748B] hover:text-[#A30D20] transition-colors cursor-pointer"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111827]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-lg shadow-2xl p-6 text-[#111827] animate-fadeIn">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <h3 className="font-extrabold text-base text-[#111827]">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Add New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-[#64748B] hover:text-[#111827] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banquet Chairs or Folding Tables"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">
                  Subcategories (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Banquet Armchair, Visitor Chair, Canteen Chair"
                  value={formData.subcategories}
                  onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                />
                <span className="text-[10px] text-[#64748B] block font-medium">Separate multiple subcategories with commas</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">
                  Category Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description for catalog lookbook banners..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                />
              </div>

              <ImageUploadPicker
                value={formData.bannerImage}
                onChange={(img) => setFormData(prev => ({ ...prev, bannerImage: img }))}
                label="Category Showcase Banner"
                sublabel="Select photo directly from your device (phone / PC). Auto-optimized for public catalog headers."
                aspectRatio="banner"
              />

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F5F6F8] text-[#111827] text-xs font-bold hover:bg-slate-200 cursor-pointer transition-colors border border-[#E5E7EB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white text-xs font-bold cursor-pointer shadow-xs hover:shadow-sm transition-all"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
