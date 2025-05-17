export default function PayoutInfoPending() {
  return (
    <main className="px-6 py-4 w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#283456]">Payout Info</h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-[38%] border border-[#e2e2e2] rounded-lg p-6">
          {/* Summary Section */}
          <div className="pb-4">
            <h2 className="text-xl font-bold text-[#283456] mb-3">Summary</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="text-[#707d99] font-medium w-[60%] py-1">Processed On</td>
                  <td className="text-[#283456] font-medium">&#8212;</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Transaction Ref</td>
                  <td className="text-[#283456] font-medium">&#8212;</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Paid From (Bank)</td>
                  <td className="text-[#283456] font-medium">&#8212;</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Details Section */}
          <div>
            <h2 className="text-xl font-bold text-[#283456] mb-3">Details</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="text-[#707d99] font-medium w-[60%] py-1">Payout ID</td>
                  <td className="text-[#283456] font-medium">TN-2025-0378</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Status</td>
                  <td className="text-[#e0b500] font-medium">Upcoming</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Booking ID</td>
                  <td className="text-[#283456] font-medium underline">FI2394204</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Due on</td>
                  <td className="text-[#e0b500] font-medium">April 25, 2025</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Processed On</td>
                  <td className="text-[#283456] font-medium">&#8212;</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Total Amount</td>
                  <td className="text-[#283456] font-medium">PKR 96,000</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Commission Deducted (18%)</td>
                  <td className="text-[#283456] font-medium">PKR 17,280</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Net Payout Amount</td>
                  <td className="text-[#283456] font-medium">PKR 78,720</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Payout Method</td>
                  <td className="text-[#283456] font-medium">&#8212;</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-medium py-1">Bank</td>
                  <td className="text-[#283456] font-medium">&#8212;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}