import React from 'react';

const MessagesPanel: React.FC = () => {
  const messages = [
    {
      id: 1,
      name: 'John Doe',
      time: '3:45 PM',
      message: 'What time does the bus leave?',
    },
    {
      id: 2,
      name: 'Muhammad Lee',
      time: '7:02 PM',
      message: 'Sounds great!',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 h-[400px] flex flex-col">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Messages</h2>

        {/* Full-width line that touches both borders */}
        <div className="-mx-6 my-2">
          <hr className="border-gray-300" />
        </div>

        <p className="text-sm text-gray-500">Today</p>
      </div>

      <ul className="space-y-4 flex-1 overflow-auto mt-4">
        {messages.map((msg) => (
          <li key={msg.id} className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-700 font-medium">
                <span>{msg.name}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-600">{msg.message}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-center mt-4">
        <a
          href="/messages"
          className="text-green-600 text-sm font-medium hover:underline"
        >
          View all
        </a>
      </div>
    </div>
  );
};

export default MessagesPanel;

