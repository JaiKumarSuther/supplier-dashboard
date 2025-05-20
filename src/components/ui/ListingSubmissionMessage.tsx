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
    <div className="max-w-2xl mx-auto text-center px-6 py-12">
      <img
        src={image}
        alt="Submission Status"
        className="w-28 h-28 mx-auto mb-6"
      />

      <h1 className="text-2xl font-bold text-[#1e2a49] mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{description}</p>

      <div className="text-left space-y-6 mb-10">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="font-semibold text-[#1e2a49] mb-1">
              {section.heading}
            </h3>
            <p className="text-gray-600 text-sm">{section.content}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onButtonClick}
        className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ListingSubmissionMessage;
