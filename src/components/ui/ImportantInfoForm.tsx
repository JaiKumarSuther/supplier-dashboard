
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
  nextLabel?: string;
  sections: { title: string }[];
}

const ImportantInfoForm = ({
  heading,
  onBack,
  onNext,
  nextLabel = "Next",
  sections: initialSections,
}: ImportantInfoFormProps) => {
  const [sectionsState, setSectionsState] = useState<Section[]>(
    initialSections.map((section) => ({
      ...section,
      values: ["", "", "", ""],
    }))
  );

  const handleChange = (
    sectionIndex: number,
    inputIndex: number,
    value: string
  ) => {
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
  <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">{heading}</h2>

  {sectionsState.map((section, sectionIndex) => (
    <div className="mb-8" key={section.title}>
      <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
        {section.title}
      </h3>

      {section.values.map((text, inputIndex) => (
        <div key={inputIndex} className="mb-4">
          <textarea
            rows={1}
            maxLength={100}
            value={text}
            placeholder={`Enter ${section.title.toLowerCase()}...`}
            onChange={(e) =>
              handleChange(sectionIndex, inputIndex, e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => handleAddMore(sectionIndex)}
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
      >
        <span className="text-xl leading-none">+</span> Add {section.title}
      </button>
    </div>
  ))}

  <ListingButtons onBack={onBack} onNext={onNext} nextLabel={nextLabel} />
</form>

  );
};

export default ImportantInfoForm;
