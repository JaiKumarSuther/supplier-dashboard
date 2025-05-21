import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import downloadIcon from "../../public/images/download icon.svg";
import searchIcon from "../../public/images/search icon.svg";
import filterIcon from "../../public/images/filter icon.svg";
import sortIcon from "../../public/images/sort by icon.svg";

type BookingStatus = "Confirmed" | "Cancelled" | "Completed";

type Booking = {
  id: string;
  receivedOn: string;
  receivedTime: string;
  customer: string;
  booked: string;
  date: string;
  people: number;
  amount: string;
  status: BookingStatus;
};

const bookings: Booking[] = [
  {
    id: "F98732923",
    receivedOn: "22/07/2025",
    receivedTime: "7:21",
    customer: "Muhammad Lee",
    booked: "14 Day K2 Base",
    date: "17 July 2025",
    people: 3,
    amount: "154,000",
    status: "Confirmed",
  },
  {
    id: "F98424238",
    receivedOn: "24/07/20225",
    receivedTime: "18:32",
    customer: "Wamiq Ahmed",
    booked: "Seven Days Exp",
    date: "2 Aug 2025",
    people: 4,
    amount: "239,000",
    status: "Cancelled",
  },
  {
    id: "F24782842",
    receivedOn: "02/08/20225",
    receivedTime: "14:15",
    customer: "Person",
    booked: "Explore the Hidd",
    date: "11 Aug 2025",
    people: 2,
    amount: "87,000",
    status: "Completed",
  },
];

const statusColors: Record<BookingStatus, string> = {
  Confirmed: "text-green-600 font-semibold",
  Cancelled: "text-gray-700",
  Completed: "text-gray-700",
};

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="main-content w-full px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2a49]">My Bookings</h1>
        </div>
      </div>

      {/* Tabs + Download CSV */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          {["upcoming", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "upcoming" | "completed" | "cancelled")}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize ${
                activeTab === tab
                  ? tab === "upcoming"
                    ? "bg-emerald-700 text-white border border-emerald-700"
                    : "border border-gray-500 text-gray-700 bg-white hover:bg-gray-50"
                  : "border border-gray-500 text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="bg-white text-gray-700 border border-gray-500 px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-gray-50 transition">
          <img
            src={downloadIcon}
            alt="Download CSV"
            className="w-4"
            style={{ filter: "grayscale(100%) brightness(40%)" }}
          />
          Download CSV
        </button>
      </div>

      {/* Bookings Card */}
      <div className="border border-gray-200 rounded-xl overflow-auto">
        {/* Title + Search + Filter + Sort */}
        <div className="flex justify-between items-center p-4 flex-col sm:flex-row gap-4">
          <h2 className="text-xl font-bold text-[#1e2a49]">Bookings</h2>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
              <img src={searchIcon} alt="Search" className="w-4 mr-2" />
              <input
                type="text"
                placeholder="Search by ID, customer or booked..."
                className="w-full sm:w-64 text-sm outline-none bg-transparent text-black"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setFilterOpen(!filterOpen);
                  setSortOpen(false);
                }}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm text-black"
              >
                <img src={filterIcon} alt="Filter" className="w-4" /> Filter
              </button>
              {filterOpen && (
                <div className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-md p-4 mt-2 w-64 text-sm text-black">
                  <h2 className="font-semibold mb-2">Filter by</h2>
                  {[
                    "Tours",
                    "Treks",
                    "Group only",
                    "Private only",
                    "For international tourists",
                    "For local tourists",
                  ].map((filter) => (
                    <label key={filter} className="block mb-1 cursor-pointer">
                      <input type="checkbox" className="mr-2" /> {filter}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setFilterOpen(false);
                }}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm text-black"
              >
                <img src={sortIcon} alt="Sort" className="w-4" /> Sort
              </button>
              {sortOpen && (
                <div className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-md p-4 mt-2 w-64 text-sm text-black">
                  <h2 className="font-semibold mb-2">Sort by</h2>
                  <label className="block mb-1 cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Amount <span className="text-gray-400">(Low to high)</span>
                  </label>
                  <label className="block mb-1 cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Amount <span className="text-gray-400">(High to low)</span>
                  </label>
                  <label className="block mb-1 cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Newest First
                  </label>
                  <label className="block cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Oldest First
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm min-w-[768px] border border-gray-200 border-collapse">
            <thead className="bg-white border-b border-gray-200 hover:bg-[#f8fbff]">
              <tr className="text-left text-gray-600 cursor-pointer hover:bg-[#f8fbff]">
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
                    className="py-4 px-6 font-normal text-base border-r border-gray-200 last:border-r-0 hover:bg-[#f8fbff]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 hover:bg-[#f8fbff] cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium border-r text-black">{b.id}</td>
                  <td className="px-6 py-4 border-r text-black">
                    {b.receivedOn}
                    <span className="text-gray-400 ml-1">{b.receivedTime}</span>
                  </td>
                  <td className="px-6 py-4 border-r text-black">{b.customer}</td>
                  <td className="px-6 py-4 border-r text-black">{b.booked}</td>
                  <td className="px-6 py-4 border-r text-black">{b.date}</td>
                  <td className="px-6 py-4 border-r text-black">{b.people}</td>
                  <td className="px-6 py-4 border-r text-black">{b.amount}</td>
                  <td className="px-6 py-4 border-r">
                    <span className={statusColors[b.status]}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 text-sm text-gray-600">
          <div>Showing 10 of 129</div>
          <div className="flex gap-2 items-center text-[#999]">
            <ChevronLeft
              strokeWidth={1}
              className="text-[#008558] w-6 h-6 cursor-pointer"
            />
            <div className="flex gap-6">
              <span className="cursor-pointer">1</span>
              <span className="font-bold text-[#008558] cursor-pointer">2</span>
              <span className="cursor-pointer">3</span>
            </div>
            <ChevronRight
              strokeWidth={1}
              className="text-[#008558] w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
