import { useState } from "react";
import ListingButtons from "./ListingButtons";

const InclusionsExclusionsForm = () => {
  const [inclusions, setInclusions] = useState(["", "", "", ""]);
  const [exclusions, setExclusions] = useState(["", "", "", ""]);

  const handleChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const handleAdd = (setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) => [...prev, ""]);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">Inclusions & Exclusions</h2>

      <div className="mb-8">
        <label className="block text-[#1e2a49] font-semibold mb-3 text-base">What’s included</label>
        {inclusions.map((text, index) => (
          <div key={index} className="relative mb-4">
            <textarea
              rows={1}
              maxLength={50}
              value={text}
              onChange={(e) => handleChange(inclusions, setInclusions, index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder=""
            ></textarea>
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {text.length}/50
            </span>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd(setInclusions)}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> more
        </button>
      </div>

      <div className="mb-10">
        <label className="block text-[#1e2a49] font-semibold mb-3 text-base">What’s NOT included</label>
        {exclusions.map((text, index) => (
          <div key={index} className="relative mb-4">
            <textarea
              rows={1}
              maxLength={50}
              value={text}
              onChange={(e) => handleChange(exclusions, setExclusions, index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder=""
            ></textarea>
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {text.length}/50
            </span>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd(setExclusions)}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> more
        </button>
      </div>

      <ListingButtons
        onBack={() => (window.location.href = "itinerary.html")}
        onNext={() => (window.location.href = "faq.html")}
      />
    </form>
  );
};

export default InclusionsExclusionsForm;