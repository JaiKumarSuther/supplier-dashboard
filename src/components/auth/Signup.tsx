// pages/signup.tsx
"use client";

import { useState } from "react";
import { registerUser } from "../../api/index";  // Updated import to point to /src/api

const logo = "../../public/images/ninja-logo.svg";
const supportIcon = "../../public/images/support2.svg";

const SupplierSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("supplier");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError(""); // Reset error message
    try {
      await registerUser({
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        password,
        role,
      });
      alert("Registration successful!");
      // Redirect to login page or show success message
    } catch (err: any) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-white">
      {/* Header */}
      <header className="w-full h-[50px] border-b border-[#ebebeb] flex items-center justify-between px-10 py-5">
        <div className="w-[50px]">
          <img src={logo} alt="Logo" className="w-[34px]" />
        </div>
        <div className="flex items-center text-sm gap-1 text-[#283456] font-urw leading-none">
          <img
            src={supportIcon}
            alt="Support"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="text-[#283456] mb-1">Support</p>
        </div>
      </header>

      {/* Sign Up Form */}
      <div className="w-full flex-grow flex justify-center items-center">
        <div className="bg-white border border-[#e2e2e2] rounded-xl px-8 py-6 w-[400px] text-center shadow-sm flex flex-col justify-center gap-5">
          <div>
            <h2 className="text-[23px] font-semibold text-[#1e2a49] mb-4 font-urw">
              Sign Up
            </h2>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            >
              <option value="supplier">Supplier</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error message */}
          <div>
            <button
              onClick={handleRegister}
              className="w-full bg-[#008558] text-white py-2 rounded-full font-semibold text-sm hover:brightness-110 transition"
              disabled={loading}  // Disable button while loading
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
            <div className="mt-3 text-sm text-[#283456]">
              Already have an account?{" "}
              <a href="/login" className="text-[#008558] font-medium">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#f8f8f8] py-6 flex flex-wrap justify-center items-center gap-6 text-[#303540] text-[15px] font-urw">
        <a href="#">Contact us</a>
        <a href="#">Legal notice</a>
        <a href="#">Privacy policy</a>
        <a href="#">Supplier Terms & conditions</a>
      </footer>
    </main>
  );
};

export default SupplierSignup;
