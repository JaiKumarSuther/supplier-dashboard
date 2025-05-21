import searchIcon from "../../../public/images/search icon.svg";
import filterIcon from "../../../public/images/filter icon.svg";
import sortByIcon from "../../../public/images/sort by icon.svg";

const BookingsTable = () => {
  return (
    <div className="bg-white rounded-xl mt-6 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-[#1e2a49]">Recent Bookings</h2>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full pl-9 pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <img
              src={searchIcon}
              alt="Search Icon"
              className="w-4 h-4 absolute left-3 top-2.5 pointer-events-none"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm rounded-full text-[#1e2a49] hover:bg-gray-50">
            <img src={filterIcon} alt="Filter Icon" className="w-4 h-4" />
            filters
          </button>
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm rounded-full text-[#1e2a49] hover:bg-gray-50">
            <img src={sortByIcon} alt="Sort By Icon" className="w-4 h-4" />
            sort by
          </button>
        </div>
      </div>

      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-white text-gray-700 hover:bg-[#f9f9fc] transition-colors cursor-pointer border-b border-gray-300">
            <th className="p-4 border-r border-gray-300 font-medium">ID</th>
            <th className="p-4 border-r border-gray-300 font-medium">Received on</th>
            <th className="p-4 border-r border-gray-300 font-medium">Customer</th>
            <th className="p-4 border-r border-gray-300 font-medium">Booked</th>
            <th className="p-4 border-r border-gray-300 font-medium">Date</th>
            <th className="p-4 border-r border-gray-300 font-medium">People</th>
            <th className="p-4 border-r border-gray-300 font-medium">Amount</th>
            <th className="p-4 font-medium">Status</th>
          </tr>
        </thead>

        <tbody className="text-[#1e2a49]">
          <tr className="hover:bg-[#f6faff] transition-colors cursor-pointer border-b border-gray-300">
            <td className="px-4 py-4 border-r border-gray-300 text-green-600">F2732</td>
            <td className="px-4 py-4 border-r border-gray-300">
              22 July 2025 <span className="text-gray-400">7:21</span>
            </td>
            <td className="px-4 py-4 border-r border-gray-300">Muhammad Lee</td>
            <td className="px-4 py-4 border-r border-gray-300">14 Day K2 Base</td>
            <td className="px-4 py-4 border-r border-gray-300">17 July 2025</td>
            <td className="px-4 py-4 border-r border-gray-300">3</td>
            <td className="px-4 py-4 border-r border-gray-300 text-green-600">154,000</td>
            <td className="px-4 py-4 text-[#f8b400] font-medium text-sm">pending</td>
          </tr>

          <tr className="hover:bg-[#f6faff] transition-colors cursor-pointer border-b border-gray-300">
            <td className="px-4 py-4 border-r border-gray-300 text-green-600">C2798</td>
            <td className="px-4 py-4 border-r border-gray-300">
              22 July 2025 <span className="text-gray-400">7:21</span>
            </td>
            <td className="px-4 py-4 border-r border-gray-300">Wamiq Ahmed</td>
            <td className="px-4 py-4 border-r border-gray-300">Seven Days Exp</td>
            <td className="px-4 py-4 border-r border-gray-300">2 Aug 2025</td>
            <td className="px-4 py-4 border-r border-gray-300">4</td>
            <td className="px-4 py-4 border-r border-gray-300 text-green-600">239,000</td>
            <td className="px-4 py-4 text-[#00c896] font-medium text-sm">Confirmed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
