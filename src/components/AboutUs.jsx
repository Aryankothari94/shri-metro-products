import React from 'react';
import { 
  Building2, 
  Factory, 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  MapPin, 
  Phone,
  Sparkles,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Logo, { LogoIcon } from './Logo';

export default function AboutUs({ 
  onExploreCatalog, 
  onNavigateContact, 
  onOpenCatalogueBook 
}) {
  const { company } = useData();

  const metrics = [
    {
      metric: "2012",
      badge: "ESTABLISHED",
      label: "Industry Heritage",
      subtext: "Proudly serving the industry for over a decade",
      icon: Award,
      accent: "text-red-600 bg-red-50 border-red-100"
    },
    {
      metric: "2,000+",
      badge: "DAILY CAPACITY",
      label: "Pieces Per Day",
      subtext: "High-output automated injection moulding plant",
      icon: Factory,
      accent: "text-slate-800 bg-slate-50 border-slate-200"
    },
    {
      metric: "South India",
      badge: "MARKET REACH",
      label: "Regional Presence",
      subtext: "Strong network across Karnataka, TN, KL & AP/TS",
      icon: TrendingUp,
      accent: "text-red-600 bg-red-50 border-red-100"
    },
    {
      metric: "100%",
      badge: "RAW MATERIAL",
      label: "Virgin Polypropylene",
      subtext: "Tested 200 kg load capacity with UV weather shield",
      icon: ShieldCheck,
      accent: "text-slate-800 bg-slate-50 border-slate-200"
    }
  ];

  const pillars = [
    {
      icon: Users,
      title: "Understanding Requirements",
      description: "We believe our success comes from our customers. We listen attentively to wholesale dealers, tent house owners, banquet managers, and institutions to supply products that fit their exact operational needs."
    },
    {
      icon: Factory,
      title: "2,000+ Pieces / Day Capacity",
      description: "Equipped with heavy-tonnage precision moulding machinery at our Kumbalgodu, Bangalore factory, ensuring reliable, rapid fulfillment of bulk commercial consignments without dispatch delays."
    },
    {
      icon: CheckCircle2,
      title: "Consistent Quality Standard",
      description: "Formulated with 100% prime virgin polymers. Every chair, table, and stool undergoes strict structural validation, guaranteeing uniform strength, flawless surface finish, and true color fastness."
    },
    {
      icon: HeartHandshake,
      title: "Long-Term Trust & Partnership",
      description: "We don't just sell furniture; we build enduring partnerships. Transparent factory-gate pricing, honest delivery schedules, and dependable after-sales coordination have earned us client trust since 2012."
    }
  ];

  return (
    <section 
      id="about-section" 
      className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-24 border-t border-slate-200/80 scroll-mt-16 relative overflow-hidden"
    >
      {/* Subtle Ambient Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200/80 text-xs font-bold shadow-2xs tracking-wider uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-red-600" />
            <span>Bangalore Industrial Hub • Established 2012</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            About Us
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
            Bangalore-based manufacturer of high-quality moulded plastic furniture, proudly serving the industry since 2012.
          </p>
        </div>

        {/* 4 Key Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-red-50 group-hover:text-red-700 transition-colors">
                      {item.badge}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${item.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                    {item.metric}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                    {item.label}
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-snug">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content Split: Story & Brand Manifesto vs. Core Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12">
          
          {/* Left Column: Official Narrative & Quality Slogan Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Main Narrative Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <LogoIcon className="w-11 h-11 shadow-xs" />
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none">
                    SHRI METRO PRODUCTS
                  </h3>
                  <p className="text-xs text-red-600 font-bold uppercase tracking-wider mt-1">
                    Direct Manufacturer • Bangalore Works
                  </p>
                </div>
              </div>

              {/* Exact Provided Content In Styled Typography */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-slate-900">
                  SHRI METRO PRODUCTS is a Bangalore-based manufacturer of high-quality moulded plastic furniture, proudly serving the industry since 2012.
                </p>
                
                <p>
                  With a manufacturing capacity of <strong className="text-slate-900 font-bold">2,000+ pieces per day</strong> and a strong presence across the Southern Indian market, we combine manufacturing expertise with a commitment to quality, consistency and dependable service.
                </p>
                
                <p>
                  We believe our success comes from our customers. That’s why we focus on understanding their requirements, delivering reliable products, maintaining consistent quality and building long-term relationships based on trust.
                </p>
              </div>

              {/* Verified Quality & Factory Badges */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  100% Virgin Polymer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  200 kg Hydraulic Tested
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Direct Factory-Gate Rates
                </span>
              </div>
            </div>

            {/* Signature Brand Motto Card (Exact Content Highlight) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 border border-slate-800 shadow-md">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                    <span>Our Brand Promise</span>
                  </div>
                  <blockquote className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                    “SHRI METRO PRODUCTS — Quality you can rely on. Service you can trust.”
                  </blockquote>
                  <p className="text-xs text-slate-400 font-medium">
                    Led by Proprietor <strong className="text-slate-200">{company.proprietor}</strong> • Kumbalgodu, Bangalore
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Value Pillars Card Grid (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {pillars.map((pillar, pIdx) => {
              const PIcon = pillar.icon;
              return (
                <div 
                  key={pIdx}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <PIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Interactive Navigation & Action Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                Ready to partner with Bangalore's reliable furniture manufacturer?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct wholesale dispatches, commercial quotes, and dealer inquiries across South India.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {onExploreCatalog && (
              <button
                type="button"
                onClick={onExploreCatalog}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenCatalogueBook && (
              <button
                type="button"
                onClick={onOpenCatalogueBook}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200/80 text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-red-600" />
                <span>Digital Catalogue</span>
              </button>
            )}

            {onNavigateContact && (
              <button
                type="button"
                onClick={onNavigateContact}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>Contact Works</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
