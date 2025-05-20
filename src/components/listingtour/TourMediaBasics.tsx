'use client';

import { useState } from 'react';
import uploadIcon from '../../../public/images/upload icon.svg';
import ListingButtons from '../ListingButtons';

const TourMediaBasics = () => {
  const [forTourists, setForTourists] = useState<'local' | 'international'>('international');
  const [tourType, setTourType] = useState<'group' | 'private'>('private');
  const [duration, setDuration] = useState('3');
  const [durationType, setDurationType] = useState<'days' | 'hours'>('days');
  const [minPeople, setMinPeople] = useState('4');
  const [ageRange, setAgeRange] = useState({ min: '0', max: '11' });
  const [language, setLanguage] = useState('');
  const [city, setCity] = useState('');
  const [spots, setSpots] = useState('');
  const [availability, setAvailability] = useState('');
  const [theme, setTheme] = useState('');
  const [pickupIncluded, setPickupIncluded] = useState<'yes' | 'no'>('yes');
  const [meetingAddress, setMeetingAddress] = useState('');
  const [meetingTime, setMeetingTime] = useState('9:00 pm');

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">Tour Media & Basics</h2>

      {/* Upload Section */}
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

      {/* For */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">For</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setForTourists('local')}
            className={`px-4 py-2 rounded-lg border ${
              forTourists === 'local'
                ? 'bg-emerald-700 text-white'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Local tourists
          </button>
          <button
            type="button"
            onClick={() => setForTourists('international')}
            className={`px-4 py-2 rounded-lg border ${
              forTourists === 'international'
                ? 'bg-emerald-700 text-white'
                : 'border-gray-300 text-gray-700'
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
            onClick={() => setTourType('group')}
            className={`px-4 py-2 rounded-lg border ${
              tourType === 'group'
                ? 'bg-emerald-700 text-white'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Group tour
          </button>
          <button
            type="button"
            onClick={() => setTourType('private')}
            className={`px-4 py-2 rounded-lg border ${
              tourType === 'private'
                ? 'bg-emerald-700 text-white'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Private tour
          </button>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Duration</label>
        <div className="flex gap-3">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value as 'days' | 'hours')}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>days</option>
            <option>hours</option>
          </select>
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

      {/* Languages */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Languages spoken by guide</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select languages</option>
          <option>English</option>
          <option>Urdu</option>
        </select>
      </div>

      {/* Starts In */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Starts in</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select city</option>
          <option>Lahore</option>
          <option>Karachi</option>
        </select>
      </div>

      {/* Available Spots */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Available spots</label>
        <select
          value={spots}
          onChange={(e) => setSpots(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select spots</option>
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
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select dates</option>
          <option>All July</option>
        </select>
      </div>

      {/* Theme */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Tour theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select theme</option>
          <option>Nature</option>
          <option>Culture</option>
        </select>
      </div>

      {/* Pickup Included */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Pickup Included</label>
        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={() => setPickupIncluded('yes')}
            className={`px-4 py-2 rounded-lg border ${
              pickupIncluded === 'yes'
                ? 'bg-emerald-700 text-white'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setPickupIncluded('no')}
            className={`px-4 py-2 rounded-lg border ${
              pickupIncluded === 'no'
                ? 'bg-emerald-700 text-white'
                : 'border-gray-300 text-gray-700'
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
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        />
      </div>

      {/* Meeting Time */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-sm">Meeting Time</label>
        <select
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>9:00 pm</option>
          <option>10:00 am</option>
        </select>
      </div>

      <ListingButtons
        onBack={() => console.log('Back')}
        onNext={() => (window.location.href = '/listingtour/overview.html')}
      />
    </form>
  );
};

export default TourMediaBasics;
