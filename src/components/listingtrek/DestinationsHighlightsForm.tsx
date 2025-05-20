'use client';

import { useState } from 'react';
import ListingButtons from '../ListingButtons';
import addMoreIcon from '../../../public/images/add more icon.svg';

const DestinationsHighlightsForm = () => {
  const [locations, setLocations] = useState('');
  const [highlights, setHighlights] = useState(['', '', '']);

  const handleHighlightChange = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addMoreHighlight = () => {
    setHighlights([...highlights, '']);
  };

  return (
    <form className="max-w-3xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Destinations & Highlights</h2>

      {/* Locations Covered */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[#1e2a49]">Locations covered</label>
        <select
          value={locations}
          onChange={(e) => setLocations(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select languages</option>
          <option>Hunza</option>
          <option>Skardu</option>
          <option>Islamabad</option>
        </select>
      </div>

      {/* Highlights Section */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[#1e2a49]">Highlights</label>

        {highlights.map((highlight, index) => (
          <div key={index} className="relative mb-4">
            <textarea
              value={highlight}
              onChange={(e) => handleHighlightChange(index, e.target.value)}
              maxLength={90}
              rows={1}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-3 text-xs text-gray-500">
              {highlight.length}/90
            </span>
          </div>
        ))}

        <button
          type="button"
          onClick={addMoreHighlight}
          className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4 hover:bg-emerald-100"
        >
          <img src={addMoreIcon} alt="Add more" width={13} />
          more
        </button>
      </div>

      {/* Navigation Buttons */}
      <ListingButtons
        onBack={() => (window.location.href = '/listingtour/overview.html')}
        onNext={() => (window.location.href = '/listingtour/itinerary.html')}
      />
    </form>
  );
};

export default DestinationsHighlightsForm;
