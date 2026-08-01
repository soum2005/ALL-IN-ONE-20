import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kolkata Guide - Explore Kolkata Easily",
  description:
    "Find tourist places, movie halls, metro stations, buses, ticket prices, timings, and Google Maps directions for Kolkata in one place.",
  keywords: [
    "Kolkata",
    "Kolkata Travel Guide",
    "Kolkata Metro",
    "Kolkata Tourist Spots",
    "Kolkata Food",
    "Nandan Movie Hall",
    "Victoria Memorial",
    "Dakshineswar Temple",
    "How to reach",
  ],
  authors: [{ name: "Kolkata Guide Team" }],
  openGraph: {
    title: "Kolkata Guide - Ultimate Travel Companion",
    description:
      "Instantly search for any spot in Kolkata, see ticket prices, opening/closing hours, closed days, and how to reach via Metro, Bus, or Auto.",
    type: "website",
    locale: "en_IN",
    siteName: "Kolkata Guide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black select-none">
        {children}
      </body>
    </html>
  );
}
