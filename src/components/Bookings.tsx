// src/components/bookings/Bookings.tsx
"use client";

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const searchIcon = "../../public/images/search-icon.svg";
const filterIcon = "../../public/images/filter-icon.svg";
const sortIcon = "../../public/images/sort-by-icon.svg";
const downloadIcon = "../../public/images/download-icon.svg";

type Booking = {
  booking_id: string;
  customer_name: string;
  selected_date: string;
  selected_people: number;
  total_price: number;
  booking_status: "confirmed" | "cancelled" | "completed";
  created_at: string;
  updated_at: string | null;
  selected_add_ons: string[];
  tour_name: string;
  received: string;
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const toggleFilter = (label: string) => {
    setFilters((prev) => ({ ...prev, [label]: !prev[label] }));
  };
  const [bookings, setBookings] = useState<Booking[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("❌ No token found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:9000/api/v1/bookings/customer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("❌ Not a JSON response:", text);
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("✅ Bookings fetched:", data);
        setBookings(data); // ✅ SET BOOKINGS
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      } finally {
        setLoading(false); // ✅ END LOADING
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const filterEl = document.getElementById("filter-dropdown");
      const sortEl = document.getElementById("sort-dropdown");

      if (filterEl && !filterEl.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      if (sortEl && !sortEl.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = bookings
    .filter((b) => {
      const typeFilterActive = filters["Tours"] || filters["Treks"];
      const groupFilterActive =
        filters["Group only"] || filters["Private only"];
      const audienceFilterActive =
        filters["For international tourists"] || filters["For local tourists"];

      const matchesType =
        !typeFilterActive ||
        (filters["Tours"] && b.tour_name.toLowerCase().includes("tour")) ||
        (filters["Treks"] && b.tour_name.toLowerCase().includes("trek"));

      const matchesGroup =
        !groupFilterActive ||
        (filters["Group only"] && b.selected_people > 1) ||
        (filters["Private only"] && b.selected_people === 1);

      const matchesAudience =
        !audienceFilterActive ||
        (filters["For international tourists"] &&
          b.customer_name.toLowerCase().includes("intl")) ||
        (filters["For local tourists"] &&
          !b.customer_name.toLowerCase().includes("intl"));

      return matchesType && matchesGroup && matchesAudience;
    })

    .sort((a, b) => {
      switch (sortOption) {
        case "Amount (Low to high)":
          return a.total_price - b.total_price;
        case "Amount (High to low)":
          return b.total_price - a.total_price;
        case "Newest First":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "Oldest First":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        default:
          return 0;
      }
    });

  const handleCSVDownload = () => {
    const csv = filtered
      .map((b) =>
        [
          b.booking_id,
          b.created_at,
          b.customer_name,
          b.selected_date,
          b.selected_people,
          b.total_price,
          b.booking_status,
        ].join(",")
      )
      .join("\n");
    saveAs(new Blob([csv], { type: "text/csv" }), "bookings.csv");
  };

  return (
    <div className="main-content w-full  sm:px-6 py-6 pb-[150px]">
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            My Bookings
          </h1>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full xl:w-auto">
          {["Upcoming", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "bg-emerald-700 text-white"
                  : "border border-gray-300 text-gray-700"
              } px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={handleCSVDownload}
          className="border border-gray-300 text-[#707D99] px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold"
        >
          <img src={downloadIcon} alt="Download" className="w-4" />
          <span className="hidden sm:inline">Download CSV</span>
          <span className="sm:hidden">CSV</span>
        </button>
      </div>

      <div className="booking-title border rounded-t-xl border-b-0 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-4">
        <h2 className="text-xl font-bold text-[#1e2a49]">Bookings</h2>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto">
          <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
            <img src={searchIcon} alt="Search" className="w-4 mr-2" />
            <input
              type="text"
              placeholder="Search by ID or customer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 lg:w-64 text-sm outline-none bg-transparent"
            />
          </div>

          <div className="flex gap">
            <div className="flex gap-3 relative z-20">
              <div id="filter-dropdown" className="relative">
                <button
                  onClick={() => {
                    setFilterOpen(!filterOpen);
                    setSortOpen(false);
                  }}
                  className="flex items-center mr-2 justify-center gap-2 border border-gray-300 px-6 sm:px-3 py-2 rounded-full text-sm"
                >
                  <img src={filterIcon} alt="Filter" className="w-4" />
                  <span className="hidden sm:inline">Filter by</span>
                  <span className="sm:hidden">Filter</span>
                </button>
                {filterOpen && (
                  <div className="absolute lg:right-0 z-30 bg-white border border-gray-200 shadow-lg rounded-lg p-4 mt-2 w-64 text-sm">
                    <h2 className="font-semibold mb-2">Filter by</h2>
                    {[
                      "Tours",
                      "Treks",
                      "Group only",
                      "Private only",
                      "For international tourists",
                      "For local tourists",
                    ].map((text) => (
                      <label className="block mb-1" key={text}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filters[text] || false}
                          onChange={() => toggleFilter(text)}
                        />
                        {text}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div id="sort-dropdown" className="relative">
              <button
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setFilterOpen(false);
                }}
                className="flex items-center justify-center gap-2 border border-gray-300 px-6 sm:px-4 py-2 rounded-full text-sm"
              >
                <img src={sortIcon} alt="Sort" className="w-4" />
                <span className="hidden sm:inline">Sort by</span>
                <span className="sm:hidden">Sort</span>
              </button>
              {sortOpen && (
                <div className="absolute right-[-80px] lg:right-0 z-30 bg-white border border-gray-200 shadow-lg rounded-lg p-4 mt-2 w-64 text-sm">
                  <h2 className="font-semibold mb-2">Sort by</h2>
                  <label className="block mb-1 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="mr-2"
                      checked={sortOption === "Amount (Low to high)"}
                      onChange={() => setSortOption("Amount (Low to high)")}
                    />
                    Amount (Low to high)
                  </label>
                  <label className="block mb-1 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="mr-2"
                      checked={sortOption === "Amount (High to low)"}
                      onChange={() => setSortOption("Amount (High to low)")}
                    />
                    Amount (High to low)
                  </label>
                  <label className="block mb-1 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="mr-2"
                      checked={sortOption === "Newest First"}
                      onChange={() => setSortOption("Newest First")}
                    />
                    Newest First
                  </label>
                  <label className="block mb-1 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="mr-2"
                      checked={sortOption === "Oldest First"}
                      onChange={() => setSortOption("Oldest First")}
                    />
                    Oldest First
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border text-sm">
          <thead className="bg-white border-b">
            <tr className="text-left">
              {[
                "ID",
                "Received on",
                "Customer",
                "Booked",
                "Date",
                "People",
                "Amount",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="py-4 px-6 font-semibold border-r text-[#707D99] border-gray-200 last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-6 text-gray-400 font-medium"
                >
                  Loading bookings...
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-[#f8fbff] cursor-pointer text-[#283456]"
                  onClick={() =>
                    navigate(`/bookings/details/${item.booking_id}`)
                  }
                >
                  <td className="px-6 py-4 border-r border-gray-200">
                    {item.booking_id}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-200">
                    {item.received}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-200">
                    {item.customer_name}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-200">
                    {item.tour_name}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-200">
                    {item.selected_date}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-200">
                    {item.selected_people}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-200">
                    {item.total_price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${
                        item.booking_status === "confirmed"
                          ? "text-green-700"
                          : item.booking_status === "cancelled"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {item.booking_status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
