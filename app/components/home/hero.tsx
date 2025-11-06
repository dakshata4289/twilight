"use client";

import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Head>
        <title>Twilight Guest House - Premium Accommodation Experience</title>
        <meta
          name="description"
          content="Discover the coolest stay at Twilight Guest House. Enjoy premium comfort, exceptional service, and unforgettable experiences in our luxury accommodations."
        />
        <meta
          name="keywords"
          content="Twilight Guest House, luxury stay, premium accommodation, vacation rental, hotel alternative"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Twilight Guest House - Premium Accommodation Experience" />
        <meta
          property="og:description"
          content="Enjoy the best experience at Twilight Guest House with premium comfort and exceptional service."
        />
        <meta property="og:image" content="/twilight-building.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com" />
        {/* Preload critical image */}
        <link rel="preload" href="/twilight-building.jpg" as="image" />
      </Head>

      <section
        className="flex flex-col md:flex-row items-center justify-between w-full bg-white min-h-[85vh]"
        aria-label="Twilight Guest House Hero Section"
        role="banner"
      >
        {/* Left Content */}
        <div
          className="w-full md:w-1/2 px-6 sm:px-8 lg:pl-28 md:pl-14 sm:pl-20 py-12 md:py-24 flex flex-col justify-center bg-white text-center md:text-left"
          // Improved reading order and focus management
          style={{ order: 1 }}
        >
          <p
            className="text-gray-600 tracking-[0.25em] uppercase mb-4 md:mb-6 text-sm sm:text-base font-medium select-none"
            aria-label="Find The Coolest Stay"
          // Better color contrast for accessibility
          >
            Find The Coolest Stay
          </p>

          <h1
            className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-tight font-serif font-bold text-gray-900 select-none"
            id="main-heading"
            tabIndex={-1}
          // Reduced text size hierarchy for better performance
          >
            Enjoy The Best <br />
            Experience At <br />
            <span
              className="text-teal-600 italic font-serif"
              // Improved color contrast
              aria-label="Twilight Guest House"
            >
              Twilight.
            </span>
          </h1>

          {/* Enhanced hidden content for screen readers */}
          <div className="sr-only" aria-hidden="false">
            <h2>Twilight Guest House - Premium Accommodation Experience</h2>
            <p>
              Discover luxury accommodations with premium comfort, exceptional service,
              and unforgettable experiences at Twilight Guest House. Book your stay today
              for the coolest vacation experience.
            </p>
            <nav aria-label="Quick actions">
              <ul>
                <li><a href="#booking">Book Now</a></li>
                <li><a href="#rooms">View Rooms</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="w-full md:w-1/2 relative h-[300px] sm:h-[400px] md:h-[650px] lg:h-[700px]"
          role="img"
          aria-label="Luxury Twilight Guest House building exterior with elegant architecture and beautiful landscaping"
          // Improved loading states
          style={{ order: 2 }}
        >
          {!imageError ? (
            <Image
              src="/twilight-building.webp"
              alt="Modern luxury Twilight Guest House building with elegant architecture, contemporary design, and beautiful landscaping surrounded by nature"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkX0RbNao4n6HW8IioTQ3mU1UhlgkCkfMkgy6sSkPmMb+9h2rBXCKiWUyMDVDoL1t7P/xAAaEQACAwEBAAAAAAAAAAAAAAABAgAEMQOS/9oACAECAQE/AHa0Vj2f/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAECEDH/2gAIAQMBAT8AdFHL/9k="
              className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              onLoad={handleImageLoad}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                setImageError(true);
                handleImageError();
              }}
              loading="eager"
            // Improved performance with eager loading for above-fold image
            />
          ) : (
            // Fallback content for when image fails to load
            <div
              className="w-full h-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center"
              aria-label="Image not available - Twilight Guest House visual representation"
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4" aria-hidden="true">🏨</div>
                <p className="text-gray-700 font-semibold">Twilight Guest House</p>
                <p className="text-gray-600 text-sm mt-2">Luxury Accommodations</p>
              </div>
            </div>
          )}

          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div
              className="absolute inset-0 bg-gray-200 animate-pulse"
              aria-label="Loading image..."
            />
          )}
        </div>
      </section>
    </>
  );
}