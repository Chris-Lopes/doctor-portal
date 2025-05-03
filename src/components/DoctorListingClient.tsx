"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Filters from "./Filters";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between lg:hidden mb-4">
        <h2 className="text-base font-semibold">Filters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2"
        >
          {isFilterOpen ? (
            <>
              <X className="h-4 w-4" />
              Hide
            </>
          ) : (
            <>
              <SlidersHorizontal className="h-4 w-4" />
              Show
            </>
          )}
        </Button>
      </div>
      <div className={`${isFilterOpen ? "block" : "hidden"} lg:block`}>
        <Filters onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}
