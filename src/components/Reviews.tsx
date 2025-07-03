"use client";

import { useState, useEffect, useRef } from "react";

const StarIcon = "/images/star-icon.svg";
const BorderStar = "/images/boder-star.svg";
const SearchIcon = "/images/search-icon.svg";
const FilterIcon = "/images/filter-icon.svg";
const SortIcon = "/images/sort-by-icon.svg";

// const dummyReviews = [
//   {
//     id: 1,
//     rating: 5,
//     created_at: "01 Aug 2025 7:21 PM",
//     review_text: "Book with them, they're probably the best in Pakistan.",
//     customer_name: "Joe",
//     booking_id: "F73DH",
//   },
//   {
//     id: 2,
//     rating: 4,
//     created_at: "03 Aug 2025 6:10 PM",
//     review_text: "Great service, loved the experience!",
//     customer_name: "Sara",
//     booking_id: "B91XZ",
//   },
// ];

export default function MyReviews() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const greenColor = "#008558";

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

useEffect(() => {
  const fetchSupplierReviews = async () => {
    const token = localStorage.getItem("token");
    const supplierId = localStorage.getItem("supplier_id"); // Or get it from user context

    if (!token || !supplierId) {
      console.error("Missing token or supplier ID");
      return;
    }

    try {
      const res = await fetch(`http://localhost:9000/api/v1/reviews/supplier/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Unexpected response:", text);
        return;
      }

      const data = await res.json();
      console.log("✅ Reviews fetched:", data);

      const transformed = data.map((review: any) => ({
        id: review.review_id,
        rating: review.rating,
        created_at: new Date(review.created_at).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        review_text: review.review_text,
        customer_name: review.customer?.fullName || "Customer",
        booking_id: review.booking_id,
      }));

      setReviews(transformed);
    } catch (err) {
      console.error("❌ Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchSupplierReviews();
}, []);

  return (
    <main className="w-full bg-white md:p-6 relative min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">My Reviews</h1>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 bg-white py-8 px-4 rounded-lg border border-gray-200 mb-10">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-4">
          <h2 className="text-6xl font-bold" style={{ color: greenColor }}>4.0</h2>
          <div className="flex items-center gap-1 justify-center mt-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={StarIcon} alt="star" className="w-5 h-5" />
            ))}
            <img src={BorderStar} alt="empty star" className="w-5 h-5" />
          </div>
          <small className="text-sm text-gray-600 mt-1">21 Reviews</small>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3 text-sm">
              <div className="flex-1 bg-gray-100 rounded-full h-[11px]">
                <div
                  className="h-[11px] rounded-full"
                  style={{ width: `${rating * 15}%`, backgroundColor: greenColor }}
                ></div>
              </div>
              <span className="w-6 text-right">{rating}.0</span>
              <small className="text-gray-600 w-20">{rating + 1} Reviews</small>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <div className="flex gap-3">
          <button className="text-white font-semibold px-4 py-1.5 rounded-full" style={{ backgroundColor: greenColor }}>
            All
          </button>
          <button className="bg-white text-gray-600 border px-4 py-1.5 rounded-full">unanswered</button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto relative">
          <div className="relative w-full sm:w-64">
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border rounded-full" />
            <img src={SearchIcon} className="absolute left-3 top-2.5 w-4 h-4" alt="search" />
          </div>
          <div className="relative" ref={filterRef}>
            <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center border px-3 py-2 rounded-full w-full sm:w-auto">
              <img src={FilterIcon} alt="filter" className="w-4 h-4 mr-1" />
              filter by
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-60 z-20">
                <div className="border">
                  <div className="border-b p-3"><h2 className="text-sm font-semibold">Filter by</h2></div>
                  <div className="p-2">
                    <label className="flex items-center mb-2"><input type="checkbox" className="mr-2" /> Tours</label>
                    <label className="flex items-center"><input type="checkbox" className="mr-2" /> Treks</label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={sortRef}>
            <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center border px-3 py-2 rounded-full w-full sm:w-auto">
              <img src={SortIcon} alt="sort" className="w-4 h-4 mr-1" />
              sort by
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-60 z-20">
                <div className="border">
                  <div className="border-b p-3"><h2 className="text-sm font-semibold">Sort by</h2></div>
                  <div className="p-2">
                    <label className="flex items-center mb-2"><input type="checkbox" className="mr-2" /> Newest First</label>
                    <label className="flex items-center"><input type="checkbox" className="mr-2" /> Oldest First</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 min-h-44 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, j) => (
                    <img key={j} src={StarIcon} alt="star" className="w-4 h-4" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {review.created_at}
                </span>
              </div>
              <div className="mb-5 flex-grow">
                <p className="text-base text-gray-900 leading-relaxed">
                  {review.review_text}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1">{review.customer_name}</h4>
                <p className="text-sm text-[#283456]">
                  Booking ID: <span className="text-[#707d99] cursor-pointer hover:underline">{review.booking_id}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
