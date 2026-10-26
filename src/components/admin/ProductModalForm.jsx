import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Layers, 
  Info, 
  SlidersHorizontal,
  Palette
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ProductModalForm({ isOpen, onClose, productToEdit, onSave }) {
  const { categories } = useData();

  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'specs' | 'colors' | 'media' | 'visibility'

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    modelCode: '',
    category: categories[0]?.name || 'Plastic Chairs (Armrest)',
    subcategory: '',
    tagline: '',
    description: '',
    dimensions: '',
    netWeight: '',
    loadCapacityKg: '200 kg',
    weightCapacity: '200 kg tested',
    material: '100% Virgin Polypropylene',
    materialFinish: 'Matte Finish with Textured Accent (UV Stabilized)',
    isStackable: true,
    stackabilityLimit: 'Up to 8 Units Nested',
    suitableEnvironments: 'Indoor / Outdoor / Banquets / Verandas',
    mouldTech: 'High-Pressure Gas-Assist Injection Mould',
    warranty: '1 Year Commercial Warranty',
    image: '',
    gallery: [],
    colors: [
      { name: 'Standard Red', hex: '#9B111E', image: '' },
      { name: 'Teak Wood', hex: '#5C3A21', image: '' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isActive: true
  });

  const [galleryInput, setGalleryInput] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        modelCode: productToEdit.modelCode || '',
        category: productToEdit.category || categories[0]?.name || 'Plastic Chairs (Armrest)',
        subcategory: productToEdit.subcategory || '',
        tagline: productToEdit.tagline || '',
        description: productToEdit.description || '',
        dimensions: productToEdit.dimensions || '',
        netWeight: productToEdit.netWeight || '',
        loadCapacityKg: productToEdit.loadCapacityKg || '200 kg',
        weightCapacity: productToEdit.weightCapacity || '200 kg tested',
        material: productToEdit.material || '100% Virgin Polypropylene',
        materialFinish: productToEdit.materialFinish || 'Matte Finish with Textured Accent',
        isStackable: productToEdit.isStackable !== false,
        stackabilityLimit: productToEdit.stackabilityLimit || 'Up to 8 Units Nested',
        suitableEnvironments: productToEdit.suitableEnvironments || 'Indoor / Outdoor / Banquets',
        mouldTech: productToEdit.mouldTech || 'High-Pressure Injection Mould',
        warranty: productToEdit.warranty || '1 Year Commercial Warranty',
        image: productToEdit.image || '',
        gallery: Array.isArray(productToEdit.gallery) ? productToEdit.gallery : [],
        colors: Array.isArray(productToEdit.colors) && productToEdit.colors.length > 0
          ? productToEdit.colors 
          : [{ name: 'Standard Finish', hex: '#9B111E', image: productToEdit.image || '' }],
        isFeatured: Boolean(productToEdit.isFeatured),
        isBestSeller: Boolean(productToEdit.isBestSeller),
        isActive: productToEdit.isActive !== false
      });
      setImageError(false);
    } else {
      // Default clean template for new product
      setFormData({
        name: '',
        modelCode: `SMP-NEW-${Math.floor(100 + Math.random() * 900)}`,
        category: categories[0]?.name || 'Plastic Chairs (Armrest)',
        subcategory: 'Commercial Series',
        tagline: 'Heavy-duty virgin polymer commercial furniture',
        description: 'Engineered for banquets, catering, institutes, and wholesale distribution.',
        dimensions: 'L: 550mm x W: 520mm x H: 850mm',
        netWeight: '2.85 kg',
        loadCapacityKg: '200 kg',
        weightCapacity: '200 kg static tested',
        material: '100% Virgin Polypropylene',
        materialFinish: 'Matte Rattan Grain & Gloss Trim (UV Stabilized)',
        isStackable: true,
        stackabilityLimit: 'Up to 8 Units Nested',
        suitableEnvironments: 'Indoor / Outdoor / Banquets / Verandas',
        mouldTech: 'Single-Piece Gas-Assist Injection Mould',
        warranty: '1 Year Replacement Warranty',
        image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80',
        gallery: [],
        colors: [
          { name: 'Teak Wood', hex: '#5C3A21', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80' },
          { name: 'Marble Beige', hex: '#EADCC9', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80' },
          { name: 'Jet Black', hex: '#18181B', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80' }
        ],
        isFeatured: false,
        isBestSeller: false,
        isActive: true
      });
      setImageError(false);
    }
  }, [productToEdit, categories, isOpen]);

  if (!isOpen) return null;

  // Environment checkboxes helper
  const envList = ['Indoor', 'Outdoor', 'Banquets', 'Catering', 'Garden', 'Verandas'];
  const currentEnvs = formData.suitableEnvironments.split('/').map(s => s.trim());

  const handleToggleEnv = (env) => {
    let updated;
    if (currentEnvs.includes(env)) {
      updated = currentEnvs.filter(e => e !== env);
    } else {
      updated = [...currentEnvs, env];
    }
    setFormData(prev => ({
      ...prev,
      suitableEnvironments: updated.join(' / ') || 'Indoor / Outdoor'
    }));
  };

  // Color Swatches handlers
  const handleColorChange = (index, field, value) => {
    const updated = [...formData.colors];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, colors: updated }));
  };

  const handleAddColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [
        ...prev.colors,
        { name: 'New Color', hex: '#9B111E', image: prev.image }
      ]
    }));
  };

  const handleRemoveColor = (index) => {
    if (formData.colors.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  // Gallery handler
  const handleAddGalleryImage = () => {
    if (!galleryInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, galleryInput.trim()]
    }));
    setGalleryInput('');
  };

  const handleRemoveGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.modelCode.trim()) {
      alert('Please fill in product name and model code.');
      return;
    }
    onSave({
      ...(productToEdit ? { id: productToEdit.id } : {}),
      ...formData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden my-auto animate-fadeIn">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              {productToEdit ? '✎' : '+'}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {productToEdit ? `Edit Product: ${productToEdit.name}` : 'Add New Moulded Product'}
              </h3>
              <p className="text-xs text-slate-400">
                {productToEdit ? `Updating Model SKU: ${productToEdit.modelCode}` : 'Create an active product in the factory catalog'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 px-6 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'basic', label: '1. Basic Info' },
            { id: 'specs', label: '2. Technical Specs' },
            { id: 'colors', label: '3. Color Swatches' },
            { id: 'media', label: '4. Media & Gallery' },
            { id: 'visibility', label: '5. Visibility & Badges' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content Area */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Product Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Metro Royal Elegance Armchair"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Model Code / SKU *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SMP-CHR-901A"
                    value={formData.modelCode}
                    onChange={(e) => setFormData({ ...formData, modelCode: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c.id || c.name} value={c.name} className="bg-slate-900 text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Subcategory / Series
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Banquet Armchair / Commercial Series"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Tagline / Highlights
                </label>
                <input
                  type="text"
                  placeholder="e.g. Heavy-duty ergonomic banquet chair with reinforced ribbing"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Technical description of the mould design, lumbar comfort, and commercial suitability..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Dimensions (L × W × H)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. L: 580mm x W: 560mm x H: 880mm"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Net Weight (kg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2.95 kg ± 2%"
                    value={formData.netWeight}
                    onChange={(e) => setFormData({ ...formData, netWeight: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Hydraulic Tested Load (kg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 200 kg"
                    value={formData.loadCapacityKg}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      loadCapacityKg: e.target.value,
                      weightCapacity: `${e.target.value} static tested`
                    })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Polymer / Material Grade
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Virgin Polypropylene"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Surface & Finish Technology
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Matte Rattan Grain & Gloss Trim (UV Stabilized)"
                    value={formData.materialFinish}
                    onChange={(e) => setFormData({ ...formData, materialFinish: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Moulding Technology
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Single-Piece Gas Assist Injection Mould"
                    value={formData.mouldTech}
                    onChange={(e) => setFormData({ ...formData, mouldTech: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Commercial Warranty
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Year Commercial Replacement"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Stackability Settings */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-200">Stackable Nesting Capability</p>
                    <p className="text-[11px] text-slate-400">Can multiple units of this product be stacked for storage?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isStackable}
                      onChange={(e) => setFormData({ ...formData, isStackable: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {formData.isStackable && (
                  <div className="pt-2 border-t border-slate-800">
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Maximum Stacking Limit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Up to 8 Units Nested"
                      value={formData.stackabilityLimit}
                      onChange={(e) => setFormData({ ...formData, stackabilityLimit: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                )}
              </div>

              {/* Recommended Environments */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Recommended Environments
                </label>
                <div className="flex flex-wrap gap-2">
                  {envList.map(env => (
                    <button
                      key={env}
                      type="button"
                      onClick={() => handleToggleEnv(env)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        currentEnvs.includes(env)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {currentEnvs.includes(env) ? '✓ ' : '+ '}
                      {env}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLOR SWATCHES */}
          {activeTab === 'colors' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-amber-400" />
                    <span>Dynamic Color Finish Swatches ({formData.colors.length})</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Add custom color variations so clients can select their factory finish.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Color</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.colors.map((color, index) => (
                  <div key={index} className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          title="Click to pick hex color"
                        />
                        <span className="font-mono text-xs text-slate-400 uppercase">{color.hex}</span>
                      </div>

                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Color Finish Name (e.g. Teak Wood, Marble Beige)"
                          value={color.name}
                          onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        disabled={formData.colors.length <= 1}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Delete swatch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-semibold block">
                        Swatch Specific Image URL (swaps thumbnail on swatch click)
                      </label>
                      <input
                        type="url"
                        placeholder="https://... (optional, falls back to primary image)"
                        value={color.image || ''}
                        onChange={(e) => handleColorChange(index, 'image', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-800/60 border border-slate-700/80 rounded-lg text-[11px] text-slate-300 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & IMAGE PREVIEW */}
          {activeTab === 'media' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Primary Image */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Primary Product Image URL *</span>
                  <span className="text-[11px] text-slate-400 font-normal">Direct CDN or Unsplash URL</span>
                </label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImageError(false);
                      }}
                      className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Real-time Visual Preview Box */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                    {formData.image && !imageError ? (
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        onError={() => setImageError(true)}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Visual Preview Box</p>
                    {imageError ? (
                      <p className="text-xs text-red-400 mt-0.5">⚠️ Unable to load image from URL. Please check the address.</p>
                    ) : formData.image ? (
                      <p className="text-xs text-emerald-400 mt-0.5">✓ Image loaded successfully</p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-0.5">Enter an image URL to preview the model</p>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1">Recommended aspect ratio: 1:1 or 4:3 with neutral background</p>
                  </div>
                </div>
              </div>

              {/* Additional Gallery URLs */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 block">
                  Additional Gallery Images
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Add secondary gallery image URL..."
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
                  >
                    Add to Gallery
                  </button>
                </div>

                {formData.gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {formData.gallery.map((imgUrl, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-700 h-20 bg-slate-900">
                        <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-contain p-1" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute top-1 right-1 p-1 rounded bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: VISIBILITY & BADGES */}
          {activeTab === 'visibility' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl divide-y divide-slate-800">
                
                {/* Active / Hidden */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Product Active (Visible on Public Website)</p>
                    <p className="text-[11px] text-slate-400">If unchecked, this product will be hidden from catalog and searches.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {/* Homepage Featured */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Show on Homepage Hero / Flagship Carousel</span>
                    </p>
                    <p className="text-[11px] text-slate-400">Featured products appear in the Hero 3D studio and flagship lookbooks.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* Best Seller Badge */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Mark as High-Demand Best Seller</p>
                    <p className="text-[11px] text-slate-400">Highlights this item with a Best Seller badge on catalog cards.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

              </div>
            </div>
          )}

          {/* Footer Save & Cancel Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{productToEdit ? 'Save & Update Product' : 'Publish Product to Catalog'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
