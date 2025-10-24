"use client";
import React from "react";
import CheckIcon from "./CheckIcon";

function MiddleRange() {
  return (
    <section
      className="
        px-3 sm:px-6 md:px-10 lg:px-16 
        py-8 sm:py-10 md:py-14 
        grid grid-cols-1 md:grid-cols-2 
        gap-6 sm:gap-8 md:gap-10 items-center
      "
    >
      {/* ===== Left Section (Text & Features) ===== */}
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
          Investment that is suitable for you
        </h1>

        <p className="text-orange-500 text-sm sm:text-base md:text-lg font-medium">
          Your financial freedom is our success
        </p>

        {/* Features List */}
        <div className="mt-3 space-y-3 sm:space-y-4">
          {[
            "We are innovative: bringing future-driven solutions for modern investors.",
            "We are timely: delivering results when you need them most.",
            "We are reliable: trusted by clients across borders to safeguard and grow their wealth.",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-start gap-2 sm:gap-3"
            >
              <CheckIcon size={16} className="flex-shrink-0 text-orange-500" />
              <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Right Section (Video) ===== */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Overlay Text */}
        <h3
          className="
            absolute top-3 sm:top-6 left-2 sm:left-4 
            text-white font-semibold 
            text-xs sm:text-sm md:text-lg 
            drop-shadow-lg max-w-[85%]
          "
        >
          Financial freedom is our success.
        </h3>

        {/* Video */}
        <video
          src="/woman.mp4"
          loop
          muted
          autoPlay
          playsInline
          className="
            w-full 
            h-[180px] sm:h-[260px] md:h-[340px] lg:h-[420px] 
            object-cover
          "
        >
          <source src="/woman.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

export default MiddleRange;
