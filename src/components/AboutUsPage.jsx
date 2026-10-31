import React from 'react';
import { 
  ArrowLeft, 
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
  HeartHandshake,
  MessageCircle,
  Truck,
  ExternalLink
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Logo, { LogoIcon } from './Logo';
import useSwipeGesture from '../hooks/useSwipeGesture';
import GestureBackIndicator from './common/GestureBackIndicator';

export default function AboutUsPage({ 
  onBackToDashboard, 
  onExploreCatalog, 
  onNavigateContact, 
  onOpenCatalogueBook 
}) {
  const { company } = useData();

  // Mobile edge-swipe gesture to navigate back
  const { gestureState, touchHandlers } = useSwipeGesture({
    onSwipeRight: onBackToDashboard,
    edgeOnly: true,
    edgeWidth: 80,
    threshold: 50,
  });

  const metrics = [
    {
      metric: "2012",
      badge: "ESTABLISHED",
      label: "Industry Heritage",
      subtext: "Proudly serving the furniture industry for over a decade",
      icon: Award,
      accent: "text-red-600 bg-red-50 border-red-100"
    },
    {
      metric: "2,000+",
      badge: "DAILY CAPACITY",
      label: "Pieces Per Day",
      subtext: "Heavy-tonnage automated injection moulding plant",
      icon: Factory,
      accent: "text-slate-800 bg-slate-50 border-slate-200"
    },
    {
      metric: "South India",
      badge: "MARKET PRESENCE",
      label: "Regional Reach",
      subtext: "Strong distribution network across KA, TN, KL, AP & TS",
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
      description: "We believe our success comes from our customers. We focus on deeply understanding the practical requirements of tent houses, banquet halls, wholesale dealers, caterers, and institutions to deliver furniture built for heavy daily use."
    },
    {
      icon: Factory,
      title: "2,000+ Pieces / Day Capacity",
      description: "Our high-tonnage precision injection moulding infrastructure at Kumbalgodu, Bangalore guarantees continuous high-volume production, ensuring reliable and rapid dispatch for bulk wholesale consignments without backlogs."
    },
    {
      icon: CheckCircle2,
      title: "Consistent Quality Standard",
      description: "Zero-compromise engineering using 100% prime virgin polypropylene. Each production run is validated for structural load bearing, flex resistance, uniform wall thickness, and all-weather UV stability."
    },
    {
      icon: HeartHandshake,
      title: "Long-Term Trust & Partnership",
      description: "We take pride in long-term relationships built on trust, transparent factory-gate pricing, dependable dispatch schedules, and honest service across Southern India since 2012."
    }
  ];

  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans"
      {...touchHandlers}
    >
      <GestureBackIndicator gestureState={gestureState} label="Back to Home" />

      {/* Top Breadcrumb & Return Bar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-red-600" />
            <span>Back to Dashboard</span>
          </button>

          {/* Breadcrumb Info */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="text-slate-600 hover:text-red-600 transition-colors cursor-pointer font-semibold"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-bold">About Us</span>
          </div>

          {/* Quick Direct Factory Desk CTA */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">Factory Desk:</span>
              <span>{company.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <main className="flex-1 pb-16 sm:pb-24">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white border-b border-slate-200/80 py-12 sm:py-16 lg:py-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100/25 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-rose-50/30 rounded-full blur-2xl pointer-events-none -z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200/80 text-xs font-bold shadow-2xs tracking-wider uppercase mb-3">
                <Building2 className="w-3.5 h-3.5 text-red-600" />
                <span>Direct Manufacturer • Kumbalgodu, Bangalore Works • Since 2012</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                About Us
              </h1>
              
              <p className="text-base sm:text-xl text-slate-600 mt-3 font-medium leading-relaxed">
                SHRI METRO PRODUCTS is a Bangalore-based manufacturer of high-quality moulded plastic furniture, proudly serving the industry since 2012.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Key Performance Metrics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-between group"
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
        </div>

        {/* Narrative & Value Pillars Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: Official Narrative & Brand Promise (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Main Narrative Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                  <LogoIcon className="w-12 h-12 shadow-xs" />
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                      SHRI METRO PRODUCTS
                    </h2>
                    <p className="text-xs text-red-600 font-bold uppercase tracking-wider mt-1">
                      Moulded Plastic Furniture Manufacturer • Bangalore
                    </p>
                  </div>
                </div>

                {/* Exact Provided Content */}
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

                {/* Quality Validation Badges */}
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
                <div className="relative z-10 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-red-400" />
                      <span>Our Official Motto</span>
                    </div>
                    <blockquote className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                      “SHRI METRO PRODUCTS — Quality you can rely on. Service you can trust.”
                    </blockquote>
                    <p className="text-xs text-slate-400 font-medium pt-1">
                      Proprietor <strong className="text-slate-200">{company.proprietor}</strong> • Kumbalgodu Works, Bangalore
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
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Manufacturing Infrastructure & Plant Coordination Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <Factory className="w-3.5 h-3.5 text-red-600" />
                  <span>Manufacturing Plant & Dispatch Center</span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  High-Output Injection Moulding Infrastructure
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  Located strategically in the Vaishno Devi Industrial Estate at Gerupalya, Kumbalgodu on the NH 275 expressway corridor in Bangalore, our plant is optimized for efficient raw resin processing, high-tonnage precision moulding, and direct freight dispatch across Karnataka, Tamil Nadu, Kerala, Andhra Pradesh, and Telangana.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Daily Output</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">2,000+ Units/Day</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Registered GSTIN</p>
                    <p className="text-xs font-mono font-bold text-slate-900 mt-0.5">{company.gstin}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Factory Head</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{company.proprietor}</p>
                  </div>
                </div>
              </div>

              {/* Plant Location & Direct Inquiries */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Factory Works Address</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {company.location?.siteNo}, {company.location?.estate}, {company.location?.area}, {company.location?.city} - {company.location?.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                  <a
                    href={`https://wa.me/${company.whatsappNumber}?text=Hello%20Shri%20Metro%20Products%2C%20I%20am%20interested%20in%20your%20products.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Factory Desk</span>
                  </a>

                  <a
                    href={company.location?.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700"
                  >
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>Open Kumbalgodu Works on Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Interactive Navigation & Action Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Ready to explore our industrial furniture collection?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Browse through monobloc chairs, dining tables, stools and patlas manufactured in Bangalore.
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
                  <span>Explore Catalog</span>
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
                  <span>Digital Lookbook</span>
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

      </main>
    </div>
  );
}
