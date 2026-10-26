import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  PlusCircle, 
  Check, 
  ShieldCheck, 
  Maximize2, 
  Weight, 
  Layers, 
  SunMedium, 
  Sparkles, 
  Truck, 
  Building2, 
  Copy, 
  Share2, 
  CheckCircle2, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ProductDetailPage({ 
  product, 
  onBack, 
  onAddToQuoteList 
}) {
  const { company: companyDetails } = useData();
  if (!product) return null;

  // 1. Color Switcher State
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Standard', hex: '#9B111E' });
  const [activeImage, setActiveImage] = useState(product.colors?.[0]?.image || product.image);

  // 2. Bulk Quantity Estimator State
  const [quantity, setQuantity] = useState(50);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle Color Switch
  const handleColorSelect = (colorObj) => {
    setSelectedColor(colorObj);
    if (colorObj.image) {
      setActiveImage(colorObj.image);
    }
  };

  // 3. Pre-formatted WhatsApp link generator
  // Exact text required:
  // "Hello SHRI METRO PRODUCTS, I am interested in [Product Name] ([Model Code]), Quantity: [Selected Quantity]. Please share bulk wholesale pricing."
  const formattedWhatsAppUrl = useMemo(() => {
    const message = `Hello SHRI METRO PRODUCTS, I am interested in ${product.name} (${product.modelCode}), Quantity: ${quantity} units (Color: ${selectedColor?.name || 'Standard'}). Please share bulk wholesale pricing.`;
    return `https://wa.me/${companyDetails.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [product, quantity, selectedColor]);

  // Handle Add to Bulk Quote List
  const handleAddToList = () => {
    onAddToQuoteList({
      id: `${product.id}-${selectedColor?.name || 'default'}`,
      productId: product.id,
      name: product.name,
      modelCode: product.modelCode,
      category: product.category,
      color: selectedColor?.name || 'Default',
      colorHex: selectedColor?.hex || '#1E40AF',
      image: activeImage,
      quantity: Number(quantity) || 25,
      dimensions: product.dimensions,
      weightCapacity: product.weightCapacity
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Quick preset quantities
  const presetQuantities = [25, 50, 100, 250, 500];

  return (
    <div className="bg-brand-bg py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-red-300 group-hover:bg-red-50 transition-colors shadow-xs">
              <ArrowLeft className="w-4 h-4 text-slate-700 group-hover:text-red-600" />
            </div>
            <span>Back to All Products</span>
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <span className="hover:text-red-600 cursor-pointer" onClick={onBack}>Catalogue</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">{product.category}</span>
            <span>/</span>
            <span className="font-mono text-slate-900 font-bold">{product.modelCode}</span>
          </nav>
        </div>

        {/* Main Product PDP Layout */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Interactive Product Visuals & Color Previews (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
              
              <div>
                {/* Main Image Box */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm aspect-square max-h-[480px] w-full flex items-center justify-center">
                  <img
                    src={activeImage}
                    alt={`${product.name} in ${selectedColor?.name}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-out"
                  />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isFeatured && (
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> FEATURED MODEL
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-mono shadow-md">
                      {product.modelCode}
                    </span>
                  </div>

                  {/* Active Selected Color Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 text-xs">
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                      style={{ backgroundColor: selectedColor?.hex }}
                    />
                    <span className="font-bold text-slate-800">
                      Active: {selectedColor?.name}
                    </span>
                  </div>

                  {/* Factory Material Guarantee Pill */}
                  <div className="absolute bottom-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md">
                    100% Virgin PP
                  </div>
                </div>

                {/* Color Thumbnail Row for Rapid Image Preview */}
                <div className="mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Select Color Finish To Preview Image:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {product.colors.map((color, idx) => {
                      const isSelected = selectedColor?.name === color.name;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleColorSelect(color)}
                          className={`p-1.5 rounded-xl border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                            isSelected
                              ? 'border-red-500 bg-red-50/60 ring-2 ring-red-500/25 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full border border-slate-300 shadow-xs flex items-center justify-center"
                            style={{ backgroundColor: color.hex }}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white drop-shadow-sm" />}
                          </div>
                          <span className="text-[10px] font-semibold text-slate-700 truncate max-w-full">
                            {color.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Manufacturing Plant Location Note */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-primary" />
                  Moulded at Kumbalgodu Unit
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-slate-600 hover:text-brand-primary transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Link Copied!" : "Share Model"}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Title, Interactive Color Switcher, Specs Table & WhatsApp Generator (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-7">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-red-600">
                    {product.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    GSTIN: {companyDetails.gstin}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-sm font-semibold text-amber-600 mt-1">
                  {product.tagline || `${product.weightCapacity} Heavy Duty Commercial Mould`}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* 1. INTERACTIVE COLOR SWITCHER */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Selected Shade:</span>
                    <strong className="text-red-600 font-bold">{selectedColor?.name}</strong>
                  </span>
                  <span className="text-xs text-slate-500">
                    {product.colors.length} Factory Available Colors
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleColorSelect(color)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-red-500 bg-red-50/70 shadow-sm ring-2 ring-red-500/20 text-slate-900 font-bold'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-slate-300 shadow-xs flex items-center justify-center shrink-0"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                        <span className="text-xs">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. TECHNICAL SPECIFICATIONS TABLE */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-red-600" />
                    <span>Technical Specifications</span>
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Direct Factory Tested
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-subtle">
                  <table className="w-full text-left text-xs border-collapse">
                    <tbody className="divide-y divide-slate-100">
                      
                      {/* Dimensions (L x W x H) */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-slate-500 w-2/5 flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Dimensions (L × W × H)</span>
                        </td>
                        <td className="py-2.5 px-4 font-mono font-bold text-slate-800">
                          {product.dimensions}
                        </td>
                      </tr>

                      {/* Net Weight */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-slate-500 flex items-center gap-1.5">
                          <Weight className="w-3.5 h-3.5 text-slate-400" />
                          <span>Net Weight</span>
                        </td>
                        <td className="py-2.5 px-4 font-bold text-slate-800">
                          {product.netWeight || "2.85 kg ± 2%"}
                        </td>
                      </tr>

                      {/* Load Capacity (kg) */}
                      <tr className="hover:bg-slate-50/80 transition-colors bg-amber-50/30">
                        <td className="py-2.5 px-4 font-semibold text-amber-900 flex items-center gap-1.5">
                          <Weight className="w-3.5 h-3.5 text-amber-600" />
                          <span>Load Capacity (kg)</span>
                        </td>
                        <td className="py-2.5 px-4 font-black text-amber-700 text-sm">
                          {product.loadCapacityKg || product.weightCapacity}
                        </td>
                      </tr>

                      {/* Material Finish */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-slate-500 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                          <span>Material Finish</span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-700 font-medium">
                          {product.materialFinish || "Matte & High Gloss UV Virgin Polypropylene"}
                        </td>
                      </tr>

                      {/* Stackability Limit */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-slate-500 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-slate-400" />
                          <span>Stackability Limit</span>
                        </td>
                        <td className={`py-2.5 px-4 font-bold ${product.isStackable ? 'text-emerald-700' : 'text-slate-600'}`}>
                          {product.stackabilityLimit || product.stackingLimit}
                        </td>
                      </tr>

                      {/* Suitable Environments (Indoor/Outdoor) */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-slate-500 flex items-center gap-1.5">
                          <SunMedium className="w-3.5 h-3.5 text-slate-400" />
                          <span>Suitable Environments</span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-700 font-medium">
                          {product.suitableEnvironments || "Indoor / Outdoor / Banquets / Verandas"}
                        </td>
                      </tr>

                      {/* Warranty */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-slate-500 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Commercial Warranty</span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-800 font-semibold">
                          {product.warranty}
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. BULK QUANTITY ESTIMATOR & WHATSAPP GENERATOR (Clean Dashboard Card) */}
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 text-slate-900 space-y-4 border border-slate-200/90 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block">
                      Wholesale B2B Estimator
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      Calculate Bulk Requirement
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/80 text-xs font-semibold self-start sm:self-auto font-mono">
                    MOQ: 25 Units
                  </span>
                </div>

                {/* Quantity Input & Preset Chips */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-600 font-semibold shrink-0">
                      Required Quantity:
                    </label>
                    <div className="relative w-36">
                      <input
                        type="number"
                        min="10"
                        step="5"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                        Units
                      </span>
                    </div>

                    {/* Quantity Tier Tag */}
                    <div className="text-xs text-slate-600 font-medium hidden sm:flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {quantity >= 500 ? "Container Slab" : quantity >= 100 ? "Wholesale Slab" : "Bulk Batch"}
                      </span>
                    </div>
                  </div>

                  {/* Preset Quick Chips */}
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-slate-400 text-[11px]">Presets:</span>
                    {presetQuantities.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantity(preset)}
                        className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-bold transition-all cursor-pointer ${
                          quantity === preset
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-red-50/50 hover:border-red-200'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generated WhatsApp message preview */}
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-[11px] text-slate-600 font-mono leading-relaxed">
                  <span className="text-slate-400 text-[10px] block mb-1 uppercase tracking-wider font-sans font-bold">
                    WhatsApp Message Preview:
                  </span>
                  "Hello SHRI METRO PRODUCTS, I am interested in <strong className="text-slate-900">{product.name}</strong> ({product.modelCode}), Quantity: <strong className="text-slate-900">{quantity} units</strong> (Color: {selectedColor?.name}). Please share bulk wholesale pricing."
                </div>

                {/* 4. ACTION BUTTONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Primary: Inquire via WhatsApp */}
                  <a
                    href={formattedWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/25 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-white shrink-0" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  {/* Secondary: Add to Bulk Quote List */}
                  <button
                    type="button"
                    onClick={handleAddToList}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-red-50/60 text-slate-800 hover:text-red-700 font-bold text-xs sm:text-sm border border-slate-200 hover:border-red-200 transition-all cursor-pointer shadow-2xs"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Added to Quote List!</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4 text-red-600" />
                        <span>Add to Bulk Quote List</span>
                      </>
                    )}
                  </button>

                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/80">
                  <span>Factory Gate Dispatch • Kumbalgodu Unit</span>
                  <span>GST Billing with ITC</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
