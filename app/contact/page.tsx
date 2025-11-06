// pages/contact.tsx
import React from "react";

const Contact: React.FC = () => {
    return (
        <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* Left: Contact Info */}
                <div className="lg:w-1/2 flex flex-col justify-center gap-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Have questions or want to reach us? We'd love to hear from you.
                    </p>

                    <div className="space-y-6 mt-6">
                        {/* Location */}
                        <div
                            className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                            role="region"
                            aria-label="Location information"
                        >
                            <div className="text-blue-600 text-3xl" aria-hidden="true">📍</div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-900 mb-2">Location</h2>
                                <address className="text-gray-700 not-italic leading-relaxed">
                                    House No.1480(A), Vasvaddo, Benaulim, Salcete, Goa <br />
                                    Pincode 403716
                                </address>
                            </div>
                        </div>

                        {/* Phone */}
                        <div
                            className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                            role="region"
                            aria-label="Phone information"
                        >
                            <div className="text-green-500 text-3xl" aria-hidden="true">📞</div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-900 mb-2">Phone</h2>
                                <a
                                    href="tel:+919552716073"
                                    className="text-blue-600 hover:underline mt-1 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                    aria-label="Call us at +91 9552716073"
                                >
                                    +91 9552716073
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div
                            className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                            role="region"
                            aria-label="Email information"
                        >
                            <div className="text-red-500 text-3xl" aria-hidden="true">✉️</div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-900 mb-2">Email</h2>
                                <a
                                    href="mailto:xavier.guesthousegoa@gmail.com"
                                    className="text-blue-600 hover:underline mt-1 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded break-all"
                                    aria-label="Email us at xavier.guesthousegoa@gmail.com"
                                >
                                    xavier.guesthousegoa@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Map */}
                <div
                    className="lg:w-1/2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                    role="region"
                    aria-label="Location map"
                >
                    <iframe
                        title="Guesthouse Xavier Benaulim Location Map - House No.1480(A), Vasvaddo, Benaulim, Salcete, Goa, Pincode 403716"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6182.959154762936!2d73.92421901918748!3d15.260744314808158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb472e2c0985f%3A0x9fc05a1f4bd032c1!2sGuesthouse%20Xavier%20Benaulim!5e0!3m2!1sen!2sin!4v1731910837373!5m2!1sen!2sin"
                        className="w-full h-96 lg:h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        aria-label="Interactive map showing Guesthouse Xavier location in Benaulim, Goa"
                    />
                </div>
            </div>
        </main>
    );
};

export default Contact;