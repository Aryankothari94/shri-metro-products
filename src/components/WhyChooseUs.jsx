import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  SunMedium, 
  Award, 
  Sparkles,
  FileCheck2,
  Check, 
  X,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState(0);

  // 4 Top Visual Benchmark Pillars
  const visualPillars = [
    {
      metric: "200 kg",
      badge: "LOAD TOLERANCE",
      title: "Hydraulic Tested",
      desc: "Engineered rib structure withstands intense commercial banquet seating.",
      icon: Award
    },
    {
      metric: "100%",
      badge: "RAW RESIN",
      title: "Virgin Polypropylene",
      desc: "Zero recycled scrap or chalk. Maximum flexibility without brittle fracture.",
      icon: Sparkles
    },
    {
      metric: "UV+",
      badge: "COLOR-LOCK",
      title: "All-Weather Shield",
      desc: "Formulated with stabilizers to prevent sun bleaching and chalking.",
      icon: SunMedium
    },
    {
      metric: "20×",
      badge: "NESTING ANGLE",
      title: "Space Engineering",
      desc: "Precision interlocking draft angles reduce storage footprint by 80%.",
      icon: Layers
    }
  ];

  // Interactive Visual Comparison
  const comparisons = [
    {
      id: 'load',
      label: 'Load Capacity',
      icon: Award,
      headline: 'Extreme Hydraulic Pressure Tolerance',
      shriMetro: {
        metric: '200 kg',
        percent: 100,
        badge: 'Certified Benchmark',
        title: 'Zero Structural Fatigue',
        summary: 'Heavy-gauge internal load ribs and reinforced legs withstand continuous, intense banquet use without deformation.'
      },
      generic: {
        metric: '80 kg',
        percent: 40,
        badge: 'Market Risk',
        title: 'Snapping Hazard Above 80 kg',
        summary: 'Weak, hollowed-out plastic frames buckle and crack easily under sudden dynamic weight or uneven commercial surfaces.'
      }
    },
    {
      id: 'purity',
      label: 'Polymer Purity',
      icon: Sparkles,
      headline: '100% Virgin Resin vs Adulterated Scrap',
      shriMetro: {
        metric: '100% Virgin',
        percent: 100,
        badge: 'Prime Granules',
        title: 'High Tensile Resilience',
        summary: 'Moulded exclusively from first-grade virgin polypropylene. Absorbs impact and bending stress without micro-fissures.'
      },
      generic: {
        metric: '45% Fillers',
        percent: 45,
        badge: 'Chalk & Scraps',
        title: 'Brittle Calcium Adulteration',
        summary: 'Heavily mixed with calcium carbonate chalk and multi-cycle reground plastic to lower production costs, causing sudden failure.'
      }
    },
    {
      id: 'weather',
      label: 'Sun & Weather',
      icon: SunMedium,
      headline: 'Outdoor Tropical Climate Resistance',
      shriMetro: {
        metric: '5+ Years',
        percent: 100,
        badge: 'UV-Stabilized',
        title: 'Color & Gloss Lock',
        summary: 'Hindered Amine Light Stabilizers (HALS) actively prevent pigment bleaching, surface chalking, and UV embrittlement.'
      },
      generic: {
        metric: '< 30 Days',
        percent: 25,
        badge: 'Zero Protection',
        title: 'Rapid Sun Fading',
        summary: 'Lacks UV stabilizers. Turns chalky white, fades rapidly, and becomes dangerously brittle after brief tropical sun exposure.'
      }
    },
    {
      id: 'b2b',
      label: 'Commercial Invoicing',
      icon: FileCheck2,
      headline: 'Official B2B Compliance & Input Tax Credit',
      shriMetro: {
        metric: '100% ITC',
        percent: 100,
        badge: 'GST Registered',
        title: 'Official Commercial Billing',
        summary: 'Direct GST tax invoices with verified HSN 9403 and GSTIN (29AKZPJ1388F1ZH), enabling seamless business ITC claims.'
      },
      generic: {
        metric: '0% ITC',
        percent: 0,
        badge: 'Informal Cash',
        title: 'No Tax Deduction or Recourse',
        summary: 'Informal unorganized cash transactions with no valid business invoice, no warranty, and no manufacturer traceability.'
      }
    }
  ];

  const current = comparisons[activeTab];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean, Simple, Luxury White & Red Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span>The Quality Benchmark</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Engineered to Outlast Ordinary Furniture.
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base mt-2 leading-relaxed">
            Direct from our Kumbalgodu plant — virgin polymers, hydraulic load testing, and all-weather stabilizers built into every piece.
          </p>
        </div>

        {/* 4 Minimal Classy Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {visualPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-red-500/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                      {item.badge}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 group-hover:border-red-200 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                    {item.metric}
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm tracking-tight mb-2">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-2.5 border-t border-slate-100">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Unique Interactive Visual Comparison Studio */}
        <div className="bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-xs">
          
          {/* Top Bar: Section Title + Interactive Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
            <div>
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest block mb-0.5">
                Visual Comparison Studio
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Shri Metro Standard vs Ordinary Market
              </h3>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
              {comparisons.map((c, i) => {
                const Icon = c.icon;
                const isSelected = activeTab === i;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected 
                        ? 'bg-red-600 text-white shadow-sm shadow-red-600/30' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Comparison Display: Side-by-Side Visual Gauge Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Left: The Shri Metro Advantage (Clean White Card with Red Brand Identity) */}
            <div className="bg-white rounded-2xl p-4 sm:p-7 border-2 border-red-600/30 shadow-md flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                      SHRI METRO PRODUCTS
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/80 px-2.5 py-0.5 rounded-full">
                    {current.shriMetro.badge}
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="mb-4">
                  <span className="text-3xl sm:text-5xl font-black text-red-600 tracking-tight">
                    {current.shriMetro.metric}
                  </span>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    {current.shriMetro.title}
                  </p>
                </div>

                {/* Visual Scale Meter Bar */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Performance Rating</span>
                    <span className="font-bold text-red-600">{current.shriMetro.percent}% Maximum</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className="h-full bg-red-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${current.shriMetro.percent}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {current.shriMetro.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-red-600">
                <Check className="w-4 h-4 text-red-600 stroke-[3]" />
                <span>Verified by Kumbalgodu Works QA</span>
              </div>
            </div>

            {/* Right: Ordinary Commercial Market (Subtle Muted Clean Card) */}
            <div className="bg-white/70 rounded-2xl p-4 sm:p-7 border border-slate-200 flex flex-col justify-between text-slate-500">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="font-extrabold text-sm text-slate-500 tracking-tight">
                      Generic Market Plastic
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                    {current.generic.badge}
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="mb-4">
                  <span className="text-3xl sm:text-5xl font-black text-slate-400 tracking-tight">
                    {current.generic.metric}
                  </span>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {current.generic.title}
                  </p>
                </div>

                {/* Visual Scale Meter Bar */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span>Performance Rating</span>
                    <span className="font-bold text-slate-500">{current.generic.percent}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className="h-full bg-slate-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${current.generic.percent}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {current.generic.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-400">
                <X className="w-4 h-4 text-slate-400" />
                <span>Common commercial market drawback</span>
              </div>
            </div>

          </div>

          {/* Quick Switch Hint */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <span>Select tabs above to inspect</span>
            <span className="font-bold text-slate-700">Load</span>
            <span>•</span>
            <span className="font-bold text-slate-700">Purity</span>
            <span>•</span>
            <span className="font-bold text-slate-700">Sun & Weather</span>
            <span>•</span>
            <span className="font-bold text-slate-700">Invoicing</span>
          </div>

        </div>

      </div>
    </section>
  );
}
