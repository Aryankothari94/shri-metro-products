import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Award, 
  BookOpen
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Hero({ onExploreCatalog, onSwitchToTable, onOpenCatalogueBook }) {
  const { products, activeProducts, company } = useData();
  
  // Dynamic Showcase chair: prioritize featured item, or first active product
  const heroProduct = products.find(p => p.isFeatured && p.isActive !== false) || activeProducts[0] || products[0] || {
    name: 'Alexa Monobloc Armchair',
    modelCode: 'SMP-001',
    dimensions: 'H 890 X W 580 X D 450 mm',
    loadCapacityKg: '200 kg',
    stackabilityLimit: 'Up to 8 Units Nested',
    image: '/products/alexa.jpeg',
    colors: [{ name: 'Teak Wood', hex: '#4A2E18', image: '/products/alexa.jpeg' }]
  };
  
  // Interactive Showcase States
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'specs'
  
  // 3D Perspective Tilt on Mouse Movement
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle, elegant tilt limits
    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;
    
    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const currentColor = heroProduct?.colors?.[activeColorIdx] || heroProduct?.colors?.[0] || { 
    name: 'Standard Red', 
    hex: '#9B111E', 
    image: heroProduct?.image 
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 py-8 sm:py-12 bg-slate-100/50">
      {/* Furniture Studio Background - Visible at 0.45 opacity with subtle text contrast veil */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        <img 
          src="/hero-furniture-bg.jpg" 
          alt="Designer furniture collection" 
          style={{ opacity: 0.45 }}
          className="w-full h-full object-cover object-[center_35%] filter blur-[0.5px] scale-102 select-none"
        />
        {/* Subtle translucent veil: keeps background clearly visible while ensuring text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/25 to-transparent" />
      </div>

      {/* Background Decorative Ambient Radial Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-rose-50/20 rounded-full blur-2xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Dashboard Interactive Split: Left Copy & CTAs, Right 3D Visual Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Clean Executive Headlines & Direct Actions */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Live Operational Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200/90 shadow-2xs text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-800 font-bold">Direct Factory Unit</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">Kumbalgodu Industrial Area, Bangalore</span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.18] sm:leading-[1.15]">
              Precision Moulded <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-500">
                Plastic Furniture.
              </span>
            </h1>

            {/* Subtitle with High-Value Highlights */}
            <p className="text-slate-600 text-xs sm:text-base max-w-2xl leading-relaxed">
              Engineered with <strong className="text-slate-900 font-bold">100% Virgin Polypropylene</strong> and verified to <strong className="text-red-600 font-bold">200 kg hydraulic static load capacity</strong>. Direct manufacturer rates for event caterers, banquet halls, restaurants, institutions, and wholesale dealers.
            </p>

            {/* Reliable Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm shadow-red-600/25 hover:shadow-md cursor-pointer active:scale-95 group"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onOpenCatalogueBook}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-red-600" />
                <span>Open Digital Catalogue</span>
              </button>
            </div>

          </div>

          {/* Right Column: High-Impact Interactive 3D Showcase */}
          <div className="lg:col-span-5">
            <div 
              ref={cardRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isHovered 
                  ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)` 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
              }}
              className="relative bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-lg shadow-slate-900/5 hover:shadow-2xl transition-all transform-style-preserve-3d"
            >
              {/* Dynamic Specular Light Glare Overlay */}
              {isHovered && (
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.9) 0%, transparent 60%)`
                  }}
                />
              )}

              {/* Accent Top Border Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-700 via-red-600 to-red-700 rounded-t-2xl"></div>

              {/* Card Header & Studio Mode Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('studio')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'studio' 
                        ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Interactive 3D Studio
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('specs')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'specs' 
                        ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Factory Specs
                  </button>
                </div>

                <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-full">
                  {heroProduct?.modelCode || 'SMP-001'}
                </span>
              </div>

              {/* Mode 1: Interactive Product Studio View */}
              {activeTab === 'studio' ? (
                <div className="space-y-4 pt-2">
                  
                  {/* Floating Badges & Visual Stage */}
                  <div className="relative h-56 sm:h-64 rounded-xl bg-gradient-to-b from-slate-100/70 via-slate-50 to-white border border-slate-200/70 flex items-center justify-center overflow-hidden">
                    
                    {/* Floating Certification Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                        <span>200 kg Static Tested</span>
                      </div>
                    </div>

                    {/* Floating Material Badge */}
                    <div className="absolute bottom-2.5 right-2.5 z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-800">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>100% Virgin PP</span>
                      </div>
                    </div>

                    {/* Main Interactive Chair Image */}
                    <img 
                      src={currentColor.image || heroProduct.image || 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'} 
                      alt={heroProduct.name}
                      key={currentColor.name}
                      className="max-h-52 object-contain transition-transform duration-300 drop-shadow-md hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = heroProduct?.image || '/products/alexa.jpeg';
                      }}
                    />
                  </div>

                  {/* Interactive Color Switcher Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Colorway Finish:</span>
                      <span className="font-bold text-slate-900">{currentColor.name}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {heroProduct.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setActiveColorIdx(idx)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                            activeColorIdx === idx 
                              ? 'border-red-600 bg-red-50/50 shadow-2xs font-bold text-slate-900' 
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full shrink-0 border border-slate-300 shadow-2xs"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-[11px] truncate leading-tight">{color.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                /* Mode 2: Factory Technical Specs */
                <div className="space-y-3 pt-3">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 hover:bg-slate-50 px-2 rounded transition-colors">
                      <span className="text-slate-500">Moulding Technology</span>
                      <span className="font-bold text-slate-900">Gas-Assist Injection Mould</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 hover:bg-slate-50 px-2 rounded transition-colors">
                      <span className="text-slate-500">Polymer Density</span>
                      <span className="font-bold text-emerald-700">100% Virgin (0% Recycled Filler)</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 hover:bg-slate-50 px-2 rounded transition-colors">
                      <span className="text-slate-500">Dimensions (L × W × H)</span>
                      <span className="font-semibold text-slate-900">{heroProduct.dimensions}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 hover:bg-slate-50 px-2 rounded transition-colors">
                      <span className="text-slate-500">Stackability Limit</span>
                      <span className="font-semibold text-slate-900">{heroProduct.stackabilityLimit}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 hover:bg-slate-50 px-2 rounded transition-colors">
                      <span className="text-slate-500">Direct Plant Dispatch</span>
                      <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200/60">Kumbalgodu, Bangalore</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('studio')}
                      className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      ← Back to 3D Visual Studio
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Minimal Dashboard KPI Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-8 pt-6 border-t border-slate-200/80">
          
          {/* KPI 1 */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Tested Load</p>
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-black text-slate-900 mt-1">200 kg</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">Hydraulic static tolerance</p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-red-600 h-full w-full"></div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Material Grade</p>
                <Award className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-black text-slate-900 mt-1">100% Virgin</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">Polypropylene granules</p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-emerald-600 h-full w-full"></div>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Active Dies</p>
                <Layers className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-black text-slate-900 mt-1">10+ Models</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">Chairs, tables, stools</p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-red-500 h-full w-full"></div>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Invoicing</p>
                <Award className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-black text-slate-900 mt-1">B2B GST</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">Direct ITC Input Credit</p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-slate-800 h-full w-full group-hover:bg-red-600 transition-colors"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
