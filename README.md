# SHRI METRO PRODUCTS - Plastic Moulded Furniture Showcase & Administration Suite

Official showcase and product catalogue web application for **SHRI METRO PRODUCTS**, premier manufacturer of heavy-duty moulded plastic furniture based in Kumbalgodu Industrial Area, Bangalore, Karnataka.

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🏭 Company Information
- **Manufacturer**: SHRI METRO PRODUCTS
- **Proprietor**: Rakesh R Jain
- **Contact / WhatsApp**: +91 9845287888
- **GSTIN**: 29AKZPJ1388F1ZH (HSN: 9403, 100% Input Tax Credit)
- **Factory Works**: Site no: 10, 11 Gerupalya, Vaishno Devi Industrial Estate, Kumbalgodu, Bangalore - 560074

---

## 🌟 Key Features
1. **Complete 43 Product Inventory**: Extracted directly from official PDF catalogue (`SMP-001` through `SMP-043`) across 10 official categories (Armchairs, Armless, Dining Tables, Center Tables, Stools, Patlas, Baby Sets, Trolleys).
2. **Realistic 3D Catalogue Lookbook**:
   - **Desktop / Tablet**: Realistic double-sided sheet turn with 3D perspective fold on vertical center spine, light sweep, paper edge accumulation, and cast shadows.
   - **Mobile**: Real 3D vertical fold ("up to back") around horizontal spine with swipe-up/down gesture support.
3. **Full Multi-Device Responsiveness**:
   - Zero layout overlap or merging across Mobile (360px–480px), Tablet Portrait (768px), Tablet Landscape (1024px), and Desktop (1440px+).
   - Dual catalog views (interactive Card Grid vs. Wholesale Technical Spec Register).
4. **Administrative Console (`/admin`)**:
   - Inventory manager with live image upload directly from mobile phone/desktop (with auto WebP compression).
   - Category engine synced in real time with public store navigation.
   - Wholesale inquiries register logged directly from client WhatsApp quotes and web forms.
   - Factory business profile manager with dynamic GSTIN, phone, and address synchronization.

---

## 📱 Opening on Multiple Devices (Phones, Tablets & Laptops)

### Method 1: Local Network Access (Wi-Fi)
When running the development server with network broadcasting enabled:
```bash
npm run dev
```
Vite will output:
- **Local (on PC)**: `http://localhost:5173/`
- **Network (on any Phone / Tablet on the same Wi-Fi)**: `http://10.192.83.108:5173/`

### Method 2: Online Cloud Deployment
This repository is configured for one-click deployment on **Vercel** or **Netlify**:
1. Import repository `Aryankothari94/shri-metro-products` on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
2. Framework preset: `Vite`.
3. Build command: `npm run build`, Output directory: `dist`.
4. Deploy to get a permanent worldwide `https://*.vercel.app` URL accessible from any mobile or desktop device on cellular data or Wi-Fi.

---

## 🛠️ Development & Production Commands
```bash
# Install dependencies
npm install

# Start local & network dev server
npm run dev

# Run production build
npm run build

# Preview production build
npm run preview
```
