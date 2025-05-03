import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import type { Doctor } from "@/lib/supabase";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start space-x-4">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src={doctor.image_url || "/default-doctor.png"}
            alt={doctor.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>

          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < (doctor.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({doctor.total_reviews} reviews)
            </span>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {doctor.experience_years} years experience
            </p>
            <p className="text-sm text-gray-600">{doctor.qualification}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Consultation Fee</p>
              <p className="text-lg font-semibold text-blue-600">
                ₹{doctor.consultation_fee}
              </p>
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
