
import { createClient } from '@supabase/supabase-js';

// Detect if keys are placeholders
const PLACEHOLDER_URL = 'https://your-project-url.supabase.co';
const PLACEHOLDER_KEY = 'your-anon-key';

const SUPABASE_URL = process.env.SUPABASE_URL || PLACEHOLDER_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || PLACEHOLDER_KEY;

export const isSupabaseConfigured = 
  SUPABASE_URL !== PLACEHOLDER_URL && 
  SUPABASE_ANON_KEY !== PLACEHOLDER_KEY &&
  SUPABASE_URL.startsWith('https://');

// Initialize client only if potentially valid, otherwise a dummy client behavior might be handled in components
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Helper to handle Supabase errors consistently
 */
export const handleSupabaseError = (error: any) => {
  console.warn('Supabase Connection Issue:', error.message || error);
  // We return true if it's a fetch error to help components decide on fallback
  return error.message?.includes('fetch') || error.message?.includes('NetworkError');
};
