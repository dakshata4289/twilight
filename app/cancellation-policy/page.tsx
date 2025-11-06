"use client";

import { useState } from "react";
import Link from "next/link";

const CancellationPage = () => {
    const [agreed, setAgreed] = useState(false);

    const handleAccept = () => {
        setAgreed(true);
        alert("You have accepted the Cancellation and Refund Policy.");
    };

    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-6 sm:p-8 lg:p-10">
                {/* Header Section */}
                <header className="text-center mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-10 sm:mb-6">
                        Cancellation and Refund Policy
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        We understand that plans can change. Please review our cancellation and refund terms carefully before proceeding with your booking.
                    </p>
                </header>

                {/* Content Sections */}
                <div className="space-y-6 sm:space-y-8">
                    {/* Cancellation Policy */}
                    <section aria-labelledby="cancellation-policy">
                        <h2 id="cancellation-policy" className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                            Cancellation Policy
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                            <li>Cancellations made more than <strong className="font-semibold">7 days before check-in</strong> will receive a full refund.</li>
                            <li>Cancellations made between <strong className="font-semibold">3 to 7 days before check-in</strong> will incur a 50% fee.</li>
                            <li>Cancellations made less than <strong className="font-semibold">3 days before check-in</strong> are non-refundable.</li>
                            <li><strong className="font-semibold">No refunds</strong> for no-shows or same-day cancellations.</li>
                        </ul>
                    </section>

                    {/* Refund Policy */}
                    <section aria-labelledby="refund-policy">
                        <h2 id="refund-policy" className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                            Refund Policy
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                            <li>Refunds will be processed within <strong className="font-semibold">7 business days</strong>.</li>
                            <li>Refunds will be issued to the <strong className="font-semibold">original payment method</strong>.</li>
                            <li>If there was a payment failure, please contact <Link href="/contact" className="text-teal-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded">support</Link> for assistance.</li>
                        </ul>
                    </section>

                    {/* Exceptions */}
                    <section aria-labelledby="exceptions">
                        <h2 id="exceptions" className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                            Exceptions
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            In case of unexpected events such as natural disasters, government restrictions, or other unforeseen circumstances, we offer flexible cancellation or rescheduling options.
                            Please <Link href="/contact" className="text-teal-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded">contact us</Link> for assistance.
                        </p>
                    </section>

                    {/* How to Cancel */}
                    <section aria-labelledby="how-to-cancel">
                        <h2 id="how-to-cancel" className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                            How to Cancel
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            To cancel your booking, please contact us directly via <strong className="font-semibold">phone</strong> or <strong className="font-semibold">email</strong>. Provide your booking details for quicker assistance.
                        </p>
                    </section>
                </div>

                {/* Agreement Section */}
                <section className="mt-8 sm:mt-10 pt-6 border-t text-center" aria-labelledby="agreement">
                    <h2 id="agreement" className="sr-only">Policy Agreement</h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 sm:mb-6">
                        <label className="flex items-center gap-3 text-gray-700 text-base sm:text-lg cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                                className="w-4 h-4 sm:w-5 sm:h-5 accent-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                                aria-describedby="agreement-description"
                            />
                            <span id="agreement-description">
                                I agree to the Cancellation and Refund Policy
                            </span>
                        </label>
                    </div>

                    <button
                        onClick={handleAccept}
                        disabled={!agreed}
                        aria-disabled={!agreed}
                        className={`w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${agreed
                            ? "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed focus:ring-gray-400"
                            }`}
                    >
                        Accept & Continue
                    </button>
                </section>
            </div>
        </main>
    );
};

export default CancellationPage;