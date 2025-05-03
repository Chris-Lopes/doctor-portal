import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold">Doctor Portal</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/specialties"
              className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
            >
              Find Doctors
            </Link>
            <Link
              href="/add-doctor"
              className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Doctor
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
