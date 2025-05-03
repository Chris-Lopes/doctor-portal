import { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import DoctorCard from "@/components/DoctorCard";
import DoctorListingClient from "@/components/DoctorListingClient";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "General Physician & Internal Medicine Specialists | Doctor Portal",
  description:
    "Find and book appointments with the best General Physicians and Internal Medicine specialists. View doctor profiles, ratings, and consultation fees.",
  openGraph: {
    title: "General Physician & Internal Medicine Specialists | Doctor Portal",
    description:
      "Find and book appointments with the best General Physicians and Internal Medicine specialists. View doctor profiles, ratings, and consultation fees.",
    type: "website",
  },
};

async function getDoctors(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const specialty = searchParams.specialty as string;
  const minFee = searchParams.minFee as string;
  const maxFee = searchParams.maxFee as string;
  const sortBy = (searchParams.sortBy as string) || "rating";
  const sortOrder = (searchParams.sortOrder as string) || "desc";

  let query = supabase.from("doctors").select("*", { count: "exact" });

  if (specialty) {
    query = query.eq("specialty", specialty);
  } else {
    query = query.in("specialty", ["General Physician", "Internal Medicine"]);
  }

  if (minFee) {
    query = query.gte("consultation_fee", parseFloat(minFee));
  }
  if (maxFee) {
    query = query.lte("consultation_fee", parseFloat(maxFee));
  }

  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data: doctors, count, error } = await query;

  if (error) {
    throw new Error("Failed to fetch doctors");
  }

  return {
    doctors,
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { doctors, total, page, totalPages } = await getDoctors(searchParams);

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
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                General Physician & Internal Medicine Specialists
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {total} doctors available
              </p>
            </div>

            <div className="space-y-6">
              {doctors?.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <a
                        key={pageNum}
                        href={`?page=${pageNum}${
                          searchParams.specialty
                            ? `&specialty=${searchParams.specialty}`
                            : ""
                        }${
                          searchParams.minFee
                            ? `&minFee=${searchParams.minFee}`
                            : ""
                        }${
                          searchParams.maxFee
                            ? `&maxFee=${searchParams.maxFee}`
                            : ""
                        }${
                          searchParams.sortBy
                            ? `&sortBy=${searchParams.sortBy}`
                            : ""
                        }${
                          searchParams.sortOrder
                            ? `&sortOrder=${searchParams.sortOrder}`
                            : ""
                        }`}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pageNum === page
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </a>
                    )
                  )}
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
