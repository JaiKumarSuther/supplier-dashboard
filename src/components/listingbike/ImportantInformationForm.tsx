import { useState } from "react";
import ListingButtons from "../ListingButtons";

const ImportantInformationForm = () => {
  const [details, setDetails] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    const updated = [...details];
    updated[index] = value;
    setDetails(updated);
  };

  const handleAddMore = () => {
    setDetails([...details, ""]);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        Important Information
      </h2>

      <label className="block text-[15px] font-semibold mb-2">
        Additional details
      </label>

      <div className="flex flex-col gap-4 mb-6">
        {details.map((detail, index) => (
          <div key={index} className="relative">
            <textarea
              value={detail}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={50}
              rows={1}
              className="w-full text-[15px] font-[400] font-['URW Geometric'] border border-[#e2e2e2] rounded-lg px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
              
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-400">
              {detail.length}/50
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddMore}
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-semibold mb-8 hover:bg-emerald-200 transition"
      >
        <span className="text-xl leading-none">+</span> more
      </button>

      {/* Navigation Buttons */}
      <ListingButtons
        onBack={() => (window.location.href = "itinerary.html")}
        onNext={() => (window.location.href = "faq.html")}
      />
    </form>
  );
};

export default ImportantInformationForm;
