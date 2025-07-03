import ListingButtons from "../ListingButtons";

const dropdownIcon = "/images/arrow-drop-down-svgrepo-com.svg";

interface PricingAvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

const PricingAvailability: React.FC<PricingAvailabilityProps> = ({
  onNext,
  onBack,
}) => {
  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-[28px] font-bold text-[#283456] mb-6">
        Pricing & Availability
      </h2>

      <form className="space-y-6">
        {/* Availability Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>
          <div className="relative border rounded-md w-[280px] px-4 py-2 cursor-pointer">
            <p className="text-gray-500 text-sm flex items-center justify-between">
              Select dates
              <img src={dropdownIcon} alt="dropdown" className="w-5" />
            </p>
          </div>
        </div>

        {/* Price Input */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Price <span className="text-gray-400">per day</span>
          </label>
          <textarea
            className="w-[280px] border rounded-md px-4 py-2 text-sm focus:outline-none"
            rows={1}
          ></textarea>
        </div>

        {/* Offer Addons Button */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 rounded-full px-4 py-2"
        >
          + Offer add ons
        </button>

        {/* Add-On Box */}
        <div className="flex flex-col justify-center border rounded-md overflow-hidden min-h-[320px] w-[650px]">
          <div className="flex p-5">
            {/* Left column */}
            <div className="w-[25%] px-8 bg-white border-r-2 border-dotted flex items-center justify-center">
              <p className="text-[#283456] font-semibold text-sm text-center leading-snug">
                Add On 1
              </p>
            </div>

            {/* Right column */}
            <div className="w-[75%] p-2 px-8">
              <div className="flex flex-col justify-between h-full gap-4">
                {/* Add-on Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add on
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </div>

                {/* Price */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="450,000"
                    className="w-full border rounded-md px-3 py-2 text-sm pr-10"
                  />
                  <span className="absolute top-[38px] right-3 text-sm text-gray-500">
                    PKR
                  </span>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <div className="flex gap-3">
                    <div className="px-5 flex-1 text-center py-2 rounded-full bg-[#008558] text-white text-sm cursor-pointer">
                      Per person
                    </div>
                    <div className="px-5 flex-1 text-center py-2 rounded-full border border-gray-300 text-sm cursor-pointer">
                      Per booking
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Addons */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 rounded-full px-4 py-2"
        >
          + More add ons
        </button>

        {/* Navigation Buttons */}
        <ListingButtons onBack={onBack} onNext={onNext} />
      </form>
    </div>
  );
};

export default PricingAvailability;
