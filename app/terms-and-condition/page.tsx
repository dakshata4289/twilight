"use client";

import { useState } from "react";
import Link from "next/link";

const TermsPage = () => {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
        alert("You have accepted the Terms and Conditions.");
    };

    return (
        <section className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                    Terms and Conditions
                </h1>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
                    Welcome to <span className="font-semibold text-gray-800">Twilight Guesthouse</span>.
                    Please read our Terms and Conditions carefully before using our services. By continuing,
                    you agree to abide by the terms outlined below.
                </p>

                <article className="space-y-6 sm:space-y-8">
                    <section>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                            Privacy Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            This site uses cookies to enhance user experience. Cookies are used for analytics and
                            personalization, but do not collect personal information without consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                            Distribution of Information
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                            We may share information with authorized agencies to prevent fraud or other illegal
                            activities. Information may be disclosed only in the following cases:
                        </p>

                        <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base pl-2">
                            <li>Permitted or required by law</li>
                            <li>Fraud prevention</li>
                            <li>Investigation of fraud</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                            Data Security
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            All personal information is securely stored and accessible only to authorized personnel.
                            You can opt out of email communications anytime.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                            Contact Information
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            For any questions, feedback, or concerns regarding our policies, please reach out to us at{" "}
                            <Link
                                href="/contact"
                                className="text-teal-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                                aria-label="Visit our contact page"
                            >
                                our contact page
                            </Link>.
                        </p>
                    </section>
                </article>

                <div className="mt-8 sm:mt-10 border-t pt-6 text-center">
                    <label className="flex flex-col sm:flex-row items-center justify-center gap-3 text-gray-700 text-base sm:text-lg mb-4 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={() => setAccepted(!accepted)}
                            className="w-5 h-5 accent-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                            aria-label="I accept the Terms and Conditions"
                        />
                        <span className="text-center sm:text-left">I accept the Terms and Conditions</span>
                    </label>

                    <button
                        onClick={handleAccept}
                        disabled={!accepted}
                        aria-disabled={!accepted}
                        className={`w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${accepted
                            ? "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed focus:ring-gray-400"
                            }`}
                    >
                        Accept & Continue
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TermsPage;