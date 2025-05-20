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
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
        <p className="text-sm text-gray-500 mt-1">Today</p>
      </div>

      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg.id} className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
            <div>
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

export default MessagesPanel;