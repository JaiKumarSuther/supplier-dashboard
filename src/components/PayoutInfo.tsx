import { useState, useEffect } from "react";
import { fetchData } from "../api/index"; // Import the fetchData function

export default function PayoutInfoProcessed() {
  const [payout, setPayout] = useState<any>(null);
  const payoutId = "TN-2025-0378"; // Assuming this is passed dynamically (or fetched via params, etc.)

  useEffect(() => {
    const fetchPayoutInfo = async () => {
      try {
        const payoutDetails = await fetchData(`/payouts/${payoutId}`);
        setPayout(payoutDetails);
      } catch (error) {
        console.error("Error fetching payout info:", error);
      }
    };

    fetchPayoutInfo();
  }, [payoutId]);

  if (!payout) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full bg-white px-5 md:px-10 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1c1c38]">Payout Info</h1>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full md:w-[420px] border border-[#e2e2e2] rounded-xl px-5 py-7">
          <div className="pb-6">
            <h2 className="text-2xl font-bold text-[#1c1c38] mb-4">Summary</h2>
            <table className="w-full text-left text-sm">
              <tbody>
                <tr>
                  <td className="text-[#707d99] w-[60%] font-normal">Processed On</td>
                  <td className="text-[#283456] font-medium">{payout.processedOn}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Transaction Ref</td>
                  <td className="text-[#283456] font-medium">{payout.transactionRef}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Paid From (Bank)</td>
                  <td className="text-[#283456] font-medium">{payout.bank}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pb-8">
            <h2 className="text-2xl font-bold text-[#1c1c38] mb-4">Details</h2>
            <table className="w-full text-left text-sm">
              <tbody>
                <tr>
                  <td className="text-[#707d99] w-[60%] font-normal">Payout ID</td>
                  <td className="text-[#283456] font-medium">{payout.id}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Status</td>
                  <td className="text-[#04a550] font-medium">{payout.status}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Booking ID</td>
                  <td className="text-[#283456] underline font-medium cursor-pointer">{payout.bookingId}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Due on</td>
                  <td className="text-[#e0b500] font-medium">{payout.dueOn}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Processed On</td>
                  <td className="text-[#04a550] font-medium">{payout.processedOn}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Total Amount</td>
                  <td className="text-[#283456] font-medium">{payout.totalAmount}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Commission Deducted</td>
                  <td className="text-[#283456] font-medium">{payout.commissionDeducted}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">WHT Tax Deducted</td>
                  <td className="text-[#283456] font-medium">{payout.whtTaxDeducted}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Net Payout Amount</td>
                  <td className="text-[#283456] font-medium">{payout.netAmount}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Payout Method</td>
                  <td className="text-[#283456] font-medium">{payout.payoutMethod}</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Bank</td>
                  <td className="text-[#283456] font-medium">{payout.bank}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#008558] text-white text-center py-2 rounded-full text-[15px] font-medium cursor-pointer">
            Contact support
          </div>
        </div>
      </div>
    </main>
  );
}
