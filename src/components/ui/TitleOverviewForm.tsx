import React from "react";
import ListingButtons from "../ListingButtons";

type TitleOverviewFormProps = {
  title: string;
  overview: string;
  onTitleChange: (value: string) => void;
  onOverviewChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  isEditMode?: boolean;
};

const TitleOverviewForm: React.FC<TitleOverviewFormProps> = ({
  title,
  overview,
  onTitleChange,
  onOverviewChange,
  onBack,
  onNext,
  isEditMode = false,
}) => {
  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Title & Overview" : "Title & Overview"}
      </h2>

      {/* Title Field */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">Title</label>
        <div className="relative">
          <textarea
            placeholder="Enter activity title..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            maxLength={100}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute bottom-2 right-4 text-xs text-gray-500">
            {title.length}/100
          </span>
        </div>
      </div>

      {/* Overview Field */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Overview
        </label>
        <div className="relative">
          <textarea
            placeholder="Enter activity overview..."
            value={overview}
            onChange={(e) => onOverviewChange(e.target.value)}
            maxLength={500}
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute bottom-2 right-4 text-xs text-gray-500">
            {overview.length}/500
          </span>
        </div>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

export default TitleOverviewForm;
