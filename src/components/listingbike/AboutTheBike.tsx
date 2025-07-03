import { useState } from "react";
import ListingButtons from "../ListingButtons";

const uploadIcon = "/images/upload-icon.svg";
const dropdownIcon = "/images/arrow-drop-down-svgrepo-com.svg";

interface AboutBikeFormProps {
  onNext: () => void;
  onBack: () => void;
}

const AboutBikeForm: React.FC<AboutBikeFormProps> = ({ onNext, onBack }) => {
  const [transmission, setTransmission] = useState<"Manual" | "Automatic">("Automatic");

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">About the bike</h2>

      {/* Photo Upload */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6">
        <div className="p-3 bg-emerald-50 rounded-full">
          <img src={uploadIcon} alt="Upload" className="h-8 w-8" />
        </div>
        <h2 className="text-base font-semibold text-[#283456] mt-2">
          Drop files here or select files to upload
        </h2>
        <p className="text-gray-500 text-sm">You can upload up to 20 JPG files</p>
        <button
          type="button"
          className="text-emerald-700 text-sm mt-2 font-medium hover:underline"
        >
          Select
        </button>
      </div>

      {/* Bike Name */}
      <div className="mb-4">
        <label className="block font-semibold text-sm mb-1">Bike name</label>
        <textarea
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y"
        />
      </div>

      <div className="flex flex-col w-[40%]">
        {/* Make */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Make</label>
          <div className="relative">
            <select className="w-full outline-none border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none">
              <option>Benelli</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>

        {/* Model Year */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Model year</label>
          <div className="relative">
            <select className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none">
              <option>2015</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>

        {/* Fuel */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Fuel</label>
          <div className="relative">
            <select className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none">
              <option>Select fuel</option>
              <option>Petrol</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Type</label>
          <div className="relative">
            <select className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none">
              <option>Select type</option>
              <option>Adventure</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-4">
        <label className="block font-semibold text-sm mb-2">Transmission</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setTransmission("Manual")}
            className={`px-4 py-2 rounded-lg text-sm border ${
              transmission === "Manual"
                ? "bg-[#008558] text-white"
                : "text-gray-700"
            }`}
          >
            Manual
          </button>
          <button
            type="button"
            onClick={() => setTransmission("Automatic")}
            className={`px-4 py-2 rounded-lg text-sm border ${
              transmission === "Automatic"
                ? "bg-[#008558] text-white"
                : "text-gray-700"
            }`}
          >
            Automatic
          </button>
        </div>
      </div>

      {/* Engine Capacity */}
      <div className="mb-6 w-[40%]">
        <label className="block font-semibold text-sm mb-1">Engine capacity</label>
        <div className="relative">
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none">
            <option>Select engine capacity</option>
            <option>250cc</option>
          </select>
          <img
            src={dropdownIcon}
            className="absolute right-4 top-2.5 w-4 pointer-events-none"
            alt="dropdown"
          />
        </div>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default AboutBikeForm;
