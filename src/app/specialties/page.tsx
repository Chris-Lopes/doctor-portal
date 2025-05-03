import { Metadata } from "next";
import { Suspense } from "react";
import DoctorListingClient from "@/components/DoctorListingClient";
import DoctorsList from "@/components/DoctorsList";

export const metadata: Metadata = {
  title: "Specialists | Doctor Portal",
  description:
    "Find and book appointments with the best medical specialists. View doctor profiles, ratings, and consultation fees.",
  openGraph: {
    title: "Specialists | Doctor Portal",
    description:
      "Find and book appointments with the best medical specialists. View doctor profiles, ratings, and consultation fees.",
    type: "website",
  },
};

export default function SpecialtiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          <aside className="lg:w-1/4 bg-white rounded-lg shadow-sm border">
            <Suspense fallback={<div className="p-4">Loading filters...</div>}>
              <DoctorListingClient />
            </Suspense>
          </aside>
          <div className="lg:w-3/4">
            <Suspense fallback={<div className="p-4">Loading doctors...</div>}>
              <DoctorsList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
