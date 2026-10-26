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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Product Categories Engine</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono border border-slate-700">
              {categories.length} Categories Active
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Changes made here instantly sync with public navigation bars, filter sidebars, and catalogue lookbooks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
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
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Banner Image Preview */}
                <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 mb-3.5">
                  <img 
                    src={category.bannerImage || 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300 bg-slate-900/90 px-2 py-0.5 rounded-md border border-amber-500/30">
                      {count} Products Attached
                    </span>
                  </div>
                </div>

                {/* Category Title & Description */}
                <h3 className="font-extrabold text-white text-base tracking-tight group-hover:text-amber-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {category.description || 'Precision injection moulded commercial furniture line.'}
                </p>

                {/* Subcategories tags */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Subcategories:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {category.subcategories.map((sub, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80 text-[10px] font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  Sync: Live in Navbar & Filters
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(category)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Edit category"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(category)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/80 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 text-slate-100 animate-fadeIn">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Add New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banquet Chairs or Folding Tables"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Subcategories (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Banquet Armchair, Visitor Chair, Canteen Chair"
                  value={formData.subcategories}
                  onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-slate-500 block">Separate multiple subcategories with commas</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Category Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description for catalog lookbook banners..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black cursor-pointer shadow-md"
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
