-- Create enum for doctor specialties
CREATE TYPE doctor_specialty AS ENUM (
  'General Physician',
  'Internal Medicine',
  'Pediatrician',
  'Dermatologist',
  'Cardiologist',
  'Neurologist'
);

-- Create doctors table
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty doctor_specialty NOT NULL,
  experience_years INTEGER NOT NULL,
  qualification VARCHAR(255) NOT NULL,
  image_url TEXT,
  consultation_fee DECIMAL(10,2) NOT NULL,
  available_days TEXT[], -- Array of available days
  languages TEXT[], -- Array of languages spoken
  rating DECIMAL(2,1),
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index for faster filtering
CREATE INDEX idx_doctors_specialty ON doctors(specialty);

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