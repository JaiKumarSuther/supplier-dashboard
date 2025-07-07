import React, { useEffect, useState } from "react";
const revenueIcon = "/images/revmon-icon-in-overview-card.svg";
const bookingIcon = "/images/Bookings-icon-in-overview-cards.svg";
const avgIcon = "/images/average-booking-value-icon-in-overview-cards.svg";
const ratingIcon = "/images/rev-icon-in-overview-card.svg";

const StatsOverview: React.FC = () => {
  const [stats, setStats] = useState([
    {
      label: "This month's revenue",
      value: "Loading...",
      change: "0%",
      icon: revenueIcon,
    },
    {
      label: "Bookings this month",
      value: "Loading...",
      change: "0",
      icon: bookingIcon,
    },
    {
      label: "Average booking value",
      value: "Loading...",
      change: "0",
      icon: avgIcon,
    },
    {
      label: "Your overall ratings",
      value: "Loading...",
      change: "0",
      icon: ratingIcon,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const supplierId = localStorage.getItem("supplier_id");

    if (!token || !supplierId) return;

    fetch(`http://localhost:9000/api/v1/suppliers/${supplierId}/dashboard/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedStats = [
          {
            label: "This month's revenue",
            value: `${Number(data.revenueThisMonth).toLocaleString()} PKR`,
            change: data.revenueChange ? `${data.revenueChange}%` : "0%",
            icon: revenueIcon,
          },
          {
            label: "Bookings this month",
            value: `${data.bookingsThisMonth}`,
            change: `${data.bookingsChange ?? 0}`,
            icon: bookingIcon,
          },
          {
            label: "Average booking value",
            value: `${data.avgBookingValue.toLocaleString()} PKR`,
            change: `${data.avgBookingValueChange ?? 0}`,
            icon: avgIcon,
          },
          {
            label: "Your overall ratings",
            value: `${data.avgRating || "N/A"}`,
            change: `${data.ratingChange ?? 0}`,
            icon: ratingIcon,
          },
        ];
        setStats(updatedStats);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch stats:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-4">
      {stats.map((item, idx) => {
        const isNegative = item.change.toString().startsWith("-");
        const changeColor = isNegative ? "text-red-500" : "text-[#00D382]";

        return (
          <div
            key={idx}
            className="bg-white rounded-lg border px-4 sm:px-6 py-4 sm:py-5 flex items-start space-x-3 sm:space-x-4 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
          >
            <img src={item.icon} alt="" className="w-5 h-5 sm:w-[22px] sm:h-[22px] mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-[15px] text-[#797D99] mb-1">{item.label}</p>
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#283456] leading-snug mb-2 sm:mb-4">
                {item.value}
              </h3>
              <p className="text-sm sm:text-[15px]">
                <span className={`${changeColor} font-semibold`}>
                  {item.change}
                </span>{" "}
                <span className="text-[#283456]">this month</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
