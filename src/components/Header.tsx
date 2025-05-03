import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Doctor Portal"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/doctors"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Find Doctors
            </Link>
            <Link
              href="/specialties"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Specialties
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
