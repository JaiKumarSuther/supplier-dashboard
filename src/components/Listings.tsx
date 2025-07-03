import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const searchIcon = "/images/search-icon.svg";
const filterIcon = "/images/filter-icon.svg";
const sortIcon = "/images/sort-by-icon.svg";
const addIcon = "/images/add-icon.svg";
const downloadIcon = "/images/download-icon.svg";
import viewIcon from "../assets/icons/view-icon.svg";
import editIcon from "../assets/icons/edit-icon.svg";
import availIcon from "../assets/icons/avail-icon.svg";
import deactivateIcon from "../assets/icons/deactivate.svg";
import deleteIcon from "../assets/icons/del-icon.svg";

type DisplayListing = {
  id: string;
  date: string;
  time: string;
  type: string;
  title: string;
  group: string;
  bookings: string;
  price: string;
  status: string;
  statusColor: string;
};
type EditLog = {
  edit_id: string;
  listing_id: string;
  edited_by: string; // required
  edit_type: string;
  edited_fields: any;
  status: string;
  edited_at: string;
};
type ListingDetail = {
  listing_id: string;
  partner_id: string;
  listing_type: string;
  title: string;
  description: string;
  price: number;
  meta_data: any;
  status: string;
  admin_comments: string | null;
  created_at: string;
  updated_at: string;
};

const Listings = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const [sortOption, setSortOption] = useState("");
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedListing, setSelectedListing] = useState<DisplayListing | null>(
    null
  );
  const [listings, setListings] = useState<DisplayListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [editLogs, setEditLogs] = useState<EditLog[]>([]);
  const [selectedListingDetail, setSelectedListingDetail] =
    useState<ListingDetail | null>(null);
  const [showDeactivatePopup, setShowDeactivatePopup] = useState(false);

  const navigate = useNavigate();

  // Base API configuration
  const API_BASE_URL = "http://localhost:9000/api/v1";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // API Functions
  const fetchSupplierListings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found");
      toast.error("Authentication token missing");
      setListings([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/listings/my-listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        toast.error(`Invalid response: ${text}`);
        setListings([]);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Fetched listings:", JSON.stringify(data));

      if (!Array.isArray(data)) {
        toast.error("Unexpected API response: Expected an array.");
        console.error("Expected an array, but got:", data);
        setListings([]); // fallback to empty list
        setLoading(false);
        return;
      }

      const transformed = data.map((listing: any) => {
        const createdAt = new Date(listing.created_at);
        const statusMap: Record<string, { label: string; color: string }> = {
          approved: { label: "Live", color: "#04a550" },
          rejected: { label: "Deactivated", color: "#ef4444" },
          pending_review: { label: "Under Review", color: "#eab308" },
        };

        const statusMeta = statusMap[listing.status] || {
          label: listing.status,
          color: "#6b7280",
        };

        const type = listing.meta_data?.type?.toLowerCase();
        const group =
          type === "group" ? "Group" : type === "private" ? "Private" : "N/A";

        return {
          id: `L${listing.listing_id.slice(0, 3)}${listing.listing_id.slice(-2)}`,
          date: createdAt.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          time: createdAt.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type:
            listing.listing_type.charAt(0).toUpperCase() +
            listing.listing_type.slice(1),
          title: listing.title,
          group,
          bookings: "0",
          price: listing.price?.toString() || "0",
          status: statusMeta.label,
          statusColor: statusMeta.color,
        };
      });

      setListings(transformed);
    } catch (err: any) {
      console.error("❌ Error fetching listings:", err);
      toast.error(err?.message || "Failed to fetch listings.");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchListingById = async (listingId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/listings/${listingId}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch listing details: ${response.status}`);
      }

      const data = await response.json();
      console.log("Listing details:", data);
      setSelectedListingDetail(data);
      return data;
    } catch (error: any) {
      console.error("Error fetching listing details:", error);
      toast.error(error?.message || "Failed to fetch listing details");
    }
  };

  const updateListing = async (listingId: string, updateData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/listings/${listingId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update listing: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated listing:", data);
      toast.success("Listing updated successfully!");

      // Refresh listings
      await fetchSupplierListings();
      return data;
    } catch (error: any) {
      console.error("Error updating listing:", error);
      toast.error(error?.message || "Failed to update listing");
    }
  };

  const deleteListing = async (listingId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/listings/${listingId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete listing: ${response.status}`);
      }

      console.log("Listing deleted successfully");
      toast.success("Listing deleted successfully!");

      // Remove from local state
      setListings(listings.filter((listing) => listing.id !== listingId));
      return true;
    } catch (error: any) {
      console.error("Error deleting listing:", error);
      toast.error(error?.message || "Failed to delete listing");
      return false;
    }
  };

  const createEditLog = async (editLogData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/listings-edit-logs`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(editLogData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create edit log: ${response.status}`);
      }

      const data = await response.json();
      console.log("Edit log created:", data);
      toast.success("Edit log created successfully!");
      return data;
    } catch (error: any) {
      console.error("Error creating edit log:", error);
      toast.error(error?.message || "Failed to create edit log");
    }
  };

  const fetchEditLogsByListing = async (listingId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/listings-edit-logs/listing/${listingId}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch edit logs: ${response.status}`);
      }

      const data = await response.json();
      console.log("Edit logs:", data);
      setEditLogs(data);
      return data;
    } catch (error: any) {
      console.error("Error fetching edit logs:", error);
      toast.error(error?.message || "Failed to fetch edit logs");
    }
  };

  // const fetchAllEditLogs = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/listings-edit-logs`, {
  //       headers: getAuthHeaders(),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch all edit logs: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("All edit logs:", data);
  //     return data;
  //   } catch (error: any) {
  //     console.error("Error fetching all edit logs:", error);
  //     toast.error(error?.message || "Failed to fetch edit logs");
  //   }
  // };

  // const approveEditLog = async (editId: string) => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/listings-edit-logs/${editId}/approve`, {
  //       method: "PATCH",
  //       headers: getAuthHeaders(),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to approve edit log: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Edit log approved:", data);
  //     toast.success("Edit log approved successfully!");
  //     return data;
  //   } catch (error: any) {
  //     console.error("Error approving edit log:", error);
  //     toast.error(error?.message || "Failed to approve edit log");
  //   }
  // };

  // const rejectEditLog = async (editId: string) => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/listings-edit-logs/${editId}/reject`, {
  //       method: "PATCH",
  //       headers: getAuthHeaders(),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to reject edit log: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Edit log rejected:", data);
  //     toast.success("Edit log rejected successfully!");
  //     return data;
  //   } catch (error: any) {
  //     console.error("Error rejecting edit log:", error);
  //     toast.error(error?.message || "Failed to reject edit log");
  //   }
  // };

  // Initial data fetch
  useEffect(() => {
    fetchSupplierListings();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const filterEl = document.getElementById("filter-dropdown");
      const sortEl = document.getElementById("sort-dropdown");

      if (filterEl && !filterEl.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      if (sortEl && !sortEl.contains(e.target as Node)) {
        setSortOpen(false);
      }

      const popup = document.querySelector(".popup-menu");
      if (popup && !popup.contains(e.target as Node)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredListings = listings
    .filter((item) => activeTab === "All" || item.status === activeTab)
    .filter((item) =>
      [item.id, item.title, item.type].some((val) =>
        val.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .filter((item) => {
      const typeFilterActive = filters["Tours"] || filters["Treks"];
      const groupFilterActive =
        filters["Group only"] || filters["Private only"];

      const matchesType =
        !typeFilterActive ||
        (filters["Tours"] && item.type === "Tour") ||
        (filters["Treks"] && item.type === "Trek");

      const matchesGroup =
        !groupFilterActive ||
        (filters["Group only"] && item.group === "Group") ||
        (filters["Private only"] && item.group === "Private");

      return matchesType && matchesGroup;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "Price (Low to high)":
          return +a.price - +b.price;
        case "Price (High to low)":
          return +b.price - +a.price;
        case "Bookings (Low to high)":
          return +a.bookings - +b.bookings;
        case "Bookings (High to low)":
          return +b.bookings - +a.bookings;
        default:
          return 0;
      }
    });

  const handleCSVDownload = () => {
    const csv = filteredListings
      .map((item) =>
        [
          item.id,
          item.date,
          item.time,
          item.type,
          item.title,
          item.group,
          item.bookings,
          item.price,
          item.status,
        ].join(",")
      )
      .join("\n");
    saveAs(new Blob([csv], { type: "text/csv" }), "listings.csv");
  };

  const toggleFilter = (label: string) => {
    setFilters((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleListingClick = (
    e: React.MouseEvent,
    item: DisplayListing,
    index: number
  ) => {
    e.preventDefault();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    if (popupVisible && popupIndex === index) {
      setPopupVisible(false);
      setPopupIndex(null);
      setSelectedListing(null);
      setPopupPosition(null);
    } else {
      setSelectedListing(item);
      setPopupIndex(index);
      setPopupVisible(true);
      setPopupPosition({
        x: rect.right - 750,
        y: rect.top + window.scrollY + rect.height / 2 + 30,
      });
    }
  };

  const handleMenuAction = async (action: string) => {
    if (!selectedListing) return;

    switch (action) {
      case "View":
        console.log(`Viewing listing ${selectedListing.id}`);
        await fetchListingById(selectedListing.id);
        await fetchEditLogsByListing(selectedListing.id);
        toast.success("Listing details loaded!");
        break;

      case "Edit": {
        const type = selectedListing.type.toLowerCase(); // "hotel", "car_rental", etc.
        const listingId = selectedListing.id;

        let editPath = "";

        switch (type) {
          case "tour":
            editPath = `/listingtour/edit/${listingId}`;
            break;
          case "trek":
            editPath = `/treks/edit/${listingId}`;
            break;
          case "car_rental":
          case "car":
            editPath = `/car-listing/edit/${listingId}`;
            break;
          case "bike_rental":
          case "bike":
            editPath = `/bike-listing/edit/${listingId}`;
            break;
          case "hotel":
            editPath = `/hotel/edit/${listingId}`;
            break;
          case "activity":
            editPath = `/listingactivity/edit/${listingId}`;
            break;
          case "experience":
            editPath = `/experience/edit/${listingId}`; // make sure you have this route/component
            break;
          case "guide":
          case "tourguides":
            editPath = `/tourguides/edit/${listingId}`;
            break;
          default:
            console.warn("Unknown listing type:", type);
            toast.error(`Unknown listing type: ${type}`);
            return;
        }

        navigate(editPath);
        break;
      }

      case "Manage Availability":
        console.log(`Managing availability for listing ${selectedListing.id}`);
        toast.info("Availability management feature coming soon!");
        break;

      case "Deactivate":
        setShowDeactivatePopup(true);
        break;

      case "Delete":
        if (window.confirm("Are you sure you want to delete this listing?")) {
          console.log(`Deleting listing ${selectedListing.id}`);
          await deleteListing(selectedListing.id);
        }
        break;

      default:
        console.log(`Unknown action: ${action}`);
    }
    setPopupVisible(false);
  };

  if (error) {
    return (
      <div className="main-content w-full px-4 sm:px-6 py-6 pb-[150px]">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content w-full px-4 sm:px-6 py-6 pb-[150px]">
      <div className="welcome-back mb-6">
        <div className="content">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            My Listings
          </h1>
        </div>
      </div>

      <div className="listing-container">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-2 w-full xl:w-auto">
            {[
              "All",
              "Live",
              "Deactivated",
              "Under Review",
              "Edit Under Review",
            ].map((tab) => (
              <button
                className={`${
                  activeTab === tab
                    ? "bg-[#008558] text-white"
                    : "border border-[#D4D4D4] text-[#1e2a49]"
                } px-4 py-1.5 rounded-full font-semibold text-sm transition`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
            <div className="flex gap-2">
              {["Add Tour", "Add Trek"].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === "Add Tour") {
                      navigate("/listingtour");
                    } else if (label === "Add Trek") {
                      navigate("/treks");
                    }
                  }}
                  className="bg-emerald-700 text-white px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold flex-1 sm:flex-initial justify-center"
                >
                  <img src={addIcon} alt={label} className="w-3 sm:w-4" />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(" ")[1]}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleCSVDownload}
              className="border border-gray-300 text-[#707D99] px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold justify-center"
            >
              <img src={downloadIcon} alt="Download" className="w-3 sm:w-4" />
              <span className="hidden sm:inline">Download CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="listing-card border border-gray-200 rounded-xl overflow-hidden">
            <div className="listing-title flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-4">
              <h2 className="text-xl font-bold text-[#1e2a49]">Listings</h2>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto">
                <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full sm:w-auto">
                  <img
                    src={searchIcon}
                    alt="Search"
                    className="w-4 mr-2 flex-shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search by ID, title or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-48 lg:w-64 text-sm outline-none bg-transparent"
                  />
                </div>

                <div className="flex gap-3">
                  <div
                    id="filter-container"
                    className="relative flex-1 sm:flex-initial"
                  >
                    <button
                      onClick={() => {
                        setFilterOpen(!filterOpen);
                        setSortOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 border border-gray-300 px-3 sm:px-4 py-2 rounded-full text-sm w-full sm:w-auto"
                    >
                      <img src={filterIcon} alt="Filter" className="w-4" />
                      <span className="hidden sm:inline">Filter by</span>
                      <span className="sm:hidden">Filter</span>
                    </button>
                  </div>

                  <div
                    id="sort-dropdown"
                    className="relative flex-1 sm:flex-initial"
                  >
                    <button
                      onClick={() => {
                        setSortOpen(!sortOpen);
                        setFilterOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 border border-gray-300 px-3 sm:px-4 py-2 rounded-full text-sm w-full sm:w-auto"
                    >
                      <img src={sortIcon} alt="Sort" className="w-4" />
                      <span className="hidden sm:inline">Sort by</span>
                      <span className="sm:hidden">Sort</span>
                    </button>
                    {sortOpen && (
                      <div className="absolute right-0 z-[60] bg-white border border-gray-200 shadow-lg rounded-lg p-4 mt-2 w-64 text-sm">
                        <h2 className="font-semibold mb-2">Sort by</h2>
                        {[
                          "Price (Low to high)",
                          "Price (High to low)",
                          "Bookings (Low to high)",
                          "Bookings (High to low)",
                        ].map((text) => (
                          <label className="block mb-1" key={text}>
                            <input
                              type="radio"
                              className="mr-2"
                              checked={sortOption === text}
                              onChange={() => {
                                setSortOption(text);
                              }}
                            />
                            {text}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden relative lg:block overflow-x-auto">
              <table className="table-auto w-full border text-sm">
                <thead className="bg-white border-b">
                  <tr className="text-left">
                    {[
                      "ID",
                      "Created on",
                      "Listing",
                      "Title",
                      "Type",
                      "Bookings",
                      "Price",
                      "Status",
                    ].map((header) => (
                      <th
                        key={header}
                        className="py-4 px-6 font-semibold border-r text-[#707D99] border-gray-200 last:border-r-0"
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
                        colSpan={8}
                        className="text-center py-6 text-gray-400 font-medium"
                      >
                        Loading listings...
                      </td>
                    </tr>
                  ) : filteredListings.length > 0 ? (
                    filteredListings.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t text-[#283456] hover:bg-[#f8fbff] cursor-pointer relative"
                        onClick={(e) => handleListingClick(e, item, index)}
                      >
                        <td className="px-6 py-4 border-r border-gray-200">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          {item.date}{" "}
                          <span className="text-gray-500">{item.time}</span>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          {item.type}
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          {item.group}
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          {item.bookings}
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          Rs {parseInt(item.price).toLocaleString()}
                        </td>
                        <td
                          className="px-6 py-4 font-medium"
                          style={{ color: item.statusColor }}
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-500 font-medium"
                      >
                        No listings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Scrollable Table View */}
            <div className="lg:hidden overflow-x-auto">
              <table className="table-auto w-full border text-sm min-w-[640px]">
                <thead className="bg-white border-b">
                  <tr className="text-left">
                    {[
                      "ID",
                      "Created on",
                      "Type",
                      "Title",
                      "Group",
                      "Bookings",
                      "Price",
                      "Status",
                    ].map((header) => (
                      <th
                        key={header}
                        className="py-3 px-4 font-semibold border-r border-gray-200 last:border-r-0 whitespace-nowrap"
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
                        colSpan={8}
                        className="text-center py-6 text-gray-400 font-medium"
                      >
                        Loading listings...
                      </td>
                    </tr>
                  ) : filteredListings.length > 0 ? (
                    filteredListings.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-[#f8fbff] cursor-pointer"
                        onClick={(e) => handleListingClick(e, item, index)}
                      >
                        <td className="px-4 py-3 font-medium border-r border-gray-200 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                          <div>{item.date}</div>
                          <div className="text-gray-500 text-xs">
                            {item.time}
                          </div>
                        </td>
                        <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                          {item.type}
                        </td>
                        <td className="px-4 py-3 border-r border-gray-200 max-w-[200px]">
                          <div className="truncate" title={item.title}>
                            {item.title}
                          </div>
                        </td>
                        <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                          {item.group}
                        </td>
                        <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                          {item.bookings}
                        </td>
                        <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                          Rs {parseInt(item.price).toLocaleString()}
                        </td>
                        <td
                          className="px-4 py-3 font-medium whitespace-nowrap"
                          style={{ color: item.statusColor }}
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-500"
                      >
                        No listings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 text-sm text-gray-600 border-t border-gray-200">
              <div>
                Showing {filteredListings.length} of {listings.length}
              </div>
              <div className="flex gap-2 items-center text-[#999]">
                <ChevronLeft
                  strokeWidth={1}
                  className="text-[#008558] w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                />
                <div className="flex gap-3 sm:gap-6">
                  <span className="cursor-pointer">1</span>
                  <span className="font-bold text-[#008558] cursor-pointer">
                    2
                  </span>
                  <span className="cursor-pointer">3</span>
                </div>
                <ChevronRight
                  strokeWidth={1}
                  className="text-[#008558] w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* Filter dropdown */}
          {filterOpen && (
            <div
              className="absolute right-[10px] top-[150px] md:right-32 md:top-14 z-[60] bg-white border border-gray-200 shadow-lg rounded-lg p-4 w-64 text-sm"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <h2 className="font-semibold mb-2">Filter by</h2>
              {[
                "Tours",
                "Treks",
                "Group only",
                "Private only",
                "For international tourists",
                "For local tourists",
              ].map((text) => (
                <label className="block mb-1" key={text}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters[text] || false}
                    onChange={() => toggleFilter(text)}
                  />
                  {text}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup Menu */}
      {popupVisible && popupPosition && selectedListing && (
        <div
          className="absolute top-[100px] z-[70] bg-white shadow-2xl rounded-lg border-2 border-gray-200 p-2 w-48 popup-menu"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
          }}
        >
          {[
            ["View", viewIcon],
            ["Edit", editIcon],
            ["Manage Availability", availIcon],
            ["Deactivate", deactivateIcon],
            ["Delete", deleteIcon],
          ].map(([label, icon]) => (
            <div
              key={label}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded text-sm"
              onClick={() => handleMenuAction(label)}
            >
              <img src={icon} alt={label} className="w-4 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Debug Information - showing selected listing details and edit logs */}
      {selectedListingDetail && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Selected Listing Details:</h3>
          <pre className="text-xs overflow-auto max-h-32 bg-white p-2 rounded border">
            {JSON.stringify(selectedListingDetail, null, 2)}
          </pre>
        </div>
      )}

      {editLogs.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Edit Logs:</h3>
          <pre className="text-xs overflow-auto max-h-32 bg-white p-2 rounded border">
            {JSON.stringify(editLogs, null, 2)}
          </pre>
        </div>
      )}
      {showDeactivatePopup && selectedListing && (
        <div className="fixed inset-0 z-[1000] border-2 border-gray-300 flex items-center justify-center px-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-6 sm:p-10  text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Deactivate Listing
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              New bookings will be disabled, but your listing will remain
              visible until current bookings are fulfilled.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  const editedBy = localStorage.getItem("user_id") || "admin";

                  await createEditLog({
                    listing_id: selectedListing.id,
                    edit_type: "status_change",
                    edited_by: editedBy,
                    edited_fields: {
                      status: "rejected",
                      old_status: selectedListing.status,
                    },
                  });

                  // 🟢 Actually change the status
                  await updateListing(selectedListing.id, {
                    status: "rejected",
                  });

                  setShowDeactivatePopup(false);
                  setPopupVisible(false);
                  await fetchSupplierListings();
                }}
                className="px-5 py-2 text-[#e0b500] rounded-full border border-gray-300  font-semibold"
              >
                Deactivate Listing
              </button>
              <button
                onClick={() => setShowDeactivatePopup(false)}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;
