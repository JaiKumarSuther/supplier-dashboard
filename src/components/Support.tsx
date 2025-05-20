import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import searchIcon from "../../public/images/search icon.svg";
import sortIcon from "../../public/images/sort by icon.svg";
import addIcon from "../../public/images/Add icon.svg";

const SupportPage = () => {
  const [sortOpen, setSortOpen] = useState(false);

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
          <button className="bg-emerald-700 text-white px-5 py-1.5 rounded-full text-sm font-semibold">open</button>
          <button className="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-sm font-semibold">closed</button>
        </div>
        <button className="bg-emerald-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold">
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
                <div className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-md p-4 mt-2 w-64 text-sm">
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
            <thead className="bg-white border-b">
              <tr className="text-left">
                {["ID", "Related to", "Opened", "Subject", "closed", "Status"].map((header) => (
                  <th key={header} className="py-3 px-4 font-semibold border-r border-gray-200 last:border-r-0">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { id: "F73DH", related: "Payouts", opened: "22 July 2025 7:21 PM", subject: "Missing payout for febraury bookin...", closed: "22 July 2025 7:21 PM", status: "Open" },
                { id: "F73DH", related: "Payouts", opened: "22 July 2025 7:21 PM", subject: "Missing payout for febraury bookin...", closed: "22 July 2025 7:21 PM", status: "Closed" },
              ].map((item, i) => (
                <tr key={i} className="border-t hover:bg-[#f8fbff] cursor-pointer">
                  <td className="px-4 py-2 font-medium text-green-600 border-r">{item.id}</td>
                  <td className="px-4 py-2 border-r">{item.related}</td>
                  <td className="px-4 py-2 border-r">{item.opened}</td>
                  <td className="px-4 py-2 border-r">{item.subject}</td>
                  <td className="px-4 py-2 border-r">{item.closed}</td>
                  <td className="px-4 py-2 font-medium text-[#04a550]">
                    {item.status === "Closed" ? (
                      <span className="text-gray-500">Closed</span>
                    ) : (
                      "Open"
                    )}
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
