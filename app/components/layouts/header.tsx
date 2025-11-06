"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-white shadow-sm z-50"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with proper semantic markup */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm"
            aria-label="Twilight Home"
            onClick={closeMenu}
          >
            <h1
              className="text-3xl font-semibold select-none"
              aria-label="Twilight"
            >
              <span aria-hidden="true" className="text-teal-500 italic font-serif">Twilight</span>

            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 text-lg" role="menubar" aria-label="Main menu">
          <Link
            href="/"
            className="text-black font-semibold hover:text-teal-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            role="menuitem"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href="/rooms"
            className="text-black font-semibold hover:text-teal-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            role="menuitem"
          >
            Rooms
          </Link>
          <Link
            href="/contact"
            className="text-black font-semibold hover:text-teal-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            role="menuitem"
          >
            Contact
          </Link>
        </div>




        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white shadow-md animate-in slide-in-from-top duration-200"
          role="menu"
          aria-label="Mobile menu"
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link
              href="/"
              className="text-black font-semibold hover:text-teal-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
              aria-current="page"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className="text-black font-semibold hover:text-teal-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
              onClick={closeMenu}
            >
              Rooms
            </Link>
            <Link
              href="/contact"
              className="text-black font-semibold hover:text-teal-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
              onClick={closeMenu}
            >
              Contact
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}