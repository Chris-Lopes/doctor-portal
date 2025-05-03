import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Transform and validate the data
    const transformedData = {
      name: body.name,
      specialty: body.specialty,
      experience_years: parseInt(body.experience_years),
      consultation_fee: parseFloat(body.consultation_fee),
      qualification: body.qualification,
      languages: body.languages,
      consultation_modes: body.consultation_modes,
      facility_type: body.facility_type,
      image_url: body.image_url || null,
    };

    // Validate required fields
    const requiredFields = [
      "name",
      "specialty",
      "experience_years",
      "consultation_fee",
      "qualification",
      "languages",
      "consultation_modes",
      "facility_type",
    ];

    const missingFields = requiredFields.filter(
      (field) =>
        !transformedData[field] ||
        (Array.isArray(transformedData[field]) &&
          transformedData[field].length === 0)
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (
      isNaN(transformedData.experience_years) ||
      transformedData.experience_years < 0
    ) {
      return NextResponse.json(
        { error: "Experience years must be a valid positive number" },
        { status: 400 }
      );
    }

    if (
      isNaN(transformedData.consultation_fee) ||
      transformedData.consultation_fee < 100
    ) {
      return NextResponse.json(
        { error: "Consultation fee must be at least 100" },
        { status: 400 }
      );
    }

    // Validate enums
    const validSpecialties = [
      "General Physician",
      "Internal Medicine",
      "Pediatrician",
      "Dermatologist",
      "Cardiologist",
      "Neurologist",
    ];

    if (!validSpecialties.includes(transformedData.specialty)) {
      return NextResponse.json(
        { error: "Invalid specialty selected" },
        { status: 400 }
      );
    }

    const validFacilityTypes = ["Apollo Hospital", "Other Clinics"];
    if (!validFacilityTypes.includes(transformedData.facility_type)) {
      return NextResponse.json(
        { error: "Invalid facility type selected" },
        { status: 400 }
      );
    }

    const validConsultationModes = ["Hospital Visit", "Online Consult"];
    const invalidModes = transformedData.consultation_modes.filter(
      (mode) => !validConsultationModes.includes(mode)
    );
    if (invalidModes.length > 0) {
      return NextResponse.json(
        { error: `Invalid consultation modes: ${invalidModes.join(", ")}` },
        { status: 400 }
      );
    }

    const validLanguages = [
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
    ];
    const invalidLanguages = transformedData.languages.filter(
      (lang) => !validLanguages.includes(lang)
    );
    if (invalidLanguages.length > 0) {
      return NextResponse.json(
        { error: `Invalid languages: ${invalidLanguages.join(", ")}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("doctors")
      .insert([transformedData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Doctor added successfully",
        doctor: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
