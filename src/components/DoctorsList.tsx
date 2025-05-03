"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import DoctorCard from "@/components/DoctorCard";
import { Pagination } from "@/components/ui/pagination";
import type { Doctor } from "@/lib/supabase";

export default function DoctorsList() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const createQueryString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      return `?${params.toString()}`;
    },
    [searchParams]
  );

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        setError(null);

        // Create URL with current search params
        const apiUrl = `/api/doctors?${searchParams.toString()}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch doctors");
        }

        setDoctors(data.doctors || []);
        setTotal(data.total || 0);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch doctors"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!doctors.length) {
    return (
      <div className="text-gray-600 p-8 text-center bg-gray-50 rounded-lg">
        <p className="font-semibold">No doctors found</p>
        <p className="mt-2">Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          General Physician & Internal Medicine Specialists
        </h1>
        <p className="mt-1 sm:mt-2 text-sm text-gray-600">
          {total} doctor{total !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        createQueryString={createQueryString}
      />
    </div>
  );
}
