import { useState } from "react";
import ListingButtons from "../ListingButtons";

interface ItineraryItem {
  time: string;
  title: string;
  overview: string;
}

interface ItineraryFormProps {
  onBack: () => void;
  onNext: () => void;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({ onBack, onNext }) => {
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
        <div key={index} className="bg-white border rounded-xl p-4 mb-6 shadow-sm">
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

export default ItineraryForm;
