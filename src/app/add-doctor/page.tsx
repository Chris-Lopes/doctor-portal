"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import DoctorCard from "@/components/DoctorCard";
import { Loader2 } from "lucide-react";
import type {
  ConsultationMode,
  Language,
  FeeRange,
  FacilityType,
} from "@/lib/supabase";

// Match exactly with database enums
const SPECIALTIES = [
  "General Physician",
  "Internal Medicine",
  "Pediatrician",
  "Dermatologist",
  "Cardiologist",
  "Neurologist",
] as const;

const LANGUAGES = [
  "English",
  "Hindi",
  "Telugu",
  "Punjabi",
  "Bengali",
  "Marathi",
  "Urdu",
  "Gujarati",
  "Tamil",
  "Kannada",
  "Oriya",
  "Persian",
  "Assamese",
] as const;

const CONSULTATION_MODES = ["Hospital Visit", "Online Consult"] as const;

const FACILITY_TYPES = ["Apollo Hospital", "Other Clinics"] as const;

export default function AddDoctor() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience_years: 0,
    consultation_fee: 0,
    qualification: "",
    languages: [] as string[],
    consultation_modes: [] as string[],
    facility_type: "",
    image_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/add-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add doctor");
      }

      toast.success(data.message || "Doctor added successfully!");
      // Reset form
      setFormData({
        name: "",
        specialty: "",
        experience_years: 0,
        consultation_fee: 0,
        qualification: "",
        languages: [],
        consultation_modes: [],
        facility_type: "",
        image_url: "",
      });

      // Redirect to home page
      router.push("/specialties");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add doctor"
      );
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, field: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelectChange = (
    value: string,
    field: keyof typeof formData
  ) => {
    setFormData((prev) => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: newValues,
      };
    });
  };

  // Preview data for DoctorCard
  const previewData = {
    ...formData,
    id: "preview",
    rating: null,
    total_reviews: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    fee_range: (formData.consultation_fee >= 1000
      ? "1000+"
      : formData.consultation_fee >= 500
      ? "500-1000"
      : "100-500") as FeeRange,
    consultation_modes: formData.consultation_modes as ConsultationMode[],
    languages: formData.languages as Language[],
    facility_type: formData.facility_type as FacilityType,
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Add New Doctor</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) =>
                      handleSelectChange(value, "specialty")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose the primary area of expertise
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    placeholder="MBBS, MD (Cardiology)"
                  />
                  <p className="text-sm text-muted-foreground">
                    List all relevant medical qualifications
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">
                Professional Details
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience_years">Years of Experience</Label>
                  <Input
                    id="experience_years"
                    name="experience_years"
                    type="number"
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="10"
                  />
                  <p className="text-sm text-muted-foreground">
                    Total years of professional practice
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultation_fee">Consultation Fee (₹)</Label>
                  <Input
                    id="consultation_fee"
                    name="consultation_fee"
                    type="number"
                    onChange={handleChange}
                    required
                    min="100"
                    step="0.01"
                    placeholder="500"
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum fee is ₹100
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facility_type">Facility Type</Label>
                  <Select
                    value={formData.facility_type}
                    onValueChange={(value) =>
                      handleSelectChange(value, "facility_type")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select facility type" />
                    </SelectTrigger>
                    <SelectContent>
                      {FACILITY_TYPES.map((facility) => (
                        <SelectItem key={facility} value={facility}>
                          {facility}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Consultation Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">
                Consultation Details
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Consultation Modes</Label>
                  <div className="flex flex-wrap gap-2">
                    {CONSULTATION_MODES.map((mode) => (
                      <Button
                        key={mode}
                        type="button"
                        variant={
                          formData.consultation_modes.includes(mode)
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handleMultiSelectChange(mode, "consultation_modes")
                        }
                        className="h-8"
                      >
                        {mode}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select all applicable consultation modes
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Languages Spoken</Label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <Button
                        key={lang}
                        type="button"
                        variant={
                          formData.languages.includes(lang)
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handleMultiSelectChange(lang, "languages")
                        }
                        className="h-8"
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select all languages the doctor can communicate in
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/doctor-image.jpg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Provide a URL to the doctor's professional photo
                  </p>
                </div>
                {formData.image_url && (
                  <div className="relative h-32 w-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.image_url}
                      alt="Profile preview"
                      className="rounded-full object-cover h-full w-full"
                      onError={(e) => {
                        e.currentTarget.src = "/default-doctor.png";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Doctor...
                </>
              ) : (
                "Add Doctor"
              )}
            </Button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-8">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-muted-foreground mb-4">
              This is how the doctor's profile will appear to users
            </p>
            <DoctorCard doctor={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}
