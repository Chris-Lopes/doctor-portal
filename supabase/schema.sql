-- Create enum for doctor specialties
CREATE TYPE doctor_specialty AS ENUM (
  'General Physician',
  'Internal Medicine',
  'Pediatrician',
  'Dermatologist',
  'Cardiologist',
  'Neurologist'
);

-- Create enum for consultation modes
CREATE TYPE consultation_mode AS ENUM (
  'Hospital Visit',
  'Online Consult'
);

-- Create enum for facility types
CREATE TYPE facility_type AS ENUM (
  'Apollo Hospital',
  'Other Clinics'
);

-- Create enum for languages
CREATE TYPE doctor_language AS ENUM (
  'English',
  'Hindi',
  'Telugu',
  'Punjabi',
  'Bengali',
  'Marathi',
  'Urdu',
  'Gujarati',
  'Tamil',
  'Kannada',
  'Oriya',
  'Persian',
  'Assamese'
);

-- Create enum for fee ranges
CREATE TYPE fee_range AS ENUM (
  '100-500',
  '500-1000',
  '1000+'
);

-- Create doctors table
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty doctor_specialty NOT NULL,
  consultation_modes consultation_mode[] NOT NULL,
  experience_years INTEGER NOT NULL,
  qualification VARCHAR(255) NOT NULL,
  image_url TEXT,
  consultation_fee DECIMAL(10,2) NOT NULL,
  fee_range fee_range GENERATED ALWAYS AS (
    CASE 
      WHEN consultation_fee >= 1000 THEN '1000+'::fee_range
      WHEN consultation_fee >= 500 THEN '500-1000'::fee_range
      ELSE '100-500'::fee_range
    END
  ) STORED,
  languages doctor_language[] NOT NULL,
  facility_type facility_type NOT NULL,
  rating DECIMAL(2,1),
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for faster filtering
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_facility_type ON doctors(facility_type);
CREATE INDEX idx_doctors_experience_years ON doctors(experience_years);
CREATE INDEX idx_doctors_consultation_fee ON doctors(consultation_fee);
CREATE INDEX idx_doctors_fee_range ON doctors(fee_range);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamp
CREATE TRIGGER update_doctors_updated_at
    BEFORE UPDATE ON doctors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 