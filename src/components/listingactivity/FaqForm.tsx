import { useState } from "react";
import ListingButtons from "../ListingButtons";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqFormProps {
  onNext: () => void;
  onBack: () => void;
}

const FaqForm: React.FC<FaqFormProps> = ({ onNext, onBack }) => {
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
            ></textarea>
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
            ></textarea>
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

export default FaqForm;
