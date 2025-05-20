const BookingsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow mt-6 border border-gray-300">
      {/* Header inside the table box */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Recent Bookings</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-full px-7-2 text-sm"
          />
          <button className="border px-4 py-2 text-sm rounded-full">Filters</button>
          <button className="border px-4 py-2 text-sm rounded-full">Sort By</button>
        </div>
      </div>

      {/* Table without inner container */}
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-white text-gray-700">
            <th className="p-3 border border-gray-300 font-normal">ID</th>
            <th className="p-3 border border-gray-300 font-normal">Received on</th>
            <th className="p-3 border border-gray-300 font-normal">Customer</th>
            <th className="p-3 border border-gray-300 font-normal">Booked</th>
            <th className="p-3 border border-gray-300 font-normal">Date</th>
            <th className="p-3 border border-gray-300 font-normal">People</th>
            <th className="p-3 border border-gray-300 font-normal">Amount</th>
            <th className="p-3 border border-gray-300 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-gray-300 text-gray-600">F2732</td>
            <td className="p-3 border border-gray-300">22 July 2025 <span className="text-gray-400">7:21</span></td>
            <td className="p-3 border border-gray-300">Muhammad Lee</td>
            <td className="p-3 border border-gray-300">14 Day K2 Base</td>
            <td className="p-3 border border-gray-300">17 July 2025</td>
            <td className="p-3 border border-gray-300">3</td>
            <td className="p-3 border border-gray-300 text-gray-700">154,000</td>
            <td className="p-3 border border-gray-300">
              <span className="text-orange-500 text-xs px-2 py-1 rounded-full">Pending</span>
            </td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 text-gray-600">C2798</td>
            <td className="p-3 border border-gray-300">22 July 2025 <span className="text-gray-400">7:21</span></td>
            <td className="p-3 border border-gray-300">Wamiq Ahmed</td>
            <td className="p-3 border border-gray-300">Seven Days Exp</td>
            <td className="p-3 border border-gray-300">2 Aug 2025</td>
            <td className="p-3 border border-gray-300">4</td>
            <td className="p-3 border border-gray-300 text-gray-700">239,000</td>
            <td className="p-3 border border-gray-300">
              <span className="text-green-600 text-xs px-2 py-1 rounded-full">Confirmed</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Optional bottom line */}
      <hr className="border-gray-300 mt-4" />
    </div>
  );
};

export default BookingsTable;
