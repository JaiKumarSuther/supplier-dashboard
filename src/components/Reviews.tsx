import { useState, useEffect, useRef } from "react";
import StarIcon from "../../public/images/star icon.svg";
import BorderStar from "../../public/images/boder star.svg";
import SearchIcon from "../../public/images/search icon.svg";
import FilterIcon from "../../public/images/filter icon.svg";
import SortIcon from "../../public/images/sort by icon.svg";

export default function MyReviews() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const greenColor = "#008558";

  return (
    <main className="w-full bg-white p-6 relative min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c38]">My Reviews</h1>
      </div>

      {/* Ratings Summary */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 bg-white py-8 px-4 rounded-lg border border-gray-200 mb-10">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-4">
          <h2 className="text-6xl font-bold" style={{ color: greenColor }}>
            4.0
          </h2>
          <div className="flex items-center gap-1 justify-center mt-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={StarIcon} alt="star" className="w-5 h-5" />
            ))}
            <img src={BorderStar} alt="empty star" className="w-5 h-5" />
          </div>
          <small className="text-sm text-gray-600 mt-1">21 Reviews</small>
        </div>
        <div className="flex-1 space-y-2">
          {[
            { rating: 5, count: 16, percent: 80 },
            { rating: 4, count: 5, percent: 30 },
            { rating: 3, count: 0, percent: 0 },
            { rating: 2, count: 0, percent: 0 },
            { rating: 1, count: 0, percent: 0 },
          ].map((bar) => (
            <div key={bar.rating} className="flex items-center gap-3 text-sm">
              <div className="flex-1 bg-gray-100 rounded-full h-[11px]">
                <div
                  className="h-[11px] rounded-full"
                  style={{ width: `${bar.percent}%`, backgroundColor: greenColor }}
                ></div>
              </div>
              <span className="w-6 text-right">{bar.rating}.0</span>
              <small className="text-gray-600 w-20">{bar.count} Reviews</small>
            </div>
          ))}
        </div>
      </div>

      {/* Filters/Search Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <div className="flex gap-3">
          <button
            className="text-white font-semibold px-4 py-1.5 rounded-full"
            style={{ backgroundColor: greenColor }}
          >
            All
          </button>
          <button className="bg-white text-gray-600 border px-4 py-1.5 rounded-full">
            unanswered
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto relative">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-full"
            />
            <img
              src={SearchIcon}
              className="absolute left-3 top-2.5 w-4 h-4"
              alt="search"
            />
          </div>
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center border px-3 py-2 rounded-full w-full sm:w-auto"
            >
              <img src={FilterIcon} alt="filter" className="w-4 h-4 mr-1" />
              filter by
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-60 z-20">
                <div className="border">
                  <div className="border-b p-3">
                    <h2 className="text-sm font-semibold">Filter by</h2>
                  </div>
                  <div className="p-2">
                    <label className="flex items-center mb-2">
                      <input type="checkbox" className="mr-2" /> Tours
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Treks
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center border px-3 py-2 rounded-full w-full sm:w-auto"
            >
              <img src={SortIcon} alt="sort" className="w-4 h-4 mr-1" />
              sort by
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-60 z-20">
                <div className="border">
                  <div className="border-b p-3">
                    <h2 className="text-sm font-semibold">Sort by</h2>
                  </div>
                  <div className="p-2">
                    <label className="flex items-center mb-2">
                      <input type="checkbox" className="mr-2" /> Newest First
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Oldest First
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 min-h-44 flex flex-col justify-between"
            // Removed onClick handler to avoid popup triggers
          >
            {/* Top row: stars and date */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <img key={j} src={StarIcon} alt="star" className="w-4 h-4" />
                ))}
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                01 Aug 2025 7:21 PM
              </span>
            </div>

            {/* Review text */}
            <div className="mb-5 flex-grow">
              <p className="text-base text-gray-900 leading-relaxed">
                Book with them, they're probably the best in Pakistan.
              </p>
            </div>

            {/* Reviewer info */}
            <div>
              <h4 className="font-semibold text-base mb-1">Joe</h4>
              <p className="text-sm text-[#283456]">
                Booking ID:{" "}
                <span className="text-[#707d99] cursor-pointer hover:underline">
                  F73DH
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
