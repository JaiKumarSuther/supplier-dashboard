import FreeCancel from "../../public/images/Free cancellation icon.svg";
import SendIcon from "../../public/images/send-message icon.svg";
import CancelIcon from "../../public/images/cancel booking icon in booking detail.svg";
import TourImage from "../../public/images/hunza tour.png";

export default function BookingInfo() {
  return (
    <main className="w-full bg-white px-6 pt-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <h1 className="text-[23px] font-bold text-[#283456]">Booking Info</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Section */}
          <div className="flex-1 border border-[#e2e2e2] rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <p>
                <span className="text-[#283456] font-medium">ID</span>{" "}
                <span className="underline text-[#283456] font-medium">
                  F73DH-247293
                </span>
              </p>
              <button className="text-[#f59e0b] text-sm font-semibold">pending</button>
            </div>

            <p className="text-[#283456] mb-5">
              22 July 2025 <small className="text-[#868282]"> 7:21 PM</small>
            </p>

            {/* Customer Details */}
            <div className="mb-6">
              <h3 className="text-[#283456] text-[17px] font-semibold mb-2">Customer</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[15px]">
                <p className="text-[#868282]">Name</p>
                <p>Wamiq Ahmed</p>
                <p className="text-[#868282]">Country</p>
                <p>Pakistan</p>
                <p className="text-[#868282]">City</p>
                <p>Karachi</p>
                <p className="text-[#868282]">Emergency Contact</p>
                <p>Person, 03281248032</p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-6">
              <h3 className="text-[#283456] text-[17px] font-semibold mb-2">Booking</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[15px]">
                <p className="text-[#868282]">Tour</p>
                <p>9 Day Colors of Hunza Valley Cultural Tour</p>
                <p className="text-[#868282]">Type</p>
                <p>Group Tour</p>
                <p className="text-[#868282]">Departure Date</p>
                <p>17 July 2025</p>
                <p className="text-[#868282]">Starts in</p>
                <p>Lahore</p>
                <p className="text-[#868282]">Duration</p>
                <p>7 Days</p>
              </div>
            </div>

            {/* Add ons */}
            <div className="mb-4">
              <h3 className="text-[#283456] text-[17px] font-semibold mb-2">Add ons</h3>
              <p className="text-[#868282] text-[15px]">Private room</p>
            </div>

            {/* Cancellation Notice */}
            <div className="flex items-start bg-[#fffbed] p-4 rounded-md text-[14px] mb-5">
              <img src={FreeCancel} alt="cancel" className="w-4 h-4 mt-1 mr-2" />
              <p className="text-[#283456]">
                The customer can cancel this booking until
                <span className="font-bold"> 27 June 2025, 11:59 PM sharp</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="flex items-center gap-2 px-5 py-2 bg-[#fff1f1] text-[#d50606] border border-[#ffecec] rounded-full text-[15px] font-medium">
                <img src={CancelIcon} alt="cancel" className="w-[15px]" /> Cancel
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-[#008558] text-white rounded-full text-[15px] font-medium">
                <img src={SendIcon} alt="send" className="w-[18px]" /> Send a message
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[340px] border border-[#e2e2e2] rounded-xl p-4">
            <h3 className="text-[#283456] text-2xl font-semibold mb-4">Booking Summary</h3>

            <div className="flex gap-3 mb-4">
              <img
                src={TourImage}
                alt="tour"
                className="w-[100px] rounded-md object-cover"
              />
              <div>
                <h4 className="text-[#283456] text-[15px] font-bold leading-tight">
                  9 Day Colors Of Hunza Valley Cultural Tour
                </h4>
                <p className="text-[14px] text-[#283456]">3 Adult, 1 Child</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-[15px] mb-4">
              <p className="text-[#868282]">Type</p>
              <p>Group tour</p>
              <p className="text-[#868282]">Date</p>
              <p>26 Aug 2025</p>
              <p className="text-[#868282]">Duration</p>
              <p>9 Days</p>
              <p className="text-[#868282]">Add Ons</p>
              <p>Private room, Extended trek</p>
            </div>

            <div className="border-t border-[#e2e2e2] my-4"></div>

            <p className="font-semibold text-[15px] mb-2">Amount</p>
            <div className="grid grid-cols-2 gap-y-1 text-[15px]">
              <p className="text-[#868282]">3 Adults</p>
              <p>Rs 624,000</p>
              <p className="text-[#868282]">1 Child</p>
              <p>Rs 107,000</p>
              <p className="text-[#868282]">Private room</p>
              <p>Rs 96,000</p>
              <p className="text-[#868282]">Extended trek</p>
              <p>Rs 123,000</p>
            </div>

            <div className="border-t border-[#e2e2e2] my-4"></div>

            <p className="font-semibold text-[15px]">Total</p>
            <p className="text-[#04a550] font-bold text-[16px]">960,000</p>
          </div>
        </div>
      </div>
    </main>
  );
}