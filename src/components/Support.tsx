import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import searchIcon from "../../public/images/search icon.svg";
import sortIcon from "../../public/images/sort by icon.svg";
import addIcon from "../../public/images/Add icon.svg";

const SupportPage = () => {
  const [sortOpen, setSortOpen] = useState(false);

  // Both toggles active by default
  const [filterOpenActive, setFilterOpenActive] = useState(true);
  const [filterClosedActive, setFilterClosedActive] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    {
      id: "F73DH",
      related: "Payouts",
      opened: "22 July 2025 7:21 PM",
      subject: "Missing payout for febraury booking...",
      closed: "22 July 2025 7:21 PM",
      status: "Open",
    },
    {
      id: "F73DH",
      related: "Payouts",
      opened: "22 July 2025 7:21 PM",
      subject: "Missing payout for febraury booking...",
      closed: "22 July 2025 7:21 PM",
      status: "Closed",
    },
  ];

  // Filtering logic
  const filteredData = data
    .filter((item) => {
      if (filterOpenActive && filterClosedActive) return true; // both on = show all
      if (filterOpenActive && !filterClosedActive) return item.status === "Open";
      if (!filterOpenActive && filterClosedActive) return item.status === "Closed";
      return false; // none active = show none
    })
    .filter(
      (item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.related.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Tailwind fixed width/height: w-[100px] h-[38px]
  // You can adjust 100px/38px values as needed

  return (
    <div className="main-content w-full px-4 sm:px-6 py-6">
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2a49]">Support</h1>
        </div>
      </div>

      {/* Tabs and Open Ticket Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterOpenActive(!filterOpenActive)}
            className={`rounded-full text-sm font-semibold flex items-center justify-center w-[100px] h-[38px] ${
              filterOpenActive
                ? "bg-emerald-700 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            open
          </button>
          <button
            onClick={() => setFilterClosedActive(!filterClosedActive)}
            className={`rounded-full text-sm font-semibold flex items-center justify-center w-[100px] h-[38px] ${
              filterClosedActive
                ? "bg-emerald-700 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            closed
          </button>
        </div>

        <button
          className="bg-emerald-700 text-white rounded-full flex items-center justify-center gap-2 text-sm font-semibold w-[120px] h-[38px]"
        >
          <img src={addIcon} alt="Open Ticket" className="w-4" />
          open ticket
        </button>
      </div>

      {/* Support Table Card */}
      <div className="border border-gray-200 rounded-xl overflow-auto">
        <div className="flex justify-between items-center p-4 flex-col sm:flex-row gap-4">
          <h2 className="text-xl font-bold text-[#1e2a49]">Support</h2>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
              <img src={searchIcon} alt="Search" className="w-4 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 text-sm outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm"
              >
                <img src={sortIcon} alt="Sort" className="w-4" /> sort by
              </button>
              {sortOpen && (
                <div className="absolute right-0 z-10 bg-white border border-gray-200 shadow-md rounded-md p-4 mt-2 w-48 text-sm">
                  <h2 className="font-semibold mb-2">Sort by</h2>
                  <label className="block mb-1">
                    <input type="checkbox" className="mr-2" /> Newest First
                  </label>
                  <label className="block mb-1">
                    <input type="checkbox" className="mr-2" /> Oldest First
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm min-w-[768px] border">
            <thead>
              <tr
                className="text-left bg-white border-b hover:bg-[#f8fbff] cursor-pointer transition-colors duration-200"
              >
                {[
                  "ID",
                  "Related to",
                  "Opened",
                  "Subject",
                  "Closed",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-4 px-6 font-semibold border-r border-gray-200 last:border-r-0 select-none"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-[#f8fbff] cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-3 border-r">{item.id}</td>
                    <td className="px-6 py-3 border-r">{item.related}</td>
                    <td className="px-6 py-3 border-r">{item.opened}</td>
                    <td className="px-6 py-3 border-r">{item.subject}</td>
                    <td className="px-6 py-3 border-r">{item.closed}</td>
                    <td className="px-6 py-3 font-medium text-[#04a550]">
                      {item.status === "Closed" ? (
                        <span className="text-gray-500">Closed</span>
                      ) : (
                        "Open"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 font-medium">
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 text-sm text-gray-600">
          <div>Showing {filteredData.length} of {data.length}</div>
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
  );
};

export default SupportPage;
