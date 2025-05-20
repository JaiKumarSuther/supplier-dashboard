'use client';

import { useState } from "react";
import ListingButtons from "../ListingButtons";
import image1 from "/public/images/Dolomites-Italian-Alps.webp";
import image2 from "/public/images/aa.jpg";

const TrekMediaBasics = () => {
  const [touristType, setTouristType] = useState<"local" | "international">("international");
  const [trekType, setTrekType] = useState<"group" | "private">("private");
  const [duration, setDuration] = useState("3");
  const [durationUnit, setDurationUnit] = useState("days");
  const [spots, setSpots] = useState("");
  const [minPeople, setMinPeople] = useState("4");
  const [ageRange, setAgeRange] = useState({ min: "0", max: "11" });
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState("");
  const [departureTime, setDepartureTime] = useState("9:00 pm");
  const [pickup, setPickup] = useState<"yes" | "no">("yes");
  const [meetingTime, setMeetingTime] = useState("9:00 pm");
  const [meetingAddress, setMeetingAddress] = useState("");

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">Trek Media & Basics</h2>

      {/* Photos Upload Section */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-6">
        <div className="max-h-52 overflow-y-auto pr-2 space-y-4">
          {/* Image 1 */}
          <div className="flex items-center gap-4">
            <img src={image1} alt="Image1" className="w-[80px] h-[55px] rounded-md object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">Image1.jpg</p>
              <p className="text-xs text-gray-500">680KB</p>
            </div>
            <span className="text-xs bg-gray-100 text-[#1e2a49] px-2 py-1 rounded-md">featured</span>
            <span className="text-gray-400 text-lg ml-2">⋮</span>
          </div>

          {/* Image 2 */}
          <div className="flex items-center gap-4">
            <img src={image2} alt="Image2" className="w-[80px] h-[55px] rounded-md object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">Image2.jpg</p>
              <p className="text-xs text-gray-500">1MB</p>
            </div>
            <span className="text-gray-400 text-lg ml-2">⋮</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <p className="text-sm text-emerald-700 cursor-pointer hover:underline">upload more photos</p>
          <p className="text-sm text-gray-500">5/20</p>
        </div>
      </div>

      {/* For */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">For</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTouristType("local")}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              touristType === "local" ? "bg-emerald-700 text-white" : "border-gray-300 text-gray-700"
            }`}
          >
            Local tourists
          </button>
          <button
            type="button"
            onClick={() => setTouristType("international")}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              touristType === "international" ? "bg-emerald-700 text-white" : "border-gray-300 text-gray-700"
            }`}
          >
            International tourists
          </button>
        </div>
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTrekType("group")}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              trekType === "group" ? "bg-emerald-700 text-white" : "border-gray-300 text-gray-700"
            }`}
          >
            Group trek
          </button>
          <button
            type="button"
            onClick={() => setTrekType("private")}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              trekType === "private" ? "bg-emerald-700 text-white" : "border-gray-300 text-gray-700"
            }`}
          >
            Private trek
          </button>
        </div>
      </div>

      {/* Trek Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Trek</label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer">
          <option>Select trek</option>
          <option>Nanga Parbat Basecamp</option>
          <option>Passu Glacier</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Duration</label>
        <div className="flex gap-3">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
          >
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <select
            value={durationUnit}
            onChange={(e) => setDurationUnit(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
          >
            <option>days</option>
            <option>hours</option>
          </select>
        </div>
      </div>

      {/* Available Spots */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Available spots</label>
        <select
          value={spots}
          onChange={(e) => setSpots(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
        >
          <option>Select available spots</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
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

      {/* Age Range */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Age range</label>
        <div className="flex items-center gap-3">
          <select
            value={ageRange.min}
            onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          <span className="text-sm">to</span>
          <select
            value={ageRange.max}
            onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500">years old</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Languages spoken by guide</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
        >
          <option>Select languages</option>
          <option>English</option>
          <option>Urdu</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Starts in</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
        >
          <option>Select city</option>
          <option>Lahore</option>
          <option>Islamabad</option>
        </select>
      </div>
            <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Available spots</label>
        <select
          value={spots}
          onChange={(e) => setSpots(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
        >
          <option>Select available spots</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Availability</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
        >
          <option>Set availability</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
      </div>

      {/* Departure Time */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Departure Time</label>
        <select
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
        >
          <option>9:00 pm</option>
          <option>10:00 am</option>
        </select>
      </div>

      {/* Pickup */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Pickup Included</label>
        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={() => setPickup("yes")}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              pickup === "yes" ? "bg-emerald-700 text-white" : "border-gray-300 text-gray-700"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setPickup("no")}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              pickup === "no" ? "bg-emerald-700 text-white" : "border-gray-300 text-gray-700"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Meeting Address */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Meeting address</label>
        <textarea
          rows={2}
          value={meetingAddress}
          onChange={(e) => setMeetingAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-[40px] text-sm"
        />
      </div>

      {/* Meeting Time */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-sm">Meeting Time</label>
        <select
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
        >
          <option>9:00 pm</option>
          <option>10:00 am</option>
        </select>
      </div>

      {/* Navigation Buttons */}
      <ListingButtons
        onBack={() => console.log("Back")}
        onNext={() => (window.location.href = "/listingtrek/overview.html")}
      />
    </form>
  );
};

export default TrekMediaBasics;
