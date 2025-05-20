"use client";

import logo from "../../../public/images/NINJA logo.svg";
import supportIcon from "../../../public/images/support2.svg";

const SupplierLogin = () => {
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

      {/* Login Form */}
      <div className="w-full flex-grow flex justify-center items-center">
        <div className="bg-white border border-[#e2e2e2] rounded-xl px-8 py-6 w-[400px] h-[340px] text-center shadow-sm flex flex-col justify-center gap-5">
          <div>
            <h2 className="text-[23px] font-semibold text-[#1e2a49] mb-4 font-urw">
              Supplier Login
            </h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2.5 mb-2 border border-[#e7e6e6] rounded-lg text-[15px] font-urw text-[#283456] focus:outline-none focus:border-gray-500"
            />
            <div className="text-right text-sm mt-1">
              <a href="#" className="text-[#008558] font-medium">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button className="w-full bg-[#008558] text-white py-2 rounded-full font-semibold text-sm hover:brightness-110 transition">
              Log in
            </button>
            <div className="mt-3 text-sm text-[#283456]">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-[#008558] font-medium">
                Get onboard
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

export default SupplierLogin;
