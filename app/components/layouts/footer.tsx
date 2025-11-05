"use client";

import { Facebook, Instagram, Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B080C] text-white pt-16 pb-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">About Twilight</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            "Twilight" is a cozy guest house in the heart of Benaulim, offering a relaxing retreat near the beach. 
            With comfortable rooms and modern amenities, it’s the perfect place for a peaceful stay in Goa.
          </p>
          <Link
            href="/sitemap"
            className="inline-flex items-center border border-teal-500 text-white px-5 py-2 hover:bg-teal-500 transition"
          >
            Our SiteMap <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Center Logo + Social Icons */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl italic font-serif text-white mb-4">Twilight</h1>
          <div className="flex items-center justify-center space-x-6 mt-2">
            <div className="w-10 h-10 border border-teal-500 rounded-full flex items-center justify-center hover:bg-teal-500 transition">
              <Link href="https://facebook.com" target="_blank">
                <Facebook className="w-5 h-5 text-teal-400" />
              </Link>
            </div>
            <div className="w-10 h-10 border border-teal-500 rounded-full flex items-center justify-center hover:bg-teal-500 transition">
              <Link href="https://wa.me/919552716073" target="_blank">
                <MessageCircle className="w-5 h-5 text-teal-400" />
              </Link>
            </div>
            <div className="w-10 h-10 border border-teal-500 rounded-full flex items-center justify-center hover:bg-teal-500 transition">
              <Link href="https://instagram.com" target="_blank">
                <Instagram className="w-5 h-5 text-teal-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">Contacts</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-teal-400" />
              <span>+91 9552716073</span>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-teal-400" />
              <span>xavier.guesthousegoa@gmail.com</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-teal-400" />
              <span>
                House No.1480(A) Vasvaddo<br />
                Benaulim Salcete, Goa<br />
                Pin Code 403716
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-10 mx-auto max-w-7xl" />

      {/* Bottom Links */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-10 text-center text-sm font-semibold text-white">
        <Link href="/terms" className="hover:text-teal-400 transition">
          Terms & Conditions
        </Link>
        <Link href="/refund-policy" className="hover:text-teal-400 transition">
          Cancellation & Refund Policy
        </Link>
      </div>
    </footer>
  );
}
