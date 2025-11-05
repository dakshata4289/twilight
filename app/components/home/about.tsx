// components/About.tsx

import Image from 'next/image';

const About = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center space-y-8 lg:space-x-8 lg:space-y-0 p-6 bg-white">
      {/* Left Section with Image */}
      <div className="relative w-full lg:w-1/2 rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/about.jpg" // Replace with your image path
          alt="Twilight Guest House"
          layout="responsive"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>

      {/* Right Section with Text */}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">About Twilight</h2>
        <p className="text-lg text-gray-600">
          "Twilight" Guest House, formerly known as Xavier's Guest House, is a peaceful
          retreat located just a short stroll from the stunning Benaulim Beach. Offering
          a blend of comfort and serenity, it serves as the perfect getaway for those
          seeking relaxation or a base to explore Goa's vibrant culture. The guest house is
          legally registered under the name Francisco Xavier Fernandes.
        </p>
        <p className="text-lg text-gray-600">
          Twilight provides the ideal setting. Our cozy rooms, including a fully equipped
          studio and a spacious 3BHK, come with modern amenities to ensure a hassle-free
          stay. With warm hospitality, peaceful surroundings, and easy access to local
          attractions, Twilight is your perfect home away from home in South Goa.
        </p>
        <h3 className="text-2xl font-semibold text-gray-800 mt-6">
          We Have Been Serving For <span className="text-teal-600">10 Years</span>.
        </h3>
      </div>
    </section>
  );
};

export default About;
