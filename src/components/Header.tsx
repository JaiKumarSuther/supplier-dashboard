import React, { useState } from "react";

import searchIcon from "../../public/images/search icon.svg";
import menuIcon from "../../public/images/alignleft-svgrepo-com (1).svg";
import profileImage from "../../public/images/Eventica-Color-Logo_Final-1536x961.png";
import travelNinjaLogo from "../../public/images/travelninja logo.svg";
import homeIcon from "../../public/images/HOME icon.svg";
import profileIcon from "../../public/images/PROFILE icon.svg";
import bookingsIcon from "../../public/images/BOOKINGS icon.svg";
import listingsIcon from "../../public/images/LISTINGS.svg";
import inboxIcon from "../../public/images/INBOX icon.svg";
import supportIcon from "../../public/images/SUPPORT icon.svg";
import reviewsIcon from "../../public/images/REVIEWS icon.svg";
import payoutsIcon from "../../public/images/PAYOUTS icon.svg";
import logoutIcon from "../../public/images/log out icon.svg";
import support2Icon from "../../public/images/support2.svg";
import notificationIcon from "../../public/images/notif_1.svg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  const navItems = [
    { href: "dashboard.html", icon: homeIcon, label: "Dashboard" },
    { href: "profile.html", icon: profileIcon, label: "Profile" },
    { href: "booking.html", icon: bookingsIcon, label: "Booking" },
    { href: "listing.html", icon: listingsIcon, label: "Listing" },
    { href: "messages.html", icon: inboxIcon, label: "Messages" },
    { href: "support.html", icon: supportIcon, label: "Support" },
    { href: "reviews.html", icon: reviewsIcon, label: "Reviews" },
    { href: "payments.html", icon: payoutsIcon, label: "Payouts" },
  ];

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[9998] lg:hidden"
          onClick={toggleMenu}
        />
      )}

      <header className="fixed top-0 z-[10000] bg-white flex justify-between items-center px-4 lg:px-10 py-4 w-full lg:w-[calc(100%-95px)] lg:left-[95px]">
        {/* Search */}
        <div className="relative w-[340px] hidden sm:block border border-gray-200 rounded-full">
          <img
            src={searchIcon}
            alt="search"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[16px]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1.5 pl-10 pr-4 rounded-full outline-none text-sm text-gray-700 placeholder:text-gray-500"
          />
        </div>

        {/* Mobile Center Logo */}
        <div className="block lg:hidden absolute left-1/2 top-4 transform -translate-x-1/2">
          <img src={travelNinjaLogo} alt="Travel Ninja" width="120px" />
        </div>

        {/* Menu Icon */}
        <div className="lg:hidden">
          <img
            src={menuIcon}
            alt="Menu"
            width="26"
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-5">
          <img src={support2Icon} alt="Support" width="22px" />
          <img src={notificationIcon} alt="Notifications" width="22px" />
          <div className="flex items-center gap-2">
            <img
              src={profileImage}
              alt="User"
              className="w-[38px] h-[38px] rounded-full border"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Eventica Travels
              </p>
              <p className="text-xs text-gray-500">Tour operator</p>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-[#666262] text-sm"
          >
            <img src={logoutIcon} alt="logout" className="w-[18px]" /> Log Out
          </a>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-white z-[9999] transition-transform duration-300 ease-in-out shadow-md border-l border-gray-200 flex flex-col pt-10 px-4 overflow-y-auto lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-3 right-5 text-3xl text-gray-500"
        >
          &times;
        </button>

        <div className="flex flex-col items-start gap-3 pb-4 pt-10 border-b border-gray-200 pl-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-[60px] h-[60px] rounded-full border border-gray-200"
          />
          <h3 className="text-lg font-semibold">Eventica Travels</h3>
          <a href="profile.html" className="text-sm text-blue-600">
            View profile
          </a>
        </div>

        <ul className="mt-6">
          {navItems.map((item, index) => (
            <li key={index} className="my-3">
              <a
                href={item.href}
                className="flex items-center gap-3 text-gray-600 font-medium px-5 py-2 hover:text-[#283456]"
              >
                <img src={item.icon} alt="" className="w-[20px] h-[19px]" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 pl-6">
          <a
            href="#"
            className="flex items-center gap-2 text-red-700 font-semibold"
          >
            <img src={logoutIcon} alt="logout" className="w-[18px]" /> Log Out
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
