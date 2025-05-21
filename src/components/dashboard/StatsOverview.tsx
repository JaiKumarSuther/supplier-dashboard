import React from "react";
import revenueIcon from "../../../public/images/revmon icon in overview card.svg";
import bookingIcon from "../../../public/images/Bookings icon in overview cards.svg";
import avgIcon from "../../../public/images/Average booking value icon in overview cards.svg";
import ratingIcon from "../../../public/images/rev icon in overview card.svg";

const stats = [
  {
    label: "This month's revenue",
    value: "2,163,527",
    change: "-10%",
    icon: revenueIcon,
  },
  {
    label: "Bookings this month",
    value: "320",
    change: "+78",
    icon: bookingIcon,
  },
  {
    label: "Average booking value",
    value: "48,230 PKR",
    change: "+4,530",
    icon: avgIcon,
  },
  {
    label: "Your overall ratings",
    value: "4.3",
    change: "+12",
    icon: ratingIcon,
  },
];

const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {stats.map((item, idx) => {
        const isNegative = item.change.startsWith("-");
        const changeColor = isNegative ? "text-[#00c896]" : "text-[#00c896]"; // uniform green as per image

        return (
          <div
            key={idx}
            className="bg-white rounded-lg border px-6 py-5 flex items-start space-x-4"
          >
            <img src={item.icon} alt="" className="w-[22px] h-[22px] mt-1" />
            <div>
              <p className="text-sm text-[#7b7d97] font-medium">{item.label}</p>
              <h3 className="text-2xl font-bold text-[#1e2a49] leading-snug mb-6">
                {item.value}
              </h3>
              <p className="text-sm">
                <span className={`${changeColor} font-semibold`}>
                  {item.change}
                </span>{" "}
                <span className="text-[#1e2a49]">this month</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
