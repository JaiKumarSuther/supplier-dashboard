"use client";

import { useState } from "react";
import ListingButtons from "../ListingButtons";

const uploadIcon = "/images/upload-icon.svg";
const addMoreIcon = "/images/add-more-icon.svg";

interface HotelMediaBasicsProps {
  onNext: () => void;
  onBack: () => void;
}

const HotelMediaBasics: React.FC<HotelMediaBasicsProps> = ({ onNext, onBack }) => {
  const [roomName, setRoomName] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [peopleCount, setPeopleCount] = useState("3");
  const [bedTypes, setBedTypes] = useState<string[]>([""]);

  const amenitiesOptions = ["WiFi", "TV", "AC", "Heater", "Mini Bar", "Balcony"];

  const toggleAmenity = (value: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        Hotel Media & Basics
      </h2>

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

      {/* Room Name */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Room name</label>
        <textarea
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>

      {/* Room Size */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Room size (sq ft)</label>
        <textarea
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
          value={roomSize}
          onChange={(e) => setRoomSize(e.target.value)}
        />
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-sm">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesOptions.map((item) => (
            <label key={item} className="flex items-center text-sm">
              <input
                type="checkbox"
                value={item}
                checked={selectedAmenities.includes(item)}
                onChange={() => toggleAmenity(item)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* People Capacity */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          How many people can stay in the room?
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={peopleCount}
          onChange={(e) => setPeopleCount(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      {/* Bed Types */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          How many beds are in the room?
        </label>
        {bedTypes.map((bed, index) => (
          <div key={index} className="mb-2">
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              value={bed}
              onChange={(e) => {
                const updated = [...bedTypes];
                updated[index] = e.target.value;
                setBedTypes(updated);
              }}
            >
              <option value="">Select bed type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Queen">Queen</option>
              <option value="King">King</option>
            </select>
          </div>
        ))}

        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[#008558] bg-[#EBFFF7] px-4 py-2 rounded-full font-medium text-sm hover:bg-[#d4f5e8] transition"
          onClick={() => setBedTypes([...bedTypes, ""])}
        >
          <img src={addMoreIcon} alt="Add more" className="w-4 h-4" />
          <span>more</span>
        </button>
      </div>

      {/* Navigation Buttons */}
      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default HotelMediaBasics;
