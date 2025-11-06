// components/About.tsx

import Image from "next/image";
import { ShieldCheck, Handshake, Home } from "lucide-react";
import { memo } from "react";

const services = [
  {
    id: 1,
    icon: <ShieldCheck className="w-12 h-12 text-teal-600" aria-hidden="true" />,
    title: "Best Rate Guarantee",
    description: "Always the best price for your stay.",
  },
  {
    id: 2,
    icon: <Handshake className="w-12 h-12 text-teal-600" aria-hidden="true" />,
    title: "Best Stay",
    description: "Comfort and peace in every stay.",
  },
  {
    id: 3,
    icon: <Home className="w-12 h-12 text-teal-600" aria-hidden="true" />,
    title: "Best Service & Facility",
    description: "Exceptional care and modern comfort.",
  },
];

// Pre-calculated blur data URL to avoid computation
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const About = memo(function About() {
  return (
    <section
      className="flex flex-col-reverse lg:flex-row items-center lg:items-start p-4 sm:p-6 lg:p-16 bg-white"
      aria-labelledby="about-heading"
    >
      {/* Left Section with Image */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 rounded-lg overflow-hidden shadow-lg flex items-center justify-center md:mt-18">
        <div className="w-full h-full relative aspect-[4/3]">
          <Image
            src="/about.webp"
            alt="Twilight Guest House exterior with lush green surroundings and comfortable seating area"
            fill
            className="w-full h-full object-cover rounded-lg"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            quality={85}
          />
        </div>
      </div>

      {/* Right Section with Text and Services */}
      <div className="w-full lg:w-1/2 space-y-4 lg:pl-8 xl:pl-12">
        <h2 id="about-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          About Twilight Guest House
        </h2>

        <div role="article" aria-label="Guest house description">
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
            "Twilight" Guest House, formerly known as Xavier's Guest House, is a peaceful
            retreat located just a short stroll from the stunning Benaulim Beach. Offering
            a blend of comfort and serenity, it serves as the perfect getaway for those
            seeking relaxation or a base to explore Goa's vibrant culture. The guest house is
            legally registered under the name Francisco Xavier Fernandes.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
            Twilight provides the ideal setting. Our cozy rooms, including a fully equipped
            studio and a spacious 3BHK, come with modern amenities to ensure a hassle-free
            stay. With warm hospitality, peaceful surroundings, and easy access to local
            attractions, Twilight is your perfect home away from home in South Goa.
          </p>
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
          We Have Been Serving For <span className="text-teal-600">10 Years</span>.
        </h3>

        {/* Services Section */}
        <div className="mt-8 pt-8 border-t border-gray-200" role="region" aria-labelledby="services-heading">
          <h4 id="services-heading" className="sr-only">Our Services and Amenities</h4>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {services.map((service) => (
              <article
                key={service.id}
                className="space-y-2 sm:space-y-4 text-center flex flex-col items-stretch min-h-[200px] sm:min-h-[280px] md:min-h-[300px]"
                aria-labelledby={`service-title-${service.id}`}
              >
                <div className="flex justify-center flex-shrink-0" aria-hidden="true">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-teal-600">
                    {service.icon}
                  </div>
                </div>
                <h5 id={`service-title-${service.id}`} className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 flex-shrink-0 leading-tight">
                  {service.title}
                </h5>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed flex-grow flex items-start justify-center">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;