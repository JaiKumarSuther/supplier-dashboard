"use client";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Static icons
const searchIcon = "/images/search-icon.svg";
const menuIcon = "/images/alignleft-svgrepo-com-(1).svg";
const defaultProfileImage = "/images/default-user.png"; // Fallback if no image
const travelNinjaLogo = "/images/travelninja-logo.svg";
const homeIcon = "/images/home-icon.svg";
const profileIcon = "/images/profile-icon.svg";
const bookingsIcon = "/images/bookings-icon.svg";
const listingsIcon = "/images/listings.svg";
const inboxIcon = "/images/inbox-icon.svg";
const supportIcon = "/images/suppo_2.svg";
const reviewsIcon = "/images/reviews-icon.svg";
const payoutsIcon = "/images/payouts-icon.svg";
const logoutIcon = "/images/log-out-icon.svg";
const notificationIcon = "/images/notification-icon-in-header.svg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("...");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/dashboard", icon: homeIcon, label: "Dashboard" },
    { to: "/profile", icon: profileIcon, label: "Profile" },
    { to: "/bookings", icon: bookingsIcon, label: "Booking" },
    { to: "/listings", icon: listingsIcon, label: "Listing" },
    { to: "/inbox", icon: inboxIcon, label: "Messages" },
    { to: "/support", icon: supportIcon, label: "Support" },
    { to: "/reviews", icon: reviewsIcon, label: "Reviews" },
    { to: "/payouts", icon: payoutsIcon, label: "Payouts" },
  ];

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) return;

    fetch(`http://localhost:9000/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.full_name) setUserName(data.full_name);
        if (data.profile_photo) setProfilePhoto(data.profile_photo);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch user:", err);
      });
  }, []);

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[9998] lg:hidden"
          onClick={toggleMenu}
        />
      )}

      <header className="fixed top-0 z-[10000] bg-white flex justify-between items-center px-4 lg:px-10 py-4 w-full lg:w-[calc(100%-95px)] lg:left-[95px]">
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

        {/* Mobile Logo */}
        <div className="block lg:hidden absolute left-1/2 top-4 transform -translate-x-1/2">
          <img src={travelNinjaLogo} alt="Travel Ninja" width="120px" />
        </div>

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
        <div className="hidden lg:flex items-center gap-8">
          <img src={supportIcon} alt="Support" width="22px" />
          <img src={notificationIcon} alt="Notifications" width="22px" />
          <div className="flex items-center gap-2">
            <img
              src={profilePhoto || defaultProfileImage}
              alt="User"
              className="w-[32px] h-[32px] rounded-full border object-cover"
            />
            <div>
              <p className="text-base font-medium text-gray-800">{userName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#797D99]"
          >
            <img src={logoutIcon} alt="logout" className="w-[18px]" />
            Log Out
          </button>
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
            src={profilePhoto || defaultProfileImage}
            alt="Profile"
            className="w-[60px] h-[60px] rounded-full border border-gray-200 object-cover"
          />
          <h3 className="text-lg font-semibold">{userName}</h3>
          <Link to="/profile" className="text-sm text-blue-600">
            View profile
          </Link>
        </div>

        <ul className="mt-6">
          {navItems.map((item, index) => (
            <li key={index} className="my-3">
              <Link
                to={item.to}
                className={`flex items-center gap-3 text-gray-600 font-medium px-5 py-2 hover:text-[#283456] ${
                  location.pathname === item.to
                    ? "text-[#283456] font-semibold"
                    : ""
                }`}
                onClick={toggleMenu}
              >
                <img src={item.icon} alt="" className="w-[20px] h-[19px]" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 pl-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#797D99]"
          >
            <img src={logoutIcon} alt="logout" className="w-[18px]" /> Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
