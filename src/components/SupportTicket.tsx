const NinjaLogo = "/images/ninja-logo.svg";
const AutoGenerate = "/images/auto-generate.jpg";

const SupportTicket = () => {
  return (
    <main className="w-full bg-white">
      <div className="main-container px-4">
        {/* Page Header */}
        <div className="my-4">
          <h1 className="text-2xl font-bold text-[#283456]">SUPPORT</h1>
        </div>

        {/* Ticket Details */}
        <div className="openReq-container mt-6">
          <h2 className="text-[25px] font-bold text-[#1c1c38]">
            Ticket <span className="text-[#999]">23910</span>
          </h2>
          <div className="open mt-2 bg-[#f6fff6] text-[#067f5f] rounded px-2 text-center w-[60px] font-medium">
            Open
          </div>

          {/* Original Message */}
          <div className="openReq mt-6 w-full max-w-[90%]">
            <h2 className="req-title text-[19px] font-semibold mb-2">
              Urgent Issue with my tour booking as the operator is asking me to cancel the booking.
            </h2>
            <p className="req-text text-[15px] text-[#283456]">
              Hello, I booked the Fairy Meadows & Nanga Parbat Base Camp Trek
              for April 15, but I haven't received my confirmation email yet.
              My payment was deducted, but my booking still says "Pending".
              Can you please confirm my booking? I need to finalize my travel
              plans. Looking forward to your response.
            </p>
            <p className="req-related text-[15px] mt-3">
              <span className="font-normal">Related to</span> Bookings
            </p>
          </div>

          {/* Support Reply */}
          <div className="reply-card mt-6 flex gap-4 border border-[#e2e2e2] rounded-[13px] p-4 w-[85%]">
            <div className="support-reply w-full">
              <div className="person-info flex items-center gap-3 relative">
                <img src={NinjaLogo} alt="Support" className="w-[35px] h-[35px] rounded-full" />
                <div>
                  <p className="text-[14px] font-medium text-[#283456]">Person</p>
                  <p className="text-[14px] text-[#283456]">Customer Support</p>
                </div>
                <p className="date absolute right-5 text-[13px] text-[#999] font-light">25 July 2025 17:11</p>
              </div>
              <div className="reply mt-4 flex flex-col gap-2 text-[#283456]">
                <p>
                  Hey, thank you for reaching out to us. It looks like you didn’t receive
                  the confirmation email due to a system issue. We apologize for that.
                  I can confirm that your booking is indeed confirmed.
                </p>
                <p>
                  As for the pending status, you're seeing it because until the cancellation
                  date passes, your booking remains in a pending state. It will switch to confirmed afterward.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Reply */}
          <div className="reply-card mt-4 flex gap-4 border border-[#e2e2e2] rounded-[13px] p-4 w-[85%]">
            <div className="customer-reply w-full">
              <div className="person-info flex items-center gap-3 relative">
                <img src={AutoGenerate} alt="Customer" className="w-[35px] h-[35px] rounded-full" />
                <div>
                  <p className="text-[14px] font-medium text-[#283456]">Wamiq</p>
                </div>
                <p className="date absolute right-5 text-[13px] text-[#999] font-light">25 July 2025 17:11</p>
              </div>
              <div className="reply mt-4 text-[#283456]">
                <p>Thank you for clarifying the issue, I appreciate that.</p>
              </div>
            </div>
          </div>

          {/* Ticket Closed */}
          <div className="request-closed mt-10 ml-1">
            <p className="closed bg-[#ededed] text-[#666] px-4 py-1 rounded-full text-sm w-[90px] text-center">
              Closed
            </p>
            <p className="text-[#707d99] mt-2">
              This request is closed for comments. You can create a follow-up.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportTicket;
