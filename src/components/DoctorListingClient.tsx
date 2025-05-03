import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Filters from "./Filters";

interface FilterState {
  specialty: string;
  minFee: string;
  maxFee: string;
  sortBy: string;
  sortOrder: string;
}

export default function DoctorListingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          current.set(key, value);
        } else {
          current.delete(key);
        }
      });

      // Reset to page 1 when filters change
      if (Object.keys(params).length > 0) {
        current.delete("page");
      }

      const search = current.toString();
      return search ? `?${search}` : "";
    },
    [searchParams]
  );

  const handleFilterChange = (filters: FilterState) => {
    const queryString = createQueryString({
      specialty: filters.specialty,
      minFee: filters.minFee,
      maxFee: filters.maxFee,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });

    router.push(queryString);
  };

  return <Filters onFilterChange={handleFilterChange} />;
}
