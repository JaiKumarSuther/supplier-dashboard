import { useState } from "react";
import ListingButtons from "../ListingButtons";
import addMoreIcon from "../../../public/images/add more icon.svg";

interface InclusionExclusionFormProps {
  heading: string;
  onBack: () => void;
  onNext: () => void;
  useImageIcon?: boolean;
}

const InclusionExclusionForm = ({
  heading,
  onBack,
  onNext,
  useImageIcon = false,
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

  const renderAddMore = (type: "included" | "excluded") =>
    useImageIcon ? (
      <p
        className="flex items-center gap-2 text-emerald-700 cursor-pointer text-sm font-medium"
        onClick={() => handleAdd(type)}
      >
        <img src={addMoreIcon} alt="add more" width={17} /> more
      </p>
    ) : (
      <button
        type="button"
        onClick={() => handleAdd(type)}
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full text-sm font-semibold"
      >
        + more
      </button>
    );

  return (
    <form className="w-[650px] px-4 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">{heading}</h2>

      {/* What’s included */}
      <div className="mb-6">
        <label className="block font-semibold text-sm text-[#1e2a49] mb-2">
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
            />
            <span className="absolute right-3 bottom-2 text-xs text-gray-500">
              {item.length}/50
            </span>
          </div>
        ))}
        {renderAddMore("included")}
      </div>

      {/* What’s NOT included */}
      <div className="mb-8">
        <label className="block font-semibold text-sm text-[#1e2a49] mb-2">
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
            />
            <span className="absolute right-3 bottom-2 text-xs text-gray-500">
              {item.length}/50
            </span>
          </div>
        ))}
        {renderAddMore("excluded")}
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default InclusionExclusionForm;
