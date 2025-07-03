import { useState } from "react";
const dropdownIcon = "/images/arrow-drop-down-svgrepo-com.svg";
import ListingButtons from "../ListingButtons";

interface Props {
  heading: string;
  onBack: () => void;
  onNext: () => void;
}

const PricingAvailabilityForm = ({ heading, onBack, onNext }: Props) => {
  const [selfDrive, setSelfDrive] = useState<"yes" | "no" | null>(null);
  const [price, setPrice] = useState("");

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">{heading}</h2>

      {/* Availability */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">Availability</label>
        <div className="relative w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer">
          <p className="text-sm text-[#6b7280] flex items-center justify-between">
            Select dates
            <img src={dropdownIcon} className="w-5" alt="dropdown" />
          </p>
        </div>
      </div>

      {/* Self Drive */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">Available on self drive?</label>
        <div className="flex gap-4">
          {["yes", "no"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelfDrive(opt as "yes" | "no")}
              className={`px-6 py-2 rounded-md text-sm font-semibold ${
                selfDrive === opt
                  ? "bg-[#008558] text-white"
                  : "bg-white text-[#1e2a49] border border-gray-300"
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-10">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Price <span className="text-[#6b7280]">per day</span>
        </label>
        <textarea
          rows={1}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
        />
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default PricingAvailabilityForm;
