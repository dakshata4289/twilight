"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const RoomDetailsPage = () => {
    const params = useParams();
    const roomId = params?.id;

    const today = new Date().toISOString().split("T")[0];

    const [roomData, setRoomData] = useState<any>(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("1");
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [guestPhone, setGuestPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [showBookingForm, setShowBookingForm] = useState(false);

    // Refs for focus management
    const bookNowButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!roomId) return;

        const fetchRoomData = async () => {
            try {
                const res = await axios.get(
                    `https://dashboard.twilightguesthouse.com/web/rooms/get-room-by-id?id=${roomId}`
                );
                if (res.data?.success) {
                    setRoomData(res.data.room);
                } else {
                    setError("Failed to fetch room details");
                }
            } catch {
                setError("Failed to fetch room details");
            }
        };

        fetchRoomData();
    }, [roomId]);

    useEffect(() => {
        if (!checkIn || !checkOut || !roomData) return;
        let total = 0;
        let current = new Date(checkIn);
        while (current < new Date(checkOut)) {
            total += roomData.price || 0;
            current.setDate(current.getDate() + 1);
        }
        setTotalPrice(total);
    }, [checkIn, checkOut, roomData]);

    // Focus management for modal
    useEffect(() => {
        if (showBookingForm) {
            // Focus first input when modal opens
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 100);

            // Trap focus within modal
            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key === 'Tab') {
                    const focusableElements = modalRef.current?.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    ) as NodeListOf<HTMLElement>;

                    if (focusableElements && focusableElements.length > 0) {
                        const firstElement = focusableElements[0];
                        const lastElement = focusableElements[focusableElements.length - 1];

                        if (e.shiftKey) {
                            if (document.activeElement === firstElement) {
                                lastElement.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                firstElement.focus();
                                e.preventDefault();
                            }
                        }
                    }
                }

                if (e.key === 'Escape') {
                    closeModal();
                }
            };

            document.addEventListener('keydown', handleTabKey);
            return () => document.removeEventListener('keydown', handleTabKey);
        } else {
            // Return focus to book now button when modal closes
            bookNowButtonRef.current?.focus();
        }
    }, [showBookingForm]);

    const handleBooking = async () => {
        if (!checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
            setAlertMsg("Please fill all required fields before booking");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                "https://dashboard.twilightguesthouse.com/web/payments/online-booking",
                {
                    guest_name: guestName,
                    guest_email: guestEmail,
                    guest_phone_number: guestPhone,
                    check_in: checkIn,
                    check_out: checkOut,
                    persons: guests,
                    room_id: roomData.id,
                    total_price: totalPrice,
                }
            );

            if (res.data?.success) {
                window.location.href = res.data.payment_url;
            } else {
                setAlertMsg(res.data.message || "Booking failed");
            }
        } catch {
            setError("Booking request failed");
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowBookingForm(false);
        setAlertMsg("");
    };

    const prevImage = () =>
        setCurrentImgIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));

    const nextImage = () =>
        setCurrentImgIndex((prev) => (prev + 1 >= images.length ? 0 : prev + 1));

    if (error)
        return (
            <div
                className="text-red-500 text-center mt-20 text-lg font-medium px-4"
                role="alert"
                aria-live="assertive"
            >
                {error}
            </div>
        );

    if (!roomData)
        return (
            <div
                className="text-center mt-20 text-gray-600 text-lg px-4"
                aria-live="polite"
            >
                Loading room details...
            </div>
        );

    const images = [roomData.image_url, roomData.image_url1, roomData.image_url2].filter(Boolean);

    return (
        <>
            {/* Enhanced Blur Background Overlay */}
            {showBookingForm && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40 transition-all duration-500"
                    aria-hidden="true"
                />
            )}

            <div
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-all duration-300 ${showBookingForm ? 'blur-sm scale-95' : ''}`}
                aria-hidden={showBookingForm}
            >
                {/* Breadcrumb */}
                <nav
                    className="mb-6 sm:mb-8 mt-12 sm:mt-14"
                    aria-label="Breadcrumb"
                >
                    <ol className="flex items-center space-x-2 text-sm text-gray-500 flex-wrap">
                        <li>Home</li>
                        <li className="text-gray-300" aria-hidden="true">›</li>
                        <li>Rooms</li>
                        <li className="text-gray-300" aria-hidden="true">›</li>
                        <li className="text-gray-900 font-medium">{roomData.room_type}</li>
                    </ol>
                </nav>

                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {/* LEFT COLUMN: IMAGES + BASIC INFO */}
                    <div className="lg:col-span-2">
                        {/* Room Title with Premium Styling */}
                        <div className="mb-6 sm:mb-8">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-3 tracking-tight">
                                {roomData.room_type}
                            </h1>
                            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                        </div>

                        {/* PREMIUM IMAGE SLIDER */}
                        <section aria-label="Room images gallery">
                            <div className="relative group">
                                <div
                                    className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl"
                                    role="region"
                                    aria-label={`Image ${currentImgIndex + 1} of ${images.length}`}
                                >
                                    {images.length > 0 && (
                                        <>
                                            <img
                                                src={`https://dashboard.twilightguesthouse.com/web/uploads/${images[currentImgIndex]}`}
                                                alt={`${roomData.room_type} - Image ${currentImgIndex + 1}`}
                                                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                            {/* Enhanced Navigation Buttons */}
                                            <button
                                                onClick={prevImage}
                                                className="absolute top-1/2 left-2 sm:left-4 md:left-6 -translate-y-1/2 bg-white/90 text-gray-800 p-2 sm:p-3 md:p-4 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg sm:shadow-2xl opacity-100 sm:opacity-0 group-hover:opacity-100"
                                                aria-label="Previous image"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute top-1/2 right-2 sm:right-4 md:right-6 -translate-y-1/2 bg-white/90 text-gray-800 p-2 sm:p-3 md:p-4 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg sm:shadow-2xl opacity-100 sm:opacity-0 group-hover:opacity-100"
                                                aria-label="Next image"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>

                                            {/* Image Counter */}
                                            <div
                                                className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm"
                                                aria-live="polite"
                                                aria-atomic="true"
                                            >
                                                {currentImgIndex + 1} / {images.length}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Image Thumbnails */}
                                {images.length > 1 && (
                                    <div
                                        className="flex gap-2 sm:gap-3 mt-3 sm:mt-4"
                                        role="tablist"
                                        aria-label="Image thumbnails"
                                    >
                                        {images.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImgIndex(index)}
                                                className={`flex-1 h-12 sm:h-16 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${index === currentImgIndex
                                                    ? 'ring-2 ring-teal-500 ring-offset-1 sm:ring-offset-2 scale-105'
                                                    : 'opacity-70 hover:opacity-100'
                                                    }`}
                                                role="tab"
                                                aria-selected={index === currentImgIndex}
                                                aria-label={`View image ${index + 1}`}
                                                aria-controls="image-display"
                                            >
                                                <img
                                                    src={`https://dashboard.twilightguesthouse.com/web/uploads/${img}`}
                                                    alt={`Thumbnail ${index + 1} for ${roomData.room_type}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Enhanced Room Description */}
                        <section aria-labelledby="room-description-heading">
                            <div className="mt-8 sm:mt-12">
                                <h2 id="room-description-heading" className="sr-only">
                                    Room Description
                                </h2>
                                <div className="prose prose-sm sm:prose-lg max-w-none text-gray-600 leading-relaxed">
                                    <p className="text-lg sm:text-xl font-light mb-4 sm:mb-6 text-gray-700">
                                        Experience the charm of our studio room, thoughtfully designed for comfort and convenience.
                                        This one-bedroom retreat features a comfortable bed, a private bathroom, perfect for short
                                        stays or extended visits. Enjoy a peaceful, welcoming space ideal for relaxation and exploration.
                                    </p>
                                </div>

                                {/* Premium Price Display */}
                                <div
                                    className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm mt-6 sm:mt-8"
                                    aria-label="Pricing information"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 sm:gap-0">
                                        <div>
                                            <span className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900">₹2600</span>
                                            <span className="text-gray-500 ml-2 text-base sm:text-lg">/ night</span>
                                        </div>
                                        <button
                                            ref={bookNowButtonRef}
                                            onClick={() => setShowBookingForm(true)}
                                            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform w-full sm:w-auto text-sm sm:text-base"
                                            aria-haspopup="dialog"
                                            aria-expanded={showBookingForm}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                    <p className="text-black text-sm sm:text-md mt-2 sm:mt-3">
                                        Prices may vary based on selected dates
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: AMENITIES & FACILITIES */}
                    <div className="lg:col-span-1 mt-8 lg:mt-0">
                        <div className="sticky top-6 sm:top-8 lg:top-24 space-y-6 sm:space-y-8">
                            {/* Premium Amenities Section */}
                            <section aria-labelledby="amenities-heading">
                                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center mb-4 sm:mb-6">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 id="amenities-heading" className="text-xl sm:text-2xl font-light text-gray-900">Amenities</h3>
                                    </div>
                                    <div className="space-y-3 sm:space-y-4" role="list" aria-label="Room amenities">
                                        {[
                                            "kitchen",
                                            "comfortable bed",
                                            "private bathroom with toiletries",
                                            "high-speed Wi-Fi",
                                            "air conditioning",
                                            "workspace",
                                            "secure entry"
                                        ].map((amenity, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 sm:gap-4 text-gray-700 hover:text-gray-900 transition-colors group"
                                                role="listitem"
                                            >
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="font-medium text-base sm:text-lg">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Premium Facilities Section */}
                            <section aria-labelledby="facilities-heading">
                                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center mb-4 sm:mb-6">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <h3 id="facilities-heading" className="text-xl sm:text-2xl font-light text-gray-900">Facilities & Services</h3>
                                    </div>
                                    <ul className="space-y-3 sm:space-y-4 text-gray-700" role="list" aria-label="Facilities and services">
                                        <li className="flex items-start gap-3 sm:gap-4" role="listitem">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                                            <span className="text-base sm:text-lg">Small kitchen, balcony, super king-size bed, geyser, fridge, ceiling fan</span>
                                        </li>
                                        <li className="flex items-start gap-3 sm:gap-4" role="listitem">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                                            <span className="text-base sm:text-lg">Cleaning of the room is available upon request</span>
                                        </li>
                                        <li className="flex items-start gap-3 sm:gap-4" role="listitem">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                                            <span className="text-base sm:text-lg">Bike/car rental, trips to attractions, boat rides, jetski rides, and car parking</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPACT PREMIUM MODAL BOOKING FORM */}
            {showBookingForm && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="booking-form-title"
                    aria-describedby="booking-form-description"
                    ref={modalRef}
                >
                    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto transform transition-all duration-500 scale-100 border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto">
                        {/* Premium Modal Header */}
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 sm:px-6 py-4 sm:py-5">
                            <div className="flex justify-between items-center">
                                <h3 id="booking-form-title" className="text-lg sm:text-xl font-semibold text-white">
                                    Complete Your Booking
                                </h3>
                                <button
                                    ref={closeButtonRef}
                                    onClick={closeModal}
                                    className="text-white/80 hover:text-white text-lg font-light p-1 rounded-full hover:bg-white/10 transition-all duration-300"
                                    aria-label="Close booking form"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <p id="booking-form-description" className="sr-only">
                                Fill in your details to complete the booking for {roomData.room_type}
                            </p>
                        </div>

                        {/* Compact Modal Body - No Scroll */}
                        <div className="p-4 sm:p-6">
                            <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label htmlFor="guest-name" className="sr-only">
                                            Full Name
                                        </label>
                                        <input
                                            id="guest-name"
                                            type="text"
                                            placeholder="Full Name"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm sm:text-base transition-all duration-300 bg-gray-50/50"
                                            required
                                            aria-required="true"
                                            ref={firstInputRef}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="guest-email" className="sr-only">
                                            Email
                                        </label>
                                        <input
                                            id="guest-email"
                                            type="email"
                                            placeholder="Email"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm sm:text-base transition-all duration-300 bg-gray-50/50"
                                            required
                                            aria-required="true"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="guest-phone" className="sr-only">
                                            Phone Number
                                        </label>
                                        <PhoneInput
                                            id="guest-phone"
                                            placeholder="Phone Number"
                                            value={guestPhone || undefined}
                                            onChange={(value) => setGuestPhone(value || "")}
                                            defaultCountry="IN"
                                            international
                                            className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm sm:text-base transition-all duration-300 bg-gray-50/50"
                                            required
                                            aria-required="true"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="guests" className="sr-only">
                                            Number of Guests
                                        </label>
                                        <select
                                            id="guests"
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm sm:text-base transition-all duration-300 bg-gray-50/50"
                                            aria-label="Number of guests"
                                        >
                                            <option value="1">1 Guest</option>
                                            <option value="2">2 Guests</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        <div>
                                            <label htmlFor="check-in" className="block text-xs font-medium text-gray-600 mb-1">
                                                Check-in
                                            </label>
                                            <input
                                                id="check-in"
                                                type="date"
                                                value={checkIn}
                                                min={today}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm sm:text-base transition-all duration-300 bg-gray-50/50"
                                                required
                                                aria-required="true"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="check-out" className="block text-xs font-medium text-gray-600 mb-1">
                                                Check-out
                                            </label>
                                            <input
                                                id="check-out"
                                                type="date"
                                                value={checkOut}
                                                min={checkIn || today}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm sm:text-base transition-all duration-300 bg-gray-50/50"
                                                required
                                                aria-required="true"
                                            />
                                        </div>
                                    </div>

                                    {/* Compact Total Price Display - Only show when dates are selected */}
                                    {(checkIn && checkOut) ? (
                                        <div
                                            className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-200"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            <div className="text-center">
                                                <p className="text-xs sm:text-sm text-teal-800 font-medium">Total Price</p>
                                                <p className="text-xl sm:text-2xl font-light text-teal-900">₹{totalPrice}</p>
                                                <p className="text-xs text-teal-600 mt-1">
                                                    {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} night(s)
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200"
                                            role="status"
                                        >
                                            <div className="text-center">
                                                <p className="text-xs sm:text-sm text-gray-600 font-medium">Select dates to see total price</p>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 sm:py-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                        aria-busy={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </div>
                                        ) : (
                                            "Confirm Booking"
                                        )}
                                    </button>

                                    {alertMsg && (
                                        <div
                                            className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 sm:p-3"
                                            role="alert"
                                            aria-live="assertive"
                                        >
                                            <p className="text-yellow-800 text-center text-xs sm:text-sm font-medium">
                                                {alertMsg}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RoomDetailsPage;