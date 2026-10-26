import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Award, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Play,
  RotateCcw,
  Sliders,
  Flame,
  Check,
  Eye,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { productsData } from '../data/productsData';

export default function Hero({ onExploreCatalog, onSwitchToTable }) {
  // Showcase chair (SMP-CHR-901A)
  const heroProduct = productsData[0];
  
  // Interactive Showcase States
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'specs'
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [loadTestedKg, setLoadTestedKg] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [quickOrderQty, setQuickOrderQty] = useState(50);
  
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

  // Run Hydraulic Stress Test Simulation
  const runStressTest = () => {
    if (isStressTesting) return;
    setActiveTab('studio');
    setIsStressTesting(true);
    setTestCompleted(false);
    setLoadTestedKg(0);

    const targetLoad = 200;
    const stepDuration = 25; // ms
    const totalSteps = 40;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const currentVal = Math.round(progress * targetLoad);
      setLoadTestedKg(currentVal);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setLoadTestedKg(targetLoad);
        setIsStressTesting(false);
        setTestCompleted(true);
        // Reset completed badge after 7 seconds
        setTimeout(() => {
          setTestCompleted(false);
        }, 7000);
      }
    }, stepDuration);
  };

  const currentColor = heroProduct.colors[activeColorIdx] || heroProduct.colors[0];

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200/80 py-8 sm:py-12 relative overflow-hidden">
      {/* Background Decorative Ambient Radial Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-rose-50/50 rounded-full blur-2xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Dashboard Interactive Split: Left Copy & Tools, Right 3D Visual Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Clean Executive Headlines & Interactive Fast Estimator */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Live Operational Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200/90 shadow-2xs text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-800 font-bold">Direct Factory Unit</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">Kumbalgodu Industrial Estate, Bangalore</span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
              Precision Moulded <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-600">
                Plastic Furniture.
              </span>
            </h1>

            {/* Subtitle with High-Value Highlights */}
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Engineered with <strong className="text-slate-900 font-bold">100% Virgin Polypropylene</strong> and stress-tested to <strong className="text-red-600 font-bold">200 kg hydraulic static load</strong>. Direct manufacturer rates for event caterers, banquet halls, restaurants, institutions, and B2B dealers across Karnataka.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm shadow-red-500/25 hover:shadow-md hover:shadow-red-500/35 cursor-pointer active:scale-95 group"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={runStressTest}
                disabled={isStressTesting}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                  isStressTesting 
                    ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse' 
                    : testCompleted
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200 shadow-2xs'
                }`}
              >
                <Zap className={`w-4 h-4 ${isStressTesting ? 'text-amber-600 animate-bounce' : testCompleted ? 'text-emerald-600' : 'text-red-600'}`} />
                <span>
                  {isStressTesting 
                    ? `Testing Hydraulic Load (${loadTestedKg} kg)...` 
                    : testCompleted 
                    ? '✓ 200 kg Stress Test Passed!' 
                    : 'Simulate 200kg Load Test'}
                </span>
              </button>
            </div>

            {/* Interactive Wholesale Quick Estimator Widget */}
            <div className="mt-4 pt-4 border-t border-slate-100 max-w-xl">
              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-red-600" />
                    <span>Quick Wholesale Dispatch Estimator:</span>
                  </span>
                  <span className="text-red-700 font-extrabold bg-white px-2 py-0.5 rounded border border-red-200/80">
                    {quickOrderQty} Units
                  </span>
                </div>

                {/* Interactive Slider & Presets */}
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min="25"
                    max="500"
                    step="25"
                    value={quickOrderQty}
                    onChange={(e) => setQuickOrderQty(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium">MOQ: 25 Units</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Ready for dispatch in 24 hrs
                    </span>
                    <span className="font-medium">500+ Bulk Die Lot</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Interactive 3D Showcase & Test Simulator */}
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
              className="relative bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-xl transition-shadow transform-style-preserve-3d"
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
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-t-2xl"></div>

              {/* Card Header & Studio Mode Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('studio')}
                    className={`px-3 py-1 rounded-md transition-all ${
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
                    className={`px-3 py-1 rounded-md transition-all ${
                      activeTab === 'specs' 
                        ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Factory Specs
                  </button>
                </div>

                <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-full">
                  SMP-CHR-901A
                </span>
              </div>

              {/* Mode 1: Interactive Product Studio View */}
              {activeTab === 'studio' ? (
                <div className="space-y-4 pt-2">
                  
                  {/* Floating Badges & Visual Stage */}
                  <div className="relative h-56 sm:h-64 rounded-xl bg-gradient-to-b from-slate-100/70 via-slate-50 to-white border border-slate-200/70 flex items-center justify-center overflow-hidden">
                    
                    {/* Floating Certification Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 animate-float-slow">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                        <span>200 kg Hydraulic Tested</span>
                      </div>
                    </div>

                    {/* Floating Material Badge */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 animate-float-reverse">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-800">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>100% Virgin PP</span>
                      </div>
                    </div>

                    {/* Hydraulic Stress Test Active Overlay */}
                    {isStressTesting && (
                      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-4">
                        <div className="w-full max-w-[200px] bg-white rounded-xl p-3 shadow-lg border border-slate-200 text-center space-y-2">
                          <div className="flex items-center justify-center gap-1 text-xs font-bold text-red-600">
                            <Activity className="w-4 h-4 animate-spin" />
                            <span>Hydraulic Static Test</span>
                          </div>
                          
                          <div className="text-3xl font-black text-slate-900 tracking-tight">
                            {loadTestedKg} <span className="text-xs font-bold text-slate-500">kg</span>
                          </div>

                          {/* Animated Progress Gauge */}
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-emerald-500 h-full transition-all duration-75"
                              style={{ width: `${(loadTestedKg / 200) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium">Measuring structural deflection...</p>
                        </div>
                      </div>
                    )}

                    {/* Stress Test Passed Banner */}
                    {testCompleted && (
                      <div className="absolute top-2.5 right-2.5 z-20 animate-bounce">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white shadow-md text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>200 kg PASS (Zero Crack)</span>
                        </div>
                      </div>
                    )}

                    {/* Main Interactive Chair Image */}
                    <img 
                      src={currentColor.image} 
                      alt={heroProduct.name}
                      key={currentColor.name}
                      className={`max-h-52 object-contain transition-all duration-300 drop-shadow-md ${
                        isStressTesting ? 'scale-95 brightness-95' : 'hover:scale-105'
                      }`}
                    />
                  </div>

                  {/* Interactive Color Switcher Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Colorway Finish:</span>
                      <span className="font-bold text-slate-900">{currentColor.name}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {heroProduct.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setActiveColorIdx(idx)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                            activeColorIdx === idx 
                              ? 'border-red-500 bg-red-50/50 shadow-2xs font-bold text-slate-900' 
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

        {/* Minimal Dashboard KPI Metrics Row with Micro-Animations & Progress Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/80">
          
          {/* KPI 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Tested Load</p>
              <Zap className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">200 kg</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Hydraulic static tolerance</p>
            {/* Visual Stress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-red-600 h-full w-full group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-rose-500 transition-all"></div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Material Grade</p>
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">100% Virgin</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Polypropylene granules</p>
            {/* Visual Purity Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-emerald-600 h-full w-full"></div>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Active Dies</p>
              <Layers className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">10+ Models</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Chairs, tables, stools, patlas</p>
            {/* Visual Active Mould Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-red-500 h-full w-full"></div>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">Invoicing</p>
              <Award className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">B2B GST</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Direct Input Tax Credit (ITC)</p>
            {/* Visual Compliance Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
              <div className="bg-slate-800 h-full w-full group-hover:bg-red-600 transition-colors"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
