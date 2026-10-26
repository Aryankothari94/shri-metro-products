# SHRI METRO PRODUCTS - Plastic Moulded Furniture Showcase

Official showcase and product catalogue web application for **SHRI METRO PRODUCTS**, premier manufacturer of heavy-duty moulded plastic furniture based in Bangalore, Karnataka.

## 🏭 Company Information
- **Manufacturer**: SHRI METRO PRODUCTS
- **Proprietor**: Rakesh R Jain
- **Contact / WhatsApp**: +91 9845287888
- **GSTIN**: 29AKZPJ1388F1ZH
- **Factory Works**: Site no: 10,11 Gerupalya, Vaishno Devi Industrial Estate, Kumbalgodu, Bangalore - 560074

## 🎨 Design System & Palette
- **Deep Slate Blue**: `#0F172A`
- **Royal Blue**: `#1E40AF`
- **Warm Industrial Gold/Amber**: `#F59E0B`
- **Soft Slate Background**: `#F8FAFC`

## 📦 Tech Stack
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v3.4 + PostCSS + Autoprefixer
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: Plus Jakarta Sans / Inter

## 🚀 Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📂 Project Structure
```
shri-metro-products/
├── public/
├── src/
│   ├── assets/
│   ├── data/
│   │   ├── categoriesData.js    # Visual categories with icons & taglines
│   │   ├── companyData.js       # Pre-loaded business details & WhatsApp links
│   │   └── productsData.js      # 10 mock products across 6 categories
│   ├── components/
│   │   ├── BulkQuoteDrawer.jsx  # Slide-over quote list drawer with bulk quantity & WhatsApp dispatch
│   │   ├── BulkQuoteModal.jsx   # Interactive B2B bulk inquiry dialog
│   │   ├── CatalogSidebar.jsx   # Search, category, stackable switch & color swatches
│   │   ├── CategoryGrid.jsx     # Visual cards for Chairs, Tables, Stools, Patlas
│   │   ├── ContactPage.jsx      # Factory works, Google Maps directions & interactive inquiry form
│   │   ├── FloatingInquiryButton.jsx# Permanent bottom-right wholesale inquiry cart trigger
│   │   ├── Footer.jsx           # Full contact, works directions & category links
│   │   ├── Hero.jsx             # High-impact industrial hero section
│   │   ├── Navbar.jsx           # Top announcement bar + sticky navigation + search
│   │   ├── OwnerContactCard.jsx # Rakesh R Jain executive contact & GSTIN badge
│   │   ├── ProductCard.jsx      # Interactive card with hover zoom & dimension badges
│   │   ├── ProductCatalog.jsx   # PLP dual view orchestrator with live filters
│   │   ├── ProductDetailPage.jsx# Interactive PDP with color switcher, specs & bulk estimator
│   │   ├── ProductModal.jsx     # Deep lightbox spec inspection & WhatsApp quote
│   │   ├── SpecTableView.jsx    # High-density wholesale comparison table
│   │   └── WhyChooseUs.jsx      # UV resistance, 100% virgin PP & load benchmarks
│   ├── App.jsx                  # Main application orchestrator
│   ├── index.css                # Tailwind directives & glassmorphic utilities
│   └── main.jsx                 # Application entry point
├── index.html                   # SEO metadata & Google Fonts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Brand colors & design tokens
└── package.json
```
