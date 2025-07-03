'use client';

import { useState } from "react";
import ListingButtons from "../ListingButtons";
const uploadIcon = "/images/upload-icon.svg";

interface AboutTheExperienceProps {
  onNext: () => void;
  onBack: () => void;
}

const AboutTheExperience: React.FC<AboutTheExperienceProps> = ({ onNext, onBack }) => {
  const [experienceType, setExperienceType] = useState("");
  const [durationDays, setDurationDays] = useState("3");
  const [durationType, setDurationType] = useState("days");
  const [locations, setLocations] = useState("");
  const [startsIn, setStartsIn] = useState("");
  const [ageRange, setAgeRange] = useState({ min: "0", max: "11" });
  const [minPeople, setMinPeople] = useState("4");
  const [difficulty, setDifficulty] = useState("");
  const [availability, setAvailability] = useState("");

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">About the Experience</h2>

      {/* Photo Upload Section */}
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

      {/* Experience Type */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Experience type</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={experienceType}
          onChange={(e) => setExperienceType(e.target.value)}
        >
          <option>Select types</option>
          <option>Cultural</option>
          <option>Adventure</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Duration</label>
        <div className="flex gap-3">
          <select
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>days</option>
            <option>hours</option>
          </select>
        </div>
      </div>

      {/* Locations Covered */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Locations covered</label>
        <select
          value={locations}
          onChange={(e) => setLocations(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select locations</option>
          <option>Hunza</option>
          <option>Skardu</option>
        </select>
      </div>

      {/* Starts In */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Starts in</label>
        <select
          value={startsIn}
          onChange={(e) => setStartsIn(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select</option>
          <option>Lahore</option>
          <option>Islamabad</option>
        </select>
      </div>

      {/* Age Range */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Age range</label>
        <div className="flex items-center gap-3">
          <select
            value={ageRange.min}
            onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          <span className="text-sm">to</span>
          <select
            value={ageRange.max}
            onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500">years old</span>
        </div>
      </div>

      {/* Min People */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Min. people required for booking</label>
        <input
          type="number"
          value={minPeople}
          onChange={(e) => setMinPeople(e.target.value)}
          className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Difficulty level</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select difficulty</option>
          <option>Easy</option>
          <option>Moderate</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-sm">Availability</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Set availability</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default AboutTheExperience;
