import { createClient } from '@supabase/supabase-js';
import SECURITY_CONFIG from '../config/securityConfig';

// Read from localStorage override or centralized security config (.env + encoded fallback)
const getEnvOrStored = (storageKey, fallbackValue) => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey);
    if (stored && stored.trim()) return stored.trim();
  }
  return fallbackValue || '';
};

export const getSupabaseConfig = () => {
  const url = getEnvOrStored('SMP_SUPABASE_URL', SECURITY_CONFIG.supabaseUrl);
  const anonKey = getEnvOrStored('SMP_SUPABASE_ANON_KEY', SECURITY_CONFIG.supabaseAnonKey);
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
