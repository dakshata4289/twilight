"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full bg-white">
      {/* Left Content */}
      <div className="w-full md:w-1/2 px-10 py-20 flex flex-col items-start justify-center bg-white">
        <p className="text-gray-500 tracking-widest uppercase mb-4 text-sm md:text-base">
          Find The Coolest Stay
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 font-serif mb-6">
          Enjoy The Best <br /> Experience At <br /> Twilight.
        </h1>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 relative h-[400px] md:h-[650px]">
        <Image
          src="/twilight-building.jpg" // 👈 place your image in /public/
          alt="Twilight Guest House"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
