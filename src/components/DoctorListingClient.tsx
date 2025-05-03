"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Filters from "./Filters";

interface FilterState {
  consultationModes: string[];
  experienceRanges: string[];
  feeRanges: string[];
  languages: string[];
  facilityTypes: string[];
  sortBy: string;
  sortOrder: string;
}

export default function DoctorListingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (filters: FilterState) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // Handle consultation modes
      current.delete("consultationModes[]");
      filters.consultationModes.forEach((mode) => {
        current.append("consultationModes[]", mode);
      });

      // Handle experience ranges
      current.delete("experienceRanges[]");
      filters.experienceRanges.forEach((range) => {
        current.append("experienceRanges[]", range);
      });

      // Handle fee ranges
      current.delete("feeRanges[]");
      filters.feeRanges.forEach((range) => {
        current.append("feeRanges[]", range);
      });

      // Handle languages
      current.delete("languages[]");
      filters.languages.forEach((lang) => {
        current.append("languages[]", lang);
      });

      // Handle facility types
      current.delete("facilityTypes[]");
      filters.facilityTypes.forEach((facility) => {
        current.append("facilityTypes[]", facility);
      });

      // Handle sorting
      if (filters.sortBy) {
        current.set("sortBy", filters.sortBy);
      } else {
        current.delete("sortBy");
      }
      if (filters.sortOrder) {
        current.set("sortOrder", filters.sortOrder);
      } else {
        current.delete("sortOrder");
      }

      // Reset to page 1 when filters change
      current.delete("page");

      const search = current.toString();
      return search ? `?${search}` : "";
    },
    [searchParams]
  );

  const handleFilterChange = (filters: FilterState) => {
    const queryString = createQueryString(filters);
    router.push(queryString);
  };

  return <Filters onFilterChange={handleFilterChange} />;
}
