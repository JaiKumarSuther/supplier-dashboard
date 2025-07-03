const ninjaLogo = "/images/ninja-logo.svg";
const autoGenerate = "/images/auto-generate.jpg";

const SupportDetailsClosed = () => {
  return (
    <main className="min-h-screen w-[950px] bg-white">
      <div className="flex flex-col px-6 py-6">
        {/* Header */}
        <div className="flex justify-between items-center py-2 mt-[-5px]">
          <h1 className="text-[26px] font-semibold text-[#283456]">SUPPORT</h1>
        </div>

        {/* Ticket Info */}
        <div className="mt-5 pb-[100px]">
          <h2 className="text-[25px] font-bold text-[#1c1c38] mb-4">
            Ticket <span className="text-[#999]">23910</span>
          </h2>
          <div className="bg-[#fff6f6] text-[#a30000] py-1 rounded text-center w-[70px] font-medium uppercase border border-[#f5c2c2]">
            Closed
          </div>

          {/* Request */}
          <div className="w-[90%] mb-8 mt-4">
            <h2 className="text-[19px] font-semibold mb-2 text-[#283456]">
              Urgent Issue with my tour booking as the operator is asking me to cancel the booking.
            </h2>
            <p className="text-[15px] text-[#283456] mb-3">
              Hello, I booked the Fairy Meadows & Nanga Parbat Base Camp Trek for April 15, but I haven't received my confirmation email yet. My payment was deducted, but my booking still says "Pending". Can you please confirm my booking? I need to finalize my travel plans. Looking forward to your response.
            </p>
            <p className="text-[15px] font-normal mt-2">
              <span className="font-normal">Related to</span> Bookings
            </p>
          </div>

          {/* Support Reply */}
          <div className="flex gap-4 bg-white p-4 rounded-[13px] border border-[#e2e2e2] mt-6 w-[85%]">
            <div className="w-full">
              <div className="flex items-center gap-2 relative w-full">
                <img src={ninjaLogo} alt="Support Agent" className="w-[35px] h-[35px] rounded-full" />
                <div>
                  <p className="text-[14px] text-[#283456] font-medium">Person</p>
                  <p className="text-[14px] text-[#283456] font-medium">customer support</p>
                </div>
                <p className="absolute right-5 text-[#999] text-[13px] font-light">25 July 2025 17:11</p>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <p className="text-[15px] text-[#283456] mt-1 mb-2">
                  Hey, thank you for reaching out to us. It looks like you didn’t receive the confirmation email due to a system issue; we apologize for that. I can confirm that your booking is indeed confirmed.
                </p>
                <p className="text-[15px] text-[#283456] mb-2">
                  As for the pending status, you're seeing it because until the cancellation date, your booking remains in a pending state. However, once the cancellation date passes, your booking’s status will change to confirmed.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Reply */}
          <div className="flex gap-4 bg-white p-4 rounded-[13px] border border-[#e2e2e2] mt-6 w-[85%]">
            <div className="w-full">
              <div className="flex items-center gap-2 relative w-full">
                <img src={autoGenerate} alt="Customer" className="w-[35px] h-[35px] rounded-full" />
                <div>
                  <p className="text-[14px] text-[#283456] font-medium">Wamiq</p>
                </div>
                <p className="absolute right-5 text-[#999] text-[13px] font-light">25 July 2025 17:11</p>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <p className="text-[15px] text-[#283456] mt-1 mb-2">
                  Thank you for clarifying the issue, I appreciate that.
                </p>
              </div>
            </div>
          </div>

          {/* Closed Message */}
          <div className="mt-12 w-[85%] p-6 bg-[#f9f9f9] rounded-[10px] border border-[#e2e2e2] text-center">
            <p className="text-[#a30000] font-semibold text-[15px] uppercase mb-2">Closed</p>
            <p className="text-[#555] text-[14px]">
              This request is closed for comments. You can create a follow-up.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportDetailsClosed;
