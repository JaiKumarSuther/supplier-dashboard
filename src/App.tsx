import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import MyProfile from "./components/Profile";
import Inbox from "./components/Inbox";
import Support from "./components/Support";
import SupportDetails from "./components/SupportDetails";
import SupportDetailsClosed from "./components/SupportDetailsClosed";
import SupportTicket from "./components/SupportTicket";
import MyReviews from "./components/Reviews";
import PayoutInfoProcessed from "./components/PayoutInfo";
import PayoutInfoPending from "./components/PayoutInfoPending";
import LimitedDashboard from "./components/dashboard/LimitedDashboard";
import BookingPage from "./components/BookingPage";
import Listings from "./components/Listings";
import PayoutPage from "./components/PayoutPage";

function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <div>
        <main className="flex pt-[80px] p-4 min-h-screen lg:ml-[95px]">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<LimitedDashboard />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/details" element={<SupportDetails />} />
            <Route path="/support/closed" element={<SupportDetailsClosed />} />
            <Route path="/support/ticket" element={<SupportTicket />} />
            <Route path="/reviews" element={<MyReviews />} />
            <Route path="/payouts" element={<PayoutPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
