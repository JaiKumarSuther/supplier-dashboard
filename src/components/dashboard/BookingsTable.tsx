const searchIcon = "/images/search-icon.svg";
const filterIcon = "/images/filter-icon.svg";
const sortByIcon = "/images/sort-by-icon.svg";

const BookingsTable = () => {
  return (
    <div className="bg-white rounded-xl mt-6 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 border-b border-gray-200 gap-4">
        <h2 className="text-lg sm:text-[20px] font-semibold text-[#283456]">Recent Bookings</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-[300px]">
            <input
              type="text"
              placeholder="Search by ID, customer or booked..."
              className="border border-gray-300 rounded-full pl-9 pr-4 py-2 text-sm w-full placeholder:text-[#707D99] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <img
              src={searchIcon}
              alt="Search Icon"
              className="w-4 h-4 absolute left-3 top-2.5 pointer-events-none"
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button className="flex items-center gap-2 border border-gray-300 px-3 sm:px-4 py-2 text-sm rounded-full text-[#707D99] hover:bg-gray-50 flex-1 sm:flex-none justify-center">
              <img src={filterIcon} alt="Filter Icon" className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 border border-gray-300 px-3 sm:px-4 py-2 text-sm rounded-full text-[#707D99] hover:bg-gray-50 flex-1 sm:flex-none justify-center">
              <img src={sortByIcon} alt="Sort By Icon" className="w-4 h-4" />
              Sort by
            </button>
          </div>
        </div>
      </div>

      {/* Table - Horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-white border-b border-gray-200 text-[#707D99]">
            <tr>
              {["ID", "Received on", "Customer", "Booked", "Date", "People", "Amount", "Status"].map(header => (
                <th key={header} className="p-3 sm:p-4 border-r border-gray-200 font-medium last:border-r-0 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-[#283456]">
            {[
              {
                id: "F2732",
                received: "22 July 2025 7:21",
                customer: "Muhammad Lee",
                booked: "14 Day K2 Base",
                date: "17 July 2025",
                people: 3,
                amount: "154000",
                status: "Pending",
              },
              {
                id: "C2798",
                received: "22 July 2025 7:21",
                customer: "Wamiq Ahmed",
                booked: "Seven Days Exp",
                date: "2 Aug 2025",
                people: 4,
                amount: "239000",
                status: "Confirmed",
              },
            ].map((item, index) => (
              <tr
                key={index}
                className="hover:bg-[#f8fbff] border-b border-gray-200 transition-colors cursor-pointer"
              >
                <td className="px-3 sm:px-4 py-3 sm:py-4 border-r border-gray-200 whitespace-nowrap">{item.id}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 border-r border-gray-200 whitespace-nowrap">
                  <div className="flex flex-col sm:flex-row sm:gap-1">
                    <span>{item.received.split(" ")[0]}</span>
                    <span className="text-[#707D99] text-xs sm:text-sm">{item.received.split(" ")[1]}</span>
                  </div>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 border-r border-gray-200 whitespace-nowrap">{item.customer}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 border-r border-gray-200 whitespace-nowrap">{item.booked}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 border-r border-gray-200 whitespace-nowrap">{item.date}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 border-r border-gray-200 whitespace-nowrap">{item.people}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 border-r border-gray-200 whitespace-nowrap">
                  Rs {parseInt(item.amount).toLocaleString()}
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      item.status === "Confirmed"
                        ? "text-[#04A550]"
                        : item.status === "Pending"
                        ? "text-[#FFAA00]"
                        : "text-[#838793]"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
