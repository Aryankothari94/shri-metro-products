import React from 'react';
import { 
  SunMedium, 
  ShieldCheck, 
  Layers, 
  Weight, 
  Check, 
  X,
  FileCheck2
} from 'lucide-react';

export default function WhyChooseUs() {
  const benchmarks = [
    {
      title: "100% Virgin Polypropylene",
      spec: "Polymer Grade: Prime Granules",
      desc: "Strictly virgin PP resin without brittle post-consumer recycled scraps or chalk fillers."
    },
    {
      title: "200 kg Certified Load",
      spec: "Hydraulic Deflection Tested",
      desc: "Reinforced rib geometry prevents stress crack failures under continuous commercial banquet seating."
    },
    {
      title: "UV Stabilized Chemistry",
      spec: "Tropical Sun & Weather Shield",
      desc: "Formulated to prevent color fading, chalking, and environmental stress cracking."
    },
    {
      title: "Stacking Draft Engineering",
      spec: "Up to 20 Units Interlocking",
      desc: "Engineered nesting angles reduce storage footprint by 80% and simplify logistics."
    }
  ];

  const comparisonRows = [
    {
      parameter: "Polymer Raw Material",
      shriMetro: "100% First-Grade Virgin Polypropylene",
      generic: "Reground recycled scrap + calcium chalk"
    },
    {
      parameter: "Load Bearing Tolerance",
      shriMetro: "180 kg – 200 kg tested static load",
      generic: "Fails above 80 kg; brittle snapping hazard"
    },
    {
      parameter: "Outdoor Sun Resistance",
      shriMetro: "UV Hindered Amine Stabilizers (HALS)",
      generic: "Zero UV stabilizers; bleaches white in weeks"
    },
    {
      parameter: "Commercial Invoicing",
      shriMetro: "Direct GST Invoice with Input Tax Credit",
      generic: "Unorganized cash market with no warranty"
    }
  ];

  return (
    <section id="why-us" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Manufacturing & Quality Benchmarks
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Tested at Kumbalgodu Plant
          </span>
        </div>

        {/* 4 Clean Benchmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {benchmarks.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors"
            >
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                0{idx + 1} • Benchmark
              </div>
              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] font-semibold text-brand-primary mt-0.5 mb-2">
                {item.spec}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Clean Minimal Comparison Table */}
        <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
            Material Grade Comparison: Shri Metro vs Generic Commercial Market
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider bg-slate-50/30">
                  <th className="py-2.5 px-4 font-bold">Standard Parameter</th>
                  <th className="py-2.5 px-4 font-bold text-slate-900 bg-blue-50/40">SHRI METRO SPECIFICATION</th>
                  <th className="py-2.5 px-4 font-bold text-slate-500">Generic Market Plastic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {row.parameter}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 bg-blue-50/20 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{row.shriMetro}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      <div className="flex items-center gap-2">
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{row.generic}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
