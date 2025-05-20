
const activities = [
  {
    type: 'new booking',
    time: '1 min ago',
    message:
      'You have a new booking for Day Colors of Hunza Valley Cultural Tour on 26th Aug 2025.',
  },
  {
    type: 'booking cancelled',
    time: '28 min ago',
    message:
      'Wamiq Ahmed has canceled their booking for 14 Days K2 Base Camp Trekking Expedition.',
  },
  {
    type: 'payout processed',
    time: '1 hr ago',
    message: 'Your payout of PKR 456,400 for booking# F81237-23478 has been processed.',
  },
  {
    type: 'review received',
    time: '2 hr ago',
    message: 'Wamiq Ahmed has left a 4-star review on your listing.',
  },
];

const typeColors: Record<string, { text: string; bg: string; hoverBg: string }> = {
  'new booking': { text: 'text-blue-600', bg: 'bg-blue-100', hoverBg: 'bg-blue-200' },
  'booking cancelled': { text: 'text-orange-600', bg: 'bg-orange-100', hoverBg: 'bg-orange-200' },
  'payout processed': { text: 'text-green-600', bg: 'bg-green-100', hoverBg: 'bg-green-200' },
  'review received': { text: 'text-purple-600', bg: 'bg-purple-100', hoverBg: 'bg-purple-200' },
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-4 text-sm text-gray-700">
        {activities.map((activity, idx) => {
          const color =
            typeColors[activity.type] || {
              text: 'text-gray-600',
              bg: 'bg-gray-100',
              hoverBg: 'bg-gray-200',
            };
          return (
            <li key={idx} className="border-b pb-3">
              <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span
                  className={`${color.text} ${color.bg} px-2 py-1 rounded cursor-pointer hover:${color.hoverBg} transition-colors duration-200`}
                >
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </span>
                <span className="text-gray-400">{activity.time}</span>
              </div>
              <p>{activity.message}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityFeed;
