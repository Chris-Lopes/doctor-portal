import Image from "next/image";
import { Star } from "lucide-react";
import type { Doctor } from "@/lib/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
          <div className="relative h-32 w-32 sm:h-28 sm:w-28 flex-shrink-0 mx-auto sm:mx-0 mb-4 sm:mb-0">
            <Image
              src={doctor.image_url || "/default-doctor.png"}
              alt={doctor.name}
              fill
              sizes="(max-width: 640px) 128px, 112px"
              priority
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-foreground">
                  {doctor.name}
                </h3>
                <Badge
                  variant="secondary"
                  className="mt-1 text-xs sm:text-sm inline-block"
                >
                  {doctor.specialty}
                </Badge>
              </div>
              <div className="flex items-center justify-center sm:justify-end mt-2 sm:mt-0">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      i < (doctor.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm sm:text-base text-muted-foreground">
                  ({doctor.total_reviews} reviews)
                </span>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
              <p className="text-sm sm:text-base text-muted-foreground">
                {doctor.experience_years} years experience
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                {doctor.qualification}
              </p>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Consultation Fee
                </p>
                <p className="text-lg sm:text-xl font-semibold text-primary">
                  ₹{doctor.consultation_fee}
                </p>
              </div>

              <Button size="lg" className="w-full sm:w-auto">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
