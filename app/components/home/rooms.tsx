"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

interface Room {
  id: number;
  room_number: number;
  room_type: string;
  description: string;
  max_occupancy: number;
  beds: number;
  amenities: string;
  image_url: string;
  image_url1: string;
  image_url2: string;
  status: string;
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          "https://dashboard.twilightguesthouse.com/web/rooms/get-all-rooms",
          { withCredentials: true }
        );

        if (res.data.success) {
          setRooms(res.data.menuItems || []);
        } else {
          console.warn("No rooms found:", res.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getVisibleRoomsCount = useCallback(() => {
    return isMobile ? 1 : 3;
  }, [isMobile]);

  const nextSlide = useCallback(() => {
    const visibleCount = getVisibleRoomsCount();
    setCurrentIndex((prev) =>
      prev + visibleCount < rooms.length ? prev + visibleCount : 0
    );
  }, [rooms.length, getVisibleRoomsCount]);

  const prevSlide = useCallback(() => {
    const visibleCount = getVisibleRoomsCount();
    setCurrentIndex((prev) =>
      prev - visibleCount >= 0 ? prev - visibleCount : Math.max(rooms.length - visibleCount, 0)
    );
  }, [rooms.length, getVisibleRoomsCount]);

  const getImageUrl = useCallback((room: Room) => {
    const filename = room.image_url || room.image_url1 || room.image_url2;
    return `https://dashboard.twilightguesthouse.com/web/uploads/${filename.replace(/^\/+/, "")}`;
  }, []);

  const visibleRoomsCount = getVisibleRoomsCount();
  const shouldShowControls = rooms.length > visibleRoomsCount;

  return (
    <section className="py-16 bg-[#F5F5E9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-between items-center flex-col md:flex-row gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Studio & Deluxe{" "}

            Rooms
          </h2>
          <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition whitespace-nowrap">
            View All Rooms
          </button>
        </div>

        {rooms.length > 0 ? (
          <div className="flex justify-center gap-6 overflow-hidden">
            {rooms
              .slice(currentIndex, currentIndex + visibleRoomsCount)
              .map((room) => (
                <div
                  key={room.id}
                  className={`${isMobile ? "w-full max-w-sm" : "w-full max-w-sm"
                    } flex-shrink-0`}
                >
                  <Link
                    href={`/rooms/${room.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden block transform hover:scale-[1.02] transition"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={getImageUrl(room)}
                        alt={room.room_type}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    <div className="py-4 px-3">
                      <h3 className="text-xl font-extrabold text-gray-800">
                        {room.room_type}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2">
                        Max Occupancy: {room.max_occupancy}, Beds: {room.beds}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600">No rooms available.</p>
        )}

        {shouldShowControls && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prevSlide}
              className="bg-teal-600 p-3 rounded-full text-white hover:bg-teal-700 transition"
              aria-label="Previous rooms"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-teal-600 p-3 rounded-full text-white hover:bg-teal-700 transition"
              aria-label="Next rooms"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rooms;