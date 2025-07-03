import React from "react";
const revenueIcon = "/images/revmon-icon-in-overview-card.svg";
const bookingIcon = "../../../public/images/Bookings-icon-in-overview-cards.svg";
const avgIcon = "../../../public/images/average-booking-value-icon-in-overview-cards.svg";
const ratingIcon = "/images/rev-icon-in-overview-card.svg";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-4">
      {stats.map((item, idx) => {
        const isNegative = item.change.startsWith("-");
        const changeColor = isNegative ? "text-[#00D382]" : "text-[#00D382]";

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