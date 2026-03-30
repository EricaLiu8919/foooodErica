import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FoodEntry = {
  id: string;
  user_id: string;
  name: string;
  quality_rating: number; // 1-5
  preference_rating: number; // 1-5
  location: string;
  photo_url: string | null;
  created_at: string;
};
