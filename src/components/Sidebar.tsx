import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: homeIcon },
    { to: "/profile", icon: profileIcon },
    { to: "/bookings", icon: bookingsIcon },
    { to: "/listings", icon: listingsIcon },
    { to: "/inbox", icon: inboxIcon },
    { to: "/support", icon: supportIcon },
    { to: "/reviews", icon: reviewsIcon },
    { to: "/payouts", icon: payoutsIcon },
  ];

  return (
    <aside className="hidden lg:block fixed top-0 left-0 w-[95px] h-screen bg-white shadow-md p-[15px] overflow-y-auto z-[1000]">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-[65%] h-[50px] mx-[10px]" />
      </div>
      <nav>
        <ul className="mt-6 list-none">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            return (
              <li
                key={index}
                className={`p-3 mb-6 rounded-md transition-transform active:scale-[0.96] hover:bg-gray-100 ${
                  isActive ? "bg-[#f9fffd] rounded-[7px]" : ""
                }`}
              >
                <Link to={item.to}>
                  <img
                    src={item.icon}
                    alt=""
                    className={`w-[25px] mx-auto ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
