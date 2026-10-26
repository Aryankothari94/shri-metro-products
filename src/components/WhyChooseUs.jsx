import React from 'react';
import { 
  SunMedium, 
  ShieldCheck, 
  Layers, 
  Weight, 
  Cpu, 
  Truck, 
  CheckCircle2, 
  XCircle,
  Sparkles
} from 'lucide-react';

export default function WhyChooseUs() {
  const qualityBadges = [
    {
      icon: SunMedium,
      title: "UV Stabilized & Weatherproof",
      subtitle: "Zero Color Fading",
      description: "Infused with specialized UV stabilizers that prevent brittleness, chalking, and color bleaching under harsh tropical sun and monsoon rains.",
      accent: "text-amber-500",
      bgAccent: "bg-amber-500/10",
      borderAccent: "border-amber-500/20"
    },
    {
      icon: ShieldCheck,
      title: "100% Virgin Polypropylene",
      subtitle: "Uncompromised Polymer Density",
      description: "We strictly use first-generation prime virgin PP granules without inferior post-consumer recycled fillers or heavy calcium carbonate powders.",
      accent: "text-blue-600",
      bgAccent: "bg-blue-500/10",
      borderAccent: "border-blue-500/20"
    },
    {
      icon: Layers,
      title: "Smart Stackable Engineering",
      subtitle: "Up to 20 Units Interlocking",
      description: "Designed for compact nesting. Maximize warehouse storage space and slash logistical freight costs for event caterers and tent-house rentals.",
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-500/10",
      borderAccent: "border-emerald-500/20"
    },
    {
      icon: Weight,
      title: "Heavy Load Tested",
      subtitle: "Up to 200 kg Structural Test",
      description: "Every model undergoes hydraulic load deflection tests and dynamic drop impact evaluations to ensure unmatched safety and zero frame bending.",
      accent: "text-rose-600",
      bgAccent: "bg-rose-500/10",
      borderAccent: "border-rose-500/20"
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Why Bangalore Chooses SHRI METRO PRODUCTS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Engineered with high-pressure precision injection moulds to deliver industrial-grade durability that lasts years without cracking or sagging.
          </p>
        </div>

        {/* 4 Core Quality Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {qualityBadges.map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={idx}
                className="bg-brand-bg rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${badge.bgAccent} ${badge.borderAccent} border flex items-center justify-center ${badge.accent} mb-4`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-primary mt-0.5 mb-2">
                    {badge.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Verified Factory Benchmark</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout: Shri Metro vs Generic Market Furniture */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-elevated border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Quality Comparison</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Not All Plastic Furniture Is Created Equal.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cheap market alternatives use reground brittle scraps and excessive calcium chalk fillers that snap within months. Shri Metro guarantees virgin polymers for life-long resilience.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Shri Metro Standard */}
              <div className="bg-slate-800/80 rounded-xl p-5 border border-emerald-500/30 relative">
                <span className="inline-block px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[11px] font-bold mb-3">
                  SHRI METRO FACTORY SPEC
                </span>
                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Virgin Polypropylene</strong> with high tensile strength</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Tested for <strong>180 kg - 200 kg</strong> static load without distortion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Reinforced rib spine prevents armrest snapped joints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Direct GST factory bill with authentic warranty</span>
                  </li>
                </ul>
              </div>

              {/* Ordinary Market Plastic */}
              <div className="bg-slate-800/40 rounded-xl p-5 border border-rose-500/20 relative">
                <span className="inline-block px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded text-[11px] font-bold mb-3">
                  GENERIC CHEAP PLASTIC
                </span>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Reground contaminated scrap plastic & heavy calcium chalk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Cracks under &gt;80 kg load; hazardous for guests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Discolors, fades white, and turns brittle in sunlight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Middleman trading markup with zero warranty backing</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
