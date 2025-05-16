import { useState } from "react";
import ListingButtons from "../ListingButtons";

const TitleOverview = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">Title & Overview</h2>

      {/* Title Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#1e2a49] mb-2">
          Title
        </label>
        <div className="relative">
          <textarea
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            rows={1}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm resize-y"
          ></textarea>
          <span className="absolute bottom-2 right-3 text-xs text-gray-500">
            {title.length}/50
          </span>
        </div>
      </div>

      {/* Overview Field */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#1e2a49] mb-2">
          Overview
        </label>
        <div className="relative">
          <textarea
            placeholder="Enter overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            maxLength={600}
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm resize-y"
          ></textarea>
          <span className="absolute bottom-2 right-3 text-xs text-gray-500">
            {overview.length}/600
          </span>
        </div>
      </div>

      <ListingButtons
        onBack={() => (window.location.href = "/listingtrek/listingtrek.html")}
        onNext={() => (window.location.href = "itinerary.html")}
      />
    </form>
  );
};

export default TitleOverview;
