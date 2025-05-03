import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  qualification: string;
  image_url: string | null;
  consultation_fee: number;
  available_days: string[];
  languages: string[];
  rating: number | null;
  total_reviews: number;
  created_at: string;
  updated_at: string;
};
