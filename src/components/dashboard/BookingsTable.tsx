const BookingsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Bookings</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-2 py-1 text-sm"
          />
          <button className="border px-3 py-1 text-sm rounded">Filters</button>
          <button className="border px-3 py-1 text-sm rounded">Sort By</button>
        </div>
      </div>

      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2">ID</th>
            <th className="p-2">Received on</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Booked</th>
            <th className="p-2">Date</th>
            <th className="p-2">People</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2 text-green-600 font-semibold">F2732</td>
            <td className="p-2">22 July 2025 <span className="text-gray-400">7:21</span></td>
            <td className="p-2">Muhammad Lee</td>
            <td className="p-2">14 Day K2 Base</td>
            <td className="p-2">17 July 2025</td>
            <td className="p-2">3</td>
            <td className="p-2 text-green-600">154,000</td>
            <td className="p-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
            </td>
          </tr>
          <tr className="border-t">
            <td className="p-2 text-green-600 font-semibold">C2798</td>
            <td className="p-2">22 July 2025 <span className="text-gray-400">7:21</span></td>
            <td className="p-2">Wamiq Ahmed</td>
            <td className="p-2">Seven Days Exp</td>
            <td className="p-2">2 Aug 2025</td>
            <td className="p-2">4</td>
            <td className="p-2 text-green-600">239,000</td>
            <td className="p-2">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Confirmed</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;