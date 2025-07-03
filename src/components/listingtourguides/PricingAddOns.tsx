import { useState } from "react";
import ListingButtons from "../ListingButtons";

interface PricingAddOnsProps {
  onBack: () => void;
  onNext: () => void;
}

const PricingAddOns: React.FC<PricingAddOnsProps> = ({ onBack, onNext }) => {
  const [selectedType, setSelectedType] = useState("person");

  return (
    <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">Pricing & Add Ons</h2>

      {/* Base Price Card */}
      <div className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row gap-6 mb-5 shadow-sm">
        <div className="sm:w-36 flex border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
          Base Price
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <div className="relative">
              <input
                type="text"
                placeholder="450,000"
                defaultValue="450,000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
              />
              <span className="absolute right-4 top-2.5 text-sm text-gray-400">PKR</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Age range</label>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="number"
                defaultValue={2}
                className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center text-sm"
              />
              <span className="text-gray-600 text-sm">to</span>
              <input
                type="number"
                defaultValue={12}
                className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center text-sm"
              />
              <span className="text-sm text-gray-400">years old</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Age group</label>
            <input
              type="text"
              placeholder="i.e adults"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-medium mb-6"
      >
        <span className="text-xl leading-none">+</span> Secondary price groups
      </button>

      {/* Add-On Card */}
      <div className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row gap-6 mb-5 shadow-sm">
        <div className="sm:w-36 flex border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
          Add On 1
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Add on</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="450,000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
              />
              <span className="absolute right-4 top-2.5 text-sm text-gray-400">PKR</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Type</label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedType("person")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                  selectedType === "person"
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-[#1e2a49] border-gray-300"
                }`}
              >
                Per person
              </button>
              <button
                type="button"
                onClick={() => setSelectedType("booking")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                  selectedType === "booking"
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-[#1e2a49] border-gray-300"
                }`}
              >
                Per booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-medium mb-8"
      >
        <span className="text-xl leading-none">+</span> More add ons
      </button>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default PricingAddOns;
