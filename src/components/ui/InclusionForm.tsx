'use client';

import { useState } from "react";
import ListingButtons from "../ListingButtons";
const addMoreIcon = "/images/add-more-icon.svg";

interface InclusionsFormProps {
  onBack: () => void;
  onNext: () => void;
  useImageIcon?: boolean;
}

const InclusionsForm = ({
  onBack,
  onNext,
  useImageIcon = false,
}: InclusionsFormProps) => {
  const [included, setIncluded] = useState(["", "", "", ""]);

  const handleAdd = () => {
    setIncluded([...included, ""]);
  };

  const handleChange = (value: string, index: number) => {
    const updated = [...included];
    updated[index] = value;
    setIncluded(updated);
  };

  const renderAddMore = () =>
    useImageIcon ? (
      <p
        className="flex items-center gap-2 text-[#008558] cursor-pointer text-sm font-medium"
        onClick={handleAdd}
      >
        <img src={addMoreIcon} alt="add more" width={17} /> more
      </p>
    ) : (
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 text-[#008558] bg-emerald-100 px-4 py-1.5 rounded-full text-sm font-semibold"
      >
        + more
      </button>
    );

  return (
    <form className="w-[650px] px-4 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">Inclusions</h2>

      <label className="block font-semibold text-sm text-[#1e2a49] mb-2">
        What's included
      </label>
      {included.map((item, idx) => (
        <div key={idx} className="relative mb-4">
          <textarea
            value={item}
            onChange={(e) => handleChange(e.target.value, idx)}
            rows={1}
            maxLength={50}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-vertical"

          />
          <span className="absolute right-3 bottom-2 text-xs text-gray-500">
            {item.length}/50
          </span>
        </div>
      ))}

      <div className="mb-8">{renderAddMore()}</div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default InclusionsForm;
