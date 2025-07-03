import { useState } from "react";
import ListingButtons from "../ListingButtons";

const dropdownIcon = "/images/arrow-drop-down-svgrepo-com.svg";

interface CarPricingAvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

const CarPricingAvailability: React.FC<CarPricingAvailabilityProps> = ({
  onNext,
  onBack,
}) => {
  const [selfDrive, setSelfDrive] = useState<"yes" | "no" | null>(null);

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        Pricing & Availability
      </h2>

      {/* Availability */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Availability
        </label>
        <div className="relative w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer">
          <p className="text-sm text-[#6b7280] flex items-center justify-between">
            Select dates
            <img src={dropdownIcon} className="w-5" alt="dropdown" />
          </p>
        </div>
      </div>

      {/* Self Drive */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Available on self drive?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setSelfDrive("yes")}
            className={`px-6 py-2 rounded-md text-sm font-semibold ${
              selfDrive === "yes"
                ? "bg-[#008558] text-white"
                : "bg-white text-[#1e2a49] border border-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setSelfDrive("no")}
            className={`px-6 py-2 rounded-md text-sm font-semibold ${
              selfDrive === "no"
                ? "bg-[#008558] text-white"
                : "bg-white text-[#1e2a49] border border-gray-300"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mb-10">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Price <span className="text-[#6b7280]">per day</span>
        </label>
        <textarea
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
        ></textarea>
      </div>

      {/* Navigation Buttons */}
      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default CarPricingAvailability;
