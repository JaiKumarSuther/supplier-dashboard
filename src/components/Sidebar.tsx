import React, { useState } from "react";

import logo from "../../public/images/NINJA logo.svg";
import homeIcon from "../../public/images/HOME icon.svg";
import profileIcon from "../../public/images/PROFILE icon.svg";
import bookingsIcon from "../../public/images/BOOKINGS icon.svg";
import listingsIcon from "../../public/images/LISTINGS.svg";
import inboxIcon from "../../public/images/INBOX icon.svg";
import supportIcon from "../../public/images/SUPPORT icon.svg";
import reviewsIcon from "../../public/images/REVIEWS icon.svg";
import payoutsIcon from "../../public/images/PAYOUTS icon.svg";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { href: "dashboard.html", icon: homeIcon },
    { href: "profile.html", icon: profileIcon },
    { href: "booking.html", icon: bookingsIcon },
    { href: "listing.html", icon: listingsIcon },
    { href: "messages.html", icon: inboxIcon },
    { href: "support.html", icon: supportIcon },
    { href: "reviews.html", icon: reviewsIcon },
    { href: "payments.html", icon: payoutsIcon },
  ];

  return (
    <aside className="hidden lg:block fixed top-0 left-0 w-[95px] h-screen bg-white shadow-md p-[15px] overflow-y-auto z-[1000]">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-[65%] h-[50px] mx-[10px]" />
      </div>
      <nav>
        <ul className="mt-6 list-none">
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-3 mb-6 rounded-md cursor-pointer transition-transform active:scale-[0.96] hover:bg-gray-100 ${
                activeIndex === index ? "bg-[#f9fffd] rounded-[7px]" : ""
              }`}
            >
              <a href={item.href}>
                <img
                  src={item.icon}
                  alt=""
                  className={`w-[25px] mx-auto ${
                    activeIndex === index ? "opacity-100" : "opacity-60"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
