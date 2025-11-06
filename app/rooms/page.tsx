"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setStatusMessage("Loading rooms information...");
                const res = await axios.get(
                    "https://dashboard.twilightguesthouse.com/web/rooms/get-all-rooms"
                );

                if (res.data?.success) {
                    setRooms(res.data.menuItems || []);
                    if (res.data.menuItems && res.data.menuItems.length > 0) {
                        setStatusMessage(`Loaded ${res.data.menuItems.length} rooms successfully.`);
                    } else {
                        setStatusMessage("No rooms available.");
                    }
                } else {
                    console.warn("No rooms found:", res.data.message);
                    setStatusMessage("No rooms available at this time.");
                }
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
                setStatusMessage("Failed to load rooms. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const getImageUrl = (room: Room) => {
        const filename = room.image_url || room.image_url1 || room.image_url2;
        if (!filename) return "/placeholder.jpg";
        return `https://dashboard.twilightguesthouse.com/web/uploads/${filename.replace(/^\/+/, "")}`;
    };

    return (
        <section
            className="py-16 bg-[#F5F5E9]"
            aria-labelledby="rooms-heading"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-center flex-col md:flex-row gap-6 mt-10 mb-5 text-center md:text-left">
                    <h1
                        id="rooms-heading"
                        className="text-3xl md:text-4xl font-extrabold text-gray-900"
                    >
                        Studio & Deluxe Rooms
                    </h1>
                </div>

                {/* Status Announcement for Screen Readers */}
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                >
                    {statusMessage}
                </div>

                {/* Loading / No Data States */}
                {loading ? (
                    <div
                        className="text-center text-gray-600"
                        role="status"
                        aria-label="Loading rooms"
                    >
                        <p>Loading rooms...</p>
                    </div>
                ) : rooms.length === 0 ? (
                    <div
                        className="text-center text-gray-600"
                        role="status"
                        aria-label="No rooms available"
                    >
                        <p>No rooms available.</p>
                    </div>
                ) : (
                    /* Responsive 3-column grid */
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        role="list"
                        aria-label="Available rooms"
                    >
                        {rooms.map((room, index) => (
                            <div
                                key={room.id}
                                role="listitem"
                                aria-label={`Room ${index + 1} of ${rooms.length}`}
                            >
                                <Link
                                    href={`/rooms/${room.id}`}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition duration-300 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    aria-label={`View details for ${room.room_type}. Maximum occupancy: ${room.max_occupancy} people. ${room.beds} beds.`}
                                    tabIndex={0}
                                >
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={getImageUrl(room)}
                                            alt={`Image of ${room.room_type} room`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                            priority={index < 3}
                                        />
                                    </div>

                                    <div className="py-5 px-4 text-left">
                                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                                            {room.room_type}
                                        </h2>

                                        <div className="text-gray-500 text-sm">
                                            <span aria-label={`Maximum occupancy: ${room.max_occupancy} people`}>
                                                Max Occupancy: {room.max_occupancy}
                                            </span>
                                            {' • '}
                                            <span aria-label={`Number of beds: ${room.beds}`}>
                                                Beds: {room.beds}
                                            </span>
                                        </div>

                                        {/* Hidden descriptive text for screen readers */}
                                        <div className="sr-only">
                                            Click to view more details and book this room.
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Rooms;