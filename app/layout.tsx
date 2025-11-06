import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "./components/layouts/header";
import Footer from "./components/layouts/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twilight Guest House | Benaulim, Goa",
  description:
    "Twilight is a cozy guest house in the heart of Benaulim, Goa. Enjoy a relaxing beachside retreat with comfort and modern amenities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon + SEO + Open Graph */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Twilight Guest House, Goa stay, Benaulim guest house, beachside rooms, affordable stay Goa"
        />
        <meta name="author" content="Twilight Guest House" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (for Google, Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content="Twilight Guest House | Benaulim, Goa" />
        <meta
          property="og:description"
          content="Twilight is a cozy guest house in the heart of Benaulim, Goa. Enjoy a relaxing beachside retreat with comfort and modern amenities."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://twilightguesthouse.com" />
        <meta property="og:image" content="/Twilight.svg" />
        <meta name="theme-color" content="#ffffff" />

        {/* ✅ Favicon and icons */}
        <link rel="icon" href="/Twilight.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Twilight.svg" />
        <link rel="shortcut icon" href="/Twilight.svg" />

        <title>Twilight Guest House | Benaulim, Goa</title>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
