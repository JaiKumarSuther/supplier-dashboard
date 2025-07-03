import { useState } from "react";
import ListingButtons from "../ListingButtons";

const uploadIcon = "/images/upload-icon.svg";

interface ActivityMediaBasicsProps {
  onNext: () => void;
  onBack: () => void;
}

const ActivityMediaBasics: React.FC<ActivityMediaBasicsProps> = ({
  onNext,
  onBack,
}) => {
  const [activity, setActivity] = useState("");
  const [durationDays, setDurationDays] = useState("3");
  const [durationType, setDurationType] = useState("days");
  const [minPeople, setMinPeople] = useState("4");
  const [ageRange, setAgeRange] = useState({ min: "0", max: "11" });
  const [difficulty, setDifficulty] = useState("");
  const [languages, setLanguages] = useState("");
  const [region, setRegion] = useState("");
  const [availability, setAvailability] = useState("");

  return (
    <form className="max-w-5xl md:w-[650px] py-2">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        Activity Media & Basics
      </h2>

      {/* Photo Upload Section */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6">
        <div className="p-3 bg-emerald-50 rounded-full">
          <img src={uploadIcon} alt="Upload" className="h-8 w-8" />
        </div>
        <h2 className="text-base font-semibold text-[#283456] mt-2">
          Drop files here or select files to upload
        </h2>
        <p className="text-gray-500 text-sm">
          You can upload up to 20 JPG files
        </p>
        <button
          type="button"
          className="text-emerald-700 text-sm mt-2 font-medium hover:underline"
        >
          Select
        </button>
      </div>

      {/* Activity */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Activity</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option>Select activity</option>
          <option>Hiking</option>
          <option>Kayaking</option>
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
            <option>1</option>
            <option>2</option>
            <option>3</option>
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

      {/* Min People */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Min. people required for booking
        </label>
        <input
          type="number"
          value={minPeople}
          onChange={(e) => setMinPeople(e.target.value)}
          className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Age Range */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Age range</label>
        <div className="flex items-center gap-3">
          <select
            value={ageRange.min}
            onChange={(e) =>
              setAgeRange({ ...ageRange, min: e.target.value })
            }
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          <span className="text-sm">to</span>
          <select
            value={ageRange.max}
            onChange={(e) =>
              setAgeRange({ ...ageRange, max: e.target.value })
            }
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500">years old</span>
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Difficulty level
        </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select difficulty level</option>
          <option>Easy</option>
          <option>Moderate</option>
          <option>Extreme</option>
        </select>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Languages spoken by guide
        </label>
        <select
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select languages</option>
          <option>English</option>
          <option>Urdu</option>
        </select>
      </div>

      {/* Region */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Which region is activity operated in
        </label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select city</option>
          <option>Lahore</option>
          <option>Karachi</option>
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

export default ActivityMediaBasics;
