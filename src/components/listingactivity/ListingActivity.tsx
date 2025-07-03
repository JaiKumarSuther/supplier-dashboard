import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ListingButtons from "../ListingButtons";
import ListingSubmissionMessage from "../ui/ListingSubmissionMessage";
import ListingSidebar from "../ui/ListingSidebar";

interface ActivityFormData {
  select_activity: string;
  min_people: string;
  duration: string;
  age_range: string;
  languages: string[];
  difficulty_level: string;
  city_region: string;
  availability: string;
  title: string;
  overview: string;
  photos: string[];
  itinerary: { time: string; title: string; overview: string }[];
  inclusions: string[];
  exclusions: string[];
  faqs: { question: string; answer: string }[];
  base_price: string;
  secondary_prices: { label: string; price: number }[];
  add_ons: { name: string; price: number; type: string }[];
  important_info: string[];
  not_suitable_for: string[];
}

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  formData: ActivityFormData;
  updateFormData: (updates: Partial<ActivityFormData>) => void;
  onPhotosUpload?: (files: File[]) => Promise<void>;
  onButtonClick?: () => void;
  nextLabel?: string;
  isEditMode?: boolean;
}

// Step Components
const ActivityMediaBasics: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  onPhotosUpload,
  isEditMode,
}) => {
  const handleDurationChange = (days: string, type: string) => {
    updateFormData({ duration: `${days} ${type}` });
  };

  const handleAgeRangeChange = (min: string, max: string) => {
    updateFormData({ age_range: `${min}-${max}` });
  };

  const getDurationParts = () => {
    const parts = formData.duration.split(" ");
    return { days: parts[0] || "3", type: parts[1] || "days" };
  };

  const getAgeRangeParts = () => {
    const parts = formData.age_range.split("-");
    return { min: parts[0] || "0", max: parts[1] || "11" };
  };

  const duration = getDurationParts();
  const ageRange = getAgeRangeParts();

  return (
    <form className="max-w-5xl md:w-[650px] py-2">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        {isEditMode
          ? "Edit Activity Media & Basics"
          : "Activity Media & Basics"}
      </h2>

      {/* Photo Upload Section */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6">
        <div className="p-3 bg-emerald-50 rounded-full">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-[#283456] mt-2">
          Drop files here or select files to upload
        </h2>
        <p className="text-gray-500 text-sm">
          You can upload up to 20 JPG files
        </p>
        <label className="text-emerald-700 text-sm mt-2 font-medium hover:underline cursor-pointer">
          Select
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && onPhotosUpload) {
                const filesArray = Array.from(e.target.files);
                onPhotosUpload(filesArray);
              }
            }}
          />
        </label>
        {formData.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {formData.photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Uploaded ${i}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Activity */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Activity</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.select_activity}
          onChange={(e) => updateFormData({ select_activity: e.target.value })}
        >
          <option value="">Select activity</option>
          <option value="Hiking">Hiking & Trekking</option>
          <option value="Kayaking">Water Sports</option>
          <option value="Cultural">Cultural Tours</option>
          <option value="Adventure">Adventure Activities</option>
          <option value="Wildlife">Wildlife Safari</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Duration</label>
        <div className="flex gap-3">
          <select
            value={duration.days}
            onChange={(e) =>
              handleDurationChange(e.target.value, duration.type)
            }
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(30)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            value={duration.type}
            onChange={(e) =>
              handleDurationChange(duration.days, e.target.value)
            }
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>
      </div>

      {/* Min People */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Min. people required for booking
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={formData.min_people}
          onChange={(e) => updateFormData({ min_people: e.target.value })}
          className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Age Range */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Age range</label>
        <div className="flex items-center gap-3">
          <select
            value={ageRange.min}
            onChange={(e) => handleAgeRangeChange(e.target.value, ageRange.max)}
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <span className="text-sm">to</span>
          <select
            value={ageRange.max}
            onChange={(e) => handleAgeRangeChange(ageRange.min, e.target.value)}
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(82)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">years old</span>
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Difficulty level
        </label>
        <select
          value={formData.difficulty_level}
          onChange={(e) => updateFormData({ difficulty_level: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">Select difficulty level</option>
          <option value="Easy">Easy - Suitable for beginners</option>
          <option value="Moderate">Moderate - Some experience required</option>
          <option value="Challenging">
            Challenging - Good fitness required
          </option>
          <option value="Extreme">Extreme - Expert level only</option>
        </select>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Languages spoken by guide
        </label>
        <select
          value={formData.languages[0] || ""}
          onChange={(e) => updateFormData({ languages: [e.target.value] })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">Select languages</option>
          <option value="English">English</option>
          <option value="Urdu">Urdu</option>
          <option value="Hindi">Hindi</option>
          <option value="Arabic">Arabic</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>

      {/* Region */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Which region is activity operated in
        </label>
        <select
          value={formData.city_region}
          onChange={(e) => updateFormData({ city_region: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">Select city</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Rawalpindi">Rawalpindi</option>
          <option value="Faisalabad">Faisalabad</option>
          <option value="Multan">Multan</option>
        </select>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-sm">Availability</label>
        <select
          value={formData.availability}
          onChange={(e) => updateFormData({ availability: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">Set availability</option>
          <option value="Daily">Available Daily</option>
          <option value="Weekdays">Weekdays Only</option>
          <option value="Weekends">Weekends Only</option>
          <option value="Custom">Custom Schedule</option>
        </select>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const TitleOverview: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  isEditMode,
}) => {
  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Title & Overview" : "Title & Overview"}
      </h2>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">Title</label>
        <div className="relative">
          <textarea
            placeholder="Enter activity title..."
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            maxLength={100}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute bottom-2 right-4 text-xs text-gray-500">
            {formData.title.length}/100
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Overview
        </label>
        <div className="relative">
          <textarea
            placeholder="Enter activity overview..."
            value={formData.overview}
            onChange={(e) => updateFormData({ overview: e.target.value })}
            maxLength={500}
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute bottom-2 right-4 text-xs text-gray-500">
            {formData.overview.length}/500
          </span>
        </div>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const ItineraryForm: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleChange = (
    index: number,
    field: keyof (typeof formData.itinerary)[0],
    value: string
  ) => {
    const newItinerary = formData.itinerary.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateFormData({ itinerary: newItinerary });
  };

  const handleAdd = () => {
    const newItinerary = [
      ...formData.itinerary,
      { time: "", title: "", overview: "" },
    ];
    updateFormData({ itinerary: newItinerary });
  };

  const handleRemove = (index: number) => {
    if (formData.itinerary.length > 1) {
      const newItinerary = formData.itinerary.filter((_, i) => i !== index);
      updateFormData({ itinerary: newItinerary });
    }
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Itinerary" : "Itinerary"}
      </h2>

      {formData.itinerary.map((item, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-4 mb-6 shadow-sm relative"
        >
          <div className="flex items-center justify-between mb-4">
            <label className="block font-semibold text-[#1e2a49]">
              {index + 1}
            </label>
            {formData.itinerary.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>

          <div className="relative mb-4">
            <textarea
              placeholder="Day/Time"
              value={item.time}
              onChange={(e) => handleChange(index, "time", e.target.value)}
              maxLength={20}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {item.time.length}/20
            </span>
          </div>

          <div className="relative mb-4">
            <textarea
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              maxLength={70}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {item.title.length}/70
            </span>
          </div>

          <div className="relative">
            <textarea
              placeholder="Overview"
              value={item.overview}
              onChange={(e) => handleChange(index, "overview", e.target.value)}
              maxLength={400}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {item.overview.length}/400
            </span>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-8"
      >
        <span className="text-xl leading-none">+</span> more
      </button>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const InclusionsExclusionsForm: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleInclusionChange = (index: number, value: string) => {
    const newInclusions = formData.inclusions.map((item, i) =>
      i === index ? value : item
    );
    updateFormData({ inclusions: newInclusions });
  };

  const handleExclusionChange = (index: number, value: string) => {
    const newExclusions = formData.exclusions.map((item, i) =>
      i === index ? value : item
    );
    updateFormData({ exclusions: newExclusions });
  };

  const addInclusion = () => {
    updateFormData({ inclusions: [...formData.inclusions, ""] });
  };

  const addExclusion = () => {
    updateFormData({ exclusions: [...formData.exclusions, ""] });
  };

  // const removeInclusion = (index: number) => {
  //   if (formData.inclusions.length > 1) {
  //     const newInclusions = formData.inclusions.filter((_, i) => i !== index);
  //     updateFormData({ inclusions: newInclusions });
  //   }
  // };

  // const removeExclusion = (index: number) => {
  //   if (formData.exclusions.length > 1) {
  //     const newExclusions = formData.exclusions.filter((_, i) => i !== index);
  //     updateFormData({ exclusions: newExclusions });
  //   }
  // };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode
          ? "Edit Inclusions & Exclusions"
          : "Inclusions & Exclusions"}
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
          Inclusions
        </h3>
        {formData.inclusions.map((item, index) => (
          <div key={index} className="mb-4 flex gap-3">
            <textarea
              placeholder="Enter inclusion..."
              value={item}
              onChange={(e) => handleInclusionChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addInclusion}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> Add Inclusion
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
          Exclusions
        </h3>
        {formData.exclusions.map((item, index) => (
          <div key={index} className="mb-4 flex gap-3">
            <textarea
              placeholder="Enter exclusion..."
              value={item}
              onChange={(e) => handleExclusionChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addExclusion}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <span className="text-xl leading-none">+</span> Add Exclusion
        </button>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const FaqForm: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleChange = (
    index: number,
    field: keyof (typeof formData.faqs)[0],
    value: string
  ) => {
    const newFaqs = formData.faqs.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    updateFormData({ faqs: newFaqs });
  };

  const handleAddMore = () => {
    updateFormData({ faqs: [...formData.faqs, { question: "", answer: "" }] });
  };

  const handleRemove = (index: number) => {
    if (formData.faqs.length > 1) {
      const newFaqs = formData.faqs.filter((_, i) => i !== index);
      updateFormData({ faqs: newFaqs });
    }
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit FAQs" : "FAQs"}
      </h2>

      {formData.faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <label className="block text-lg font-semibold text-[#1e2a49]">
              FAQ {index + 1}
            </label>
            {formData.faqs.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>

          <div className="relative mb-5">
            <textarea
              placeholder="Enter question..."
              value={faq.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-4 bottom-2 text-xs text-gray-500">
              {faq.question.length}/100
            </span>
          </div>

          <div className="relative">
            <textarea
              placeholder="Enter answer..."
              value={faq.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              maxLength={300}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-4 bottom-2 text-xs text-gray-500">
              {faq.answer.length}/300
            </span>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddMore}
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-semibold mb-8 hover:bg-emerald-200 transition"
      >
        <span className="text-xl leading-none">+</span> Add More
      </button>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const PricingAddonsSection: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const [selectedType, setSelectedType] = useState<"person" | "booking">(
    "person"
  );

  return (
    <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Pricing & Add Ons" : "Pricing & Add Ons"}
      </h2>

      {/* Base Price Card */}
      <div className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row gap-6 mb-5 shadow-sm">
        <div className="sm:w-36 flex border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
          Base Price
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <div className="relative">
              <input
                type="text"
                placeholder="450,000"
                value={formData.base_price}
                onChange={(e) => updateFormData({ base_price: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
              />
              <span className="absolute right-4 top-2.5 text-sm text-gray-400">
                PKR
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Age range
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="number"
                defaultValue={2}
                className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center text-sm"
              />
              <span className="text-gray-600 text-sm">to</span>
              <input
                type="number"
                defaultValue={12}
                className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center text-sm"
              />
              <span className="text-sm text-gray-400">years old</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Age group
            </label>
            <input
              type="text"
              placeholder="i.e adults"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-medium mb-6"
      >
        <span className="text-xl leading-none">+</span> Secondary price groups
      </button>

      {/* Add-On Card */}
      <div className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row gap-6 mb-5 shadow-sm">
        <div className="sm:w-36 flex border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
          Add On 1
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Add on</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="450,000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
              />
              <span className="absolute right-4 top-2.5 text-sm text-gray-400">
                PKR
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Type</label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedType("person")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                  selectedType === "person"
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-[#1e2a49] border-gray-300"
                }`}
              >
                Per person
              </button>
              <button
                type="button"
                onClick={() => setSelectedType("booking")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                  selectedType === "booking"
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-[#1e2a49] border-gray-300"
                }`}
              >
                Per booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-medium mb-8 hover:bg-emerald-200 transition"
      >
        <span className="text-xl leading-none">+</span> More add ons
      </button>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </div>
  );
};

const ImportantInformationForm: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleImportantInfoChange = (index: number, value: string) => {
    const newInfo = formData.important_info.map((item, i) =>
      i === index ? value : item
    );
    updateFormData({ important_info: newInfo });
  };

  const handleNotSuitableChange = (index: number, value: string) => {
    const newInfo = formData.not_suitable_for.map((item, i) =>
      i === index ? value : item
    );
    updateFormData({ not_suitable_for: newInfo });
  };

  const addImportantInfo = () => {
    updateFormData({ important_info: [...formData.important_info, ""] });
  };

  const addNotSuitable = () => {
    updateFormData({ not_suitable_for: [...formData.not_suitable_for, ""] });
  };

  const removeImportantInfo = (index: number) => {
    if (formData.important_info.length > 1) {
      const newInfo = formData.important_info.filter((_, i) => i !== index);
      updateFormData({ important_info: newInfo });
    }
  };

  const removeNotSuitable = (index: number) => {
    if (formData.not_suitable_for.length > 1) {
      const newInfo = formData.not_suitable_for.filter((_, i) => i !== index);
      updateFormData({ not_suitable_for: newInfo });
    }
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Important Information" : "Important Information"}
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
          Additional details
        </h3>
        {formData.important_info.map((item, index) => (
          <div key={index} className="mb-4 flex gap-3">
            <textarea
              placeholder="Enter additional detail..."
              value={item}
              onChange={(e) => handleImportantInfoChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formData.important_info.length > 1 && (
              <button
                type="button"
                onClick={() => removeImportantInfo(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium p-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImportantInfo}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-6"
        >
          <span className="text-xl leading-none">+</span> Add Detail
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
          Not suitable for
        </h3>
        {formData.not_suitable_for.map((item, index) => (
          <div key={index} className="mb-4 flex gap-3">
            <textarea
              placeholder="Enter restriction..."
              value={item}
              onChange={(e) => handleNotSuitableChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formData.not_suitable_for.length > 1 && (
              <button
                type="button"
                onClick={() => removeNotSuitable(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium p-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addNotSuitable}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-6"
        >
          <span className="text-xl leading-none">+</span> Add Restriction
        </button>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const ListingSubmitted = ({
  onButtonClick,
  isEditMode,
}: {
  onButtonClick: () => void;
  isEditMode?: boolean;
}) => {
  return (
    <ListingSubmissionMessage
      image="/images/verified_8948320.gif"
      title={
        isEditMode
          ? "Your Activity Has Been Updated"
          : "Your Activity Has Been Submitted"
      }
      description={
        isEditMode
          ? "Thank you for updating your activity on TravelNinja. Our team is reviewing your changes to ensure they meet our quality standards."
          : "Thank you for adding your activity to TravelNinja. Our team is currently reviewing your listing to ensure it meets our quality standards."
      }
      sections={[
        {
          heading: isEditMode ? "Review Process" : "Approval Process",
          content: isEditMode
            ? "Updates typically take 2-6 hours to review."
            : "This typically takes 6-12 hours.",
        },
        {
          heading: "Notifications",
          content: isEditMode
            ? "We'll notify you via email and dashboard once your changes are approved and live."
            : "We'll notify you via email and dashboard once your activity is approved and live.",
        },
        {
          heading: "Updates & Edits",
          content:
            "Need to make changes? You can edit your listing anytime from your dashboard.",
        },
      ]}
      buttonLabel="Go to Dashboard"
      onButtonClick={onButtonClick}
    />
  );
};

// Main Component
const steps = [
  "Activity Media & Basics",
  "Title & Overview",
  "Itinerary",
  "Inclusions & Exclusions",
  "FAQs",
  "Pricing & Add Ons",
  "Important Information",
];

const stepComponents = [
  ActivityMediaBasics,
  TitleOverview,
  ItineraryForm,
  InclusionsExclusionsForm,
  FaqForm,
  PricingAddonsSection,
  ImportantInformationForm,
  ListingSubmitted,
];

export default function ListingManager() {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<ActivityFormData>({
    select_activity: "",
    min_people: "1",
    duration: "3 days",
    age_range: "0-11",
    languages: [],
    difficulty_level: "",
    city_region: "",
    availability: "",
    title: "",
    overview: "",
    photos: [],
    itinerary: [{ time: "", title: "", overview: "" }],
    inclusions: [""],
    exclusions: [""],
    faqs: [{ question: "", answer: "" }],
    base_price: "",
    secondary_prices: [],
    add_ons: [],
    important_info: [""],
    not_suitable_for: [""],
  });

  // Load existing listing data if in edit mode
  useEffect(() => {
    const loadListingData = async () => {
      if (!isEditMode) {
        setInitialLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to edit listings.");
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:9000/api/v1/listings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load listing data");
        }

        const data = await response.json();

        // Map API data to form data structure
        const metaData = data.meta_data || {};

        setFormData({
          select_activity: metaData.select_activity || "",
          min_people: String(metaData.min_people || "1"),
          duration: metaData.duration || "3 days",
          age_range: metaData.age_range || "0-11",
          languages: metaData.languages || [],
          difficulty_level: metaData.difficulty_level || "",
          city_region: metaData.city_region || "",
          availability: metaData.availability || "",
          title: data.title || "",
          overview: data.description || "",
          photos: metaData.photos || [],
          itinerary: metaData.itinerary || [
            { time: "", title: "", overview: "" },
          ],
          inclusions: metaData.inclusions || [""],
          exclusions: metaData.exclusions || [""],
          faqs: metaData.faqs || [{ question: "", answer: "" }],
          base_price: String(data.price || ""),
          secondary_prices: metaData.secondary_prices || [],
          add_ons: metaData.add_ons || [],
          important_info: metaData.important_info || [""],
          not_suitable_for: metaData.not_suitable_for || [""],
        });

        toast.success("Your listing data has been loaded for editing.");
      } catch (error) {
        console.error("Error loading listing:", error);
        toast.error("Failed to load listing data. Please try again.");
        navigate("/dashboard");
      } finally {
        setInitialLoading(false);
      }
    };

    loadListingData();
  }, [id, isEditMode, navigate]);

  const StepComponent = stepComponents[stepIndex];

  const handleNext = () => {
    console.log("Current form data:", formData);
    if (stepIndex < stepComponents.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    console.log("Updating form data with:", updates);
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log("New form data:", newData);
      return newData;
    });
  };

  const uploadFiles = async (files: File[]) => {
    setLoading(true);
    const uploadData = new FormData();
    files.forEach((file) => uploadData.append("files", file));

    try {
      const res = await fetch("http://localhost:9000/api/v1/uploads", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const fullUrls = data.urls.map(
        (url: string) => `http://localhost:9000${url}`
      );
      updateFormData({ photos: [...formData.photos, ...fullUrls] });

      toast.success(`Successfully uploaded ${files.length} photo(s).`);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload photos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const partnerId = localStorage.getItem("user_id");

    if (!token || !partnerId) {
      toast.error("Missing authentication. Please log in again.");
      setLoading(false);
      return;
    }

    const payload = {
      partner_id: partnerId,
      listing_type: "activity",
      title: formData.title,
      description: formData.overview,
      price: parseInt(formData.base_price.replace(/,/g, "") || "0"),
      meta_data: {
        photos: formData.photos,
        select_activity: formData.select_activity,
        min_people: parseInt(formData.min_people),
        duration: formData.duration,
        age_range: formData.age_range,
        languages: formData.languages,
        difficulty_level: formData.difficulty_level,
        set_availability: true,
        city_region: formData.city_region,
        title: formData.title,
        overview: formData.overview,
        highlights: "",
        itinerary: formData.itinerary,
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        faqs: formData.faqs,
        base_price: parseInt(formData.base_price.replace(/,/g, "") || "0"),
        secondary_prices: formData.secondary_prices,
        add_ons: formData.add_ons,
        important_info: formData.important_info,
        not_suitable_for: formData.not_suitable_for,
      },
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      const url = isEditMode
        ? `http://localhost:9000/api/v1/listings/${id}`
        : "http://localhost:9000/api/v1/listings";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("❌ Submission error:", data);
        toast.error(
          data.message || "Failed to save listing. Please try again."
        );
        setLoading(false);
        return;
      }

      console.log("✅ Submitted:", data);
      toast.success(
        isEditMode
          ? "Your listing has been updated successfully!"
          : "Your listing has been submitted for review!"
      );

      setStepIndex(stepComponents.length - 1); // show success page
    } catch (err) {
      console.error("❌ Error during submission:", err);
      toast.error(
        "Unable to connect to server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleStepClick = (index: number) => {
    setStepIndex(index);
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {isEditMode ? "Loading listing data..." : "Preparing form..."}
          </h2>
          <p className="text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar - Hide on success page */}
        {stepIndex !== stepComponents.length - 1 && (
          <ListingSidebar
            steps={steps}
            activeStep={stepIndex}
            onStepClick={handleStepClick}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-700 font-medium">
                  {isEditMode
                    ? "Updating your listing..."
                    : "Creating your listing..."}
                </p>
              </div>
            </div>
          )}

          <StepComponent
            onNext={
              stepIndex === stepComponents.length - 2
                ? handleSubmit
                : handleNext
            }
            onBack={handleBack}
            onButtonClick={() => navigate("/dashboard")}
            formData={formData}
            updateFormData={updateFormData}
            onPhotosUpload={uploadFiles}
            nextLabel={
              stepIndex === stepComponents.length - 2
                ? isEditMode
                  ? "Update Listing"
                  : "Submit Listing"
                : "Next"
            }
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </div>
  );
}
