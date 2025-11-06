"use client";

import { MessageCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B080C] text-white pt-16 pb-6" role="contentinfo" aria-label="Site footer">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* About Section */}
        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-2xl font-semibold text-teal-400 mb-4">
            About Twilight
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            &quot;Twilight&quot; is a cozy guest house in the heart of Benaulim, offering a relaxing retreat near the beach.
            With comfortable rooms and modern amenities, it&rsquo;s the perfect place for a peaceful stay in Goa.
          </p>
          <a
            href="https://www.google.com/maps/place/Guesthouse+Xavier+Benaulim/@15.2607443,73.924219,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-teal-500 text-white px-5 py-2 hover:bg-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#0B080C]"
            aria-label="Open location on Google Maps"
          >
            Our SiteMap
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </a>

        </section>

        {/* Center Logo + Social Icons */}
        <section className="flex flex-col items-center justify-center text-center" aria-labelledby="social-heading">
          <h1 id="social-heading" className="text-2xl italic font-serif text-white mb-4">
            Twilight
          </h1>
          <div className="flex items-center justify-center space-x-4 mt-2" role="list" aria-label="Social media links">

            <div role="listitem">
              <Link
                href="https://wa.me/919552716073"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-teal-500 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#0B080C]"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-teal-400 group-hover:text-white" aria-hidden="true" />
              </Link>
            </div>


          </div>
        </section>

        {/* Contacts */}
        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-2xl font-semibold text-teal-400 mb-4">
            Contact Us
          </h2>
          <address className="space-y-4 not-italic">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <a
                href="tel:+919552716073"
                className="hover:text-teal-400 transition-colors focus:outline-none focus:text-teal-400"
                aria-label="Call us at +91 9552716073"
              >
                +91 9552716073
              </a>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <a
                href="mailto:xavier.guesthousegoa@gmail.com"
                className="hover:text-teal-400 transition-colors focus:outline-none focus:text-teal-400 break-all"
                aria-label="Email us at xavier.guesthousegoa@gmail.com"
              >
                xavier.guesthousegoa@gmail.com
              </a>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-gray-300">
                House No.1480(A) Vasvaddo<br />
                Benaulim Salcete, Goa<br />
                Pin Code 403716
              </span>
            </div>
          </address>
        </section>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-8 md:my-10 mx-auto max-w-7xl" aria-hidden="true" />

      {/* Bottom Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav aria-label="Legal links">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10 text-center text-sm font-semibold text-white">
            <Link
              href="/terms-and-condition"
              className="hover:text-teal-400 transition-colors focus:outline-none focus:text-teal-400 py-1"
              aria-label="View terms and conditions"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/cancellation-policy"
              className="hover:text-teal-400 transition-colors focus:outline-none focus:text-teal-400 py-1"
              aria-label="View cancellation and refund policy"
            >
              Cancellation & Refund Policy
            </Link>
          </div>
        </nav>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-6">
          <p>&copy; {currentYear} Twilight Guest House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;