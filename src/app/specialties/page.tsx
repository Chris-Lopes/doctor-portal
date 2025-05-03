import { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
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
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <DoctorListingClient />
            </Suspense>
          </aside>
          <div className="md:w-3/4">
            <Suspense fallback={<div>Loading doctors...</div>}>
              <DoctorsList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
