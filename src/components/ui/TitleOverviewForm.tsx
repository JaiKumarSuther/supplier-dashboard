import React from "react";
import ListingButtons from "../ListingButtons";

type TitleOverviewFormProps = {
  title: string;
  overview: string;
  onTitleChange: (value: string) => void;
  onOverviewChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
};

const TitleOverviewForm: React.FC<TitleOverviewFormProps> = ({
  title,
  overview,
  onTitleChange,
  onOverviewChange,
  onBack,
  onNext,
}) => {
  return (
    <form className="max-w-5xl w-[650px]">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Title & Overview</h2>

      {/* Title Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#1e2a49] mb-2">
          Title
        </label>
        <div className="relative">
          <textarea
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            maxLength={50}
            rows={1}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute bottom-2 right-3 text-xs text-gray-500">
            {title.length}/50
          </span>
        </div>
      </div>

      {/* Overview Field */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#1e2a49] mb-2">
          Overview
        </label>
        <div className="relative">
          <textarea
            value={overview}
            onChange={(e) => onOverviewChange(e.target.value)}
            maxLength={600}
            rows={10}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute bottom-2 right-3 text-xs text-gray-500">
            {overview.length}/600
          </span>
        </div>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default TitleOverviewForm;
