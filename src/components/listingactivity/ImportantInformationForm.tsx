import { useState } from "react";
import ListingButtons from "../ListingButtons";

const ImportantInformationForm = () => {
  const [details, setDetails] = useState(["", "", "", ""]);
  const [notSuitable, setNotSuitable] = useState(["", "", "", ""]);
  const [toBring, setToBring] = useState(["", "", "", ""]);

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
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">Important Information</h2>

      {/* Additional Details */}
      <div className="mb-8">
        <label className="block text-[#1e2a49] font-semibold mb-3 text-base">Additional details</label>
        {details.map((text, index) => (
          <div key={index} className="relative mb-4">
            <textarea
              rows={1}
              maxLength={50}
              value={text}
              onChange={(e) => handleChange(details, setDetails, index, e.target.value)}
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
          onClick={() => handleAdd(setDetails)}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> more
        </button>
      </div>

      {/* Not Suitable For */}
      <div className="mb-8">
        <label className="block text-[#1e2a49] font-semibold mb-3 text-base">Not suitable for</label>
        {notSuitable.map((text, index) => (
          <div key={index} className="relative mb-4">
            <textarea
              rows={1}
              maxLength={50}
              value={text}
              onChange={(e) => handleChange(notSuitable, setNotSuitable, index, e.target.value)}
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
          onClick={() => handleAdd(setNotSuitable)}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> more
        </button>
      </div>

      {/* What to Bring */}
      <div className="mb-10">
        <label className="block text-[#1e2a49] font-semibold mb-3 text-base">What to bring</label>
        {toBring.map((text, index) => (
          <div key={index} className="relative mb-4">
            <textarea
              rows={1}
              maxLength={50}
              value={text}
              onChange={(e) => handleChange(toBring, setToBring, index, e.target.value)}
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
          onClick={() => handleAdd(setToBring)}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> more
        </button>
      </div>

      <ListingButtons
        onBack={() => (window.location.href = "pricing.html")}
        onNext={() => (window.location.href = "listing-submitted.html")}
      />
    </form>
  );
};

export default ImportantInformationForm;
