import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MyProfile from "./components/Profile";
import Inbox from "./components/Inbox";
import Support from "./components/Support";
import SupportDetails from "./components/SupportDetails";
import SupportDetailsClosed from "./components/SupportDetailsClosed";
import SupportTicket from "./components/SupportTicket";
import MyReviews from "./components/Reviews";
import BookingInfo from "./components/BookingInfo";
import LimitedDashboard from "./components/dashboard/LimitedDashboard";
import Listings from "./components/Listings";
import PayoutPage from "./components/PayoutPage";

import ListingActivity from "./components/listingactivity/ListingActivity";
import BikeListingActivity from "./components/listingbike/ListingBike";
import CarListingActivity from "./components/listingcar/ListingCar";
import TourGuides from "./components/listingtourguides/TourGuides";
import Treks from "./components/listingtrek/Treks";
import Bookings from "./components/Bookings";

// Auth Pages
import SupplierLogin from "./components/auth/Login";
// import MultiStepForm from "./components/auth/signup/MultiStepForm";
import CompleteCarListingActivity from "./components/listingcar/ListingCar";
import MultiStepForm from "./components/auth/signup/MultiStepForm";
import HotelForm from "./components/listinghotel/ListingHotel";
import Tour from "./components/listingtour/Tour";
// import SupplierSignup from "./components/auth/Signup";
// Dummy auth check (replace with real auth logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Adjust as needed
};

// Private Route wrapper
const PrivateRoute = () => {
  return isAuthenticated() ? (
    <>
      <Sidebar />
      <Header />
      <main className="flex pt-[80px] px-4 lg:px-8 lg:ml-[95px]">
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<SupplierLogin />} />
      <Route path="/signup" element={<MultiStepForm />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<LimitedDashboard />} />
        <Route path="/bike" element={<BikeListingActivity />} />
        <Route path="/signup" element={<MultiStepForm />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/car" element={<CompleteCarListingActivity />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/details/:ticketId" element={<SupportDetails />} />
        <Route path="/support/closed" element={<SupportDetailsClosed />} />
        <Route path="/support/ticket" element={<SupportTicket />} />
        <Route path="/reviews" element={<MyReviews />} />
        <Route path="/payouts" element={<PayoutPage />} />

        <Route path="/listingtour" element={<Tour />} />
        <Route path="/listingtour/edit/:listingId" element={<Tour />} />

        <Route path="/listingactivity" element={<ListingActivity />} />
        <Route
          path="/listingactivity/edit/:listingId"
          element={<ListingActivity />}
        />

        <Route path="/bike-listing" element={<BikeListingActivity />} />
        <Route
          path="/bike-listing/edit/:listingId"
          element={<BikeListingActivity />}
        />

        <Route path="/car-listing" element={<CarListingActivity />} />
        <Route
          path="/car-listing/edit/:listingId"
          element={<CarListingActivity />}
        />

        <Route path="/tourguides" element={<TourGuides />} />
        <Route path="/tourguides/edit/:listingId" element={<TourGuides />} />

        <Route path="/treks" element={<Treks />} />
        <Route path="/treks/edit/:listingId" element={<Treks />} />

        <Route path="/hotel" element={<HotelForm />} />
        <Route path="/hotel/edit/:listingId" element={<HotelForm />} />

        {/* Bookings Info */}
        <Route path="/bookings/booking-info" element={<BookingInfo />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
