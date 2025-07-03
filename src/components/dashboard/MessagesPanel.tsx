import React from "react";

const MessagesPanel: React.FC = () => {
  const messages = [
    {
      id: 1,
      name: "John Doe",
      time: "3:45 PM",
      message: "What time does the bus leave?",
    },
    {
      id: 2,
      name: "Muhammad Lee",
      time: "7:02 PM",
      message: "Sounds great!",
    },
  ];

  return (
    <div className="bg-white h-full rounded-xl border border-gray-200 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 w-full flex flex-col">
      {/* Title */}
      <h2 className="text-lg sm:text-[20px] font-semibold text-[#283456]">Messages</h2>

      {/* Separator */}
      <div className="border-t border-gray-200 my-4 -mx-4 sm:-mx-6"></div>

      {/* Main content: List + Footer justified */}
      <div className="flex flex-col justify-between pb-6 sm:pb-10 flex-1">
        {/* Messages List */}
        <div>
          <p className="text-sm sm:text-[15px] text-[#666666] mb-3 pb-4 font-semibold">Today</p>
          <ul className="flex flex-col gap-6 sm:gap-8">
            {messages.map((msg) => (
              <li key={msg.id} className="flex items-start gap-3 sm:gap-4 cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#EEEEEE] rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm sm:text-[15px] font-semibold text-[#283456] truncate">
                      {msg.name}
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-[#999999] ml-2 flex-shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-[#666666] truncate">{msg.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-4 pt-6 sm:pt-8">
          <a
            href="/messages"
            className="text-[#3A6F4D] text-sm font-medium hover:underline"
          >
            View all
          </a>
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
