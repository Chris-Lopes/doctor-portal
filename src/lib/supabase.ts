import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ConsultationMode = "Hospital Visit" | "Online Consult";
export type FacilityType = "Apollo Hospital" | "Other Clinics";
export type FeeRange = "100-500" | "500-1000" | "1000+";
export type Language =
  | "English"
  | "Hindi"
  | "Telugu"
  | "Punjabi"
  | "Bengali"
  | "Marathi"
  | "Urdu"
  | "Gujarati"
  | "Tamil"
  | "Kannada"
  | "Oriya"
  | "Persian"
  | "Assamese";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  consultation_modes: ConsultationMode[];
  experience_years: number;
  qualification: string;
  image_url: string | null;
  consultation_fee: number;
  fee_range: FeeRange;
  languages: Language[];
  facility_type: FacilityType;
  rating: number | null;
  total_reviews: number;
  created_at: string;
  updated_at: string;
};
