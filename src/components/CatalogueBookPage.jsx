import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Grid, 
  ShieldCheck, 
  Layers, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag, 
  SlidersHorizontal
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { companyDetails } from '../data/companyData';

// Duration of one full page turn (keep in sync with --flip-ms on the stage)
const FLIP_MS = 1000;

const useMediaQuery = (query, fallback = false) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : fallback
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
};

export default function CatalogueBookPage({ onBackToDashboard, onAddToQuoteList }) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [viewMode, setViewMode] = useState('book'); // 'book' | 'grid'
  const [flip, setFlip] = useState(null); // { dir: 'next' | 'prev', to: number } – desktop 3D turn
  const [mobileAnim, setMobileAnim] = useState(null); // simple turn on small screens
  const [orderQuantity, setOrderQuantity] = useState(50);
  const [addedId, setAddedId] = useState(null);

  const isDesktop = useMediaQuery('(min-width: 768px)', true);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const flipTimer = useRef(null);
  const mobileTimer = useRef(null);
  const toastTimer = useRef(null);

  // Available categories with counts
  const categories = [
    { name: "All Categories", count: productsData.length },
    { name: "Plastic Chairs (Armrest)", count: productsData.filter(p => p.category === "Plastic Chairs (Armrest)").length },
    { name: "Plastic Chairs (Armless)", count: productsData.filter(p => p.category === "Plastic Chairs (Armless)").length },
    { name: "Center Tables", count: productsData.filter(p => p.category === "Center Tables").length },
    { name: "Dining Tables", count: productsData.filter(p => p.category === "Dining Tables").length },
    { name: "Stools", count: productsData.filter(p => p.category === "Stools").length },
    { name: "Patlas", count: productsData.filter(p => p.category === "Patlas").length },
  ];

  const filteredProducts = selectedCategory === "All Categories" 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);

  // Reset to first page whenever the category changes (cancel any in-flight turn)
  useEffect(() => {
    clearTimeout(flipTimer.current);
    setFlip(null);
    setCurrentIndex(0);
    setActiveColorIdx(0);
  }, [selectedCategory]);

  // Clear timers on unmount
  useEffect(() => () => {
    clearTimeout(flipTimer.current);
    clearTimeout(mobileTimer.current);
    clearTimeout(toastTimer.current);
  }, []);

  const currentProduct = filteredProducts[currentIndex] || filteredProducts[0];
  const targetProduct = flip ? filteredProducts[flip.to] : null;
  const displayIndex = flip ? flip.to : currentIndex;

  const getColor = (product, idx) =>
    product?.colors?.[idx] || product?.colors?.[0] || { name: "Standard", hex: "#9B111E", image: product?.image };

  /* ---------------- Page turning ---------------- */
  const turnTo = (to) => {
    if (flip || mobileAnim) return;
    if (to === currentIndex || to < 0 || to >= filteredProducts.length) return;
    const dir = to > currentIndex ? 'next' : 'prev';

    // Reduced motion: switch instantly
    if (prefersReducedMotion) {
      setCurrentIndex(to);
      setActiveColorIdx(0);
      return;
    }

    // Small screens: pages are stacked, so use a lighter single-sheet turn
    if (!isDesktop) {
      setMobileAnim(dir);
      setActiveColorIdx(0);
      setCurrentIndex(to);
      mobileTimer.current = setTimeout(() => setMobileAnim(null), 450);
      return;
    }

    // Desktop: real two-sided sheet turning on the spine
    setFlip({ dir, to });
    flipTimer.current = setTimeout(() => {
      setCurrentIndex(to);
      setActiveColorIdx(0);
      setFlip(null);
    }, FLIP_MS);
  };

  const handleNextPage = () => turnTo(currentIndex + 1);
  const handlePrevPage = () => turnTo(currentIndex - 1);

  // Jump without animation (used when coming from the grid index)
  const openPageDirect = (idx) => {
    clearTimeout(flipTimer.current);
    setFlip(null);
    setCurrentIndex(idx);
    setActiveColorIdx(0);
    setViewMode('book');
  };

  // Keyboard navigation (← →)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'book') return;
      if (e.key === 'ArrowRight') handleNextPage();
      else if (e.key === 'ArrowLeft') handlePrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  /* ---------------- Quote actions ---------------- */
  const handleAddQuote = (product, color) => {
    if (!onAddToQuoteList || !product) return;
    onAddToQuoteList({
      id: `${product.id}-${color.name}`,
      productId: product.id,
      name: product.name,
      modelCode: product.modelCode,
      category: product.category,
      color: color.name,
      colorHex: color.hex,
      image: color.image || product.image,
      quantity: orderQuantity,
      dimensions: product.dimensions,
      weightCapacity: product.weightCapacity
    });
    setAddedId(product.id);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setAddedId(null), 2500);
  };

  const buildWhatsAppLink = (product, color) => {
    const text = encodeURIComponent(
      `Hello Shri Metro Products, I am reviewing the Product Catalogue for ${product.name} (${product.modelCode}), Finish: ${color.name}, Quantity: ${orderQuantity} units. Please provide wholesale pricing and dispatch terms.`
    );
    return `https://api.whatsapp.com/send/?phone=${companyDetails.whatsappNumber}&text=${text}`;
  };

  /* =========================================================
     PAGE RENDERERS
     The same page markup is used for the static spread and for
     the front/back faces of the turning sheet.
     ========================================================= */
  const renderLeftPage = (product, colorIdx, interactive) => {
    const color = getColor(product, colorIdx);
    const pageIdx = filteredProducts.indexOf(product);

    return (
      <div className="relative h-full w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col p-5 lg:p-6 select-none">
        {/* Inner gutter shading near the spine */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-900/[0.07] to-transparent pointer-events-none" />

        {/* Model watermark */}
        <div className="absolute top-5 right-7 text-slate-200/80 font-black text-2xl lg:text-3xl tracking-widest pointer-events-none">
          {product.modelCode}
        </div>

        {/* Badges */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/70 text-[11px] font-bold">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
              ★ Flagship Series
            </span>
          )}
        </div>

        {/* Product photography */}
        <div className="relative flex-1 min-h-[260px] md:min-h-0 my-4">
          <img 
            src={color.image || product.image} 
            alt={product.name}
            key={color.image || product.image}
            draggable="false"
            className="absolute inset-0 w-full h-full object-contain p-3 drop-shadow-md"
          />
          <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs text-[10px] font-bold text-slate-800">
            <ShieldCheck className="w-3 h-3 text-red-600" />
            <span>{product.loadCapacityKg} Tested</span>
          </div>
          <div className="absolute bottom-2 left-2 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs text-[10px] font-bold text-slate-800">
            <Layers className="w-3 h-3 text-slate-700" />
            <span>{product.stackabilityLimit}</span>
          </div>
        </div>

        {/* Finish selector */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Factory Finish:</span>
            <span className="font-bold text-slate-900 text-xs">{color.name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors?.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                tabIndex={interactive ? 0 : -1}
                onClick={interactive ? () => setActiveColorIdx(idx) : undefined}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                  interactive ? 'cursor-pointer' : 'cursor-default'
                } ${
                  colorIdx === idx 
                    ? 'border-red-600 bg-red-50 text-slate-900 font-bold shadow-2xs' 
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <span 
                  className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[11px] truncate">{c.name}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>PAGE {String(pageIdx * 2 + 1).padStart(2, '0')}</span>
            <span>SHRI METRO WORKS • KUMBALGODU</span>
          </div>
        </div>
      </div>
    );
  };

  const renderRightPage = (product, colorIdx, interactive) => {
    const color = getColor(product, colorIdx);
    const pageIdx = filteredProducts.indexOf(product);
    const justAdded = addedId === product.id;

    return (
      <div className="relative h-full w-full bg-white flex flex-col p-5 lg:p-6 select-none">
        {/* Inner gutter shading near the spine */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-900/[0.07] to-transparent pointer-events-none" />

        <div className="relative flex-1 min-h-0 flex flex-col gap-4">
          {/* Header */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">
              {product.modelCode}
            </span>
            <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>

          {/* Technical specifications */}
          <div className="border border-slate-200/90 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200/90 font-bold text-slate-800 text-[11px] flex items-center justify-between">
              <span>TECHNICAL BENCHMARK</span>
              <span className="text-emerald-700 font-mono text-[10px]">ISO VIRGIN PP</span>
            </div>
            <div className="divide-y divide-slate-100 text-[11px]">
              {[
                ['Dimensions', product.dimensions],
                ['Net Product Weight', product.netWeight],
                ['Load Capacity', `${product.loadCapacityKg} Static Tested`, true],
                ['Material Finish', product.materialFinish],
                ['Moulding Tech', product.mouldTech],
                ['Suitability', product.suitableEnvironments],
              ].map(([label, value, highlight]) => (
                <div key={label} className="flex items-center justify-between gap-4 px-3 py-1.5">
                  <span className="text-slate-500 shrink-0">{label}</span>
                  <span className={`truncate text-right ${highlight ? 'font-bold text-red-600' : 'font-semibold text-slate-800'}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Wholesale order box */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-3 mt-auto">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Wholesale Order Quantity:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  tabIndex={interactive ? 0 : -1}
                  onClick={interactive ? () => setOrderQuantity(prev => Math.max(25, prev - 25)) : undefined}
                  className="w-6 h-6 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-black text-red-600 w-12 text-center text-sm">
                  {orderQuantity}
                </span>
                <button
                  type="button"
                  tabIndex={interactive ? 0 : -1}
                  onClick={interactive ? () => setOrderQuantity(prev => prev + 25) : undefined}
                  className="w-6 h-6 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                tabIndex={interactive ? 0 : -1}
                onClick={interactive ? () => handleAddQuote(product, color) : undefined}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-red-300" />
                <span>{justAdded ? '✓ Added to Cart' : 'Add to Quote'}</span>
              </button>
              <a
                href={buildWhatsAppLink(product, color)}
                target="_blank"
                rel="noreferrer"
                tabIndex={interactive ? 0 : -1}
                className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>PAGE {String(pageIdx * 2 + 2).padStart(2, '0')}</span>
          <span className="font-mono">GSTIN: {companyDetails.gstin}</span>
        </div>
      </div>
    );
  };

  /* ---------------- Compose the spread ---------------- */
  // Static layer under the turning sheet:
  //  next → left stays current, right already shows the upcoming page
  //  prev → left already shows the previous page, right stays current
  const baseLeft = flip?.dir === 'prev'
    ? renderLeftPage(targetProduct, 0, false)
    : renderLeftPage(currentProduct, activeColorIdx, !flip);

  const baseRight = flip?.dir === 'next'
    ? renderRightPage(targetProduct, 0, false)
    : renderRightPage(currentProduct, activeColorIdx, !flip);

  // Turning sheet faces
  const sheetFront = flip
    ? (flip.dir === 'next'
        ? renderRightPage(currentProduct, activeColorIdx, false)
        : renderLeftPage(currentProduct, activeColorIdx, false))
    : null;

  const sheetBack = flip
    ? (flip.dir === 'next'
        ? renderLeftPage(targetProduct, 0, false)
        : renderRightPage(targetProduct, 0, false))
    : null;

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < filteredProducts.length - 1;

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Catalogue navigation bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Dashboard</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span>/</span>
              <span className="font-semibold text-slate-800">Official Product Catalogue</span>
            </div>
          </div>

          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setViewMode('book')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'book' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>Book View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-slate-600" />
              <span>Grid Index</span>
            </button>
          </div>

          <a
            href={companyDetails.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm shadow-red-500/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp Factory Desk</span>
          </a>
        </div>
      </header>

      {/* 2. Category strip */}
      <section className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Categories:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-red-600 text-white shadow-xs font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/70'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`ml-1.5 text-[10px] px-1.5 rounded-full ${
                selectedCategory === cat.name ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center">
        
        {viewMode === 'book' ? (
          <div className="w-full max-w-5xl space-y-5">
            
            {/* Progress line */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{selectedCategory}</span>
                <span>•</span>
                <span>
                  Model <strong className="text-slate-800">{displayIndex + 1}</strong> of <strong className="text-slate-800">{filteredProducts.length}</strong>
                </span>
              </div>
              <span className="hidden sm:inline text-[11px] text-slate-400">
                {flip ? 'Turning page…' : 'Click the page corner or use ← → keys to turn'}
              </span>
            </div>

            {/* ================= DESKTOP: 3D BOOK ================= */}
            <div className="relative hidden md:block">
              <div 
                className={`book-stage relative h-[580px] ${flip ? 'pointer-events-none' : ''}`}
                style={{ '--flip-ms': `${FLIP_MS}ms` }}
              >
                {/* Soft floor shadow */}
                <div className="absolute -bottom-6 left-10 right-10 h-12 bg-slate-900/25 blur-2xl rounded-full pointer-events-none" />

                {/* Stacked paper edges (shows remaining pages on each side) */}
                <div 
                  className="book-edge absolute top-2 bottom-2 rounded-l-md pointer-events-none"
                  style={{ left: `-${Math.min(3 + currentIndex * 2, 12)}px`, width: `${Math.min(3 + currentIndex * 2, 12)}px` }}
                />
                <div 
                  className="book-edge absolute top-2 bottom-2 rounded-r-md pointer-events-none"
                  style={{ 
                    right: `-${Math.min(3 + (filteredProducts.length - 1 - currentIndex) * 2, 12)}px`, 
                    width: `${Math.min(3 + (filteredProducts.length - 1 - currentIndex) * 2, 12)}px` 
                  }}
                />

                {/* Static spread */}
                <div className="absolute inset-0 grid grid-cols-2 rounded-2xl shadow-2xl shadow-slate-900/10">
                  {/* Left page */}
                  <div className="relative overflow-hidden rounded-l-2xl border border-r-0 border-slate-200/90 bg-white">
                    {baseLeft}
                    {flip?.dir === 'next' && (
                      // Sheet landing on the left page casts a growing shadow
                      <div className="cast-shadow cast-shadow-cover bg-gradient-to-l from-slate-900/30 via-slate-900/10 to-transparent" />
                    )}
                    {flip?.dir === 'prev' && (
                      // Previous page revealed from under the lifting sheet
                      <div className="cast-shadow cast-shadow-reveal bg-gradient-to-l from-slate-900/35 via-slate-900/10 to-transparent" />
                    )}
                    {!flip && canPrev && (
                      <button type="button" onClick={handlePrevPage} className="page-curl page-curl-prev" aria-label="Turn to previous page" title="Previous page" />
                    )}
                  </div>

                  {/* Right page */}
                  <div className="relative overflow-hidden rounded-r-2xl border border-l-0 border-slate-200/90 bg-white">
                    {baseRight}
                    {flip?.dir === 'next' && (
                      <div className="cast-shadow cast-shadow-reveal bg-gradient-to-r from-slate-900/35 via-slate-900/10 to-transparent" />
                    )}
                    {flip?.dir === 'prev' && (
                      <div className="cast-shadow cast-shadow-cover bg-gradient-to-r from-slate-900/30 via-slate-900/10 to-transparent" />
                    )}
                    {!flip && canNext && (
                      <button type="button" onClick={handleNextPage} className="page-curl page-curl-next" aria-label="Turn to next page" title="Next page" />
                    )}
                  </div>
                </div>

                {/* Binding crease */}
                <div className="book-spine absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 z-20 pointer-events-none" />

                {/* The turning sheet */}
                {flip && (
                  <div
                    key={`${flip.dir}-${flip.to}`}
                    className={`page-flipper absolute top-0 bottom-0 w-1/2 z-30 ${
                      flip.dir === 'next' ? 'left-1/2 animate-page-turn-next' : 'left-0 animate-page-turn-prev'
                    }`}
                    aria-hidden="true"
                  >
                    {/* Front face */}
                    <div className={`page-face shadow-xl ${flip.dir === 'next' ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}>
                      {sheetFront}
                      <div className={`flip-shade flip-shade-front ${
                        flip.dir === 'next'
                          ? 'bg-gradient-to-r from-slate-900/5 via-slate-900/20 to-slate-900/40'
                          : 'bg-gradient-to-l from-slate-900/5 via-slate-900/20 to-slate-900/40'
                      }`} />
                      <div className="flip-sheen" />
                    </div>

                    {/* Back face */}
                    <div className={`page-face page-face-back shadow-xl ${flip.dir === 'next' ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}>
                      {sheetBack}
                      <div className={`flip-shade flip-shade-back ${
                        flip.dir === 'next'
                          ? 'bg-gradient-to-l from-slate-900/5 via-slate-900/20 to-slate-900/40'
                          : 'bg-gradient-to-r from-slate-900/5 via-slate-900/20 to-slate-900/40'
                      }`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Side turn buttons */}
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={!canPrev || !!flip}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-7 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 transition-all z-40 ${
                  !canPrev ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-red-600 hover:text-white hover:border-red-600 hover:scale-110 active:scale-95'
                }`}
                aria-label="Previous model"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={!canNext || !!flip}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-7 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 transition-all z-40 ${
                  !canNext ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-red-600 hover:text-white hover:border-red-600 hover:scale-110 active:scale-95'
                }`}
                aria-label="Next model"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* ================= MOBILE: STACKED PAGES ================= */}
            <div className="md:hidden perspective-1000">
              <div className={`bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden ${
                mobileAnim === 'next' ? 'animate-book-flip-next' : mobileAnim === 'prev' ? 'animate-book-flip-prev' : ''
              }`}>
                <div className="border-b border-slate-200">{renderLeftPage(currentProduct, activeColorIdx, true)}</div>
                <div>{renderRightPage(currentProduct, activeColorIdx, true)}</div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={!canPrev}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={!canNext}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-bold disabled:opacity-40"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4. Model index strip */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs mt-8">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  All Models in this Category ({filteredProducts.length})
                </span>
                <span className="text-slate-400 text-[11px]">Click to turn to page</span>
              </div>
              <div className="flex gap-2 overflow-x-auto py-1">
                {filteredProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => turnTo(idx)}
                    className={`flex items-center gap-2 p-1.5 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                      displayIndex === idx 
                        ? 'border-red-600 bg-red-50 ring-1 ring-red-500/30' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-10 h-10 object-cover rounded-lg bg-white border border-slate-200"
                    />
                    <div className="pr-2">
                      <p className="text-[11px] font-bold text-slate-900 truncate max-w-[120px]">{p.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">{p.modelCode}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* ================= GRID INDEX ================= */
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{selectedCategory}</h2>
                <p className="text-xs text-slate-500">
                  Showing all {filteredProducts.length} models manufactured at Kumbalgodu Unit
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('book')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open in Book View</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-red-200 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        {product.modelCode}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">{product.loadCapacityKg} Tested</span>
                    </div>
                    <div className="h-48 py-2 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-40 object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{product.tagline}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-3 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Net Weight:</span>
                        <span className="font-semibold">{product.netWeight}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Stacking:</span>
                        <span className="font-semibold">{product.stackabilityLimit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openPageDirect(idx)}
                      className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-center"
                    >
                      Open Book Page →
                    </button>
                    <a
                      href={buildWhatsAppLink(product, getColor(product, 0))}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-2xs"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
