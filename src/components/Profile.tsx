import AutoGenerateImage from "../../public/images/auto-generate.jpg";
import { useState } from "react";

export default function MyProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bankDetails, setBankDetails] = useState({
    bank: "",
    branchCode: "",
    accountTitle: "",
    accountNumber: "",
    iban: "",
  });

  return (
    <main className="w-full bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1C1C38]">My Profile</h1>
        <button className="text-[#06DD7C] font-medium border border-[#E2E2E2] rounded-full px-4 py-1 text-sm">
          Live
        </button>
      </div>

      {/* Section Wrapper */}
      <div className="space-y-6">
        {/* Box 1: Business Info */}
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="text-xl font-semibold text-[#1C1C38]">
              Business Information
            </h3>
          </div>
          <div className="px-6 pt-6 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={AutoGenerateImage}
                alt="avatar"
                className="w-14 h-14 rounded-full"
              />
              <button className="text-sm font-medium text-[#1C1C38] border border-gray-300 px-4 py-1 rounded-full">
                Change
              </button>
            </div>

            <div className="flex flex-wrap justify-between gap-y-6">
              {[
                { label: "Business Name", value: "Eventica Travels" , color: "text-[#707d99]" },
                { label: "Business Email", value: "info@eventicatravels.com" , color: "text-[#707d99]"  },
                { label: "Telephone", value: "..." , color: "text-[#707d99]" },
                { label: "Phone Number", value: "03093379100" , color: "text-[#707d99]" },
                { label: "Contact person's name", value: "03093379100" , color: "text-[#707d99]" },
                {
                  label: "Access to International Tourists",
                  value: "Allowed",
                  color: "text-green-600",
                },
                {
                  label: "Access to Group Tours",
                  value: "Not allowed",
                  color: "text-[#990202]",
                },
              ].map(({ label, value, color }, idx) => (
                <div key={idx} className="w-[30%] min-w-[240px]">
                  <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                    {label}
                  </label>
                  <p className={`text-sm ${color || "text-[#1C1C38]"}`}>
                    {value}
                  </p>  
                </div>
              ))}

              <div className="w-full">
                <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                  Office Address
                </label>
                <p className="text-sm text-[#707d99]">
                  Plot # F-68, 1st Floor, near Iqra University Main Campus,
                  Phase 2 Defence View Housing Society
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Account Details */}
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="text-xl font-semibold text-[#1C1C38]">
              Account details
            </h3>
          </div>
          <div className="px-6 pt-6 pb-8">
            <div className="mb-4">
              <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                Email
              </label>
              <p className="text-sm text-[#707d99]">info@eventicatravels.com</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              {[
                {
                  label: "Current Password",
                  value: currentPassword,
                  setter: setCurrentPassword,
                },
                {
                  label: "New Password",
                  value: newPassword,
                  setter: setNewPassword,
                },
                {
                  label: "Confirm New Password",
                  value: confirmPassword,
                  setter: setConfirmPassword,
                },
              ].map((item, index) => (
                <div key={index} className="flex-1 min-w-[250px]">
                  <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                    {item.label}
                  </label>
                  <input
                    type="password"
                    value={item.value}
                    onChange={(e) => item.setter(e.target.value)}
                    className="w-full border border-[#e5e7eb] p-2 rounded"
                  />
                </div>
              ))}
            </div>

            <button className="bg-[#008558] text-white px-6 py-2 rounded-full text-sm">
              Change Password
            </button>
          </div>
        </div>

        {/* Box 3: Bank Account Details */}
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="text-xl font-semibold text-[#1C1C38]">
              Bank Account Details
            </h3>
          </div>
          <div className="px-6 pt-6 pb-8">
            <div className="flex flex-col gap-4 mb-4">
                {/* First row: Bank & Branch Code */}
                <div className="flex flex-wrap gap-6">
                  {(
                    [
                      { label: "Bank", key: "bank" },
                      { label: "Branch Code", key: "branchCode" },
                    ] as const
                  ).map((field) => (
                    <div key={field.key} className="min-w-[250px]">
                      <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={bankDetails[field.key]}
                        onChange={(e) =>
                          setBankDetails((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full border border-[#e5e7eb] p-2 rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Second row: Account Title, Account Number, IBAN Number */}
                <div className="flex flex-wrap gap-6">
                  {(
                    [
                      { label: "Account Title", key: "accountTitle" },
                      { label: "Account Number", key: "accountNumber" },
                      { label: "IBAN Number", key: "iban" },
                    ] as const
                  ).map((field) => (
                    <div key={field.key} className="min-w-[250px]">
                      <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={bankDetails[field.key]}
                        onChange={(e) =>
                          setBankDetails((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full border border-[#e5e7eb] p-2 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            <button className="bg-[#008558] text-white px-6 py-2 rounded-full text-sm">
              Add Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}