import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import searchIcon from "../../public/images/search icon.svg";
import sortIcon from "../../public/images/sort by icon.svg";
import downloadIcon from "../../public/images/download icon.svg";

const PayoutPage = () => {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <main className="main-container w-full px-4 sm:px-6 py-6">
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2a49]">My Payouts</h1>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <button className="bg-emerald-700 text-white px-6 py-1.5 rounded-full font-semibold text-sm">All</button>
        <button className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold">
          <img src={downloadIcon} alt="Download" className="w-4" />
          Download CSV
        </button>
      </div>

      {/* Card */}
      <div className="border border-gray-200 rounded-xl overflow-auto">
        {/* Header with Search & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
          <h2 className="text-xl font-bold text-[#1e2a49]">Payouts</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
            <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
              <img src={searchIcon} alt="Search" className="w-4 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 text-sm outline-none bg-transparent"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm"
              >
                <img src={sortIcon} alt="Sort" className="w-4" /> sort by
              </button>
              {sortOpen && (
                <div className="absolute right-0 z-10 bg-white border border-gray-200 shadow-md rounded-md p-4 mt-2 w-64 text-sm">
                  <h2 className="font-semibold mb-2">Sort by</h2>
                  <label className="block mb-1">
                    <input type="checkbox" className="mr-2" /> Amount (Low to high)
                  </label>
                  <label className="block mb-1">
                    <input type="checkbox" className="mr-2" /> Amount (High to low)
                  </label>
                  <label className="block mb-1">
                    <input type="checkbox" className="mr-2" /> Newest First
                  </label>
                  <label className="block">
                    <input type="checkbox" className="mr-2" /> Oldest First
                  </label>
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
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Due on</th>
                <th className="py-3 px-4 font-semibold">Booking ID</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Processed on</th>
                <th className="py-3 px-4 font-semibold">From</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-[#f8fbff] cursor-pointer">
                <td className="px-4 py-2 font-medium">P3123DH</td>
                <td className="px-4 py-2">23/08/2025</td>
                <td className="px-4 py-2">F83204940</td>
                <td className="px-4 py-2">182,000</td>
                <td className="px-4 py-2">--</td>
                <td className="px-4 py-2">--</td>
                <td className="px-4 py-2 text-yellow-500 font-semibold">pending</td>
              </tr>
              <tr className="border-t hover:bg-[#f8fbff] cursor-pointer">
                <td className="px-4 py-2 font-medium">P3478DH</td>
                <td className="px-4 py-2">11/07/2025</td>
                <td className="px-4 py-2">F43728363</td>
                <td className="px-4 py-2">349,000</td>
                <td className="px-4 py-2">11/07/2025</td>
                <td className="px-4 py-2">Bank Al Habib</td>
                <td className="px-4 py-2 text-green-600 font-semibold">processed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 text-sm text-gray-600 gap-2">
          <div>Showing 10 of 129</div>
          <div className="flex items-center gap-4 text-[#008558] font-semibold">
            <ChevronLeft strokeWidth={1} className="w-5 h-5 cursor-pointer" />
            <span className="cursor-pointer">1</span>
            <span className="cursor-pointer text-[#008558] font-bold">2</span>
            <span className="cursor-pointer">3</span>
            <ChevronRight strokeWidth={1} className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PayoutPage;
