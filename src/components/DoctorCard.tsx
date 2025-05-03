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
      <CardContent className="p-6">
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
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {doctor.name}
                </h3>
                <Badge variant="secondary" className="mt-1">
                  {doctor.specialty}
                </Badge>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < (doctor.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({doctor.total_reviews} reviews)
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                {doctor.experience_years} years experience
              </p>
              <p className="text-sm text-muted-foreground">
                {doctor.qualification}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Consultation Fee
                </p>
                <p className="text-lg font-semibold text-primary">
                  ₹{doctor.consultation_fee}
                </p>
              </div>

              <Button>Book Now</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
