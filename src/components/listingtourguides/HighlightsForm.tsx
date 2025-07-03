'use client';

import { useState } from 'react';
import ListingButtons from '../ListingButtons';
import { Plus } from 'lucide-react';

interface HighlightsFormProps {
  onBack: () => void;
  onNext: () => void;
}

const HighlightsForm: React.FC<HighlightsFormProps> = ({ onBack, onNext }) => {
  const [highlights, setHighlights] = useState(['', '', '']);

  const handleHighlightChange = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addMoreHighlight = () => {
    setHighlights([...highlights, '']);
  };

  const getCharCount = (text: string) => text.length;

  return (
    <form className="max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Highlights</h2>

      <label className="block mb-2 font-semibold text-[#1e2a49]">Highlights</label>

      {highlights.map((highlight, index) => (
        <div className="mb-4 relative" key={index}>
          <textarea
            rows={2}
            maxLength={90}
            value={highlight}
            onChange={(e) => handleHighlightChange(index, e.target.value)}
            className="w-[600px] h-[40px] border border-gray-300 rounded-lg px-4 py-2 text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute bottom-2 right-3 text-xs text-gray-500">
            {getCharCount(highlight)}/90
          </span>
        </div>
      ))}

      <button
        type="button"
        onClick={addMoreHighlight}
        className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8 hover:bg-emerald-100"
      >
        <Plus size={16} />
        more
      </button>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default HighlightsForm;
