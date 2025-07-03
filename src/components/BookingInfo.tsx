"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Using useParams to get the dynamic booking ID
import { fetchData } from "../api/index"; // Import fetch utility

const FreeCancel = "../../public/images/free-cancellation-icon.svg";
const SendIcon = "../../public/images/send-message-icon.svg";
const CancelIcon = "../../public/images/cancel-booking-icon-in-booking-detail.svg";
const TourImage = "../../public/images/hunza-tour.png";

// Define the Booking type to ensure proper type checking
export interface Booking {
  booking_id: string;
  tour_name: string;
  customer_name: string;
  selected_date: string;
  selected_people: number;
  selected_add_ons: string[];
  total_price: number;
  booking_status: "confirmed" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export default function BookingInfo() {
  const { bookingId } = useParams<{ bookingId: string }>(); // Retrieve the bookingId from the URL params
  const [booking, setBooking] = useState<Booking | null>(null); // State for booking data


  useEffect(() => {
    const getBookingDetails = async () => {
      if (bookingId) {
        try {
          const fetchedBooking = await fetchData<Booking>(`/bookings/${bookingId}`);
          setBooking(fetchedBooking);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      }
    };

    getBookingDetails();
  }, [bookingId]); // Trigger API call whenever the bookingId changes

  if (!booking) {
    return <div>Loading...</div>; // Show a loading message while the data is being fetched
  }

  return (
    <main className="w-full bg-white p-0 lg:px-6 lg:pt-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <h1 className="text-[26px] font-semibold text-[#283456]">Booking Info</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 border border-[#e2e2e2] rounded-xl pl-8 pt-5 pr-9 pb-6 mb-28">
            <div className="flex gap-5 items-center mb-3">
              <p>
                <span className="text-[#283456] font-normal text-[15px]">ID</span>{" "}
                <span className="text-[#959BAD] font-normal text-[15px]">{booking.booking_id}</span>
              </p>
              <button className="text-[#FFAA00] text-sm font-medium text-[15px]">
                {booking.booking_status === "confirmed" ? "pending" : booking.booking_status}
              </button>
            </div>

            <p className="text-[#000000] mb-5 text-[16px]">
              {new Date(booking.created_at).toLocaleDateString()}{" "}
              <small className="text-[#707D99] text-[15px]">{new Date(booking.created_at).toLocaleTimeString()}</small>
            </p>

            {/* Customer Details */}
            <div className="mb-5">
              <h3 className="text-[#283456] text-[23px] font-semibold mb-2">Customer</h3>
              <div className="flex gap-24">
                <div className="flex flex-col gap-1 w-36">
                  <p className="text-[#707D99] text-[15px]">Name</p>
                  <p className="text-[#707D99] text-[15px]">Country</p>
                  <p className="text-[#707D99] text-[15px]">City</p>
                  <p className="text-[#707D99] text-[15px]">Emergency Contact</p>
                </div>

                <div className="flex flex-col gap-1 max-w-60">
                  <p className="text-[#283456] text-[15px] font-semibold">{booking.customer_name}</p>
                  <p className="text-[#283456] text-[15px] font-semibold">Pakistan</p>
                  <p className="text-[#283456] text-[15px] font-semibold">Karachi</p>
                  <p className="text-[#283456] text-[15px] font-semibold">Person, 03281248032</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-5">
              <h3 className="text-[#283456] text-[23px] font-semibold mb-2">Booking</h3>
              <div className="flex gap-24">
                <div className="flex flex-col gap-1 w-36">
                  <p className="text-[#707D99] text-[15px] pb-5">Tour</p>
                  <p className="text-[#707D99] text-[15px]">Type</p>
                  <p className="text-[#707D99] text-[15px]">Departure Date</p>
                  <p className="text-[#707D99] text-[15px]">Starts in</p>
                  <p className="text-[#707D99] text-[15px]">Duration</p>
                </div>

                <div className="flex flex-col gap-1 max-w-60">
                  <p className="text-[#283456] text-[15px] font-semibold">{booking.tour_name}</p>
                  <p className="text-[#283456] text-[15px] font-semibold">Group Tour</p>
                  <p className="text-[#283456] text-[15px] font-semibold">{booking.selected_date}</p>
                  <p className="text-[#283456] text-[15px] font-semibold">Lahore</p>
                  <p className="text-[#283456] text-[15px] font-semibold">7 Days</p>
                </div>
              </div>
            </div>

            {/* Add ons */}
            <div className="mb-4">
              <h3 className="text-[#283456] text-[23px] font-semibold mb-2">Add ons</h3>
              {booking.selected_add_ons.length ? (
                booking.selected_add_ons.map((addon: string, index: number) => (
                  <p key={index} className="text-[#707D99] text-[15px]">{addon}</p>
                ))
              ) : (
                <p className="text-[#707D99] text-[15px]">No Add-ons</p>
              )}
            </div>

            {/* Cancellation Notice */}
            <div className="flex items-start bg-[#fffbed] p-4 rounded-md text-[14px] mb-5">
              <img src={FreeCancel} alt="cancel" className="w-[15px] h-[16px] mt-1 mr-2" />
              <p className="text-[#283456] text-[15px] mb-5">
                The customer can cancel this booking until{" "}
                <span className="font-semibold"> 27 June 2025, 11:59 PM sharp</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-8">
              <button className="flex items-center gap-2 px-5 py-2 bg-[#fff1f1] text-[#B50000] border border-[#ffecec] rounded-full text-[15px] font-medium">
                <img src={CancelIcon} alt="cancel" className="w-[15px]" /> Cancel
              </button>
              <button className="flex items-center gap-2 px-7 py-2 bg-[#008558] text-white rounded-full text-[15px] font-medium">
                <img src={SendIcon} alt="send" className="w-[18px]" /> Send a message
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[340px] border border-[#e2e2e2] rounded-xl p-4 h-1/6">
            <h3 className="text-[#283456] text-[23px] font-semibold mb-4">Booking Summary</h3>

            <div className="flex gap-3 mb-4">
              <img
                src={TourImage}
                alt="tour"
                className="w-[105px] rounded-md object-cover"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-[#283456] text-[17px] font-bold leading-tight">
                  {booking.tour_name}
                </h4>
                <p className="text-[15px] text-[#808080]">{booking.selected_people} Adult, 1 Child</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-[15px] mb-4">
              <p className="text-[#707D99]">Type</p>
              <p className="text-[#283456]">Group tour</p>
              <p className="text-[#707D99]">Date</p>
              <p className="text-[#283456]">{booking.selected_date}</p>
              <p className="text-[#707D99]">Duration</p>
              <p className="text-[#283456]">7 Days</p>
              <p className="text-[#707D99]">Add Ons</p>
              <p className="text-[#283456]">{booking.selected_add_ons.join(", ")}</p>
            </div>

            <div className="border-t border-[#e2e2e2] my-4"></div>

            <p className="font-semibold text-[18px] mb-2">Amount</p>
            <div className="grid grid-cols-2 gap-y-1 text-[15px]">
              <p className="text-[#707D99]">Total</p>
              <p className="text-[#283456]">Rs {booking.total_price.toLocaleString()}</p>
            </div>

            <div className="border-t border-[#e2e2e2] my-4"></div>

            <p className="font-semibold text-[18px] text-[#283456]">Total</p>
            <p className="text-[#008558] font-bold text-[18px] mb-4">
              Rs {booking.total_price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
