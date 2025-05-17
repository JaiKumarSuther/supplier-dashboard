export default function PayoutInfoProcessed() {
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
                  <td className="text-[#283456] font-medium">April 26, 2025</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Transaction Ref</td>
                  <td className="text-[#283456] font-medium">9920392194382093809283</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Paid From (Bank)</td>
                  <td className="text-[#283456] font-medium">Standard Chartered</td>
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
                  <td className="text-[#283456] font-medium">TN-2025-0378</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Status</td>
                  <td className="text-[#04a550] font-medium">Processed</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Booking ID</td>
                  <td className="text-[#283456] underline font-medium cursor-pointer">FI2394204</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Due on</td>
                  <td className="text-[#e0b500] font-medium">April 25, 2025</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Processed On</td>
                  <td className="text-[#04a550] font-medium">April 26, 2025</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Total Amount</td>
                  <td className="text-[#283456] font-medium">Rs 96,000</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Commission Deducted (18%)</td>
                  <td className="text-[#283456] font-medium">Rs 17,280</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">WHT Tax Deducted</td>
                  <td className="text-[#283456] font-medium">Rs 960</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Net Payout Amount</td>
                  <td className="text-[#283456] font-medium">PKR 78,720</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Payout Method</td>
                  <td className="text-[#283456] font-medium">Bank Transfer</td>
                </tr>
                <tr>
                  <td className="text-[#707d99] font-normal">Bank</td>
                  <td className="text-[#283456] font-medium">Standard Chartered</td>
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