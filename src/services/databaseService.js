import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Data Mappers between Frontend CamelCase and Database snake_case
 */
export const mapProductFromDb = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    modelCode: row.model_code || '',
    name: row.name || '',
    category: row.category || '',
    subcategory: row.subcategory || '',
    tagline: row.tagline || '',
    description: row.description || '',
    dimensions: row.dimensions || '',
    netWeight: row.net_weight || '',
    loadCapacityKg: row.load_capacity_kg || '200 kg',
    weightCapacity: row.weight_capacity || '200 kg tested',
    material: row.material || '100% Virgin Polypropylene',
    materialFinish: row.material_finish || '',
    isStackable: row.is_stackable ?? true,
    stackabilityLimit: row.stackability_limit || 'Up to 8 Units Nested',
    suitableEnvironments: row.suitable_environments || 'Indoor / Outdoor / Banquets',
    mouldTech: row.mould_tech || 'Single-Piece Gas-Assist Injection Mould',
    warranty: row.warranty || '1 Year Replacement Warranty',
    image: row.image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    colors: Array.isArray(row.colors) ? row.colors : [],
    isFeatured: Boolean(row.is_featured),
    isBestSeller: Boolean(row.is_best_seller),
    isActive: row.is_active !== false,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

export const mapProductToDb = (p) => {
  return {
    id: p.id,
    model_code: p.modelCode || p.model_code || '',
    name: p.name || '',
    category: p.category || '',
    subcategory: p.subcategory || '',
    tagline: p.tagline || '',
    description: p.description || '',
    dimensions: p.dimensions || '',
    net_weight: p.netWeight || p.net_weight || '',
    load_capacity_kg: p.loadCapacityKg || p.load_capacity_kg || '200 kg',
    weight_capacity: p.weightCapacity || p.weight_capacity || '200 kg tested',
    material: p.material || '100% Virgin Polypropylene',
    material_finish: p.materialFinish || p.material_finish || '',
    is_stackable: p.isStackable ?? true,
    stackability_limit: p.stackabilityLimit || p.stackability_limit || 'Up to 8 Units Nested',
    suitable_environments: p.suitableEnvironments || p.suitable_environments || '',
    mould_tech: p.mouldTech || p.mould_tech || '',
    warranty: p.warranty || '1 Year Replacement Warranty',
    image: p.image || '',
    gallery: p.gallery || [],
    colors: p.colors || [],
    is_featured: Boolean(p.isFeatured),
    is_best_seller: Boolean(p.isBestSeller),
    is_active: p.isActive !== false,
    updated_at: new Date().toISOString()
  };
};

export const mapCategoryFromDb = (row) => ({
  id: row.id,
  name: row.name,
  description: row.description || '',
  displayOrder: row.display_order ?? 0
});

export const mapCategoryToDb = (c) => ({
  id: c.id,
  name: c.name,
  description: c.description || '',
  display_order: c.displayOrder ?? 0
});

export const mapInquiryFromDb = (row) => ({
  id: row.id,
  customerName: row.customer_name || '',
  businessName: row.business_name || '',
  phone: row.phone || '',
  email: row.email || '',
  quantity: Number(row.quantity) || 1,
  productName: row.product_name || '',
  message: row.message || '',
  status: row.status || 'New',
  date: row.created_at || new Date().toISOString()
});

export const mapInquiryToDb = (inq) => ({
  id: inq.id,
  customer_name: inq.customerName || '',
  business_name: inq.businessName || '',
  phone: inq.phone || '',
  email: inq.email || '',
  quantity: Number(inq.quantity) || 1,
  product_name: inq.productName || '',
  message: inq.message || '',
  status: inq.status || 'New',
  created_at: inq.date || new Date().toISOString()
});

export const mapCompanyFromDb = (row) => ({
  name: row.name || 'SHRI METRO PRODUCTS',
  proprietor: row.proprietor || 'Rakesh R Jain',
  establishedYear: row.established_year || 2012,
  address: row.address || 'Plot No. 42-P, 2nd Phase, Kumbalgodu Industrial Area, Mysore Road, Bangalore - 560074',
  plantLocation: row.plant_location || 'Kumbalgodu Industrial Area, Bangalore',
  phone: row.phone || '+91 94480 87311',
  whatsappNumber: row.whatsapp_number || '919448087311',
  email: row.email || 'info@shrimetroproducts.com',
  catalogDownloadUrl: row.catalog_download_url || '#'
});

export const mapCompanyToDb = (c) => ({
  id: 'shri_metro_main',
  name: c.name,
  proprietor: c.proprietor,
  established_year: c.establishedYear,
  address: c.address,
  plant_location: c.plantLocation,
  phone: c.phone,
  whatsapp_number: c.whatsappNumber,
  email: c.email,
  catalog_download_url: c.catalogDownloadUrl,
  updated_at: new Date().toISOString()
});

/**
 * Database API Service
 */
export const db = {
  // PRODUCTS
  async fetchProducts() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapProductFromDb);
  },

  async insertProduct(product) {
    const supabase = getSupabase();
    if (!supabase) return product;
    const row = mapProductToDb(product);
    const { data, error } = await supabase.from('products').insert(row).select().single();
    if (error) throw error;
    return mapProductFromDb(data);
  },

  async updateProduct(id, updatedFields) {
    const supabase = getSupabase();
    if (!supabase) return updatedFields;
    const dbFields = {};
    if (updatedFields.name !== undefined) dbFields.name = updatedFields.name;
    if (updatedFields.modelCode !== undefined) dbFields.model_code = updatedFields.modelCode;
    if (updatedFields.category !== undefined) dbFields.category = updatedFields.category;
    if (updatedFields.subcategory !== undefined) dbFields.subcategory = updatedFields.subcategory;
    if (updatedFields.tagline !== undefined) dbFields.tagline = updatedFields.tagline;
    if (updatedFields.description !== undefined) dbFields.description = updatedFields.description;
    if (updatedFields.dimensions !== undefined) dbFields.dimensions = updatedFields.dimensions;
    if (updatedFields.netWeight !== undefined) dbFields.net_weight = updatedFields.netWeight;
    if (updatedFields.loadCapacityKg !== undefined) dbFields.load_capacity_kg = updatedFields.loadCapacityKg;
    if (updatedFields.weightCapacity !== undefined) dbFields.weight_capacity = updatedFields.weightCapacity;
    if (updatedFields.material !== undefined) dbFields.material = updatedFields.material;
    if (updatedFields.materialFinish !== undefined) dbFields.material_finish = updatedFields.materialFinish;
    if (updatedFields.isStackable !== undefined) dbFields.is_stackable = updatedFields.isStackable;
    if (updatedFields.stackabilityLimit !== undefined) dbFields.stackability_limit = updatedFields.stackabilityLimit;
    if (updatedFields.suitableEnvironments !== undefined) dbFields.suitable_environments = updatedFields.suitableEnvironments;
    if (updatedFields.mouldTech !== undefined) dbFields.mould_tech = updatedFields.mouldTech;
    if (updatedFields.warranty !== undefined) dbFields.warranty = updatedFields.warranty;
    if (updatedFields.image !== undefined) dbFields.image = updatedFields.image;
    if (updatedFields.gallery !== undefined) dbFields.gallery = updatedFields.gallery;
    if (updatedFields.colors !== undefined) dbFields.colors = updatedFields.colors;
    if (updatedFields.isFeatured !== undefined) dbFields.is_featured = updatedFields.isFeatured;
    if (updatedFields.isBestSeller !== undefined) dbFields.is_best_seller = updatedFields.isBestSeller;
    if (updatedFields.isActive !== undefined) dbFields.is_active = updatedFields.isActive;
    dbFields.updated_at = new Date().toISOString();

    const { data, error } = await supabase.from('products').update(dbFields).eq('id', id).select().single();
    if (error) throw error;
    return mapProductFromDb(data);
  },

  async deleteProduct(id) {
    const supabase = getSupabase();
    if (!supabase) return true;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // CATEGORIES
  async fetchCategories() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return (data || []).map(mapCategoryFromDb);
  },

  async insertCategory(category) {
    const supabase = getSupabase();
    if (!supabase) return category;
    const row = mapCategoryToDb(category);
    const { data, error } = await supabase.from('categories').insert(row).select().single();
    if (error) throw error;
    return mapCategoryFromDb(data);
  },

  async updateCategory(id, updatedFields) {
    const supabase = getSupabase();
    if (!supabase) return updatedFields;
    const dbFields = {};
    if (updatedFields.name !== undefined) dbFields.name = updatedFields.name;
    if (updatedFields.description !== undefined) dbFields.description = updatedFields.description;
    if (updatedFields.displayOrder !== undefined) dbFields.display_order = updatedFields.displayOrder;

    const { data, error } = await supabase.from('categories').update(dbFields).eq('id', id).select().single();
    if (error) throw error;
    return mapCategoryFromDb(data);
  },

  async deleteCategory(id) {
    const supabase = getSupabase();
    if (!supabase) return true;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // INQUIRIES
  async fetchInquiries() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapInquiryFromDb);
  },

  async insertInquiry(inquiry) {
    const supabase = getSupabase();
    if (!supabase) return inquiry;
    const row = mapInquiryToDb(inquiry);
    const { data, error } = await supabase.from('inquiries').insert(row).select().single();
    if (error) throw error;
    return mapInquiryFromDb(data);
  },

  async updateInquiryStatus(id, newStatus) {
    const supabase = getSupabase();
    if (!supabase) return newStatus;
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return mapInquiryFromDb(data);
  },

  async deleteInquiry(id) {
    const supabase = getSupabase();
    if (!supabase) return true;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // COMPANY PROFILE
  async fetchCompany() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('company_profile')
      .select('*')
      .eq('id', 'shri_metro_main')
      .maybeSingle();
    if (error) throw error;
    return data ? mapCompanyFromDb(data) : null;
  },

  async updateCompany(fields) {
    const supabase = getSupabase();
    if (!supabase) return fields;
    const row = mapCompanyToDb(fields);
    const { data, error } = await supabase
      .from('company_profile')
      .upsert(row)
      .select()
      .single();
    if (error) throw error;
    return mapCompanyFromDb(data);
  },

  // BULK SEED (Uploads all default products & categories to cloud on initial setup)
  async seedCloudDatabase(defaultProducts, defaultCategories, defaultCompany) {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured yet');

    // 1. Seed categories
    const categoryRows = defaultCategories.map(mapCategoryToDb);
    await supabase.from('categories').upsert(categoryRows, { onConflict: 'id' });

    // 2. Seed products
    const productRows = defaultProducts.map(mapProductToDb);
    await supabase.from('products').upsert(productRows, { onConflict: 'id' });

    // 3. Seed company
    const companyRow = mapCompanyToDb(defaultCompany);
    await supabase.from('company_profile').upsert(companyRow, { onConflict: 'id' });

    return { success: true, productCount: productRows.length, categoryCount: categoryRows.length };
  }
};

export default db;
