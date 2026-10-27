import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { productsData as defaultProducts } from '../data/productsData';
import { companyDetails as defaultCompany } from '../data/companyData';
import { persistData, retrieveIndexedDBData } from '../utils/storageHelper';
import db, { 
  mapProductFromDb, 
  mapCategoryFromDb, 
  mapInquiryFromDb, 
  mapCompanyFromDb 
} from '../services/databaseService';
import { 
  getSupabase, 
  isSupabaseConfigured, 
  getSupabaseConfig, 
  saveSupabaseConfig 
} from '../lib/supabaseClient';

// Storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'smp_admin_products_v2',
  CATEGORIES: 'smp_admin_categories_v2',
  COMPANY: 'smp_admin_company_v1',
  INQUIRIES: 'smp_admin_inquiries_v1',
  AUTH: 'smp_admin_auth_v1'
};

// Cleanup old v1 keys if present
try {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('smp_admin_products_v1');
    localStorage.removeItem('smp_admin_categories_v1');
  }
} catch {}

// Official categories extracted directly from the Shri Metro Products Catalogue PDF
const defaultCategories = [
  {
    id: 'cat-monobloc',
    name: 'Monobloc Chairs',
    subcategories: ['Armchair', 'Banquet Armchair', 'Tub Chair', 'Cane Chair'],
    description: 'Heavy-duty single-piece monobloc armchairs with 200 kg load capacity and gas-assist moulding.',
    bannerImage: '/products/alexa.jpeg'
  },
  {
    id: 'cat-armless',
    name: 'Armless Chairs',
    subcategories: ['Dining Chair', 'Tent House Chair', 'Wave Slat Chair'],
    description: 'Space-efficient stackable armless chairs engineered for high-density banquet and event seating.',
    bannerImage: '/products/platina.jpeg'
  },
  {
    id: 'cat-cafeteria',
    name: 'Cafeteria Chairs',
    subcategories: ['Designer Tub Chair', 'Bistro Chair', 'Web Mesh Chair'],
    description: 'Modern geometric cutout cafeteria chairs for contemporary food courts, bistros, and corporate pantries.',
    bannerImage: '/products/crystal.jpeg'
  },
  {
    id: 'cat-relax',
    name: 'Relax Chairs',
    subcategories: ['Lounge Armchair', 'Reclined High-Back Chair'],
    description: 'Ergonomic deep-seat low lounge armchairs with wide arms for verandas, gardens, and resort patios.',
    bannerImage: '/products/relax-deluxe.jpeg'
  },
  {
    id: 'cat-baby',
    name: 'Baby & Kids Chairs',
    subcategories: ['Study Chair', 'Activity Chair'],
    description: 'Child-safe virgin polymer chairs with rounded edges and anti-slip feet for preschools and homes.',
    bannerImage: '/products/chota-bheem.jpeg'
  },
  {
    id: 'cat-stools',
    name: 'Stools & Multipurpose',
    subcategories: ['Round Stool', 'Square Stool', 'Rattan Stool', 'Folding Step Stool'],
    description: 'Reinforced utility seating with ribbed understructure for restaurants, counters, and household tasks.',
    bannerImage: '/products/rattan-big.jpeg'
  },
  {
    id: 'cat-patlas',
    name: 'Patlas (Low Seats)',
    subcategories: ['Bathroom Patla', 'Kitchen Patla', 'Rattan Patla'],
    description: 'Waterproof anti-skid bathroom and kitchen floor seats with textured grip and non-slip rubber bushes.',
    bannerImage: '/products/classic-patla.jpeg'
  },
  {
    id: 'cat-dining',
    name: 'Dining Tables',
    subcategories: ['6-Seater Rectangular Table', '4-Seater Square Table', 'Round Bistro Table'],
    description: 'Full-size knockdown dining tables with central parasol hole for banquet halls, food courts, and gardens.',
    bannerImage: '/products/grandeur.jpeg'
  },
  {
    id: 'cat-center',
    name: 'Center Tables',
    subcategories: ['Coffee Table', 'Teapoy', 'Patio Table'],
    description: 'Sturdy low coffee tables with storage shelf for office waiting lounges, verandas, and event setups.',
    bannerImage: '/products/matrix.jpeg'
  },
  {
    id: 'cat-storage',
    name: 'Storage & Accessories',
    subcategories: ['Waste Bin', 'Heavy Crate'],
    description: 'Industrial material-handling crates and pedal waste bins for catering operations and warehouse logistics.',
    bannerImage: '/products/waste-bin.jpeg'
  }
];

const defaultInquiries = [
  {
    id: 'inq-101',
    customerName: 'Suresh Patel',
    businessName: 'Patel Event Organizers',
    phone: '+91 98450 12345',
    email: 'suresh@patelevent.in',
    quantity: 450,
    productName: 'Metro Alexa Monobloc Armchair (SMP-001)',
    message: 'Requirement for upcoming convention season in Bangalore. Need quotation for 450 units in Teak Wood finish with delivery to Palace Grounds.',
    status: 'New',
    date: '2026-10-27T09:30:00Z'
  },
  {
    id: 'inq-102',
    customerName: 'Meenakshi Sundaram',
    businessName: 'Sri Balaji Wedding Hall',
    phone: '+91 94432 98765',
    email: 'balajihall@gmail.com',
    quantity: 300,
    productName: 'Metro Heritage Cane Armchair (SMP-004)',
    message: 'Urgent bulk supply needed for banquet hall renovation. Need 300 Cane armchairs in Rosewood. Please share wholesale terms and lead time.',
    status: 'New',
    date: '2026-10-26T18:15:00Z'
  },
  {
    id: 'inq-103',
    customerName: 'Vinay Kumar',
    businessName: 'Apex Educational Trust',
    phone: '+91 97412 55432',
    email: 'admin@apextrust.edu',
    quantity: 120,
    productName: 'Metro Grandeur 6-Seater Rectangular Dining Table (SMP-TBL-802D)',
    message: 'Canteen renovation requirement. Need 120 dining tables in Marble Beige finish.',
    status: 'Quoted',
    date: '2026-10-25T11:20:00Z'
  }
];

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // 1. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load products from localStorage, using defaults', e);
    }
    return defaultProducts.map(p => ({
      ...p,
      isActive: p.isActive !== false,
      isBestSeller: p.isBestSeller ?? (p.isFeatured && p.id === 'smp-001')
    }));
  });

  // 2. Categories State
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load categories from localStorage, using defaults', e);
    }
    return defaultCategories;
  });

  // 3. Company Details State
  const [company, setCompany] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn('Failed to load company details from localStorage, using defaults', e);
    }
    return defaultCompany;
  });

  // 4. Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load inquiries from localStorage, using defaults', e);
    }
    return defaultInquiries;
  });

  // 5. Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true' ||
             localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Cloud Database Sync States
  const [isCloudConnected, setIsCloudConnected] = useState(isSupabaseConfigured());
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudSyncMessage, setCloudSyncMessage] = useState(null);
  const realtimeChannelRef = useRef(null);

  // Initial Cloud Database Hydration & Realtime Subscription
  useEffect(() => {
    let isMounted = true;

    async function initCloudDatabase() {
      if (!isSupabaseConfigured()) {
        if (isMounted) setIsCloudConnected(false);
        return;
      }

      try {
        if (isMounted) setIsSyncing(true);
        const supabase = getSupabase();
        if (!supabase) return;

        // 1. Fetch live products from Supabase
        const cloudProducts = await db.fetchProducts();
        if (isMounted && Array.isArray(cloudProducts)) {
          if (cloudProducts.length > 0) {
            setProducts(cloudProducts);
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(cloudProducts));
          } else {
            // First time connection: automatically seed cloud database with the full 43-model catalog!
            console.log('Supabase tables empty; seeding initial products & categories to cloud...');
            await db.seedCloudDatabase(defaultProducts, defaultCategories, defaultCompany);
            setProducts(defaultProducts);
            setCategories(defaultCategories);
          }
        }

        // 2. Fetch live categories
        const cloudCategories = await db.fetchCategories();
        if (isMounted && Array.isArray(cloudCategories) && cloudCategories.length > 0) {
          setCategories(cloudCategories);
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cloudCategories));
        }

        // 3. Fetch live company profile
        const cloudCompany = await db.fetchCompany();
        if (isMounted && cloudCompany) {
          setCompany(cloudCompany);
          localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(cloudCompany));
        }

        // 4. Fetch live inquiries
        const cloudInquiries = await db.fetchInquiries();
        if (isMounted && Array.isArray(cloudInquiries)) {
          setInquiries(cloudInquiries);
          localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(cloudInquiries));
        }

        if (isMounted) {
          setIsCloudConnected(true);
          setCloudSyncMessage('Connected to Supabase live cloud database');
        }

        // 5. Subscribe to Supabase Realtime Broadcasts
        // When admin modifies anything on one device, all other devices receive the update immediately!
        if (realtimeChannelRef.current) {
          supabase.removeChannel(realtimeChannelRef.current);
        }

        const channel = supabase.channel('smp_live_sync')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
            if (!isMounted) return;
            if (payload.eventType === 'INSERT') {
              const newP = mapProductFromDb(payload.new);
              setProducts(prev => prev.some(p => p.id === newP.id) ? prev : [newP, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              const updatedP = mapProductFromDb(payload.new);
              setProducts(prev => prev.map(p => p.id === updatedP.id ? updatedP : p));
            } else if (payload.eventType === 'DELETE') {
              setProducts(prev => prev.filter(p => p.id !== payload.old.id));
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, (payload) => {
            if (!isMounted) return;
            if (payload.eventType === 'INSERT') {
              const newC = mapCategoryFromDb(payload.new);
              setCategories(prev => prev.some(c => c.id === newC.id) ? prev : [...prev, newC]);
            } else if (payload.eventType === 'UPDATE') {
              const updatedC = mapCategoryFromDb(payload.new);
              setCategories(prev => prev.map(c => c.id === updatedC.id ? updatedC : c));
            } else if (payload.eventType === 'DELETE') {
              setCategories(prev => prev.filter(c => c.id !== payload.old.id));
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
            if (!isMounted) return;
            if (payload.eventType === 'INSERT') {
              const newI = mapInquiryFromDb(payload.new);
              setInquiries(prev => prev.some(i => i.id === newI.id) ? prev : [newI, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              const updatedI = mapInquiryFromDb(payload.new);
              setInquiries(prev => prev.map(i => i.id === updatedI.id ? updatedI : i));
            } else if (payload.eventType === 'DELETE') {
              setInquiries(prev => prev.filter(i => i.id !== payload.old.id));
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'company_profile' }, (payload) => {
            if (!isMounted) return;
            if (payload.new) {
              setCompany(mapCompanyFromDb(payload.new));
            }
          })
          .subscribe();

        realtimeChannelRef.current = channel;

      } catch (err) {
        console.warn('Notice during Supabase cloud hydration (using cached local data):', err);
        if (isMounted) {
          setCloudSyncMessage(`Cloud sync fallback: ${err.message || 'offline'}`);
        }
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    }

    initCloudDatabase();

    return () => {
      isMounted = false;
      const supabase = getSupabase();
      if (supabase && realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
      }
    };
  }, []);

  // Multi-window local backup sync
  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (!e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (e.key === STORAGE_KEYS.PRODUCTS && Array.isArray(parsed)) {
          setProducts(parsed);
        } else if (e.key === STORAGE_KEYS.CATEGORIES && Array.isArray(parsed)) {
          setCategories(parsed);
        } else if (e.key === STORAGE_KEYS.COMPANY && typeof parsed === 'object') {
          setCompany(parsed);
        } else if (e.key === STORAGE_KEYS.INQUIRIES && Array.isArray(parsed)) {
          setInquiries(parsed);
        }
      } catch {}
    };

    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  // Sync to local storage
  useEffect(() => {
    persistData(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  useEffect(() => {
    persistData(STORAGE_KEYS.CATEGORIES, categories);
  }, [categories]);

  useEffect(() => {
    persistData(STORAGE_KEYS.COMPANY, company);
  }, [company]);

  useEffect(() => {
    persistData(STORAGE_KEYS.INQUIRIES, inquiries);
  }, [inquiries]);

  // Auth methods
  const login = useCallback((username, password, remember = false) => {
    if (username.trim() === 'admin' && (password === 'metro123' || password === 'admin123')) {
      setIsAuthenticated(true);
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } else {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      }
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }, []);

  // Product CRUD (Optimistic Local Update + Cloud Database Write)
  const addProduct = useCallback(async (newProductData) => {
    const id = `smp-${Date.now().toString().slice(-4)}`;
    const product = {
      id,
      isActive: true,
      isFeatured: false,
      isBestSeller: false,
      loadCapacityKg: newProductData.loadCapacityKg || '200 kg',
      weightCapacity: newProductData.weightCapacity || '200 kg tested',
      material: newProductData.material || '100% Virgin Polypropylene',
      materialFinish: newProductData.materialFinish || 'Matte Surface (UV Stabilized)',
      stackabilityLimit: newProductData.stackabilityLimit || 'Stackable',
      isStackable: Boolean(newProductData.isStackable),
      colors: newProductData.colors?.length > 0 ? newProductData.colors : [
        { name: 'Standard Red', hex: '#9B111E', image: newProductData.image }
      ],
      ...newProductData
    };

    // 1. Optimistic local state update
    setProducts(prev => [product, ...prev]);

    // 2. Permanent cloud database write
    if (isSupabaseConfigured()) {
      try {
        await db.insertProduct(product);
      } catch (err) {
        console.error('Failed to write new product to Supabase cloud database:', err);
      }
    }

    return product;
  }, []);

  const updateProduct = useCallback(async (id, updatedFields) => {
    // 1. Optimistic local state update
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));

    // 2. Permanent cloud database update
    if (isSupabaseConfigured()) {
      try {
        await db.updateProduct(id, updatedFields);
      } catch (err) {
        console.error('Failed to update product in Supabase cloud database:', err);
      }
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    // 1. Optimistic local state update
    setProducts(prev => prev.filter(p => p.id !== id));

    // 2. Permanent cloud database deletion
    if (isSupabaseConfigured()) {
      try {
        await db.deleteProduct(id);
      } catch (err) {
        console.error('Failed to delete product from Supabase cloud database:', err);
      }
    }
  }, []);

  const toggleProductVisibility = useCallback(async (id) => {
    let nextState = true;
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        nextState = p.isActive === false;
        return { ...p, isActive: nextState };
      }
      return p;
    }));

    if (isSupabaseConfigured()) {
      try {
        await db.updateProduct(id, { isActive: nextState });
      } catch (err) {
        console.error('Failed to toggle visibility in Supabase:', err);
      }
    }
  }, []);

  const toggleProductFeatured = useCallback(async (id) => {
    let nextFeatured = false;
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        nextFeatured = !p.isFeatured;
        return { ...p, isFeatured: nextFeatured };
      }
      return p;
    }));

    if (isSupabaseConfigured()) {
      try {
        await db.updateProduct(id, { isFeatured: nextFeatured });
      } catch (err) {
        console.error('Failed to toggle featured status in Supabase:', err);
      }
    }
  }, []);

  // Category CRUD
  const addCategory = useCallback(async (newCat) => {
    const id = `cat-${Date.now().toString().slice(-4)}`;
    const category = {
      id,
      subcategories: [],
      description: '',
      bannerImage: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80',
      ...newCat
    };

    setCategories(prev => [...prev, category]);

    if (isSupabaseConfigured()) {
      try {
        await db.insertCategory(category);
      } catch (err) {
        console.error('Failed to add category to Supabase:', err);
      }
    }

    return category;
  }, []);

  const updateCategory = useCallback(async (id, updatedFields) => {
    setCategories(prev => prev.map(c => {
      if (c.id === id || c.name === id) {
        const oldName = c.name;
        const newName = updatedFields.name || oldName;
        if (oldName !== newName) {
          setProducts(prodList => prodList.map(p => (p.category === oldName ? { ...p, category: newName } : p)));
        }
        return { ...c, ...updatedFields };
      }
      return c;
    }));

    if (isSupabaseConfigured()) {
      try {
        await db.updateCategory(id, updatedFields);
      } catch (err) {
        console.error('Failed to update category in Supabase:', err);
      }
    }
  }, []);

  const deleteCategory = useCallback(async (catIdOrName) => {
    setCategories(prev => prev.filter(c => c.id !== catIdOrName && c.name !== catIdOrName));

    if (isSupabaseConfigured()) {
      try {
        await db.deleteCategory(catIdOrName);
      } catch (err) {
        console.error('Failed to delete category in Supabase:', err);
      }
    }
  }, []);

  // Company Details
  const updateCompanyDetails = useCallback(async (updatedFields) => {
    const updated = {
      ...company,
      ...updatedFields,
      location: {
        ...company.location,
        ...(updatedFields.location || {})
      }
    };
    setCompany(updated);

    if (isSupabaseConfigured()) {
      try {
        await db.updateCompany(updated);
      } catch (err) {
        console.error('Failed to update company in Supabase:', err);
      }
    }
  }, [company]);

  // Wholesale Inquiry CRUD
  const addInquiry = useCallback(async (inquiryData) => {
    const newInq = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString(),
      status: 'New',
      ...inquiryData
    };

    setInquiries(prev => [newInq, ...prev]);

    if (isSupabaseConfigured()) {
      try {
        await db.insertInquiry(newInq);
      } catch (err) {
        console.error('Failed to save inquiry to Supabase cloud database:', err);
      }
    }

    return newInq;
  }, []);

  const updateInquiryStatus = useCallback(async (id, newStatus) => {
    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status: newStatus } : inq)));

    if (isSupabaseConfigured()) {
      try {
        await db.updateInquiryStatus(id, newStatus);
      } catch (err) {
        console.error('Failed to update inquiry status in Supabase:', err);
      }
    }
  }, []);

  const deleteInquiry = useCallback(async (id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));

    if (isSupabaseConfigured()) {
      try {
        await db.deleteInquiry(id);
      } catch (err) {
        console.error('Failed to delete inquiry from Supabase:', err);
      }
    }
  }, []);

  // Cloud Database Connection Manager
  const connectCloudDatabase = useCallback((url, anonKey) => {
    saveSupabaseConfig(url, anonKey);
  }, []);

  const disconnectCloudDatabase = useCallback(() => {
    saveSupabaseConfig('', '');
  }, []);

  const seedCloud = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await db.seedCloudDatabase(defaultProducts, defaultCategories, defaultCompany);
      setCloudSyncMessage(`Successfully seeded ${res.productCount} products and ${res.categoryCount} categories to Supabase`);
      return res;
    } catch (err) {
      setCloudSyncMessage(`Seed error: ${err.message}`);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Reset all to factory defaults
  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.COMPANY);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    setProducts(defaultProducts);
    setCategories(defaultCategories);
    setCompany(defaultCompany);
    setInquiries(defaultInquiries);
  }, []);

  const activeProducts = products.filter(p => p.isActive !== false);

  const value = {
    // Products
    products,
    activeProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductVisibility,
    toggleProductFeatured,

    // Categories
    categories,
    addCategory,
    updateCategory,
    deleteCategory,

    // Company
    company,
    updateCompanyDetails,

    // Inquiries
    inquiries,
    addInquiry,
    updateInquiryStatus,
    deleteInquiry,

    // Auth
    isAuthenticated,
    login,
    logout,

    // Cloud Database
    isCloudConnected,
    isSyncing,
    cloudSyncMessage,
    supabaseConfig: getSupabaseConfig(),
    connectCloudDatabase,
    disconnectCloudDatabase,
    seedCloud,

    // Reset
    resetToDefaults
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
