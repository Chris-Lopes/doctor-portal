"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-lg sm:text-xl font-bold">
                Doctor Portal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/specialties"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/specialties")
                  ? "text-foreground bg-gray-100"
                  : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
              }`}
            >
              Find Doctors
            </Link>
            <Link
              href="/add-doctor"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/add-doctor")
                  ? "text-foreground bg-gray-100"
                  : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
              }`}
            >
              Add Doctor
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              <Link
                href="/specialties"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/specialties")
                    ? "text-foreground bg-gray-100"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Find Doctors
              </Link>
              <Link
                href="/add-doctor"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/add-doctor")
                    ? "text-foreground bg-gray-100"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Add Doctor
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
