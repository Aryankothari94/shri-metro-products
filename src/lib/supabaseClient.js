import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://wbsqpzcmtdgtcgsjfhba.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_KtTKgW_PiFZS6AaJrvKtuw_lCfVaD06';

// Read from Vite environment variables, localStorage override, or project default
const getEnvOrStored = (key, storageKey, fallback = '') => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey);
    if (stored && stored.trim()) return stored.trim();
  }
  if (import.meta.env[key] && String(import.meta.env[key]).trim()) {
    return String(import.meta.env[key]).trim();
  }
  return fallback;
};

export const getSupabaseConfig = () => {
  const url = getEnvOrStored('VITE_SUPABASE_URL', 'SMP_SUPABASE_URL', DEFAULT_SUPABASE_URL);
  const anonKey = getEnvOrStored('VITE_SUPABASE_ANON_KEY', 'SMP_SUPABASE_ANON_KEY', DEFAULT_SUPABASE_ANON_KEY);
  return { url, anonKey, isConfigured: Boolean(url && anonKey) };
};

export const saveSupabaseConfig = (url, anonKey) => {
  if (typeof window === 'undefined') return;
  if (url && anonKey) {
    localStorage.setItem('SMP_SUPABASE_URL', url.trim());
    localStorage.setItem('SMP_SUPABASE_ANON_KEY', anonKey.trim());
  } else {
    localStorage.removeItem('SMP_SUPABASE_URL');
    localStorage.removeItem('SMP_SUPABASE_ANON_KEY');
  }
  // Reload window to re-instantiate client with new keys
  window.location.reload();
};

let supabaseInstance = null;

export const getSupabase = () => {
  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        },
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

export const isSupabaseConfigured = () => {
  return getSupabaseConfig().isConfigured;
};

export default getSupabase;
