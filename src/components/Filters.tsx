"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  consultationModes: string[];
  experienceRanges: string[];
  feeRanges: string[];
  languages: string[];
  facilityTypes: string[];
  sortBy: string;
  sortOrder: string;
}

const CONSULTATION_MODES = ["Hospital Visit", "Online Consult"] as const;

const EXPERIENCE_RANGES = [
  { label: "0-5 years", min: "0", max: "5" },
  { label: "6-10 years", min: "6", max: "10" },
  { label: "11-16 years", min: "11", max: "16" },
  { label: "16+ years", min: "16", max: "100" },
] as const;

const FEE_RANGES = [
  { label: "₹100-500", min: "100", max: "500" },
  { label: "₹500-1000", min: "500", max: "1000" },
  { label: "₹1000+", min: "1000", max: "10000" },
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

const FACILITY_TYPES = ["Apollo Hospital", "Other Clinics"] as const;

const SORT_OPTIONS = [
  { label: "Rating (High to Low)", value: "rating:desc" },
  { label: "Rating (Low to High)", value: "rating:asc" },
  { label: "Fee (High to Low)", value: "consultation_fee:desc" },
  { label: "Fee (Low to High)", value: "consultation_fee:asc" },
] as const;

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    consultationModes: [],
    experienceRanges: [],
    feeRanges: [],
    languages: [],
    facilityTypes: [],
    sortBy: "rating",
    sortOrder: "desc",
  });

  const handleConsultationModeChange = (mode: string) => {
    const newModes = filters.consultationModes.includes(mode)
      ? filters.consultationModes.filter((m) => m !== mode)
      : [...filters.consultationModes, mode];
    const newFilters = { ...filters, consultationModes: newModes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleExperienceRangeChange = (value: string) => {
    const newRanges = filters.experienceRanges.includes(value)
      ? filters.experienceRanges.filter((r) => r !== value)
      : [...filters.experienceRanges, value];
    const newFilters = { ...filters, experienceRanges: newRanges };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFeeRangeChange = (value: string) => {
    const newRanges = filters.feeRanges.includes(value)
      ? filters.feeRanges.filter((r) => r !== value)
      : [...filters.feeRanges, value];
    const newFilters = { ...filters, feeRanges: newRanges };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLanguageChange = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];
    const newFilters = { ...filters, languages: newLanguages };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFacilityTypeChange = (facility: string) => {
    const newFacilities = filters.facilityTypes.includes(facility)
      ? filters.facilityTypes.filter((f) => f !== facility)
      : [...filters.facilityTypes, facility];
    const newFilters = { ...filters, facilityTypes: newFacilities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split(":");
    const newFilters = { ...filters, sortBy: field, sortOrder: order };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold mb-3">Sort By</h2>
        <Select
          value={`${filters.sortBy}:${filters.sortOrder}`}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sorting option" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Accordion
          type="multiple"
          defaultValue={[
            "consultation",
            "experience",
            "fee",
            "language",
            "facility",
          ]}
          className="space-y-2"
        >
          <AccordionItem value="consultation" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline hover:bg-gray-50">
              Mode of Consult
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3">
              <div className="space-y-2">
                {CONSULTATION_MODES.map((mode) => (
                  <div key={mode} className="flex items-center space-x-3">
                    <Checkbox
                      id={`mode-${mode}`}
                      checked={filters.consultationModes.includes(mode)}
                      onCheckedChange={() => handleConsultationModeChange(mode)}
                    />
                    <Label
                      htmlFor={`mode-${mode}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {mode}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline hover:bg-gray-50">
              Experience (In Years)
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3">
              <div className="space-y-2">
                {EXPERIENCE_RANGES.map((range) => (
                  <div
                    key={range.label}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`exp-${range.label}`}
                      checked={filters.experienceRanges.includes(
                        `${range.min}-${range.max}`
                      )}
                      onCheckedChange={() =>
                        handleExperienceRangeChange(`${range.min}-${range.max}`)
                      }
                    />
                    <Label
                      htmlFor={`exp-${range.label}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fee" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline hover:bg-gray-50">
              Fees (In Rupees)
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3">
              <div className="space-y-2">
                {FEE_RANGES.map((range) => (
                  <div
                    key={range.label}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`fee-${range.label}`}
                      checked={filters.feeRanges.includes(
                        `${range.min}-${range.max}`
                      )}
                      onCheckedChange={() =>
                        handleFeeRangeChange(`${range.min}-${range.max}`)
                      }
                    />
                    <Label
                      htmlFor={`fee-${range.label}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="language" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline hover:bg-gray-50">
              Language
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3">
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((language) => (
                  <div key={language} className="flex items-center space-x-3">
                    <Checkbox
                      id={`lang-${language}`}
                      checked={filters.languages.includes(language)}
                      onCheckedChange={() => handleLanguageChange(language)}
                    />
                    <Label
                      htmlFor={`lang-${language}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="facility" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline hover:bg-gray-50">
              Facility
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3">
              <div className="space-y-2">
                {FACILITY_TYPES.map((facility) => (
                  <div key={facility} className="flex items-center space-x-3">
                    <Checkbox
                      id={`facility-${facility}`}
                      checked={filters.facilityTypes.includes(facility)}
                      onCheckedChange={() => handleFacilityTypeChange(facility)}
                    />
                    <Label
                      htmlFor={`facility-${facility}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {facility}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
