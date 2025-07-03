import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { saveAs } from "file-saver";

const searchIcon = "../../public/images/search-icon.svg";
const sortIcon = "../../public/images/sort-by-icon.svg";
const downloadIcon = "../../public/images/download-icon.svg";

// Dummy data
// const dummyPayouts = [
//   {
//     id: "P001",
//     dueOn: "2025-07-01",
//     bookingId: "BK001",
//     amount: 15000,
//     processedOn: "2025-07-02",
//     from: "Bank Alfalah",
//     status: "completed",
//   },
//   {
//     id: "P002",
//     dueOn: "2025-07-03",
//     bookingId: "BK002",
//     amount: 12000,
//     processedOn: "-",
//     from: "HBL",
//     status: "pending",
//   },
// ];

const Payouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplierPayouts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("❌ No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:9000/api/v1/payouts/supplier",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await res.text();
          console.error("❌ Unexpected response:", text);
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("✅ Payouts fetched:", data);

        const transformed = data.map((p: any) => ({
          id: p.payout_id,
          dueOn: new Date(p.payout_date).toLocaleDateString("en-GB"),
          bookingId: p.booking_id,
          amount: p.final_amount,
          processedOn: p.processed_at
            ? new Date(p.processed_at).toLocaleDateString("en-GB")
            : "-",
          from: p.payout_method.replace(/_/g, " ").toUpperCase(),
          status: p.payout_status,
        }));

        setPayouts(transformed);
      } catch (err) {
        console.error("❌ Error fetching payouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierPayouts();
  }, []);

  const filtered = payouts.filter((p) =>
    [p.id, p.bookingId, p.from].some((val) =>
      val.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCSVDownload = () => {
    const csv = filtered
      .map((p) =>
        [
          p.id,
          p.dueOn,
          p.bookingId,
          p.amount,
          p.processedOn,
          p.from,
          p.status,
        ].join(",")
      )
      .join("\n");
    saveAs(new Blob([csv], { type: "text/csv" }), "payouts.csv");
  };

  return (
    <div className="main-content w-full px-4 sm:px-6 py-6 pb-[150px]">
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            My Payouts
          </h1>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <button className="bg-emerald-700 text-white px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
          All
        </button>
        <button
          onClick={handleCSVDownload}
          className="border border-gray-300 text-[#707D99] px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold"
        >
          <img src={downloadIcon} alt="Download" className="w-4" />
          <span className="hidden sm:inline">Download CSV</span>
          <span className="sm:hidden">CSV</span>
        </button>
      </div>

      <div className="booking-card border border-gray-200 rounded-xl overflow-hidden">
        <div className="booking-title flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-4">
          <h2 className="text-xl font-bold text-[#1e2a49]">Payouts</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto">
            <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
              <img src={searchIcon} alt="Search" className="w-4 mr-2" />
              <input
                type="text"
                placeholder="Search by ID, Booking or Bank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 lg:w-64 text-sm outline-none bg-transparent"
              />
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <button className="flex items-center justify-center gap-2 border border-gray-300 px-3 sm:px-4 py-2 rounded-full text-sm">
                  <img src={sortIcon} alt="Sort" className="w-4" />
                  <span className="hidden sm:inline">Sort by</span>
                  <span className="sm:hidden">Sort</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-sm">
            <thead className="bg-white border-b">
              <tr className="text-left">
                {[
                  "ID",
                  "Due on",
                  "Booking ID",
                  "Amount",
                  "Processed on",
                  "From",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-4 text-[#707D99]  px-6 font-semibold border-r border-gray-200 last:border-r-0"
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
                    colSpan={7}
                    className="text-center py-6 text-gray-400 font-medium"
                  >
                    Loading payouts...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t text-[#283456] hover:bg-[#f8fbff]"
                  >
                    <td className="px-6 py-4 border-r border-gray-200">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      {item.dueOn}
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      {item.bookingId}
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      Rs {item.amount}
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      {item.processedOn}
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      {item.from}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full font-semibold ${
                          item.status === "pending"
                            ? "text-orange-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No payouts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 text-sm text-gray-600 border-t border-gray-200">
          <div>
            Showing {filtered.length} of {payouts.length}
          </div>
          <div className="flex gap-2 items-center text-[#999]">
            <ChevronLeft className="text-[#008558] w-5 h-5 cursor-pointer" />
            <div className="flex gap-3 sm:gap-6">
              <span className="cursor-pointer">1</span>
              <span className="font-bold text-[#008558] cursor-pointer">2</span>
              <span className="cursor-pointer">3</span>
            </div>
            <ChevronRight className="text-[#008558] w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payouts;
