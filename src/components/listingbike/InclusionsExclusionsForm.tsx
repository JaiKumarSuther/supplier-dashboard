import { useState } from "react";
import ListingButtons from "../ListingButtons";

const InclusionsExclusionsForm = () => {
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
    if (type === "included") {
      const updated = [...included];
      updated[index] = value;
      setIncluded(updated);
    } else {
      const updated = [...excluded];
      updated[index] = value;
      setExcluded(updated);
    }
  };

  return (
    <form className="w-[650px] px-4 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        Inclusions & Exclusions
      </h2>

      <div className="mb-6">
        <label className="block font-semibold text-sm mb-2">
          What’s included
        </label>
        {included.map((item, idx) => (
          <div key={idx} className="relative mb-4">
            <textarea
              value={item}
              onChange={(e) => handleChange(e.target.value, idx, "included")}
              rows={1}
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
              placeholder="Enter inclusion"
            ></textarea>
            <span className="absolute right-3 bottom-2 text-xs text-gray-500">
              {item.length}/50
            </span>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd("included")}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full text-sm font-semibold"
        >
          + more
        </button>
      </div>

      <div className="mb-8">
        <label className="block font-semibold text-sm mb-2">
          What’s NOT included
        </label>
        {excluded.map((item, idx) => (
          <div key={idx} className="relative mb-4">
            <textarea
              value={item}
              onChange={(e) => handleChange(e.target.value, idx, "excluded")}
              rows={1}
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
              placeholder="Enter exclusion"
            ></textarea>
            <span className="absolute right-3 bottom-2 text-xs text-gray-500">
              {item.length}/50
            </span>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd("excluded")}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full text-sm font-semibold"
        >
          + more
        </button>
      </div>

      <ListingButtons
        onBack={() => (window.location.href = "inclusion.html")}
        onNext={() => (window.location.href = "pricing.html")}
      />
    </form>
  );
};

export default InclusionsExclusionsForm;
