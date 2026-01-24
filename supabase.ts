
import { createClient } from '@supabase/supabase-js';

// Ganti URL dan KEY ini dengan kredensial dari Dashboard Supabase Anda
// Di lingkungan produksi, gunakan environment variables
const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Helper untuk menangani error Supabase secara konsisten
 */
export const handleSupabaseError = (error: any) => {
  console.error('Supabase Error:', error.message);
  alert(`Terjadi kesalahan: ${error.message}`);
};
