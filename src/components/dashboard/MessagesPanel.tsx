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
    <div className="bg-white h-full rounded-xl border border-gray-200 px-6 pt-6 pb-4 w-full max-w-sm flex flex-col">
      {/* Title */}
      <h2 className="text-[18px] font-semibold text-[#1e2a49]">Messages</h2>

      {/* Separator */}
      <div className="border-t border-gray-200 my-4 -mx-6"></div>

      {/* Main content: List + Footer justified */}
      <div className="flex flex-col justify-between pb-10 flex-1">
        {/* Messages List */}
        <div>
          <p className="text-sm text-gray-600 mb-3">Today</p>
          <ul className="flex flex-col gap-6">
            {messages.map((msg) => (
              <li key={msg.id} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-[#1e2a49]">
                      {msg.name}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-4">
          <a
            href="/messages"
            className="text-green-700 text-sm font-medium hover:underline"
          >
            View all
          </a>
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
