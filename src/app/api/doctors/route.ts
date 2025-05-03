import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { FeeRange } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;

    // Get all filter parameters
    const consultationModes = searchParams.getAll("consultationModes[]");
    const experienceRanges = searchParams.getAll("experienceRanges[]");
    const feeRanges = searchParams.getAll("feeRanges[]");
    const languages = searchParams.getAll("languages[]");
    const facilityTypes = searchParams.getAll("facilityTypes[]");
    const sortBy = searchParams.get("sortBy") || "rating";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    let query = supabase.from("doctors").select("*", { count: "exact" });

    // Apply consultation modes filter
    if (consultationModes.length > 0) {
      query = query.contains("consultation_modes", consultationModes);
    }

    // Apply experience ranges filter
    if (experienceRanges.length > 0) {
      // Find the minimum and maximum values across all selected ranges
      const allRanges = experienceRanges.map((range) =>
        range.split("-").map(Number)
      );
      const minExperience = Math.min(...allRanges.map(([min]) => min));
      const maxExperience = Math.max(...allRanges.map(([_, max]) => max));

      query = query
        .gte("experience_years", minExperience)
        .lte("experience_years", maxExperience);
    }

    // Apply fee ranges filter
    if (feeRanges.length > 0) {
      // Find the minimum and maximum values across all selected ranges
      const allRanges = feeRanges.map((range) => range.split("-").map(Number));
      const minFee = Math.min(...allRanges.map(([min]) => min));
      const maxFee = Math.max(...allRanges.map(([_, max]) => max));

      query = query
        .gte("consultation_fee", minFee)
        .lte("consultation_fee", maxFee);
    }

    // Apply languages filter - must have ALL selected languages
    if (languages.length > 0) {
      query = query.contains("languages", languages);
    }

    // Apply facility types filter
    if (facilityTypes.length > 0) {
      query = query.in("facility_type", facilityTypes);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: doctors, count, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch doctors" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      doctors,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("doctors")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
