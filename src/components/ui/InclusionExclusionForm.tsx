import { useState } from "react";
import ListingButtons from "../ListingButtons";

interface InclusionExclusionFormProps {
  heading: string;
  onBack: () => void;
  onNext: () => void;
  isEditMode?: boolean;
}

const InclusionExclusionForm = ({
  heading,
  onBack,
  onNext,
  isEditMode = false,
}: InclusionExclusionFormProps) => {
  const [included, setIncluded] = useState(["", "", "", ""]);
  const [excluded, setExcluded] = useState(["", "", "", ""]);

  const handleAdd = (type: "included" | "excluded") => {
    if (type === "included") setIncluded([...included, ""]);
    else setExcluded([...excluded, ""]);
  };



  const handleChange = (
    value: string,
    index: number,
    type: "included" | "excluded"
  ) => {
    const updated = [...(type === "included" ? included : excluded)];
    updated[index] = value;
    type === "included" ? setIncluded(updated) : setExcluded(updated);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? `Edit ${heading}` : heading}
      </h2>

      {/* Inclusions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
          Inclusions
        </h3>
        {included.map((item, index) => (
          <div key={index} className="mb-4 flex gap-3">
            <textarea
              placeholder="Enter inclusion..."
              value={item}
              onChange={(e) => handleChange(e.target.value, index, "included")}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              maxLength={50}
            />
           
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd("included")}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> Add Inclusion
        </button>
      </div>

      {/* Exclusions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
          Exclusions
        </h3>
        {excluded.map((item, index) => (
          <div key={index} className="mb-4 flex gap-3">
            <textarea
              placeholder="Enter exclusion..."
              value={item}
              onChange={(e) => handleChange(e.target.value, index, "excluded")}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              maxLength={50}
            />
           
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd("excluded")}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> Add Exclusion
        </button>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default InclusionExclusionForm;
