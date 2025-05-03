import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Doctor Portal",
    default: "Doctor Portal - Find and Book Doctor Appointments",
  },
  description:
    "Find and book appointments with the best doctors in your area. View doctor profiles, ratings, and consultation fees.",
  keywords: ["doctor", "appointment", "medical", "healthcare", "consultation"],
  authors: [{ name: "Doctor Portal" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Doctor Portal",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
