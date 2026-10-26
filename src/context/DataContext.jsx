import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productsData as defaultProducts } from '../data/productsData';
import { companyDetails as defaultCompany } from '../data/companyData';

// Storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'smp_admin_products_v1',
  CATEGORIES: 'smp_admin_categories_v1',
  COMPANY: 'smp_admin_company_v1',
  INQUIRIES: 'smp_admin_inquiries_v1',
  AUTH: 'smp_admin_auth_v1'
};

// Initial default categories
const defaultCategories = [
  {
    id: 'cat-chairs-arm',
    name: 'Plastic Chairs (Armrest)',
    subcategories: ['Banquet Armchair', 'Dining Armchair', 'Visitor Armchair'],
    description: 'Heavy-duty armrest chairs with reinforced lumbar and gas-assist moulding.',
    bannerImage: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-chairs-armless',
    name: 'Plastic Chairs (Armless)',
    subcategories: ['Dining Chair', 'Tent House Chair', 'Classroom Chair'],
    description: 'Space-efficient stackable armless chairs engineered for high-density seating.',
    bannerImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-center-tables',
    name: 'Center Tables',
    subcategories: ['Coffee Table', 'Lounge Table', 'Tea Table'],
    description: 'Modern injection-moulded center tables with utility bottom shelves.',
    bannerImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-dining-tables',
    name: 'Dining Tables',
    subcategories: ['6-Seater Rectangular', '4-Seater Square', 'Banquet Buffet Table'],
    description: 'Sturdy plastic moulded dining tables with reinforced under-structure.',
    bannerImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-stools',
    name: 'Stools',
    subcategories: ['High Stool', 'Kitchen Stool', 'Industrial Round Stool'],
    description: 'Compact, high load-bearing stools with anti-skid ribbed feet.',
    bannerImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-patlas',
    name: 'Patlas',
    subcategories: ['Bathroom Patla', 'Low Utility Sitting Patla', 'Commercial Floor Patla'],
    description: 'Heavy virgin polymer utility low stools with anti-skid rubber bushings.',
    bannerImage: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80'
  }
];

// Initial seed inquiries for demonstration
const defaultInquiries = [
  {
    id: 'inq-101',
    customerName: 'Suresh Gowda',
    businessName: 'Royal Orchid Banquets',
    phone: '+91 98440 12345',
    email: 'suresh@royalorchid.in',
    quantity: 250,
    productName: 'Metro Royal Elegance Armchair (SMP-CHR-901A)',
    message: 'Need 250 units in Teak Wood finish for upcoming banquet hall in Mysore Rd. Please send wholesale invoice terms.',
    status: 'In Progress',
    date: '2026-10-26T14:30:00Z'
  },
  {
    id: 'inq-102',
    customerName: 'Mahesh Patil',
    businessName: 'Patil Caterers & Tent House',
    phone: '+91 94481 88990',
    email: 'patil.tent@gmail.com',
    quantity: 500,
    productName: 'Metro Slimline Armless Banquet Chair (SMP-CHR-903L)',
    message: 'Looking for 500 armless chairs with direct factory dispatch to Hubli. Require GST input tax credit invoice.',
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
    // Initialize defaults with isActive = true
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

  // Sync state to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories to localStorage', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(company));
    } catch (e) {
      console.error('Failed to save company details to localStorage', e);
    }
  }, [company]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  }, [inquiries]);

  // Auth methods
  const login = useCallback((username, password, remember = false) => {
    if (username.trim() === 'admin' && password === 'metro123') {
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

  // Product CRUD
  const addProduct = useCallback((newProductData) => {
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
    setProducts(prev => [product, ...prev]);
    return product;
  }, []);

  const updateProduct = useCallback((id, updatedFields) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleProductVisibility = useCallback((id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isActive: p.isActive === false ? true : false };
      }
      return p;
    }));
  }, []);

  const toggleProductFeatured = useCallback((id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      return p;
    }));
  }, []);

  // Category CRUD
  const addCategory = useCallback((newCat) => {
    const id = `cat-${Date.now().toString().slice(-4)}`;
    const category = {
      id,
      subcategories: [],
      description: '',
      bannerImage: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80',
      ...newCat
    };
    setCategories(prev => [...prev, category]);
    return category;
  }, []);

  const updateCategory = useCallback((id, updatedFields) => {
    setCategories(prev => prev.map(c => {
      if (c.id === id || c.name === id) {
        const oldName = c.name;
        const newName = updatedFields.name || oldName;
        // If category name changed, update products under this category as well
        if (oldName !== newName) {
          setProducts(prodList => prodList.map(p => (p.category === oldName ? { ...p, category: newName } : p)));
        }
        return { ...c, ...updatedFields };
      }
      return c;
    }));
  }, []);

  const deleteCategory = useCallback((catIdOrName) => {
    setCategories(prev => prev.filter(c => c.id !== catIdOrName && c.name !== catIdOrName));
  }, []);

  // Company Details
  const updateCompanyDetails = useCallback((updatedFields) => {
    setCompany(prev => ({
      ...prev,
      ...updatedFields,
      location: {
        ...prev.location,
        ...(updatedFields.location || {})
      }
    }));
  }, []);

  // Inquiry CRUD
  const addInquiry = useCallback((inquiryData) => {
    const newInq = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString(),
      status: 'New',
      ...inquiryData
    };
    setInquiries(prev => [newInq, ...prev]);
    return newInq;
  }, []);

  const updateInquiryStatus = useCallback((id, newStatus) => {
    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status: newStatus } : inq)));
  }, []);

  const deleteInquiry = useCallback((id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  }, []);

  // Reset all to factory defaults
  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.COMPANY);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    
    setProducts(defaultProducts.map(p => ({ ...p, isActive: true })));
    setCategories(defaultCategories);
    setCompany(defaultCompany);
    setInquiries(defaultInquiries);
  }, []);

  // Computed public products (active only)
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
