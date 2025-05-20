import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import searchIcon from "../../public/images/search icon.svg";
import filterIcon from "../../public/images/filter icon.svg";
import sortIcon from "../../public/images/sort by icon.svg";
import addIcon from "../../public/images/Add icon.svg";
import downloadIcon from "../../public/images/download icon.svg";

const ListingComponent = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="main-content w-full px-4 sm:px-6 py-6">
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2a49]">My Listings</h1>
        </div>
      </div>

      <div className="listing-container">
        {/* Tabs & Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <button className="bg-emerald-700 text-white px-5 py-1.5 rounded-full text-sm font-semibold">Live</button>
            <button className="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-sm font-semibold">Deactivated</button>
            <button className="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-sm font-semibold">Under Review</button>
            <button className="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-sm font-semibold">Edit Under Review</button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="bg-emerald-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold">
              <img src={addIcon} alt="Add Tour" className="w-4" /> Add Tour
            </button>
            <button className="bg-emerald-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold">
              <img src={addIcon} alt="Add Trek" className="w-4" /> Add Trek
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold">
              <img src={downloadIcon} alt="Download" className="w-4" /> Download CSV
            </button>
          </div>
        </div>

        <div className="listing-card border border-gray-200 rounded-xl overflow-auto">
          {/* Header */}
          <div className="listing-title flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
            <h2 className="text-xl font-bold text-[#1e2a49]">Listings</h2>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Search */}
              <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
                <img src={searchIcon} alt="Search" className="w-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search by ID, title or type..."
                  className="w-full sm:w-64 text-sm outline-none bg-transparent"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm"
                >
                  <img src={filterIcon} alt="Filter" className="w-4" /> Filter by
                </button>
                {filterOpen && (
                  <div className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-md p-4 mt-2 w-64 text-sm">
                    <h2 className="font-semibold mb-2">Filter by</h2>
                    {["Tours", "Treks", "Group only", "Private only", "For international tourists", "For local tourists"].map((text) => (
                      <label className="block mb-1" key={text}>
                        <input type="checkbox" className="mr-2" /> {text}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm"
                >
                  <img src={sortIcon} alt="Sort" className="w-4" /> Sort by
                </button>
                {sortOpen && (
                  <div className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-md p-4 mt-2 w-64 text-sm">
                    <h2 className="font-semibold mb-2">Sort by</h2>
                    {["Price (Low to high)", "Price (High to low)", "Bookings (Low to high)", "Bookings (High to low)", "Newest First", "Oldest First"].map((text) => (
                      <label className="block mb-1" key={text}>
                        <input type="checkbox" className="mr-2" /> {text}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm min-w-[768px]">
              <thead className="bg-white border-b">
                <tr className="text-left">
                  {["ID", "Created on", "Listing", "Title", "Type", "Bookings", "Price", "Status"].map((header) => (
                    <th key={header} className="py-3 px-4 font-semibold border-r border-gray-200 last:border-r-0">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    id: "TO76534",
                    date: "22 July 2025",
                    time: "7:21 PM",
                    type: "Trek",
                    title: "14 Day K2 Base Camp Trekking Expe...",
                    group: "Private",
                    bookings: "12",
                    price: "419,000",
                    status: "Live",
                    statusColor: "#04a550",
                  },
                  {
                    id: "TO32534",
                    date: "22 July 2025",
                    time: "7:21 PM",
                    type: "Tour",
                    title: "9 Day Hunza Valley: A Cultural & S...",
                    group: "Group",
                    bookings: "35",
                    price: "55,000",
                    status: "Deactivated",
                    statusColor: "#6b7280",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-t hover:bg-[#f8fbff] cursor-pointer">
                    <td className="px-4 py-2 font-medium border-r border-gray-200">{item.id}</td>
                    <td className="px-4 py-2 border-r border-gray-200">
                      {item.date} <span className="text-gray-500">{item.time}</span>
                    </td>
                    <td className="px-4 py-2 border-r border-gray-200">{item.type}</td>
                    <td className="px-4 py-2 border-r border-gray-200">{item.title}</td>
                    <td className="px-4 py-2 border-r border-gray-200">{item.group}</td>
                    <td className="px-4 py-2 border-r border-gray-200">{item.bookings}</td>
                    <td className="px-4 py-2 border-r border-gray-200">{item.price}</td>
                    <td className="px-4 py-2 font-medium" style={{ color: item.statusColor }}>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 text-sm text-gray-600">
            <div>Showing 10 of 129</div>
            <div className="flex gap-2 items-center text-[#999]">
              <ChevronLeft strokeWidth={1} className="text-[#008558] w-6 h-6 cursor-pointer" />
              <div className="flex gap-6">
                <span className="cursor-pointer">1</span>
                <span className="font-bold text-[#008558] cursor-pointer">2</span>
                <span className="cursor-pointer">3</span>
              </div>
              <ChevronRight strokeWidth={1} className="text-[#008558] w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingComponent;
