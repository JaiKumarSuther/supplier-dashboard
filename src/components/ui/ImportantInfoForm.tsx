import { useState } from "react";
import ListingButtons from "../ListingButtons";

interface Section {
  title: string;
  values: string[];
}

interface ImportantInfoFormProps {
  heading: string;
  onBack: () => void;
  onNext: () => void;
  sections: { title: string }[]; // <-- ✅ Fix here
}

const ImportantInfoForm = ({
  heading,
  onBack,
  onNext,
  sections: initialSections,
}: ImportantInfoFormProps) => {
  const [sectionsState, setSectionsState] = useState<Section[]>(
    initialSections.map((section) => ({
      ...section,
      values: ["", "", "", ""],
    }))
  );

  const handleChange = (sectionIndex: number, inputIndex: number, value: string) => {
    const updatedSections = [...sectionsState];
    updatedSections[sectionIndex].values[inputIndex] = value;
    setSectionsState(updatedSections);
  };

  const handleAddMore = (sectionIndex: number) => {
    const updatedSections = [...sectionsState];
    updatedSections[sectionIndex].values.push("");
    setSectionsState(updatedSections);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">{heading}</h2>

      {sectionsState.map((section, sectionIndex) => (
        <div className="mb-8" key={section.title}>
          <label className="block text-[#1e2a49] font-semibold mb-3 text-base">
            {section.title}
          </label>
          {section.values.map((text, inputIndex) => (
            <div key={inputIndex} className="relative mb-4">
              <textarea
                rows={1}
                maxLength={50}
                value={text}
                onChange={(e) => handleChange(sectionIndex, inputIndex, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute bottom-2 right-4 text-xs text-gray-500">
                {text.length}/50
              </span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddMore(sectionIndex)}
            className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
          >
            <span className="text-xl leading-none">+</span> more
          </button>
        </div>
      ))}

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default ImportantInfoForm;
