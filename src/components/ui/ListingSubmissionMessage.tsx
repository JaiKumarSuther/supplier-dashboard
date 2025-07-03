import React from "react";

interface Section {
  heading: string;
  content: string;
}

interface ListingSubmissionMessageProps {
  image: string;
  title: string;
  description: string;
  sections?: Section[];
  buttonLabel: string;
  onButtonClick: () => void;
}

const ListingSubmissionMessage: React.FC<ListingSubmissionMessageProps> = ({
  image,
  title,
  description,
  sections = [],
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 text-center">
      <img
        src={image}
        alt="Success"
        className="w-24 h-24 mx-auto mb-6"
      />
      
      <h1 className="text-2xl md:text-3xl font-bold text-[#1e2a49] mb-4">
        {title}
      </h1>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        {description}
      </p>

      <div className="space-y-6 mb-8 text-left">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-[#1e2a49] mb-2">
              {section.heading}
            </h3>
            <p className="text-gray-600 text-sm">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onButtonClick}
        className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ListingSubmissionMessage;
