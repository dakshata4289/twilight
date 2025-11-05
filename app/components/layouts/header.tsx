"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
       
        <h1 className="text-3xl font-semibold select-none">
          <span className="text-teal-500 italic font-serif">T</span>
          <span className="italic font-serif text-black">wilight</span>
        </h1>
      </div>

      {/* Center: Nav Links */}
      <div className="flex space-x-10 text-lg">
        <Link
          href="/"
          className="text-teal-500 font-medium hover:text-teal-600 transition"
        >
          Home
        </Link>
        <Link
          href="/rooms"
          className="text-gray-800 hover:text-teal-500 transition"
        >
          Rooms
        </Link>
        <Link
          href="/contact"
          className="text-gray-800 hover:text-teal-500 transition"
        >
          Contact
        </Link>
      </div>

      {/* Right: Book Now Button */}
      <Link
        href="/book"
        className="bg-teal-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-teal-600 transition"
      >
        Book Now
      </Link>
    </nav>
  );
}
