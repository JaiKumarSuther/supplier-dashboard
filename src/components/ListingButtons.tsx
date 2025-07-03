interface ListingButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string; // <-- Accept nextLabel prop
}

const ListingButtons: React.FC<ListingButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = "Next", // Default to "Next" if not provided
}) => {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-1 border border-gray-300 rounded-full text-sm text-[#707D99] hover:bg-gray-100 transition"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="px-6 py-1 bg-emerald-700 text-white rounded-full text-sm hover:bg-emerald-800 transition"
      >
        {nextLabel} {/* <-- Render the dynamic label */}
      </button>
    </div>
  );
};

export default ListingButtons;
