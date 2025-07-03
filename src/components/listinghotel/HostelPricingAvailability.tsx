'use client';

import { useState } from "react";
import ListingButtons from "../ListingButtons";

const dropdownIcon = "/images/arrow-drop-down-svgrepo-com.svg";

interface HotelPricingAvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

const HotelPricingAvailability: React.FC<HotelPricingAvailabilityProps> = ({
  onNext,
  onBack,
}) => {
  const [price, setPrice] = useState("");
  const [breakfastIncluded, setBreakfastIncluded] = useState<"yes" | "no" | "">("");

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-[28px] font-bold text-[#283456] mb-6">
        Pricing & Availability
      </h2>

      <form className="space-y-6">
        {/* Availability Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#283456]">
            Availability
          </label>
          <div className="relative border rounded-md w-[280px] px-4 py-2 cursor-pointer flex items-center justify-between">
            <p className="text-gray-500 text-sm">Select dates</p>
            <img src={dropdownIcon} alt="dropdown" className="w-5" />
          </div>
        </div>

        {/* Price and Breakfast */}
        <div className="flex flex-wrap gap-10 mt-6">
          {/* Price Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#283456]">
              Price <span className="text-gray-400">per night</span>
            </label>
            <textarea
              rows={1}
              className="w-[280px] border rounded-md px-4 py-2 text-sm resize-none focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></textarea>
          </div>

          {/* Breakfast Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#283456]">
              Breakfast Included?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  breakfastIncluded === "yes"
                    ? "bg-[#008558] text-white"
                    : "bg-white border text-[#283456]"
                }`}
                onClick={() => setBreakfastIncluded("yes")}
              >
                Yes
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  breakfastIncluded === "no"
                    ? "bg-[#008558] text-white"
                    : "bg-white border text-[#283456]"
                }`}
                onClick={() => setBreakfastIncluded("no")}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <ListingButtons onBack={onBack} onNext={onNext} />
      </form>
    </div>
  );
};

export default HotelPricingAvailability;
