const notifIcon = "/images/notif_1.svg";

export default function NotificationPopup() {
  return ( 
    <main className="w-full max-w-md bg-white rounded-xl shadow p-5 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-[#ebebeb]">
        <img src={notifIcon} alt="notification" width={18} />
        <h3 className="text-lg font-semibold text-[#283456]">Notifications</h3>
      </div>

      <div className="mt-4 flex flex-col gap-6 max-h-[400px] overflow-y-auto">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#3497f7] bg-[#f3fbff] px-2 py-1 rounded w-fit inline-block">
            new booking
          </h3>
          <p className="text-[#283456] text-[15px]">
            You have a new booking for <strong>Day Colors of Hunza Valley Cultural Tour</strong> on 26th Aug 2025.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#f98c69] bg-[#fff9f5] px-2 py-1 rounded w-fit inline-block">
            booking cancelled
          </h3>
          <p className="text-[#283456] text-[15px]">
            Wamiq Ahmed has canceled their booking for <strong>14 Days K2 Base Camp Trekking Expedition.</strong>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#37cf83] bg-[#f6fffc] px-2 py-1 rounded w-fit inline-block">
            payout processed
          </h3>
          <p className="text-[#283456] text-[15px]">
            Your payout of <strong>PKR 456,400</strong> for <strong>booking# F81237-23478</strong> has been processed.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#7d24fe] bg-[#faf2ff] px-2 py-1 rounded w-fit inline-block">
            review received
          </h3>
          <p className="text-[#283456] text-[15px]">
            <strong>Wamiq Ahmed</strong> has left a <strong>4-star</strong> review on your listing.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#fed421] bg-[#fffcf3] px-2 py-1 rounded w-fit inline-block">
            support ticket
          </h3>
          <p className="text-[#283456] text-[15px]">
            travelninja support has responded to your ticket related to <strong>booking.</strong>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#51f1a2] bg-[#f6fffc] px-2 py-1 rounded w-fit inline-block">
            listing approved
          </h3>
          <p className="text-[#283456] text-[15px]">
            Your listing <strong>14 Day K2 Base Camp Trekking Expedition</strong> has been approved.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#f98c69] bg-[#fff9f5] px-2 py-1 rounded w-fit inline-block">
            listing rejected
          </h3>
          <p className="text-[#283456] text-[15px]">
            Your listing <strong>9 Day Colors of Hunza Valley Cultural Tour</strong> has been rejected.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#51f1a2] bg-[#f6fffc] px-2 py-1 rounded w-fit inline-block">
            changes approved
          </h3>
          <p className="text-[#283456] text-[15px]">
            Your requested changes for <strong>8 Days Chitral Polo Festival Cultural Tour</strong> have been approved and are now live.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#f98c69] bg-[#fff9f5] px-2 py-1 rounded w-fit inline-block">
            changes rejected
          </h3>
          <p className="text-[#283456] text-[15px]">
            Your requested changes for <strong>8 Days Chitral Polo Festival Cultural Tour</strong> were rejected.
          </p>
        </div>
      </div>
    </main>
  );
}