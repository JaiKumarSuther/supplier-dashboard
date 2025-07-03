// src/components/support/Support.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const searchIcon = "/images/search-icon.svg";
const sortIcon = "/images/sort-by-icon.svg";
const addIcon = "/images/add-icon.svg";

type SupportTicket = {
  ticket_id: string;
  related_to: string;
  created_at: string;
  subject: string;
  updated_at: string | null;
  status: "Open" | "Closed";
};

// const mockTickets: SupportTicket[] = [
//   {
//     ticket_id: "TCK-001",
//     related_to: "Booking",
//     created_at: "2025-06-01",
//     subject: "Issue with confirmation",
//     updated_at: "2025-06-03",
//     status: "Open",
//   },
//   {
//     ticket_id: "TCK-002",
//     related_to: "Payment",
//     created_at: "2025-05-28",
//     subject: "Refund not received",
//     updated_at: null,
//     status: "Closed",
//   },
//   {
//     ticket_id: "TCK-003",
//     related_to: "Tour Guide",
//     created_at: "2025-06-02",
//     subject: "Late arrival complaint",
//     updated_at: "2025-06-04",
//     status: "Open",
//   },
// ];

const Support = () => {
  const [activeTab, setActiveTab] = useState("Open");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchSupportTickets = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/v1/support/my-tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ Non-JSON response:", text);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("✅ Tickets fetched:", data);

      const transformed = data.map((ticket: any): SupportTicket => ({
        ticket_id: ticket.ticket_id,
        related_to: ticket.related_to,
        subject: ticket.subject,
        created_at: new Date(ticket.created_at).toLocaleDateString("en-GB"),
        updated_at: ticket.updated_at
          ? new Date(ticket.updated_at).toLocaleDateString("en-GB")
          : null,
        status: ticket.status === "open" ? "Open" : "Closed",
      }));

      setTickets(transformed);
    } catch (err) {
      console.error("❌ Error fetching support tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchSupportTickets();
}, []);



  const filtered = tickets
    .filter((t) => t.status === activeTab)
    .filter((t) =>
      [t.ticket_id, t.related_to, t.subject].some((v) =>
        v.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  return (
    <div className="main-content w-full px-4 sm:px-6 py-6 pb-[150px]">
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Support</h1>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full xl:w-auto">
          {["Open", "Closed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "bg-emerald-700 text-white"
                  : "border border-gray-300 text-gray-700"
              } px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/open-ticket")}
          className="bg-emerald-700 text-white px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold"
        >
          <img src={addIcon} alt="Add" className="w-4" />
          Open Ticket
        </button>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-4">
          <h2 className="text-xl font-bold text-[#1e2a49]">Support</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto">
            <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
              <img src={searchIcon} alt="Search" className="w-4 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 lg:w-64 text-sm outline-none bg-transparent"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm"
              >
                <img src={sortIcon} alt="Sort" className="w-4" />
                Sort by
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg p-4 shadow-lg w-64 z-10">
                  <h2 className="font-semibold mb-2">Sort by</h2>
                  <label className="block mb-1">
                    <input type="radio" name="sort" className="mr-2" />
                    Newest First
                  </label>
                  <label className="block">
                    <input type="radio" name="sort" className="mr-2" />
                    Oldest First
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-sm">
            <thead className="bg-white border-b">
              <tr className="text-left">
                {["ID", "Related to", "Opened", "Subject", "Closed", "Status"].map(
                  (header) => (
                    <th
                      key={header}
                      className="py-4 text-[#707D99]  px-6 font-semibold border-r border-gray-200 last:border-r-0"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
<tbody>
  {loading ? (
    <tr>
      <td colSpan={6} className="text-center py-6 text-gray-400 font-medium">
        Loading tickets...
      </td>
    </tr>
  ) : filtered.length > 0 ? (
    filtered.map((item, index) => (
      <tr
        key={index}
        onClick={() => navigate(`/support/details/${item.ticket_id}`)}
        className="border-t hover:bg-[#f8fbff] cursor-pointer text-[#283456]"
      >
        <td className="px-6 py-4 border-r border-gray-200">{item.ticket_id}</td>
        <td className="px-6 py-4 border-r border-gray-200">{item.related_to}</td>
        <td className="px-6 py-4 border-r border-gray-200">{item.created_at}</td>
        <td className="px-6 py-4 border-r border-gray-200">{item.subject}</td>
        <td className="px-6 py-4 text-center border-r border-gray-200">
          {item.updated_at || "—"}
        </td>
        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full font-semibold ${
              item.status === "Open" ? "text-green-700" : "text-red-600"
            }`}
          >
            {item.status}
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center py-6 text-gray-500">
        No tickets found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 text-sm text-gray-600 border-t border-gray-200">
          <div>
            Showing {filtered.length} of {tickets.length}
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

export default Support;
