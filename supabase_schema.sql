-- =========================================================================
-- SHRI METRO PRODUCTS - OFFICIAL PRODUCTION DATABASE SCHEMA (SUPABASE)
-- Execute this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- =========================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    model_code TEXT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    tagline TEXT,
    description TEXT,
    dimensions TEXT,
    net_weight TEXT,
    load_capacity_kg TEXT DEFAULT '200 kg',
    weight_capacity TEXT DEFAULT '200 kg tested',
    material TEXT DEFAULT '100% Virgin Polypropylene',
    material_finish TEXT DEFAULT 'Matte Finish with Textured Accent (UV Stabilized)',
    is_stackable BOOLEAN DEFAULT true,
    stackability_limit TEXT DEFAULT 'Up to 8 Units Nested',
    suitable_environments TEXT DEFAULT 'Indoor / Outdoor / Banquets / Verandas',
    mould_tech TEXT DEFAULT 'Single-Piece Gas-Assist Injection Mould',
    warranty TEXT DEFAULT '1 Year Replacement Warranty',
    image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    colors JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for fast public filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Wholesale Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    business_name TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    quantity INT DEFAULT 1,
    product_name TEXT,
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quoted', 'Closed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

-- 5. Company Profile Table
CREATE TABLE IF NOT EXISTS public.company_profile (
    id TEXT PRIMARY KEY DEFAULT 'shri_metro_main',
    name TEXT DEFAULT 'SHRI METRO PRODUCTS',
    proprietor TEXT DEFAULT 'Rakesh R Jain',
    established_year INT DEFAULT 2012,
    address TEXT DEFAULT 'Plot No. 42-P, 2nd Phase, Kumbalgodu Industrial Area, Mysore Road, Bangalore - 560074',
    plant_location TEXT DEFAULT 'Kumbalgodu Industrial Area, Bangalore',
    phone TEXT DEFAULT '+91 94480 87311',
    whatsapp_number TEXT DEFAULT '919448087311',
    email TEXT DEFAULT 'info@shrimetroproducts.com',
    catalog_download_url TEXT DEFAULT '#',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profile ENABLE ROW LEVEL SECURITY;

-- 7. Public Read & Admin Manage Policies (Allow public reads & anon operations via app key)
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products" ON public.products
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all modifications on products" ON public.products;
CREATE POLICY "Allow all modifications on products" ON public.products
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories" ON public.categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all modifications on categories" ON public.categories;
CREATE POLICY "Allow all modifications on categories" ON public.categories
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public to submit inquiries" ON public.inquiries;
CREATE POLICY "Allow public to submit inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow view and manage inquiries" ON public.inquiries;
CREATE POLICY "Allow view and manage inquiries" ON public.inquiries
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view company profile" ON public.company_profile;
CREATE POLICY "Public can view company profile" ON public.company_profile
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow update company profile" ON public.company_profile;
CREATE POLICY "Allow update company profile" ON public.company_profile
    FOR ALL USING (true) WITH CHECK (true);

-- 8. Enable Realtime Replication
-- This broadcasts changes over WebSockets immediately when admin modifies products/categories/inquiries!
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.company_profile;
