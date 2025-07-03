"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


const AutoGenerateImage = "/images/auto-generate.jpg";

type BankDetailKey =
  | "bank"
  | "branchCode"
  | "accountTitle"
  | "accountNumber"
  | "iban";

export default function MyProfile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [userData, setUserData] = useState<any>({
    full_name: "",
    email: "",
    phone_number: "",
    telephone_number: "",
  });

  const [supplierData, setSupplierData] = useState<any>({
    profile_data: {
      contact_name: "",
      address: "",
      international_tourists: false,
      group_tours: false,
    },
  });

  const [bankDetails, setBankDetails] = useState<Record<BankDetailKey, string>>(
    {
      bank: "",
      branchCode: "",
      accountTitle: "",
      accountNumber: "",
      iban: "",
    }
  );

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user_id");
    const supplierId = localStorage.getItem("supplier_id");

    if (!storedToken || !storedUserId) return;

    setToken(storedToken);
    setUserId(storedUserId);

    // ✅ Fetch user data
    fetch(`http://localhost:9000/api/v1/users/${storedUserId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ userData full response:", data); // 🔍 Log user data
        setUserData(data);
        if (data.bank_account) setBankDetails(data.bank_account);
        if (data.profile_photo) setProfileImage(data.profile_photo);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch user data:", err);
      });

    // ✅ Fetch supplier data
    fetch(`http://localhost:9000/api/v1/suppliers/${supplierId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ supplierData full response:", data); // 🔍 Log supplier data
        setSupplierData(data);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch supplier data:", err);
      });
  }, []);

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !userId || !token) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setProfileImage(base64); // show preview

      try {
        const res = await fetch(
          `http://localhost:9000/api/v1/users/profile-image/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ profile_photo: base64 }),
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to upload image");
        }

        toast.success("Profile image updated");
      } catch (err: any) {
        toast.error(`Failed to update image: ${err.message}`);
      }
    };

    reader.readAsDataURL(file); // Convert to base64
  };

  const triggerImageUpload = () => fileInputRef.current?.click();

  const handleBankDetailsSave = async () => {
if (!userId || !token) {
  toast.error("Missing credentials");
  return;
}
    try {
      const res = await fetch(
        `http://localhost:9000/api/v1/users/bank/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bankDetails),
        }
      );

      if (!res.ok) throw new Error("Bank update failed");
      toast.success("Bank details updated");
    } catch (err: any) {
      toast.error(`Bank update failed: ${err.message}`);
    }
  };

  const handleChangePassword = async () => {
    if (!userId || !token) return toast.error("Missing user credentials.");
    if (!currentPassword || !newPassword || !confirmPassword)
      return toast.error("All password fields are required.");
    if (newPassword !== confirmPassword)
      return toast.error("New password and confirmation do not match.");

    try {
      const res = await fetch(`http://localhost:9000/api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update password.");
      }

     toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(`Password change failed: ${error.message}`);
    }
  };

  useEffect(() => {
    console.log("profile_data →", supplierData?.profile_data);
  }, [supplierData]);

  return (
    <main className="w-full bg-white md:p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          My Profile
        </h1>
        <button className="text-[#06DD7C] font-medium border border-[#E2E2E2] rounded-full px-4 py-1 text-sm">
          Live
        </button>
      </div>

      <div className="space-y-6">
        {/* Business Info */}
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="text-xl font-semibold text-[#1C1C38]">
              Business Information
            </h3>
          </div>
          <div className="px-6 pt-6 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={profileImage || AutoGenerateImage}
                alt="avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
              <button
                onClick={triggerImageUpload}
                className="text-sm font-medium text-[#1C1C38] border border-gray-300 px-4 py-1 rounded-full"
              >
                Change
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-wrap justify-between gap-y-6">
              {[
                {
                  label: "Business Name",
                  value:
                    supplierData?.profile_data?.property_name ||
                    supplierData?.profile_data?.business_name ||
                    userData?.full_name,
                },
                ,
                { label: "Business Email", value: userData.email },
                { label: "Telephone", value: userData.telephone_number },
                { label: "Phone Number", value: userData.phone_number },
                {
                  label: "Contact Person",
                  value: supplierData?.profile_data?.contact_name || "",
                },
                {
                  label: "Access to International Tourists",
                  value: supplierData?.profile_data?.international_tourists
                    ? "Allowed"
                    : "Not Allowed",
                },
                {
                  label: "Access to Group Tours",
                  value: supplierData?.profile_data?.group_tours
                    ? "Allowed"
                    : "Not Allowed",
                },
              ]
                .filter(
                  (item): item is { label: string; value: any } =>
                    item !== undefined
                )
                .map((item, idx) => (
                  <div key={idx} className="w-[30%] min-w-[240px]">
                    <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                      {item.label}
                    </label>
                    <p className="text-sm text-[#707d99]">{item.value}</p>
                  </div>
                ))}

              <div className="w-full">
                <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                  Office Address
                </label>
                <p className="text-sm text-[#707d99]">
                  {supplierData?.profile_data?.address || ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="text-xl font-semibold text-[#1C1C38]">
              Account Details
            </h3>
          </div>
          <div className="flex flex-col gap-5 px-6 pt-6 pb-8">
            <div className="mb-4">
              <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                Email
              </label>
              <p className="text-sm text-[#707d99]">{userData.email}</p>
            </div>
            <div className="flex gap-6 mb-4 flex-wrap">
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
                <div key={index}>
                  <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                    {item.label}
                  </label>
                  <input
                    type="password"
                    value={item.value}
                    onChange={(e) => item.setter(e.target.value)}
                    className="border border-[#e5e7eb] p-2 rounded w-[280px] outline-none focus:border-black"
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-[#008558] text-white w-[160px] px-6 py-2 rounded-full text-sm"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Bank Account Details */}
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="text-xl font-semibold text-[#1C1C38]">
              Bank Account Details
            </h3>
          </div>
          <div className="px-6 pt-6 pb-8">
            <div className="flex flex-wrap gap-6">
              {(
                [
                  { label: "Bank", key: "bank" },
                  { label: "Branch Code", key: "branchCode" },
                  { label: "Account Title", key: "accountTitle" },
                  { label: "Account Number", key: "accountNumber" },
                  { label: "IBAN", key: "iban" },
                ] as { label: string; key: BankDetailKey }[]
              ).map(({ label, key }, idx) => (
                <div key={idx} className="min-w-[250px]">
                  <label className="text-sm font-semibold text-[#1C1C38] block mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={bankDetails[key]}
                    onChange={(e) =>
                      setBankDetails((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full border border-[#e5e7eb] p-2 rounded outline-none focus:border-black"
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-[#008558] w-[160px] text-white px-6 py-2 rounded-full text-sm mt-6"
              onClick={handleBankDetailsSave}
            >
              Add Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
