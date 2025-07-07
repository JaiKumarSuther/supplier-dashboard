"use client";
import React, { useEffect, useState } from "react";

interface Message {
  user_id: string;
  full_name: string;
  profile_photo: string | null;
  email: string;
  last_message: string;
  last_message_time: string;
}

const MessagesPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const supplierId = localStorage.getItem("supplier_id");

    if (!token || !supplierId) return;

    fetch(`http://localhost:9000/api/v1/suppliers/${supplierId}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.recentChatUsers || []);
      })
      .catch((err) => console.error("❌ Failed to fetch messages:", err));
  }, []);

  return (
    <div className="bg-white h-full min-h-[400px] rounded-xl border border-gray-200 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 w-full flex flex-col">
      <h2 className="text-lg sm:text-[20px] font-semibold text-[#283456]">Messages</h2>
      <div className="border-t border-gray-200 my-4 -mx-4 sm:-mx-6"></div>

      <div className="flex flex-col justify-between pb-6 sm:pb-10 flex-1">
        <div>
          <p className="text-sm sm:text-[15px] text-[#666666] mb-3 pb-4 font-semibold">Today</p>
          <ul className="flex flex-col gap-6 sm:gap-8">
            {messages.map((msg) => (
              <li key={msg.user_id} className="flex items-start gap-3 sm:gap-4 cursor-pointer">
                <img
                  src={msg.profile_photo || "/default-profile.png"}
                  alt="Profile"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover bg-[#EEEEEE] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm sm:text-[15px] font-semibold text-[#283456] truncate">
                      {msg.full_name}
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-[#999999] ml-2 flex-shrink-0">
                      {new Date(msg.last_message_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-[#666666] truncate">
                    {msg.last_message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-4 pt-6 sm:pt-8">
          <a href="/messages" className="text-[#3A6F4D] text-sm font-medium hover:underline">
            View all
          </a>
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
