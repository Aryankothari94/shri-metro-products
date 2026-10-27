import React, { useState, useEffect, useRef } from 'react';
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
  Palette,
  Upload,
  Camera
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ImageUploadPicker from '../common/ImageUploadPicker';
import { compressImageFile } from '../../utils/imageUtils';

export default function ProductModalForm({ isOpen, onClose, productToEdit, onSave }) {
  const { categories } = useData();

  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'specs' | 'colors' | 'media' | 'visibility'
  const galleryFileRef = useRef(null);

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

  const prevIsOpenRef = useRef(false);
  const prevEditIdRef = useRef(null);

  useEffect(() => {
    const isNowOpen = Boolean(isOpen);
    const wasOpen = prevIsOpenRef.current;
    const currentEditId = productToEdit?.id || null;
    const prevEditId = prevEditIdRef.current;

    // Only re-initialize form data when the modal transitions from closed to open,
    // or when the specific product being edited changes.
    // This strictly prevents infinite re-render loops and keeps SKU/modelCode completely stable.
    if (isNowOpen && (!wasOpen || currentEditId !== prevEditId)) {
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
      } else {
        // Generate a single stable SKU code only once when opening the modal for a new product
        const stableSku = `SMP-NEW-${Math.floor(100 + Math.random() * 900)}`;
        setFormData({
          name: '',
          modelCode: stableSku,
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
      }
      setImageError(false);
      setActiveTab('basic');
    }

    prevIsOpenRef.current = isNowOpen;
    prevEditIdRef.current = currentEditId;
  }, [isOpen, productToEdit]);

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

  // Gallery handler: direct device upload
  const handleGalleryDeviceUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      const results = await Promise.all(
        files.map(f => compressImageFile(f, { maxWidth: 1000, maxHeight: 1000, quality: 0.85 }))
      );
      const newUrls = results.map(r => r.dataUrl);
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, ...newUrls]
      }));
    } catch (err) {
      alert('Failed to upload gallery images: ' + err.message);
    }
    if (galleryFileRef.current) galleryFileRef.current.value = '';
  };

  // Swatch photo direct upload handler
  const handleSwatchPhotoUpload = async (index, file) => {
    if (!file) return;
    try {
      const res = await compressImageFile(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.85 });
      handleColorChange(index, 'image', res.dataUrl);
    } catch (err) {
      alert('Failed to process swatch photo: ' + err.message);
    }
  };

  // Gallery handler: add by URL
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
    <div className="fixed inset-0 z-50 bg-[#111827]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-[#111827] overflow-hidden my-auto animate-fadeIn">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5E7EB] bg-[#F5F6F8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-50 border border-red-200 text-[#A30D20] flex items-center justify-center font-bold text-sm shrink-0">
              {productToEdit ? '✎' : '+'}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-extrabold text-[#111827] tracking-tight truncate">
                {productToEdit ? `Edit Product: ${productToEdit.name}` : 'Add New Moulded Product'}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#64748B] font-medium truncate">
                {productToEdit ? `Updating Model SKU: ${productToEdit.modelCode}` : 'Create an active product in the factory catalog'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 bg-white border-b border-[#E5E7EB] overflow-x-auto text-xs font-semibold">
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
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-50 text-[#A30D20] border border-red-200/80 font-bold'
                  : 'text-[#64748B] hover:text-[#111827] hover:bg-[#F5F6F8] border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content Area */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Product Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Metro Royal Elegance Armchair"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Model Code / SKU *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SMP-CHR-901A"
                    value={formData.modelCode}
                    onChange={(e) => setFormData({ ...formData, modelCode: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] font-mono placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c.id || c.name} value={c.name} className="bg-white text-[#111827]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Subcategory / Series
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Banquet Armchair / Commercial Series"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">
                  Tagline / Highlights
                </label>
                <input
                  type="text"
                  placeholder="e.g. Heavy-duty ergonomic banquet chair with reinforced ribbing"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Technical description of the mould design, lumbar comfort, and commercial suitability..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Dimensions (L × W × H)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. L: 580mm x W: 560mm x H: 880mm"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Net Weight (kg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2.95 kg ± 2%"
                    value={formData.netWeight}
                    onChange={(e) => setFormData({ ...formData, netWeight: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
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
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Polymer / Material Grade
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Virgin Polypropylene"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Surface & Finish Technology
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Matte Rattan Grain & Gloss Trim (UV Stabilized)"
                    value={formData.materialFinish}
                    onChange={(e) => setFormData({ ...formData, materialFinish: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Moulding Technology
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Single-Piece Gas Assist Injection Mould"
                    value={formData.mouldTech}
                    onChange={(e) => setFormData({ ...formData, mouldTech: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">
                    Commercial Warranty
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Year Commercial Replacement"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                </div>
              </div>

              {/* Stackability Settings */}
              <div className="bg-[#F5F6F8] p-4 rounded-xl border border-[#E5E7EB] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#111827]">Stackable Nesting Capability</p>
                    <p className="text-[11px] text-[#64748B] font-medium">Can multiple units of this product be stacked for storage?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isStackable}
                      onChange={(e) => setFormData({ ...formData, isStackable: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A30D20]"></div>
                  </label>
                </div>

                {formData.isStackable && (
                  <div className="pt-2 border-t border-[#E5E7EB]">
                    <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
                      Maximum Stacking Limit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Up to 8 Units Nested"
                      value={formData.stackabilityLimit}
                      onChange={(e) => setFormData({ ...formData, stackabilityLimit: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827]"
                    />
                  </div>
                )}
              </div>

              {/* Recommended Environments */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#111827] block">
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
                          ? 'bg-red-50 text-[#A30D20] border-red-200/80 font-bold'
                          : 'bg-[#F5F6F8] text-[#64748B] border-[#E5E7EB] hover:bg-slate-200'
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
                  <h4 className="text-xs font-extrabold text-[#111827] flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-[#A30D20]" />
                    <span>Dynamic Color Finish Swatches ({formData.colors.length})</span>
                  </h4>
                  <p className="text-[11px] text-[#64748B] font-medium">
                    Add custom color variations so clients can select their factory finish.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Color</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.colors.map((color, index) => (
                  <div key={index} className="bg-[#F5F6F8] border border-[#E5E7EB] p-3.5 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          title="Click to pick hex color"
                        />
                        <span className="font-mono text-xs text-[#64748B] uppercase">{color.hex}</span>
                      </div>

                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Color Finish Name (e.g. Teak Wood, Marble Beige)"
                          value={color.name}
                          onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        disabled={formData.colors.length <= 1}
                        className="p-1.5 rounded-lg text-[#64748B] hover:text-[#A30D20] hover:bg-red-50 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Delete swatch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] text-[#64748B] font-semibold block">
                          Finish Photo (Swaps card photo on customer swatch tap)
                        </label>
                        <label className="inline-flex items-center gap-1 text-[10px] text-[#A30D20] font-bold cursor-pointer hover:underline">
                          <Upload className="w-3 h-3" />
                          <span>Choose Photo from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleSwatchPhotoUpload(index, f);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        {color.image && (
                          <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] shrink-0 overflow-hidden flex items-center justify-center p-0.5">
                            <img src={color.image} alt={color.name} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <input
                          type="text"
                          placeholder="Device photo selected or enter image URL..."
                          value={color.image || ''}
                          onChange={(e) => handleColorChange(index, 'image', e.target.value)}
                          className="flex-1 px-3 py-1 bg-white border border-[#E5E7EB] rounded-lg text-[11px] text-[#111827] font-mono"
                        />
                        {color.image && (
                          <button
                            type="button"
                            onClick={() => handleColorChange(index, 'image', '')}
                            className="p-1 text-[#64748B] hover:text-[#A30D20] text-[10px] font-bold"
                            title="Remove swatch photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & IMAGE PREVIEW */}
          {activeTab === 'media' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Primary Image: Direct Device Photo Selection + Card Arrangement */}
              <ImageUploadPicker
                value={formData.image}
                onChange={(img) => setFormData(prev => ({ ...prev, image: img }))}
                label="Primary Product Photograph"
                sublabel="Select photo directly from your device (phone / PC). It will be optimized automatically and permanently saved to the product card."
                required={true}
              />

              {/* Additional Gallery Photos */}
              <div className="space-y-3 pt-3 border-t border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-[#111827] block">
                      Additional Showcase & Angle Photos ({formData.gallery.length})
                    </label>
                    <p className="text-[11px] text-[#64748B]">Add alternative angles, banquet setups, or close-ups directly from device.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => galleryFileRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-[#E5E7EB] text-xs font-bold text-[#111827] cursor-pointer shadow-2xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#A30D20]" />
                    <span>Upload from Device</span>
                  </button>
                  <input
                    ref={galleryFileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryDeviceUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Or paste secondary web image URL..."
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-4 py-2 bg-[#F5F6F8] hover:bg-slate-200 text-[#111827] font-bold text-xs rounded-xl border border-[#E5E7EB] cursor-pointer transition-colors"
                  >
                    Add URL
                  </button>
                </div>

                {formData.gallery.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-1">
                    {formData.gallery.map((imgUrl, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-[#E5E7EB] h-20 bg-white shadow-2xs flex items-center justify-center p-1">
                        <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-[#A30D20] text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                          title="Remove image"
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
              <div className="bg-white border border-[#E5E7EB] rounded-xl divide-y divide-[#E5E7EB]">
                
                {/* Active / Hidden */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#111827]">Product Active (Visible on Public Website)</p>
                    <p className="text-[11px] text-[#64748B]">If unchecked, this product will be hidden from catalog and searches.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#15803D]"></div>
                  </label>
                </div>

                {/* Homepage Featured */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#A30D20]" />
                      <span>Show on Homepage Hero / Flagship Carousel</span>
                    </p>
                    <p className="text-[11px] text-[#64748B]">Featured products appear in the Hero 3D studio and flagship lookbooks.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A30D20]"></div>
                  </label>
                </div>

                {/* Best Seller Badge */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#111827]">Mark as High-Demand Best Seller</p>
                    <p className="text-[11px] text-[#64748B]">Highlights this item with a Best Seller badge on catalog cards.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
                  </label>
                </div>

              </div>
            </div>
          )}

          {/* Footer Save & Cancel Buttons */}
          <div className="pt-4 border-t border-[#E5E7EB] flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#F5F6F8] hover:bg-slate-200 text-[#111827] text-xs font-bold cursor-pointer transition-colors border border-[#E5E7EB] text-center"
            >
              Cancel
            </button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-95"
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
