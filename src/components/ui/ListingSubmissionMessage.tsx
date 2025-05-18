import React from 'react';

interface Section {
  heading: string;
  content: string;
}

interface ListingSubmissionMessageProps {
  image: string;
  title: string;
  description: string;
  sections: Section[];
  buttonLabel: string;
  onButtonClick: () => void;
}

const ListingSubmissionMessage: React.FC<ListingSubmissionMessageProps> = ({
  image,
  title,
  description,
  sections,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <main className="w-full flex justify-center px-4 py-10">
      <div className="w-[450px]">
        {/* Icon */}
        <div className="mb-6">
          <img src={image} alt="Submitted" className="w-[100px] h-[100px]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1e2a49] mb-4">{title}</h2>

        {/* Description */}
        <p className="text-[#1e2a49] text-base font-normal mb-6 leading-relaxed">
          {description}
        </p>

        {/* Dynamic Sections */}
        {sections.map((section, index) => (
          <div key={index} className="mb-5">
            <p className="text-[#1e2a49] font-semibold text-base mb-1">
              {section.heading}
            </p>
            <p className="text-[#1e2a49] text-base font-normal">{section.content}</p>
          </div>
        ))}

        {/* Button */}
        <button
          type="button"
          onClick={onButtonClick}
          className="px-6 py-2 border border-gray-300 rounded-full text-sm text-[#707D99] hover:bg-gray-50 transition"
        >
          {buttonLabel}
        </button>
      </div>
    </main>
  );
};

export default ListingSubmissionMessage;
