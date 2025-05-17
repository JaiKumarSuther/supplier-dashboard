import { useState, useEffect, useRef } from "react";
import StarIcon from "../../public/images/star icon.svg";
import BorderStar from "../../public/images/boder star.svg";
import SearchIcon from "../../public/images/search icon.svg";
import FilterIcon from "../../public/images/filter icon.svg";
import SortIcon from "../../public/images/sort by icon.svg";

export default function MyReviews() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubmitted, setReplySubmitted] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
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

  const handleReplySubmit = () => {
    if (replyText.trim() === "") {
      alert("Please enter a reply before submitting.");
      return;
    }
    setReplySubmitted(true);
  };

  return (
    <main className="w-full bg-white p-5 relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1c1c38]">My Reviews</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-4">
          <h2 className="text-4xl font-bold text-green-700">4.0</h2>
          <div className="flex items-center justify-center mt-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={StarIcon} alt="star" className="w-4 h-4" />
            ))}
            <img src={BorderStar} alt="empty star" className="w-4 h-4" />
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
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-700 h-2 rounded-full"
                  style={{ width: `${bar.percent}%` }}
                ></div>
              </div>
              <span className="w-6 text-right">{bar.rating}.0</span>
              <small className="text-gray-600 w-20">{bar.count} Reviews</small>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mt-8 mb-6">
        <div className="flex gap-3">
          <button className="bg-green-700 text-white font-semibold px-4 py-1.5 rounded-full">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <img key={j} src={StarIcon} alt="star" className="w-4 h-4" />
                ))}
              </div>
              <span className="text-sm text-gray-600">01 Aug 2025 7:21 PM</span>
            </div>
            <p className="mt-2 text-sm text-gray-800">
              Book with them, they’re probably the best in Pakistan.
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-sm">Joe</h4>
              <p className="text-sm text-gray-500">
                Booking ID: <span className="text-blue-700">F73DH</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div
          ref={popupRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-3"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            {!showReport ? (
              <div id="reviewContent">
                {!replySubmitted ? (
                  <>
                    <textarea
                      id="replyText"
                      className="w-full p-2 border rounded mb-3"
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end gap-2 popup-reviewBtn">
                      <button
                        onClick={() => setShowReport(true)}
                        className="bg-red-500 text-white px-4 py-1 rounded"
                      >
                        Report
                      </button>
                      <button
                        onClick={handleReplySubmit}
                        className="bg-green-700 text-white px-4 py-1 rounded"
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="reply-box">
                    <span className="replied text-sm text-green-600">
                      replied
                    </span>
                    <p>
                      Thank you so much, glad you had such a good experience
                      with us.
                    </p>
                    <button className="report text-xs mt-2">reported</button>
                  </div>
                )}
              </div>
            ) : (
              <div id="reportPopup">
                <p className="mb-4">
                  Are you sure you want to report this review?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowReport(false)}
                    className="bg-gray-300 px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button className="bg-red-600 text-white px-4 py-1 rounded">
                    Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
