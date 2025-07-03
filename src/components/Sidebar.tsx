import { Link, useLocation } from "react-router-dom";

const logo = "../../public/images/NINJA-logo.svg";
const homeIcon = "../../public/images/home-icon.svg";
const profileIcon = "../../public/images/profile-icon.svg";
const bookingsIcon = "../../public/images/bookings-icon.svg";
const listingsIcon = "../../public/images/listings.svg";
const inboxIcon = "../../public/images/inbox-icon.svg";
const supportIcon = "../../public/images/support-icon.svg";
const reviewsIcon = "../../public/images/reviews-icon.svg";
const payoutsIcon = "../../public/images/payouts-icon.svg";

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
      <aside
          className=" custom-scrollbar hidden lg:block fixed top-0 left-0 w-[95px] h-screen bg-white shadow-md p-[15px] overflow-y-auto z-[1000]"
          style={{
            scrollbarWidth: 'thin' ,
            scrollbarColor: 'rgba(235,235,235,255) transparent',
          }}
        >
          <style>
            {`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }

              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(255, 0, 0, 1); /* default color */
                border-radius: 3px;
                transition: background-color 0.3s ease;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(0, 0, 255, 1); /* hover color */
              }
            `}
          </style>

          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-[65%] h-[50px] mx-[10px]" />
          </div>
          <nav>
            <ul className="mt-6 list-none">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.to;

                return (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className={`block p-3 mb-6 rounded-md transition-transform active:scale-[0.96] hover:bg-gray-100 ${
                        isActive ? "bg-[#f9fffd] rounded-[7px]" : ""
                      }`}
                    >
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