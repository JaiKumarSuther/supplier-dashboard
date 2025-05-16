interface ListingButtonsProps {
  onBack: () => void;
  onNext: () => void;
}

const ListingButtons: React.FC<ListingButtonsProps> = ({ onBack, onNext }) => {
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
        Next
      </button>
    </div>
  );
};

export default ListingButtons;
