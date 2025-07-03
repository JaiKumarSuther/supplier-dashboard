import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingSidebar from "../ui/ListingSidebar";

const uploadIcon = "/images/upload-icon.svg";

// Types
interface ItineraryItem {
  time: string;
  title: string;
  overview: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface InclusionExclusionItem {
  text: string;
}

interface ImportantInfoItem {
  text: string;
}

// Utility Components
const ListingButtons = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => (
  <div className="flex justify-between">
    <button
      type="button"
      onClick={onBack}
      className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
    >
      Back
    </button>
    <button
      type="button"
      onClick={onNext}
      className="px-6 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-800"
    >
      Next
    </button>
  </div>
);




const ListingSubmissionMessage = ({
  image,
  title,
  description,
  sections,
  buttonLabel,
  onButtonClick,
}: {
  image: string;
  title: string;
  description: string;
  sections: Array<{ heading: string; content: string }>;
  buttonLabel: string;
  onButtonClick: () => void;
}) => (
  <div className="max-w-2xl mx-auto p-8 text-center">
    <img src={image} alt="Success" className="w-24 h-24 mx-auto mb-6" />
    <h2 className="text-3xl font-bold text-[#1e2a49] mb-4">{title}</h2>
    <p className="text-gray-600 mb-8">{description}</p>
    
    <div className="space-y-6 text-left mb-8">
      {sections.map((section, index) => (
        <div key={index}>
          <h3 className="font-semibold text-[#1e2a49] mb-2">{section.heading}</h3>
          <p className="text-gray-600">{section.content}</p>
        </div>
      ))}
    </div>
    
    <button
      onClick={onButtonClick}
      className="px-8 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800"
    >
      {buttonLabel}
    </button>
  </div>
);

// Step Components
const ActivityMediaBasics = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [activity, setActivity] = useState("");
  const [durationDays, setDurationDays] = useState("3");
  const [durationType, setDurationType] = useState("days");
  const [minPeople, setMinPeople] = useState("4");
  const [ageRange, setAgeRange] = useState({ min: "0", max: "11" });
  const [difficulty, setDifficulty] = useState("");
  const [languages, setLanguages] = useState("");
  const [region, setRegion] = useState("");
  const [availability, setAvailability] = useState("");

  return (
    <form className="max-w-5xl md:w-[650px] py-2">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        Activity Media & Basics
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
        <button
          type="button"
          className="text-emerald-700 text-sm mt-2 font-medium hover:underline"
        >
          Select
        </button>
      </div>

      {/* Activity */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Activity</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option>Select activity</option>
          <option>Hiking</option>
          <option>Kayaking</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Duration</label>
        <div className="flex gap-3">
          <select
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>days</option>
            <option>hours</option>
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
          value={minPeople}
          onChange={(e) => setMinPeople(e.target.value)}
          className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Age Range */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Age range</label>
        <div className="flex items-center gap-3">
          <select
            value={ageRange.min}
            onChange={(e) =>
              setAgeRange({ ...ageRange, min: e.target.value })
            }
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          <span className="text-sm">to</span>
          <select
            value={ageRange.max}
            onChange={(e) =>
              setAgeRange({ ...ageRange, max: e.target.value })
            }
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i}>{i + 1}</option>
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
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select difficulty level</option>
          <option>Easy</option>
          <option>Moderate</option>
          <option>Extreme</option>
        </select>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Languages spoken by guide
        </label>
        <select
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select languages</option>
          <option>English</option>
          <option>Urdu</option>
        </select>
      </div>

      {/* Region */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Which region is activity operated in
        </label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Select city</option>
          <option>Lahore</option>
          <option>Karachi</option>
        </select>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-sm">Availability</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option>Set availability</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const TitleOverview = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Title & Overview</h2>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">Title</label>
        <div className="relative">
          <textarea
            placeholder="Enter activity title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute bottom-2 right-4 text-xs text-gray-500">
            {title.length}/100
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">Overview</label>
        <div className="relative">
          <textarea
            placeholder="Enter activity overview..."
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
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

const ItineraryForm = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([
    { time: "", title: "", overview: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof ItineraryItem,
    value: string
  ) => {
    setItineraries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    setItineraries((prev) => [...prev, { time: "", title: "", overview: "" }]);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Itinerary</h2>

      {itineraries.map((item, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-4 mb-6 shadow-sm"
        >
          <label className="block font-semibold text-[#1e2a49] mb-4">
            {index + 1}
          </label>

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

const InclusionsExclusionsForm = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [inclusions, setInclusions] = useState<InclusionExclusionItem[]>([{ text: "" }]);
  const [exclusions, setExclusions] = useState<InclusionExclusionItem[]>([{ text: "" }]);

  const handleInclusionChange = (index: number, value: string) => {
    setInclusions(prev => prev.map((item, i) => i === index ? { text: value } : item));
  };

  const handleExclusionChange = (index: number, value: string) => {
    setExclusions(prev => prev.map((item, i) => i === index ? { text: value } : item));
  };

  const addInclusion = () => {
    setInclusions(prev => [...prev, { text: "" }]);
  };

  const addExclusion = () => {
    setExclusions(prev => [...prev, { text: "" }]);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Inclusions & Exclusions</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">Inclusions</h3>
        {inclusions.map((item, index) => (
          <div key={index} className="mb-4">
            <textarea
              placeholder="Enter inclusion..."
              value={item.text}
              onChange={(e) => handleInclusionChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">Exclusions</h3>
        {exclusions.map((item, index) => (
          <div key={index} className="mb-4">
            <textarea
              placeholder="Enter exclusion..."
              value={item.text}
              onChange={(e) => handleExclusionChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

const FaqForm = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([{ question: "", answer: "" }]);

  const handleChange = (
    index: number,
    field: keyof FaqItem,
    value: string
  ) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    );
  };

  const handleAddMore = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">FAQs</h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm"
        >
          <label className="block text-lg font-semibold text-[#1e2a49] mb-4">
            FAQ {index + 1}
          </label>

          <div className="relative mb-5">
            <textarea
              placeholder="Enter question..."
              value={faq.question}
              onChange={(e) =>
                handleChange(index, "question", e.target.value)
              }
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-4 bottom-2 text-xs text-gray-500">
              {faq.question.length}/50
            </span>
          </div>

          <div className="relative">
            <textarea
              placeholder="Enter answer..."
              value={faq.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              maxLength={200}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-4 bottom-2 text-xs text-gray-500">
              {faq.answer.length}/200
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

const PricingAddonsSection = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [selectedType, setSelectedType] = useState<"person" | "booking">("person");

  return (
    <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">Pricing & Add Ons</h2>

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
                defaultValue="450,000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
              />
              <span className="absolute right-4 top-2.5 text-sm text-gray-400">PKR</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Age range</label>
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
            <label className="block text-sm font-semibold mb-1">Age group</label>
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
              <span className="absolute right-4 top-2.5 text-sm text-gray-400">PKR</span>
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

const ImportantInformationForm = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [additionalDetails, setAdditionalDetails] = useState<ImportantInfoItem[]>([{ text: "" }]);
  const [notSuitableFor, setNotSuitableFor] = useState<ImportantInfoItem[]>([{ text: "" }]);
  const [whatToBring, setWhatToBring] = useState<ImportantInfoItem[]>([{ text: "" }]);

  const handleSectionChange = (
    section: "additionalDetails" | "notSuitableFor" | "whatToBring",
    index: number,
    value: string
  ) => {
    const setter = section === "additionalDetails" ? setAdditionalDetails :
                   section === "notSuitableFor" ? setNotSuitableFor : setWhatToBring;
    
    setter(prev => prev.map((item, i) => i === index ? { text: value } : item));
  };

  const addToSection = (section: "additionalDetails" | "notSuitableFor" | "whatToBring") => {
    const setter = section === "additionalDetails" ? setAdditionalDetails :
                   section === "notSuitableFor" ? setNotSuitableFor : setWhatToBring;
    
    setter(prev => [...prev, { text: "" }]);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Important Information</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">Additional details</h3>
        {additionalDetails.map((item, index) => (
          <div key={index} className="mb-4">
            <textarea
              placeholder="Enter additional detail..."
              value={item.text}
              onChange={(e) => handleSectionChange("additionalDetails", index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToSection("additionalDetails")}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-6"
        >
          <span className="text-xl leading-none">+</span> Add Detail
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">Not suitable for</h3>
        {notSuitableFor.map((item, index) => (
          <div key={index} className="mb-4">
            <textarea
              placeholder="Enter restriction..."
              value={item.text}
              onChange={(e) => handleSectionChange("notSuitableFor", index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToSection("notSuitableFor")}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-6"
        >
          <span className="text-xl leading-none">+</span> Add Restriction
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#1e2a49] mb-4">What to bring</h3>
        {whatToBring.map((item, index) => (
          <div key={index} className="mb-4">
            <textarea
              placeholder="Enter item to bring..."
              value={item.text}
              onChange={(e) => handleSectionChange("whatToBring", index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToSection("whatToBring")}
          className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-6"
        >
          <span className="text-xl leading-none">+</span> Add Item
        </button>
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

const ListingSubmitted = ({ onButtonClick }: { onButtonClick: () => void }) => {
  return (
    <ListingSubmissionMessage
      image="/images/verified_8948320.gif"
      title="Your Activity Has Been Submitted"
      description="Thank you for adding your activity to TravelNinja. Our team is currently reviewing your listing to ensure it meets our quality standards."
      sections={[
        {
          heading: "Approval Process",
          content: "This typically takes 6–12 hours.",
        },
        {
          heading: "Notifications",
          content:
            "We'll notify you via email and dashboard once your activity is approved and live.",
        },
        {
          heading: "Updates & Edits",
          content:
            "Need to make changes? You can edit your listing anytime from your dashboard.",
        },
      ]}
      buttonLabel="Go to Home"
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

export default function CompleteActivityForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  const StepComponent = stepComponents[stepIndex];

  const handleNext = () => {
    if (stepIndex < stepComponents.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setStepIndex(index);
  };

  return (
    <div className="flex">
      <ListingSidebar steps={steps} activeStep={stepIndex} onStepClick={handleStepClick} />
      <div className="flex-1 p-6">
        <StepComponent
          onNext={handleNext}
          onBack={handleBack}
          onButtonClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}
