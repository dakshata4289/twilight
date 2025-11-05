"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          "https://dashboard.twilightguesthouse.com/web/rooms/get-all-rooms"
        );

        // API returns { success: true, menuItems: [...] }
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 < rooms.length ? prev + 3 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 3 >= 0 ? prev - 3 : Math.max(rooms.length - 3, 0)
    );
  };

  return (
    <section className="py-16 bg-[#F5F5E9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-between items-center flex-wrap mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Studio &{" "}
            <span className="text-teal-600 underline underline-offset-8 decoration-teal-300">
              Deluxe
            </span>{" "}
            Rooms
          </h2>
          <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition">
            View All Rooms
          </button>
        </div>

        {rooms.length > 0 ? (
          <div className="flex justify-center gap-6 overflow-hidden">
            {rooms
              .slice(currentIndex, currentIndex + 3)
              .map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm transform hover:scale-[1.02] transition"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={`https://dashboard.twilightguesthouse.com/uploads/${room.image_url}`}
                      alt={room.room_type}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="py-4 px-3">
                    <h3 className="text-xl font-extrabold text-gray-800">
                      {room.room_type}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {room.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600">No rooms available.</p>
        )}

        {rooms.length > 3 && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prevSlide}
              className="bg-teal-600 p-3 rounded-full text-white hover:bg-teal-700 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-teal-600 p-3 rounded-full text-white hover:bg-teal-700 transition"
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
