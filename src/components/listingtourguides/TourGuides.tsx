"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ListingButtons from "../ListingButtons";
import ListingSubmissionMessage from "../ui/ListingSubmissionMessage";
import ListingSidebar from "../ui/ListingSidebar";

const uploadIcon = "/images/upload-icon.svg";

// Types
interface ExperienceData {
  photos: string[];
  experience_type: string;
  duration: string;
  places_covered: string[];
  min_people: number;
  set_availability: boolean;
  age_range: string;
  difficulty_level: string;
  languages: string[];
  starts_in: string;
  pickup_included: boolean;
  meeting_time_date: string;
  title: string;
  overview: string;
  highlights: string[];
  itinerary: Array<{
    time: string;
    title: string;
    overview: string;
  }>;
  inclusions_exclusions: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  base_price: number;
  secondary_prices: Array<{
    label: string;
    price: number;
  }>;
  add_ons: string[];
  important_info: string;
  not_suitable_for: string[];
}

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  onButtonClick?: () => void;
  formData: ExperienceData;
  updateFormData: (data: Partial<ExperienceData>) => void;
  isEditMode?: boolean;
}

// Individual Step Components
const AboutTheExperience: React.FC<StepProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await uploadFiles(files);
    }
  };

  const uploadFiles = async (files: File[]) => {
    const fileUploadForm = new FormData();
    files.forEach((file) => fileUploadForm.append("files", file));

    try {
      const res = await fetch("http://localhost:9000/api/v1/uploads", {
        method: "POST",
        body: fileUploadForm,
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
    }
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit About the Experience" : "About the Experience"}
      </h2>

      {/* Photo Upload Section */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6">
        <div className="p-3 bg-emerald-50 rounded-full">
          <img src={uploadIcon} alt="Upload" className="h-8 w-8" />
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
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {formData.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {formData.photos.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Experience Type */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Experience type
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.experience_type}
          onChange={(e) => updateFormData({ experience_type: e.target.value })}
        >
          <option value="">Select types</option>
          <option value="cultural">Cultural</option>
          <option value="adventure">Adventure</option>
          <option value="nature">Nature</option>
          <option value="food">Food & Culinary</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Duration</label>
        <input
          type="text"
          placeholder="e.g., 3 days, 5 hours"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.duration}
          onChange={(e) => updateFormData({ duration: e.target.value })}
        />
      </div>

      {/* Locations Covered */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Locations covered
        </label>
        <input
          type="text"
          placeholder="e.g., Hunza, Skardu (comma separated)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.places_covered.join(", ")}
          onChange={(e) =>
            updateFormData({
              places_covered: e.target.value.split(", ").filter(Boolean),
            })
          }
        />
      </div>

      {/* Starts In */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Starts in</label>
        <input
          type="text"
          placeholder="e.g., Lahore, Islamabad"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.starts_in}
          onChange={(e) => updateFormData({ starts_in: e.target.value })}
        />
      </div>

      {/* Age Range */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Age range</label>
        <input
          type="text"
          placeholder="e.g., 18-65 years"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.age_range}
          onChange={(e) => updateFormData({ age_range: e.target.value })}
        />
      </div>

      {/* Min People */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Min. people required for booking
        </label>
        <input
          type="number"
          className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={formData.min_people}
          onChange={(e) =>
            updateFormData({ min_people: parseInt(e.target.value) || 1 })
          }
        />
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Difficulty level
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.difficulty_level}
          onChange={(e) => updateFormData({ difficulty_level: e.target.value })}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Languages</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.languages[0] || ""}
          onChange={(e) => updateFormData({ languages: [e.target.value] })}
        >
          <option value="">Select language</option>
          <option value="English">English</option>
          <option value="Urdu">Urdu</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>

      {/* Pickup Included */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Pickup Included
        </label>
        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={() => updateFormData({ pickup_included: true })}
            className={`px-4 py-2 rounded-lg border ${
              formData.pickup_included
                ? "bg-emerald-600 text-white"
                : "bg-white border-gray-300 text-gray-700"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ pickup_included: false })}
            className={`px-4 py-2 rounded-lg border ${
              !formData.pickup_included
                ? "bg-emerald-600 text-white"
                : "bg-white border-gray-300 text-gray-700"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Meeting Time/Date */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Meeting Time/Date
        </label>
        <input
          type="text"
          placeholder="e.g., 9:00 AM daily"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.meeting_time_date}
          onChange={(e) =>
            updateFormData({ meeting_time_date: e.target.value })
          }
        />
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
}) => (
  <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
    <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
      {isEditMode ? "Edit Title & Overview" : "Title & Overview"}
    </h2>

    <div className="mb-6">
      <label className="block text-sm font-semibold text-[#1e2a49] mb-2">
        Title
      </label>
      <div className="relative">
        <textarea
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          maxLength={100}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-500">
          {formData.title.length}/100
        </span>
      </div>
    </div>

    <div className="mb-8">
      <label className="block text-sm font-semibold text-[#1e2a49] mb-2">
        Overview
      </label>
      <div className="relative">
        <textarea
          value={formData.overview}
          onChange={(e) => updateFormData({ overview: e.target.value })}
          maxLength={600}
          rows={8}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-500">
          {formData.overview.length}/600
        </span>
      </div>
    </div>

    <ListingButtons onBack={onBack} onNext={onNext} />
  </div>
);

const HighlightsForm: React.FC<StepProps> = ({
  onBack,
  onNext,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleHighlightChange = (index: number, value: string) => {
    const updated = [...formData.highlights];
    updated[index] = value;
    updateFormData({ highlights: updated });
  };

  const addMoreHighlight = () => {
    updateFormData({ highlights: [...formData.highlights, ""] });
  };

  return (
    <form className="max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Highlights" : "Highlights"}
      </h2>

      <label className="block mb-2 font-semibold text-[#1e2a49]">
        Highlights
      </label>

      {formData.highlights.map((highlight, index) => (
        <div className="mb-4 relative" key={index}>
          <textarea
            rows={2}
            maxLength={90}
            value={highlight}
            onChange={(e) => handleHighlightChange(index, e.target.value)}
            className="w-[600px] h-[40px] border border-gray-300 rounded-lg px-4 py-2 text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute bottom-2 right-3 text-xs text-gray-500">
            {highlight.length}/90
          </span>
        </div>
      ))}

      <button
        type="button"
        onClick={addMoreHighlight}
        className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8 hover:bg-emerald-100"
      >
        <Plus size={16} />
        more
      </button>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const ItineraryForm: React.FC<StepProps> = ({
  onBack,
  onNext,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleChange = (
    index: number,
    field: keyof (typeof formData.itinerary)[0],
    value: string
  ) => {
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData({ itinerary: updated });
  };

  const handleAdd = () => {
    updateFormData({
      itinerary: [...formData.itinerary, { time: "", title: "", overview: "" }],
    });
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Itinerary" : "Itinerary"}
      </h2>

      {formData.itinerary.map((item, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-4 mb-6 shadow-sm"
        >
          <label className="block font-semibold text-[#1e2a49] mb-4">
            {index + 1}
          </label>

          <div className="relative mb-4">
            <textarea
              placeholder="i.e Day 1"
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
              placeholder="i.e Arrival in Islamabad"
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
              placeholder="i.e Our day begins in..."
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

const InclusionsForm: React.FC<StepProps> = ({
  onBack,
  onNext,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleInclusionChange = (index: number, value: string) => {
    const updatedInclusions = [...formData.inclusions_exclusions];
    updatedInclusions[index] = value;
    updateFormData({ inclusions_exclusions: updatedInclusions });
  };

  const addInclusion = () => {
    updateFormData({
      inclusions_exclusions: [...formData.inclusions_exclusions, ""],
    });
  };

  const removeInclusion = (index: number) => {
    if (formData.inclusions_exclusions.length > 1) {
      const updatedInclusions = formData.inclusions_exclusions.filter(
        (_, i) => i !== index
      );
      updateFormData({ inclusions_exclusions: updatedInclusions });
    }
  };

  return (
    <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode
          ? "Edit Inclusions & Exclusions"
          : "Inclusions & Exclusions"}
      </h2>

      {/* Inclusions Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">
          Inclusions & Exclusions
        </h3>
        {formData.inclusions_exclusions.map((item, index) => (
          <div key={index} className="mb-4 flex gap-3">
            <textarea
              placeholder="Enter inclusion or exclusion..."
              value={item}
              onChange={(e) => handleInclusionChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formData.inclusions_exclusions.length > 1 && (
              <button
                type="button"
                onClick={() => removeInclusion(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium p-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addInclusion}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </div>
  );
};

const FaqsForm: React.FC<StepProps> = ({
  onBack,
  onNext,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const handleChange = (
    index: number,
    field: keyof (typeof formData.faqs)[0],
    value: string
  ) => {
    const updated = [...formData.faqs];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData({ faqs: updated });
  };

  const handleAdd = () => {
    updateFormData({ faqs: [...formData.faqs, { question: "", answer: "" }] });
  };

  const handleRemove = (index: number) => {
    if (formData.faqs.length > 1) {
      const updated = formData.faqs.filter((_, i) => i !== index);
      updateFormData({ faqs: updated });
    }
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit FAQs" : "FAQs"}
      </h2>

      {formData.faqs.map((item, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-4 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <label className="block font-semibold text-[#1e2a49]">
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

          <div className="relative mb-4">
            <textarea
              placeholder="Question"
              value={item.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {item.question.length}/100
            </span>
          </div>

          <div className="relative">
            <textarea
              placeholder="Answer"
              value={item.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              maxLength={300}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {item.answer.length}/300
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

const PricingAddOns: React.FC<StepProps> = ({
  onBack,
  onNext,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const [addOns, setAddOns] = useState<
    Array<{ name: string; price: number; type: string }>
  >([{ name: "", price: 0, type: "person" }]);

  const handleAddOnChange = (index: number, field: string, value: any) => {
    const updated = [...addOns];
    updated[index] = { ...updated[index], [field]: value };
    setAddOns(updated);
  };

  const addMoreAddOn = () => {
    setAddOns([...addOns, { name: "", price: 0, type: "person" }]);
  };

  const handleNext = () => {
    const validAddOns = addOns.filter(
      (addon) => addon.name.trim() && addon.price > 0
    );
    updateFormData({
      add_ons: validAddOns.map(
        (addon) => `${addon.name}: ${addon.price} PKR per ${addon.type}`
      ),
    });
    onNext();
  };

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
            <label className="block text-sm font-semibold mb-1">
              Price (PKR)
            </label>
            <input
              type="number"
              placeholder="450000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              value={formData.base_price}
              onChange={(e) =>
                updateFormData({ base_price: parseInt(e.target.value) || 0 })
              }
            />
          </div>
        </div>
      </div>

      {/* Add-On Cards */}
      {addOns.map((addon, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row gap-6 mb-5 shadow-sm"
        >
          <div className="sm:w-36 flex border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
            Add On {index + 1}
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Add on</label>
              <input
                type="text"
                placeholder="e.g., Professional guide"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                value={addon.name}
                onChange={(e) =>
                  handleAddOnChange(index, "name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Price (PKR)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                value={addon.price}
                onChange={(e) =>
                  handleAddOnChange(
                    index,
                    "price",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Type</label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleAddOnChange(index, "type", "person")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                    addon.type === "person"
                      ? "bg-emerald-700 text-white"
                      : "bg-white text-[#1e2a49] border-gray-300"
                  }`}
                >
                  Per person
                </button>
                <button
                  type="button"
                  onClick={() => handleAddOnChange(index, "type", "booking")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                    addon.type === "booking"
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
      ))}

      <button
        type="button"
        onClick={addMoreAddOn}
        className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-medium mb-8"
      >
        <span className="text-xl leading-none">+</span> More add ons
      </button>

      <ListingButtons onBack={onBack} onNext={handleNext} />
    </div>
  );
};

const ImportantInfo: React.FC<StepProps> = ({
  onBack,
  onNext,
  formData,
  updateFormData,
  isEditMode,
}) => {
  const [importantInfo, setImportantInfo] = useState(
    formData.important_info || ""
  );
  const [notSuitableFor, setNotSuitableFor] = useState(
    formData.not_suitable_for?.join(", ") || ""
  );

  const handleNext = () => {
    updateFormData({
      important_info: importantInfo,
      not_suitable_for: notSuitableFor
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
    onNext();
  };

  return (
    <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        {isEditMode ? "Edit Important Information" : "Important Information"}
      </h2>

      {/* Additional details */}
      <div className="mb-8">
        <label className="block text-[#1e2a49] font-semibold mb-3 text-base">
          Additional details
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows={4}
          placeholder="Enter additional details"
          value={importantInfo}
          onChange={(e) => setImportantInfo(e.target.value)}
        />
      </div>

      {/* Not suitable for */}
      <div className="mb-8">
        <label className="block text-[#1e2a49] font-semibold mb-3 text-base">
          Not suitable for
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows={4}
          placeholder="Enter comma-separated items (e.g., pregnant women, people with back problems)"
          value={notSuitableFor}
          onChange={(e) => setNotSuitableFor(e.target.value)}
        />
      </div>

      <ListingButtons
        onBack={onBack}
        onNext={handleNext}
        nextLabel={isEditMode ? "Update Experience" : "Submit Experience"}
      />
    </div>
  );
};

const ExperienceSubmitted: React.FC<StepProps> = ({
  onButtonClick,
  isEditMode,
}) => {
  return (
    <ListingSubmissionMessage
      image="/images/verified_8948320.gif"
      title={
        isEditMode
          ? "Your Experience Has Been Updated"
          : "Your Experience Has Been Submitted"
      }
      description={
        isEditMode
          ? "Thank you for updating your experience on TravelNinja. Our team is reviewing your changes to ensure they meet our quality standards."
          : "Thank you for adding your experience to TravelNinja. Our team is currently reviewing your listing to ensure it meets our quality standards."
      }
      sections={[
        {
          heading: isEditMode ? "Review Process" : "Approval Process",
          content: isEditMode
            ? "Updates typically take 2-6 hours to review."
            : "This typically takes 6–12 hours.",
        },
        {
          heading: "Notifications",
          content: isEditMode
            ? "We'll notify you via email and dashboard once your changes are approved and live."
            : "We'll notify you via email and dashboard once your experience is approved and live.",
        },
        {
          heading: "Updates & Edits",
          content:
            "Need to make changes? You can edit your listing anytime from your dashboard.",
        },
      ]}
      buttonLabel="Go to Dashboard"
      onButtonClick={onButtonClick || (() => {})}
    />
  );
};

// Step components and titles
const stepComponents = [
  AboutTheExperience,
  TitleOverview,
  HighlightsForm,
  ItineraryForm,
  InclusionsForm,
  FaqsForm,
  PricingAddOns,
  ImportantInfo,
];

const stepTitles = [
  "About the Experience",
  "Title & Overview",
  "Highlights",
  "Itinerary",
  "Inclusions",
  "FAQs",
  "Pricing & Add Ons",
  "Important Information",
];

// Main Component
export default function ExperienceForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  // Check for edit mode using URL search params
  const searchParams = new URLSearchParams(window.location.search);
  const listingId = searchParams.get("id");
  const isEditMode = Boolean(listingId);

  // Initialize form data with default values
  const [formData, setFormData] = useState<ExperienceData>({
    photos: [],
    experience_type: "",
    duration: "",
    places_covered: [],
    min_people: 1,
    set_availability: false,
    age_range: "",
    difficulty_level: "",
    languages: [],
    starts_in: "",
    pickup_included: false,
    meeting_time_date: "",
    title: "",
    overview: "",
    highlights: ["", "", ""],
    itinerary: [{ time: "", title: "", overview: "" }],
    inclusions_exclusions: [""],
    faqs: [{ question: "", answer: "" }],
    base_price: 0,
    secondary_prices: [],
    add_ons: [],
    important_info: "",
    not_suitable_for: [],
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
          `http://localhost:9000/api/v1/listings/${listingId}`,
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
        const metaData = data.meta_data || {};

        setFormData({
          photos: metaData.photos || [],
          experience_type: metaData.experience_type || "",
          duration: metaData.duration || "",
          places_covered: metaData.places_covered || [],
          min_people: metaData.min_people || 1,
          set_availability: metaData.set_availability || false,
          age_range: metaData.age_range || "",
          difficulty_level: metaData.difficulty_level || "",
          languages: metaData.languages || [],
          starts_in: metaData.starts_in || "",
          pickup_included: metaData.pickup_included || false,
          meeting_time_date: metaData.meeting_time_date || "",
          title: data.title || "",
          overview: data.description || "",
          highlights: metaData.highlights
            ? metaData.highlights.split(", ")
            : ["", "", ""],
          itinerary: Array.isArray(metaData.itinerary)
            ? metaData.itinerary
            : [{ time: "", title: "", overview: "" }],
          inclusions_exclusions: metaData.inclusions_exclusions || [""],
          faqs:
            Array.isArray(metaData.faqs) && metaData.faqs.length > 0
              ? metaData.faqs.map((faq: string) => {
                  const [question, answer] = faq.split(" A: ");
                  return {
                    question: question?.replace("Q: ", "") || "",
                    answer: answer || "",
                  };
                })
              : [{ question: "", answer: "" }],
          base_price: data.price || 0,
          secondary_prices: metaData.secondary_prices || [],
          add_ons: metaData.add_ons || [],
          important_info: metaData.important_info || "",
          not_suitable_for: metaData.not_suitable_for || [],
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
  }, [listingId, isEditMode, navigate]);

  const updateFormData = (data: Partial<ExperienceData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    if (stepIndex === stepComponents.length - 1) {
      await handleSubmit();
    } else {
      setStepIndex(stepIndex + 1);
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

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const partnerId = localStorage.getItem("user_id");

    if (!token || !partnerId) {
      toast.error("Missing authentication. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        partner_id: partnerId,
        listing_type: "experience",
        title: formData.title,
        description: formData.overview,
        price: formData.base_price,
        meta_data: {
          photos: formData.photos,
          experience_type: formData.experience_type,
          duration: formData.duration,
          places_covered: formData.places_covered,
          min_people: formData.min_people,
          set_availability: formData.set_availability,
          age_range: formData.age_range,
          difficulty_level: formData.difficulty_level,
          languages: formData.languages,
          starts_in: formData.starts_in,
          pickup_included: formData.pickup_included,
          meeting_time_date: formData.meeting_time_date,
          title: formData.title,
          overview: formData.overview,
          highlights: formData.highlights.filter((h) => h.trim()).join(", "),
          itinerary: JSON.stringify(
            formData.itinerary.filter((i) => i.title.trim())
          ),
          inclusions_exclusions: formData.inclusions_exclusions.filter((item) =>
            item.trim()
          ),
          faqs: formData.faqs
            .filter((f) => f.question.trim() && f.answer.trim())
            .map((f) => `Q: ${f.question} A: ${f.answer}`),
          base_price: formData.base_price,
          secondary_prices: formData.secondary_prices,
          add_ons: formData.add_ons,
          important_info: formData.important_info,
          not_suitable_for: formData.not_suitable_for,
        },
      };

      console.log("Submitting payload:", JSON.stringify(payload, null, 2));

      const url = isEditMode
        ? `http://localhost:9000/api/v1/listings/${listingId}`
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

      setStepIndex(stepComponents.length); // show success page
    } catch (err) {
      console.error("❌ Error during submission:", err);
      toast.error(
        "Unable to connect to server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
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

  // Show success page
  if (stepIndex >= stepComponents.length) {
    return (
      <div className="flex">
        <ListingSidebar
          steps={stepTitles}
          activeStep={stepIndex}
          onStepClick={handleStepClick}
        />
        <div className="flex-1 p-6">
          <ExperienceSubmitted
            onNext={() => {}}
            onBack={() => {}}
            onButtonClick={() => navigate("/dashboard")}
            formData={formData}
            updateFormData={updateFormData}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    );
  }

  const StepComponent = stepComponents[stepIndex];

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar - Hide on success page */}
        {stepIndex !== stepComponents.length && (
          <ListingSidebar
            steps={stepTitles}
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
            onNext={handleNext}
            onBack={handleBack}
            onButtonClick={() => navigate("/dashboard")}
            formData={formData}
            updateFormData={updateFormData}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </div>
  );
}
