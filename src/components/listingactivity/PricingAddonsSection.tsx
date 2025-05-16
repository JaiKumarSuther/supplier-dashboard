import React from "react";

const PricingAddonsSection = () => {
  return (
    <div className="flex-grow max-w-[600px] rounded-lg p-3 bg-white">
      <h2 className="text-xl font-semibold mb-6">Pricing & Add Ons</h2>

      <form className="flex flex-col gap-6">
        {/* Base Price Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <p className="font-semibold mb-4">Base Price</p>
          <div className="flex flex-col gap-5">
            {/* Price */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Price</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="450,000"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-14"
                />
                <span className="absolute right-4 top-2.5 text-gray-500">PKR</span>
              </div>
            </div>

            {/* Age Range */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Age range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={2}
                  className="w-16 border border-gray-300 rounded-md px-2 py-1"
                />
                <span>to</span>
                <input
                  type="number"
                  defaultValue={12}
                  className="w-16 border border-gray-300 rounded-md px-2 py-1"
                />
                <span className="text-gray-500">years old</span>
              </div>
            </div>

            {/* Age Group */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Age group</label>
              <input
                type="text"
                placeholder="i.e adults"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Secondary Button */}
        <button
          type="button"
          className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          ➕ Secondary price groups
        </button>

        {/* Add On Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <p className="font-semibold mb-4">Add On 1</p>
          <div className="flex flex-col gap-5">
            {/* Add-on Name */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Add on</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Add-on Price */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Price</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="450,000"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-14"
                />
                <span className="absolute right-4 top-2.5 text-gray-500">PKR</span>
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Type</label>
              <div className="flex gap-3">
                <div className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition">
                  Per person
                </div>
                <div className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition">
                  Per booking
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Add-ons Button */}
        <button
          type="button"
          className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          ➕ More add ons
        </button>

        {/* Footer Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => (window.location.href = "faq.html")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "information.html")}
            className="px-5 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PricingAddonsSection;
