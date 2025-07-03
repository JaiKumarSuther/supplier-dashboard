import { useState } from "react";
import ListingButtons from "../ListingButtons";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqFormProps {
  onBack: () => void;
  onNext: () => void;
}

const FaqForm: React.FC<FaqFormProps> = ({ onBack, onNext }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([{ question: "", answer: "" }]);

  const handleChange = (index: number, field: keyof FaqItem, value: string) => {
    setFaqs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">FAQs</h2>

      {faqs.map((item, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-4 mb-6 shadow-sm"
        >
          <label className="block font-semibold text-[#1e2a49] mb-4">
            FAQ {index + 1}
          </label>

          <div className="relative mb-4">
            <textarea
              placeholder="Question"
              value={item.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {item.question.length}/50
            </span>
          </div>

          <div className="relative">
            <textarea
              placeholder="Answer"
              value={item.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              maxLength={200}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-500">
              {item.answer.length}/200
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

export default FaqForm;
