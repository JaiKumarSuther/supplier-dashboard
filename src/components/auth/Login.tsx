"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const logo = "../../public/images/ninja-logo.svg";
const supportIcon = "../../public/images/support2.svg";

const SupplierLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    // setError("");

    try {
      const response = await fetch("http://localhost:9000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || "Login failed");
      }

      const data = await response.json();

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user.user_id);

      toast.success("Login successful ✅");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-white">
      <header className="w-full h-[50px] border-b border-[#ebebeb] flex items-center justify-between px-10 py-5">
        <div className="w-[50px]">
          <img src={logo} alt="Logo" className="w-[34px]" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm gap-1 text-[#283456] font-urw leading-none">
            <img
              src={supportIcon}
              alt="Support"
              className="w-[17px] h-[17px] object-contain"
            />
            <p className="text-[#283456] mb-1">Support</p>
          </div>
        </div>
      </header>

      <div className="w-full flex-grow flex justify-center items-center">
        <div className="bg-white border border-[#e2e2e2] rounded-xl px-8 py-6 w-[400px] text-center shadow-sm flex flex-col justify-center gap-5">
          <div>
            <h2 className="text-[23px] font-semibold text-[#1e2a49] mb-4 font-urw">
              Sign In
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* {error && <p className="text-red-500 text-sm">Login Failed</p>} */}
          <div>
            <button
              onClick={handleLogin}
              className="w-full bg-[#008558] text-white py-2 rounded-full font-semibold text-sm hover:brightness-110 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
            <div className="mt-3 text-sm text-[#283456]">
              Don't have an account?
              <a href="/signup" className="text-[#008558] font-medium">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full bg-[#f8f8f8] py-6 flex flex-wrap justify-center items-center gap-6 text-[#303540] text-[15px] font-urw">
        <a href="#">Contact us</a>
        <a href="#">Legal notice</a>
        <a href="#">Privacy policy</a>
        <a href="#">Supplier Terms & conditions</a>
      </footer>
    </main>
  );
};

export default SupplierLogin;
